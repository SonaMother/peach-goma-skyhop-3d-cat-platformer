import * as THREE from "three";

export function makeHeartGeometry(size = 0.3, depth = 0.12) {
  const s = new THREE.Shape();
  const x = 0,
    y = 0;
  s.moveTo(x, y + 0.25);
  s.bezierCurveTo(x, y + 0.25, x - 0.05, y, x - 0.5, y);
  s.bezierCurveTo(x - 1.05, y, x - 1.05, y + 0.7, x - 1.05, y + 0.7);
  s.bezierCurveTo(x - 1.05, y + 1.05, x - 0.7, y + 1.4, x, y + 1.9);
  s.bezierCurveTo(x + 0.7, y + 1.4, x + 1.05, y + 1.05, x + 1.05, y + 0.7);
  s.bezierCurveTo(x + 1.05, y + 0.7, x + 1.05, y, x + 0.5, y);
  s.bezierCurveTo(x + 0.05, y, x, y + 0.25, x, y + 0.25);
  const g = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: true, bevelSegments: 4, bevelSize: 0.12, bevelThickness: 0.1, curveSegments: 12 });
  g.center();
  g.rotateZ(Math.PI); // point down
  g.scale(size, size, size);
  g.computeVertexNormals();
  return g;
}

export function makeStarGeometry(size = 0.2) {
  const s = new THREE.Shape();
  const pts = 5;
  for (let i = 0; i < pts * 2; i++) {
    const r = i % 2 === 0 ? 1 : 0.45;
    const a = (i / (pts * 2)) * Math.PI * 2 + Math.PI / 2;
    const px = Math.cos(a) * r;
    const py = Math.sin(a) * r;
    if (i === 0) s.moveTo(px, py);
    else s.lineTo(px, py);
  }
  s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth: 0.3, bevelEnabled: true, bevelSegments: 2, bevelSize: 0.1, bevelThickness: 0.1 });
  g.center();
  g.scale(size, size, size);
  g.computeVertexNormals();
  return g;
}

export const HEART_GEO = makeHeartGeometry(0.3);
export const HEART_GEO_SMALL = makeHeartGeometry(0.16, 0.08);
export const STAR_GEO = makeStarGeometry(0.16);
export const PUFF_GEO = new THREE.SphereGeometry(0.22, 12, 10);
export const SPARK_GEO = new THREE.OctahedronGeometry(0.1, 0);
