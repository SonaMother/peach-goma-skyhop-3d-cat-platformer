import { create } from "zustand";
import type { CatId } from "../character/palettes";

export type Phase = "menu" | "playing" | "gameover";

interface RunStats {
  score: number;
  altitude: number;
  hearts: number;
  hugs: number;
}

export interface Toast {
  id: number;
  text: string;
  color: string;
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
  setCharacter: (c: CatId) => void;
  start: () => void;
  backToMenu: () => void;
  updateRun: (s: Partial<RunStats>) => void;
  setSkyTier: (t: number) => void;
  endRun: () => void;
  toggleMute: () => void;
  togglePause: () => void;
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

export const useGame = create<GameStore>((set, get) => ({
  phase: "menu",
  character: "peach",
  best: loadBest(),
  score: 0,
  altitude: 0,
  hearts: 0,
  hugs: 0,
  skyTier: 0,
  muted: false,
  paused: false,
  runId: 0,
  toasts: [],
  pushToast: (text, color = "#FF8FAF") => {
    const id = Date.now() + Math.random();
    set((s) => ({ toasts: [...s.toasts.slice(-4), { id, text, color }] }));
    setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), 1100);
  },
  setCharacter: (c) => set({ character: c }),
  start: () => set((s) => ({ phase: "playing", paused: false, score: 0, altitude: 0, hearts: 0, hugs: 0, skyTier: 0, runId: s.runId + 1 })),
  backToMenu: () => set({ phase: "menu", skyTier: 0 }),
  updateRun: (s) => set(s),
  setSkyTier: (t) => {
    if (get().skyTier !== t) set({ skyTier: t });
  },
  endRun: () => {
    const { score, character, best } = get();
    const nb = { ...best, [character]: Math.max(best[character], score) };
    try {
      localStorage.setItem("peachgoma.best", JSON.stringify(nb));
    } catch {
      /* ignore */
    }
    set({ phase: "gameover", best: nb });
  },
  toggleMute: () => set((s) => ({ muted: !s.muted })),
  togglePause: () => set((s) => ({ paused: !s.paused })),
}));
