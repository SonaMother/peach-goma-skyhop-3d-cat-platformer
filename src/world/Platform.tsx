import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { memo, useMemo, useRef } from "react";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { Part } from "../character/Part";
import { flat, toon } from "../character/materials";
import { Cat } from "../character/Cat";
import { PALETTES, type CatId } from "../character/palettes";
import { C, type PlatformData } from "../game/world";

const boxCache = new Map<string, THREE.BufferGeometry>();
export function box(w: number, h: number, d: number, r: number) {
  const key = `${w.toFixed(2)}|${h}|${d}|${r}`;
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
const COIL = new THREE.TorusGeometry(0.28, 0.05, 8, 20);
const TRAMP_TOP = new THREE.CylinderGeometry(0.75, 0.75, 0.1, 28);
const TRAMP_RIM = new THREE.TorusGeometry(0.75, 0.07, 10, 32);
const ICICLE = new THREE.ConeGeometry(0.08, 0.32, 8);
const CRACK = new THREE.BoxGeometry(0.03, 0.14, 0.6);
const CACTUS = new THREE.CapsuleGeometry(0.16, 0.36, 8, 14);
const CACTUS_ARM = new THREE.CapsuleGeometry(0.09, 0.16, 6, 10);
const SPIKE = new THREE.ConeGeometry(0.03, 0.12, 5);
const POT = new THREE.CylinderGeometry(0.22, 0.17, 0.26, 16);
const POT_RIM = new THREE.CylinderGeometry(0.25, 0.25, 0.07, 16);
const FLOWER = new THREE.SphereGeometry(0.07, 10, 8);
const BOOK = new RoundedBoxGeometry(0.5, 0.08, 0.36, 2, 0.02);
const PAGE = new THREE.BoxGeometry(0.46, 0.02, 0.32);
const DOT = new THREE.CircleGeometry(0.03, 10);
const TINY_LINE = new THREE.BoxGeometry(0.08, 0.02, 0.01);
const ARROW = new THREE.ConeGeometry(0.08, 0.14, 3);
const inkMat = flat("#3B3231");

const COLORS = {
  ground: "#C9E9C0",
  normal: "#C4EBD7",
  moving: "#BFDCFB",
  pillow: "#A6D7F7",
  pillowLight: "#E3F3FF",
  cloud: "#FFFFFF",
  spring: "#FFD1DC",
  springDark: "#F28CA0",
  ice: "#DFF6FF",
  iceDark: "#B8E6FA",
  crumble: "#E8D2B5",
  crumbleDark: "#C9AE8A",
  cactus: "#8FD18A",
  pot: "#E8A27A",
};

function Cactus({ side }: { side: number }) {
  return (
    <group position={[side * 0.72, C.platformH / 2, 0.05]}>
      <Part geometry={POT} color={COLORS.pot} position={[0, 0.13, 0]} outlineWidth={0.045} />
      <Part geometry={POT_RIM} color="#F2B792" position={[0, 0.27, 0]} outlineWidth={0.04} />
      <Part geometry={CACTUS} color={COLORS.cactus} position={[0, 0.58, 0]} outlineWidth={0.045} />
      <Part geometry={CACTUS_ARM} color={COLORS.cactus} position={[-0.2, 0.6, 0]} rotation={[0, 0, 0.7]} outlineWidth={0.04} />
      <Part geometry={CACTUS_ARM} color={COLORS.cactus} position={[0.2, 0.5, 0]} rotation={[0, 0, -0.7]} outlineWidth={0.04} />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const y = 0.42 + (i % 4) * 0.1;
        return <mesh key={i} geometry={SPIKE} material={flat("#3B3231")} position={[Math.cos(a) * 0.17, y, Math.sin(a) * 0.17]} rotation={[0, -a, -Math.PI / 2]} />;
      })}
      <Part geometry={FLOWER} color="#FF8FAF" position={[0, 0.88, 0.02]} outlineWidth={0.03} />
      {/* face: grumpy cactus */}
      <mesh geometry={DOT} material={inkMat} position={[-0.06, 0.62, 0.165]} />
      <mesh geometry={DOT} material={inkMat} position={[0.06, 0.62, 0.165]} />
      <mesh geometry={TINY_LINE} material={inkMat} position={[0, 0.54, 0.165]} />
    </group>
  );
}

