import { create } from "zustand";
import type { CatId } from "../character/palettes";
import type { ExpressionName } from "../character/expressions";
import type { MotionState } from "../character/poses";
import type { Accessory, EmoteName } from "../character/Cat";

export type Phase = "menu" | "playing" | "gameover" | "lab";
export type PowerKind = "rocket" | "balloon" | "magnet" | null;

interface RunStats {
  score: number;
  altitude: number;
  hearts: number;
  hugs: number;
  combo: number;
  bestCombo: number;
  stars: number;
  fish: number;
}

export interface Toast {
  id: number;
  text: string;
  color: string;
}

export interface LabState {
  expression: ExpressionName | null;
  pose: MotionState;
  accessory: Accessory;
  emote: EmoteName | null;
  autoTour: boolean;
  vx: number;
  vy: number;
}

interface GameStore extends RunStats {
  toasts: Toast[];
  pushToast: (text: string, color?: string) => void;
  phase: Phase;
  character: CatId;
  best: Record<CatId, number>;
  skyTier: number;
  muted: boolean;
  paused: boolean;
  runId: number;
  power: PowerKind;
  powerLeft: number; // 0..1
  shield: boolean;
  hurtFlash: number;
  lab: LabState;
  setCharacter: (c: CatId) => void;
  start: () => void;
  openLab: () => void;
  backToMenu: () => void;
  updateRun: (s: Partial<RunStats>) => void;
  setSkyTier: (t: number) => void;
  setPower: (k: PowerKind, left: number) => void;
  setShield: (on: boolean) => void;
  flashHurt: () => void;
  endRun: () => void;
  toggleMute: () => void;
  togglePause: () => void;
  setLab: (s: Partial<LabState>) => void;
}

const loadBest = (): Record<CatId, number> => {
  try {
    const raw = localStorage.getItem("peachgoma.best");
    if (raw) return { peach: 0, goma: 0, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return { peach: 0, goma: 0 };
};

const EMPTY_RUN: RunStats = { score: 0, altitude: 0, hearts: 0, hugs: 0, combo: 0, bestCombo: 0, stars: 0, fish: 0 };

export const useGame = create<GameStore>((set, get) => ({
  phase: "menu",
  character: "peach",
  best: loadBest(),
  ...EMPTY_RUN,
  skyTier: 0,
  muted: false,
  paused: false,
  runId: 0,
  power: null,
  powerLeft: 0,
  shield: false,
  hurtFlash: 0,
  toasts: [],
  lab: { expression: null, pose: "idle", accessory: "none", emote: null, autoTour: false, vx: 0, vy: 0 },
  pushToast: (text, color = "#FF8FAF") => {
    const id = Date.now() + Math.random();
    set((s) => ({ toasts: [...s.toasts.slice(-4), { id, text, color }] }));
    setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), 1100);
  },
  setCharacter: (c) => set({ character: c }),
  start: () => set((s) => ({ phase: "playing", paused: false, ...EMPTY_RUN, skyTier: 0, power: null, powerLeft: 0, shield: false, runId: s.runId + 1 })),
  openLab: () => set({ phase: "lab", skyTier: 0 }),
  backToMenu: () => set({ phase: "menu", skyTier: 0, paused: false }),
  updateRun: (s) => set(s),
  setSkyTier: (t) => {
    if (get().skyTier !== t) set({ skyTier: t });
  },
  setPower: (k, left) => {
    const s = get();
    if (s.power !== k || Math.abs(s.powerLeft - left) > 0.02) set({ power: k, powerLeft: left });
  },
  setShield: (on) => {
    if (get().shield !== on) set({ shield: on });
  },
  flashHurt: () => set((s) => ({ hurtFlash: s.hurtFlash + 1 })),
  endRun: () => {
    const { score, character, best } = get();
    const nb = { ...best, [character]: Math.max(best[character], score) };
    try {
      localStorage.setItem("peachgoma.best", JSON.stringify(nb));
    } catch {
      /* ignore */
    }
    set({ phase: "gameover", best: nb, power: null, shield: false });
  },
  toggleMute: () => set((s) => ({ muted: !s.muted })),
  togglePause: () => set((s) => ({ paused: !s.paused })),
  setLab: (l) => set((s) => ({ lab: { ...s.lab, ...l } })),
}));
