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

function tone(freq: number, dur: number, opts: { type?: OscillatorType; to?: number; vol?: number; delay?: number; attack?: number; vib?: number } = {}) {
  if (useGame.getState().muted) return;
  try {
    const c = ac();
    const t0 = c.currentTime + (opts.delay ?? 0);
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = opts.type ?? "sine";
    o.frequency.setValueAtTime(freq, t0);
    if (opts.to) o.frequency.exponentialRampToValueAtTime(opts.to, t0 + dur);
    if (opts.vib) {
      const lfo = c.createOscillator();
      const lg = c.createGain();
      lfo.frequency.value = 6;
      lg.gain.value = opts.vib;
      lfo.connect(lg).connect(o.frequency);
      lfo.start(t0);
      lfo.stop(t0 + dur + 0.05);
    }
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

function noise(dur: number, opts: { vol?: number; delay?: number; freq?: number; q?: number; to?: number } = {}) {
  if (useGame.getState().muted) return;
  try {
    const c = ac();
    const t0 = c.currentTime + (opts.delay ?? 0);
    const len = Math.floor(c.sampleRate * dur);
    const buf = c.createBuffer(1, len, c.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = c.createBufferSource();
    src.buffer = buf;
    const f = c.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.setValueAtTime(opts.freq ?? 1200, t0);
    if (opts.to) f.frequency.exponentialRampToValueAtTime(opts.to, t0 + dur);
    f.Q.value = opts.q ?? 0.8;
    const g = c.createGain();
    g.gain.setValueAtTime(opts.vol ?? 0.2, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(f).connect(g).connect(master!);
    src.start(t0);
  } catch {
    /* ignore */
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
    noise(0.3, { vol: 0.08, freq: 900, to: 300 });
  },
  pillow: () => {
    tone(300, 0.35, { type: "triangle", to: 1400, vol: 0.22 });
    tone(600, 0.3, { type: "sine", to: 1800, vol: 0.12, delay: 0.05 });
  },
  spring: () => {
    tone(220, 0.08, { type: "square", to: 440, vol: 0.06 });
    tone(440, 0.4, { type: "triangle", to: 1760, vol: 0.18, delay: 0.05, vib: 30 });
  },
  ice: () => {
    tone(1800, 0.25, { type: "sine", to: 2600, vol: 0.08 });
    noise(0.35, { vol: 0.1, freq: 3000, to: 5000, q: 2 });
  },
  crumble: () => {
    noise(0.5, { vol: 0.16, freq: 400, to: 120, q: 0.6 });
    tone(140, 0.4, { type: "sawtooth", to: 60, vol: 0.05 });
  },
  crack: () => noise(0.12, { vol: 0.12, freq: 2000, q: 1.5 }),
  heart: () => {
    tone(880, 0.12, { vol: 0.16 });
    tone(1320, 0.18, { vol: 0.16, delay: 0.08 });
  },
  fish: () => {
    tone(660, 0.08, { type: "triangle", vol: 0.14 });
    tone(880, 0.08, { type: "triangle", vol: 0.14, delay: 0.09 });
    tone(1100, 0.2, { type: "triangle", vol: 0.14, delay: 0.18 });
  },
  star: () => [1047, 1319, 1568, 2093].forEach((f, i) => tone(f, 0.25, { vol: 0.13, delay: i * 0.06 })),
  rocket: () => {
    noise(1.6, { vol: 0.2, freq: 300, to: 1600, q: 0.5 });
    tone(120, 1.4, { type: "sawtooth", to: 520, vol: 0.06 });
  },
  balloon: () => tone(520, 0.5, { type: "sine", to: 1040, vol: 0.12, vib: 12 }),
  pop: () => {
    noise(0.08, { vol: 0.25, freq: 1500, q: 0.5 });
    tone(900, 0.08, { type: "square", to: 200, vol: 0.05 });
  },
  shield: () => {
    tone(440, 0.3, { type: "sine", to: 880, vol: 0.12 });
    tone(660, 0.4, { type: "sine", to: 1320, vol: 0.1, delay: 0.1 });
  },
  magnet: () => [400, 500, 600, 700, 800].forEach((f, i) => tone(f, 0.08, { type: "square", vol: 0.04, delay: i * 0.05 })),
  hug: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.28, { vol: 0.16, delay: i * 0.09 })),
  bump: () => tone(200, 0.12, { type: "square", to: 120, vol: 0.06 }),
  stun: () => {
    tone(300, 0.3, { type: "square", to: 150, vol: 0.06 });
    [900, 700, 500].forEach((f, i) => tone(f, 0.12, { type: "triangle", vol: 0.08, delay: 0.1 + i * 0.1 }));
  },
  hurt: () => {
    tone(600, 0.2, { type: "sawtooth", to: 200, vol: 0.06 });
    tone(1200, 0.12, { type: "triangle", to: 800, vol: 0.08 });
  },
  perfect: (n: number) => tone(700 + Math.min(n, 10) * 90, 0.15, { type: "triangle", to: 1000 + Math.min(n, 10) * 120, vol: 0.14 }),
  milestone: () => [784, 988, 1175, 1568].forEach((f, i) => tone(f, 0.3, { type: "triangle", vol: 0.14, delay: i * 0.08 })),
  fall: () => tone(700, 0.9, { type: "triangle", to: 90, vol: 0.14, attack: 0.05 }),
  sad: () => [523, 494, 440, 392].forEach((f, i) => tone(f, 0.4, { vol: 0.14, delay: 0.5 + i * 0.22, type: "triangle" })),
  click: () => tone(900, 0.07, { type: "sine", to: 1200, vol: 0.12 }),
  select: () => {
    tone(660, 0.1, { vol: 0.14 });
    tone(990, 0.14, { vol: 0.14, delay: 0.07 });
  },
  meow: () => {
    tone(620, 0.32, { type: "triangle", to: 880, vol: 0.12, attack: 0.04, vib: 14 });
    tone(880, 0.22, { type: "triangle", to: 560, vol: 0.1, delay: 0.3, attack: 0.02 });
  },
  purr: () => {
    for (let i = 0; i < 8; i++) tone(70, 0.1, { type: "sawtooth", vol: 0.05, delay: i * 0.09 });
  },
  giggle: () => [880, 1046, 988, 1174].forEach((f, i) => tone(f, 0.1, { type: "triangle", vol: 0.1, delay: i * 0.08 })),
  grumble: () => tone(180, 0.3, { type: "sawtooth", to: 120, vol: 0.05, vib: 8 }),
  yawn: () => tone(400, 0.7, { type: "triangle", to: 250, vol: 0.08, attack: 0.15 }),
  wrap: () => tone(500, 0.1, { type: "sine", to: 900, vol: 0.06 }),
  tick: () => tone(1200, 0.04, { type: "square", vol: 0.03 }),
};
