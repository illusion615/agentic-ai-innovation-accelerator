/**
 * LANGUAGE HANDOFF — keep the reader where they are when they switch language.
 *
 * `/en/` and `/zh/` are two separate static documents, so the toggle is a real
 * navigation and the browser lands at the top. In a meeting room that is the
 * worst possible moment to lose your place: the toggle is pressed precisely
 * when someone in the room asked to see the current point in the other
 * language, and the current point is what disappears.
 *
 * What is handed over is *not* a pixel offset. The two editions do not have the
 * same height — Chinese runs shorter per line and taller per block, and the
 * headings wrap differently — so a scrollY would land somewhere arbitrary.
 * What transfers meaningfully is the reader's place in the argument: which
 * section they are in, and how far through it. Section ids are the same in both
 * editions, which is what makes this possible at all.
 *
 * The handoff goes through sessionStorage rather than the URL. A language
 * toggle should not leave `#journey` stuck in the address bar of a page the
 * reader may then share. The cost is that a middle-click into a new tab gets no
 * restore, which is the right failure: a new tab is a new reading.
 */

const KEY = 'aiia:lang-handoff';
/** Long enough for a slow static load, short enough that a later manual visit
 *  to the same URL is never silently teleported. */
const MAX_AGE = 12_000;
/** The line down the viewport that counts as "where the reader is looking". */
const READING_LINE = 0.35;

interface Handoff {
  section: string;
  ratio: number;
  t: number;
}

function readHandoff(): Handoff | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const h = JSON.parse(raw) as Handoff;
    if (typeof h?.section !== 'string' || typeof h?.ratio !== 'number') return null;
    return Date.now() - h.t < MAX_AGE ? h : null;
  } catch {
    return null;
  }
}

/** Which section owns the reading line, and how far through it we are. */
function currentPlace(): Handoff | null {
  const sections = Array.from(document.querySelectorAll<HTMLElement>('#main > section[id]'));
  if (!sections.length) return null;

  const line = window.innerHeight * READING_LINE;
  let fallback: Handoff | null = null;

  for (const el of sections) {
    const r = el.getBoundingClientRect();
    if (r.height < 1) continue;
    if (r.top <= line && r.bottom > line) {
      return { section: el.id, ratio: (line - r.top) / r.height, t: Date.now() };
    }
    // Above the first section (bounced scroll) or below the last one.
    if (r.bottom <= line) fallback = { section: el.id, ratio: 1, t: Date.now() };
    else if (!fallback) fallback = { section: el.id, ratio: 0, t: Date.now() };
  }

  return fallback;
}

function scrollToPlace(h: Handoff) {
  const el = document.getElementById(h.section);
  if (!el) return false;
  const r = el.getBoundingClientRect();
  const target = r.top + window.scrollY - window.innerHeight * READING_LINE + h.ratio * r.height;
  // `'instant'`, emphatically not `'auto'`. `auto` does not mean "no animation"
  // — it means "use the CSS `scroll-behavior`", and this site sets that to
  // `smooth` for its in-page anchors. With `auto` the restore was animating a
  // half-second glide from the top of the new edition down to the reader's
  // place, in full view, which is a more distracting version of the very
  // problem this file exists to solve. This is a continuation of a position the
  // reader already had, not a journey to a new one.
  window.scrollTo({ top: Math.max(0, target), behavior: 'instant' });
  return true;
}

export function initLangHandoff() {
  // --- capture -------------------------------------------------------------
  document.querySelectorAll<HTMLAnchorElement>('[data-lang-toggle]').forEach((link) => {
    link.addEventListener('click', (e) => {
      // A modified click opens elsewhere; that reading should start at the top.
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || (e as MouseEvent).button !== 0) return;
      const place = currentPlace();
      if (!place) return;
      try {
        sessionStorage.setItem(KEY, JSON.stringify(place));
      } catch {
        /* private mode — fall through to an ordinary navigation */
      }
    });
  });

  // --- restore -------------------------------------------------------------
  const handoff = readHandoff();
  const root = document.documentElement;
  // Consume it either way: a stale or unusable record must not survive to
  // ambush the next navigation.
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }

  if (!handoff) {
    root.removeAttribute('data-lang-restore');
    return;
  }

  // The reveal cascade is an *arrival* animation. Replaying it for content the
  // reader was already looking at would say "here is something new" about the
  // paragraph they just asked to see translated. Everything already on screen
  // is marked arrived, with transitions suppressed for a frame so the marking
  // itself does not animate.
  root.setAttribute('data-lang-restore', '');
  scrollToPlace(handoff);

  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight * 1.1) {
      el.setAttribute('data-revealed', '');
    }
  });

  // Lazy artwork can land after first paint and move sections under us, so
  // re-seat once the page has finished assembling — but only while the reader
  // is still where we put them. Once they have started scrolling, the position
  // is theirs and a late correction would be the page grabbing the wheel back.
  let owned = true;
  const release = () => {
    owned = false;
  };
  for (const ev of ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const) {
    window.addEventListener(ev, release, { once: true, passive: true });
  }

  const reseat = () => {
    if (owned) scrollToPlace(handoff);
  };
  window.addEventListener('load', reseat, { once: true });

  requestAnimationFrame(() => {
    reseat();
    requestAnimationFrame(() => root.removeAttribute('data-lang-restore'));
  });
}
