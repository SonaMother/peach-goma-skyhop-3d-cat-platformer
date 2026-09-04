import * as THREE from "three";

/* ---------- Toon gradient (soft 4-step ramp → plush sticker shading) ---------- */
let gradientTex: THREE.DataTexture | null = null;
export function getGradientMap() {
  if (gradientTex) return gradientTex;
  // Toon diffuse is scaled by 1/π in the shader, so lights are boosted (see App
  // lights) to land the top step at pure white. Floor ≈ 75% keeps a soft,
  // bright shadow band instead of gray mud.
  const data = new Uint8Array([190, 214, 236, 255]);
  const tex = new THREE.DataTexture(data, 4, 1, THREE.RedFormat);
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  tex.needsUpdate = true;
  gradientTex = tex;
  return tex;
}

const toonCache = new Map<string, THREE.MeshToonMaterial>();
export function toon(color: string, opts: { emissive?: string; emissiveIntensity?: number; transparent?: boolean; opacity?: number; side?: THREE.Side } = {}) {
  const key = `${color}|${opts.emissive ?? ""}|${opts.emissiveIntensity ?? 1}|${opts.opacity ?? 1}|${opts.side ?? 0}`;
  let m = toonCache.get(key);
  if (!m) {
    m = new THREE.MeshToonMaterial({
      color,
      gradientMap: getGradientMap(),
      emissive: opts.emissive ?? "#000000",
      emissiveIntensity: opts.emissiveIntensity ?? 1,
      transparent: !!opts.transparent || (opts.opacity ?? 1) < 1,
      opacity: opts.opacity ?? 1,
      side: opts.side ?? THREE.FrontSide,
    });
    toonCache.set(key, m);
  }
  return m;
}

const flatCache = new Map<string, THREE.MeshBasicMaterial>();
/** Unlit flat color (used for face features so they read like ink). */
export function flat(color: string, opts: { transparent?: boolean; opacity?: number; depthWrite?: boolean; side?: THREE.Side } = {}) {
  const key = `${color}|${opts.opacity ?? 1}|${opts.depthWrite ?? true}|${opts.side ?? 0}`;
  let m = flatCache.get(key);
  if (!m) {
    m = new THREE.MeshBasicMaterial({
      color,
      transparent: !!opts.transparent || (opts.opacity ?? 1) < 1,
      opacity: opts.opacity ?? 1,
      depthWrite: opts.depthWrite ?? true,
      toneMapped: false,
      side: opts.side ?? THREE.FrontSide,
    });
    flatCache.set(key, m);
  }
  return m;
}

/** Glossy translucent bubble (shield, balloons). */
const bubbleCache = new Map<string, THREE.MeshPhysicalMaterial>();
export function bubble(color: string, opacity = 0.35) {
  const key = `${color}|${opacity}`;
  let m = bubbleCache.get(key);
  if (!m) {
    m = new THREE.MeshPhysicalMaterial({
      color,
      transparent: true,
      opacity,
      roughness: 0.15,
      metalness: 0,
      transmission: 0,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      depthWrite: false,
      side: THREE.FrontSide,
    });
    bubbleCache.set(key, m);
  }
  return m;
}

/* ---------- Inverted-hull outline (vertices pushed along normals) ---------- */
const outlineCache = new Map<string, THREE.ShaderMaterial>();
export function outline(width = 0.05, color = "#3B3231") {
  const key = `${width}|${color}`;
  let m = outlineCache.get(key);
  if (!m) {
    m = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: { uWidth: { value: width }, uColor: { value: new THREE.Color(color) } },
      vertexShader: /* glsl */ `
        uniform float uWidth;
        void main() {
          vec4 pos = vec4(position, 1.0);
          vec3 n = normal;
          #ifdef USE_INSTANCING
            pos = instanceMatrix * pos;
            n = mat3(instanceMatrix) * n;
          #endif
          // world-space uniform thickness independent of object scale
          vec3 wn = normalize(mat3(modelMatrix) * n);
          vec4 wp = modelMatrix * pos;
          wp.xyz += wn * uWidth;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        void main() { gl_FragColor = vec4(uColor, 1.0); }
      `,
    });
    outlineCache.set(key, m);
  }
  return m;
}
