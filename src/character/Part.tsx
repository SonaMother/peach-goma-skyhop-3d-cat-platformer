import * as THREE from "three";
import { forwardRef } from "react";
import { toon, outline } from "./materials";

export const OUTLINE_W = 0.06;
export const OUTLINE_COLOR = "#3B3231";

export interface PartProps {
  geometry: THREE.BufferGeometry;
  color?: string;
  material?: THREE.Material;
  outlineWidth?: number;
  outlineColor?: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  renderOrder?: number;
  children?: React.ReactNode;
}

/** A toon-shaded mesh with a sticker-style ink outline (inverted hull). */
export const Part = forwardRef<THREE.Group, PartProps>(function Part(
  { geometry, color = "#ffffff", material, outlineWidth = OUTLINE_W, outlineColor = OUTLINE_COLOR, position, rotation, scale, renderOrder, children },
  ref,
) {
  return (
    <group ref={ref} position={position} rotation={rotation} scale={scale}>
      <mesh geometry={geometry} material={material ?? toon(color)} renderOrder={renderOrder} />
      {outlineWidth > 0 && <mesh geometry={geometry} material={outline(outlineWidth, outlineColor)} renderOrder={renderOrder} />}
      {children}
    </group>
  );
});
