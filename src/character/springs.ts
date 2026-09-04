/**
 * Tiny damped-harmonic spring solver used for all secondary motion
 * (squash & stretch, ears, tail, arms, head follow-through...).
 * Fixed sub-stepping keeps it stable at low frame-rates.
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

/** Frame-rate independent exponential smoothing */
export function damp(current: number, target: number, lambda: number, dt: number) {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
export const rand = (min: number, max: number) => min + Math.random() * (max - min);
