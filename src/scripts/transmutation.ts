/**
 * TRANSMUTATION — the site's one and only visual concept.
 *
 * A field of gold particles begins scattered, desaturated and drifting.
 * As the page is scrolled, particles converge on a regular lattice, regain
 * saturation, sharpen from soft motes into faceted flecks, and finally bond
 * into a crystalline grid. Scroll progress *is* the chaos → certainty axis.
 *
 * Certainty is rendered *quieter* than chaos, not louder: the resolved lattice
 * is small, exact and low-contrast, while the chaotic phase is larger, softer
 * and more agitated. An earlier version scaled brightness and size up with
 * order, which made the end of the page a dense, shouting grid that fought the
 * text. Precision — not volume — is what should read as settled. The canvas
 * also sits behind all copy (see global.css) and carries a scroll-driven blur
 * that starts out of focus and resolves toward sharp.
 *
 * Implemented on Canvas 2D with a fixed particle budget and zero per-frame
 * allocation, so it holds 60fps on meeting-room laptops and projectors.
 */

type Particle = {
  /** chaotic anchor, normalized 0..1 */
  cx: number;
  cy: number;
  /** lattice target, normalized 0..1 */
  lx: number;
  ly: number;
  /** drift parameters */
  ax: number;
  ay: number;
  sx: number;
  sy: number;
  ph: number;
  /** where on the global scroll axis this particle starts / finishes ordering */
  start: number;
  span: number;
  /** per-particle size + twinkle */
  size: number;
  twinkle: number;
  /** lattice neighbours (indices, -1 when none) */
  right: number;
  down: number;
  /** last resolved screen position (px) — reused by the bonding pass */
  px: number;
  py: number;
  pe: number;
};

const CHAOS_RGB = [150, 143, 126] as const; // desaturated, leaden
const GOLD_RGB = [201, 162, 39] as const; // #C9A227
const GOLD_HOT = [235, 205, 120] as const; // crystalline highlight