function Body({ p }: { p: PlatformData }) {
  const w = p.w;
  switch (p.type) {
    case "ground":
      return (
        <>
          <Part geometry={box(w, 1.2, 2.2, 0.3)} color={COLORS.ground} position={[0, -0.6 + C.platformH / 2, 0]} outlineWidth={0.07} />
          <Part geometry={box(w - 0.6, 0.3, 1.5, 0.12)} color="#E8F7E2" position={[0, C.platformH / 2 + 0.05, 0]} outlineWidth={0} />
          {[-3.2, -1.1, 1.4, 3.3].map((x, i) => (
            <Part key={i} geometry={FLOWER} color={i % 2 ? "#FF8FAF" : "#FFD35C"} position={[x, C.platformH / 2 + 0.25, 0.5]} outlineWidth={0.03} />
          ))}
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
    case "spring":
      return (
        <group>
          <Part geometry={box(w, 0.25, 1.0, 0.1)} color="#EADFD8" position={[0, -0.12, 0]} outlineWidth={0.06} />
          {[-0.3, 0.3].map((x, i) => (
            <group key={i} position={[x, 0.05, 0]}>
              {[0, 1, 2].map((k) => (
                <mesh key={k} geometry={COIL} material={toon("#8C8380")} position={[0, k * 0.07, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.55} />
              ))}
            </group>
          ))}
          <Part geometry={TRAMP_TOP} color={COLORS.spring} position={[0, 0.28, 0]} scale={[w / 1.5, 1, 1]} outlineWidth={0.05} />
          <mesh geometry={TRAMP_RIM} material={toon(COLORS.springDark)} position={[0, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[w / 1.5, 1, 1]} />
        </group>
      );
    case "ice":
      return (
        <group>
          <Part geometry={box(w, C.platformH, C.platformD, 0.1)} color={COLORS.ice} outlineWidth={0.06} />
          <Part geometry={box(w * 0.75, 0.08, 0.5, 0.03)} color="#FFFFFF" position={[0, C.platformH / 2 + 0.01, 0.1]} outlineWidth={0} />
          {[-0.35, -0.1, 0.2, 0.4].map((f, i) => (
            <Part key={i} geometry={ICICLE} color={COLORS.iceDark} position={[f * w, -C.platformH / 2 - 0.12, 0.3 - i * 0.15]} rotation={[Math.PI, 0, 0]} scale={[1, 0.7 + (i % 2) * 0.6, 1]} outlineWidth={0.03} />
          ))}
        </group>
      );
    case "crumble":
      return (
        <group>
          <Part geometry={box(w, C.platformH, C.platformD, 0.08)} color={COLORS.crumble} outlineWidth={0.06} />
          {[-0.3, 0.05, 0.32].map((f, i) => (
            <mesh key={i} geometry={CRACK} material={flat(COLORS.crumbleDark)} position={[f * w, C.platformH / 2 - 0.02, 0.1 - i * 0.15]} rotation={[0, (i - 1) * 0.5, 0]} />
          ))}
          <mesh geometry={CRACK} material={flat("#3B3231")} position={[-0.12 * w, C.platformH / 2 + 0.01, -0.1]} rotation={[0, 0.9, 0]} scale={[0.6, 0.3, 0.8]} />
          <mesh geometry={CRACK} material={flat("#3B3231")} position={[0.18 * w, C.platformH / 2 + 0.01, 0.15]} rotation={[0, -1.2, 0]} scale={[0.6, 0.3, 0.6]} />
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
          {[-1, 1].map((s) => (
            <mesh key={s} geometry={ARROW} material={flat("#7FB8FF")} position={[s * (w / 2 - 0.2), C.platformH / 2 + 0.09, 0.35]} rotation={[0, 0, (-s * Math.PI) / 2]} />
          ))}
        </group>
      );
    default:
      return (
        <group>
          <Part geometry={box(w, C.platformH, C.platformD, 0.15)} color={COLORS.normal} outlineWidth={0.065} />
          <Part geometry={box(w * 0.7, 0.1, 0.55, 0.04)} color="#EFFCF4" position={[0, C.platformH / 2 + 0.02, 0]} outlineWidth={0} />
          {p.spiky !== 0 && <Cactus side={p.spiky} />}
        </group>
      );
  }
}

function Book({ side }: { side: number }) {
  return (
    <group position={[side * -0.05, 0.02, 0.55]} rotation={[-0.4, 0, 0]}>
      <Part geometry={BOOK} color="#FF8FAF" outlineWidth={0.03} />
      <mesh geometry={PAGE} material={toon("#FFFFFF")} position={[0, 0.05, 0]} />
    </group>
  );
}

export const Platform = memo(PlatformImpl);

function PlatformImpl({ p, companionId }: { p: PlatformData; companionId: CatId }) {
  const g = useRef<THREE.Group>(null);
  const bodyG = useRef<THREE.Group>(null);
  const driverRef = useMemo(() => ({ current: p.companionDriver! }), [p]);

  useFrame(({ clock }, dt) => {
    const o = g.current;
    if (!o) return;
    const t = clock.elapsedTime;
    if (p.type === "moving") p.x = p.baseX + Math.sin(t * p.speed + p.phase) * p.range;
    o.position.set(p.x, p.y, 0);
    const wy = p.wobble.update(dt);
    o.scale.set(1 / Math.sqrt(Math.max(0.3, wy)), Math.max(0.3, wy), 1);
    const b = bodyG.current;
    if (!b) return;
    if (p.type === "cloud") {
      if (!p.alive) {
        p.fade = Math.min(1, p.fade + dt * 2.2);
        const s = Math.max(0.0001, 1 - p.fade);
        b.scale.set(1 + p.fade * 0.6, s, 1 + p.fade * 0.6);
        b.position.y = -p.fade * 0.5;
      } else b.position.y = Math.sin(t * 1.5 + p.phase) * 0.06;
    } else if (p.type === "crumble") {
      if (p.crumbleTimer > 0) {
        b.position.x = Math.sin(t * 60) * 0.04 * Math.min(1, p.crumbleTimer * 4);
        b.rotation.z = Math.sin(t * 45) * 0.03;
      } else if (!p.alive) {
        p.fade = Math.min(1, p.fade + dt * 1.6);
        b.position.y = -p.fade * p.fade * 8;
        b.rotation.z = p.fade * 0.8;
        b.scale.setScalar(Math.max(0.0001, 1 - p.fade * 0.6));
      }
    } else if (p.type === "spring") {
      b.position.y = 0;
    }
  });

  return (
    <group ref={g} position={[p.x, p.y, 0]}>
      <group position={[0, -C.platformH / 2, 0]}>
        <group ref={bodyG}>
          <Body p={p} />
        </group>
      </group>
      {p.companion && p.companionDriver && (
        <group position={[p.companionSide * 0.55, 0, -0.15]}>
          <Cat palette={PALETTES[companionId]} driver={driverRef} scale={C.catScale} />
          {p.companionMood === "read" && !p.hugged && <Book side={p.companionSide} />}
        </group>
      )}
    </group>
  );
}
