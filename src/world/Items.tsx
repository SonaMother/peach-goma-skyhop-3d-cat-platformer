import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { memo, useRef } from "react";
import { Part } from "../character/Part";
import { flat, toon, bubble } from "../character/materials";
import type { EnemyData, ItemData } from "../game/world";
import { FISH_GEO, HEART_GEO, STAR_GEO_BIG } from "./geometries";

const HEART_COLOR = "#FF6F91";
const BALLOON = new THREE.SphereGeometry(0.34, 22, 16);
const KNOT = new THREE.ConeGeometry(0.06, 0.08, 8);
const STRING = new THREE.CylinderGeometry(0.01, 0.01, 0.5, 6);
const ROCKET_BODY = new THREE.CapsuleGeometry(0.17, 0.36, 8, 16);
const ROCKET_TIP = new THREE.ConeGeometry(0.16, 0.24, 16);
const FIN = new THREE.BoxGeometry(0.06, 0.22, 0.18);
const WINDOW = new THREE.CircleGeometry(0.07, 14);
const SHIELD_ORB = new THREE.SphereGeometry(0.36, 24, 16);
const SHIELD_CORE = new THREE.OctahedronGeometry(0.16, 0);
const MAGNET_U = new THREE.TorusGeometry(0.22, 0.08, 10, 20, Math.PI);
const MAGNET_LEG = new THREE.CylinderGeometry(0.08, 0.08, 0.2, 10);
const MAGNET_TIP = new THREE.CylinderGeometry(0.085, 0.085, 0.09, 10);
const GLOW = new THREE.CircleGeometry(0.55, 24);
const PUFF = new THREE.SphereGeometry(0.5, 18, 12);
const EYE = new THREE.CircleGeometry(0.07, 12);
const BROW = new THREE.BoxGeometry(0.22, 0.05, 0.01);
const FROWN = new THREE.TorusGeometry(0.12, 0.028, 8, 16, Math.PI);
const BOLT = (() => {
  const s = new THREE.Shape();
  s.moveTo(0.05, 0.3);
  s.lineTo(-0.12, 0);
  s.lineTo(0.0, 0);
  s.lineTo(-0.06, -0.3);
  s.lineTo(0.14, 0.04);
  s.lineTo(0.02, 0.04);
  s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth: 0.06, bevelEnabled: false });
  g.center();
  return g;
})();

const glowMat = flat("#FFF6D6", { opacity: 0.35, depthWrite: false });
const ink = flat("#3B3231");
const CHEEK = new THREE.CircleGeometry(0.09, 14);
const cheekMat = flat("#C7A5B8", { opacity: 0.8 });
const boltMat = toon("#FFE45C", { emissive: "#FFC400", emissiveIntensity: 0.7 });

function ItemBody({ kind }: { kind: ItemData["kind"] }) {
  switch (kind) {
    case "heart":
      return <Part geometry={HEART_GEO} color={HEART_COLOR} outlineWidth={0.045} />;
    case "fish":
      return (
        <group rotation={[0, 0, 0.2]}>
          <Part geometry={FISH_GEO} color="#9FD0FF" outlineWidth={0.04} />
          <mesh geometry={EYE} material={ink} position={[0.1, 0.03, 0.1]} scale={0.6} />
          <mesh geometry={EYE} material={flat("#ffffff")} position={[0.115, 0.045, 0.102]} scale={0.22} />
        </group>
      );
    case "star":
      return <Part geometry={STAR_GEO_BIG} color="#FFD35C" outlineWidth={0.045} />;
    case "rocket":
      return (
        <group rotation={[0, 0, -0.35]}>
          <Part geometry={ROCKET_BODY} color="#FF6B7A" outlineWidth={0.045} />
          <Part geometry={ROCKET_TIP} color="#FFFFFF" position={[0, 0.44, 0]} outlineWidth={0.04} />
          <Part geometry={FIN} color="#FFFFFF" position={[-0.2, -0.25, 0]} outlineWidth={0.03} />
          <Part geometry={FIN} color="#FFFFFF" position={[0.2, -0.25, 0]} outlineWidth={0.03} />
          <mesh geometry={WINDOW} material={flat("#9FD8FF")} position={[0, 0.08, 0.175]} />
          <mesh geometry={WINDOW} material={ink} position={[0, 0.08, 0.172]} scale={1.3} />
        </group>
      );
    case "balloon":
      return (
        <group position={[0, 0.15, 0]}>
          <mesh geometry={STRING} material={ink} position={[0, -0.55, 0]} />
          <Part geometry={KNOT} color="#FFD35C" position={[0, -0.36, 0]} rotation={[Math.PI, 0, 0]} outlineWidth={0.03} />
          <Part geometry={BALLOON} color="#FFD35C" scale={[1, 1.15, 1]} outlineWidth={0.045}>
            <mesh geometry={EYE} material={flat("#ffffff", { opacity: 0.8 })} position={[-0.13, 0.15, 0.28]} scale={[1.4, 0.9, 1]} rotation={[0, -0.4, 0.5]} />
          </Part>
        </group>
      );
    case "shield":
      return (
        <group>
          <mesh geometry={SHIELD_ORB} material={bubble("#9FD8FF", 0.4)} />
          <Part geometry={SHIELD_CORE} color="#7FB8FF" outlineWidth={0.03} />
          <mesh geometry={EYE} material={flat("#ffffff", { opacity: 0.8 })} position={[-0.13, 0.17, 0.3]} scale={[1.3, 0.8, 1]} rotation={[0, -0.4, 0.6]} />
        </group>
      );
    case "magnet":
      return (
        <group rotation={[0, 0, Math.PI]}>
          <Part geometry={MAGNET_U} color="#E9455D" outlineWidth={0.04} />
          <Part geometry={MAGNET_LEG} color="#E9455D" position={[-0.22, -0.1, 0]} outlineWidth={0.04} />
          <Part geometry={MAGNET_LEG} color="#E9455D" position={[0.22, -0.1, 0]} outlineWidth={0.04} />
          <Part geometry={MAGNET_TIP} color="#F2F2F2" position={[-0.22, -0.24, 0]} outlineWidth={0.035} />
          <Part geometry={MAGNET_TIP} color="#F2F2F2" position={[0.22, -0.24, 0]} outlineWidth={0.035} />
        </group>
      );
  }
}

