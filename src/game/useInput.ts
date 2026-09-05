import { useEffect, useRef, type MutableRefObject } from "react";
import { clamp } from "../character/springs";

export interface InputState {
  axis: number;
  keys: Set<string>;
  pointers: Map<number, number>; // pointerId → -1|1
  tilt: number;
  tiltEnabled: boolean;
  /** pointer x in -1..1 across the game viewport (used for analog steering) */
  pointerX: number;
}

export function useInput(active: boolean): MutableRefObject<InputState> {
  const ref = useRef<InputState>({ axis: 0, keys: new Set(), pointers: new Map(), tilt: 0, tiltEnabled: false, pointerX: 0 });

  useEffect(() => {
    const s = ref.current;
    const compute = () => {
      let k = 0;
      if (s.keys.has("ArrowLeft") || s.keys.has("KeyA")) k -= 1;
      if (s.keys.has("ArrowRight") || s.keys.has("KeyD")) k += 1;
      let p = 0;
      s.pointers.forEach((v) => (p += v));
      p = clamp(p, -1, 1);
      // pointer steering is analog: the further from the centre you hold, the harder the cat leans
      const analog = Math.abs(s.pointerX) > 0.1 ? clamp(s.pointerX * 1.7, -1, 1) : p * 0.3;
      s.axis = k !== 0 ? k : p !== 0 ? analog : s.tiltEnabled ? clamp(s.tilt / 22, -1, 1) : 0;
    };
    const side = (e: PointerEvent) => {
      // steer relative to the game viewport (centered column on desktop)
      const el = document.getElementById("game-viewport");
      const rect = el?.getBoundingClientRect();
      const cx = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
      const half = rect ? rect.width / 2 : window.innerWidth / 2;
      s.pointerX = clamp((e.clientX - cx) / half, -1, 1);
      return e.clientX < cx ? -1 : 1;
    };
    const kd = (e: KeyboardEvent) => {
      if (["ArrowLeft", "ArrowRight", "KeyA", "KeyD"].includes(e.code)) {
        e.preventDefault();
        s.keys.add(e.code);
        compute();
      }
    };
    const ku = (e: KeyboardEvent) => {
      s.keys.delete(e.code);
      compute();
    };
    const pd = (e: PointerEvent) => {
      if (!active) return;
      const target = e.target as HTMLElement | null;
      if (target && target.closest("[data-ui]")) return;
      s.pointers.set(e.pointerId, side(e));
      compute();
    };
    const pm = (e: PointerEvent) => {
      if (!s.pointers.has(e.pointerId)) return;
      s.pointers.set(e.pointerId, side(e));
      compute();
    };
    const pu = (e: PointerEvent) => {
      s.pointers.delete(e.pointerId);
      compute();
    };
    const orient = (e: DeviceOrientationEvent) => {
      if (e.gamma == null) return;
      s.tiltEnabled = true;
      const angle = (screen.orientation?.angle ?? 0) as number;
      let g = e.gamma;
      if (angle === 90) g = -(e.beta ?? 0);
      else if (angle === -90 || angle === 270) g = e.beta ?? 0;
      s.tilt = g;
      compute();
    };
    const blur = () => {
      s.keys.clear();
      s.pointers.clear();
      compute();
    };
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);
    window.addEventListener("pointerdown", pd);
    window.addEventListener("pointermove", pm);
    window.addEventListener("pointerup", pu);
    window.addEventListener("pointercancel", pu);
    window.addEventListener("deviceorientation", orient);
    window.addEventListener("blur", blur);
    return () => {
      window.removeEventListener("keydown", kd);
      window.removeEventListener("keyup", ku);
      window.removeEventListener("pointerdown", pd);
      window.removeEventListener("pointermove", pm);
      window.removeEventListener("pointerup", pu);
      window.removeEventListener("pointercancel", pu);
      window.removeEventListener("deviceorientation", orient);
      window.removeEventListener("blur", blur);
    };
  }, [active]);

  return ref;
}

/** iOS needs an explicit permission request for motion sensors. */
export async function requestTilt() {
  const DOE = DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> };
  if (typeof DOE.requestPermission === "function") {
    try {
      await DOE.requestPermission();
    } catch {
      /* denied */
    }
  }
}
