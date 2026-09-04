import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Cat, createDriver } from "../character/Cat";
import { PALETTES, type CatId } from "../character/palettes";
import { damp, rand } from "../character/springs";
import { useGame } from "../game/store";
import { C } from "../game/world";
import { Part } from "../character/Part";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { Backdrop } from "../world/Backdrop";
import { fx } from "../world/Particles";
import { sfx } from "../game/sfx";
import { CameraRig } from "./GameScene";

const STAGE = new RoundedBoxGeometry(6.4, 0.6, 2.6, 5, 0.28);
const STAGE_TOP = new RoundedBoxGeometry(5.6, 0.25, 1.8, 4, 0.1);

function MenuCat({ id, index }: { id: CatId; index: number }) {
  const selected = useGame((s) => s.character);
  const setCharacter = useGame((s) => s.setCharacter);
  const isSel = selected === id;
  const driver = useRef(createDriver({ state: "idle" }));
  const g = useRef<THREE.Group | null>(null);
  const { pointer } = useThree();
  const mem = useMemo(() => ({ x: index === 0 ? -1.3 : 1.3, y: 0, hover: false, actTimer: rand(2, 5), act: null as null | { state: "celebrate" | "wave" | "sit" | "lieDown"; until: number }, t: 0 }), [index]);

  useFrame((_, dt) => {
    const d = driver.current;
    mem.t += dt;
    const targetX = isSel ? (index === 0 ? -0.7 : 0.7) : index === 0 ? -1.75 : 1.75;
    const targetZ = isSel ? 0.6 : -0.4;
    if (g.current) {
      g.current.position.x = damp(g.current.position.x, targetX, 5, dt);
      g.current.position.z = damp(g.current.position.z, targetZ, 5, dt);
      const sc = damp(g.current.scale.x, isSel ? C.catScale * 1.15 : C.catScale * 0.95, 5, dt);
      g.current.scale.setScalar(sc);
      // cats look toward the pointer
      const px = pointer.x * 1.4 - g.current.position.x * 0.3;
      d.look = THREE.MathUtils.clamp(px, -1, 1);
    }
    d.vx = 0;
    d.vy = 0;
    mem.actTimer -= dt;
    if (mem.act && mem.act.until < mem.t) mem.act = null;
    if (!mem.act && mem.actTimer <= 0) {
      mem.actTimer = rand(3, 7);
      const r = Math.random();
      const st = isSel ? (r < 0.5 ? "wave" : r < 0.8 ? "celebrate" : "sit") : r < 0.5 ? "sit" : r < 0.8 ? "wave" : "lieDown";
      mem.act = { state: st, until: mem.t + rand(1.4, 3) };
    }
    d.state = mem.act ? mem.act.state : mem.hover ? "wave" : "idle";
    d.expression = mem.hover ? "excited" : isSel ? null : "content";
  });

  return (
    <group ref={g} position={[mem.x, 0, 0]} scale={C.catScale}>
      <Cat palette={PALETTES[id]} driver={driver} />
      {/* invisible hit capsule */}
      <mesh
        position={[0, 1.4, 0]}
        onPointerOver={() => (mem.hover = true)}
        onPointerOut={() => (mem.hover = false)}
        onClick={(e) => {
          e.stopPropagation();
          setCharacter(id);
          driver.current.events.push("cheer");
          mem.act = { state: "celebrate", until: mem.t + 1.4 };
          fx.burst("hearts", g.current!.position.x, 1.6, 0.8, 8);
          sfx.select();
        }}
      >
        <capsuleGeometry args={[1.1, 1.4, 4, 8]} />
        <meshBasicMaterial visible={false} />
      </mesh>
    </group>
  );
}

export function MenuScene() {
  const camY = useRef(0.25);
  const camX = useRef(0);
  return (
    <>
      <CameraRig camY={camY} camX={camX} lookDown={1.3} zoom={2.2} />
      <group position={[0, -0.02, 0]}>
        <Part geometry={STAGE} color="#C9E9C0" position={[0, -0.3, 0]} outlineWidth={0.07} />
        <Part geometry={STAGE_TOP} color="#EAF8E4" position={[0, 0.05, 0]} outlineWidth={0} />
      </group>
      <MenuCat id="peach" index={0} />
      <MenuCat id="goma" index={1} />
      <Backdrop camYRef={camY} count={8} spread={8} />
    </>
  );
}