const clamp = (v: number, lo = 0, hi = 1) => (v < lo ? lo : v > hi ? hi : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export interface TransmutationHandle {
  destroy(): void;
}

export function initTransmutation(canvas: HTMLCanvasElement): TransmutationHandle {
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return { destroy() {} };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  let width = 0;
  let height = 0;
  let dpr = 1;
  let particles: Particle[] = [];
  let cols = 0;
  let rows = 0;
  let raf = 0;
  let running = false;

  /** smoothed scroll progress 0..1 */
  let progress = 0;
  let targetProgress = 0;
  /** 1 while the dark hero fills the viewport, 0 once we are on parchment */
  let dark = 1;
  let targetDark = 1;

  function particleBudget(): number {
    const area = width * height;
    const base = Math.round(area / 1750);
    const cap = window.innerWidth < 720 ? 320 : 1000;
    return Math.max(160, Math.min(cap, base));
  }

  function build() {
    const budget = particleBudget();
    const aspect = width / Math.max(height, 1);
    // A near-square lattice sized to the viewport, so "certainty" reads as a
    // deliberate grid rather than a random cloud that happened to stop moving.
    cols = Math.max(6, Math.round(Math.sqrt(budget * aspect)));
    rows = Math.max(6, Math.round(budget / cols));

    const next: Particle[] = [];
    const marginX = 0.06;
    const marginY = 0.08;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const gx = cols === 1 ? 0.5 : c / (cols - 1);
        const gy = rows === 1 ? 0.5 : r / (rows - 1);
        const lx = marginX + gx * (1 - marginX * 2);
        const ly = marginY + gy * (1 - marginY * 2);

        // Ordering sweeps diagonally down-and-right, with jitter so the
        // crystallization looks grown rather than wiped on.
        const sweep = (gx * 0.35 + gy * 0.5) / 0.85;
        const jitter = Math.random() * 0.22 - 0.11;
        const start = clamp(sweep * 0.62 + jitter, 0, 0.78);

        next.push({
          cx: Math.random(),
          cy: Math.random(),
          lx,
          ly,
          ax: 0.02 + Math.random() * 0.075,
          ay: 0.02 + Math.random() * 0.075,
          sx: 0.12 + Math.random() * 0.34,
          sy: 0.12 + Math.random() * 0.34,
          ph: Math.random() * Math.PI * 2,
          start,
          span: 0.2 + Math.random() * 0.24,
          size: 0.85 + Math.random() * 1.7,
          twinkle: Math.random() * Math.PI * 2,
          right: c < cols - 1 ? r * cols + c + 1 : -1,
          down: r < rows - 1 ? (r + 1) * cols + c : -1,
          px: 0,
          py: 0,
          pe: 0,
        });
      }
    }
    particles = next;
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
  }

  function readScroll() {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    targetProgress = max > 0 ? clamp(window.scrollY / max) : 0;
    doc.style.setProperty('--scroll-progress', targetProgress.toFixed(4));

    // Focus is the other half of the metaphor, and it is what keeps the field
    // from competing with body copy: chaos is literally out of focus, certainty
    // resolves toward sharp — but never fully, so the lattice stays a texture
    // behind the text rather than a grid drawn on top of it.
    const blur = lerp(2.4, 0.55, easeInOutCubic(targetProgress));
    doc.style.setProperty('--field-blur', `${blur.toFixed(2)}px`);

    const hero = document.getElementById('hero');
    if (hero) {
      const rect = hero.getBoundingClientRect();
      // How much of the viewport is still covered by the dark hero panel.
      const covered = clamp((rect.bottom - 0) / window.innerHeight);
      targetDark = covered;
    } else {
      targetDark = 0;
    }
  }

  function drawStatic() {
    // Reduced motion: render the resolved lattice once. Same idea, no movement.
    ctx!.clearRect(0, 0, width, height);
    ctx!.globalAlpha = 1;
    for (const p of particles) {
      const x = p.lx * width;
      const y = p.ly * height;
      const s = p.size * 0.72;
      ctx!.fillStyle = `rgba(${GOLD_RGB[0]},${GOLD_RGB[1]},${GOLD_RGB[2]},0.3)`;
      ctx!.fillRect(x - s, y - s, s * 2, s * 2);
    }
    ctx!.strokeStyle = `rgba(${GOLD_RGB[0]},${GOLD_RGB[1]},${GOLD_RGB[2]},0.055)`;
    ctx!.lineWidth = 0.5;
    ctx!.beginPath();
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const x = p.lx * width;
      const y = p.ly * height;
      if (p.right >= 0) {
        const q = particles[p.right];
        ctx!.moveTo(x, y);
        ctx!.lineTo(q.lx * width, q.ly * height);
      }
      if (p.down >= 0) {
        const q = particles[p.down];
        ctx!.moveTo(x, y);
        ctx!.lineTo(q.lx * width, q.ly * height);
      }
    }
    ctx!.stroke();
  }

  function frame(now: number) {
    raf = requestAnimationFrame(frame);

    // Critically-damped-ish smoothing: the field lags the scrollbar slightly,
    // which is what makes it feel like matter reacting rather than a scrubber.
    progress += (targetProgress - progress) * 0.09;
    dark += (targetDark - dark) * 0.12;

    const t = now * 0.001;
    const c = ctx!;
    c.clearRect(0, 0, width, height);

    // Gold reads dim on parchment and blazing on navy — compensate so the
    // effect is equally legible in both halves of the page.
    const alphaBoost = lerp(0.8, 1.25, dark);
    const glow = dark > 0.35;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      const local = clamp((progress - p.start) / p.span);
      const e = easeInOutCubic(local);
      p.pe = e;

      const wander = 1 - e;
      const dx = Math.sin(t * p.sx + p.ph) * p.ax * wander;
      const dy = Math.cos(t * p.sy + p.ph * 1.7) * p.ay * wander;

      // Chaotic anchors also creep, so the "before" state never looks frozen.
      const chaosX = p.cx + dx;
      const chaosY = p.cy + dy;

      const nx = lerp(chaosX, p.lx, e);
      const ny = lerp(chaosY, p.ly, e);

      const x = nx * width;
      const y = ny * height;
      p.px = x;
      p.py = y;

      // Colour: leaden → gold → crystalline highlight at the very end.
      const hot = clamp((e - 0.82) / 0.18);
      const r = Math.round(lerp(lerp(CHAOS_RGB[0], GOLD_RGB[0], e), GOLD_HOT[0], hot));
      const g = Math.round(lerp(lerp(CHAOS_RGB[1], GOLD_RGB[1], e), GOLD_HOT[1], hot));
      const b = Math.round(lerp(lerp(CHAOS_RGB[2], GOLD_RGB[2], e), GOLD_HOT[2], hot));

      const twinkle = 0.86 + 0.14 * Math.sin(t * 1.4 + p.twinkle);
      // Nearly flat: the transition the eye should read is leaden → gold and
      // smeared → exact, not dim → bright.
      const alpha = clamp(lerp(0.30, 0.36, e) * twinkle * alphaBoost, 0, 1);
      // Ordered particles are *smaller*. A crystal is finer than the cloud it
      // came from, and it keeps the resolved field from clotting into a mesh.
      const size = p.size * lerp(1.15, 0.72, e);

      c.fillStyle = `rgba(${r},${g},${b},${alpha})`;

      if (e < 0.55) {
        // Chaotic phase: soft, round, uncertain.
        c.beginPath();
        c.arc(x, y, size, 0, Math.PI * 2);
        c.fill();
      } else {
        // Ordered phase: faceted, axis-aligned, deliberate.
        const s = size * 1.15;
        c.fillRect(x - s, y - s, s * 2, s * 2);
      }

      if (glow && e > 0.6) {
        c.fillStyle = `rgba(${GOLD_HOT[0]},${GOLD_HOT[1]},${GOLD_HOT[2]},${alpha * 0.09})`;
        c.beginPath();
        c.arc(x, y, size * 3.4, 0, Math.PI * 2);
        c.fill();
      }
    }

    // Bonding pass — the crystal lattice only appears once neighbours have
    // both settled. This is the payoff of the whole animation.
    // The lattice should be *implied*, not drawn. At full strength on parchment
    // this was a visible graph-paper grid across every line of body copy.
    const bondAlpha = clamp((progress - 0.5) / 0.4) * lerp(0.055, 0.2, dark);
    if (bondAlpha > 0.004) {
      c.lineWidth = 0.5;
      c.strokeStyle = `rgba(${GOLD_RGB[0]},${GOLD_RGB[1]},${GOLD_RGB[2]},${bondAlpha})`;
      c.beginPath();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.pe < 0.86) continue;
        if (p.right >= 0) {
          const q = particles[p.right];
          if (q.pe >= 0.86) {
            c.moveTo(p.px, p.py);
            c.lineTo(q.px, q.py);
          }
        }
        if (p.down >= 0) {
          const q = particles[p.down];
          if (q.pe >= 0.86) {
            c.moveTo(p.px, p.py);
            c.lineTo(q.px, q.py);
          }
        }
      }
      c.stroke();
    }
  }

  function start() {
    if (running) return;
    running = true;
    raf = requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  function applyMotionPreference() {
    if (reduceMotion.matches) {
      stop();
      readScroll();
      drawStatic();
    } else {
      start();
    }
  }

  function onResize() {
    resize();
    readScroll();
    if (reduceMotion.matches) drawStatic();
  }

  function onVisibility() {
    if (document.hidden) stop();
    else if (!reduceMotion.matches) start();
  }

  resize();
  readScroll();
  progress = targetProgress;
  dark = targetDark;
  applyMotionPreference();

  window.addEventListener('scroll', readScroll, { passive: true });
  window.addEventListener('resize', onResize);
  document.addEventListener('visibilitychange', onVisibility);
  reduceMotion.addEventListener('change', applyMotionPreference);

  return {
    destroy() {
      stop();
      window.removeEventListener('scroll', readScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      reduceMotion.removeEventListener('change', applyMotionPreference);
    },
  };
}
