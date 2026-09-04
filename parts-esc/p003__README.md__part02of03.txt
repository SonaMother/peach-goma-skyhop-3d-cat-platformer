[PART 2 of 3 | README.md]
hand-rolled toon shading, inverted-hull outlines and spring physics.

## 🚀 Getting started

```bash
npm install
npm run dev
npm run build
```

## 📁 Project structure

```
src/
├── App.tsx                 # Canvas, lights, phase routing
├── character/              # 🐱 THE CAT RIG (see src/character/README.md)
│   ├── Cat.tsx             # procedural rig: springs, poses, expressions, emotes, accessories, fidgets, poke zones
│   ├── poses.ts            # 39 motion states
│   ├── expressions.ts      # 39 facial presets
│   ├── palettes.ts         # colours + personality per cat
│   ├── springs.ts          # Spring / Spring2 / Chain + easing
│   └── materials.ts, Part.tsx
├── game/
│   ├── world.ts            # platform / item / enemy generation \u0026 difficulty curve
│   ├── store.ts            # zustand game store (phase, run stats, power-ups, lab state)
│   ├── useInput.ts         # keyboard / pointer / tilt
│   └── sfx.ts              # synthesized sounds
├── scenes/                 # MenuScene, GameScene, GameOverScene, LabScene
├── world/                  # Backdrop, Particles (12 fx kinds), Platform, Items (+ Grump), geometries
└── ui/                     # HUD, menus, Cat Lab panel, sky gradient
```

## 🧪 Extending the cats

Everything is data — add a pose to `poses.ts`, an expression to `expressions.ts`, a fidget to `FIDGETS`, an
event reaction to `EVENT_FLASH` / `EVENT_EMOTE`, or a whole new cat to `palettes.ts`, and it instantly works
everywhere (including the Cat Lab). Full guide in [`src/character/README.md`](src/character/README.md).

---

## 🤖 For AI agents \u0026 programmatic access

**Start here:** [`AGENT_PROMPT.txt`](AGENT_PROMPT.txt) — a 5.7 KB, tag-proof, plain-text
instruction sheet an agent can follow verbatim: channel decision tree, anti-hallucination
rules, assembly steps, and sanity anchors. Point your agent at its raw URL and it needs
nothing else:
`https://raw.githubusercontent.com/SonaMother/peach-goma-skyhop-3d-cat-platformer/main/AGENT_PROMPT.txt`

Pick the first channel your toolset supports:

1. **Shell** → `git clone https://github.com/SonaMother/peach-goma-skyhop-3d-cat-platformer.git`
2. **Can download + unzip** → [`gameproject.zip`](gameproject.zip) (byte-exact archive of all sources)
3. **Code execution, no unzip** → GitHub contents API returns JSON with **base64** content — tag-proof by construction:
   `https://api.github.com/repos/SonaMother/peach-goma-skyhop-3d-cat-platformer/contents/\u003cpath\u003e?ref=main`
   (decode `.content` with `atob` / `base64 -d`; works for `gameproject.zip` itself too)
4. **Fetch-only agent (no shell)** → use **[`bundle/INDEX.json`](bundle/INDEX.json)** + the listed `bundle/shard-NN.json`.
   Built for the worst observed fetchers: they HTML-strip tags **even inside JSON**, collapse newlines, and
   truncate large responses. Every bundle file is **single-line JSON ≤ 8 KB containing zero raw `\u003c \u003e \u0026`**
   (tag-like characters stored as backslash-u escape sequences your JSON parser decodes) — there is
   literally nothing for such converters to alter. Files bigger than one
   shard are split into ordered parts: group shard entries by `path`, sort by `seq`, concatenate `text`, and
   verify every per-part and per-file `sha256` (quote real hash strings, never summarize). `package-lock.json`
   is regenerable via `npm install` if you want to skip its 9 parts.
   Mirror (serves proper `application/json`): `https://cdn.jsdelivr.net/gh/SonaMother/peach-goma-skyhop-3d-cat-platformer@main/bundle/INDEX.json`
5. **Humans / normal markdown readers** → [`RECREATE_PROJECT.md`](RECREATE_PROJECT.md) (single-file bundle with
   the same data in marked text blocks — avoid this one if your fetcher strips tags).

