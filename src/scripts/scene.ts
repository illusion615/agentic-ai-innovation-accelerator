/**
 * SCENE CHOREOGRAPHY — the page as a sequence of scenes, not a stack of blocks.
 *
 * The earlier build faded each element in once and then left it frozen. Every
 * section therefore looked identical whether you were arriving at it, reading
 * it, or half a screen past it, and the only thing that changed at a boundary
 * was which rectangle happened to be under the fold. That is what read as a
 * jump: nothing was ever *leaving*.
 *
 * So each top-level section is treated as a scene with its own clock, and the
 * clock is the scrollbar. Three normalised values are published as custom
 * properties on the section; all the actual movement is expressed in CSS from
 * those, which keeps the choreography declarative and lets one rule change the
 * rhythm everywhere.
 *
 *   --scene-in    0 → 1   the scene arriving and committing to the viewport
 *   --scene-out   0 → 1   the scene surrendering the viewport to the next one
 *   --scene-p     0 → 1   the whole traverse, used for slow parallax
 *   --lead-out    0 → 1   the scene's title card specifically, receding once
 *                         it has been read past
 *   --art-opacity 0 → 1   the section's backdrop, on the section's own
 *                         occupancy of the viewport
 *
 * The backdrop is the one thing here that is deliberately *not* animated in
 * space. It is pinned to the viewport (see SectionArt.astro) and only ever
 * changes opacity: a scene begins by cross-fading the room in, and then the
 * room stands still for as long as the section lasts while its content walks
 * across it. Drifting or scaling it as well made every section feel like it
 * was sliding past rather than being somewhere.
 *
 * Entrances stay on the IntersectionObserver cascade in Base.astro: an entrance
 * wants to be crisp and deterministic — it plays once, at a fixed speed, in a
 * fixed order — whereas continuity between scenes wants to be welded to the
 * scrollbar. Scrubbing the entrance too would make headlines twitch under a
 * trackpad. Scrubbing the exit is what removes the jump.
 *
 * Everything here is measured from the *section's* rect. The section itself is
 * never transformed — only its art and its title card are — so the measurement
 * can never be fed by its own output. Anchoring `--lead-out` to the title
 * card's own box would have created exactly that loop.
 */

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)');

/**
 * Cross-fade distance for a backdrop, as a fraction of the viewport. The
 * handover has to be long enough to read as one room dissolving into another
 * rather than as a cut, and short enough that the middle of a section is spent
 * at full strength rather than mid-fade.
 */
const FADE = 0.55;

function clamp01(x: number) {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

interface Scene {
  el: HTMLElement;
  art: HTMLElement | null;
  /** The title card — the plate or section header that opens the scene. */
  lead: HTMLElement | null;
}

export function initScenes() {
  const sections = Array.from(document.querySelectorAll<HTMLElement>('#main > section'));
  if (!sections.length) return;

  const scenes: Scene[] = sections.map((el) => ({
    el,
    art: el.querySelector<HTMLElement>('[data-section-art]'),
    lead: el.querySelector<HTMLElement>('.lead, .sechead, .hero__content'),
  }));

  for (const s of scenes) {
    s.el.setAttribute('data-scene', '');
    // Exactly one title card per scene, tagged here rather than in the markup.
    // `.lead` gets reused — on the Challenge it also holds the source footnote
    // — and Solution and Tiers nest a `.sechead` inside theirs. A CSS selector
    // over those class names dimmed three cards per section instead of one,
    // including the footnote at the moment it was the only thing on screen.
    // Resolving it in script means the rule can only ever match the outermost
    // card, and adding one later cannot quietly join the choreography.
    s.lead?.setAttribute('data-lead', '');
  }

  if (REDUCED.matches) {
    // The scene still exists, it just does not move: hold every clock at the
    // value it would rest on so nothing is dimmed, shrunk or half-arrived.
    // The backdrop still tracks the scroll — it has no motion to suppress, and
    // freezing every layer at full strength would stack four rooms at once.
    for (const s of scenes) {
      s.el.style.setProperty('--scene-in', '1');
      s.el.style.setProperty('--scene-out', '0');
      s.el.style.setProperty('--scene-p', '0.5');
      s.el.style.setProperty('--lead-out', '0');
    }
  }

  let queued = false;

  function update() {
    queued = false;
    const vh = window.innerHeight;

    for (const { el, art, lead } of scenes) {
      const r = el.getBoundingClientRect();

      // Skip anything well outside the viewport: with eleven scenes on the
      // story page this is most of them on any given frame.
      if (r.bottom < -vh || r.top > vh * 2) continue;

      if (art) {
        // The room arrives before the section's copy does and leaves after it
        // — the section opens on an empty overture and the fade is timed to
        // fill it. Between the two ramps the value pins at 1, which is the
        // whole point: the backdrop holds while the content is read.
        const arrive = smoothstep(0, 1, clamp01((vh - r.top) / (vh * FADE)));
        const depart = smoothstep(0, 1, clamp01(r.bottom / (vh * FADE)));
        art.style.setProperty('--art-opacity', Math.min(arrive, depart).toFixed(3));
      }

      if (REDUCED.matches) continue;

      // Arriving: from the moment the top edge crosses the fold until the
      // scene owns most of the screen. Smoothstepped so the scene eases into
      // presence rather than tracking the wheel linearly.
      const arriving = smoothstep(0, 1, clamp01((vh - r.top) / (vh * 0.62)));

      // Leaving: only once the bottom edge is inside the viewport, so a tall
      // section spends its whole reading length at zero.
      const leaving = clamp01((vh * 0.9 - r.bottom) / (vh * 0.9));

      // The whole traverse, top-of-fold to bottom-of-fold, for parallax.
      const traverse = clamp01((vh - r.top) / (vh + r.height));

      // The title card recedes on the section's own displacement past the top
      // of the screen — never on its own transformed box.
      const leadOut = lead ? clamp01((-r.top - vh * 0.05) / (vh * 0.45)) : 0;

      el.style.setProperty('--scene-in', arriving.toFixed(3));
      el.style.setProperty('--scene-out', leaving.toFixed(3));
      el.style.setProperty('--scene-p', traverse.toFixed(3));
      el.style.setProperty('--lead-out', leadOut.toFixed(3));
    }
  }

  function onScroll() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  // Lazy artwork changes section heights as it lands.
  window.addEventListener('load', onScroll);
  update();
}
