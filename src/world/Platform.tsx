import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { Part } from "../character/Part";
import { toon } from "../character/materials";
import { Cat } from "../character/Cat";
import { PALETTES, type CatId } from "../character/palettes";
import { C, type PlatformData } from "../game/world";
import { HEART_GEO } from "./geometries";

const boxCache = new Map<string, THREE.BufferGeometry>();
function box(w: number, h: number, d: number, r: number) {
  const key = `${w.toFixed(1)}|${h}|${d}|${r}`;
  let g = boxCache.get(key);
  if (!g) {
    g = new RoundedBoxGeometry(w, h, d, 5, r);
    boxCache.set(key, g);
  }
  return g;
}

const PUFF = new THREE.SphereGeometry(0.5, 20, 14);
const CUSHION = new THREE.SphereGeometry(0.16, 14, 10);
const STRIPE_GEO = new THREE.BoxGeometry(0.07, 0.42, 1.22);

const COLORS = {
  ground: "#C9E9C0",
  groundDark: "#A9D5A0",
  normal: "#C4EBD7",
  moving: "#BFDCFB",
  pillow: "#A6D7F7",
  pillowLight: "#E3F3FF",
  cloud: "#FFFFFF",
  heart: "#FF6F91",
};

function Body({ p }: { p: PlatformData }) {
  const w = p.w;
  switch (p.type) {
    case "ground":
      return (
        <>
          <Part geometry={box(w, 1.2, 2.2, 0.3)} color={COLORS.ground} position={[0, -0.6 + C.platformH / 2, 0]} outlineWidth={0.07} />
          <Part geometry={box(w - 0.6, 0.3, 1.5, 0.12)} color="#E8F7E2" position={[0, C.platformH / 2 + 0.05, 0]} outlineWidth={0} />
        </>
      );
    case "pillow":
      return (
        <group>
          <Part geometry={box(w, 0.55, 1.25, 0.26)} color={COLORS.pillow} position={[0, 0.1, 0]} outlineWidth={0.065} />
          <mesh geometry={STRIPE_GEO} material={toon(COLORS.pillowLight)} position={[-w * 0.28, 0.1, 0]} scale={[1, 1.02, 1]} />
          <mesh geometry={STRIPE_GEO} material={toon(COLORS.pillowLight)} position={[w * 0.28, 0.1, 0]} scale={[1, 1.02, 1]} />
          {[-1, 1].map((sx) =>
            [-1, 1].map((sz) => (
              <Part key={`${sx}${sz}`} geometry={CUSHION} color={COLORS.pillow} position={[sx * (w / 2 - 0.05), 0.1, sz * 0.55]} scale={[1, 0.7, 1]} outlineWidth={0.05} />
            )),
          )}
        </group>
      );
    case "cloud":
      return (
        <group>
          <Part geometry={box(w * 0.8, 0.4, 0.9, 0.2)} color={COLORS.cloud} position={[0, -0.05, 0]} outlineWidth={0.06} />
          <Part geometry={PUFF} color={COLORS.cloud} position={[-w * 0.3, 0.02, 0]} scale={[1, 0.62, 0.8]} outlineWidth={0.06} />
          <Part geometry={PUFF} color={COLORS.cloud} position={[0, 0.12, 0.05]} scale={[1.25, 0.75, 0.95]} outlineWidth={0.06} />
          <Part geometry={PUFF} color={COLORS.cloud} position={[w * 0.3, 0.0, 0]} scale={[1, 0.6, 0.8]} outlineWidth={0.06} />
        </group>
      );
    case "moving":
      return (
        <group>
          <Part geometry={box(w, C.platformH, C.platformD, 0.15)} color={COLORS.moving} outlineWidth={0.065} />
          <Part geometry={box(w * 0.6, 0.12, 0.5, 0.05)} color="#FFFFFF" position={[0, C.platformH / 2 + 0.02, 0]} outlineWidth={0} />
        </group>
      );
    default:
      return (
        <group>
          <Part geometry={box(w, C.platformH, C.platformD, 0.15)} color={COLORS.normal} outlineWidth={0.065} />
          <Part geometry={box(w * 0.7, 0.1, 0.55, 0.04)} color="#EFFCF4" position={[0, C.platformH / 2 + 0.02, 0]} outlineWidth={0} />
        </group>
      );
  }
}

export function Platform({ p, companionId }: { p: PlatformData; companionId: CatId }) {
  const g = useRef<THREE.Group>(null);
  const heart = useRef<THREE.Group>(null);
  const cloudG = useRef<THREE.Group>(null);
  const driverRef = useMemo(() => ({ current: p.companionDriver! }), [p]);

  useFrame(({ clock }, dt) => {
    const o = g.current;
    if (!o) return;
    const t = clock.elapsedTime;
    if (p.type === "moving") {
      p.x = p.baseX + Math.sin(t * p.speed + p.phase) * p.range;
    }
    o.position.set(p.x, p.y, 0);
    const wy = p.wobble.update(dt);
    o.scale.set(1 / Math.sqrt(Math.max(0.3, wy)), Math.max(0.3, wy), 1);
    if (p.type === "cloud" && cloudG.current) {
      if (!p.alive) {
        p.fade = Math.min(1, p.fade + dt * 2.2);
        const s = Math.max(0.0001, 1 - p.fade);
        cloudG.current.scale.set(1 + p.fade * 0.6, s, 1 + p.fade * 0.6);
        cloudG.current.position.y = -p.fade * 0.5;
      } else {
        cloudG.current.position.y = Math.sin(t * 1.5 + p.phase) * 0.06;
      }
    }
    if (heart.current) {
      const hs = p.heartTaken ? 0.0001 : 1;
      heart.current.scale.setScalar(hs);
      heart.current.position.y = 1.15 + Math.sin(t * 2.2 + p.heartPhase) * 0.12;
      heart.current.rotation.y = t * 1.8 + p.heartPhase;
    }
  });

  return (
    <group ref={g} position={[p.x, p.y, 0]}>
      <group position={[0, -C.platformH / 2, 0]}>
        {p.type === "cloud" ? (
          <group ref={cloudG}>
            <Body p={p} />
          </group>
        ) : (
          <Body p={p} />
        )}
      </group>
      {p.heart && (
        <group ref={heart} position={[0, 1.15, 0]}>
          <Part geometry={HEART_GEO} color={COLORS.heart} outlineWidth={0.045} />
        </group>
      )}
      {p.companion && p.companionDriver && (
        <Cat palette={PALETTES[companionId]} driver={driverRef} position={[p.companionSide * 0.55, 0, -0.15]} scale={C.catScale} />
      )}
    </group>
  );
}