function ItemImpl({ it }: { it: ItemData }) {
  const g = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const isPower = it.kind === "rocket" || it.kind === "balloon" || it.kind === "shield" || it.kind === "magnet";
  useFrame(({ clock }, dt) => {
    const o = g.current;
    const i = inner.current;
    if (!o || !i) return;
    const t = clock.elapsedTime + it.phase;
    if (it.taken) {
      it.takenT += dt;
      const k = Math.min(1, it.takenT / 0.35);
      o.scale.setScalar(Math.max(0.0001, (1 + k * 0.6) * (1 - k)));
      o.position.y = it.y + k * 0.6;
      return;
    }
    o.position.set(it.x, it.y, 0);
    o.scale.setScalar(1);
    i.position.y = Math.sin(t * 2.2) * 0.12;
    i.rotation.y = it.kind === "heart" || it.kind === "star" || isPower ? t * 1.8 : Math.sin(t * 1.5) * 0.5;
    if (it.kind === "fish") i.rotation.z = Math.sin(t * 5) * 0.15;
    if (it.kind === "balloon") i.rotation.z = Math.sin(t * 1.3) * 0.15;
    if (isPower) {
      const s = 1 + Math.sin(t * 4) * 0.06;
      i.scale.setScalar(s);
    }
  });
  return (
    <group ref={g} position={[it.x, it.y, 0]}>
      {isPower && <mesh geometry={GLOW} material={glowMat} position={[0, 0, -0.4]} />}
      <group ref={inner}>
        <ItemBody kind={it.kind} />
      </group>
    </group>
  );
}

/** Grumpy storm cloud enemy. */
function GrumpImpl({ e }: { e: EnemyData }) {
  const g = useRef<THREE.Group>(null);
  const face = useRef<THREE.Group>(null);
  const bolt = useRef<THREE.Mesh>(null);
  const puffs = useRef<THREE.Group>(null);
  useFrame(({ clock }, dt) => {
    const o = g.current;
    if (!o) return;
    const t = clock.elapsedTime + e.phase;
    if (!e.alive) {
      e.popT += dt;
      const k = Math.min(1, e.popT / 0.4);
      o.scale.setScalar(Math.max(0.0001, (1 + k * 0.8) * (1 - k)));
      o.rotation.z = k * 2;
      return;
    }
    e.x = e.baseX + Math.sin(t * e.speed) * e.range;
    o.position.set(e.x, e.y + Math.sin(t * 1.7) * 0.1, 0);
    const ang = e.angry;
    o.scale.setScalar(1 + ang * 0.08 + Math.sin(t * 12) * ang * 0.03);
    if (face.current) {
      face.current.position.x = Math.cos(t * e.speed) * -0.1;
      face.current.rotation.z = Math.sin(t * 20) * ang * 0.04;
    }
    if (bolt.current) {
      bolt.current.visible = ang > 0.3 && Math.sin(t * 25) > 0.3;
      bolt.current.position.y = -0.55 - Math.sin(t * 3) * 0.05;
    }
    if (puffs.current) puffs.current.rotation.z = Math.sin(t * 2) * 0.05;
  });
  const col = "#8E8AA6";
  return (
    <group ref={g} position={[e.x, e.y, 0]}>
      <group ref={puffs}>
        <Part geometry={PUFF} color={col} position={[-0.45, -0.05, 0]} scale={[0.9, 0.7, 0.8]} outlineWidth={0.06} />
        <Part geometry={PUFF} color={col} position={[0, 0.12, 0.05]} scale={[1.2, 0.9, 0.95]} outlineWidth={0.06} />
        <Part geometry={PUFF} color={col} position={[0.45, -0.05, 0]} scale={[0.9, 0.7, 0.8]} outlineWidth={0.06} />
        <Part geometry={PUFF} color={col} position={[0, -0.22, 0.1]} scale={[1.3, 0.45, 0.9]} outlineWidth={0.06} />
      </group>
      <group ref={face} position={[0, 0.05, 0.55]}>
        <mesh geometry={EYE} material={ink} position={[-0.18, 0.05, 0]} />
        <mesh geometry={EYE} material={ink} position={[0.18, 0.05, 0]} />
        <mesh geometry={BROW} material={ink} position={[-0.19, 0.17, 0]} rotation={[0, 0, -0.5]} />
        <mesh geometry={BROW} material={ink} position={[0.19, 0.17, 0]} rotation={[0, 0, 0.5]} />
        <mesh geometry={FROWN} material={ink} position={[0, -0.16, 0]} />
        <mesh geometry={CHEEK} material={cheekMat} position={[-0.34, -0.06, -0.02]} />
        <mesh geometry={CHEEK} material={cheekMat} position={[0.34, -0.06, -0.02]} />
      </group>
      <mesh ref={bolt} geometry={BOLT} material={boltMat} position={[0.1, -0.55, 0.2]} />
    </group>
  );
}

export const Item = memo(ItemImpl);
export const Grump = memo(GrumpImpl);
