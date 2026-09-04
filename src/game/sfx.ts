/**
 * Procedural kawaii sound effects (no assets needed).
 */
import { useGame } from "./store";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;

function ac() {
  if (!ctx) {
    ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    master = ctx.createGain();
    master.gain.value = 0.5;
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function tone(
  freq: number,
  dur: number,
  opts: { type?: OscillatorType; to?: number; vol?: number; delay?: number; attack?: number } = {},
) {
  if (useGame.getState().muted) return;
  try {
    const c = ac();
    const t0 = c.currentTime + (opts.delay ?? 0);
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = opts.type ?? "sine";
    o.frequency.setValueAtTime(freq, t0);
    if (opts.to) o.frequency.exponentialRampToValueAtTime(opts.to, t0 + dur);
    const v = opts.vol ?? 0.25;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(v, t0 + (opts.attack ?? 0.01));
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g).connect(master!);
    o.start(t0);
    o.stop(t0 + dur + 0.05);
  } catch {
    /* audio not available */
  }
}

export const sfx = {
  unlock: () => {
    try {
      ac();
    } catch {
      /* ignore */
    }
  },
  jump: () => tone(420, 0.16, { type: "triangle", to: 760, vol: 0.18 }),
  cloud: () => {
    tone(380, 0.14, { type: "triangle", to: 640, vol: 0.14 });
    tone(1200, 0.25, { type: "sine", to: 300, vol: 0.05 });
  },
  pillow: () => {
    tone(300, 0.35, { type: "triangle", to: 1400, vol: 0.22 });
    tone(600, 0.3, { type: "sine", to: 1800, vol: 0.12, delay: 0.05 });
  },
  heart: () => {
    tone(880, 0.12, { vol: 0.16 });
    tone(1320, 0.18, { vol: 0.16, delay: 0.08 });
  },
  hug: () => {
    [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.28, { vol: 0.16, delay: i * 0.09 }));
  },
  bump: () => tone(200, 0.12, { type: "square", to: 120, vol: 0.06 }),
  fall: () => tone(700, 0.9, { type: "triangle", to: 90, vol: 0.14, attack: 0.05 }),
  sad: () => {
    [523, 494, 440, 392].forEach((f, i) => tone(f, 0.4, { vol: 0.14, delay: 0.5 + i * 0.22, type: "triangle" }));
  },
  click: () => tone(900, 0.07, { type: "sine", to: 1200, vol: 0.12 }),
  select: () => {
    tone(660, 0.1, { vol: 0.14 });
    tone(990, 0.14, { vol: 0.14, delay: 0.07 });
  },
};
