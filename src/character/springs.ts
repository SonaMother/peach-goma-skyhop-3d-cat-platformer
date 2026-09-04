/**
 * Secondary-motion toolkit.
 * -------------------------
 * Everything that "feels alive" in the rig is a damped harmonic spring:
 * squash & stretch, ears, whiskers, belly jiggle, tail whip, head
 * follow-through, arm lag... Fixed sub-stepping keeps it stable at any fps.
 */
export class Spring {
  value: number;
  velocity = 0;
  target: number;
  constructor(value = 0, public stiffness = 120, public damping = 14) {
    this.value = value;
    this.target = value;
  }
  set(v: number) {
    this.value = v;
    this.target = v;
    this.velocity = 0;
  }
  impulse(v: number) {
    this.velocity += v;
  }
  update(dt: number) {
    let remaining = Math.min(dt, 0.1);
    const step = 1 / 120;
    while (remaining > 0) {
      const h = Math.min(step, remaining);
      const f = (this.target - this.value) * this.stiffness - this.velocity * this.damping;
      this.velocity += f * h;
      this.value += this.velocity * h;
      remaining -= h;
    }
    return this.value;
  }
}

/** Two independent springs bundled (head follow-through, jiggles, look-at). */
export class Spring2 {
  x: Spring;
  y: Spring;
  constructor(stiffness = 120, damping = 14) {
    this.x = new Spring(0, stiffness, damping);
    this.y = new Spring(0, stiffness, damping);
  }
  impulse(x: number, y: number) {
    this.x.impulse(x);
    this.y.impulse(y);
  }
  setTarget(x: number, y: number) {
    this.x.target = x;
    this.y.target = y;
  }
  update(dt: number) {
    this.x.update(dt);
    this.y.update(dt);
    return this;
  }
}

/**
 * Follow-through chain: each link springs toward the previous link's angle,
 * producing a whip / ribbon motion (tail, long ears, balloon strings).
 */
export class Chain {
  links: Spring[];
  constructor(n: number, stiffness = 90, damping = 9) {
    this.links = Array.from({ length: n }, (_, i) => new Spring(0, stiffness * (1 - i * 0.08), damping * (1 - i * 0.05)));
  }
  update(root: number, dt: number) {
    let prev = root;
    for (const l of this.links) {
      l.target = prev;
      prev = l.update(dt);
    }
    return this.links;
  }
  impulse(v: number, falloff = 0.75) {
    let k = v;
    for (const l of this.links) {
      l.impulse(k);
      k *= falloff;
    }
  }
}

/** Frame-rate independent exponential smoothing */
export function damp(current: number, target: number, lambda: number, dt: number) {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
export const rand = (min: number, max: number) => min + Math.random() * (max - min);
export const pick = <T>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];
export const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
export const easeOutBack = (t: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
export const easeOutElastic = (t: number) => {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1;
};
/** Cheap deterministic noise (sum of sines) — perfect for breathing / drift. */
export const noise1 = (t: number, seed = 0) =>
  (Math.sin(t * 1.7 + seed) + Math.sin(t * 2.3 + seed * 1.3 + 1.1) * 0.6 + Math.sin(t * 4.1 + seed * 0.7 + 2.3) * 0.3) / 1.9;
