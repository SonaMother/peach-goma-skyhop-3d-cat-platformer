import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Cat, createDriver, type CatEvent } from "../character/Cat";
import { PALETTES, type CatId } from "../character/palettes";
import { damp, rand } from "../character/springs";
import { useGame } from "../game/store";
import { C } from "../game/world";
import { Part } from "../character/Part";
import { flat } from "../character/materials";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { Backdrop } from "../world/Backdrop";
import { fx } from "../world/Particles";
import { sfx } from "../game/sfx";
import { CameraRig } from "./GameScene";

const STAGE = new RoundedBoxGeometry(6.4, 0.6, 2.6, 5, 0.28);
const STAGE_TOP = new RoundedBoxGeometry(5.6, 0.25, 1.8, 4, 0.1);
const FLOWER = new THREE.SphereGeometry(0.07, 10, 8);

/** Shared sound reactions for interactive cats (menu + lab). */
export function catSound(e: CatEvent) {
  switch (e) {
    case "poke":
      sfx.meow();
      break;
    case "pokeBelly":
      sfx.giggle();
      break;
    case "pokeTail":
      sfx.grumble();
      break;
    case "pet":
      sfx.purr();
      break;
  }
}

function MenuCat({ id, index }: { id: CatId; index: number }) {
  const selected = useGame((s) => s.character);
  const setCharacter = useGame((s) => s.setCharacter);
  const isSel = selected === id;
  const driver = useRef(createDriver({ state: "idle" }));
  const g = useRef<THREE.Group | null>(null);
  const { pointer } = useThree();
  const mem = useMemo(() => ({ x: index === 0 ? -1.3 : 1.3, hover: false, t: 0, greetT: 0, poutT: 0, wasSel: isSel }), [index]);

  useFrame((_, dt) => {
    const d = driver.current;
    mem.t += dt;
    // react to being picked / un-picked: the chosen cat cheers, the other pouts for a moment
    if (isSel !== mem.wasSel) {
      mem.wasSel = isSel;
      if (isSel) {
        mem.greetT = Math.max(mem.greetT, 1.0);
        d.events.push("cheer");
      } else {
        mem.poutT = 1.8;
        d.events.push("bump");
      }
    }
    mem.poutT -= dt;
    const targetX = isSel ? (index === 0 ? -0.7 : 0.7) : index === 0 ? -1.75 : 1.75;
    const targetZ = isSel ? 0.6 : -0.4;
    if (g.current) {
      g.current.position.x = damp(g.current.position.x, targetX, 5, dt);
      g.current.position.z = damp(g.current.position.z, targetZ, 5, dt);
      const sc = damp(g.current.scale.x, isSel ? C.catScale * 1.15 : C.catScale * 0.95, 5, dt);
      g.current.scale.setScalar(sc);
      // cats look toward the pointer (2D)
      const px = pointer.x * 1.4 - g.current.position.x * 0.3;
      d.look = THREE.MathUtils.clamp(px, -1, 1);
      d.lookY = THREE.MathUtils.clamp(pointer.y * 0.9, -1, 1);
    }
    d.vx = 0;
    d.vy = 0;
    mem.greetT -= dt;
    if (mem.hover && g.current && Math.random() < 0.06) fx.burst("sparkle", g.current.position.x + (Math.random() - 0.5) * 1.2, 1.9 + Math.random() * 0.6, 0.7, 1, 0.6);
    // the rig's own fidget system handles idle life; we only steer hover + selection
    const pouting = mem.poutT > 0 && !mem.hover;
    d.state = mem.greetT > 0 ? "celebrate" : mem.hover ? "wave" : pouting ? "sit" : "idle";
    d.expression = mem.greetT > 0 ? null : mem.hover ? "excited" : pouting ? "pout" : isSel ? null : "content";
    d.emote = pouting && mem.poutT < 1.2 ? "sweat" : null;
    if (pouting) d.look = index === 0 ? 1 : -1; // side-eye the chosen one
  });

  return (
    <group ref={g} position={[mem.x, 0, 0]} scale={C.catScale}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.34, 0.15]} material={flat("#3B3231", { opacity: 0.13, depthWrite: false })}>
        <circleGeometry args={[1.15, 28]} />
      </mesh>
      <Cat
        palette={PALETTES[id]}
        driver={driver}
        interactive
        onEvent={catSound}
        onPoke={() => {
          if (!isSel) {
            setCharacter(id);
            sfx.select();
          }
          mem.greetT = 0.6;
          fx.burst("hearts", g.current!.position.x, 1.6, 0.8, 4);
        }}
      />
      {/* hover halo */}
      <mesh
        position={[0, 1.4, 0]}
        onPointerOver={() => (mem.hover = true)}
        onPointerOut={() => (mem.hover = false)}
        onClick={(e) => {
          e.stopPropagation();
          if (!isSel) {
            setCharacter(id);
            sfx.select();
          }
          mem.greetT = 1.2;
          fx.burst("hearts", g.current!.position.x, 1.6, 0.8, 8);
        }}
      >
        <capsuleGeometry args={[1.25, 1.6, 4, 8]} />
        <meshBasicMaterial visible={false} />
      </mesh>
    </group>
  );
}

export function MenuScene() {
  const camY = useRef(0.25);
  const camX = useRef(0);
  const flowers = useMemo(() => Array.from({ length: 7 }, (_, i) => ({ x: -2.6 + i * 0.87 + rand(-0.15, 0.15), z: rand(0.75, 1.05), c: i % 3 === 0 ? "#FFD35C" : i % 3 === 1 ? "#FF8FAF" : "#BFDCFB" })), []);
  return (
    <>
      <CameraRig camY={camY} camX={camX} lookDown={1.3} zoom={2.2} />
      <group position={[0, -0.02, 0]}>
        <Part geometry={STAGE} color="#C9E9C0" position={[0, -0.3, 0]} outlineWidth={0.07} />
        <Part geometry={STAGE_TOP} color="#EAF8E4" position={[0, 0.05, 0]} outlineWidth={0} />
        {flowers.map((f, i) => (
          <Part key={i} geometry={FLOWER} color={f.c} position={[f.x, 0.05, f.z]} outlineWidth={0.03} />
        ))}
      </group>
      <MenuCat id="peach" index={0} />
      <MenuCat id="goma" index={1} />
      <Backdrop camYRef={camY} count={8} spread={8} />
    </>
  );
}
