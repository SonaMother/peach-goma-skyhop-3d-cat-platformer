import * as THREE from "three";

/* ---------- Toon gradient (3 soft steps → sticker-like shading) ---------- */
let gradientTex: THREE.DataTexture | null = null;
export function getGradientMap() {
  if (gradientTex) return gradientTex;
  const data = new Uint8Array([214, 240, 255, 255]);
  const tex = new THREE.DataTexture(data, 4, 1, THREE.RedFormat);
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  tex.needsUpdate = true;
  gradientTex = tex;
  return tex;
}

const toonCache = new Map<string, THREE.MeshToonMaterial>();
export function toon(color: string, opts: { emissive?: string; transparent?: boolean; opacity?: number } = {}) {
  const key = `${color}|${opts.emissive ?? ""}|${opts.opacity ?? 1}`;
  let m = toonCache.get(key);
  if (!m) {
    m = new THREE.MeshToonMaterial({
      color,
      gradientMap: getGradientMap(),
      emissive: opts.emissive ?? "#000000",
      transparent: !!opts.transparent || (opts.opacity ?? 1) < 1,
      opacity: opts.opacity ?? 1,
    });
    toonCache.set(key, m);
  }
  return m;
}

const flatCache = new Map<string, THREE.MeshBasicMaterial>();
/** Unlit flat color (used for face features so they read like ink). */
export function flat(color: string, opts: { transparent?: boolean; opacity?: number; depthWrite?: boolean } = {}) {
  const key = `${color}|${opts.opacity ?? 1}|${opts.depthWrite ?? true}`;
  let m = flatCache.get(key);
  if (!m) {
    m = new THREE.MeshBasicMaterial({
      color,
      transparent: !!opts.transparent || (opts.opacity ?? 1) < 1,
      opacity: opts.opacity ?? 1,
      depthWrite: opts.depthWrite ?? true,
      toneMapped: false,
    });
    flatCache.set(key, m);
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
