# RECREATE_PROJECT.md — exact one-file reconstruction bundle

This single file contains **every source file** of **Peach & Goma: SkyHop** with its
exact repository path and byte-exact contents, so the complete directory tree can be
recreated 1:1 from one URL — no shell, no zip tool, nothing but the ability to read text.

- Source commit: `ea5c6446427d7fc320a0440293103056e80dcf5c`
- Generated (UTC): 2026-09-04 04:18:37
- Files: 35 | Total: 332,395 bytes
- `gameproject.zip` (binary, byte-exact archive of these sources) is NOT inlined here;
  it sits in the repo root if you prefer `unzip` / `git clone`.

## How to reconstruct the directory exactly

1. Create the folder structure: for each block below, `mkdir -p` the directory part of
   the path (e.g. `src/character`), then write the text between that block's
   `BEGIN FILE` and `END FILE` markers into the file named in the marker — verbatim,
   byte-for-byte (the byte count in the marker lets you verify).
2. Root-level files (`index.html`, `package.json`, …) go directly in the project root.
3. Optional verification: the **Manifest** below lists each file's size and SHA-256;
   check with `sha256sum` or any equivalent.
4. Then `npm install && npm run dev` as usual.

> Parsing note for AI agents: file boundaries are the lines starting with
> `<<<<< BEGIN FILE:` / `<<<<< END FILE:`. Paths never contain newlines, and this
> marker sequence never occurs inside file contents. Content is UTF-8.

## Manifest

| Path | Bytes | Lines | SHA-256 (first 12) |
|---|---|---|---|
| `.gitignore` | 334 | 36 | `5199f895d96b` |
| `README.md` | 5,625 | 91 | `122d09767061` |
| `index.html` | 783 | 17 | `4e453943df7b` |
| `package-lock.json` | 111,680 | 3,274 | `1817046d8b0e` |
| `package.json` | 784 | 33 | `ba25f973eae6` |
| `src/App.tsx` | 3,143 | 71 | `72ae3816b30a` |
| `src/character/Cat.tsx` | 58,242 | 1,296 | `64731241376a` |
| `src/character/Part.tsx` | 1,234 | 34 | `29a525c79134` |
| `src/character/README.md` | 3,887 | 46 | `102214594962` |
| `src/character/expressions.ts` | 8,337 | 178 | `90384071bd2c` |
| `src/character/materials.ts` | 3,982 | 114 | `7c4558b649af` |
| `src/character/palettes.ts` | 1,473 | 55 | `d51f1020300c` |
| `src/character/poses.ts` | 11,818 | 233 | `68a27830f820` |
| `src/character/springs.ts` | 3,524 | 112 | `1a429aa83cae` |
| `src/game/sfx.ts` | 6,504 | 162 | `e9b09493429f` |
| `src/game/store.ts` | 3,826 | 128 | `6ad09ecf561c` |
| `src/game/useInput.ts` | 3,901 | 112 | `39848333b85d` |
| `src/game/world.ts` | 8,483 | 251 | `1da2fb750ecf` |
| `src/index.css` | 2,471 | 65 | `b534d9a12cc1` |
| `src/main.tsx` | 230 | 10 | `f268dc44f712` |
| `src/scenes/GameOverScene.tsx` | 4,821 | 125 | `5a875f4fb7f5` |
| `src/scenes/GameScene.tsx` | 21,329 | 618 | `ed30daae48c4` |
| `src/scenes/LabScene.tsx` | 3,505 | 88 | `6b12b5d5097c` |
| `src/scenes/MenuScene.tsx` | 4,572 | 127 | `09ae000e9c02` |
| `src/three-jsx.d.ts` | 164 | 7 | `abe8c1fe656d` |
| `src/ui/Overlays.tsx` | 19,065 | 406 | `f9479250be93` |
| `src/ui/Sky.tsx` | 1,066 | 22 | `d6c0dc0c1f05` |
| `src/utils/cn.ts` | 169 | 6 | `d1f1e0d62cb8` |
| `src/world/Backdrop.tsx` | 6,887 | 178 | `84f6cc762132` |
| `src/world/Items.tsx` | 8,770 | 195 | `9f0791cf1311` |
| `src/world/Particles.tsx` | 6,631 | 161 | `d982307e8255` |
| `src/world/Platform.tsx` | 10,904 | 237 | `089983230a1e` |
| `src/world/geometries.ts` | 3,032 | 89 | `c102ae818def` |
| `tsconfig.json` | 681 | 31 | `2a760f56fa49` |
| `vite.config.ts` | 538 | 19 | `18dd184b9091` |

## File blocks (35 files, in alphabetical order)

<<<<< BEGIN FILE: .gitignore (334 bytes) >>>>>
# dependencies
node_modules/

# build output
dist/
dist-ssr/
build/

# local env files
*.local
.env
.env.*

# logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# editor / OS
.vscode/*
!.vscode/extensions.json
.idea/
.DS_Store
Thumbs.db
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# vite / cache
.vite/
.cache/

<<<<< END FILE: .gitignore >>>>>

<<<<< BEGIN FILE: README.md (5625 bytes) >>>>>
# 🍑 Peach & Goma: SkyHop 🐾

A cozy **3D vertical hopping platformer** starring two procedurally-rigged cats — **Peach** (the pink one) and
**Goma** (the grey one). Hop forever upward across springy platforms, dissolve-through clouds, bounce pillows,
trampolines, slippery ice and crumbling ledges, dodge grumpy storm clouds, grab power-ups, collect hearts, fish &
stars, and hug cat companions along the way. Fall off the screen and it's game over!

Built as a single-page web app with **React Three Fiber** and a fully **procedural, data-driven cat rig** — no 3D
model files anywhere: every whisker, ear flop, toe bean and tail whip is math.

---

## ✨ Features

### 🐱 The cats (living character engine)
- **Two playable cats** — Peach & Goma, each with a palette *and a personality* (energy, shyness, floppiness) that changes how they move
- **39 expressions** blended over ~35 continuous facial channels: heart eyes, star eyes, dizzy spirals, shocked pin-pupils, half-lidded smug, winks, toothy grins, screams, bleh tongue, pouts, anger marks, tears, sweat, cheek puffs, shivers…
- **39 motion states** — idle, walk, run, rise, apex, fall, plummet, land, super-jump, trampoline spin, rocket, balloon float, glide, stunned, hurt, slip, balance, sit, hug, wave, celebrate, dance, sleep, yawn, stretch, groom, peek, shiver, pounce, think, bow, yum, laugh, proud…
- **Secondary motion everywhere** — squash & stretch, belly & cheek jiggle, 2-D head follow-through driven by acceleration, seam-free ears with tip-lag dynamics that flap in the wind, whiskers, a 6-link whip tail, two-bone arms with paw pads & toe beans
- **Autonomous life** — blinking (with double blinks), 2-D look-around, ear/whisker/tail twitches, and an **idle-fidget library**: stretch, groom, think (?), peek, yawn, wave, dance, and eventually **dozing off with zzz** — startle them awake!
- **Emote bubbles** — ! ? ♥ ♥♥♥ zzz ♪ 💦 ✨ 💢 and orbiting dizzy stars
- **Accessories** — balloon, rocket pack (with flame), shield bubble, umbrella, fish snack
- **Interactive** — poke the head (meow!), tickle the belly (giggle!), pull the tail (grumble!), pet them (purr ♥)
- **🔬 Cat Lab** — a showcase mode to preview every expression / pose / event / emote / accessory, with simulated velocity sliders and an auto-tour

### 🗺️ The game
- Procedural platforms with a difficulty curve: `normal`, `moving`, `cloud` (dissolves), `pillow` (super jump), `spring` trampoline (flip!), `ice` (slippery), `crumble` (shakes then falls), plus 🌵 cactus hazards
- **Power-ups**: 🚀 rocket (blast off, zaps enemies), 🎈 balloon (gentle float), 🛡️ shield (one free hit), 🧲 magnet (pulls collectibles)
- **Collectibles**: hearts, fish snacks (yum!), stars
- ⛈️ **Grump** storm clouds that get angrier when you're near and bonk you dizzy
- **Perfect-landing combos** — land dead-center for PERFECT x2, x3… (the cat gets determined, then smug 😏)
- **Companions** waiting for a hug — sitting, reading, waving or sleeping (they wake up startled when you get close)
- Milestones every 100 m, new-best celebrations, near-miss reactions, world-edge wrap
- 5 sky tiers (dawn → day → dusk → night → outer space with a ringed planet), drifting clouds, birds, sun/moon
- Synthesized WebAudio SFX (meows, purrs, giggles, boings…) — no audio files
- Mobile-friendly: touch, device tilt, portrait layout

## 🎮 Controls

| Action | Keyboard | Touch / Mobile |
| --- | --- | --- |
| Move left / right | `←` `→` or `A` `D` | touch & hold left / right half of screen, or tilt |
| Pause | `P` / `Esc` | pause button |
| Mute | `M` | mute button |

Deep-links: `#play`, `#gameover`, `#lab`.

## 🛠️ Tech stack

React 19 + TypeScript · Three.js via @react-three/fiber · Zustand · Vite + Tailwind CSS 4 (+ single-file build) ·
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
│   ├── world.ts            # platform / item / enemy generation & difficulty curve
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

Made with 🧶, springs, and a lot of ear twitches.

<<<<< END FILE: README.md >>>>>

<<<<< BEGIN FILE: index.html (783 bytes) >>>>>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
    <meta name="theme-color" content="#F4DDE5" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="description" content="Peach & Goma: SkyHop — a cozy 3D kawaii cat hopping platformer with a fully procedural, living character rig." />
    <title>Peach & Goma: SkyHop 🍑🐾</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

<<<<< END FILE: index.html >>>>>

<<<<< BEGIN FILE: package-lock.json (111680 bytes) >>>>>
{
  "name": "react-vite-tailwind",
  "version": "0.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "react-vite-tailwind",
      "version": "0.0.0",
      "dependencies": {
        "@react-three/drei": "^10.7.8",
        "@react-three/fiber": "^9.7.0",
        "@types/three": "^0.185.4",
        "clsx": "2.1.1",
        "react": "19.2.6",
        "react-dom": "19.2.6",
        "tailwind-merge": "3.4.0",
        "three": "^0.185.1",
        "zustand": "^5.0.15"
      },
      "devDependencies": {
        "@tailwindcss/vite": "4.1.17",
        "@types/node": "22.19.17",
        "@types/react": "19.2.7",
        "@types/react-dom": "19.2.3",
        "@vitejs/plugin-react": "5.1.1",
        "tailwindcss": "4.1.17",
        "typescript": "5.9.3",
        "vite": "7.3.2",
        "vite-plugin-singlefile": "2.3.0"
      }
    },
    "node_modules/@babel/code-frame": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.29.7.tgz",
      "integrity": "sha512-Aup7aUOfpbAUg2ROOJN6Iw5f9DMBlzu0mIkm/malLQFN/YQgO48wCj0Kxa3sEHJvPVFg7siR+qRInwXd2qhQKw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-validator-identifier": "^7.29.7",
        "js-tokens": "^4.0.0",
        "picocolors": "^1.1.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/compat-data": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/compat-data/-/compat-data-7.29.7.tgz",
      "integrity": "sha512-locTkQyKvwIEgBzVrn8693ebc97F2U8ZHjbXwDXJ5Fn2TCpNwTlKcaKLkdHop5c/icOFE7qt7Q9JC5hnKNa6Gg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/core": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/core/-/core-7.29.7.tgz",
      "integrity": "sha512-RgHBCvtjbOK2gXSNBNIkNoEc9qoVEtau3hj8gEqKQuL3HZAibKarWFEI3Lfm6EYKkLalOh8eSrj9b+ch9H/VBA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.7",
        "@babel/generator": "^7.29.7",
        "@babel/helper-compilation-targets": "^7.29.7",
        "@babel/helper-module-transforms": "^7.29.7",
        "@babel/helpers": "^7.29.7",
        "@babel/parser": "^7.29.7",
        "@babel/template": "^7.29.7",
        "@babel/traverse": "^7.29.7",
        "@babel/types": "^7.29.7",
        "@jridgewell/remapping": "^2.3.5",
        "convert-source-map": "^2.0.0",
        "debug": "^4.1.0",
        "gensync": "^1.0.0-beta.2",
        "json5": "^2.2.3",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/babel"
      }
    },
    "node_modules/@babel/generator": {
      "version": "7.29.8",
      "resolved": "https://registry.npmjs.org/@babel/generator/-/generator-7.29.8.tgz",
      "integrity": "sha512-gZbepsdh3WDtgZKWL+vTPh71LSBrm/Y4/QDZBVCcYfmeTEEuoOYwlSy+G1StfJg+/Zy550u/3TATbm7qDbbMtg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.29.8",
        "@babel/types": "^7.29.8",
        "@jridgewell/gen-mapping": "^0.3.12",
        "@jridgewell/trace-mapping": "^0.3.28",
        "jsesc": "^3.0.2"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-compilation-targets": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-compilation-targets/-/helper-compilation-targets-7.29.7.tgz",
      "integrity": "sha512-wem6WaBj4NaVYVdNhLPPVacES6ZJ+KBBfSkTMD3YZxbP3rm3Di85tJU5ljaUNhaOynt+Aj0xruhYuzQBt8n71g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/compat-data": "^7.29.7",
        "@babel/helper-validator-option": "^7.29.7",
        "browserslist": "^4.24.0",
        "lru-cache": "^5.1.1",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-globals": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-globals/-/helper-globals-7.29.7.tgz",
      "integrity": "sha512-3nQVUAtvkKH9zahfWgw96Jc/uFOmjACE1kQz82E2lqWmHBgjzbNlsC22nuQTfahmWeQtTq5nQ/4Nnd2A1wj4zA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-imports": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-imports/-/helper-module-imports-7.29.7.tgz",
      "integrity": "sha512-ejHwrQQYcm9xnTivShn2IDOlIzInN34AXskvq9QicvCtEzq1Vzclu/tKF8Jq1Cg8JG2GL6/EmjgsCT7lXepE3g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/traverse": "^7.29.7",
        "@babel/types": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-transforms": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-transforms/-/helper-module-transforms-7.29.7.tgz",
      "integrity": "sha512-UPUVSyXbOh627KiCIGQSgwWzGeBKLkaJ9PJEdrngIwMSzxLR4jS4+f1f1jb7VzBbg8nFLaYotvVPFCTqdrmTAg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-module-imports": "^7.29.7",
        "@babel/helper-validator-identifier": "^7.29.7",
        "@babel/traverse": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-plugin-utils": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-plugin-utils/-/helper-plugin-utils-7.29.7.tgz",
      "integrity": "sha512-G7sHYigPY17oO5SYWnfD/0MTBwVR781S/JI643e/JhUYgVgWE/61SoW3NH9KWUKyKq5LVh3npif99Wkt6j86Jw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-string-parser": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-string-parser/-/helper-string-parser-7.29.7.tgz",
      "integrity": "sha512-Pb5ijPrZ89GDH8223L4UP8i6QApWxs04RbPQJTeWDV0/keR2E36MeKnyr6LYmUUvqRRI+Iv87SuF1W6ErINzYw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-identifier": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.29.7.tgz",
      "integrity": "sha512-qehxGkRj55h/ff8EMaJ+cYhyaKlHIxqYDn682wQD7RNp9UujOQsHog2uS0r2vzr4pW+sXf90NeeayjcNaX3fFg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-option": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-option/-/helper-validator-option-7.29.7.tgz",
      "integrity": "sha512-N9ZErrD+yW5geCDtBqnOoxmR8+tNKiGuxKlDpuJxfsqpa2dFcexaziGAE/qoHLiDDreVNMupxGmSoNlyvsA3gw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helpers": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helpers/-/helpers-7.29.7.tgz",
      "integrity": "sha512-1k2lAGRMfHTcwuNYcCNUmaUffmQv8KWMfh2iJUUeRlwlwH4FdNG7mfPI10NPfLHJFThE4Tyr4mv7kTNZOiPuBg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/template": "^7.29.7",
        "@babel/types": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/parser": {
      "version": "7.29.8",
      "resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.29.8.tgz",
      "integrity": "sha512-E8lTAYNB1KW+FH+VGJuZM1ioAx2E6oVlvQFRrf5P8ZZmsiJXYAD9vTFV7yyEURNzgh1dFqMZuO6tUwcARbqFCA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.29.8"
      },
      "bin": {
        "parser": "bin/babel-parser.js"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@babel/plugin-transform-react-jsx-self": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-self/-/plugin-transform-react-jsx-self-7.29.7.tgz",
      "integrity": "sha512-TL0hMc9xzy86VD31nUiwzd5otRAcyEPcsegCxolO0PvcXuH1v0kECe/UIznYFihpkvU5wg/jk4v0TTEFfm53fw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-react-jsx-source": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-source/-/plugin-transform-react-jsx-source-7.29.7.tgz",
      "integrity": "sha512-06IyK09H3wi4cGbhDBwp5gUGo0IKtnYa8tyTiephirPCK6fbobVGiXMMI5zLQ4aKEYP3wZ3ArU44o+8KMrSG/Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/runtime": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/runtime/-/runtime-7.29.7.tgz",
      "integrity": "sha512-Nq8OhGWiZIZGV6hLHoyAKLLcJihP/xFeBMGJoUrxTX2psI8dCifzLhZISFb+VWS3wFMRDmCGw5R+dOySCqPLhw==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/template": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/template/-/template-7.29.7.tgz",
      "integrity": "sha512-puq+Gf35oI24FeN11LkoUQFqv9uwNeWpxXZi/Ji3rRIoKAzKnxRaZ+Gkj0vKS9ZCiTESfng1N9LyOyXvo+m+Gg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.7",
        "@babel/parser": "^7.29.7",
        "@babel/types": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/traverse": {
      "version": "7.29.8",
      "resolved": "https://registry.npmjs.org/@babel/traverse/-/traverse-7.29.8.tgz",
      "integrity": "sha512-I5z7H3bf/41ktsNVLtpN0wAa336HkqIHQ5BuPLEhTkt1jVSyZpeNKIzTgEWmlxjdg81R0IgUCcaE+Ok3NvrfZg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.7",
        "@babel/generator": "^7.29.8",
        "@babel/helper-globals": "^7.29.7",
        "@babel/parser": "^7.29.8",
        "@babel/template": "^7.29.7",
        "@babel/types": "^7.29.8",
        "debug": "^4.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/types": {
      "version": "7.29.8",
      "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.29.8.tgz",
      "integrity": "sha512-Vj1jF3cPfxg7OAfoI7QnVKLoILlm2JF9pnVHrX8qx7AHMiYWT+NDAA7jChlNgRS4WTLc/fD1lXLmPixluj+3Gg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-string-parser": "^7.29.7",
        "@babel/helper-validator-identifier": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@dimforge/rapier3d-compat": {
      "version": "0.12.0",
      "resolved": "https://registry.npmjs.org/@dimforge/rapier3d-compat/-/rapier3d-compat-0.12.0.tgz",
      "integrity": "sha512-uekIGetywIgopfD97oDL5PfeezkFpNhwlzlaEYNOA0N6ghdsOvh/HYjSMek5Q2O1PYvRSDFcqFVJl4r4ZBwOow==",
      "license": "Apache-2.0"
    },
    "node_modules/@esbuild/aix-ppc64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/aix-ppc64/-/aix-ppc64-0.27.7.tgz",
      "integrity": "sha512-EKX3Qwmhz1eMdEJokhALr0YiD0lhQNwDqkPYyPhiSwKrh7/4KRjQc04sZ8db+5DVVnZ1LmbNDI1uAMPEUBnQPg==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "aix"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-arm": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm/-/android-arm-0.27.7.tgz",
      "integrity": "sha512-jbPXvB4Yj2yBV7HUfE2KHe4GJX51QplCN1pGbYjvsyCZbQmies29EoJbkEc+vYuU5o45AfQn37vZlyXy4YJ8RQ==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-arm64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm64/-/android-arm64-0.27.7.tgz",
      "integrity": "sha512-62dPZHpIXzvChfvfLJow3q5dDtiNMkwiRzPylSCfriLvZeq0a1bWChrGx/BbUbPwOrsWKMn8idSllklzBy+dgQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-x64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/android-x64/-/android-x64-0.27.7.tgz",
      "integrity": "sha512-x5VpMODneVDb70PYV2VQOmIUUiBtY3D3mPBG8NxVk5CogneYhkR7MmM3yR/uMdITLrC1ml/NV1rj4bMJuy9MCg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/darwin-arm64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-arm64/-/darwin-arm64-0.27.7.tgz",
      "integrity": "sha512-5lckdqeuBPlKUwvoCXIgI2D9/ABmPq3Rdp7IfL70393YgaASt7tbju3Ac+ePVi3KDH6N2RqePfHnXkaDtY9fkw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/darwin-x64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-x64/-/darwin-x64-0.27.7.tgz",
      "integrity": "sha512-rYnXrKcXuT7Z+WL5K980jVFdvVKhCHhUwid+dDYQpH+qu+TefcomiMAJpIiC2EM3Rjtq0sO3StMV/+3w3MyyqQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/freebsd-arm64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-arm64/-/freebsd-arm64-0.27.7.tgz",
      "integrity": "sha512-B48PqeCsEgOtzME2GbNM2roU29AMTuOIN91dsMO30t+Ydis3z/3Ngoj5hhnsOSSwNzS+6JppqWsuhTp6E82l2w==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/freebsd-x64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-x64/-/freebsd-x64-0.27.7.tgz",
      "integrity": "sha512-jOBDK5XEjA4m5IJK3bpAQF9/Lelu/Z9ZcdhTRLf4cajlB+8VEhFFRjWgfy3M1O4rO2GQ/b2dLwCUGpiF/eATNQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-arm": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm/-/linux-arm-0.27.7.tgz",
      "integrity": "sha512-RkT/YXYBTSULo3+af8Ib0ykH8u2MBh57o7q/DAs3lTJlyVQkgQvlrPTnjIzzRPQyavxtPtfg0EopvDyIt0j1rA==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-arm64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm64/-/linux-arm64-0.27.7.tgz",
      "integrity": "sha512-RZPHBoxXuNnPQO9rvjh5jdkRmVizktkT7TCDkDmQ0W2SwHInKCAV95GRuvdSvA7w4VMwfCjUiPwDi0ZO6Nfe9A==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-ia32": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ia32/-/linux-ia32-0.27.7.tgz",
      "integrity": "sha512-GA48aKNkyQDbd3KtkplYWT102C5sn/EZTY4XROkxONgruHPU72l+gW+FfF8tf2cFjeHaRbWpOYa/uRBz/Xq1Pg==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-loong64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-loong64/-/linux-loong64-0.27.7.tgz",
      "integrity": "sha512-a4POruNM2oWsD4WKvBSEKGIiWQF8fZOAsycHOt6JBpZ+JN2n2JH9WAv56SOyu9X5IqAjqSIPTaJkqN8F7XOQ5Q==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-mips64el": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-mips64el/-/linux-mips64el-0.27.7.tgz",
      "integrity": "sha512-KabT5I6StirGfIz0FMgl1I+R1H73Gp0ofL9A3nG3i/cYFJzKHhouBV5VWK1CSgKvVaG4q1RNpCTR2LuTVB3fIw==",
      "cpu": [
        "mips64el"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-ppc64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ppc64/-/linux-ppc64-0.27.7.tgz",
      "integrity": "sha512-gRsL4x6wsGHGRqhtI+ifpN/vpOFTQtnbsupUF5R5YTAg+y/lKelYR1hXbnBdzDjGbMYjVJLJTd2OFmMewAgwlQ==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-riscv64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-riscv64/-/linux-riscv64-0.27.7.tgz",
      "integrity": "sha512-hL25LbxO1QOngGzu2U5xeXtxXcW+/GvMN3ejANqXkxZ/opySAZMrc+9LY/WyjAan41unrR3YrmtTsUpwT66InQ==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-s390x": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-s390x/-/linux-s390x-0.27.7.tgz",
      "integrity": "sha512-2k8go8Ycu1Kb46vEelhu1vqEP+UeRVj2zY1pSuPdgvbd5ykAw82Lrro28vXUrRmzEsUV0NzCf54yARIK8r0fdw==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-x64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-x64/-/linux-x64-0.27.7.tgz",
      "integrity": "sha512-hzznmADPt+OmsYzw1EE33ccA+HPdIqiCRq7cQeL1Jlq2gb1+OyWBkMCrYGBJ+sxVzve2ZJEVeePbLM2iEIZSxA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/netbsd-arm64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-arm64/-/netbsd-arm64-0.27.7.tgz",
      "integrity": "sha512-b6pqtrQdigZBwZxAn1UpazEisvwaIDvdbMbmrly7cDTMFnw/+3lVxxCTGOrkPVnsYIosJJXAsILG9XcQS+Yu6w==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/netbsd-x64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-x64/-/netbsd-x64-0.27.7.tgz",
      "integrity": "sha512-OfatkLojr6U+WN5EDYuoQhtM+1xco+/6FSzJJnuWiUw5eVcicbyK3dq5EeV/QHT1uy6GoDhGbFpprUiHUYggrw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openbsd-arm64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-arm64/-/openbsd-arm64-0.27.7.tgz",
      "integrity": "sha512-AFuojMQTxAz75Fo8idVcqoQWEHIXFRbOc1TrVcFSgCZtQfSdc1RXgB3tjOn/krRHENUB4j00bfGjyl2mJrU37A==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openbsd-x64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-x64/-/openbsd-x64-0.27.7.tgz",
      "integrity": "sha512-+A1NJmfM8WNDv5CLVQYJ5PshuRm/4cI6WMZRg1by1GwPIQPCTs1GLEUHwiiQGT5zDdyLiRM/l1G0Pv54gvtKIg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openharmony-arm64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/openharmony-arm64/-/openharmony-arm64-0.27.7.tgz",
      "integrity": "sha512-+KrvYb/C8zA9CU/g0sR6w2RBw7IGc5J2BPnc3dYc5VJxHCSF1yNMxTV5LQ7GuKteQXZtspjFbiuW5/dOj7H4Yw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/sunos-x64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/sunos-x64/-/sunos-x64-0.27.7.tgz",
      "integrity": "sha512-ikktIhFBzQNt/QDyOL580ti9+5mL/YZeUPKU2ivGtGjdTYoqz6jObj6nOMfhASpS4GU4Q/Clh1QtxWAvcYKamA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "sunos"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-arm64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-arm64/-/win32-arm64-0.27.7.tgz",
      "integrity": "sha512-7yRhbHvPqSpRUV7Q20VuDwbjW5kIMwTHpptuUzV+AA46kiPze5Z7qgt6CLCK3pWFrHeNfDd1VKgyP4O+ng17CA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-ia32": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-ia32/-/win32-ia32-0.27.7.tgz",
      "integrity": "sha512-SmwKXe6VHIyZYbBLJrhOoCJRB/Z1tckzmgTLfFYOfpMAx63BJEaL9ExI8x7v0oAO3Zh6D/Oi1gVxEYr5oUCFhw==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-x64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-x64/-/win32-x64-0.27.7.tgz",
      "integrity": "sha512-56hiAJPhwQ1R4i+21FVF7V8kSD5zZTdHcVuRFMW0hn753vVfQN8xlx4uOPT4xoGH0Z/oVATuR82AiqSTDIpaHg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@jridgewell/gen-mapping": {
      "version": "0.3.13",
      "resolved": "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.13.tgz",
      "integrity": "sha512-2kkt/7niJ6MgEPxF0bYdQ6etZaA+fQvDcLKckhy1yIQOzaoKjBBjSj63/aLVjYE3qhRt5dvM+uUyfCg6UKCBbA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.0",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/remapping": {
      "version": "2.3.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/remapping/-/remapping-2.3.5.tgz",
      "integrity": "sha512-LI9u/+laYG4Ds1TDKSJW2YPrIlcVYOwi2fUC6xB43lueCjgxV4lffOCZCtYFiH6TNOX+tQKXx97T4IKHbhyHEQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.5",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/resolve-uri": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",
      "integrity": "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/sourcemap-codec": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.6.0.tgz",
      "integrity": "sha512-T7jf+5zgsZHwNJ4lvQ7/aezbyk0nNX+zJVWpmHA7VYsEx7a7qr5Rg5IbtJFqkgze5Y2sruq1RUY8Q837Od7iFw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@jridgewell/trace-mapping": {
      "version": "0.3.31",
      "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.31.tgz",
      "integrity": "sha512-zzNR+SdQSDJzc8joaeP8QQoCQr8NuYx2dIIytl1QeBEZHJ9uW6hebsrYgbz8hJwUQao3TWCMtmfV8Nu1twOLAw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/resolve-uri": "^3.1.0",
        "@jridgewell/sourcemap-codec": "^1.4.14"
      }
    },
    "node_modules/@mediapipe/tasks-vision": {
      "version": "0.10.17",
      "resolved": "https://registry.npmjs.org/@mediapipe/tasks-vision/-/tasks-vision-0.10.17.tgz",
      "integrity": "sha512-CZWV/q6TTe8ta61cZXjfnnHsfWIdFhms03M9T7Cnd5y2mdpylJM0rF1qRq+wsQVRMLz1OYPVEBU9ph2Bx8cxrg==",
      "license": "Apache-2.0"
    },
    "node_modules/@monogrid/gainmap-js": {
      "version": "3.4.0",
      "resolved": "https://registry.npmjs.org/@monogrid/gainmap-js/-/gainmap-js-3.4.0.tgz",
      "integrity": "sha512-2Z0FATFHaoYJ8b+Y4y4Hgfn3FRFwuU5zRrk+9dFWp4uGAdHGqVEdP7HP+gLA3X469KXHmfupJaUbKo1b/aDKIg==",
      "license": "MIT",
      "dependencies": {
        "promise-worker-transferable": "^1.0.4"
      },
      "peerDependencies": {
        "three": ">= 0.159.0"
      }
    },
    "node_modules/@napi-rs/lzma-linux-x64-gnu": {
      "version": "1.5.1",
      "resolved": "https://registry.npmjs.org/@napi-rs/lzma-linux-x64-gnu/-/lzma-linux-x64-gnu-1.5.1.tgz",
      "integrity": "sha512-oTXEIha4SsuXdTA4Iyskj0kpdx2yVXdhd75c2v3xGrHFfVMsbhTPZU/nMPL4sWKo4pBHm3aucLaqGlF696dTyQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^22.20 || ^24.12 || >=25"
      }
    },
    "node_modules/@react-three/drei": {
      "version": "10.7.8",
      "resolved": "https://registry.npmjs.org/@react-three/drei/-/drei-10.7.8.tgz",
      "integrity": "sha512-rJXyuzLm2Xq0kafHuR47ajDGbOe/pEhzIr4m8E8zwzQs0iNjloFDqBwRhrXmP/w+onLeYyN3EYPFW/cwWK/4yA==",
      "license": "MIT",
      "dependencies": {
        "@babel/runtime": "^7.26.0",
        "@mediapipe/tasks-vision": "0.10.17",
        "@monogrid/gainmap-js": "^3.0.6",
        "@use-gesture/react": "^10.3.1",
        "camera-controls": "^3.1.0",
        "cross-env": "^7.0.3",
        "detect-gpu": "^5.0.56",
        "glsl-noise": "^0.0.0",
        "hls.js": "^1.5.17",
        "maath": "^0.10.8",
        "meshline": "^3.3.1",
        "stats-gl": "^2.2.8",
        "stats.js": "^0.17.0",
        "suspend-react": "^0.1.3",
        "three-mesh-bvh": "^0.8.3",
        "three-stdlib": "^2.35.6",
        "troika-three-text": "^0.52.4",
        "tunnel-rat": "^0.1.2",
        "use-sync-external-store": "^1.4.0",
        "utility-types": "^3.11.0",
        "zustand": "^5.0.1"
      },
      "peerDependencies": {
        "@react-three/fiber": "^9.0.0",
        "react": "^19",
        "react-dom": "^19",
        "three": ">=0.159"
      },
      "peerDependenciesMeta": {
        "react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@react-three/fiber": {
      "version": "9.7.0",
      "resolved": "https://registry.npmjs.org/@react-three/fiber/-/fiber-9.7.0.tgz",
      "integrity": "sha512-EWm9FwcaOZQu/ExFW5rggoCMM1NJet5YbxVxKaOE+KSncrjU0Wx7017qSyGFvupviK89nMYGCWU3BIK4dI1clw==",
      "license": "MIT",
      "dependencies": {
        "@babel/runtime": "^7.17.8",
        "@types/webxr": "*",
        "base64-js": "^1.5.1",
        "buffer": "^6.0.3",
        "its-fine": "^2.0.0",
        "react-use-measure": "^2.1.7",
        "scheduler": "^0.27.0",
        "suspend-react": "^0.1.3",
        "use-sync-external-store": "^1.4.0",
        "zustand": "^5.0.3"
      },
      "peerDependencies": {
        "expo": ">=43.0",
        "expo-asset": ">=8.4",
        "expo-file-system": ">=11.0",
        "expo-gl": ">=11.0",
        "react": ">=19 <19.3",
        "react-dom": ">=19 <19.3",
        "react-native": ">=0.78",
        "three": ">=0.156"
      },
      "peerDependenciesMeta": {
        "expo": {
          "optional": true
        },
        "expo-asset": {
          "optional": true
        },
        "expo-file-system": {
          "optional": true
        },
        "expo-gl": {
          "optional": true
        },
        "react-dom": {
          "optional": true
        },
        "react-native": {
          "optional": true
        }
      }
    },
    "node_modules/@rolldown/pluginutils": {
      "version": "1.0.0-beta.47",
      "resolved": "https://registry.npmjs.org/@rolldown/pluginutils/-/pluginutils-1.0.0-beta.47.tgz",
      "integrity": "sha512-8QagwMH3kNCuzD8EWL8R2YPW5e4OrHNSAHRFDdmFqEwEaD/KcNKjVoumo+gP2vW5eKB2UPbM6vTYiGZX0ixLnw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@rollup/rollup-android-arm-eabi": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm-eabi/-/rollup-android-arm-eabi-4.63.1.tgz",
      "integrity": "sha512-UZ8sUxPTiHWYX9QNdJedb1kDZSpS1t/VPWBWGSgqHNi9w3Cu6IXvu2mzbhiTiPvtrqgTQJ+zqiAq2iPIPilpaQ==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-android-arm64": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm64/-/rollup-android-arm64-4.63.1.tgz",
      "integrity": "sha512-cQ4nFQABN5cDvDpbvJ7bMStCpnaVxynZrRMfUJYgxcIk9Sh54FIO1vtfkg0B69REjER77ioZ/ov+eAApx/KmLQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-darwin-arm64": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-arm64/-/rollup-darwin-arm64-4.63.1.tgz",
      "integrity": "sha512-FQNqd1lRy/0QhDk3xeRIkSBiCpXCiDnZO3YLVdcDKN1UBiKToNftCzcXYNLshmPDUMlu2TdeS8tGcsU6f3YF1Q==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@rollup/rollup-darwin-x64": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-x64/-/rollup-darwin-x64-4.63.1.tgz",
      "integrity": "sha512-pvD16V939D3CloK0+qikpGaxiPrDUXTe7Y5cWOMkMSy7m1cawa8EGy/kXYi/G/cKAC4HDAbSnzCIk1WmsoOKXg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@rollup/rollup-freebsd-arm64": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-arm64/-/rollup-freebsd-arm64-4.63.1.tgz",
      "integrity": "sha512-pcFGeL2345VwdTnJhA6zLbew+YgWB0qBG2+dMtXjCicf6+rm6kO6cOoh5VnTe0ZMrMRgRyuHmCJxZWrIdzYuOw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@rollup/rollup-freebsd-x64": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-x64/-/rollup-freebsd-x64-4.63.1.tgz",
      "integrity": "sha512-mRJlqSRulVzcKq/LKA6ICSIc3K/l4fzlVn/gePn2nXIHy8seRi5z/eeRE0d/XMBxcMldiXtQTSpRj0tkkC3g8Q==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm-gnueabihf": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-gnueabihf/-/rollup-linux-arm-gnueabihf-4.63.1.tgz",
      "integrity": "sha512-YDUNvVM85TI3g/1OpnqKP1h4NeW/j64DfWMf+G3M809xNk1bJSnpFp4sh83NpmVE5DXnkh8ULor4LTVZKoYLHw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm-musleabihf": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-musleabihf/-/rollup-linux-arm-musleabihf-4.63.1.tgz",
      "integrity": "sha512-7Mcn71p9ZuQFAj+h+dhQXy/yeLePRS2yKRnmW1DijA9thKO5qap0GNOIQK4yQ6iP3SU0Mrb/yWo8h8vgRba8lw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm64-gnu": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-gnu/-/rollup-linux-arm64-gnu-4.63.1.tgz",
      "integrity": "sha512-4YiLQTX6U4CSl0L9cluep9A9W6UmTfqBDc2/CH6wlu54pl4E7Jn3cOD8oxzvBDEGk/JMKgJ47C8g+radF7mwvg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm64-musl": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-musl/-/rollup-linux-arm64-musl-4.63.1.tgz",
      "integrity": "sha512-2ra8F7w8OquwZN9z2/fKFnli69wa8PLwaVzRMIPGb13ByMJwC28Fbp8YcVGoUhlYMTt7j5j9bNgpysrN2UM+vw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-loong64-gnu": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-loong64-gnu/-/rollup-linux-loong64-gnu-4.63.1.tgz",
      "integrity": "sha512-Sy20ncyhjmBP0Ml+UvQbimjlk6VFgjW5uNP+qqwHB00mTE8Bl2C1TuHTlRwK2YoXeZbee5lP2XevBWVkAQAtSQ==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-loong64-musl": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-loong64-musl/-/rollup-linux-loong64-musl-4.63.1.tgz",
      "integrity": "sha512-noITLp8oNjYliPnGWmLyelIHwULGqbHloQHGw1rtxbWhTuWooRpnZarZQJ1y9EUC4szuCusCc+HEpUtxpIwYvA==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-ppc64-gnu": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-ppc64-gnu/-/rollup-linux-ppc64-gnu-4.63.1.tgz",
      "integrity": "sha512-hlxxXd+F1mWiAcaFR7Sv9ZQT6m6UfI8+Vy/kFJzztq2pDMU/0wZ9sish0iszNZvsQDo8Gc0i5yuFEOz5dDf6fA==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-ppc64-musl": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-ppc64-musl/-/rollup-linux-ppc64-musl-4.63.1.tgz",
      "integrity": "sha512-EF7OpqQTQ/BvGqLzUi4rEHuagCV9MugAUXSHemwPW5vxZ75RR+jxO/2j95Ph2dalMpFHSVECjRoioHZgA9zOYA==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-riscv64-gnu": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-gnu/-/rollup-linux-riscv64-gnu-4.63.1.tgz",
      "integrity": "sha512-wQO3JesW9PRkwlabQ27y7sPfVOOTLRG73I4F2UYHG5PXun3J9U3y+b7ezVKSYbsvSKGQ1k1cq8Qlun4C9kLt3w==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-riscv64-musl": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-musl/-/rollup-linux-riscv64-musl-4.63.1.tgz",
      "integrity": "sha512-ouAGwhO6wHRXdnOVCOsB0tRFkA7nhNB2Nwax6oECXN0YiN8EYUTBAOudADOB1PI+yDL61TeNx/u7MVCzksNbkQ==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-s390x-gnu": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-s390x-gnu/-/rollup-linux-s390x-gnu-4.63.1.tgz",
      "integrity": "sha512-q2R38Sn+1J8RxhfJ+T54wSWmyKXWec+9jgDfqO2AtArEqHO5R2aeayp5H5OYLr5UYDVGsVaZPEFUooMhYCdz5A==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-x64-gnu": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-gnu/-/rollup-linux-x64-gnu-4.63.1.tgz",
      "integrity": "sha512-gfI5T24WLLuFfSKw7Go/zDXjAAV0fny0swTaDv+WjK7vqcw4cRhFfdsyKL1n+ukI+ooBxn3bVQnyrn06WpI50w==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-x64-musl": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-musl/-/rollup-linux-x64-musl-4.63.1.tgz",
      "integrity": "sha512-4h6XqthmB4Hspji84wvgk+ElodTsGj+dbZqHJHHtKxj4mYq0ANSEEPX9ys3moJueqsRjwpaJYH7874Itwnj2ow==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-openbsd-x64": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-openbsd-x64/-/rollup-openbsd-x64-4.63.1.tgz",
      "integrity": "sha512-dlfCOa87o1VAYegLQ9EKilx2JCeRofiyPGhTCmqnuXZ6bMPiycO1rq1+sKoulAp7pGLIsTIw+1x5R+zgh5LhhA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ]
    },
    "node_modules/@rollup/rollup-openharmony-arm64": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-openharmony-arm64/-/rollup-openharmony-arm64-4.63.1.tgz",
      "integrity": "sha512-cjkLbOlfcm3QGhMM1J5zaZjsw1GggbN6rw9UTSSRrPrR1KkcXnN7Uq9rPw34xImQ9VOY9GN+6u2Zj80B9ptkcw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ]
    },
    "node_modules/@rollup/rollup-win32-arm64-msvc": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-arm64-msvc/-/rollup-win32-arm64-msvc-4.63.1.tgz",
      "integrity": "sha512-Li1KdUnWGE4N3e1F/B4RTB1ms+nG4WBgjByO46pkeBVX/2UBsY53xf5vK9WygVmnH3RwncIST7lkSdLSY6P9lg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-ia32-msvc": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-ia32-msvc/-/rollup-win32-ia32-msvc-4.63.1.tgz",
      "integrity": "sha512-t4ZYOSoLTgwhuFMrmTMLx/+i1DQVK7HYqMc6kY46EApwi8X0nIVphzdNoThU3xt6n+N5urG1/gxBdCaKDLavfg==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-x64-gnu": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-x64-gnu/-/rollup-win32-x64-gnu-4.63.1.tgz",
      "integrity": "sha512-RgroPfMmKlD1RzSDxvwgcPiy2HNQKoYV7OmwIXDsk73uKW5t6B/V8KIy27SMv/FNXFo/oSBtWc9J0X7t91ezZg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-x64-msvc": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-x64-msvc/-/rollup-win32-x64-msvc-4.63.1.tgz",
      "integrity": "sha512-at8QVep6S3h5Y6gSbdGU06bRY5WJkf6WUduM9YtvYMbYhB1MOFfUgc6kehitQXzOtMSaT70q7f9ydPhpqu821w==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@tailwindcss/node": {
      "version": "4.1.17",
      "resolved": "https://registry.npmjs.org/@tailwindcss/node/-/node-4.1.17.tgz",
      "integrity": "sha512-csIkHIgLb3JisEFQ0vxr2Y57GUNYh447C8xzwj89U/8fdW8LhProdxvnVH6U8M2Y73QKiTIH+LWbK3V2BBZsAg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/remapping": "^2.3.4",
        "enhanced-resolve": "^5.18.3",
        "jiti": "^2.6.1",
        "lightningcss": "1.30.2",
        "magic-string": "^0.30.21",
        "source-map-js": "^1.2.1",
        "tailwindcss": "4.1.17"
      }
    },
    "node_modules/@tailwindcss/oxide": {
      "version": "4.1.17",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide/-/oxide-4.1.17.tgz",
      "integrity": "sha512-F0F7d01fmkQhsTjXezGBLdrl1KresJTcI3DB8EkScCldyKp3Msz4hub4uyYaVnk88BAS1g5DQjjF6F5qczheLA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 10"
      },
      "optionalDependencies": {
        "@tailwindcss/oxide-android-arm64": "4.1.17",
        "@tailwindcss/oxide-darwin-arm64": "4.1.17",
        "@tailwindcss/oxide-darwin-x64": "4.1.17",
        "@tailwindcss/oxide-freebsd-x64": "4.1.17",
        "@tailwindcss/oxide-linux-arm-gnueabihf": "4.1.17",
        "@tailwindcss/oxide-linux-arm64-gnu": "4.1.17",
        "@tailwindcss/oxide-linux-arm64-musl": "4.1.17",
        "@tailwindcss/oxide-linux-x64-gnu": "4.1.17",
        "@tailwindcss/oxide-linux-x64-musl": "4.1.17",
        "@tailwindcss/oxide-wasm32-wasi": "4.1.17",
        "@tailwindcss/oxide-win32-arm64-msvc": "4.1.17",
        "@tailwindcss/oxide-win32-x64-msvc": "4.1.17"
      }
    },
    "node_modules/@tailwindcss/oxide-android-arm64": {
      "version": "4.1.17",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-android-arm64/-/oxide-android-arm64-4.1.17.tgz",
      "integrity": "sha512-BMqpkJHgOZ5z78qqiGE6ZIRExyaHyuxjgrJ6eBO5+hfrfGkuya0lYfw8fRHG77gdTjWkNWEEm+qeG2cDMxArLQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@tailwindcss/oxide-darwin-arm64": {
      "version": "4.1.17",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-darwin-arm64/-/oxide-darwin-arm64-4.1.17.tgz",
      "integrity": "sha512-EquyumkQweUBNk1zGEU/wfZo2qkp/nQKRZM8bUYO0J+Lums5+wl2CcG1f9BgAjn/u9pJzdYddHWBiFXJTcxmOg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@tailwindcss/oxide-darwin-x64": {
      "version": "4.1.17",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-darwin-x64/-/oxide-darwin-x64-4.1.17.tgz",
      "integrity": "sha512-gdhEPLzke2Pog8s12oADwYu0IAw04Y2tlmgVzIN0+046ytcgx8uZmCzEg4VcQh+AHKiS7xaL8kGo/QTiNEGRog==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@tailwindcss/oxide-freebsd-x64": {
      "version": "4.1.17",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-freebsd-x64/-/oxide-freebsd-x64-4.1.17.tgz",
      "integrity": "sha512-hxGS81KskMxML9DXsaXT1H0DyA+ZBIbyG/sSAjWNe2EDl7TkPOBI42GBV3u38itzGUOmFfCzk1iAjDXds8Oh0g==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm-gnueabihf": {
      "version": "4.1.17",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm-gnueabihf/-/oxide-linux-arm-gnueabihf-4.1.17.tgz",
      "integrity": "sha512-k7jWk5E3ldAdw0cNglhjSgv501u7yrMf8oeZ0cElhxU6Y2o7f8yqelOp3fhf7evjIS6ujTI3U8pKUXV2I4iXHQ==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm64-gnu": {
      "version": "4.1.17",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm64-gnu/-/oxide-linux-arm64-gnu-4.1.17.tgz",
      "integrity": "sha512-HVDOm/mxK6+TbARwdW17WrgDYEGzmoYayrCgmLEw7FxTPLcp/glBisuyWkFz/jb7ZfiAXAXUACfyItn+nTgsdQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm64-musl": {
      "version": "4.1.17",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm64-musl/-/oxide-linux-arm64-musl-4.1.17.tgz",
      "integrity": "sha512-HvZLfGr42i5anKtIeQzxdkw/wPqIbpeZqe7vd3V9vI3RQxe3xU1fLjss0TjyhxWcBaipk7NYwSrwTwK1hJARMg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-x64-gnu": {
      "version": "4.1.17",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-x64-gnu/-/oxide-linux-x64-gnu-4.1.17.tgz",
      "integrity": "sha512-M3XZuORCGB7VPOEDH+nzpJ21XPvK5PyjlkSFkFziNHGLc5d6g3di2McAAblmaSUNl8IOmzYwLx9NsE7bplNkwQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-x64-musl": {
      "version": "4.1.17",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-x64-musl/-/oxide-linux-x64-musl-4.1.17.tgz",
      "integrity": "sha512-k7f+pf9eXLEey4pBlw+8dgfJHY4PZ5qOUFDyNf7SI6lHjQ9Zt7+NcscjpwdCEbYi6FI5c2KDTDWyf2iHcCSyyQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@tailwindcss/oxide-wasm32-wasi": {
      "version": "4.1.17",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-wasm32-wasi/-/oxide-wasm32-wasi-4.1.17.tgz",
      "integrity": "sha512-cEytGqSSoy7zK4JRWiTCx43FsKP/zGr0CsuMawhH67ONlH+T79VteQeJQRO/X7L0juEUA8ZyuYikcRBf0vsxhg==",
      "bundleDependencies": [
        "@napi-rs/wasm-runtime",
        "@emnapi/core",
        "@emnapi/runtime",
        "@tybys/wasm-util",
        "@emnapi/wasi-threads",
        "tslib"
      ],
      "cpu": [
        "wasm32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/core": "^1.6.0",
        "@emnapi/runtime": "^1.6.0",
        "@emnapi/wasi-threads": "^1.1.0",
        "@napi-rs/wasm-runtime": "^1.0.7",
        "@tybys/wasm-util": "^0.10.1",
        "tslib": "^2.4.0"
      },
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/@tailwindcss/oxide-win32-arm64-msvc": {
      "version": "4.1.17",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-win32-arm64-msvc/-/oxide-win32-arm64-msvc-4.1.17.tgz",
      "integrity": "sha512-JU5AHr7gKbZlOGvMdb4722/0aYbU+tN6lv1kONx0JK2cGsh7g148zVWLM0IKR3NeKLv+L90chBVYcJ8uJWbC9A==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@tailwindcss/oxide-win32-x64-msvc": {
      "version": "4.1.17",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-win32-x64-msvc/-/oxide-win32-x64-msvc-4.1.17.tgz",
      "integrity": "sha512-SKWM4waLuqx0IH+FMDUw6R66Hu4OuTALFgnleKbqhgGU30DY20NORZMZUKgLRjQXNN2TLzKvh48QXTig4h4bGw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@tailwindcss/vite": {
      "version": "4.1.17",
      "resolved": "https://registry.npmjs.org/@tailwindcss/vite/-/vite-4.1.17.tgz",
      "integrity": "sha512-4+9w8ZHOiGnpcGI6z1TVVfWaX/koK7fKeSYF3qlYg2xpBtbteP2ddBxiarL+HVgfSJGeK5RIxRQmKm4rTJJAwA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@tailwindcss/node": "4.1.17",
        "@tailwindcss/oxide": "4.1.17",
        "tailwindcss": "4.1.17"
      },
      "peerDependencies": {
        "vite": "^5.2.0 || ^6 || ^7"
      }
    },
    "node_modules/@tweenjs/tween.js": {
      "version": "23.1.3",
      "resolved": "https://registry.npmjs.org/@tweenjs/tween.js/-/tween.js-23.1.3.tgz",
      "integrity": "sha512-vJmvvwFxYuGnF2axRtPYocag6Clbb5YS7kLL+SO/TeVFzHqDIWrNKYtcsPMibjDx9O+bu+psAy9NKfWklassUA==",
      "license": "MIT"
    },
    "node_modules/@types/babel__core": {
      "version": "7.20.5",
      "resolved": "https://registry.npmjs.org/@types/babel__core/-/babel__core-7.20.5.tgz",
      "integrity": "sha512-qoQprZvz5wQFJwMDqeseRXWv3rqMvhgpbXFfVyWhbx9X47POIA6i/+dXefEmZKoAgOaTdaIgNSMqMIU61yRyzA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.20.7",
        "@babel/types": "^7.20.7",
        "@types/babel__generator": "*",
        "@types/babel__template": "*",
        "@types/babel__traverse": "*"
      }
    },
    "node_modules/@types/babel__generator": {
      "version": "7.27.0",
      "resolved": "https://registry.npmjs.org/@types/babel__generator/-/babel__generator-7.27.0.tgz",
      "integrity": "sha512-ufFd2Xi92OAVPYsy+P4n7/U7e68fex0+Ee8gSG9KX7eo084CWiQ4sdxktvdl0bOPupXtVJPY19zk6EwWqUQ8lg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.0.0"
      }
    },
    "node_modules/@types/babel__template": {
      "version": "7.4.4",
      "resolved": "https://registry.npmjs.org/@types/babel__template/-/babel__template-7.4.4.tgz",
      "integrity": "sha512-h/NUaSyG5EyxBIp8YRxo4RMe2/qQgvyowRwVMzhYhBCONbW8PUsg4lkFMrhgZhUe5z3L3MiLDuvyJ/CaPa2A8A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.1.0",
        "@babel/types": "^7.0.0"
      }
    },
    "node_modules/@types/babel__traverse": {
      "version": "7.28.0",
      "resolved": "https://registry.npmjs.org/@types/babel__traverse/-/babel__traverse-7.28.0.tgz",
      "integrity": "sha512-8PvcXf70gTDZBgt9ptxJ8elBeBjcLOAcOtoO/mPJjtji1+CdGbHgm77om1GrsPxsiE+uXIpNSK64UYaIwQXd4Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.28.2"
      }
    },
    "node_modules/@types/draco3d": {
      "version": "1.4.10",
      "resolved": "https://registry.npmjs.org/@types/draco3d/-/draco3d-1.4.10.tgz",
      "integrity": "sha512-AX22jp8Y7wwaBgAixaSvkoG4M/+PlAcm3Qs4OW8yT9DM4xUpWKeFhLueTAyZF39pviAdcDdeJoACapiAceqNcw==",
      "license": "MIT"
    },
    "node_modules/@types/estree": {
      "version": "1.0.9",
      "resolved": "https://registry.npmjs.org/@types/estree/-/estree-1.0.9.tgz",
      "integrity": "sha512-GhdPgy1el4/ImP05X05Uw4cw2/M93BCUmnEvWZNStlCzEKME4Fkk+YpoA5OiHNQmoS7Cafb8Xa3Pya8m1Qrzeg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/node": {
      "version": "22.19.17",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-22.19.17.tgz",
      "integrity": "sha512-wGdMcf+vPYM6jikpS/qhg6WiqSV/OhG+jeeHT/KlVqxYfD40iYJf9/AE1uQxVWFvU7MipKRkRv8NSHiCGgPr8Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "undici-types": "~6.21.0"
      }
    },
    "node_modules/@types/offscreencanvas": {
      "version": "2019.7.3",
      "resolved": "https://registry.npmjs.org/@types/offscreencanvas/-/offscreencanvas-2019.7.3.tgz",
      "integrity": "sha512-ieXiYmgSRXUDeOntE1InxjWyvEelZGP63M+cGuquuRLuIKKT1osnkXjxev9B7d1nXSug5vpunx+gNlbVxMlC9A==",
      "license": "MIT"
    },
    "node_modules/@types/react": {
      "version": "19.2.7",
      "resolved": "https://registry.npmjs.org/@types/react/-/react-19.2.7.tgz",
      "integrity": "sha512-MWtvHrGZLFttgeEj28VXHxpmwYbor/ATPYbBfSFZEIRK0ecCFLl2Qo55z52Hss+UV9CRN7trSeq1zbgx7YDWWg==",
      "license": "MIT",
      "dependencies": {
        "csstype": "^3.2.2"
      }
    },
    "node_modules/@types/react-dom": {
      "version": "19.2.3",
      "resolved": "https://registry.npmjs.org/@types/react-dom/-/react-dom-19.2.3.tgz",
      "integrity": "sha512-jp2L/eY6fn+KgVVQAOqYItbF0VY/YApe5Mz2F0aykSO8gx31bYCZyvSeYxCHKvzHG5eZjc+zyaS5BrBWya2+kQ==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "^19.2.0"
      }
    },
    "node_modules/@types/react-reconciler": {
      "version": "0.28.9",
      "resolved": "https://registry.npmjs.org/@types/react-reconciler/-/react-reconciler-0.28.9.tgz",
      "integrity": "sha512-HHM3nxyUZ3zAylX8ZEyrDNd2XZOnQ0D5XfunJF5FLQnZbHHYq4UWvW1QfelQNXv1ICNkwYhfxjwfnqivYB6bFg==",
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "*"
      }
    },
    "node_modules/@types/stats.js": {
      "version": "0.17.4",
      "resolved": "https://registry.npmjs.org/@types/stats.js/-/stats.js-0.17.4.tgz",
      "integrity": "sha512-jIBvWWShCvlBqBNIZt0KAshWpvSjhkwkEu4ZUcASoAvhmrgAUI2t1dXrjSL4xXVLB4FznPrIsX3nKXFl/Dt4vA==",
      "license": "MIT"
    },
    "node_modules/@types/three": {
      "version": "0.185.4",
      "resolved": "https://registry.npmjs.org/@types/three/-/three-0.185.4.tgz",
      "integrity": "sha512-gAsBIC07NIFrxjbf7tH2t71c38uulFfk/RFoC7FNBSjMRAQ8J1x/RBvusX0N5PJouaYFJawXQqfCQ0RKUx/1nA==",
      "license": "MIT",
      "dependencies": {
        "@dimforge/rapier3d-compat": "~0.12.0",
        "@tweenjs/tween.js": "~23.1.3",
        "@types/stats.js": "*",
        "@types/webxr": ">=0.5.17",
        "fflate": "~0.8.2",
        "meshoptimizer": "~1.1.1"
      }
    },
    "node_modules/@types/webxr": {
      "version": "0.5.24",
      "resolved": "https://registry.npmjs.org/@types/webxr/-/webxr-0.5.24.tgz",
      "integrity": "sha512-h8fgEd/DpoS9CBrjEQXR+dIDraopAEfu4wYVNY2tEPwk60stPWhvZMf4Foo5FakuQ7HFZoa8WceaWFervK2Ovg==",
      "license": "MIT"
    },
    "node_modules/@use-gesture/core": {
      "version": "10.3.1",
      "resolved": "https://registry.npmjs.org/@use-gesture/core/-/core-10.3.1.tgz",
      "integrity": "sha512-WcINiDt8WjqBdUXye25anHiNxPc0VOrlT8F6LLkU6cycrOGUDyY/yyFmsg3k8i5OLvv25llc0QC45GhR/C8llw==",
      "license": "MIT"
    },
    "node_modules/@use-gesture/react": {
      "version": "10.3.1",
      "resolved": "https://registry.npmjs.org/@use-gesture/react/-/react-10.3.1.tgz",
      "integrity": "sha512-Yy19y6O2GJq8f7CHf7L0nxL8bf4PZCPaVOCgJrusOeFHY1LvHgYXnmnXg6N5iwAnbgbZCDjo60SiM6IPJi9C5g==",
      "license": "MIT",
      "dependencies": {
        "@use-gesture/core": "10.3.1"
      },
      "peerDependencies": {
        "react": ">= 16.8.0"
      }
    },
    "node_modules/@vitejs/plugin-react": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/@vitejs/plugin-react/-/plugin-react-5.1.1.tgz",
      "integrity": "sha512-WQfkSw0QbQ5aJ2CHYw23ZGkqnRwqKHD/KYsMeTkZzPT4Jcf0DcBxBtwMJxnu6E7oxw5+JC6ZAiePgh28uJ1HBA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/core": "^7.28.5",
        "@babel/plugin-transform-react-jsx-self": "^7.27.1",
        "@babel/plugin-transform-react-jsx-source": "^7.27.1",
        "@rolldown/pluginutils": "1.0.0-beta.47",
        "@types/babel__core": "^7.20.5",
        "react-refresh": "^0.18.0"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "peerDependencies": {
        "vite": "^4.2.0 || ^5.0.0 || ^6.0.0 || ^7.0.0"
      }
    },
    "node_modules/base64-js": {
      "version": "1.5.1",
      "resolved": "https://registry.npmjs.org/base64-js/-/base64-js-1.5.1.tgz",
      "integrity": "sha512-AKpaYlHn8t4SVbOHCy+b5+KKgvR4vrsD8vbvrbiQJps7fKDTkjkDry6ji0rUJjC0kzbNePLwzxq8iypo41qeWA==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/baseline-browser-mapping": {
      "version": "2.11.21",
      "resolved": "https://registry.npmjs.org/baseline-browser-mapping/-/baseline-browser-mapping-2.11.21.tgz",
      "integrity": "sha512-uh8vpY/1/YyFkunIDFH/12p7/7VdPKA1hejMVEbdkEaWnUz0Hesvx5EbiU6XxjyHZIOju+ZMbQJkRh+es3/spQ==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "baseline-browser-mapping": "dist/cli.cjs"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/bidi-js": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/bidi-js/-/bidi-js-1.0.3.tgz",
      "integrity": "sha512-RKshQI1R3YQ+n9YJz2QQ147P66ELpa1FQEg20Dk8oW9t2KgLbpDLLp9aGZ7y8WHSshDknG0bknqGw5/tyCs5tw==",
      "license": "MIT",
      "dependencies": {
        "require-from-string": "^2.0.2"
      }
    },
    "node_modules/braces": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/braces/-/braces-3.0.3.tgz",
      "integrity": "sha512-yQbXgO/OSZVD2IsiLlro+7Hf6Q18EJrKSEsdoMzKePKXct3gvD8oLcOQdIzGupr5Fj+EDe8gO/lxc1BzfMpxvA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fill-range": "^7.1.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/browserslist": {
      "version": "4.28.8",
      "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.28.8.tgz",
      "integrity": "sha512-V2NpofLblG64mfOtSgDhOJESZEGogzDMBv/q+W6oc4LXWP/q75eOXoOaaOu1EOadB9U4Bwx/e0yzbvwKH8zalA==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "baseline-browser-mapping": "^2.11.12",
        "caniuse-lite": "^1.0.30001809",
        "electron-to-chromium": "^1.5.402",
        "node-releases": "^2.0.53",
        "update-browserslist-db": "^1.3.0"
      },
      "bin": {
        "browserslist": "cli.js"
      },
      "engines": {
        "node": "^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7"
      }
    },
    "node_modules/buffer": {
      "version": "6.0.3",
      "resolved": "https://registry.npmjs.org/buffer/-/buffer-6.0.3.tgz",
      "integrity": "sha512-FTiCpNxtwiZZHEZbcbTIcZjERVICn9yq/pDFkTl95/AxzD1naBctN7YO68riM/gLSDY7sdrMby8hofADYuuqOA==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "base64-js": "^1.3.1",
        "ieee754": "^1.2.1"
      }
    },
    "node_modules/camera-controls": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/camera-controls/-/camera-controls-3.1.0.tgz",
      "integrity": "sha512-w5oULNpijgTRH0ARFJJ0R5ct1nUM3R3WP7/b8A6j9uTGpRfnsypc/RBMPQV8JQDPayUe37p/TZZY1PcUr4czOQ==",
      "license": "MIT",
      "engines": {
        "node": ">=20.11.0",
        "npm": ">=10.8.2"
      },
      "peerDependencies": {
        "three": ">=0.126.1"
      }
    },
    "node_modules/caniuse-lite": {
      "version": "1.0.30001810",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001810.tgz",
      "integrity": "sha512-TITQPUkaz+aVk5GL6NhOdwk1aEaNTSDPsGFWrTuhKGtjTF70jL/Oht2W4c6rXUe5fu7Ie19VIahAXHIIiWWNeg==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/caniuse-lite"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "CC-BY-4.0"
    },
    "node_modules/clsx": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/clsx/-/clsx-2.1.1.tgz",
      "integrity": "sha512-eYm0QWBtUrBWZWG0d386OGAw16Z995PiOVo2B7bjWSbHedGl5e0ZWaq65kOGgUSNesEIDkB9ISbTg/JK9dhCZA==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/convert-source-map": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-2.0.0.tgz",
      "integrity": "sha512-Kvp459HrV2FEJ1CAsi1Ku+MY3kasH19TFykTz2xWmMeq6bk2NU3XXvfJ+Q61m0xktWwt+1HSYf3JZsTms3aRJg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/cross-env": {
      "version": "7.0.3",
      "resolved": "https://registry.npmjs.org/cross-env/-/cross-env-7.0.3.tgz",
      "integrity": "sha512-+/HKd6EgcQCJGh2PSjZuUitQBQynKor4wrFbRg4DtAgS1aWO+gU52xpH7M9ScGgXSYmAVS9bIJ8EzuaGw0oNAw==",
      "license": "MIT",
      "dependencies": {
        "cross-spawn": "^7.0.1"
      },
      "bin": {
        "cross-env": "src/bin/cross-env.js",
        "cross-env-shell": "src/bin/cross-env-shell.js"
      },
      "engines": {
        "node": ">=10.14",
        "npm": ">=6",
        "yarn": ">=1"
      }
    },
    "node_modules/cross-spawn": {
      "version": "7.0.6",
      "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-7.0.6.tgz",
      "integrity": "sha512-uV2QOWP2nWzsy2aMp8aRibhi9dlzF5Hgh5SHaB9OiTGEyDTiJJyx0uy51QXdyWbtAHNua4XJzUKca3OzKUd3vA==",
      "license": "MIT",
      "dependencies": {
        "path-key": "^3.1.0",
        "shebang-command": "^2.0.0",
        "which": "^2.0.1"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/csstype": {
      "version": "3.2.3",
      "resolved": "https://registry.npmjs.org/csstype/-/csstype-3.2.3.tgz",
      "integrity": "sha512-z1HGKcYy2xA8AGQfwrn0PAy+PB7X/GSj3UVJW9qKyn43xWa+gl5nXmU4qqLMRzWVLFC8KusUX8T/0kCiOYpAIQ==",
      "license": "MIT"
    },
    "node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/detect-gpu": {
      "version": "5.0.70",
      "resolved": "https://registry.npmjs.org/detect-gpu/-/detect-gpu-5.0.70.tgz",
      "integrity": "sha512-bqerEP1Ese6nt3rFkwPnGbsUF9a4q+gMmpTVVOEzoCyeCc+y7/RvJnQZJx1JwhgQI5Ntg0Kgat8Uu7XpBqnz1w==",
      "license": "MIT",
      "dependencies": {
        "webgl-constants": "^1.1.1"
      }
    },
    "node_modules/detect-libc": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/detect-libc/-/detect-libc-2.1.2.tgz",
      "integrity": "sha512-Btj2BOOO83o3WyH59e8MgXsxEQVcarkUOpEYrubB0urwnN10yQ364rsiByU11nZlqWYZm05i/of7io4mzihBtQ==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/draco3d": {
      "version": "1.5.7",
      "resolved": "https://registry.npmjs.org/draco3d/-/draco3d-1.5.7.tgz",
      "integrity": "sha512-m6WCKt/erDXcw+70IJXnG7M3awwQPAsZvJGX5zY7beBqpELw6RDGkYVU0W43AFxye4pDZ5i2Lbyc/NNGqwjUVQ==",
      "license": "Apache-2.0"
    },
    "node_modules/electron-to-chromium": {
      "version": "1.5.421",
      "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.5.421.tgz",
      "integrity": "sha512-cUhfpHQy+PGbt+X90DMcAVazDCziIZr73hpxD4LRs4BGQoJCifPzTfQWa7S6c+uhokTOBe8tot09GBSEO6c9LA==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/enhanced-resolve": {
      "version": "5.24.5",
      "resolved": "https://registry.npmjs.org/enhanced-resolve/-/enhanced-resolve-5.24.5.tgz",
      "integrity": "sha512-L1l8TNvomm6UVW5B253AGxQagSQr+vGwhMlrrfRS2qmhx46AMpMVJKQYLvWYbysTMY8VoicOvzHzoHMbyzB+4A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "graceful-fs": "^4.2.4",
        "tapable": "^2.3.3"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/esbuild": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/esbuild/-/esbuild-0.27.7.tgz",
      "integrity": "sha512-IxpibTjyVnmrIQo5aqNpCgoACA/dTKLTlhMHihVHhdkxKyPO1uBBthumT0rdHmcsk9uMonIWS0m4FljWzILh3w==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "bin": {
        "esbuild": "bin/esbuild"
      },
      "engines": {
        "node": ">=18"
      },
      "optionalDependencies": {
        "@esbuild/aix-ppc64": "0.27.7",
        "@esbuild/android-arm": "0.27.7",
        "@esbuild/android-arm64": "0.27.7",
        "@esbuild/android-x64": "0.27.7",
        "@esbuild/darwin-arm64": "0.27.7",
        "@esbuild/darwin-x64": "0.27.7",
        "@esbuild/freebsd-arm64": "0.27.7",
        "@esbuild/freebsd-x64": "0.27.7",
        "@esbuild/linux-arm": "0.27.7",
        "@esbuild/linux-arm64": "0.27.7",
        "@esbuild/linux-ia32": "0.27.7",
        "@esbuild/linux-loong64": "0.27.7",
        "@esbuild/linux-mips64el": "0.27.7",
        "@esbuild/linux-ppc64": "0.27.7",
        "@esbuild/linux-riscv64": "0.27.7",
        "@esbuild/linux-s390x": "0.27.7",
        "@esbuild/linux-x64": "0.27.7",
        "@esbuild/netbsd-arm64": "0.27.7",
        "@esbuild/netbsd-x64": "0.27.7",
        "@esbuild/openbsd-arm64": "0.27.7",
        "@esbuild/openbsd-x64": "0.27.7",
        "@esbuild/openharmony-arm64": "0.27.7",
        "@esbuild/sunos-x64": "0.27.7",
        "@esbuild/win32-arm64": "0.27.7",
        "@esbuild/win32-ia32": "0.27.7",
        "@esbuild/win32-x64": "0.27.7"
      }
    },
    "node_modules/escalade": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz",
      "integrity": "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/fdir": {
      "version": "6.5.0",
      "resolved": "https://registry.npmjs.org/fdir/-/fdir-6.5.0.tgz",
      "integrity": "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12.0.0"
      },
      "peerDependencies": {
        "picomatch": "^3 || ^4"
      },
      "peerDependenciesMeta": {
        "picomatch": {
          "optional": true
        }
      }
    },
    "node_modules/fflate": {
      "version": "0.8.3",
      "resolved": "https://registry.npmjs.org/fflate/-/fflate-0.8.3.tgz",
      "integrity": "sha512-tbZNuJrLwGUp3zshBtdy4W+ORxZuIh8a5ilyIEQDC5rY1f3U20JMry0Ll3WBzU58EZKsEuJFXhb5gwv8CsPvgA==",
      "license": "MIT"
    },
    "node_modules/fill-range": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-7.1.1.tgz",
      "integrity": "sha512-YsGpe3WHLK8ZYi4tWDg2Jy3ebRz2rXowDxnld4bkQB00cc/1Zw9AWnC0i9ztDJitivtQvaI9KaLyKrc+hBW0yg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "to-regex-range": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/gensync": {
      "version": "1.0.0-beta.2",
      "resolved": "https://registry.npmjs.org/gensync/-/gensync-1.0.0-beta.2.tgz",
      "integrity": "sha512-3hN7NaskYvMDLQY55gnW3NQ+mesEAepTqlg+VEbj7zzqEMBVNhzcGYYeqFo/TlYz6eQiFcp1HcsCZO+nGgS8zg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/glsl-noise": {
      "version": "0.0.0",
      "resolved": "https://registry.npmjs.org/glsl-noise/-/glsl-noise-0.0.0.tgz",
      "integrity": "sha512-b/ZCF6amfAUb7dJM/MxRs7AetQEahYzJ8PtgfrmEdtw6uyGOr+ZSGtgjFm6mfsBkxJ4d2W7kg+Nlqzqvn3Bc0w==",
      "license": "MIT"
    },
    "node_modules/graceful-fs": {
      "version": "4.2.11",
      "resolved": "https://registry.npmjs.org/graceful-fs/-/graceful-fs-4.2.11.tgz",
      "integrity": "sha512-RbJ5/jmFcNNCcDV5o9eTnBLJ/HszWV0P73bc+Ff4nS/rJj+YaS6IGyiOL0VoBYX+l1Wrl3k63h/KrH+nhJ0XvQ==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/hls.js": {
      "version": "1.7.2",
      "resolved": "https://registry.npmjs.org/hls.js/-/hls.js-1.7.2.tgz",
      "integrity": "sha512-CW/pPvSOFIRsosbwxrYaE9ERmpTo5fbTqL7wCvuCFlqW1Bmb1K5fXsY7yiH95rmlr4rVuA7UXHbM/cIXQ6AXwg==",
      "license": "Apache-2.0"
    },
    "node_modules/ieee754": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/ieee754/-/ieee754-1.2.1.tgz",
      "integrity": "sha512-dcyqhDvX1C46lXZcVqCpK+FtMRQVdIMN6/Df5js2zouUsqG7I6sFxitIC+7KYK29KdXOLHdu9zL4sFnoVQnqaA==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "BSD-3-Clause"
    },
    "node_modules/immediate": {
      "version": "3.0.6",
      "resolved": "https://registry.npmjs.org/immediate/-/immediate-3.0.6.tgz",
      "integrity": "sha512-XXOFtyqDjNDAQxVfYxuF7g9Il/IbWmmlQg2MYKOH8ExIT1qg6xc4zyS3HaEEATgs1btfzxq15ciUiY7gjSXRGQ==",
      "license": "MIT"
    },
    "node_modules/is-number": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz",
      "integrity": "sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+pnZ8ANv0004MRL43QKPDlK9cGvNp6NZWZUBlbGXYxxng==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.12.0"
      }
    },
    "node_modules/is-promise": {
      "version": "2.2.2",
      "resolved": "https://registry.npmjs.org/is-promise/-/is-promise-2.2.2.tgz",
      "integrity": "sha512-+lP4/6lKUBfQjZ2pdxThZvLUAafmZb8OAxFb8XXtiQmS35INgr85hdOGoEs124ez1FCnZJt6jau/T+alh58QFQ==",
      "license": "MIT"
    },
    "node_modules/isexe": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/isexe/-/isexe-2.0.0.tgz",
      "integrity": "sha512-RHxMLp9lnKHGHRng9QFhRCMbYAcVpn69smSGcq3f36xjgVVWThj4qqLbTLlq7Ssj8B+fIQ1EuCEGI2lKsyQeIw==",
      "license": "ISC"
    },
    "node_modules/its-fine": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/its-fine/-/its-fine-2.0.0.tgz",
      "integrity": "sha512-KLViCmWx94zOvpLwSlsx6yOCeMhZYaxrJV87Po5k/FoZzcPSahvK5qJ7fYhS61sZi5ikmh2S3Hz55A2l3U69ng==",
      "license": "MIT",
      "dependencies": {
        "@types/react-reconciler": "^0.28.9"
      },
      "peerDependencies": {
        "react": "^19.0.0"
      }
    },
    "node_modules/jiti": {
      "version": "2.7.0",
      "resolved": "https://registry.npmjs.org/jiti/-/jiti-2.7.0.tgz",
      "integrity": "sha512-AC/7JofJvZGrrneWNaEnJeOLUx+JlGt7tNa0wZiRPT4MY1wmfKjt2+6O2p2uz2+skll8OZZmJMNqeke7kKbNgQ==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "jiti": "lib/jiti-cli.mjs"
      }
    },
    "node_modules/js-tokens": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
      "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/jsesc": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-3.1.0.tgz",
      "integrity": "sha512-/sM3dO2FOzXjKQhJuo0Q173wf2KOo8t4I8vHy6lF9poUp7bKT0/NHE8fPX23PwfhnykfqnC2xRxOnVw5XuGIaA==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "jsesc": "bin/jsesc"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/json5": {
      "version": "2.2.3",
      "resolved": "https://registry.npmjs.org/json5/-/json5-2.2.3.tgz",
      "integrity": "sha512-XmOWe7eyHYH14cLdVPoyg+GOH3rYX++KpzrylJwSW98t3Nk+U8XOl8FWKOgwtzdb8lXGf6zYwDUzeHMWfxasyg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "json5": "lib/cli.js"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/lie": {
      "version": "3.3.0",
      "resolved": "https://registry.npmjs.org/lie/-/lie-3.3.0.tgz",
      "integrity": "sha512-UaiMJzeWRlEujzAuw5LokY1L5ecNQYZKfmyZ9L7wDHb/p5etKaxXhohBcrw0EYby+G/NA52vRSN4N39dxHAIwQ==",
      "license": "MIT",
      "dependencies": {
        "immediate": "~3.0.5"
      }
    },
    "node_modules/lightningcss": {
      "version": "1.30.2",
      "resolved": "https://registry.npmjs.org/lightningcss/-/lightningcss-1.30.2.tgz",
      "integrity": "sha512-utfs7Pr5uJyyvDETitgsaqSyjCb2qNRAtuqUeWIAKztsOYdcACf2KtARYXg2pSvhkt+9NfoaNY7fxjl6nuMjIQ==",
      "dev": true,
      "license": "MPL-2.0",
      "dependencies": {
        "detect-libc": "^2.0.3"
      },
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      },
      "optionalDependencies": {
        "lightningcss-android-arm64": "1.30.2",
        "lightningcss-darwin-arm64": "1.30.2",
        "lightningcss-darwin-x64": "1.30.2",
        "lightningcss-freebsd-x64": "1.30.2",
        "lightningcss-linux-arm-gnueabihf": "1.30.2",
        "lightningcss-linux-arm64-gnu": "1.30.2",
        "lightningcss-linux-arm64-musl": "1.30.2",
        "lightningcss-linux-x64-gnu": "1.30.2",
        "lightningcss-linux-x64-musl": "1.30.2",
        "lightningcss-win32-arm64-msvc": "1.30.2",
        "lightningcss-win32-x64-msvc": "1.30.2"
      }
    },
    "node_modules/lightningcss-android-arm64": {
      "version": "1.30.2",
      "resolved": "https://registry.npmjs.org/lightningcss-android-arm64/-/lightningcss-android-arm64-1.30.2.tgz",
      "integrity": "sha512-BH9sEdOCahSgmkVhBLeU7Hc9DWeZ1Eb6wNS6Da8igvUwAe0sqROHddIlvU06q3WyXVEOYDZ6ykBZQnjTbmo4+A==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-arm64": {
      "version": "1.30.2",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-arm64/-/lightningcss-darwin-arm64-1.30.2.tgz",
      "integrity": "sha512-ylTcDJBN3Hp21TdhRT5zBOIi73P6/W0qwvlFEk22fkdXchtNTOU4Qc37SkzV+EKYxLouZ6M4LG9NfZ1qkhhBWA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-x64": {
      "version": "1.30.2",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-x64/-/lightningcss-darwin-x64-1.30.2.tgz",
      "integrity": "sha512-oBZgKchomuDYxr7ilwLcyms6BCyLn0z8J0+ZZmfpjwg9fRVZIR5/GMXd7r9RH94iDhld3UmSjBM6nXWM2TfZTQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-freebsd-x64": {
      "version": "1.30.2",
      "resolved": "https://registry.npmjs.org/lightningcss-freebsd-x64/-/lightningcss-freebsd-x64-1.30.2.tgz",
      "integrity": "sha512-c2bH6xTrf4BDpK8MoGG4Bd6zAMZDAXS569UxCAGcA7IKbHNMlhGQ89eRmvpIUGfKWNVdbhSbkQaWhEoMGmGslA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm-gnueabihf": {
      "version": "1.30.2",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm-gnueabihf/-/lightningcss-linux-arm-gnueabihf-1.30.2.tgz",
      "integrity": "sha512-eVdpxh4wYcm0PofJIZVuYuLiqBIakQ9uFZmipf6LF/HRj5Bgm0eb3qL/mr1smyXIS1twwOxNWndd8z0E374hiA==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-gnu": {
      "version": "1.30.2",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-gnu/-/lightningcss-linux-arm64-gnu-1.30.2.tgz",
      "integrity": "sha512-UK65WJAbwIJbiBFXpxrbTNArtfuznvxAJw4Q2ZGlU8kPeDIWEX1dg3rn2veBVUylA2Ezg89ktszWbaQnxD/e3A==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-musl": {
      "version": "1.30.2",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-musl/-/lightningcss-linux-arm64-musl-1.30.2.tgz",
      "integrity": "sha512-5Vh9dGeblpTxWHpOx8iauV02popZDsCYMPIgiuw97OJ5uaDsL86cnqSFs5LZkG3ghHoX5isLgWzMs+eD1YzrnA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-gnu": {
      "version": "1.30.2",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-gnu/-/lightningcss-linux-x64-gnu-1.30.2.tgz",
      "integrity": "sha512-Cfd46gdmj1vQ+lR6VRTTadNHu6ALuw2pKR9lYq4FnhvgBc4zWY1EtZcAc6EffShbb1MFrIPfLDXD6Xprbnni4w==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-musl": {
      "version": "1.30.2",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-musl/-/lightningcss-linux-x64-musl-1.30.2.tgz",
      "integrity": "sha512-XJaLUUFXb6/QG2lGIW6aIk6jKdtjtcffUT0NKvIqhSBY3hh9Ch+1LCeH80dR9q9LBjG3ewbDjnumefsLsP6aiA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-arm64-msvc": {
      "version": "1.30.2",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-arm64-msvc/-/lightningcss-win32-arm64-msvc-1.30.2.tgz",
      "integrity": "sha512-FZn+vaj7zLv//D/192WFFVA0RgHawIcHqLX9xuWiQt7P0PtdFEVaxgF9rjM/IRYHQXNnk61/H/gb2Ei+kUQ4xQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-x64-msvc": {
      "version": "1.30.2",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-x64-msvc/-/lightningcss-win32-x64-msvc-1.30.2.tgz",
      "integrity": "sha512-5g1yc73p+iAkid5phb4oVFMB45417DkRevRbt/El/gKXJk4jid+vPFF/AXbxn05Aky8PapwzZrdJShv5C0avjw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lru-cache": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-5.1.1.tgz",
      "integrity": "sha512-KpNARQA3Iwv+jTA0utUVVbrh+Jlrr1Fv0e56GGzAFOXN7dk/FviaDW8LHmK52DlcH4WP2n6gI8vN1aesBFgo9w==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "yallist": "^3.0.2"
      }
    },
    "node_modules/maath": {
      "version": "0.10.8",
      "resolved": "https://registry.npmjs.org/maath/-/maath-0.10.8.tgz",
      "integrity": "sha512-tRvbDF0Pgqz+9XUa4jjfgAQ8/aPKmQdWXilFu2tMy4GWj4NOsx99HlULO4IeREfbO3a0sA145DZYyvXPkybm0g==",
      "license": "MIT",
      "peerDependencies": {
        "@types/three": ">=0.134.0",
        "three": ">=0.134.0"
      }
    },
    "node_modules/magic-string": {
      "version": "0.30.21",
      "resolved": "https://registry.npmjs.org/magic-string/-/magic-string-0.30.21.tgz",
      "integrity": "sha512-vd2F4YUyEXKGcLHoq+TEyCjxueSeHnFxyyjNp80yg0XV4vUhnDer/lvvlqM/arB5bXQN5K2/3oinyCRyx8T2CQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.5"
      }
    },
    "node_modules/meshline": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/meshline/-/meshline-3.3.1.tgz",
      "integrity": "sha512-/TQj+JdZkeSUOl5Mk2J7eLcYTLiQm2IDzmlSvYm7ov15anEcDJ92GHqqazxTSreeNgfnYu24kiEvvv0WlbCdFQ==",
      "license": "MIT",
      "peerDependencies": {
        "three": ">=0.137"
      }
    },
    "node_modules/meshoptimizer": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/meshoptimizer/-/meshoptimizer-1.1.1.tgz",
      "integrity": "sha512-oRFNWJRDA/WTrVj7NWvqa5HqE1t9MYDj2VaWirQCzCCrAd2GHrqR/sQezCxiWATPNlKTcRaPRHPJwIRoPBAp5g==",
      "license": "MIT"
    },
    "node_modules/micromatch": {
      "version": "4.0.8",
      "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-4.0.8.tgz",
      "integrity": "sha512-PXwfBhYu0hBCPw8Dn0E+WDYb7af3dSLVWKi3HGv84IdF4TyFoC0ysxFd0Goxw7nSv4T/PzEJQxsYsEiFCKo2BA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "braces": "^3.0.3",
        "picomatch": "^2.3.1"
      },
      "engines": {
        "node": ">=8.6"
      }
    },
    "node_modules/micromatch/node_modules/picomatch": {
      "version": "2.3.2",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.2.tgz",
      "integrity": "sha512-V7+vQEJ06Z+c5tSye8S+nHUfI51xoXIXjHQ99cQtKUkQqqO1kO/KCJUfZXuB47h/YBlDhah2H3hdUGXn8ie0oA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/nanoid": {
      "version": "3.3.18",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.18.tgz",
      "integrity": "sha512-DTg4MJbGMWkfi6VZFdNt2/caMbQy4Ou+Op/hJQvGEWcnVfoA1QA+xzRKAzw9jD6+GVOOeYr/mIcuDSdug6F6+w==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/node-releases": {
      "version": "2.0.54",
      "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-2.0.54.tgz",
      "integrity": "sha512-YHs7BmmcsdAI5Ozuf8JZo6PT0mv2GIWC9vMfvUC3dp65M8hn7Ux8CPL+2oBI7juNuj9d0ndhTcznq2ODBps9cQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/path-key": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/path-key/-/path-key-3.1.1.tgz",
      "integrity": "sha512-ojmeN0qd+y0jszEtoY48r0Peq5dwMEkIlCOu6Q5f41lfkswXuKtYrhgoTpLnyIcHm24Uhqx+5Tqm2InSwLhE6Q==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/picocolors": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/picomatch": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.7.tgz",
      "integrity": "sha512-qcJu88Q2IWqJsDD529JKMdwGm/dvInW4HvQnRwiH9JtihJvzGOscDtHE3x1pBKeUOTysQ8kVmLnJ2kJu7yhcGA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/postcss": {
      "version": "8.5.28",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.5.28.tgz",
      "integrity": "sha512-RRuzqDtt5Y9h3quz5hWhK+TPnsmVs6WwSU6LkJMeY4HstUEDuYTG8UJSdawMRzmzAtV+KEoG8N3Qg2qLy5vM/A==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.18",
        "picocolors": "^1.1.1",
        "source-map-js": "^1.2.1"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/potpack": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/potpack/-/potpack-1.0.2.tgz",
      "integrity": "sha512-choctRBIV9EMT9WGAZHn3V7t0Z2pMQyl0EZE6pFc/6ml3ssw7Dlf/oAOvFwjm1HVsqfQN8GfeFyJ+d8tRzqueQ==",
      "license": "ISC"
    },
    "node_modules/promise-worker-transferable": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/promise-worker-transferable/-/promise-worker-transferable-1.0.4.tgz",
      "integrity": "sha512-bN+0ehEnrXfxV2ZQvU2PetO0n4gqBD4ulq3MI1WOPLgr7/Mg9yRQkX5+0v1vagr74ZTsl7XtzlaYDo2EuCeYJw==",
      "license": "Apache-2.0",
      "dependencies": {
        "is-promise": "^2.1.0",
        "lie": "^3.0.2"
      }
    },
    "node_modules/react": {
      "version": "19.2.6",
      "resolved": "https://registry.npmjs.org/react/-/react-19.2.6.tgz",
      "integrity": "sha512-sfWGGfavi0xr8Pg0sVsyHMAOziVYKgPLNrS7ig+ivMNb3wbCBw3KxtflsGBAwD3gYQlE/AEZsTLgToRrSCjb0Q==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-dom": {
      "version": "19.2.6",
      "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-19.2.6.tgz",
      "integrity": "sha512-0prMI+hvBbPjsWnxDLxlCGyM8PN6UuWjEUCYmZhO67xIV9Xasa/r/vDnq+Xyq4Lo27g8QSbO5YzARu0D1Sps3g==",
      "license": "MIT",
      "dependencies": {
        "scheduler": "^0.27.0"
      },
      "peerDependencies": {
        "react": "^19.2.6"
      }
    },
    "node_modules/react-refresh": {
      "version": "0.18.0",
      "resolved": "https://registry.npmjs.org/react-refresh/-/react-refresh-0.18.0.tgz",
      "integrity": "sha512-QgT5//D3jfjJb6Gsjxv0Slpj23ip+HtOpnNgnb2S5zU3CB26G/IDPGoy4RJB42wzFE46DRsstbW6tKHoKbhAxw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-use-measure": {
      "version": "2.1.7",
      "resolved": "https://registry.npmjs.org/react-use-measure/-/react-use-measure-2.1.7.tgz",
      "integrity": "sha512-KrvcAo13I/60HpwGO5jpW7E9DfusKyLPLvuHlUyP5zqnmAPhNc6qTRjUQrdTADl0lpPpDVU2/Gg51UlOGHXbdg==",
      "license": "MIT",
      "peerDependencies": {
        "react": ">=16.13",
        "react-dom": ">=16.13"
      },
      "peerDependenciesMeta": {
        "react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/require-from-string": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/require-from-string/-/require-from-string-2.0.2.tgz",
      "integrity": "sha512-Xf0nWe6RseziFMu+Ap9biiUbmplq6S9/p+7w7YXP/JBHhrUDDUhwa+vANyubuqfZWTveU//DYVGsDG7RKL/vEw==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/rollup": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/rollup/-/rollup-4.63.1.tgz",
      "integrity": "sha512-3Df9jsstwhccuEfmAMi9l8XUh/GOkVObmFTU7CCVBysEbcOZLl84jCtaAZMcPiMz2EGKsATzQcU+Xr3n/wU6cg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/estree": "1.0.9"
      },
      "bin": {
        "rollup": "dist/bin/rollup"
      },
      "engines": {
        "node": ">=18.0.0",
        "npm": ">=8.0.0"
      },
      "optionalDependencies": {
        "@napi-rs/lzma-linux-x64-gnu": "1.5.1",
        "@rollup/rollup-android-arm-eabi": "4.63.1",
        "@rollup/rollup-android-arm64": "4.63.1",
        "@rollup/rollup-darwin-arm64": "4.63.1",
        "@rollup/rollup-darwin-x64": "4.63.1",
        "@rollup/rollup-freebsd-arm64": "4.63.1",
        "@rollup/rollup-freebsd-x64": "4.63.1",
        "@rollup/rollup-linux-arm-gnueabihf": "4.63.1",
        "@rollup/rollup-linux-arm-musleabihf": "4.63.1",
        "@rollup/rollup-linux-arm64-gnu": "4.63.1",
        "@rollup/rollup-linux-arm64-musl": "4.63.1",
        "@rollup/rollup-linux-loong64-gnu": "4.63.1",
        "@rollup/rollup-linux-loong64-musl": "4.63.1",
        "@rollup/rollup-linux-ppc64-gnu": "4.63.1",
        "@rollup/rollup-linux-ppc64-musl": "4.63.1",
        "@rollup/rollup-linux-riscv64-gnu": "4.63.1",
        "@rollup/rollup-linux-riscv64-musl": "4.63.1",
        "@rollup/rollup-linux-s390x-gnu": "4.63.1",
        "@rollup/rollup-linux-x64-gnu": "4.63.1",
        "@rollup/rollup-linux-x64-musl": "4.63.1",
        "@rollup/rollup-openbsd-x64": "4.63.1",
        "@rollup/rollup-openharmony-arm64": "4.63.1",
        "@rollup/rollup-win32-arm64-msvc": "4.63.1",
        "@rollup/rollup-win32-ia32-msvc": "4.63.1",
        "@rollup/rollup-win32-x64-gnu": "4.63.1",
        "@rollup/rollup-win32-x64-msvc": "4.63.1",
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/scheduler": {
      "version": "0.27.0",
      "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.27.0.tgz",
      "integrity": "sha512-eNv+WrVbKu1f3vbYJT/xtiF5syA5HPIMtf9IgY/nKg0sWqzAUEvqY/xm7OcZc/qafLx/iO9FgOmeSAp4v5ti/Q==",
      "license": "MIT"
    },
    "node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/shebang-command": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/shebang-command/-/shebang-command-2.0.0.tgz",
      "integrity": "sha512-kHxr2zZpYtdmrN1qDjrrX/Z1rR1kG8Dx+gkpK1G4eXmvXswmcE1hTWBWYUzlraYw1/yZp6YuDY77YtvbN0dmDA==",
      "license": "MIT",
      "dependencies": {
        "shebang-regex": "^3.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/shebang-regex": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/shebang-regex/-/shebang-regex-3.0.0.tgz",
      "integrity": "sha512-7++dFhtcx3353uBaq8DDR4NuxBetBzC7ZQOhmTQInHEd6bSrXdiEyzCvG07Z44UYdLShWUyXt5M/yhz8ekcb1A==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/source-map-js": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.1.tgz",
      "integrity": "sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==",
      "dev": true,
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/stats-gl": {
      "version": "2.4.2",
      "resolved": "https://registry.npmjs.org/stats-gl/-/stats-gl-2.4.2.tgz",
      "integrity": "sha512-g5O9B0hm9CvnM36+v7SFl39T7hmAlv541tU81ME8YeSb3i1CIP5/QdDeSB3A0la0bKNHpxpwxOVRo2wFTYEosQ==",
      "license": "MIT",
      "dependencies": {
        "@types/three": "*",
        "three": "^0.170.0"
      },
      "peerDependencies": {
        "@types/three": "*",
        "three": "*"
      }
    },
    "node_modules/stats-gl/node_modules/three": {
      "version": "0.170.0",
      "resolved": "https://registry.npmjs.org/three/-/three-0.170.0.tgz",
      "integrity": "sha512-FQK+LEpYc0fBD+J8g6oSEyyNzjp+Q7Ks1C568WWaoMRLW+TkNNWmenWeGgJjV105Gd+p/2ql1ZcjYvNiPZBhuQ==",
      "license": "MIT"
    },
    "node_modules/stats.js": {
      "version": "0.17.0",
      "resolved": "https://registry.npmjs.org/stats.js/-/stats.js-0.17.0.tgz",
      "integrity": "sha512-hNKz8phvYLPEcRkeG1rsGmV5ChMjKDAWU7/OJJdDErPBNChQXxCo3WZurGpnWc6gZhAzEPFad1aVgyOANH1sMw==",
      "license": "MIT"
    },
    "node_modules/suspend-react": {
      "version": "0.1.3",
      "resolved": "https://registry.npmjs.org/suspend-react/-/suspend-react-0.1.3.tgz",
      "integrity": "sha512-aqldKgX9aZqpoDp3e8/BZ8Dm7x1pJl+qI3ZKxDN0i/IQTWUwBx/ManmlVJ3wowqbno6c2bmiIfs+Um6LbsjJyQ==",
      "license": "MIT",
      "peerDependencies": {
        "react": ">=17.0"
      }
    },
    "node_modules/tailwind-merge": {
      "version": "3.4.0",
      "resolved": "https://registry.npmjs.org/tailwind-merge/-/tailwind-merge-3.4.0.tgz",
      "integrity": "sha512-uSaO4gnW+b3Y2aWoWfFpX62vn2sR3skfhbjsEnaBI81WD1wBLlHZe5sWf0AqjksNdYTbGBEd0UasQMT3SNV15g==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/dcastil"
      }
    },
    "node_modules/tailwindcss": {
      "version": "4.1.17",
      "resolved": "https://registry.npmjs.org/tailwindcss/-/tailwindcss-4.1.17.tgz",
      "integrity": "sha512-j9Ee2YjuQqYT9bbRTfTZht9W/ytp5H+jJpZKiYdP/bpnXARAuELt9ofP0lPnmHjbga7SNQIxdTAXCmtKVYjN+Q==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/tapable": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/tapable/-/tapable-2.3.3.tgz",
      "integrity": "sha512-uxc/zpqFg6x7C8vOE7lh6Lbda8eEL9zmVm/PLeTPBRhh1xCgdWaQ+J1CUieGpIfm2HdtsUpRv+HshiasBMcc6A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/webpack"
      }
    },
    "node_modules/three": {
      "version": "0.185.1",
      "resolved": "https://registry.npmjs.org/three/-/three-0.185.1.tgz",
      "integrity": "sha512-5aojFCXKwnjBRZvUnt3WFfEcvUJgkN5LlijRFN95hMy8WVkG4I0QNcJE+OuWvuJ0bOdStrbfXn0pkd6/QyiAlg==",
      "license": "MIT"
    },
    "node_modules/three-mesh-bvh": {
      "version": "0.8.3",
      "resolved": "https://registry.npmjs.org/three-mesh-bvh/-/three-mesh-bvh-0.8.3.tgz",
      "integrity": "sha512-4G5lBaF+g2auKX3P0yqx+MJC6oVt6sB5k+CchS6Ob0qvH0YIhuUk1eYr7ktsIpY+albCqE80/FVQGV190PmiAg==",
      "license": "MIT",
      "peerDependencies": {
        "three": ">= 0.159.0"
      }
    },
    "node_modules/three-stdlib": {
      "version": "2.36.1",
      "resolved": "https://registry.npmjs.org/three-stdlib/-/three-stdlib-2.36.1.tgz",
      "integrity": "sha512-XyGQrFmNQ5O/IoKm556ftwKsBg11TIb301MB5dWNicziQBEs2g3gtOYIf7pFiLa0zI2gUwhtCjv9fmjnxKZ1Cg==",
      "license": "MIT",
      "dependencies": {
        "@types/draco3d": "^1.4.0",
        "@types/offscreencanvas": "^2019.6.4",
        "@types/webxr": "^0.5.2",
        "draco3d": "^1.4.1",
        "fflate": "^0.6.9",
        "potpack": "^1.0.1"
      },
      "peerDependencies": {
        "three": ">=0.128.0"
      }
    },
    "node_modules/three-stdlib/node_modules/fflate": {
      "version": "0.6.11",
      "resolved": "https://registry.npmjs.org/fflate/-/fflate-0.6.11.tgz",
      "integrity": "sha512-3JyEFWGjFn7zHmoa9+zG1BmW7X2okcmAB+0Cnu9UFbVs/jCBnl2A8o065ZlXiw145K3eBM3uLuzrYXC0RK7eDg==",
      "license": "MIT"
    },
    "node_modules/tinyglobby": {
      "version": "0.2.17",
      "resolved": "https://registry.npmjs.org/tinyglobby/-/tinyglobby-0.2.17.tgz",
      "integrity": "sha512-wXR/dYpcqKmfWpEdZjiKJOwCNFndD0DMnrW/cYjVGttEkBfVgcLFHoNrlj47mjOVic9yyNu65alsgF4NQyTa2g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fdir": "^6.5.0",
        "picomatch": "^4.0.4"
      },
      "engines": {
        "node": ">=12.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/SuperchupuDev"
      }
    },
    "node_modules/to-regex-range": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz",
      "integrity": "sha512-65P7iz6X5yEr1cwcgvQxbbIw7Uk3gOy5dIdtZ4rDveLqhrdJP+Li/Hx6tyK0NEb+2GCyneCMJiGqrADCSNk8sQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-number": "^7.0.0"
      },
      "engines": {
        "node": ">=8.0"
      }
    },
    "node_modules/troika-three-text": {
      "version": "0.52.5",
      "resolved": "https://registry.npmjs.org/troika-three-text/-/troika-three-text-0.52.5.tgz",
      "integrity": "sha512-Ry3jRhic9pzcY4JduSvRRyDmVOSqEW19gT4vtK+aCiPNVcDlmkxvGG0YbFd36RTDq1wExOupXnvNF/j1oiHHDA==",
      "license": "MIT",
      "dependencies": {
        "bidi-js": "^1.0.2",
        "troika-three-utils": "^0.52.5",
        "troika-worker-utils": "^0.52.0",
        "webgl-sdf-generator": "1.1.1"
      },
      "peerDependencies": {
        "three": ">=0.125.0"
      }
    },
    "node_modules/troika-three-utils": {
      "version": "0.52.5",
      "resolved": "https://registry.npmjs.org/troika-three-utils/-/troika-three-utils-0.52.5.tgz",
      "integrity": "sha512-WsePbcX8RtfidRfsxK1eCZCjF81ZDzAKHH/evLs0hdV2wpoCb0vArGZHdzdOJrSS3k4zfdtbKDaBh8+phkrYnw==",
      "license": "MIT",
      "peerDependencies": {
        "three": ">=0.125.0"
      }
    },
    "node_modules/troika-worker-utils": {
      "version": "0.52.0",
      "resolved": "https://registry.npmjs.org/troika-worker-utils/-/troika-worker-utils-0.52.0.tgz",
      "integrity": "sha512-W1CpvTHykaPH5brv5VHLfQo9D1OYuo0cSBEUQFFT/nBUzM8iD6Lq2/tgG/f1OelbAS1WtaTPQzE5uM49egnngw==",
      "license": "MIT"
    },
    "node_modules/tunnel-rat": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/tunnel-rat/-/tunnel-rat-0.1.2.tgz",
      "integrity": "sha512-lR5VHmkPhzdhrM092lI2nACsLO4QubF0/yoOhzX7c+wIpbN1GjHNzCc91QlpxBi+cnx8vVJ+Ur6vL5cEoQPFpQ==",
      "license": "MIT",
      "dependencies": {
        "zustand": "^4.3.2"
      }
    },
    "node_modules/tunnel-rat/node_modules/zustand": {
      "version": "4.5.7",
      "resolved": "https://registry.npmjs.org/zustand/-/zustand-4.5.7.tgz",
      "integrity": "sha512-CHOUy7mu3lbD6o6LJLfllpjkzhHXSBlX8B9+qPddUsIfeF5S/UZ5q0kmCsnRqT1UHFQZchNFDDzMbQsuesHWlw==",
      "license": "MIT",
      "dependencies": {
        "use-sync-external-store": "^1.2.2"
      },
      "engines": {
        "node": ">=12.7.0"
      },
      "peerDependencies": {
        "@types/react": ">=16.8",
        "immer": ">=9.0.6",
        "react": ">=16.8"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "immer": {
          "optional": true
        },
        "react": {
          "optional": true
        }
      }
    },
    "node_modules/typescript": {
      "version": "5.9.3",
      "resolved": "https://registry.npmjs.org/typescript/-/typescript-5.9.3.tgz",
      "integrity": "sha512-jl1vZzPDinLr9eUt3J/t7V6FgNEw9QjvBPdysz9KfQDD41fQrC2Y4vKQdiaUpFT4bXlb1RHhLpp8wtm6M5TgSw==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "tsc": "bin/tsc",
        "tsserver": "bin/tsserver"
      },
      "engines": {
        "node": ">=14.17"
      }
    },
    "node_modules/undici-types": {
      "version": "6.21.0",
      "resolved": "https://registry.npmjs.org/undici-types/-/undici-types-6.21.0.tgz",
      "integrity": "sha512-iwDZqg0QAGrg9Rav5H4n0M64c3mkR59cJ6wQp+7C4nI0gsmExaedaYLNO44eT4AtBBwjbTiGPMlt2Md0T9H9JQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/update-browserslist-db": {
      "version": "1.3.2",
      "resolved": "https://registry.npmjs.org/update-browserslist-db/-/update-browserslist-db-1.3.2.tgz",
      "integrity": "sha512-UQ+MSxlhRm1bzjhU+DcuXfjFO1FzNtqhK5+9Yvlp90ItDLk5vT932A0rFu619nf7RVS+Y/VeaUW1jaRDqZ8VJw==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "escalade": "^3.2.0",
        "picocolors": "^1.1.1"
      },
      "bin": {
        "update-browserslist-db": "cli.js"
      },
      "peerDependencies": {
        "browserslist": ">= 4.21.0"
      }
    },
    "node_modules/use-sync-external-store": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/use-sync-external-store/-/use-sync-external-store-1.6.0.tgz",
      "integrity": "sha512-Pp6GSwGP/NrPIrxVFAIkOQeyw8lFenOHijQWkUTrDvrF4ALqylP2C/KCkeS9dpUM3KvYRQhna5vt7IL95+ZQ9w==",
      "license": "MIT",
      "peerDependencies": {
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/utility-types": {
      "version": "3.11.0",
      "resolved": "https://registry.npmjs.org/utility-types/-/utility-types-3.11.0.tgz",
      "integrity": "sha512-6Z7Ma2aVEWisaL6TvBCy7P8rm2LQoPv6dJ7ecIaIixHcwfbJ0x7mWdbcwlIM5IGQxPZSFYeqRCqlOOeKoJYMkw==",
      "license": "MIT",
      "engines": {
        "node": ">= 4"
      }
    },
    "node_modules/vite": {
      "version": "7.3.2",
      "resolved": "https://registry.npmjs.org/vite/-/vite-7.3.2.tgz",
      "integrity": "sha512-Bby3NOsna2jsjfLVOHKes8sGwgl4TT0E6vvpYgnAYDIF/tie7MRaFthmKuHx1NSXjiTueXH3do80FMQgvEktRg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "esbuild": "^0.27.0",
        "fdir": "^6.5.0",
        "picomatch": "^4.0.3",
        "postcss": "^8.5.6",
        "rollup": "^4.43.0",
        "tinyglobby": "^0.2.15"
      },
      "bin": {
        "vite": "bin/vite.js"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "funding": {
        "url": "https://github.com/vitejs/vite?sponsor=1"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.3"
      },
      "peerDependencies": {
        "@types/node": "^20.19.0 || >=22.12.0",
        "jiti": ">=1.21.0",
        "less": "^4.0.0",
        "lightningcss": "^1.21.0",
        "sass": "^1.70.0",
        "sass-embedded": "^1.70.0",
        "stylus": ">=0.54.8",
        "sugarss": "^5.0.0",
        "terser": "^5.16.0",
        "tsx": "^4.8.1",
        "yaml": "^2.4.2"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        },
        "jiti": {
          "optional": true
        },
        "less": {
          "optional": true
        },
        "lightningcss": {
          "optional": true
        },
        "sass": {
          "optional": true
        },
        "sass-embedded": {
          "optional": true
        },
        "stylus": {
          "optional": true
        },
        "sugarss": {
          "optional": true
        },
        "terser": {
          "optional": true
        },
        "tsx": {
          "optional": true
        },
        "yaml": {
          "optional": true
        }
      }
    },
    "node_modules/vite-plugin-singlefile": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/vite-plugin-singlefile/-/vite-plugin-singlefile-2.3.0.tgz",
      "integrity": "sha512-DAcHzYypM0CasNLSz/WG0VdKOCxGHErfrjOoyIPiNxTPTGmO6rRD/te93n1YL/s+miXq66ipF1brMBikf99c6A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "micromatch": "^4.0.8"
      },
      "engines": {
        "node": ">18.0.0"
      },
      "peerDependencies": {
        "rollup": "^4.44.1",
        "vite": "^5.4.11 || ^6.0.0 || ^7.0.0"
      }
    },
    "node_modules/webgl-constants": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/webgl-constants/-/webgl-constants-1.1.1.tgz",
      "integrity": "sha512-LkBXKjU5r9vAW7Gcu3T5u+5cvSvh5WwINdr0C+9jpzVB41cjQAP5ePArDtk/WHYdVj0GefCgM73BA7FlIiNtdg=="
    },
    "node_modules/webgl-sdf-generator": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/webgl-sdf-generator/-/webgl-sdf-generator-1.1.1.tgz",
      "integrity": "sha512-9Z0JcMTFxeE+b2x1LJTdnaT8rT8aEp7MVxkNwoycNmJWwPdzoXzMh0BjJSh/AEFP+KPYZUli814h8bJZFIZ2jA==",
      "license": "MIT"
    },
    "node_modules/which": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/which/-/which-2.0.2.tgz",
      "integrity": "sha512-BLI3Tl1TW3Pvl70l3yq3Y64i+awpwXqsGBYWkkqMtnbXgrMD+yj7rhW0kuEDxzJaYXGjEW5ogapKNMEKNMjibA==",
      "license": "ISC",
      "dependencies": {
        "isexe": "^2.0.0"
      },
      "bin": {
        "node-which": "bin/node-which"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/yallist": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-3.1.1.tgz",
      "integrity": "sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/zustand": {
      "version": "5.0.15",
      "resolved": "https://registry.npmjs.org/zustand/-/zustand-5.0.15.tgz",
      "integrity": "sha512-MpSEjRiBkA9crSYeOUH32rJC7SVqAbm0Fqcqge/bUi2PPoLcBWKOsG+C8mevmpr8TwXHBVkChbbJiyvkE+i/3A==",
      "license": "MIT",
      "engines": {
        "node": ">=12.20.0"
      },
      "peerDependencies": {
        "@types/react": ">=18.0.0",
        "immer": ">=9.0.6",
        "react": ">=18.0.0",
        "use-sync-external-store": ">=1.2.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "immer": {
          "optional": true
        },
        "react": {
          "optional": true
        },
        "use-sync-external-store": {
          "optional": true
        }
      }
    }
  }
}

<<<<< END FILE: package-lock.json >>>>>

<<<<< BEGIN FILE: package.json (784 bytes) >>>>>
{
  "name": "react-vite-tailwind",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@react-three/drei": "^10.7.8",
    "@react-three/fiber": "^9.7.0",
    "@types/three": "^0.185.4",
    "clsx": "2.1.1",
    "react": "19.2.6",
    "react-dom": "19.2.6",
    "tailwind-merge": "3.4.0",
    "three": "^0.185.1",
    "zustand": "^5.0.15"
  },
  "devDependencies": {
    "@tailwindcss/vite": "4.1.17",
    "@types/node": "22.19.17",
    "@types/react": "19.2.7",
    "@types/react-dom": "19.2.3",
    "@vitejs/plugin-react": "5.1.1",
    "tailwindcss": "4.1.17",
    "typescript": "5.9.3",
    "vite": "7.3.2",
    "vite-plugin-singlefile": "2.3.0"
  }
}

<<<<< END FILE: package.json >>>>>

<<<<< BEGIN FILE: src/App.tsx (3143 bytes) >>>>>
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { useGame } from "./game/store";
import { useInput } from "./game/useInput";
import { C } from "./game/world";
import { GameScene } from "./scenes/GameScene";
import { MenuScene } from "./scenes/MenuScene";
import { GameOverScene } from "./scenes/GameOverScene";
import { LabScene } from "./scenes/LabScene";
import { Particles } from "./world/Particles";
import { Sky } from "./ui/Sky";
import { GameOverOverlay, HUD, LabOverlay, MenuOverlay } from "./ui/Overlays";

function Lights() {
  const tier = useGame((s) => s.skyTier);
  const night = tier >= 3;
  // three's toon BRDF multiplies everything by 1/π, so the key light sits ~π×
  // higher than "classic" values (top ramp step clamps to pure white), while
  // ambient stays low so the soft shadow step on the ramp remains visible.
  return (
    <>
      <hemisphereLight args={[night ? "#B9C6FF" : "#ffffff", night ? "#5E4C8A" : "#f7d9e3", night ? 0.4 : 0.3]} />
      <directionalLight position={[4, 9, 7]} intensity={night ? 2.2 : 3.0} color={night ? "#DCE4FF" : "#ffffff"} />
      <directionalLight position={[-6, 2, 4]} intensity={night ? 0.2 : 0.25} color="#dbe9ff" />
    </>
  );
}

export default function App() {
  const phase = useGame((s) => s.phase);
  const input = useInput(phase === "playing");
  useEffect(() => {
    // debug deep-links: #gameover / #play / #lab
    if (location.hash === "#gameover") useGame.setState({ phase: "gameover" });
    if (location.hash === "#play") useGame.getState().start();
    if (location.hash === "#lab") useGame.getState().openLab();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#F4DDE5] font-[Baloo_2,ui-rounded,system-ui,sans-serif]">
      {/* decorative desktop backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ background: "radial-gradient(circle at 20% 20%, #ffe4ec 0, transparent 40%), radial-gradient(circle at 80% 80%, #dbe9ff 0, transparent 40%)" }}
      />
      <div id="game-viewport" className="relative h-full w-full max-w-[min(100vw,calc(100dvh*0.62))] overflow-hidden bg-[#dcebff] shadow-[0_0_80px_rgba(120,60,90,0.25)]" style={{ touchAction: "none" }}>
        <Sky />
        <Canvas
          flat
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          camera={{ fov: C.fov, near: 0.1, far: 120, position: [0, 4, 20] }}
          style={{ position: "absolute", inset: 0 }}
        >
          <Lights />
          <Suspense fallback={null}>
            <Particles />
            {phase === "menu" && <MenuScene />}
            {phase === "playing" && <GameScene input={input} />}
            {phase === "gameover" && <GameOverScene />}
            {phase === "lab" && <LabScene />}
          </Suspense>
        </Canvas>
        {phase === "menu" && <MenuOverlay />}
        {phase === "playing" && <HUD />}
        {phase === "gameover" && <GameOverOverlay />}
        {phase === "lab" && <LabOverlay />}
      </div>
    </div>
  );
}

<<<<< END FILE: src/App.tsx >>>>>

<<<<< BEGIN FILE: src/character/Cat.tsx (58242 bytes) >>>>>
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { memo, useCallback, useMemo, useRef, type MutableRefObject } from "react";
import { Part, OUTLINE_W } from "./Part";
import { bubble, flat, toon } from "./materials";
import { Spring, Spring2, Chain, damp, clamp, rand, noise1 } from "./springs";
import { EXPRESSIONS, EXPRESSION_KEYS, type ExpressionName, type ExpressionParams } from "./expressions";
import { POSES, POSE_EXPRESSION, POSE_KEYS, POSE_SPRING_TUNING, type MotionState, type PoseParams } from "./poses";
import type { CatPalette } from "./palettes";
import { HEART_FLAT, STAR_FLAT, STAR_GEO } from "../world/geometries";

/* ------------------------------------------------------------------ */
/*  Driver: the tiny mutable contract between game logic and the rig   */
/* ------------------------------------------------------------------ */
export type CatEvent =
  | "land"
  | "jump"
  | "superJump"
  | "spring"
  | "collect"
  | "star"
  | "yum"
  | "hurt"
  | "hugged"
  | "bump"
  | "cheer"
  | "slip"
  | "stun"
  | "shieldOn"
  | "shieldPop"
  | "rocketOn"
  | "balloonOn"
  | "balloonPop"
  | "magnet"
  | "wrap"
  | "perfect"
  | "milestone"
  | "record"
  | "poke"
  | "pokeBelly"
  | "pokeTail"
  | "pet"
  | "nearMiss"
  | "startle"
  | "wakeUp";

export type EmoteName = "exclaim" | "question" | "heart" | "zzz" | "note" | "sweat" | "sparkles" | "anger" | "hearts3";
export type Accessory = "none" | "balloon" | "rocket" | "shield" | "umbrella" | "fish";
export type PokeZone = "head" | "belly" | "tail";

export interface CatDriver {
  vx: number;
  vy: number;
  state: MotionState;
  /** Optional base expression override (otherwise derived from the motion state) */
  expression: ExpressionName | null;
  /** -1..1 where the cat looks / turns */
  look: number;
  /** -1..1 vertical gaze */
  lookY: number;
  /** Persistent emote bubble (null = only event-driven emotes) */
  emote: EmoteName | null;
  accessory: Accessory;
  /** One-shot events consumed by the rig every frame */
  events: CatEvent[];
  /** Freeze autonomous behaviours (blink, look-around) */
  autonomous: boolean;
  /** Allow idle fidgets (yawn, stretch, groom, doze off…) when idle for a while */
  fidgets: boolean;
}

export const createDriver = (o: Partial<CatDriver> = {}): CatDriver => ({
  vx: 0,
  vy: 0,
  state: "idle",
  expression: null,
  look: 0,
  lookY: 0,
  emote: null,
  accessory: "none",
  events: [],
  autonomous: true,
  fidgets: true,
  ...o,
});

/* Timed expression flashes triggered by events (name, seconds) */
const EVENT_FLASH: Partial<Record<CatEvent, [ExpressionName, number]>> = {
  land: ["squint", 0.13],
  superJump: ["joy", 0.9],
  spring: ["wow", 0.7],
  collect: ["love", 0.7],
  star: ["starEyes", 1.0],
  yum: ["yum", 1.2],
  hurt: ["ouch", 1.3],
  hugged: ["love", 1.8],
  bump: ["surprised", 0.35],
  cheer: ["joy", 1.2],
  slip: ["shocked", 0.6],
  stun: ["dizzy", 1.4],
  shieldOn: ["proud", 1.0],
  shieldPop: ["shocked", 0.6],
  rocketOn: ["starEyes", 1.5],
  balloonOn: ["happy", 1.0],
  balloonPop: ["surprised", 0.6],
  magnet: ["excited", 0.9],
  perfect: ["determined", 0.5],
  milestone: ["wow", 1.2],
  record: ["starEyes", 1.6],
  poke: ["surprised", 0.5],
  pokeBelly: ["laugh", 1.1],
  pokeTail: ["angry", 1.1],
  pet: ["love", 1.4],
  nearMiss: ["relieved", 0.9],
  startle: ["shocked", 0.6],
  wakeUp: ["confused", 1.0],
};

/* Emote bubbles triggered by events (name, seconds) */
const EVENT_EMOTE: Partial<Record<CatEvent, [EmoteName, number]>> = {
  collect: ["heart", 0.7],
  hugged: ["hearts3", 1.6],
  bump: ["exclaim", 0.5],
  stun: ["exclaim", 0.4],
  star: ["sparkles", 1.0],
  yum: ["heart", 0.8],
  slip: ["exclaim", 0.5],
  shieldPop: ["exclaim", 0.5],
  balloonPop: ["exclaim", 0.5],
  record: ["sparkles", 1.5],
  perfect: ["sparkles", 0.5],
  milestone: ["note", 1.0],
  poke: ["exclaim", 0.5],
  pokeTail: ["anger", 1.0],
  pet: ["hearts3", 1.4],
  nearMiss: ["sweat", 0.9],
  startle: ["exclaim", 0.6],
  wakeUp: ["question", 1.0],
  pokeBelly: ["note", 0.9],
  cheer: ["note", 1.0],
  magnet: ["exclaim", 0.4],
};

/* ------------------------------------------------------------------ */
/*  Shared geometry                                                     */
/* ------------------------------------------------------------------ */
function earProfile() {
  const pts: THREE.Vector2[] = [];
  const N = 14;
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const x = 0.36 * Math.pow(1 - t, 0.82) * (1 - 0.25 * Math.pow(t, 6)) + 0.002;
    pts.push(new THREE.Vector2(x, t * 0.55));
  }
  return pts;
}
class SpiralCurve extends THREE.Curve<THREE.Vector3> {
  constructor() {
    super();
  }
  getPoint(t: number) {
    const a = t * Math.PI * 2 * 2.25;
    const r = 0.015 + t * 0.085;
    return new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0);
  }
}

const G = {
  head: new THREE.SphereGeometry(1, 56, 40),
  body: new THREE.SphereGeometry(0.72, 44, 32),
  belly: new THREE.CircleGeometry(0.42, 32),
  ear: new THREE.LatheGeometry(earProfile(), 28),
  stripe: new THREE.CapsuleGeometry(0.045, 0.26, 4, 12),
  armUpper: new THREE.CapsuleGeometry(0.165, 0.2, 8, 18),
  armFore: new THREE.CapsuleGeometry(0.17, 0.18, 8, 18),
  leg: new THREE.CapsuleGeometry(0.2, 0.22, 8, 18),
  tailSeg: new THREE.SphereGeometry(0.11, 14, 10),
  padBig: new THREE.CircleGeometry(0.075, 18),
  padToe: new THREE.CircleGeometry(0.034, 12),
  whisker: new THREE.CapsuleGeometry(0.012, 0.36, 3, 6),
  eyeDot: new THREE.CircleGeometry(0.105, 24),
  eyeRing: new THREE.CircleGeometry(0.15, 24),
  highlight: new THREE.CircleGeometry(0.032, 12),
  happyArc: new THREE.TorusGeometry(0.1, 0.03, 8, 20, Math.PI),
  chevron: new THREE.BoxGeometry(0.14, 0.045, 0.01),
  brow: new THREE.CapsuleGeometry(0.022, 0.13, 4, 10),
  blush: new THREE.CircleGeometry(0.19, 28),
  smallArc: new THREE.TorusGeometry(0.06, 0.02, 8, 16, Math.PI),
  smileArc: new THREE.TorusGeometry(0.1, 0.022, 8, 20, Math.PI),
  tinyArc: new THREE.TorusGeometry(0.035, 0.018, 8, 12, Math.PI),
  mouthOpen: new THREE.CircleGeometry(0.11, 24),
  mouthOpenRim: new THREE.CircleGeometry(0.135, 24),
  scream: new THREE.CircleGeometry(0.19, 28),
  screamRim: new THREE.CircleGeometry(0.215, 28),
  tongue: new THREE.CircleGeometry(0.065, 16),
  oMouth: new THREE.CircleGeometry(0.055, 18),
  line: new THREE.BoxGeometry(0.16, 0.03, 0.01),
  teeth: new THREE.BoxGeometry(0.22, 0.05, 0.01),
  drop: new THREE.SphereGeometry(0.065, 14, 12),
  spiral: new THREE.TubeGeometry(new SpiralCurve(), 48, 0.014, 6, false),
  angerBar: new THREE.BoxGeometry(0.16, 0.035, 0.01),
  exclaimBar: new THREE.CapsuleGeometry(0.06, 0.26, 4, 12),
  exclaimDot: new THREE.SphereGeometry(0.07, 12, 10),
  qArc: new THREE.TorusGeometry(0.13, 0.05, 8, 20, Math.PI * 1.45),
  qStem: new THREE.CapsuleGeometry(0.05, 0.1, 4, 10),
  zBar: new THREE.BoxGeometry(0.16, 0.04, 0.04),
  zDiag: new THREE.BoxGeometry(0.2, 0.04, 0.04),
  noteHead: new THREE.SphereGeometry(0.085, 14, 10),
  noteStem: new THREE.BoxGeometry(0.035, 0.32, 0.035),
  noteFlag: new THREE.BoxGeometry(0.11, 0.05, 0.035),
  sparkle: new THREE.OctahedronGeometry(0.06, 0),
  balloon: new THREE.SphereGeometry(0.5, 28, 20),
  balloonKnot: new THREE.ConeGeometry(0.07, 0.1, 8),
  string: new THREE.CylinderGeometry(0.012, 0.012, 1, 6),
  rocketBody: new THREE.CapsuleGeometry(0.22, 0.5, 8, 18),
  rocketTip: new THREE.ConeGeometry(0.2, 0.3, 18),
  fin: new THREE.BoxGeometry(0.08, 0.28, 0.24),
  flame: new THREE.ConeGeometry(0.16, 0.5, 12),
  shield: new THREE.SphereGeometry(1.75, 36, 24),
  shieldGloss: new THREE.SphereGeometry(0.28, 12, 8),
  umbrellaTop: new THREE.SphereGeometry(1.1, 32, 12, 0, Math.PI * 2, 0, Math.PI / 2),
  umbrellaStick: new THREE.CylinderGeometry(0.03, 0.03, 1.5, 8),
  umbrellaHandle: new THREE.TorusGeometry(0.12, 0.03, 8, 12, Math.PI),
  fishBody: new THREE.SphereGeometry(0.22, 16, 12),
  fishTail: new THREE.ConeGeometry(0.14, 0.2, 3),
};

const INK = "#3B3231";
const M = {
  ink: flat(INK),
  white: flat("#ffffff"),
  mouthIn: flat("#8E3A4A"),
  tongue: flat("#F28CA0"),
  tear: toon("#A9DDF7"),
  anger: flat("#E9455D"),
  emoteRed: toon("#FF5E7E"),
  emoteBlue: toon("#7FB8FF"),
  emoteGold: toon("#FFD35C"),
  heart: toon("#FF6F91"),
  spark: toon("#FFF1A8", { emissive: "#FFD35C", emissiveIntensity: 0.6 }),
  rocketRed: toon("#FF6B7A"),
  rocketWhite: toon("#FFFFFF"),
  flame: toon("#FFB347", { emissive: "#FF7A00", emissiveIntensity: 0.8 }),
  flameIn: toon("#FFF3B0", { emissive: "#FFE27A", emissiveIntensity: 0.8 }),
  shield: bubble("#9FD8FF", 0.28),
  shieldGloss: flat("#ffffff", { opacity: 0.7 }),
  umbrella: toon("#FF8FAF"),
  umbrellaAlt: toon("#FFFFFF"),
  stick: toon("#8A6F5A"),
  fish: toon("#9FD0FF"),
  fishDark: toon("#6FA8E6"),
};

/* ------------------------------------------------------------------ */
/*  Idle fidget library — plays when the driver leaves the cat idle     */
/* ------------------------------------------------------------------ */
interface Fidget {
  state: MotionState;
  expression?: ExpressionName;
  emote?: EmoteName;
  dur: [number, number];
  weight: number;
}
const FIDGETS: Fidget[] = [
  { state: "stretchUp", expression: "relieved", dur: [1.3, 1.8], weight: 1 },
  { state: "groom", expression: "focus", dur: [1.8, 2.6], weight: 1.2 },
  { state: "think", expression: "confused", emote: "question", dur: [1.5, 2.2], weight: 0.8 },
  { state: "peek", expression: "confused", dur: [1.2, 1.8], weight: 0.6 },
  { state: "yawn", expression: "sleepy", dur: [1.4, 1.8], weight: 1 },
  { state: "wave", expression: "happy", dur: [1.2, 1.8], weight: 0.8 },
  { state: "dance", expression: "sing", emote: "note", dur: [2, 3], weight: 0.5 },
  { state: "sit", expression: "content", dur: [2.5, 4], weight: 0.8 },
  { state: "proud", expression: "proud", dur: [1.5, 2.2], weight: 0.5 },
];

/* ------------------------------------------------------------------ */
/*  Rig                                                                 */
/* ------------------------------------------------------------------ */
export interface CatProps {
  palette: CatPalette;
  driver: MutableRefObject<CatDriver>;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  groupRef?: MutableRefObject<THREE.Group | null>;
  /** Enable poke / pet hit zones */
  interactive?: boolean;
  onPoke?: (zone: PokeZone) => void;
  onEvent?: (e: CatEvent) => void;
  children?: React.ReactNode;
}

type Refs = Record<string, THREE.Object3D>;
type RefFn = (name: string) => (o: THREE.Object3D | null) => void;
const TAIL_N = 6;

/* ---- static sub-parts (module-level so re-renders never remount them) ---- */
const PawPad = ({ position, rotation, scale = 1, mat }: { position: [number, number, number]; rotation: [number, number, number]; scale?: number; mat: THREE.Material }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <mesh geometry={G.padBig} material={mat} position={[0, -0.03, 0]} scale={[1.1, 0.95, 1]} />
    {[-0.07, 0, 0.07].map((dx, i) => (
      <mesh key={i} geometry={G.padToe} material={mat} position={[dx, 0.075 - Math.abs(dx) * 0.35, 0]} />
    ))}
  </group>
);

const Arm = ({ side, fur, pawMat, r }: { side: "L" | "R"; fur: string; pawMat: THREE.Material; r: RefFn }) => {
  const sgn = side === "L" ? -1 : 1;
  return (
    <group ref={r("arm" + side)} position={[sgn * 0.56, 1.14, 0.14]}>
      <Part geometry={G.armUpper} color={fur} position={[0, -0.17, 0]} />
      <group ref={r("fore" + side)} position={[0, -0.34, 0]}>
        <Part geometry={G.armFore} color={fur} position={[0, -0.12, 0]} />
        <PawPad position={[0, -0.27, 0.168]} rotation={[-0.3, 0, 0]} mat={pawMat} />
      </group>
    </group>
  );
};

const TailChain = ({ i, fur, tip, r }: { i: number; fur: string; tip: string; r: RefFn }): React.ReactElement => {
  const rad = 0.13 - i * 0.011;
  return (
    <group ref={r("tail" + i)} position={[i === 0 ? 0 : 0.19, 0, 0]}>
      <Part geometry={G.tailSeg} color={i === TAIL_N - 1 ? tip : fur} scale={rad / 0.11} outlineWidth={OUTLINE_W * 0.85} />
      {i < TAIL_N - 1 && <TailChain i={i + 1} fur={fur} tip={tip} r={r} />}
    </group>
  );
};

const ZLetter = ({ idx, r }: { idx: number; r: RefFn }) => (
  <group ref={r("zzz" + idx)}>
    <mesh geometry={G.zBar} material={M.emoteBlue} position={[0, 0.08, 0]} />
    <mesh geometry={G.zDiag} material={M.emoteBlue} rotation={[0, 0, 0.9]} />
    <mesh geometry={G.zBar} material={M.emoteBlue} position={[0, -0.08, 0]} />
  </group>
);

export const Cat = memo(CatRig);

function CatRig({ palette, driver, position, rotation, scale = 1, groupRef, interactive, onPoke, onEvent, children }: CatProps) {
  const R = useRef<Refs>({});
  const r = useCallback<RefFn>(
    (name: string) => (o: THREE.Object3D | null) => {
      if (o) R.current[name] = o;
    },
    [],
  );
  const per = palette.personality;

  const blushMat = useMemo(() => flat(palette.blush, { transparent: true, opacity: 0.95 }), [palette.blush]);

  /* mutable animation memory */
  const S = useMemo(() => {
    const springs = {} as Record<keyof PoseParams, Spring>;
    for (const k of POSE_KEYS) {
      const [st, dm] = POSE_SPRING_TUNING[k] ?? [90, 12];
      springs[k] = new Spring(POSES.idle[k], st, dm);
    }
    const soft = 1 - per.floppiness * 0.35;
    return {
      t: rand(0, 100),
      springs,
      expr: { ...EXPRESSIONS.content } as ExpressionParams,
      flash: null as null | { name: ExpressionName; until: number },
      emote: null as null | { name: EmoteName; until: number },
      emoteS: new Spring(0, 240, 11),
      emoteCur: null as EmoteName | null,
      earL: new Spring(0, 220 * soft, 9 * soft),
      earR: new Spring(0, 220 * soft, 9 * soft),
      earTipL: new Spring(0, 260 * soft, 8 * soft),
      earTipR: new Spring(0, 260 * soft, 8 * soft),
      whiskerL: new Spring(0, 300, 10),
      whiskerR: new Spring(0, 300, 10),
      tail: new Chain(TAIL_N, 120 * soft, 9),
      tailRoot: new Spring(0, 70, 7),
      head: new Spring2(170, 11),
      jiggle: new Spring(0, 240, 9),
      cheek: new Spring(0, 260, 9),
      armLag: new Spring(0, 140, 12),
      balloon: new Spring2(40, 5),
      roll: 0,
      lean: 0,
      turn: 0,
      look: 0,
      lookY: 0,
      autoLook: 0,
      autoLookY: 0,
      autoLookTimer: rand(1, 3),
      blink: 1,
      blinkTimer: rand(1, 3),
      blinkPhase: -1,
      doubleBlink: false,
      earTwitchTimer: rand(2, 6),
      tailFlickTimer: rand(3, 8),
      whiskerTimer: rand(2, 5),
      lastState: "idle" as MotionState,
      prevVx: 0,
      prevVy: 0,
      idleFor: 0,
      fidget: null as null | { state: MotionState; expression?: ExpressionName; emote?: EmoteName; until: number },
      fidgetTimer: rand(4, 8) / (0.5 + per.energy),
      asleep: false,
      dizzy: 0,
      sparkle: 0,
      shieldPulse: 0,
      flameFlicker: 0,
      petAmount: 0,
      petCooldown: 0,
    };
  }, [per.energy, per.floppiness]);

  const fire = (e: CatEvent) => {
    driver.current.events.push(e);
    onEvent?.(e);
  };

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    S.t += dt;
    const t = S.t;
    const d = driver.current;
    const o = R.current;
    if (!o.root) return;

    /* ---- events ---- */
    if (d.events.length) {
      for (const e of d.events) {
        const f = EVENT_FLASH[e];
        if (f) S.flash = { name: f[0], until: t + f[1] };
        const em = EVENT_EMOTE[e];
        if (em) S.emote = { name: em[0], until: t + em[1] };
        if (S.asleep && e !== "wakeUp") {
          S.asleep = false;
          S.fidget = null;
          S.flash = { name: "shocked", until: t + 0.6 };
          S.emote = { name: "exclaim", until: t + 0.6 };
        }
        S.fidget = null;
        S.idleFor = 0;
        switch (e) {
          case "land":
            S.springs.stretch.impulse(-7);
            S.earL.impulse(-9);
            S.earR.impulse(-9);
            S.earTipL.impulse(-6);
            S.earTipR.impulse(-6);
            S.head.impulse(0, 5);
            S.jiggle.impulse(6);
            S.cheek.impulse(5);
            S.tail.impulse(3);
            break;
          case "jump":
            S.springs.stretch.impulse(4.5);
            S.head.impulse(0, -3);
            S.tail.impulse(-3);
            break;
          case "superJump":
          case "rocketOn":
            S.springs.stretch.impulse(10);
            S.earL.impulse(-14);
            S.earR.impulse(-14);
            S.head.impulse(0, -6);
            S.tail.impulse(-6);
            S.jiggle.impulse(-3);
            break;
          case "spring":
            S.springs.stretch.impulse(8);
            S.head.impulse(0, -5);
            S.roll = 0.0001;
            break;
          case "collect":
          case "yum":
            S.springs.headTilt.impulse(3);
            S.springs.stretch.impulse(2.5);
            S.cheek.impulse(3);
            break;
          case "star":
          case "record":
          case "milestone":
            S.springs.stretch.impulse(4);
            S.earL.impulse(10);
            S.earR.impulse(10);
            S.sparkle = 1;
            S.tail.impulse(5);
            break;
          case "hurt":
            S.springs.stretch.impulse(-5);
            S.tailRoot.impulse(6);
            S.head.impulse(4, 2);
            S.jiggle.impulse(4);
            break;
          case "hugged":
          case "pet":
            S.springs.stretch.impulse(-3);
            S.earL.impulse(-6);
            S.earR.impulse(-6);
            S.cheek.impulse(3);
            S.tail.impulse(4);
            break;
          case "bump":
          case "wrap":
            S.springs.headTilt.impulse(-4);
            S.earL.impulse(8);
            S.head.impulse(-6, 0);
            break;
          case "cheer":
          case "perfect":
            S.springs.stretch.impulse(6);
            S.tail.impulse(6);
            break;
          case "slip":
            S.springs.lean.impulse(6);
            S.armLag.impulse(8);
            S.head.impulse(-5, 2);
            break;
          case "stun":
            S.head.impulse(rand(-8, 8), 4);
            S.earL.impulse(-12);
            S.earR.impulse(12);
            S.jiggle.impulse(5);
            break;
          case "shieldOn":
            S.shieldPulse = 1;
            S.springs.stretch.impulse(3);
            break;
          case "shieldPop":
          case "balloonPop":
            S.springs.stretch.impulse(-4);
            S.earL.impulse(-10);
            S.earR.impulse(-10);
            S.head.impulse(0, 3);
            break;
          case "balloonOn":
            S.springs.stretch.impulse(3);
            S.balloon.impulse(0, 6);
            break;
          case "magnet":
            S.earL.impulse(9);
            S.earR.impulse(9);
            break;
          case "poke":
            S.head.impulse(0, 6);
            S.earL.impulse(-12);
            S.earR.impulse(-12);
            S.springs.stretch.impulse(-3);
            break;
          case "pokeBelly":
            S.jiggle.impulse(10);
            S.springs.stretch.impulse(-4);
            S.cheek.impulse(6);
            break;
          case "pokeTail":
            S.tail.impulse(18, 0.9);
            S.tailRoot.impulse(10);
            S.head.impulse(6, 0);
            S.earL.impulse(-12);
            S.earR.impulse(-12);
            break;
          case "nearMiss":
            S.head.impulse(0, -3);
            S.whiskerL.impulse(6);
            S.whiskerR.impulse(6);
            break;
          case "startle":
            S.springs.stretch.impulse(8);
            S.earL.impulse(14);
            S.earR.impulse(14);
            S.tail.impulse(-12, 0.9);
            S.whiskerL.impulse(10);
            S.whiskerR.impulse(10);
            break;
          case "wakeUp":
            S.asleep = false;
            S.springs.stretch.impulse(3);
            S.earL.impulse(8);
            S.earR.impulse(8);
            break;
        }
      }
      d.events.length = 0;
    }

    /* ---- fidgets / dozing ---- */
    const calmState = d.state === "idle" || d.state === "sit";
    if (d.fidgets && d.autonomous && calmState) {
      S.idleFor += dt;
      if (S.fidget && S.fidget.until < t) {
        S.fidget = null;
        S.fidgetTimer = rand(3.5, 8) / (0.4 + per.energy);
      }
      if (!S.fidget) {
        S.fidgetTimer -= dt;
        if (S.asleep) {
          S.fidget = { state: "sleep", expression: "asleep", emote: "zzz", until: t + 999 };
        } else if (S.idleFor > 26 && Math.random() < 0.02) {
          S.asleep = true;
          S.fidget = { state: "sleep", expression: "asleep", emote: "zzz", until: t + 999 };
        } else if (S.fidgetTimer <= 0) {
          const total = FIDGETS.reduce((a, f) => a + f.weight, 0);
          let roll = Math.random() * total;
          let f = FIDGETS[0];
          for (const c of FIDGETS) {
            roll -= c.weight;
            if (roll <= 0) {
              f = c;
              break;
            }
          }
          if (S.idleFor > 14 && Math.random() < 0.5) f = FIDGETS[4]; // yawn when bored
          S.fidget = { state: f.state, expression: f.expression, emote: f.emote, until: t + rand(f.dur[0], f.dur[1]) };
        }
      }
    } else {
      S.idleFor = 0;
      if (S.fidget) S.fidget = null;
      S.asleep = false;
    }
    const state: MotionState = S.fidget ? S.fidget.state : d.state;

    /* ---- pose springs ---- */
    const pose = POSES[state];
    if (state !== S.lastState) {
      S.springs.stretch.impulse(state === "rise" || state === "superJump" || state === "spin" ? 2 : -1);
      S.lastState = state;
    }
    const P = {} as Record<keyof PoseParams, number>;
    for (const k of POSE_KEYS) {
      S.springs[k].target = pose[k];
      P[k] = S.springs[k].update(dt);
    }

    /* ---- expression blend ---- */
    if (S.flash && S.flash.until < t) S.flash = null;
    const baseExpr: ExpressionName = S.fidget?.expression ?? d.expression ?? POSE_EXPRESSION[state];
    const exprName: ExpressionName = S.flash ? S.flash.name : baseExpr;
    const target = EXPRESSIONS[exprName];
    const E = S.expr;
    const blendRate = S.flash ? 26 : 14;
    for (const k of EXPRESSION_KEYS) E[k] = damp(E[k], target[k], blendRate, dt);

    /* ---- autonomous life ---- */
    if (d.autonomous) {
      S.blinkTimer -= dt;
      if (S.blinkTimer <= 0 && S.blinkPhase < 0) {
        S.blinkPhase = 0;
        S.doubleBlink = Math.random() < 0.22;
        S.blinkTimer = S.doubleBlink ? 0.22 : rand(1.6, 4.5) * (E.eyeScale > 1.2 ? 0.6 : 1);
      }
      if (S.blinkPhase >= 0) {
        S.blinkPhase += dt / 0.14;
        S.blink = 1 - Math.sin(Math.min(S.blinkPhase, 1) * Math.PI);
        if (S.blinkPhase >= 1) {
          S.blinkPhase = -1;
          S.blink = 1;
        }
      }
      S.autoLookTimer -= dt;
      const calm = calmState || state === "wave" || state === "lieDown" || state === "float";
      if (S.autoLookTimer <= 0) {
        S.autoLookTimer = rand(1.2, 3.5);
        const shy = per.shyness > 0.5 && Math.random() < per.shyness * 0.4;
        S.autoLook = calm && Math.random() < 0.65 ? rand(-0.7, 0.7) : 0;
        S.autoLookY = calm && Math.random() < 0.4 ? rand(-0.4, 0.5) : 0;
        if (shy) S.autoLookY = -0.5;
      }
      S.earTwitchTimer -= dt;
      if (S.earTwitchTimer <= 0) {
        S.earTwitchTimer = rand(2.5, 7);
        const s = Math.random() < 0.5 ? [S.earL, S.earTipL] : [S.earR, S.earTipR];
        s[0].impulse(rand(6, 10));
        s[1].impulse(rand(8, 14));
      }
      S.tailFlickTimer -= dt;
      if (S.tailFlickTimer <= 0) {
        S.tailFlickTimer = rand(3, 9);
        S.tail.impulse(rand(6, 12) * (Math.random() < 0.5 ? -1 : 1), 0.85);
      }
      S.whiskerTimer -= dt;
      if (S.whiskerTimer <= 0) {
        S.whiskerTimer = rand(2, 6);
        (Math.random() < 0.5 ? S.whiskerL : S.whiskerR).impulse(rand(4, 8));
      }
    } else {
      S.blink = 1;
    }

    /* ---- velocity & acceleration ---- */
    const vx = d.vx;
    const vy = d.vy;
    const ax = dt > 0 ? (vx - S.prevVx) / dt : 0;
    const ay = dt > 0 ? (vy - S.prevVy) / dt : 0;
    S.prevVx = vx;
    S.prevVy = vy;
    if (Math.abs(ax) > 30) S.head.x.impulse(clamp(-ax * 0.015, -3, 3));
    if (Math.abs(ay) > 60) S.head.y.impulse(clamp(-ay * 0.006, -3, 3));
    S.armLag.target = clamp(-ax * 0.004, -0.4, 0.4);
    const armLag = S.armLag.update(dt);

    const wantLook = clamp(d.look + S.autoLook, -1, 1);
    const wantLookY = clamp(d.lookY + S.autoLookY, -1, 1);
    S.look = damp(S.look, wantLook, 8, dt);
    S.lookY = damp(S.lookY, wantLookY, 8, dt);
    S.lean = damp(S.lean, -vx * 0.045 + P.lean, 9, dt);
    S.turn = damp(S.turn, S.look * 0.42 + P.headYaw * 0.5, 6, dt);

    /* ---- whole-body ---- */
    const jig = S.jiggle.update(dt);
    const cheek = S.cheek.update(dt);
    const velStretch = 1 + clamp(vy * 0.011, -0.03, 0.14) + Math.abs(vx) * 0.004;
    const breath = Math.sin(t * 2.1) * 0.012;
    const s = Math.max(0.45, P.stretch * velStretch + breath - jig * 0.02);
    o.squash.scale.set((1 / Math.sqrt(s)) * (1 + jig * 0.03), s, (1 / Math.sqrt(s)) * (1 + jig * 0.03));
    const shiver = Math.max(P.shiver, E.shiver);
    const shakeX = shiver * 0.02 * Math.sin(t * 58) + shiver * 0.012 * Math.sin(t * 91 + 1);
    o.crouch.position.set(shakeX, -P.crouch + Math.sin(t * P.bobSpeed) * P.bob * (0.6 + per.energy * 0.6), 0);
    o.lean.rotation.z = S.lean;
    o.lean.rotation.y = S.turn;
    // spin (trampoline flips): accumulate roll, then settle back to upright
    if (P.bodyRoll > 0.5) S.roll += P.bodyRoll * dt;
    else {
      S.roll = S.roll % (Math.PI * 2);
      if (S.roll > Math.PI) S.roll -= Math.PI * 2;
      S.roll = damp(S.roll, 0, 10, dt);
    }
    o.lean.rotation.x = P.bodyPitch + S.roll;

    /* ---- head follow-through ---- */
    S.head.setTarget(0, 0);
    S.head.update(dt);
    const hx = S.head.x.value;
    const hy = S.head.y.value;
    o.head.rotation.z = P.headTilt + E.headTilt - S.lean * 0.45 + Math.sin(t * 1.3) * 0.02 + hx * 0.06;
    o.head.rotation.x = P.headPitch + clamp(-vy * 0.012, -0.22, 0.25) + hy * 0.05 - S.lookY * 0.18;
    o.head.rotation.y = S.look * 0.28 + P.headYaw;
    o.head.position.x = hx * 0.02 + shakeX * 0.5;
    o.head.position.y = 1.88 + hy * 0.012;

    /* ---- belly jiggle (cheek puff is expressed via the blush, not geometry) ---- */
    o.bodyJiggle.scale.set(1 + jig * 0.05, 1 - jig * 0.04, 1 + jig * 0.05);

    /* ---- ears: pose + mood + vertical velocity + wind flap + spring twitch ---- */
    const earVel = clamp(-vy * 0.035, -0.45, 0.6);
    const wind = Math.min(1, Math.abs(vy) / 20);
    const flap = Math.sin(t * (10 + wind * 20)) * wind * 0.18 * per.floppiness;
    const mood = E.earMood;
    S.earL.target = -(P.earFold * 0.55 + earVel) - mood * 0.35 + (mood < 0 ? mood * 0.4 : 0);
    S.earR.target = P.earFold * 0.55 + earVel + mood * 0.35 - (mood < 0 ? mood * 0.4 : 0);
    const eL = S.earL.update(dt);
    const eR = S.earR.update(dt);
    // soft "tip lag" springs fold into the single-piece ear (no separate tip mesh → no visible seam)
    const tipTarget = -P.earTipFlop * 0.5 * (0.5 + per.floppiness) - wind * 0.5 + (mood < 0 ? mood * 0.3 : 0);
    S.earTipL.target = tipTarget;
    S.earTipR.target = tipTarget;
    const tL = S.earTipL.update(dt);
    const tR = S.earTipR.update(dt);
    o.earL.rotation.z = 0.38 + eL + flap + tL * 0.12;
    o.earR.rotation.z = -0.38 + eR - flap + tR * 0.12;
    o.earL.rotation.x = -eL * 0.4 + (mood < 0 ? -mood * 0.5 : 0) + tL * 0.16;
    o.earR.rotation.x = eR * 0.4 + (mood < 0 ? -mood * 0.5 : 0) + tR * 0.16;

    /* ---- whiskers ---- */
    S.whiskerL.target = E.whiskerLift * 0.2 + P.whiskerFlare * 0.25;
    S.whiskerR.target = E.whiskerLift * 0.2 + P.whiskerFlare * 0.25;
    const wL = S.whiskerL.update(dt);
    const wR = S.whiskerR.update(dt);
    o.whiskerL.rotation.z = wL + Math.sin(t * 3.7) * 0.015 + shiver * Math.sin(t * 70) * 0.05;
    o.whiskerR.rotation.z = -wR - Math.sin(t * 3.1) * 0.015 - shiver * Math.sin(t * 70 + 1) * 0.05;

    /* ---- arms (2-bone) ---- */
    const wig = Math.sin(t * P.armWiggleSpeed) * P.armWiggle;
    const wig2 = Math.sin(t * P.armWiggleSpeed + 1.2) * P.armWiggle;
    o.armL.rotation.z = -(P.armRaiseL + wig) - S.lean * 0.6 - armLag;
    o.armR.rotation.z = P.armRaiseR + wig2 + Math.sin(t * 11) * P.wave - S.lean * 0.6 - armLag;
    o.armL.rotation.x = -P.armForwardL + shiver * Math.sin(t * 55) * 0.08;
    o.armR.rotation.x = -P.armForwardR + shiver * Math.sin(t * 55 + 2) * 0.08;
    o.foreL.rotation.x = -P.pawUpL * 1.5 - Math.max(0, wig) * 0.5;
    o.foreR.rotation.x = -P.pawUpR * 1.5 - Math.max(0, wig2) * 0.5 - Math.abs(Math.sin(t * 11)) * P.wave * 0.8;

    /* ---- legs ---- */
    const walk = Math.sin(t * P.walkSpeed) * 0.5 * P.walkCycle;
    o.legL.rotation.x = -P.legL + walk + Math.sin(t * P.armWiggleSpeed) * P.armWiggle * 0.5;
    o.legR.rotation.x = -P.legR - walk + Math.sin(t * P.armWiggleSpeed + 2) * P.armWiggle * 0.5;
    o.legL.rotation.z = P.legSpread;
    o.legR.rotation.z = -P.legSpread;

    /* ---- tail: whip chain, wag, inertia against horizontal motion ---- */
    S.tailRoot.target = vx * 0.12 - ay * 0.002;
    const tr = S.tailRoot.update(dt);
    const wag = Math.sin(t * P.tailWagSpeed) * P.tailWag;
    const rootAngle = -0.4 - P.tailLift * 0.7 + wag + tr;
    const links = S.tail.update(rootAngle, dt);
    o.tail.rotation.z = rootAngle;
    o.tail.rotation.y = Math.sin(t * 3.1) * 0.25;
    for (let i = 0; i < TAIL_N; i++) {
      const seg = o["tail" + i];
      const follow = links[i].value - (i === 0 ? rootAngle : links[i - 1].value);
      seg.rotation.z = follow * 1.6 + 0.28 + P.tailCurl * 0.34 + Math.sin(t * P.tailWagSpeed + i * 0.6) * P.tailWag * 0.25;
      seg.rotation.y = Math.sin(t * 2.3 + i * 0.5) * 0.08 * (i + 1);
    }

    /* ---- face ---- */
    const dot = (1 - E.eyeHappy) * (1 - E.eyeCry) * (1 - E.eyeHeart) * (1 - E.eyeStar) * (1 - E.eyeSpiral);
    const lookX = S.look * 0.045;
    const lookYo = S.lookY * 0.03;
    for (const side of ["L", "R"] as const) {
      const isR = side === "R";
      const wink = isR ? E.winkR : 0;
      const open = E.eyeOpen * S.blink * (1 - wink);
      const eye = o["eye" + side];
      eye.position.x = (isR ? 0.4 : -0.4) + lookX;
      eye.position.y = -0.04 + E.eyeOffsetY + lookYo;
      const shock = E.eyeShock;
      const lidK = E.eyeLid * open;
      const sx = Math.max(0.0001, E.eyeScale * dot * (1 - shock * 0.5) * (1 + E.eyeSquash * 0.5));
      const sy = Math.max(0.0001, Math.max(0.09, open) * E.eyeScale * dot * (1 - shock * 0.5) * (1 - E.eyeSquash * 0.6 * (1 - open)) * (1 - lidK * 0.5));
      const dotY = lookYo * 0.3 - lidK * 0.045;
      o["dot" + side].scale.set(sx * 0.95, sy * 1.05, 1);
      o["dot" + side].position.set(lookX * 0.4 * shock, dotY, 0.002 + shock * 0.003);
      // half-lidded look: an ink line along the flattened top edge of the eye
      const lid = o["lid" + side];
      const lidOn = lidK > 0.03 && dot > 0.5;
      lid.scale.set(lidOn ? 1.35 * sx : 0.0001, lidOn ? 1 : 0.0001, 1);
      lid.position.set(lookX * 0.4 * shock, dotY + sy * 1.05 * 0.105 - 0.012, 0.006);
      const ring = shock * dot * Math.max(0.2, open);
      o["ring" + side].scale.set(Math.max(0.0001, ring * E.eyeScale), Math.max(0.0001, ring * E.eyeScale * Math.max(0.3, open)), 1);
      const hl = E.eyeSparkle * clamp((open - 0.35) / 0.3, 0, 1) * dot * (1 - shock * 0.6);
      o["hl" + side].scale.setScalar(Math.max(0.0001, hl));
      o["hl" + side].position.set(-0.035 + lookX * 0.3, 0.04 + lookYo * 0.2, 0.004);
      // happy arcs also serve as the closed eye for a wink
      o["happy" + side].scale.setScalar(Math.max(0.0001, Math.max(E.eyeHappy, wink * (1 - E.eyeSquash)) * E.eyeScale));
      o["cry" + side].scale.setScalar(Math.max(0.0001, E.eyeCry));
      const beat = 1 + Math.sin(t * 8) * 0.08;
      o["heart" + side].scale.setScalar(Math.max(0.0001, E.eyeHeart * beat));
      o["heart" + side].rotation.z = Math.sin(t * 4 + (isR ? 1 : 0)) * 0.1;
      o["star" + side].scale.setScalar(Math.max(0.0001, E.eyeStar * (1 + Math.sin(t * 10 + (isR ? 2 : 0)) * 0.1)));
      o["star" + side].rotation.z = t * 1.5 * (isR ? -1 : 1);
      o["spiral" + side].scale.setScalar(Math.max(0.0001, E.eyeSpiral));
      o["spiral" + side].rotation.z = t * 5 * (isR ? -1 : 1);
      const brow = o["brow" + side];
      brow.scale.setScalar(Math.max(0.0001, E.browLift));
      brow.rotation.z = (isR ? -1 : 1) * E.browAngle;
      brow.position.y = 0.3 + E.browLift * 0.03 + E.eyeOffsetY + E.browHeight * 0.06 + (isR && E.winkR > 0.5 ? -0.03 : 0);
      const bl = clamp(E.blush * (0.85 + per.shyness * 0.3), 0, 1.6);
      // puffed / jiggle-reactive cheeks read as a wider, plumper blush
      const puff = 1 + E.cheekPuff * 0.35 + cheek * 0.06;
      o["blush" + side].scale.set((0.35 + 0.65 * bl) * puff, (0.35 + 0.65 * bl) * 0.75 * puff, 1);
      for (let i = 0; i < 2; i++) {
        const tear = o[`tear${side}${i}`];
        const ph = (t * 1.3 + i * 0.5 + (isR ? 0.25 : 0)) % 1;
        tear.position.y = -0.18 - ph * 0.4;
        const sc = Math.min(1.4, E.tears) * (1 - ph * 0.6) * (ph < 0.08 ? ph / 0.08 : 1);
        tear.scale.set(0.75 * sc, 1.1 * sc, 0.75 * sc);
      }
    }
    const m = o.mouth;
    m.position.x = lookX * 0.5;
    m.position.y = -0.3 + lookYo * 0.4;
    o.mouthCat.scale.setScalar(Math.max(0.0001, E.mouthCat));
    o.mouthSmile.scale.setScalar(Math.max(0.0001, E.mouthSmile));
    o.mouthFrown.scale.setScalar(Math.max(0.0001, E.mouthFrown));
    o.mouthWobble.scale.setScalar(Math.max(0.0001, E.mouthWobble));
    o.mouthWobble.rotation.z = shiver * Math.sin(t * 40) * 0.2;
    o.mouthO.scale.setScalar(Math.max(0.0001, E.mouthO * (1 + Math.sin(t * 6) * 0.06)));
    o.mouthLine.scale.setScalar(Math.max(0.0001, E.mouthLine));
    o.mouthPout.scale.setScalar(Math.max(0.0001, E.mouthPout));
    const mo = E.mouthOpen;
    o.mouthOpen.scale.set(Math.max(0.0001, 0.55 + 0.45 * mo), Math.max(0.0001, mo * (1 + Math.sin(t * 9) * 0.06)), 1);
    const sc = E.mouthScream;
    o.mouthScream.scale.set(Math.max(0.0001, 0.6 + 0.4 * sc), Math.max(0.0001, sc * (1 + Math.sin(t * 14) * 0.08)), 1);
    const gr = E.mouthGrin;
    o.mouthGrin.scale.set(Math.max(0.0001, gr), Math.max(0.0001, gr * (0.85 + Math.abs(Math.sin(t * 12)) * 0.25)), 1);
    o.mouthTongue.scale.set(Math.max(0.0001, E.mouthTongue), Math.max(0.0001, E.mouthTongue * (1 + Math.sin(t * 7) * 0.1)), 1);
    const sw = E.sweat;
    o.sweat.scale.set(0.75 * sw, 1.15 * sw, 0.75 * sw);
    o.sweat.position.y = 0.55 - ((t * 0.7) % 1) * 0.12 * sw;
    const ang = E.angerMark;
    o.anger.scale.setScalar(Math.max(0.0001, ang * (1 + Math.sin(t * 12) * 0.12)));

    /* ---- emotes ---- */
    if (S.emote && S.emote.until < t) S.emote = null;
    const wantEmote: EmoteName | null = S.emote ? S.emote.name : S.fidget?.emote ?? d.emote;
    if (wantEmote !== S.emoteCur) {
      if (S.emoteCur === null && wantEmote !== null) {
        S.emoteS.set(0);
        S.emoteS.impulse(14);
      }
      S.emoteCur = wantEmote;
    }
    S.emoteS.target = wantEmote ? 1 : 0;
    const es = Math.max(0, S.emoteS.update(dt));
    for (const name of EMOTE_NAMES) {
      const g = o["emote_" + name];
      const on = wantEmote === name;
      g.scale.setScalar(on ? Math.max(0.0001, es) : 0.0001);
      g.visible = on;
    }
    o.emotes.position.y = 1.25 + Math.sin(t * 3) * 0.05;
    o.emotes.rotation.z = Math.sin(t * 2.2) * 0.08 - S.lean;
    if (wantEmote === "zzz") {
      for (let i = 0; i < 3; i++) {
        const z = o["zzz" + i];
        const ph = (t * 0.45 + i * 0.33) % 1;
        z.position.set(0.1 + ph * 0.5, ph * 0.9, 0);
        const sz = (0.5 + ph * 0.8) * (ph > 0.8 ? (1 - ph) / 0.2 : 1) * (ph < 0.1 ? ph / 0.1 : 1);
        z.scale.setScalar(Math.max(0.0001, sz));
        z.rotation.z = Math.sin(t * 2 + i) * 0.2;
      }
    }
    if (wantEmote === "hearts3") {
      for (let i = 0; i < 3; i++) {
        const h = o["h3_" + i];
        const ph = (t * 0.7 + i * 0.33) % 1;
        h.position.set(Math.sin(ph * 6 + i) * 0.35, ph * 1.1 - 0.1, 0);
        h.scale.setScalar(Math.max(0.0001, 0.8 * Math.sin(ph * Math.PI)));
      }
    }
    if (wantEmote === "sparkles" || S.sparkle > 0) {
      for (let i = 0; i < 4; i++) {
        const sp = o["spark" + i];
        const tw = Math.max(0, Math.sin(t * 9 + i * 1.7));
        sp.scale.setScalar(Math.max(0.0001, tw * (wantEmote === "sparkles" ? 1 : S.sparkle)));
        sp.rotation.z = t * 3 + i;
      }
    }
    S.sparkle = Math.max(0, S.sparkle - dt * 0.9);
    o.sparkles.visible = S.sparkle > 0 && wantEmote !== "sparkles";
    // dizzy stars orbit
    const dizzyOn = E.eyeSpiral > 0.4 || state === "stunned" || state === "dizzy";
    S.dizzy = damp(S.dizzy, dizzyOn ? 1 : 0, 8, dt);
    o.dizzy.visible = S.dizzy > 0.02;
    o.dizzy.scale.setScalar(Math.max(0.0001, S.dizzy));
    for (let i = 0; i < 3; i++) {
      const st = o["dz" + i];
      const a = t * 4 + (i * Math.PI * 2) / 3;
      st.position.set(Math.cos(a) * 0.75, Math.sin(a * 2) * 0.08, Math.sin(a) * 0.45);
      st.rotation.z = t * 6;
    }

    /* ---- accessories ---- */
    const acc = d.accessory;
    o.shield.visible = acc === "shield";
    if (acc === "shield") {
      S.shieldPulse = Math.max(0, S.shieldPulse - dt * 2);
      const ps = 1 + Math.sin(t * 3) * 0.02 + S.shieldPulse * 0.15;
      o.shield.scale.setScalar(ps);
      o.shield.rotation.y = t * 0.4;
    }
    o.rocket.visible = acc === "rocket";
    if (acc === "rocket") {
      S.flameFlicker = rand(0.8, 1.25);
      o.flame.scale.set(S.flameFlicker, 1 + rand(0, 0.6) + clamp(vy, 0, 30) * 0.03, S.flameFlicker);
      o.rocket.rotation.z = Math.sin(t * 40) * 0.01;
    }
    o.balloon.visible = acc === "balloon";
    if (acc === "balloon") {
      S.balloon.setTarget(-vx * 0.06, 0);
      S.balloon.x.impulse(noise1(t * 0.5, 3) * 0.05);
      S.balloon.update(dt);
      o.balloon.rotation.z = clamp(S.balloon.x.value, -0.8, 0.8) + Math.sin(t * 1.5) * 0.05;
      o.balloon.rotation.x = Math.sin(t * 1.1) * 0.06;
    }
    o.umbrella.visible = acc === "umbrella";
    if (acc === "umbrella") {
      o.umbrella.rotation.z = -vx * 0.05 + Math.sin(t * 2) * 0.04;
      o.umbrella.rotation.x = clamp(vy * 0.01, -0.2, 0.1);
    }
    o.fish.visible = acc === "fish";
    if (acc === "fish") o.fish.rotation.z = Math.sin(t * 6) * 0.15;

    /* ---- petting ---- */
    S.petCooldown = Math.max(0, S.petCooldown - dt);
    S.petAmount = Math.max(0, S.petAmount - dt * 1.5);
  });

  const fur = palette.fur;
  const stripe = palette.stripe;
  const faceZ = (x: number, y: number) => 0.98 * Math.sqrt(Math.max(0.05, 1 - (x / 1.08) ** 2 - (y / 0.95) ** 2));
  const stripeMat = toon(stripe);
  const pawMat = flat(palette.paw);
  const shadeMat = toon(palette.furShade);

  return (
    <group
      ref={(g) => {
        if (g) {
          R.current.root = g;
          if (groupRef) groupRef.current = g;
        }
      }}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <group ref={r("crouch")}>
        <group ref={r("squash")}>
          <group ref={r("lean")}>
            {/* legs */}
            {(["L", "R"] as const).map((side) => {
              const sgn = side === "L" ? -1 : 1;
              return (
                <group key={side} ref={r("leg" + side)} position={[sgn * 0.3, 0.55, 0.05]}>
                  <Part geometry={G.leg} color={fur} position={[0, -0.22, 0]} />
                  <PawPad position={[0, -0.44, 0.178]} rotation={[-0.56, 0, 0]} scale={1.05} mat={pawMat} />
                </group>
              );
            })}
            {/* tail (whip chain) */}
            <group ref={r("tail")} position={[0.5, 0.35, -0.3]} rotation={[0, 0, -0.4]}>
              <TailChain i={0} fur={fur} tip={palette.furShade} r={r} />
            </group>
            {/* body + belly patch (a second sphere poking through the front) */}
            <group ref={r("bodyJiggle")} position={[0, 0.85, 0]}>
              <Part geometry={G.body} color={fur} scale={[1, 0.95, 0.88]} />
              <mesh geometry={G.body} material={shadeMat} position={[0, -0.06, 0.21]} scale={[0.64, 0.6, 0.6]} />
            </group>
            {/* arms */}
            <Arm side="L" fur={fur} pawMat={pawMat} r={r} />
            <Arm side="R" fur={fur} pawMat={pawMat} r={r} />

            {/* head */}
            <group ref={r("head")} position={[0, 1.88, 0]}>
              <Part geometry={G.head} color={fur} scale={[1.08, 0.95, 0.98]} outlineWidth={OUTLINE_W * 1.1} />
              {/* stripes */}
              <mesh geometry={G.stripe} material={stripeMat} position={[0, 0.875, 0.36]} rotation={[Math.PI / 2 + 0.42, 0, 0]} />
              <mesh geometry={G.stripe} material={stripeMat} position={[-0.25, 0.845, 0.34]} rotation={[Math.PI / 2 + 0.42, 0, 0.22]} />
              <mesh geometry={G.stripe} material={stripeMat} position={[0.25, 0.845, 0.34]} rotation={[Math.PI / 2 + 0.42, 0, -0.22]} />
              {/* ears: base + floppy tip */}
              {(["L", "R"] as const).map((side) => {
                const sgn = side === "L" ? -1 : 1;
                return (
                  <group key={side} ref={r("ear" + side)} position={[sgn * 0.62, 0.5, -0.04]} rotation={[0, 0, sgn * 0.38]}>
                    {/* fur root ball (outline-less) buried at the pivot — keeps the ear visually fused to the skull when it flops */}
                    <mesh geometry={G.head} material={toon(fur)} scale={[0.34, 0.26, 0.26]} position={[0, -0.03, -0.05]} />
                    <Part geometry={G.ear} color={fur} scale={[1, 1, 0.62]} outlineWidth={OUTLINE_W * 1.05} />
                    <mesh geometry={G.ear} material={toon(palette.innerEar)} position={[0, 0.07, 0.11]} scale={[0.55, 0.6, 0.55]} />
                  </group>
                );
              })}
              {/* whiskers */}
              {(["L", "R"] as const).map((side) => {
                const sgn = side === "L" ? -1 : 1;
                return (
                  <group key={side} ref={r("whisker" + side)} position={[sgn * 0.95, -0.2, 0.5]}>
                    {[-0.22, 0, 0.22].map((a, i) => (
                      <mesh key={i} geometry={G.whisker} material={M.ink} position={[sgn * 0.17, a * 0.55, 0]} rotation={[0, 0, sgn * (Math.PI / 2 - a * 0.9)]} scale={[0.8, 0.9 - Math.abs(a) * 0.5, 0.8]} />
                    ))}
                  </group>
                );
              })}

              {/* ---- FACE ---- */}
              {(["L", "R"] as const).map((side) => {
                const sgn = side === "L" ? -1 : 1;
                const ex = sgn * 0.4;
                const ey = -0.04;
                const dir = -sgn;
                return (
                  <group key={side}>
                    <group ref={r("eye" + side)} position={[ex, ey, faceZ(ex, ey) + 0.02]} rotation={[0, sgn * 0.36, 0]}>
                      <mesh ref={r("ring" + side)} geometry={G.eyeRing} material={M.white} position={[0, 0, -0.002]} />
                      <mesh ref={r("dot" + side)} geometry={G.eyeDot} material={M.ink} />
                      <mesh ref={r("hl" + side)} geometry={G.highlight} material={M.white} position={[-0.035, 0.04, 0.004]} />
                      <mesh ref={r("happy" + side)} geometry={G.happyArc} material={M.ink} position={[0, -0.03, 0]} />
                      <group ref={r("cry" + side)}>
                        <mesh geometry={G.chevron} material={M.ink} position={[dir * 0.06 - dir * 0.065, 0.05, 0]} rotation={[0, 0, -dir * 0.7]} />
                        <mesh geometry={G.chevron} material={M.ink} position={[dir * 0.06 - dir * 0.065, -0.05, 0]} rotation={[0, 0, dir * 0.7]} />
                      </group>
                      <mesh ref={r("heart" + side)} geometry={HEART_FLAT} material={M.heart} scale={0.0001} position={[0, 0.02, 0.003]} />
                      <mesh ref={r("star" + side)} geometry={STAR_FLAT} material={M.emoteGold} scale={0.0001} position={[0, 0, 0.003]} />
                      <mesh ref={r("spiral" + side)} geometry={G.spiral} material={M.ink} scale={0.0001} position={[0, 0, 0.003]} />
                      <mesh ref={r("lid" + side)} geometry={G.line} material={M.ink} position={[0, 0.1, 0.006]} scale={0.0001} />
                    </group>
                    <group position={[ex, 0.3, faceZ(ex, 0.3) + 0.02]} rotation={[0, sgn * 0.36, 0]}>
                      <group ref={r("brow" + side)}>
                        <mesh geometry={G.brow} material={M.ink} rotation={[0, 0, Math.PI / 2]} />
                      </group>
                    </group>
                    <mesh
                      ref={r("blush" + side)}
                      geometry={G.blush}
                      material={blushMat}
                      position={[sgn * 0.66, -0.27, faceZ(sgn * 0.66, -0.27) + 0.015]}
                      rotation={[0, sgn * 0.68, 0]}
                    />
                    {[0, 1].map((i) => (
                      <Part key={i} ref={r(`tear${side}${i}`)} geometry={G.drop} material={M.tear} outlineWidth={0.03} position={[sgn * (0.5 + i * 0.06), -0.2, faceZ(sgn * 0.52, -0.25) + 0.03]} />
                    ))}
                  </group>
                );
              })}
              {/* mouth cluster */}
              <group ref={r("mouth")} position={[0, -0.3, faceZ(0, -0.3) + 0.02]}>
                <group ref={r("mouthCat")}>
                  <mesh geometry={G.smallArc} material={M.ink} position={[-0.058, 0.02, 0]} rotation={[0, 0, Math.PI]} />
                  <mesh geometry={G.smallArc} material={M.ink} position={[0.058, 0.02, 0]} rotation={[0, 0, Math.PI]} />
                </group>
                <group ref={r("mouthSmile")}>
                  <mesh geometry={G.smileArc} material={M.ink} position={[0, 0.03, 0]} rotation={[0, 0, Math.PI]} />
                </group>
                <group ref={r("mouthFrown")}>
                  <mesh geometry={G.smallArc} material={M.ink} position={[0, -0.05, 0]} />
                </group>
                <group ref={r("mouthWobble")}>
                  <mesh geometry={G.tinyArc} material={M.ink} position={[-0.034, -0.01, 0]} />
                  <mesh geometry={G.tinyArc} material={M.ink} position={[0.034, -0.01, 0]} rotation={[0, 0, Math.PI]} />
                </group>
                <group ref={r("mouthLine")}>
                  <mesh geometry={G.line} material={M.ink} position={[0, -0.01, 0]} />
                </group>
                <group ref={r("mouthPout")}>
                  <mesh geometry={G.tinyArc} material={M.ink} position={[0.005, 0.03, 0]} rotation={[0, 0, -Math.PI / 2]} />
                  <mesh geometry={G.tinyArc} material={M.ink} position={[0.005, -0.04, 0]} rotation={[0, 0, -Math.PI / 2]} />
                </group>
                <group ref={r("mouthO")}>
                  <mesh geometry={G.oMouth} material={M.ink} />
                  <mesh geometry={G.oMouth} material={M.mouthIn} position={[0, 0, 0.002]} scale={0.62} />
                </group>
                <group ref={r("mouthOpen")} position={[0, -0.04, 0]}>
                  <mesh geometry={G.mouthOpenRim} material={M.ink} scale={[0.95, 1.1, 1]} />
                  <mesh geometry={G.mouthOpen} material={M.mouthIn} position={[0, 0, 0.002]} scale={[0.95, 1.1, 1]} />
                  <mesh geometry={G.tongue} material={M.tongue} position={[0, -0.05, 0.004]} />
                </group>
                <group ref={r("mouthScream")} position={[0, -0.1, 0]}>
                  <mesh geometry={G.screamRim} material={M.ink} scale={[0.9, 1.15, 1]} />
                  <mesh geometry={G.scream} material={M.mouthIn} position={[0, 0, 0.002]} scale={[0.9, 1.15, 1]} />
                  <mesh geometry={G.tongue} material={M.tongue} position={[0, -0.1, 0.004]} scale={1.2} />
                </group>
                <group ref={r("mouthGrin")} position={[0, -0.02, 0]}>
                  <mesh geometry={G.mouthOpenRim} material={M.ink} scale={[1.7, 0.95, 1]} />
                  <mesh geometry={G.mouthOpen} material={M.mouthIn} position={[0, 0, 0.002]} scale={[1.7, 0.95, 1]} />
                  <mesh geometry={G.teeth} material={M.white} position={[0, 0.06, 0.004]} />
                  <mesh geometry={G.tongue} material={M.tongue} position={[0, -0.06, 0.004]} scale={[1.3, 0.9, 1]} />
                </group>
                <group ref={r("mouthTongue")} position={[0, -0.06, 0]}>
                  <mesh geometry={G.tongue} material={M.ink} position={[0, 0, 0]} scale={[0.85, 1.25, 1]} />
                  <mesh geometry={G.tongue} material={M.tongue} position={[0, -0.005, 0.003]} scale={[0.68, 1.1, 1]} />
                </group>
              </group>
              {/* sweat drop + anger mark */}
              <Part ref={r("sweat")} geometry={G.drop} material={M.tear} outlineWidth={0.03} position={[0.82, 0.55, 0.45]} />
              <group ref={r("anger")} position={[0.6, 0.62, faceZ(0.6, 0.62) + 0.02]} rotation={[0, 0.5, 0]}>
                {[0, 1, 2, 3].map((i) => (
                  <mesh key={i} geometry={G.angerBar} material={M.anger} rotation={[0, 0, (i * Math.PI) / 4 + 0.4]} position={[Math.cos(i * 1.57) * 0.03, Math.sin(i * 1.57) * 0.03, 0]} />
                ))}
              </group>

              {/* ---- emote bubbles ---- */}
              <group ref={r("emotes")} position={[0.7, 1.25, 0.1]}>
                <group ref={r("emote_exclaim")}>
                  <Part geometry={G.exclaimBar} material={M.emoteRed} position={[0, 0.25, 0]} outlineWidth={0.035} />
                  <Part geometry={G.exclaimDot} material={M.emoteRed} position={[0, -0.05, 0]} outlineWidth={0.035} />
                </group>
                <group ref={r("emote_question")}>
                  <Part geometry={G.qArc} material={M.emoteBlue} position={[0, 0.28, 0]} rotation={[0, 0, -0.6]} outlineWidth={0.035} />
                  <Part geometry={G.qStem} material={M.emoteBlue} position={[0.02, 0.06, 0]} outlineWidth={0.035} />
                  <Part geometry={G.exclaimDot} material={M.emoteBlue} position={[0.02, -0.14, 0]} outlineWidth={0.035} />
                </group>
                <group ref={r("emote_heart")}>
                  <Part geometry={HEART_FLAT} material={M.heart} scale={2.2} outlineWidth={0.03} />
                </group>
                <group ref={r("emote_hearts3")}>
                  {[0, 1, 2].map((i) => (
                    <group key={i} ref={r("h3_" + i)}>
                      <Part geometry={HEART_FLAT} material={M.heart} scale={1.6} outlineWidth={0.03} />
                    </group>
                  ))}
                </group>
                <group ref={r("emote_zzz")}>
                  {[0, 1, 2].map((i) => (
                    <ZLetter key={i} idx={i} r={r} />
                  ))}
                </group>
                <group ref={r("emote_note")}>
                  <Part geometry={G.noteHead} material={M.emoteRed} position={[-0.06, -0.1, 0]} scale={[1.2, 0.85, 1]} rotation={[0, 0, -0.4]} outlineWidth={0.03} />
                  <Part geometry={G.noteStem} material={M.emoteRed} position={[0.03, 0.05, 0]} outlineWidth={0.03} />
                  <Part geometry={G.noteFlag} material={M.emoteRed} position={[0.085, 0.16, 0]} rotation={[0, 0, -0.5]} outlineWidth={0.03} />
                </group>
                <group ref={r("emote_sweat")}>
                  <Part geometry={G.drop} material={M.tear} scale={1.8} outlineWidth={0.03} />
                </group>
                <group ref={r("emote_anger")} position={[-0.15, -0.3, 0]}>
                  {[0, 1, 2, 3].map((i) => (
                    <mesh key={i} geometry={G.angerBar} material={M.anger} rotation={[0, 0, (i * Math.PI) / 4 + 0.4]} position={[Math.cos(i * 1.57) * 0.03, Math.sin(i * 1.57) * 0.03, 0]} scale={1.6} />
                  ))}
                </group>
                <group ref={r("emote_sparkles")}>
                  {[0, 1, 2, 3].map((i) => (
                    <mesh key={i} ref={r("spark" + i)} geometry={G.sparkle} material={M.spark} position={[Math.cos(i * 1.6) * 0.4 - 0.5, Math.sin(i * 1.6) * 0.35, 0]} scale={[1, 1.6, 1]} />
                  ))}
                </group>
              </group>
              {/* ambient sparkles (record / star) shares the spark refs */}
              <group ref={r("sparkles")} visible={false} />
              {/* dizzy stars orbiting */}
              <group ref={r("dizzy")} position={[0, 0.95, 0]}>
                {[0, 1, 2].map((i) => (
                  <Part key={i} ref={r("dz" + i)} geometry={STAR_GEO} material={M.emoteGold} scale={0.9} outlineWidth={0.025} />
                ))}
              </group>
            </group>

            {/* ---- accessories ---- */}
            <group ref={r("shield")} position={[0, 1.35, 0]} visible={false}>
              <mesh geometry={G.shield} material={M.shield} />
              <mesh geometry={G.shieldGloss} material={M.shieldGloss} position={[-0.9, 1.05, 1.0]} scale={[1, 0.5, 0.3]} rotation={[0, 0, 0.6]} />
            </group>
            <group ref={r("rocket")} position={[0, 1.0, -0.72]} visible={false}>
              <Part geometry={G.rocketBody} material={M.rocketRed} outlineWidth={0.05} />
              <Part geometry={G.rocketTip} material={M.rocketWhite} position={[0, 0.58, 0]} outlineWidth={0.04} />
              <mesh geometry={G.rocketBody} material={M.rocketWhite} scale={[1.02, 0.3, 1.02]} position={[0, -0.05, 0]} />
              <Part geometry={G.fin} material={M.rocketWhite} position={[-0.28, -0.35, 0]} outlineWidth={0.03} />
              <Part geometry={G.fin} material={M.rocketWhite} position={[0.28, -0.35, 0]} outlineWidth={0.03} />
              <group ref={r("flame")} position={[0, -0.55, 0]}>
                <mesh geometry={G.flame} material={M.flame} rotation={[Math.PI, 0, 0]} position={[0, -0.25, 0]} />
                <mesh geometry={G.flame} material={M.flameIn} rotation={[Math.PI, 0, 0]} position={[0, -0.15, 0]} scale={0.55} />
              </group>
            </group>
            <group ref={r("balloon")} position={[0.75, 2.05, 0.35]} visible={false}>
              <mesh geometry={G.string} material={M.ink} position={[0, 0.75, 0]} scale={[1, 1.5, 1]} />
              <Part geometry={G.balloonKnot} material={M.emoteRed} position={[0, 1.5, 0]} rotation={[Math.PI, 0, 0]} outlineWidth={0.03} />
              <Part geometry={G.balloon} material={M.emoteRed} position={[0, 2.05, 0]} scale={[1, 1.15, 1]} outlineWidth={0.05}>
                <mesh geometry={G.shieldGloss} material={M.shieldGloss} position={[-0.2, 0.25, 0.4]} scale={[0.6, 0.35, 0.2]} rotation={[0, 0, 0.6]} />
              </Part>
            </group>
            <group ref={r("umbrella")} position={[0.6, 2.2, 0.2]} visible={false}>
              <mesh geometry={G.umbrellaStick} material={M.stick} position={[0, 0.75, 0]} />
              <mesh geometry={G.umbrellaHandle} material={M.stick} position={[0.12, 0.02, 0]} rotation={[0, 0, Math.PI]} />
              <Part geometry={G.umbrellaTop} material={M.umbrella} position={[0, 1.4, 0]} scale={[1, 0.55, 1]} outlineWidth={0.05} />
              <mesh geometry={G.umbrellaTop} material={M.umbrellaAlt} position={[0, 1.41, 0]} scale={[0.35, 0.56, 1.01]} />
              <Part geometry={G.exclaimDot} material={M.emoteGold} position={[0, 2.02, 0]} outlineWidth={0.03} />
            </group>
            <group ref={r("fish")} position={[0, 1.15, 0.6]} rotation={[0, 0, 0.3]} visible={false}>
              <Part geometry={G.fishBody} material={M.fish} scale={[1.5, 0.9, 0.7]} outlineWidth={0.04} />
              <Part geometry={G.fishTail} material={M.fishDark} position={[-0.38, 0, 0]} rotation={[0, 0, Math.PI / 2]} scale={[1, 1, 0.5]} outlineWidth={0.035} />
              <mesh geometry={G.highlight} material={M.ink} position={[0.18, 0.05, 0.16]} scale={1.3} />
            </group>

            {/* ---- interactive hit zones ---- */}
            {interactive && (
              <>
                <mesh
                  position={[0, 1.9, 0]}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    fire("poke");
                    onPoke?.("head");
                  }}
                  onPointerMove={(e) => {
                    if (e.buttons === 0 && e.pointerType !== "touch") return;
                    S.petAmount += 0.12;
                    if (S.petAmount > 2.2 && S.petCooldown <= 0) {
                      S.petAmount = 0;
                      S.petCooldown = 2.5;
                      fire("pet");
                    }
                  }}
                >
                  <sphereGeometry args={[1.15, 12, 8]} />
                  <meshBasicMaterial visible={false} />
                </mesh>
                <mesh
                  position={[0, 0.8, 0.2]}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    fire("pokeBelly");
                    onPoke?.("belly");
                  }}
                >
                  <sphereGeometry args={[0.8, 12, 8]} />
                  <meshBasicMaterial visible={false} />
                </mesh>
                <mesh
                  position={[1.05, 0.45, -0.3]}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    fire("pokeTail");
                    onPoke?.("tail");
                  }}
                >
                  <sphereGeometry args={[0.5, 10, 8]} />
                  <meshBasicMaterial visible={false} />
                </mesh>
              </>
            )}
            {children}
          </group>
        </group>
      </group>
    </group>
  );
}

const EMOTE_NAMES: EmoteName[] = ["exclaim", "question", "heart", "zzz", "note", "sweat", "sparkles", "anger", "hearts3"];
export const ALL_EMOTES = EMOTE_NAMES;
export const ALL_ACCESSORIES: Accessory[] = ["none", "balloon", "rocket", "shield", "umbrella", "fish"];
export const ALL_EVENTS: CatEvent[] = Object.keys(EVENT_FLASH) as CatEvent[];

<<<<< END FILE: src/character/Cat.tsx >>>>>

<<<<< BEGIN FILE: src/character/Part.tsx (1234 bytes) >>>>>
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
  visible?: boolean;
  children?: React.ReactNode;
}

/** A toon-shaded mesh with a sticker-style ink outline (inverted hull). */
export const Part = forwardRef<THREE.Group, PartProps>(function Part(
  { geometry, color = "#ffffff", material, outlineWidth = OUTLINE_W, outlineColor = OUTLINE_COLOR, position, rotation, scale, renderOrder, visible, children },
  ref,
) {
  return (
    <group ref={ref} position={position} rotation={rotation} scale={scale} visible={visible}>
      <mesh geometry={geometry} material={material ?? toon(color)} renderOrder={renderOrder} />
      {outlineWidth > 0 && <mesh geometry={geometry} material={outline(outlineWidth, outlineColor)} renderOrder={renderOrder} />}
      {children}
    </group>
  );
});

<<<<< END FILE: src/character/Part.tsx >>>>>

<<<<< BEGIN FILE: src/character/README.md (3887 bytes) >>>>>
# Peach & Goma character rig

Everything about the cats lives in this folder and is **data-driven**. No model files — every whisker,
ear flop, toe bean and tail whip is math driven by springs.

| File | What it holds | How to extend |
| --- | --- | --- |
| `expressions.ts` | 39 facial presets over ~35 continuous channels (12 eye shapes incl. heart / star / spiral / shocked / lidded / wink, 11 mouth shapes, brows, blush, tears, sweat, anger mark, cheek puff, whisker lift, ear mood, shiver) | Add a key to `EXPRESSIONS` – it becomes available everywhere (`driver.expression = "myFace"`) and shows up in the Cat Lab automatically. |
| `poses.ts` | 39 body motion states (arms w/ 2-bone paws, legs, ears w/ tips, tail curl/wag, squash, crouch, pitch, roll, shiver…) + default expression per state + spring tuning | Add a key to `POSES` and `POSE_EXPRESSION`; set `driver.state = "myState"`. |
| `Cat.tsx` | The procedural rig: reads a `CatDriver` every frame, springs toward the pose, cross-fades the expression, layers velocity/acceleration reactions, breathing, blinking (incl. double blinks), 2-D look-at, ear/whisker/tail twitches, idle fidgets (stretch, groom, think, yawn, doze off with zzz…), emote bubbles, accessories and poke/pet hit-zones | Add one-shot reactions in `EVENT_FLASH` / `EVENT_EMOTE` / the `switch` inside the event loop. Add fidgets to `FIDGETS`. |
| `palettes.ts` | Colours + a tiny **personality** (energy, shyness, floppiness) per cat that changes how the rig moves | Add a new cat by adding a palette. |
| `springs.ts` | `Spring`, `Spring2`, `Chain` (follow-through whip), easing + noise helpers | Shared by the world too. |
| `materials.ts` / `Part.tsx` | Toon shading + inverted-hull ink outline + glossy bubble material | Shared by props/platforms. |

## Secondary motion layers (all springs)

- **Squash & stretch** – pose target × vertical velocity × breathing × belly jiggle
- **Head follow-through** – a 2-D spring that gets kicked by *acceleration* (direction changes, landings)
- **Ears** – single-piece ears pivoting *inside* the skull (no seams), driven by a base spring + a "tip lag" spring + wind flap that scales with fall speed + mood (flat when scared/angry, perked when excited)
- **Whiskers** – spring twitch, flare with speed, droop when sad
- **Tail** – 6-link follow-through chain (`Chain`) → whip motion, inertia against horizontal motion, curl per pose
- **Arms** – 2-bone (upper + forearm) with paw pads and toe beans, lag against acceleration, per-pose paw-up curl
- **Cheeks / belly** – jiggle springs kicked by landings & tickles

## Driving a cat from game code

```ts
const driver = useRef(createDriver());
<Cat palette={PALETTES.peach} driver={driver} interactive onEvent={playSound} />

// every frame
driver.current.vx = velocity.x;        // lean, tail inertia, look direction, arm lag
driver.current.vy = velocity.y;        // stretch, ear fold + flap, head pitch, whisker flare
driver.current.state = "fall";         // any MotionState
driver.current.expression = null;      // or force an ExpressionName
driver.current.look = 0.4;             // -1..1 horizontal gaze / body turn
driver.current.lookY = -0.2;           // -1..1 vertical gaze
driver.current.emote = "zzz";          // persistent bubble, or null
driver.current.accessory = "balloon";  // none | balloon | rocket | shield | umbrella | fish
driver.current.events.push("land");    // one-shot: squash, ear flop, squint flash, emote…
```

Events available: `land jump superJump spring collect star yum hurt hugged bump cheer slip stun shieldOn shieldPop rocketOn balloonOn balloonPop magnet wrap perfect milestone record poke pokeBelly pokeTail pet nearMiss startle wakeUp`

Open the **Cat Lab** from the main menu (or `#lab`) to preview every expression, pose, event, emote and
accessory live — and poke / pet / tickle the cat.

<<<<< END FILE: src/character/README.md >>>>>

<<<<< BEGIN FILE: src/character/expressions.ts (8337 bytes) >>>>>
/**
 * EXPRESSION SYSTEM
 * -----------------
 * Every facial feature is a continuous channel. An "expression" is a preset.
 * The rig cross-fades between presets every frame, so any two expressions blend
 * naturally, and event "flashes" can interrupt for a moment and melt back.
 *
 * To add a new expression: add an entry to EXPRESSIONS. That's it.
 */
export interface ExpressionParams {
  /* ---- eyes ---- */
  eyeOpen: number; // 0 = closed line, 1 = fully open dot
  eyeScale: number; // 1 = normal, >1 = wide, <1 = tiny
  eyeHappy: number; // ^ ^ arcs
  eyeCry: number; // > <  squeezed
  eyeHeart: number; // ♥ ♥
  eyeStar: number; // ★ ★
  eyeSpiral: number; // @ @ dizzy
  eyeShock: number; // tiny pupil in a white ring
  eyeLid: number; // upper lid coverage 0..1 (smug / sleepy / unimpressed)
  eyeSparkle: number; // highlight size
  eyeOffsetY: number; // vertical shift
  eyeSquash: number; // horizontal squash of the dot (0..1) for a "flat" line look
  winkR: number; // right eye closes independently
  /* ---- brows ---- */
  browLift: number; // visibility
  browAngle: number; // + worried (inner up), - angry
  browHeight: number; // extra raise
  /* ---- mouth ---- */
  mouthCat: number; // ω
  mouthSmile: number; // ◡
  mouthOpen: number; // open happy mouth w/ tongue
  mouthO: number; // small o
  mouthFrown: number; // ︿
  mouthWobble: number; // ~ (about to cry)
  mouthScream: number; // big D: shape
  mouthGrin: number; // wide toothy grin
  mouthTongue: number; // :P bleh
  mouthLine: number; // flat —
  mouthPout: number; // 3 / kiss
  /* ---- extras ---- */
  blush: number;
  tears: number;
  sweat: number;
  angerMark: number; // 💢
  cheekPuff: number; // puffed cheeks
  whiskerLift: number; // -1 droop .. +1 perk
  earMood: number; // -1 flat back .. +1 perked (blends into ears)
  headTilt: number; // additive radians
  shiver: number; // face jitter amplitude
}

export type ExpressionName =
  | "neutral"
  | "content"
  | "happy"
  | "joy"
  | "laugh"
  | "excited"
  | "surprised"
  | "shocked"
  | "worried"
  | "scared"
  | "terrified"
  | "squint"
  | "love"
  | "heartEyes"
  | "starEyes"
  | "sad"
  | "cry"
  | "sob"
  | "sleepy"
  | "asleep"
  | "smug"
  | "determined"
  | "dizzy"
  | "shy"
  | "angry"
  | "pout"
  | "bleh"
  | "yum"
  | "cold"
  | "confused"
  | "proud"
  | "kiss"
  | "sing"
  | "unimpressed"
  | "wink"
  | "ouch"
  | "relieved"
  | "focus"
  | "wow";

const BASE: ExpressionParams = {
  eyeOpen: 1,
  eyeScale: 1,
  eyeHappy: 0,
  eyeCry: 0,
  eyeHeart: 0,
  eyeStar: 0,
  eyeSpiral: 0,
  eyeShock: 0,
  eyeLid: 0,
  eyeSparkle: 0.6,
  eyeOffsetY: 0,
  eyeSquash: 0,
  winkR: 0,
  browLift: 0,
  browAngle: 0,
  browHeight: 0,
  mouthCat: 1,
  mouthSmile: 0,
  mouthOpen: 0,
  mouthO: 0,
  mouthFrown: 0,
  mouthWobble: 0,
  mouthScream: 0,
  mouthGrin: 0,
  mouthTongue: 0,
  mouthLine: 0,
  mouthPout: 0,
  blush: 0.7,
  tears: 0,
  sweat: 0,
  angerMark: 0,
  cheekPuff: 0,
  whiskerLift: 0,
  earMood: 0,
  headTilt: 0,
  shiver: 0,
};

const ex = (p: Partial<ExpressionParams>): ExpressionParams => ({ ...BASE, mouthCat: 0, ...p });

export const EXPRESSIONS: Record<ExpressionName, ExpressionParams> = {
  neutral: ex({ mouthCat: 1 }),
  content: ex({ mouthCat: 1, blush: 0.8, headTilt: 0.06, whiskerLift: 0.1 }),
  happy: ex({ mouthSmile: 1, blush: 0.9, eyeSparkle: 0.8, whiskerLift: 0.3, earMood: 0.3 }),
  joy: ex({ eyeOpen: 0, eyeHappy: 1, mouthOpen: 1, blush: 1, whiskerLift: 0.6, earMood: 0.5 }),
  laugh: ex({ eyeOpen: 0, eyeHappy: 1, mouthGrin: 1, blush: 1.1, whiskerLift: 0.7, earMood: 0.4, headTilt: -0.08 }),
  excited: ex({ eyeScale: 1.15, eyeSparkle: 1, mouthOpen: 1, blush: 1, whiskerLift: 0.8, earMood: 1 }),
  surprised: ex({ eyeScale: 1.35, eyeSparkle: 0.9, mouthO: 1, blush: 0.5, browLift: 0.6, browAngle: -0.1, browHeight: 0.6, whiskerLift: 0.5, earMood: 1 }),
  shocked: ex({ eyeScale: 1.4, eyeShock: 1, eyeSparkle: 0, mouthScream: 0.7, blush: 0.2, browLift: 1, browHeight: 1, sweat: 0.7, whiskerLift: 0.9, earMood: 1 }),
  worried: ex({ eyeScale: 0.95, browLift: 1, browAngle: 0.45, mouthFrown: 0.6, mouthWobble: 0.4, blush: 0.6, sweat: 0.6, whiskerLift: -0.3, earMood: -0.3 }),
  scared: ex({ eyeScale: 1.3, eyeSparkle: 0.3, browLift: 1, browAngle: 0.6, mouthO: 1, blush: 0.3, sweat: 1, whiskerLift: -0.4, earMood: -0.8 }),
  terrified: ex({ eyeScale: 1.3, eyeShock: 1, browLift: 1, browAngle: 0.7, mouthScream: 1, blush: 0.2, sweat: 1, tears: 0.4, whiskerLift: -0.6, earMood: -1, shiver: 1 }),
  squint: ex({ eyeOpen: 0, eyeCry: 1, mouthFrown: 0.6, blush: 0.8, whiskerLift: -0.2 }),
  love: ex({ eyeOpen: 0, eyeHappy: 1, mouthCat: 1, blush: 1.4, headTilt: 0.14, whiskerLift: 0.4, earMood: 0.2 }),
  heartEyes: ex({ eyeHeart: 1, mouthOpen: 0.8, blush: 1.3, headTilt: 0.1, whiskerLift: 0.8, earMood: 0.8 }),
  starEyes: ex({ eyeStar: 1, mouthOpen: 1, blush: 1, whiskerLift: 1, earMood: 1 }),
  sad: ex({ eyeOffsetY: -0.02, browLift: 1, browAngle: 0.55, mouthFrown: 1, blush: 0.7, tears: 0.35, whiskerLift: -0.6, earMood: -0.6 }),
  cry: ex({ eyeOpen: 0, eyeCry: 1, browLift: 1, browAngle: 0.7, mouthWobble: 1, blush: 1, tears: 1, whiskerLift: -0.7, earMood: -0.7 }),
  sob: ex({ eyeOpen: 0, eyeCry: 1, browLift: 1, browAngle: 0.8, mouthScream: 0.8, blush: 1, tears: 1.4, whiskerLift: -0.8, earMood: -0.9, shiver: 0.6 }),
  sleepy: ex({ eyeOpen: 0.35, eyeLid: 0.55, eyeSparkle: 0, mouthO: 0.5, blush: 0.6, headTilt: 0.18, whiskerLift: -0.3, earMood: -0.2 }),
  asleep: ex({ eyeOpen: 0, eyeSquash: 1, eyeSparkle: 0, mouthCat: 0.6, blush: 0.7, headTilt: 0.22, whiskerLift: -0.4, earMood: -0.4 }),
  smug: ex({ eyeOpen: 0.6, eyeLid: 0.5, mouthSmile: 1, blush: 0.8, headTilt: -0.1, whiskerLift: 0.3, earMood: 0.2 }),
  determined: ex({ eyeOpen: 0.9, browLift: 1, browAngle: -0.35, mouthSmile: 0.7, blush: 0.7, whiskerLift: 0.5, earMood: 0.6 }),
  focus: ex({ eyeOpen: 0.85, eyeScale: 0.95, browLift: 0.8, browAngle: -0.2, mouthLine: 1, blush: 0.6, whiskerLift: 0.2, earMood: 0.8 }),
  dizzy: ex({ eyeSpiral: 1, mouthWobble: 1, blush: 0.6, sweat: 0.8, headTilt: 0.25, whiskerLift: -0.3, earMood: -0.4 }),
  shy: ex({ eyeOpen: 0.7, eyeOffsetY: -0.03, mouthWobble: 0.6, blush: 1.6, headTilt: 0.2, whiskerLift: -0.2, earMood: -0.3 }),
  angry: ex({ eyeOpen: 0.75, eyeLid: 0.3, browLift: 1, browAngle: -0.6, mouthFrown: 1, blush: 0.6, angerMark: 1, whiskerLift: 0.4, earMood: -1 }),
  pout: ex({ eyeOpen: 0.8, eyeOffsetY: -0.02, browLift: 0.6, browAngle: 0.2, mouthPout: 1, cheekPuff: 1, blush: 1, headTilt: -0.12, whiskerLift: -0.4, earMood: -0.5 }),
  bleh: ex({ eyeOpen: 0, eyeSquash: 1, winkR: 1, mouthTongue: 1, blush: 0.9, headTilt: 0.12, whiskerLift: 0.2 }),
  yum: ex({ eyeOpen: 0, eyeHappy: 1, mouthTongue: 1, blush: 1.2, cheekPuff: 0.5, whiskerLift: 0.6, earMood: 0.5 }),
  cold: ex({ eyeOpen: 0.7, eyeScale: 0.9, browLift: 1, browAngle: 0.4, mouthWobble: 1, blush: 1.2, whiskerLift: -0.5, earMood: -0.6, shiver: 1 }),
  confused: ex({ eyeScale: 1.05, browLift: 1, browAngle: 0.15, browHeight: 0.4, winkR: 0.4, mouthLine: 0.6, mouthO: 0.3, blush: 0.6, headTilt: 0.3, whiskerLift: 0.1, earMood: 0.3 }),
  proud: ex({ eyeOpen: 0.4, eyeLid: 0.6, mouthSmile: 1, blush: 0.9, headTilt: -0.08, browLift: 0.5, browAngle: -0.15, whiskerLift: 0.5, earMood: 0.6 }),
  kiss: ex({ eyeOpen: 0, eyeSquash: 1, mouthPout: 1, blush: 1.5, headTilt: 0.18, whiskerLift: 0.4, earMood: 0.3 }),
  sing: ex({ eyeOpen: 0, eyeHappy: 1, mouthO: 1, blush: 1, headTilt: 0.15, whiskerLift: 0.5, earMood: 0.5 }),
  unimpressed: ex({ eyeOpen: 0.6, eyeLid: 0.6, mouthLine: 1, blush: 0.5, whiskerLift: -0.2, earMood: -0.3 }),
  wink: ex({ mouthSmile: 1, winkR: 1, blush: 1, eyeSparkle: 1, headTilt: -0.1, whiskerLift: 0.4, earMood: 0.5 }),
  ouch: ex({ eyeOpen: 0, eyeCry: 1, browLift: 1, browAngle: 0.5, mouthScream: 0.6, blush: 0.9, tears: 0.6, sweat: 0.5, whiskerLift: -0.5, earMood: -0.7 }),
  relieved: ex({ eyeOpen: 0, eyeHappy: 0.7, eyeSquash: 0.4, mouthSmile: 0.8, blush: 0.8, sweat: 0.7, headTilt: 0.1, whiskerLift: 0.1, earMood: -0.1 }),
  wow: ex({ eyeScale: 1.25, eyeSparkle: 1.2, mouthO: 1, blush: 0.9, browLift: 0.5, browHeight: 0.6, whiskerLift: 0.9, earMood: 1 }),
};

export const EXPRESSION_KEYS = Object.keys(BASE) as (keyof ExpressionParams)[];
export const EXPRESSION_NAMES = Object.keys(EXPRESSIONS) as ExpressionName[];

<<<<< END FILE: src/character/expressions.ts >>>>>

<<<<< BEGIN FILE: src/character/materials.ts (3982 bytes) >>>>>
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

<<<<< END FILE: src/character/materials.ts >>>>>

<<<<< BEGIN FILE: src/character/palettes.ts (1473 bytes) >>>>>
export type CatId = "peach" | "goma";

export interface CatPalette {
  id: CatId;
  name: string;
  fur: string;
  furShade: string; // belly / muzzle patch
  stripe: string;
  innerEar: string;
  blush: string;
  outline: string;
  paw: string; // toe beans
  accent: string; // UI accent
  tagline: string;
  /** Personality knobs the rig reads (0..1) — makes each cat move differently */
  personality: {
    energy: number; // idle bob / fidget frequency
    shyness: number; // blush amount, look-away tendency
    floppiness: number; // ear + tail softness
  };
}

export const PALETTES: Record<CatId, CatPalette> = {
  peach: {
    id: "peach",
    name: "Peach",
    fur: "#FFFDFB",
    furShade: "#FFF3F0",
    stripe: "#D9D2CF",
    innerEar: "#F7B3C2",
    blush: "#F6B6C3",
    outline: "#3B3231",
    paw: "#F4A9BA",
    accent: "#FF9EB5",
    tagline: "Soft, sweet & a little bit sassy",
    personality: { energy: 0.85, shyness: 0.35, floppiness: 0.55 },
  },
  goma: {
    id: "goma",
    name: "Goma",
    fur: "#B9B0AD",
    furShade: "#CFC7C4",
    stripe: "#8C8380",
    innerEar: "#F2A9B9",
    blush: "#E89DAB",
    outline: "#3B3231",
    paw: "#E7B4BF",
    accent: "#A99C98",
    tagline: "Calm, cuddly & always there for Peach",
    personality: { energy: 0.55, shyness: 0.6, floppiness: 0.75 },
  },
};

export const CAT_IDS = Object.keys(PALETTES) as CatId[];
export const otherCat = (id: CatId): CatId => (id === "peach" ? "goma" : "peach");

<<<<< END FILE: src/character/palettes.ts >>>>>

<<<<< BEGIN FILE: src/character/poses.ts (11818 bytes) >>>>>
/**
 * POSE / MOTION-STATE SYSTEM
 * --------------------------
 * A "pose" is a set of body targets. The rig springs toward the active pose
 * each frame and layers procedural motion (velocity reactions, breathing,
 * flailing, wagging, shivering...) on top.
 *
 * To add a new motion state: add an entry to POSES (and, optionally, a
 * default expression in POSE_EXPRESSION).
 */
import type { ExpressionName } from "./expressions";

export interface PoseParams {
  stretch: number; // vertical stretch factor (1 = neutral)
  crouch: number; // lowers the whole body (world units)
  lean: number; // extra body lean (radians, z)
  bodyPitch: number; // whole body pitch (x), + = leaning forward
  bodyRoll: number; // continuous spin speed (rad/s) around x — trampoline flips
  headTilt: number; // z
  headPitch: number; // x, + = looking down
  headYaw: number; // y
  armRaiseL: number; // outward/up rotation
  armRaiseR: number;
  armForwardL: number; // toward camera
  armForwardR: number;
  armWiggle: number; // sinus flail amplitude
  armWiggleSpeed: number;
  wave: number; // right-arm wave amplitude
  pawUpL: number; // paw pad shown / forearm curl
  pawUpR: number;
  legL: number; // leg forward rotation
  legR: number;
  legSpread: number; // legs apart (z rot)
  walkCycle: number; // 0..1 leg cycle amplitude
  walkSpeed: number;
  earFold: number; // - = flat back, + = perked
  earTipFlop: number; // - = tips droop
  tailLift: number;
  tailWag: number; // wag amplitude
  tailWagSpeed: number;
  tailCurl: number; // curl tightness
  bob: number; // idle bob amplitude
  bobSpeed: number;
  shiver: number; // body jitter amplitude
  whiskerFlare: number;
}

export type MotionState =
  | "idle"
  | "walk"
  | "run"
  | "rise"
  | "apex"
  | "fall"
  | "plummet"
  | "land"
  | "superJump"
  | "spin"
  | "rocket"
  | "float"
  | "glide"
  | "stunned"
  | "hurt"
  | "slip"
  | "balance"
  | "sit"
  | "sitSad"
  | "hug"
  | "wave"
  | "celebrate"
  | "dance"
  | "dizzy"
  | "lieDown"
  | "sleep"
  | "yawn"
  | "stretchUp"
  | "groom"
  | "peek"
  | "shiver"
  | "pounce"
  | "think"
  | "bow"
  | "yum"
  | "laugh"
  | "scaredBack"
  | "proud";

const BASE: PoseParams = {
  stretch: 1,
  crouch: 0,
  lean: 0,
  bodyPitch: 0,
  bodyRoll: 0,
  headTilt: 0,
  headPitch: 0,
  headYaw: 0,
  armRaiseL: 0.35,
  armRaiseR: 0.35,
  armForwardL: 0.25,
  armForwardR: 0.25,
  armWiggle: 0,
  armWiggleSpeed: 15,
  wave: 0,
  pawUpL: 0,
  pawUpR: 0,
  legL: 0,
  legR: 0,
  legSpread: 0,
  walkCycle: 0,
  walkSpeed: 12,
  earFold: 0,
  earTipFlop: 0,
  tailLift: 0,
  tailWag: 0.25,
  tailWagSpeed: 4.5,
  tailCurl: 0,
  bob: 0.02,
  bobSpeed: 2.2,
  shiver: 0,
  whiskerFlare: 0,
};

const p = (o: Partial<PoseParams>): PoseParams => ({ ...BASE, ...o });

export const POSES: Record<MotionState, PoseParams> = {
  idle: p({}),
  walk: p({ armWiggle: 0.25, walkCycle: 1, bob: 0.04, bobSpeed: 6, tailWag: 0.35 }),
  run: p({ armWiggle: 0.5, armWiggleSpeed: 22, walkCycle: 1.3, walkSpeed: 18, bob: 0.06, bobSpeed: 9, bodyPitch: 0.2, earFold: -0.4, tailLift: 0.4, tailWag: 0.2 }),
  rise: p({ stretch: 1.12, armRaiseL: 2.5, armRaiseR: 2.5, armForwardL: 0.2, armForwardR: 0.2, earFold: -0.6, earTipFlop: -0.5, legL: -0.4, legR: -0.4, tailLift: -0.5, tailWag: 0.1, tailCurl: 0.3 }),
  apex: p({ stretch: 1.0, armRaiseL: 1.6, armRaiseR: 1.6, armForwardL: 0.5, armForwardR: 0.5, earFold: 0.1, legL: 0.2, legR: -0.2, whiskerFlare: 0.3 }),
  fall: p({ stretch: 0.98, armRaiseL: 1.2, armRaiseR: 1.2, armForwardL: 0.6, armForwardR: 0.6, armWiggle: 0.35, earFold: 0.55, earTipFlop: 0.6, legL: 0.6, legR: 0.3, tailLift: 0.6, tailWag: 0.5, tailWagSpeed: 7 }),
  plummet: p({ stretch: 1.06, armRaiseL: 2.2, armRaiseR: 2.2, armWiggle: 0.8, armWiggleSpeed: 24, earFold: 0.9, earTipFlop: 1, legL: 0.8, legR: 0.6, legSpread: 0.3, tailLift: 1.0, tailWag: 0.9, tailWagSpeed: 10, headPitch: -0.15, whiskerFlare: 1 }),
  land: p({ stretch: 0.8, crouch: 0.1, armRaiseL: 0.9, armRaiseR: 0.9, armForwardL: -0.3, armForwardR: -0.3, earFold: -0.3, earTipFlop: -0.6, headPitch: 0.2, legSpread: 0.2 }),
  superJump: p({ stretch: 1.25, armRaiseL: 2.8, armRaiseR: 2.8, earFold: -0.9, earTipFlop: -0.8, legL: -0.6, legR: -0.6, tailLift: -0.8, tailCurl: 0.5, headPitch: -0.2, whiskerFlare: 0.6 }),
  spin: p({ stretch: 0.92, bodyRoll: 11, armRaiseL: 0.2, armRaiseR: 0.2, armForwardL: 1.2, armForwardR: 1.2, legL: 1.2, legR: 1.2, earFold: -0.6, tailCurl: 1, tailLift: 0.6 }),
  rocket: p({ stretch: 1.18, bodyPitch: -0.15, armRaiseL: 0.1, armRaiseR: 0.1, armForwardL: -0.6, armForwardR: -0.6, legL: -0.3, legR: -0.3, earFold: -1, earTipFlop: -1, tailLift: -0.9, tailCurl: 0.4, headPitch: -0.25, whiskerFlare: 1 }),
  float: p({ stretch: 1.02, armRaiseL: 0.4, armRaiseR: 2.9, armForwardL: 0.6, pawUpR: 1, legL: 0.5, legR: 0.3, legSpread: 0.15, earFold: 0.3, tailLift: 0.5, tailWag: 0.3, tailWagSpeed: 2.5, bob: 0.05, bobSpeed: 1.6, headTilt: 0.1 }),
  glide: p({ stretch: 1.0, bodyPitch: 0.35, armRaiseL: 2.6, armRaiseR: 2.6, armForwardL: -0.3, armForwardR: -0.3, legL: 0.9, legR: 0.9, legSpread: 0.4, earFold: 0.8, earTipFlop: 0.8, tailLift: 0.8, tailWag: 0.2, whiskerFlare: 0.7 }),
  stunned: p({ stretch: 0.95, headTilt: 0.35, headPitch: 0.1, armRaiseL: 1.0, armRaiseR: 0.3, armForwardL: 0.5, armForwardR: 0.7, earFold: -0.7, earTipFlop: 0.8, lean: 0.12, legSpread: 0.3, tailLift: -0.3, tailWag: 0.05 }),
  hurt: p({ stretch: 0.9, crouch: 0.05, headPitch: 0.15, armRaiseL: 0.6, armRaiseR: 0.6, armForwardL: 1.2, armForwardR: 1.2, pawUpL: 0.6, pawUpR: 0.6, earFold: -0.9, earTipFlop: 0.4, tailLift: -0.6, tailWag: 0.1, shiver: 0.4 }),
  slip: p({ stretch: 0.95, lean: 0.25, armRaiseL: 2.0, armRaiseR: 1.5, armWiggle: 0.6, armWiggleSpeed: 20, legL: -0.6, legR: 0.7, legSpread: 0.5, earFold: 0.4, earTipFlop: 0.6, tailLift: 0.7, tailWag: 0.8, tailWagSpeed: 12 }),
  balance: p({ armRaiseL: 1.5, armRaiseR: 1.5, armWiggle: 0.3, armWiggleSpeed: 9, lean: 0.08, legSpread: 0.25, earFold: 0.3, tailLift: 0.6, tailWag: 0.7, tailWagSpeed: 8 }),
  sit: p({ crouch: 0.28, legL: 1.5, legR: 1.5, legSpread: 0.2, armRaiseL: 0.25, armRaiseR: 0.25, armForwardL: 0.55, armForwardR: 0.55, headTilt: 0.05, tailLift: 0.4, tailWag: 0.35, tailCurl: 0.6 }),
  sitSad: p({ crouch: 0.32, stretch: 0.96, legL: 1.5, legR: 1.5, armRaiseL: 0.1, armRaiseR: 0.1, armForwardL: 0.9, armForwardR: 0.9, headPitch: 0.25, earFold: -0.5, earTipFlop: 0.7, tailLift: -0.2, tailWag: 0.05, bob: 0.01 }),
  hug: p({ armRaiseL: 0.5, armRaiseR: 0.5, armForwardL: 1.5, armForwardR: 1.5, headTilt: 0.2, headPitch: 0.1, earFold: -0.15, tailWag: 0.6, tailWagSpeed: 6, bob: 0.03 }),
  wave: p({ armRaiseR: 2.6, wave: 0.45, pawUpR: 1, headTilt: -0.1, earFold: 0.2, tailWag: 0.5 }),
  celebrate: p({ stretch: 1.05, armRaiseL: 2.6, armRaiseR: 2.6, armWiggle: 0.5, pawUpL: 1, pawUpR: 1, bob: 0.08, bobSpeed: 7, earFold: 0.3, tailWag: 0.9, tailWagSpeed: 9, tailLift: 0.3 }),
  dance: p({ armRaiseL: 1.2, armRaiseR: 1.2, armWiggle: 0.9, armWiggleSpeed: 9, pawUpL: 1, pawUpR: 1, walkCycle: 0.6, walkSpeed: 9, bob: 0.07, bobSpeed: 4.5, headTilt: 0.15, earFold: 0.4, tailWag: 0.8, tailWagSpeed: 9, lean: 0.1 }),
  dizzy: p({ headTilt: 0.3, armRaiseL: 0.9, armRaiseR: 0.2, armForwardL: 0.4, armForwardR: 0.5, earFold: -0.6, earTipFlop: 0.7, lean: 0.12, bob: 0.03, bobSpeed: 1.4 }),
  lieDown: p({ crouch: 0.35, legL: 1.4, legR: 1.4, legSpread: 0.3, armRaiseL: 0.15, armRaiseR: 0.15, armForwardL: 1.2, armForwardR: 1.2, headPitch: -0.2, tailLift: 0.5, tailCurl: 0.8, tailWagSpeed: 2 }),
  sleep: p({ crouch: 0.4, stretch: 0.97, legL: 1.4, legR: 1.4, legSpread: 0.3, armRaiseL: 0.1, armRaiseR: 0.1, armForwardL: 1.3, armForwardR: 1.3, headPitch: 0.25, headTilt: 0.2, earFold: -0.4, earTipFlop: 0.6, tailLift: 0.2, tailCurl: 1, tailWag: 0.05, tailWagSpeed: 1, bob: 0.03, bobSpeed: 1.1 }),
  yawn: p({ crouch: 0.05, stretch: 1.04, armRaiseL: 1.0, armRaiseR: 1.0, armForwardL: 0.9, armForwardR: 0.9, pawUpR: 0.8, headPitch: -0.25, earFold: -0.6, earTipFlop: 0.3, tailLift: 0.2 }),
  stretchUp: p({ stretch: 1.2, armRaiseL: 2.9, armRaiseR: 2.9, headPitch: -0.2, earFold: -0.4, tailLift: 0.7, tailCurl: 0.3, legL: -0.2, legR: -0.2 }),
  groom: p({ crouch: 0.2, legL: 1.3, legR: 1.3, armRaiseR: 1.4, armForwardR: 1.6, pawUpR: 1, armWiggle: 0.12, armWiggleSpeed: 11, headTilt: -0.25, headPitch: 0.15, earFold: -0.3, tailCurl: 0.5 }),
  peek: p({ crouch: 0.15, headPitch: 0.1, headYaw: 0.4, armRaiseL: 0.6, armRaiseR: 0.6, armForwardL: 1.1, armForwardR: 1.1, earFold: 0.8, legSpread: 0.1, tailLift: 0.3, tailWag: 0.15 }),
  shiver: p({ crouch: 0.08, stretch: 0.96, armRaiseL: 0.2, armRaiseR: 0.2, armForwardL: 1.1, armForwardR: 1.1, pawUpL: 0.5, pawUpR: 0.5, earFold: -0.6, earTipFlop: 0.4, tailLift: -0.4, tailCurl: 0.9, tailWag: 0.05, shiver: 1 }),
  pounce: p({ crouch: 0.22, stretch: 0.85, bodyPitch: 0.25, armRaiseL: 0.2, armRaiseR: 0.2, armForwardL: 1.0, armForwardR: 1.0, legL: 0.3, legR: 0.3, earFold: 0.6, tailLift: 0.9, tailWag: 0.9, tailWagSpeed: 13, headPitch: -0.1 }),
  think: p({ armRaiseR: 1.1, armForwardR: 1.4, pawUpR: 1, headTilt: 0.22, headPitch: -0.1, earFold: 0.2, tailWag: 0.4, tailWagSpeed: 3 }),
  bow: p({ crouch: 0.1, bodyPitch: 0.55, headPitch: 0.35, armRaiseL: 0.2, armRaiseR: 0.2, armForwardL: 0.9, armForwardR: 0.9, earFold: -0.2, tailLift: 0.4 }),
  yum: p({ crouch: 0.05, armRaiseL: 0.9, armRaiseR: 0.9, armForwardL: 1.5, armForwardR: 1.5, pawUpL: 1, pawUpR: 1, headTilt: 0.1, bob: 0.04, bobSpeed: 5, earFold: 0.3, tailWag: 0.7, tailWagSpeed: 8 }),
  laugh: p({ stretch: 1.03, headPitch: -0.2, armRaiseL: 0.6, armRaiseR: 0.6, armForwardL: 1.2, armForwardR: 1.2, pawUpL: 0.8, pawUpR: 0.8, bob: 0.06, bobSpeed: 11, earFold: 0.3, tailWag: 0.8, tailWagSpeed: 10 }),
  scaredBack: p({ crouch: 0.1, stretch: 0.92, bodyPitch: -0.2, lean: 0.05, armRaiseL: 1.6, armRaiseR: 1.6, armForwardL: 0.9, armForwardR: 0.9, pawUpL: 1, pawUpR: 1, earFold: -1, earTipFlop: 0.6, tailLift: 0.9, tailCurl: 0.2, tailWag: 0.2, shiver: 0.5 }),
  proud: p({ stretch: 1.04, bodyPitch: -0.1, armRaiseL: 0.15, armRaiseR: 0.15, armForwardL: 0.9, armForwardR: 0.9, headPitch: -0.15, earFold: 0.6, tailLift: 0.9, tailCurl: 0.4, tailWag: 0.3 }),
};

/** Expression that plays by default with a motion state (can be overridden). */
export const POSE_EXPRESSION: Record<MotionState, ExpressionName> = {
  idle: "content",
  walk: "content",
  run: "determined",
  rise: "excited",
  apex: "happy",
  fall: "worried",
  plummet: "terrified",
  land: "squint",
  superJump: "joy",
  spin: "wow",
  rocket: "starEyes",
  float: "happy",
  glide: "focus",
  stunned: "dizzy",
  hurt: "ouch",
  slip: "shocked",
  balance: "worried",
  sit: "content",
  sitSad: "cry",
  hug: "love",
  wave: "happy",
  celebrate: "joy",
  dance: "sing",
  dizzy: "dizzy",
  lieDown: "sleepy",
  sleep: "asleep",
  yawn: "sleepy",
  stretchUp: "relieved",
  groom: "focus",
  peek: "confused",
  shiver: "cold",
  pounce: "determined",
  think: "confused",
  bow: "content",
  yum: "yum",
  laugh: "laugh",
  scaredBack: "scared",
  proud: "proud",
};

/** Per-parameter spring tuning (stiffness, damping). Anything missing uses the default. */
export const POSE_SPRING_TUNING: Partial<Record<keyof PoseParams, [number, number]>> = {
  stretch: [260, 12],
  crouch: [140, 14],
  bodyPitch: [110, 12],
  armRaiseL: [110, 11],
  armRaiseR: [110, 11],
  armForwardL: [110, 11],
  armForwardR: [110, 11],
  pawUpL: [140, 12],
  pawUpR: [140, 12],
  legL: [140, 12],
  legR: [140, 12],
  legSpread: [140, 12],
  earFold: [180, 9],
  earTipFlop: [160, 8],
  tailLift: [90, 8],
  tailCurl: [80, 9],
  headTilt: [120, 12],
  headPitch: [120, 12],
  headYaw: [120, 12],
  whiskerFlare: [160, 10],
};

export const POSE_KEYS = Object.keys(BASE) as (keyof PoseParams)[];
export const POSE_NAMES = Object.keys(POSES) as MotionState[];

<<<<< END FILE: src/character/poses.ts >>>>>

<<<<< BEGIN FILE: src/character/springs.ts (3524 bytes) >>>>>
/**
 * Secondary-motion toolkit.
 * -------------------------
 * Everything that "feels alive" in the rig is a damped harmonic spring:
 * squash & stretch, ears, whiskers, belly jiggle, tail whip, head
 * follow-through, arm lag... Fixed sub-stepping keeps it stable at any fps.
 */
export class Spring {
  value: number;
  velocity = 0;
  target: number;
  constructor(value = 0, public stiffness = 120, public damping = 14) {
    this.value = value;
    this.target = value;
  }
  set(v: number) {
    this.value = v;
    this.target = v;
    this.velocity = 0;
  }
  impulse(v: number) {
    this.velocity += v;
  }
  update(dt: number) {
    let remaining = Math.min(dt, 0.1);
    const step = 1 / 120;
    while (remaining > 0) {
      const h = Math.min(step, remaining);
      const f = (this.target - this.value) * this.stiffness - this.velocity * this.damping;
      this.velocity += f * h;
      this.value += this.velocity * h;
      remaining -= h;
    }
    return this.value;
  }
}

/** Two independent springs bundled (head follow-through, jiggles, look-at). */
export class Spring2 {
  x: Spring;
  y: Spring;
  constructor(stiffness = 120, damping = 14) {
    this.x = new Spring(0, stiffness, damping);
    this.y = new Spring(0, stiffness, damping);
  }
  impulse(x: number, y: number) {
    this.x.impulse(x);
    this.y.impulse(y);
  }
  setTarget(x: number, y: number) {
    this.x.target = x;
    this.y.target = y;
  }
  update(dt: number) {
    this.x.update(dt);
    this.y.update(dt);
    return this;
  }
}

/**
 * Follow-through chain: each link springs toward the previous link's angle,
 * producing a whip / ribbon motion (tail, long ears, balloon strings).
 */
export class Chain {
  links: Spring[];
  constructor(n: number, stiffness = 90, damping = 9) {
    this.links = Array.from({ length: n }, (_, i) => new Spring(0, stiffness * (1 - i * 0.08), damping * (1 - i * 0.05)));
  }
  update(root: number, dt: number) {
    let prev = root;
    for (const l of this.links) {
      l.target = prev;
      prev = l.update(dt);
    }
    return this.links;
  }
  impulse(v: number, falloff = 0.75) {
    let k = v;
    for (const l of this.links) {
      l.impulse(k);
      k *= falloff;
    }
  }
}

/** Frame-rate independent exponential smoothing */
export function damp(current: number, target: number, lambda: number, dt: number) {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
export const rand = (min: number, max: number) => min + Math.random() * (max - min);
export const pick = <T>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];
export const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
export const easeOutBack = (t: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
export const easeOutElastic = (t: number) => {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1;
};
/** Cheap deterministic noise (sum of sines) — perfect for breathing / drift. */
export const noise1 = (t: number, seed = 0) =>
  (Math.sin(t * 1.7 + seed) + Math.sin(t * 2.3 + seed * 1.3 + 1.1) * 0.6 + Math.sin(t * 4.1 + seed * 0.7 + 2.3) * 0.3) / 1.9;

<<<<< END FILE: src/character/springs.ts >>>>>

<<<<< BEGIN FILE: src/game/sfx.ts (6504 bytes) >>>>>
/**
 * Procedural kawaii sound effects (no assets needed).
 */
import { useGame } from "./store";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;

function ac() {
  if (!ctx) {
    ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    master = ctx.createGain();
    master.gain.value = 0.5;
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function tone(freq: number, dur: number, opts: { type?: OscillatorType; to?: number; vol?: number; delay?: number; attack?: number; vib?: number } = {}) {
  if (useGame.getState().muted) return;
  try {
    const c = ac();
    const t0 = c.currentTime + (opts.delay ?? 0);
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = opts.type ?? "sine";
    o.frequency.setValueAtTime(freq, t0);
    if (opts.to) o.frequency.exponentialRampToValueAtTime(opts.to, t0 + dur);
    if (opts.vib) {
      const lfo = c.createOscillator();
      const lg = c.createGain();
      lfo.frequency.value = 6;
      lg.gain.value = opts.vib;
      lfo.connect(lg).connect(o.frequency);
      lfo.start(t0);
      lfo.stop(t0 + dur + 0.05);
    }
    const v = opts.vol ?? 0.25;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(v, t0 + (opts.attack ?? 0.01));
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g).connect(master!);
    o.start(t0);
    o.stop(t0 + dur + 0.05);
  } catch {
    /* audio not available */
  }
}

function noise(dur: number, opts: { vol?: number; delay?: number; freq?: number; q?: number; to?: number } = {}) {
  if (useGame.getState().muted) return;
  try {
    const c = ac();
    const t0 = c.currentTime + (opts.delay ?? 0);
    const len = Math.floor(c.sampleRate * dur);
    const buf = c.createBuffer(1, len, c.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = c.createBufferSource();
    src.buffer = buf;
    const f = c.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.setValueAtTime(opts.freq ?? 1200, t0);
    if (opts.to) f.frequency.exponentialRampToValueAtTime(opts.to, t0 + dur);
    f.Q.value = opts.q ?? 0.8;
    const g = c.createGain();
    g.gain.setValueAtTime(opts.vol ?? 0.2, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(f).connect(g).connect(master!);
    src.start(t0);
  } catch {
    /* ignore */
  }
}

export const sfx = {
  unlock: () => {
    try {
      ac();
    } catch {
      /* ignore */
    }
  },
  jump: () => tone(420, 0.16, { type: "triangle", to: 760, vol: 0.18 }),
  cloud: () => {
    tone(380, 0.14, { type: "triangle", to: 640, vol: 0.14 });
    noise(0.3, { vol: 0.08, freq: 900, to: 300 });
  },
  pillow: () => {
    tone(300, 0.35, { type: "triangle", to: 1400, vol: 0.22 });
    tone(600, 0.3, { type: "sine", to: 1800, vol: 0.12, delay: 0.05 });
  },
  spring: () => {
    tone(220, 0.08, { type: "square", to: 440, vol: 0.06 });
    tone(440, 0.4, { type: "triangle", to: 1760, vol: 0.18, delay: 0.05, vib: 30 });
  },
  ice: () => {
    tone(1800, 0.25, { type: "sine", to: 2600, vol: 0.08 });
    noise(0.35, { vol: 0.1, freq: 3000, to: 5000, q: 2 });
  },
  crumble: () => {
    noise(0.5, { vol: 0.16, freq: 400, to: 120, q: 0.6 });
    tone(140, 0.4, { type: "sawtooth", to: 60, vol: 0.05 });
  },
  crack: () => noise(0.12, { vol: 0.12, freq: 2000, q: 1.5 }),
  heart: () => {
    tone(880, 0.12, { vol: 0.16 });
    tone(1320, 0.18, { vol: 0.16, delay: 0.08 });
  },
  fish: () => {
    tone(660, 0.08, { type: "triangle", vol: 0.14 });
    tone(880, 0.08, { type: "triangle", vol: 0.14, delay: 0.09 });
    tone(1100, 0.2, { type: "triangle", vol: 0.14, delay: 0.18 });
  },
  star: () => [1047, 1319, 1568, 2093].forEach((f, i) => tone(f, 0.25, { vol: 0.13, delay: i * 0.06 })),
  rocket: () => {
    noise(1.6, { vol: 0.2, freq: 300, to: 1600, q: 0.5 });
    tone(120, 1.4, { type: "sawtooth", to: 520, vol: 0.06 });
  },
  balloon: () => tone(520, 0.5, { type: "sine", to: 1040, vol: 0.12, vib: 12 }),
  pop: () => {
    noise(0.08, { vol: 0.25, freq: 1500, q: 0.5 });
    tone(900, 0.08, { type: "square", to: 200, vol: 0.05 });
  },
  shield: () => {
    tone(440, 0.3, { type: "sine", to: 880, vol: 0.12 });
    tone(660, 0.4, { type: "sine", to: 1320, vol: 0.1, delay: 0.1 });
  },
  magnet: () => [400, 500, 600, 700, 800].forEach((f, i) => tone(f, 0.08, { type: "square", vol: 0.04, delay: i * 0.05 })),
  hug: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.28, { vol: 0.16, delay: i * 0.09 })),
  bump: () => tone(200, 0.12, { type: "square", to: 120, vol: 0.06 }),
  stun: () => {
    tone(300, 0.3, { type: "square", to: 150, vol: 0.06 });
    [900, 700, 500].forEach((f, i) => tone(f, 0.12, { type: "triangle", vol: 0.08, delay: 0.1 + i * 0.1 }));
  },
  hurt: () => {
    tone(600, 0.2, { type: "sawtooth", to: 200, vol: 0.06 });
    tone(1200, 0.12, { type: "triangle", to: 800, vol: 0.08 });
  },
  perfect: (n: number) => tone(700 + Math.min(n, 10) * 90, 0.15, { type: "triangle", to: 1000 + Math.min(n, 10) * 120, vol: 0.14 }),
  milestone: () => [784, 988, 1175, 1568].forEach((f, i) => tone(f, 0.3, { type: "triangle", vol: 0.14, delay: i * 0.08 })),
  fall: () => tone(700, 0.9, { type: "triangle", to: 90, vol: 0.14, attack: 0.05 }),
  sad: () => [523, 494, 440, 392].forEach((f, i) => tone(f, 0.4, { vol: 0.14, delay: 0.5 + i * 0.22, type: "triangle" })),
  click: () => tone(900, 0.07, { type: "sine", to: 1200, vol: 0.12 }),
  select: () => {
    tone(660, 0.1, { vol: 0.14 });
    tone(990, 0.14, { vol: 0.14, delay: 0.07 });
  },
  meow: () => {
    tone(620, 0.32, { type: "triangle", to: 880, vol: 0.12, attack: 0.04, vib: 14 });
    tone(880, 0.22, { type: "triangle", to: 560, vol: 0.1, delay: 0.3, attack: 0.02 });
  },
  purr: () => {
    for (let i = 0; i < 8; i++) tone(70, 0.1, { type: "sawtooth", vol: 0.05, delay: i * 0.09 });
  },
  giggle: () => [880, 1046, 988, 1174].forEach((f, i) => tone(f, 0.1, { type: "triangle", vol: 0.1, delay: i * 0.08 })),
  grumble: () => tone(180, 0.3, { type: "sawtooth", to: 120, vol: 0.05, vib: 8 }),
  yawn: () => tone(400, 0.7, { type: "triangle", to: 250, vol: 0.08, attack: 0.15 }),
  wrap: () => tone(500, 0.1, { type: "sine", to: 900, vol: 0.06 }),
  tick: () => tone(1200, 0.04, { type: "square", vol: 0.03 }),
};

<<<<< END FILE: src/game/sfx.ts >>>>>

<<<<< BEGIN FILE: src/game/store.ts (3826 bytes) >>>>>
import { create } from "zustand";
import type { CatId } from "../character/palettes";
import type { ExpressionName } from "../character/expressions";
import type { MotionState } from "../character/poses";
import type { Accessory, EmoteName } from "../character/Cat";

export type Phase = "menu" | "playing" | "gameover" | "lab";
export type PowerKind = "rocket" | "balloon" | "magnet" | null;

interface RunStats {
  score: number;
  altitude: number;
  hearts: number;
  hugs: number;
  combo: number;
  bestCombo: number;
  stars: number;
  fish: number;
}

export interface Toast {
  id: number;
  text: string;
  color: string;
}

export interface LabState {
  expression: ExpressionName | null;
  pose: MotionState;
  accessory: Accessory;
  emote: EmoteName | null;
  autoTour: boolean;
  vx: number;
  vy: number;
}

interface GameStore extends RunStats {
  toasts: Toast[];
  pushToast: (text: string, color?: string) => void;
  phase: Phase;
  character: CatId;
  best: Record<CatId, number>;
  skyTier: number;
  muted: boolean;
  paused: boolean;
  runId: number;
  power: PowerKind;
  powerLeft: number; // 0..1
  shield: boolean;
  hurtFlash: number;
  lab: LabState;
  setCharacter: (c: CatId) => void;
  start: () => void;
  openLab: () => void;
  backToMenu: () => void;
  updateRun: (s: Partial<RunStats>) => void;
  setSkyTier: (t: number) => void;
  setPower: (k: PowerKind, left: number) => void;
  setShield: (on: boolean) => void;
  flashHurt: () => void;
  endRun: () => void;
  toggleMute: () => void;
  togglePause: () => void;
  setLab: (s: Partial<LabState>) => void;
}

const loadBest = (): Record<CatId, number> => {
  try {
    const raw = localStorage.getItem("peachgoma.best");
    if (raw) return { peach: 0, goma: 0, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return { peach: 0, goma: 0 };
};

const EMPTY_RUN: RunStats = { score: 0, altitude: 0, hearts: 0, hugs: 0, combo: 0, bestCombo: 0, stars: 0, fish: 0 };

export const useGame = create<GameStore>((set, get) => ({
  phase: "menu",
  character: "peach",
  best: loadBest(),
  ...EMPTY_RUN,
  skyTier: 0,
  muted: false,
  paused: false,
  runId: 0,
  power: null,
  powerLeft: 0,
  shield: false,
  hurtFlash: 0,
  toasts: [],
  lab: { expression: null, pose: "idle", accessory: "none", emote: null, autoTour: false, vx: 0, vy: 0 },
  pushToast: (text, color = "#FF8FAF") => {
    const id = Date.now() + Math.random();
    set((s) => ({ toasts: [...s.toasts.slice(-4), { id, text, color }] }));
    setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), 1100);
  },
  setCharacter: (c) => set({ character: c }),
  start: () => set((s) => ({ phase: "playing", paused: false, ...EMPTY_RUN, skyTier: 0, power: null, powerLeft: 0, shield: false, runId: s.runId + 1 })),
  openLab: () => set({ phase: "lab", skyTier: 0 }),
  backToMenu: () => set({ phase: "menu", skyTier: 0, paused: false }),
  updateRun: (s) => set(s),
  setSkyTier: (t) => {
    if (get().skyTier !== t) set({ skyTier: t });
  },
  setPower: (k, left) => {
    const s = get();
    if (s.power !== k || Math.abs(s.powerLeft - left) > 0.02) set({ power: k, powerLeft: left });
  },
  setShield: (on) => {
    if (get().shield !== on) set({ shield: on });
  },
  flashHurt: () => set((s) => ({ hurtFlash: s.hurtFlash + 1 })),
  endRun: () => {
    const { score, character, best } = get();
    const nb = { ...best, [character]: Math.max(best[character], score) };
    try {
      localStorage.setItem("peachgoma.best", JSON.stringify(nb));
    } catch {
      /* ignore */
    }
    set({ phase: "gameover", best: nb, power: null, shield: false });
  },
  toggleMute: () => set((s) => ({ muted: !s.muted })),
  togglePause: () => set((s) => ({ paused: !s.paused })),
  setLab: (l) => set((s) => ({ lab: { ...s.lab, ...l } })),
}));

<<<<< END FILE: src/game/store.ts >>>>>

<<<<< BEGIN FILE: src/game/useInput.ts (3901 bytes) >>>>>
import { useEffect, useRef, type MutableRefObject } from "react";
import { clamp } from "../character/springs";

export interface InputState {
  axis: number;
  keys: Set<string>;
  pointers: Map<number, number>; // pointerId → -1|1
  tilt: number;
  tiltEnabled: boolean;
  /** pointer x in -1..1 across the game viewport (used for analog steering) */
  pointerX: number;
}

export function useInput(active: boolean): MutableRefObject<InputState> {
  const ref = useRef<InputState>({ axis: 0, keys: new Set(), pointers: new Map(), tilt: 0, tiltEnabled: false, pointerX: 0 });

  useEffect(() => {
    const s = ref.current;
    const compute = () => {
      let k = 0;
      if (s.keys.has("ArrowLeft") || s.keys.has("KeyA")) k -= 1;
      if (s.keys.has("ArrowRight") || s.keys.has("KeyD")) k += 1;
      let p = 0;
      s.pointers.forEach((v) => (p += v));
      p = clamp(p, -1, 1);
      s.axis = k !== 0 ? k : p !== 0 ? p : s.tiltEnabled ? clamp(s.tilt / 22, -1, 1) : 0;
    };
    const side = (e: PointerEvent) => {
      // steer relative to the game viewport (centered column on desktop)
      const el = document.getElementById("game-viewport");
      const rect = el?.getBoundingClientRect();
      const cx = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
      const half = rect ? rect.width / 2 : window.innerWidth / 2;
      s.pointerX = clamp((e.clientX - cx) / half, -1, 1);
      return e.clientX < cx ? -1 : 1;
    };
    const kd = (e: KeyboardEvent) => {
      if (["ArrowLeft", "ArrowRight", "KeyA", "KeyD"].includes(e.code)) {
        e.preventDefault();
        s.keys.add(e.code);
        compute();
      }
    };
    const ku = (e: KeyboardEvent) => {
      s.keys.delete(e.code);
      compute();
    };
    const pd = (e: PointerEvent) => {
      if (!active) return;
      const target = e.target as HTMLElement | null;
      if (target && target.closest("[data-ui]")) return;
      s.pointers.set(e.pointerId, side(e));
      compute();
    };
    const pm = (e: PointerEvent) => {
      if (!s.pointers.has(e.pointerId)) return;
      s.pointers.set(e.pointerId, side(e));
      compute();
    };
    const pu = (e: PointerEvent) => {
      s.pointers.delete(e.pointerId);
      compute();
    };
    const orient = (e: DeviceOrientationEvent) => {
      if (e.gamma == null) return;
      s.tiltEnabled = true;
      const angle = (screen.orientation?.angle ?? 0) as number;
      let g = e.gamma;
      if (angle === 90) g = -(e.beta ?? 0);
      else if (angle === -90 || angle === 270) g = e.beta ?? 0;
      s.tilt = g;
      compute();
    };
    const blur = () => {
      s.keys.clear();
      s.pointers.clear();
      compute();
    };
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);
    window.addEventListener("pointerdown", pd);
    window.addEventListener("pointermove", pm);
    window.addEventListener("pointerup", pu);
    window.addEventListener("pointercancel", pu);
    window.addEventListener("deviceorientation", orient);
    window.addEventListener("blur", blur);
    return () => {
      window.removeEventListener("keydown", kd);
      window.removeEventListener("keyup", ku);
      window.removeEventListener("pointerdown", pd);
      window.removeEventListener("pointermove", pm);
      window.removeEventListener("pointerup", pu);
      window.removeEventListener("pointercancel", pu);
      window.removeEventListener("deviceorientation", orient);
      window.removeEventListener("blur", blur);
    };
  }, [active]);

  return ref;
}

/** iOS needs an explicit permission request for motion sensors. */
export async function requestTilt() {
  const DOE = DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> };
  if (typeof DOE.requestPermission === "function") {
    try {
      await DOE.requestPermission();
    } catch {
      /* denied */
    }
  }
}

<<<<< END FILE: src/game/useInput.ts >>>>>

<<<<< BEGIN FILE: src/game/world.ts (8483 bytes) >>>>>
import { Spring, rand, clamp } from "../character/springs";
import { createDriver, type CatDriver } from "../character/Cat";

export const C = {
  halfW: 4.6,
  gravity: 34,
  jumpV: 15,
  pillowV: 27,
  springV: 21,
  iceV: 12.5,
  hurtV: 9,
  rocketV: 26,
  rocketTime: 2.0,
  balloonV: 5.5,
  balloonTime: 3.6,
  shieldTime: 14,
  magnetTime: 8,
  moveAccel: 75,
  maxVx: 8.5,
  drag: 7,
  catScale: 0.56,
  catHalfW: 0.46,
  platformH: 0.36,
  platformD: 1.1,
  fov: 42,
};

export type PlatformType = "ground" | "normal" | "moving" | "cloud" | "pillow" | "spring" | "ice" | "crumble";
export type ItemKind = "heart" | "fish" | "star" | "rocket" | "balloon" | "shield" | "magnet";
export type CompanionMood = "sit" | "sleep" | "wave" | "read";

export interface PlatformData {
  id: number;
  type: PlatformType;
  x: number;
  y: number;
  w: number;
  baseX: number;
  speed: number;
  phase: number;
  range: number;
  alive: boolean;
  fade: number; // cloud dissolve / crumble fall 0→1
  crumbleTimer: number; // >0 = shaking, counts down to break
  spiky: number; // 0 = none, -1/1 = side of the cactus
  companion: boolean;
  companionMood: CompanionMood;
  hugged: boolean;
  companionDriver: CatDriver | null;
  companionSide: number;
  cheerTimer: number;
  wobble: Spring;
  landedCount: number;
}

export interface ItemData {
  id: number;
  kind: ItemKind;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  phase: number;
  taken: boolean;
  takenT: number;
  magnetPull: number;
}

export interface EnemyData {
  id: number;
  x: number;
  y: number;
  baseX: number;
  range: number;
  speed: number;
  phase: number;
  alive: boolean;
  popT: number;
  angry: number; // 0..1 rises when player is near
}

export interface World {
  platforms: PlatformData[];
  items: ItemData[];
  enemies: EnemyData[];
  nextId: number;
  topY: number;
  lastCompanionY: number;
  lastPillowY: number;
  lastPowerY: number;
  lastEnemyY: number;
  version: number;
}

export const createWorld = (): World => ({ platforms: [], items: [], enemies: [], nextId: 1, topY: 0, lastCompanionY: -40, lastPillowY: -20, lastPowerY: -10, lastEnemyY: 0, version: 0 });

function makePlatform(w: World, type: PlatformType, x: number, y: number, width: number): PlatformData {
  return {
    id: w.nextId++,
    type,
    x,
    y,
    w: width,
    baseX: x,
    speed: type === "moving" ? rand(1.2, 2.4) * (Math.random() < 0.5 ? -1 : 1) : 0,
    phase: rand(0, Math.PI * 2),
    range: type === "moving" ? rand(1.2, C.halfW - width / 2 - 0.3) : 0,
    alive: true,
    fade: 0,
    crumbleTimer: 0,
    spiky: 0,
    companion: false,
    companionMood: "sit",
    hugged: false,
    companionDriver: null,
    companionSide: Math.random() < 0.5 ? -1 : 1,
    cheerTimer: 0,
    wobble: new Spring(1, 320, 12),
    landedCount: 0,
  };
}

function makeItem(w: World, kind: ItemKind, x: number, y: number): ItemData {
  return { id: w.nextId++, kind, x, y, baseX: x, baseY: y, phase: rand(0, 10), taken: false, takenT: 0, magnetPull: 0 };
}

function makeEnemy(w: World, x: number, y: number): EnemyData {
  const range = rand(1.4, 2.6);
  return { id: w.nextId++, x, y, baseX: clamp(x, -C.halfW + range + 0.4, C.halfW - range - 0.4), range, speed: rand(0.6, 1.3), phase: rand(0, Math.PI * 2), alive: true, popT: 0, angry: 0 };
}

export function initWorld(w: World) {
  w.platforms.length = 0;
  w.items.length = 0;
  w.enemies.length = 0;
  w.nextId = 1;
  w.topY = 0;
  w.lastCompanionY = -40;
  w.lastPillowY = -20;
  w.lastPowerY = -10;
  w.lastEnemyY = 0;
  const ground = makePlatform(w, "ground", 0, 0, C.halfW * 2 + 2);
  w.platforms.push(ground);
  let y = 1.6;
  for (let i = 0; i < 6; i++) {
    const p = makePlatform(w, "normal", rand(-3, 3), y, 2.1);
    w.platforms.push(p);
    if (i === 2) w.items.push(makeItem(w, "heart", p.x, y + 1.15));
    y += rand(1.2, 1.7);
  }
  w.topY = y;
  w.version++;
}

/** Generate platforms/items/enemies up to a given altitude, following a difficulty curve. */
export function spawnUpTo(w: World, limitY: number) {
  let added = false;
  while (w.topY < limitY) {
    const alt = w.topY;
    const diff = clamp(alt / 240, 0, 1);
    const gap = rand(0.9 + diff * 0.5, 1.6 + diff * 1.25);
    const y = w.topY + gap;
    const width = 2.1 - diff * 0.55;

    let type: PlatformType = "normal";
    const roll = Math.random();
    const pPillow = y - w.lastPillowY > 14 ? 0.07 : 0;
    const pSpring = alt > 10 ? 0.05 + diff * 0.04 : 0;
    const pMoving = 0.05 + diff * 0.28;
    const pCloud = alt > 20 ? 0.04 + diff * 0.2 : 0;
    const pIce = alt > 60 ? 0.03 + diff * 0.12 : 0;
    const pCrumble = alt > 35 ? 0.04 + diff * 0.14 : 0;
    let acc = 0;
    if (roll < (acc += pPillow)) {
      type = "pillow";
      w.lastPillowY = y;
    } else if (roll < (acc += pSpring)) type = "spring";
    else if (roll < (acc += pMoving)) type = "moving";
    else if (roll < (acc += pCloud)) type = "cloud";
    else if (roll < (acc += pIce)) type = "ice";
    else if (roll < (acc += pCrumble)) type = "crumble";

    const x = rand(-C.halfW + width / 2 + 0.2, C.halfW - width / 2 - 0.2);
    const p = makePlatform(w, type, x, y, width);

    // helper platform when the gap is scary
    if (gap > 2.4 && Math.random() < 0.55) {
      const hx = x > 0 ? rand(-C.halfW + 1.2, -0.5) : rand(0.5, C.halfW - 1.2);
      w.platforms.push(makePlatform(w, Math.random() < 0.5 ? "cloud" : "normal", hx, y - rand(0.4, 1.0), width * 0.85));
    }

    // cactus hazard on wide normal platforms
    if (type === "normal" && alt > 45 && Math.random() < 0.08 + diff * 0.1) {
      p.w = Math.max(p.w, 2.4);
      p.spiky = Math.random() < 0.5 ? -1 : 1;
    }

    // collectibles
    if ((type === "normal" || type === "moving" || type === "ice") && !p.spiky) {
      const r = Math.random();
      if (r < 0.15) w.items.push(makeItem(w, "heart", x, y + 1.15));
      else if (r < 0.2) w.items.push(makeItem(w, "fish", x + rand(-0.4, 0.4), y + 1.2));
      else if (r < 0.225 && alt > 30) w.items.push(makeItem(w, "star", x, y + 1.4));
    }
    // power-ups (spaced out)
    if (y - w.lastPowerY > rand(22, 40) && alt > 15) {
      const kinds: ItemKind[] = alt > 80 ? ["rocket", "balloon", "shield", "magnet"] : ["balloon", "shield", "magnet", "rocket"];
      const kind = kinds[Math.floor(Math.random() * kinds.length)];
      w.items.push(makeItem(w, kind, x, y + 1.3));
      w.lastPowerY = y;
    }
    // grumpy storm clouds
    if (alt > 55 && y - w.lastEnemyY > rand(16, 30) - diff * 8) {
      const ex = x > 0 ? rand(-C.halfW + 1.5, -1) : rand(1, C.halfW - 1.5);
      w.enemies.push(makeEnemy(w, ex, y + rand(2.2, 3.4)));
      w.lastEnemyY = y;
    }
    // companion cats waiting for a hug
    if (type === "normal" && !p.spiky && y - w.lastCompanionY > rand(38, 60) && alt > 12) {
      p.companion = true;
      p.w = Math.max(p.w, 2.3);
      const moods: CompanionMood[] = ["sit", "sleep", "wave", "read"];
      p.companionMood = moods[Math.floor(Math.random() * moods.length)];
      p.companionDriver = createDriver({ state: p.companionMood === "sleep" ? "sleep" : "sit", expression: p.companionMood === "sleep" ? "asleep" : "content", fidgets: false });
      if (p.companionMood === "sleep") p.companionDriver.emote = "zzz";
      w.lastCompanionY = y;
    }
    w.platforms.push(p);
    w.topY = y;
    added = true;
  }
  return added;
}

export function cullBelow(w: World, y: number) {
  let changed = false;
  for (let i = w.platforms.length - 1; i >= 0; i--) if (w.platforms[i].y < y) (w.platforms.splice(i, 1), (changed = true));
  for (let i = w.items.length - 1; i >= 0; i--) if (w.items[i].y < y || (w.items[i].taken && w.items[i].takenT > 1)) (w.items.splice(i, 1), (changed = true));
  for (let i = w.enemies.length - 1; i >= 0; i--) if (w.enemies[i].y < y || (!w.enemies[i].alive && w.enemies[i].popT > 1.2)) (w.enemies.splice(i, 1), (changed = true));
  return changed;
}

export const ITEM_INFO: Record<ItemKind, { label: string; color: string; points: number }> = {
  heart: { label: "♥ +50", color: "#FF8FAF", points: 50 },
  fish: { label: "YUM! +80", color: "#7FB8FF", points: 80 },
  star: { label: "★ +200", color: "#FFD35C", points: 200 },
  rocket: { label: "ROCKET!", color: "#FF6B7A", points: 100 },
  balloon: { label: "BALLOON~", color: "#FF8FAF", points: 60 },
  shield: { label: "SHIELD!", color: "#9FD8FF", points: 60 },
  magnet: { label: "MAGNET!", color: "#E9455D", points: 60 },
};

<<<<< END FILE: src/game/world.ts >>>>>

<<<<< BEGIN FILE: src/index.css (2471 bytes) >>>>>
@import "tailwindcss";

html, body, #root { height: 100%; margin: 0; overflow: hidden; background: #F4DDE5; }
body { font-family: "Baloo 2", "Nunito", ui-rounded, "SF Pro Rounded", system-ui, sans-serif; -webkit-tap-highlight-color: transparent; user-select: none; -webkit-user-select: none; overscroll-behavior: none; }

.sticker-text {
  text-shadow:
    -2px -2px 0 #3B3231, 2px -2px 0 #3B3231, -2px 2px 0 #3B3231, 2px 2px 0 #3B3231,
    0 3px 0 #3B3231, 0 -3px 0 #3B3231, 3px 0 0 #3B3231, -3px 0 0 #3B3231,
    0 6px 0 rgba(59,50,49,0.9), 0 12px 24px rgba(0,0,0,0.18);
}
.sticker-text-sm {
  text-shadow:
    -1.5px -1.5px 0 #3B3231, 1.5px -1.5px 0 #3B3231, -1.5px 1.5px 0 #3B3231, 1.5px 1.5px 0 #3B3231,
    0 2px 0 #3B3231, 0 -2px 0 #3B3231, 2px 0 0 #3B3231, -2px 0 0 #3B3231,
    0 4px 0 rgba(59,50,49,0.9);
}
.sticker-btn { border: 3px solid #3B3231; text-shadow: 0 2px 0 rgba(0,0,0,0.2); }
.chip { border: 2.5px solid #3B3231; box-shadow: 0 3px 0 rgba(59,50,49,0.9); }
.chip:active { transform: translateY(2px); box-shadow: 0 1px 0 rgba(59,50,49,0.9); }

@keyframes toastUp {
  0% { transform: translateY(14px) scale(0.6); opacity: 0; }
  20% { transform: translateY(0) scale(1.15); opacity: 1; }
  40% { transform: translateY(-4px) scale(1); }
  100% { transform: translateY(-46px) scale(0.95); opacity: 0; }
}
.toast { animation: toastUp 1.1s cubic-bezier(.2,.8,.3,1) forwards; }

@keyframes popIn {
  0% { transform: scale(0.6) translateY(10px); opacity: 0; }
  60% { transform: scale(1.06) translateY(-2px); opacity: 1; }
  100% { transform: scale(1) translateY(0); opacity: 1; }
}
.pop-in { animation: popIn 0.45s cubic-bezier(.2,.8,.3,1) both; }

@keyframes wiggle {
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
}
.wiggle { animation: wiggle 1.6s ease-in-out infinite; }

@keyframes floaty {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
.floaty { animation: floaty 2.6s ease-in-out infinite; }

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-4px); }
  40% { transform: translateX(4px); }
  60% { transform: translateX(-3px); }
  80% { transform: translateX(3px); }
}
.shake { animation: shake 0.4s ease-in-out; }

@keyframes flashRed {
  0% { opacity: 0.55; }
  100% { opacity: 0; }
}
.flash-hurt { animation: flashRed 0.45s ease-out forwards; }

.scrollbar-none::-webkit-scrollbar { display: none; }
.scrollbar-none { scrollbar-width: none; }

<<<<< END FILE: src/index.css >>>>>

<<<<< BEGIN FILE: src/main.tsx (230 bytes) >>>>>
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

<<<<< END FILE: src/main.tsx >>>>>

<<<<< BEGIN FILE: src/scenes/GameOverScene.tsx (4821 bytes) >>>>>
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { Cat, createDriver } from "../character/Cat";
import { PALETTES, otherCat } from "../character/palettes";
import { Part } from "../character/Part";
import { toon } from "../character/materials";
import { useGame } from "../game/store";
import { C } from "../game/world";
import { Backdrop } from "../world/Backdrop";
import { fx } from "../world/Particles";
import { CameraRig } from "./GameScene";
import { catSound } from "./MenuScene";

const STAGE = new RoundedBoxGeometry(6.4, 0.6, 2.6, 5, 0.28);
const STAGE_TOP = new RoundedBoxGeometry(5.6, 0.25, 1.8, 4, 0.1);
const BOX = new RoundedBoxGeometry(0.9, 0.42, 0.55, 4, 0.08);
const SLOT = new RoundedBoxGeometry(0.5, 0.04, 0.12, 2, 0.02);
const TISSUE = new THREE.PlaneGeometry(0.34, 0.42, 4, 6);
const TISSUE_MAT = toon("#FFFFFF", { side: THREE.DoubleSide });
const PAW = new THREE.CircleGeometry(0.05, 12);

function TissueBox({ position }: { position: [number, number, number] }) {
  const tissue = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (tissue.current) tissue.current.rotation.z = Math.sin(clock.elapsedTime * 2) * 0.08;
  });
  return (
    <group position={position}>
      <Part geometry={BOX} color="#F6B8CB" position={[0, 0.21, 0]} outlineWidth={0.05} />
      <mesh geometry={SLOT} material={toon("#3B3231")} position={[0, 0.43, 0]} />
      <mesh ref={tissue} geometry={TISSUE} material={TISSUE_MAT} position={[0.02, 0.62, 0]} rotation={[0, 0, 0.1]} />
      {[
        [-0.28, 0.2],
        [0.28, 0.2],
      ].map(([x, y], i) => (
        <group key={i} position={[x, y, 0.28]}>
          <mesh geometry={PAW} material={toon("#E58AA8")} scale={[1.3, 1.1, 1]} />
          {[-0.06, -0.02, 0.02, 0.06].map((dx, j) => (
            <mesh key={j} geometry={PAW} material={toon("#E58AA8")} position={[dx * 1.1, 0.08 - Math.abs(dx) * 0.4, 0]} scale={0.45} />
          ))}
        </group>
      ))}
    </group>
  );
}

export function GameOverScene() {
  const character = useGame((s) => s.character);
  const pal = PALETTES[character];
  const comp = PALETTES[otherCat(character)];
  const camY = useRef(0.25);
  const camX = useRef(0);
  const me = useRef(createDriver({ state: "sitSad", expression: "sob", fidgets: false }));
  const buddy = useRef(createDriver({ state: "run", expression: "worried", fidgets: false }));
  const buddyG = useRef<THREE.Group | null>(null);
  const mem = useMemo(() => ({ t: 0, hugged: false, heartTimer: 0, phase: 0 }), []);

  useFrame((_, dt) => {
    mem.t += dt;
    const t = mem.t;
    const b = buddy.current;
    const m = me.current;
    // buddy runs in from the side, then hugs from behind
    if (buddyG.current) {
      const targetX = t < 1.4 ? THREE.MathUtils.lerp(3.8, 0.55, Math.min(1, t / 1.4)) : 0.55;
      buddyG.current.position.x = targetX;
      b.vx = t < 1.4 ? -2.6 : 0;
      b.look = t < 1.4 ? -1 : -0.4;
    }
    if (t < 1.4) b.state = "run";
    else if (!mem.hugged) {
      mem.hugged = true;
      b.state = "hug";
      b.expression = "love";
      b.events.push("hugged");
      m.events.push("hugged");
      fx.burst("hearts", 0.2, 1.8, 0.8, 10);
    }
    if (t > 1.6) {
      // the sad cat slowly cheers up: sob → sad → shy → love → content, with a comforting pat
      if (t < 3.2) {
        m.state = "sitSad";
        m.expression = "sad";
      } else if (t < 5.2) {
        m.state = "sit";
        m.expression = "shy";
      } else if (t < 7.5) {
        m.state = "sit";
        m.expression = "love";
      } else {
        m.state = "sit";
        m.expression = null;
      }
      m.look = 0.5;
      m.lookY = 0.2;
      if (t > 4.5) {
        b.state = t % 6 < 3 ? "hug" : "wave";
        b.expression = t % 6 < 3 ? "love" : "happy";
      }
    }
    mem.heartTimer -= dt;
    if (mem.hugged && mem.heartTimer <= 0) {
      mem.heartTimer = 1.6;
      fx.burst("hearts", 0.3, 2.0, 0.6, 3);
    }
  });

  return (
    <>
      <CameraRig camY={camY} camX={camX} lookDown={1.3} zoom={2.3} />
      <group position={[0, -0.02, 0]}>
        <Part geometry={STAGE} color="#C9E9C0" position={[0, -0.3, 0]} outlineWidth={0.07} />
        <Part geometry={STAGE_TOP} color="#EAF8E4" position={[0, 0.05, 0]} outlineWidth={0} />
      </group>
      <Cat palette={pal} driver={me} position={[-0.3, 0, 0.5]} scale={C.catScale * 1.15} interactive onEvent={catSound} />
      <TissueBox position={[-0.3, 0.02, 1.25]} />
      <group ref={buddyG} position={[3.8, 0, -0.35]}>
        <Cat palette={comp} driver={buddy} scale={C.catScale * 1.1} />
      </group>
      <Backdrop camYRef={camY} count={8} spread={8} />
    </>
  );
}

<<<<< END FILE: src/scenes/GameOverScene.tsx >>>>>

<<<<< BEGIN FILE: src/scenes/GameScene.tsx (21329 bytes) >>>>>
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { Cat, createDriver, type Accessory } from "../character/Cat";
import { PALETTES, otherCat } from "../character/palettes";
import { clamp, damp, rand } from "../character/springs";
import { bubble, flat } from "../character/materials";
import { useGame } from "../game/store";
import { C, createWorld, cullBelow, initWorld, spawnUpTo, ITEM_INFO, type PlatformData } from "../game/world";
import type { InputState } from "../game/useInput";
import { sfx } from "../game/sfx";
import { Platform } from "../world/Platform";
import { Backdrop } from "../world/Backdrop";
import { Grump, Item } from "../world/Items";
import { celebrate, fx } from "../world/Particles";

const topOffset = (p: PlatformData) => (p.type === "pillow" ? 0.2 : p.type === "cloud" ? 0.28 : p.type === "ground" ? 0.2 : p.type === "spring" ? 0.15 : 0.02);
const SHIELD_GEO = new THREE.SphereGeometry(1.05, 32, 20);

export function CameraRig({ camY, camX, lookDown = 0, zoom = 1 }: { camY: MutableRefObject<number>; camX: MutableRefObject<number>; lookDown?: number; zoom?: number }) {
  const { camera, size } = useThree();
  useFrame(() => {
    const cam = camera as THREE.PerspectiveCamera;
    const aspect = size.width / size.height;
    const halfTan = Math.tan(THREE.MathUtils.degToRad(C.fov / 2));
    const dist = clamp((C.halfW * 1.08) / (halfTan * aspect), 8, 40) / zoom;
    cam.position.set(camX.current * 0.1, camY.current + lookDown, dist);
    cam.lookAt(camX.current * 0.1, camY.current, 0);
  });
  return null;
}

interface CompanionMem {
  woke: boolean;
  wakeT: number;
}

export function GameScene({ input }: { input: MutableRefObject<InputState> }) {
  const character = useGame((s) => s.character);
  const runId = useGame((s) => s.runId);
  const palette = PALETTES[character];
  const companionId = otherCat(character);

  const driver = useRef(createDriver({ state: "idle", fidgets: false }));
  const world = useMemo(() => createWorld(), []);
  const [, setVersion] = useState(0);
  const camY = useRef(4);
  const camX = useRef(0);
  const catRef = useRef<THREE.Group | null>(null);
  const shadowRef = useRef<THREE.Mesh>(null);
  const shieldRef = useRef<THREE.Mesh>(null);
  const shadowMat = useMemo(() => flat("#3B3231", { opacity: 0.16, depthWrite: false }), []);
  const shieldMat = useMemo(() => bubble("#9FD8FF", 0.3), []);
  const compMem = useMemo(() => new Map<number, CompanionMem>(), []);

  const P = useMemo(
    () => ({
      x: 0,
      y: 0.2,
      vx: 0,
      vy: 0,
      maxY: 0,
      hearts: 0,
      hugs: 0,
      stars: 0,
      fish: 0,
      bonus: 0,
      combo: 0,
      bestCombo: 0,
      landTimer: 0,
      superTimer: 0,
      springTimer: 0,
      slipTimer: 0,
      stunTimer: 0,
      hurtTimer: 0,
      fishTimer: 0,
      power: null as null | "rocket" | "balloon" | "magnet",
      powerT: 0,
      powerTotal: 1,
      shield: false,
      shieldT: 0,
      dead: false,
      deadTimer: 0,
      lastScore: -1,
      nextMilestone: 100,
      recordShown: false,
      wrapCd: 0,
      nearMissCd: 0,
      shieldWarned: false,
      t: 0,
    }),
    [],
  );

  // (re)initialise on new run
  useEffect(() => {
    initWorld(world);
    spawnUpTo(world, 30);
    compMem.clear();
    Object.assign(P, {
      x: 0, y: 0.2, vx: 0, vy: C.jumpV, maxY: 0, hearts: 0, hugs: 0, stars: 0, fish: 0, bonus: 0, combo: 0, bestCombo: 0,
      landTimer: 0, superTimer: 0, springTimer: 0, slipTimer: 0, stunTimer: 0, hurtTimer: 0, fishTimer: 0,
      power: null, powerT: 0, powerTotal: 1, shield: false, shieldT: 0, dead: false, deadTimer: 0, lastScore: -1,
      nextMilestone: 100, recordShown: false, wrapCd: 0, nearMissCd: 0, shieldWarned: false, t: 0,
    });
    camY.current = 5;
    driver.current = createDriver({ state: "rise", fidgets: false });
    driver.current.events.push("jump");
    setVersion((v) => v + 1);
  }, [runId, world, P, compMem]);

  useFrame(({ size }, rawDt) => {
    const dt = Math.min(rawDt, 1 / 30);
    const d = driver.current;
    const store = useGame.getState();
    if (store.phase !== "playing" || store.paused) return;
    P.t += dt;

    const controllable = !P.dead && P.stunTimer <= 0;
    const rocket = P.power === "rocket";
    const balloon = P.power === "balloon";

    /* ---------- horizontal control ---------- */
    const axis = controllable ? input.current.axis : 0;
    const accel = balloon ? C.moveAccel * 0.6 : C.moveAccel;
    if (axis !== 0) P.vx += axis * accel * dt;
    else P.vx *= Math.exp(-(P.slipTimer > 0 ? 1.2 : C.drag) * dt);
    P.vx = clamp(P.vx, -C.maxVx, C.maxVx);
    P.x += P.vx * dt;
    P.wrapCd -= dt;
    if (P.x > C.halfW + 0.6 || P.x < -C.halfW - 0.6) {
      P.x = P.x > 0 ? -C.halfW - 0.6 : C.halfW + 0.6;
      if (P.wrapCd <= 0) {
        P.wrapCd = 0.5;
        d.events.push("wrap");
        sfx.wrap();
      }
    }

    /* ---------- vertical physics ---------- */
    const prevY = P.y;
    if (rocket) {
      P.vy = damp(P.vy, C.rocketV, 6, dt);
      if (Math.random() < 0.9) fx.burst("flame", P.x + rand(-0.08, 0.08), P.y + 0.25, -0.35, 1, 0.6);
      if (Math.random() < 0.15) fx.burst("sparkle", P.x, P.y + 0.2, -0.3, 1, 0.5);
    } else if (balloon) {
      P.vy = damp(P.vy, C.balloonV + Math.sin(P.t * 2) * 0.6, 3, dt);
    } else {
      P.vy -= C.gravity * dt;
    }
    P.y += P.vy * dt;

    let landed: PlatformData | null = null;
    if (P.vy < 0 && !P.dead && !rocket) {
      for (const p of world.platforms) {
        if (!p.alive) continue;
        const top = p.y + topOffset(p);
        const dx = Math.abs(P.x - p.x);
        if (prevY >= top - 0.02 && P.y <= top) {
          if (dx < p.w / 2 + C.catHalfW * 0.8) {
            landed = p;
            P.y = top;
            break;
          } else if (P.vy < -6 && dx < p.w / 2 + 1.1 && P.nearMissCd <= 0) {
            P.nearMissCd = 1.5;
            d.events.push("nearMiss");
          }
        }
      }
    }
    P.nearMissCd -= dt;

    if (landed) {
      const p = landed;
      p.landedCount++;
      const center = Math.abs(P.x - p.x);
      const onCactus = p.spiky !== 0 && (P.x - p.x) * p.spiky > p.w / 2 - 0.95;
      if (onCactus) {
        if (P.shield) {
          P.shield = false;
          d.events.push("shieldPop");
          fx.burst("bubbles", P.x, P.y + 0.6, 0.4, 14);
          sfx.pop();
          P.vy = C.jumpV;
          store.pushToast("SHIELD BROKE!", "#9FD8FF");
        } else {
          P.vy = C.hurtV;
          P.hurtTimer = 0.7;
          P.combo = 0;
          d.events.push("hurt");
          fx.burst("stars", P.x, P.y + 0.8, 0.4, 4);
          sfx.hurt();
          store.flashHurt();
          store.pushToast("OUCH!", "#E9455D");
        }
        p.wobble.impulse(-4);
      } else if (p.type === "pillow") {
        P.vy = C.pillowV;
        P.superTimer = 0.7;
        p.wobble.impulse(-9);
        d.events.push("superJump");
        fx.burst("stars", P.x, P.y + 0.3, 0.4);
        sfx.pillow();
        store.pushToast("BOING!", "#7FB8FF");
      } else if (p.type === "spring") {
        P.vy = C.springV;
        P.springTimer = 0.62;
        p.wobble.impulse(-12);
        d.events.push("spring");
        fx.burst("sparkle", P.x, P.y + 0.3, 0.4, 8);
        sfx.spring();
        store.pushToast("FLIP!", "#F28CA0");
      } else if (p.type === "ice") {
        P.vy = C.iceV;
        P.slipTimer = 0.45;
        P.vx += (Math.random() < 0.5 ? -1 : 1) * rand(3, 5);
        P.combo = 0;
        p.wobble.impulse(-2);
        d.events.push("slip");
        fx.burst("shards", P.x, P.y + 0.1, 0.4, 8);
        sfx.ice();
        store.pushToast("SLIPPERY!", "#7FD0F0");
      } else {
        P.vy = C.jumpV;
        P.landTimer = 0.09;
        p.wobble.impulse(p.type === "cloud" ? -2 : -4);
        d.events.push("land", "jump");
        fx.burst("dust", P.x, P.y + 0.05, 0.5, 4);
        if (p.type === "cloud") {
          p.alive = false;
          fx.burst("puff", p.x, p.y, 0.3);
          sfx.cloud();
        } else if (p.type === "crumble") {
          if (p.crumbleTimer <= 0) p.crumbleTimer = 0.5;
          fx.burst("smoke", P.x, P.y, 0.3, 4);
          sfx.crack();
        } else sfx.jump();
        // perfect landing combo
        if (p.type !== "ground" && center < p.w * 0.17) {
          P.combo++;
          P.bestCombo = Math.max(P.bestCombo, P.combo);
          if (P.combo >= 2) {
            P.bonus += P.combo * 10;
            d.events.push("perfect");
            sfx.perfect(P.combo);
            store.pushToast(`PERFECT x${P.combo}`, "#FFD35C");
            fx.burst("sparkle", P.x, P.y + 0.2, 0.4, Math.min(12, 3 + P.combo));
          }
        } else if (p.type !== "ground") P.combo = 0;
      }
      // companion hug
      if (p.companion && !p.hugged && p.companionDriver) {
        p.hugged = true;
        P.hugs++;
        p.companionDriver.state = "hug";
        p.companionDriver.expression = "love";
        p.companionDriver.emote = null;
        p.companionDriver.accessory = "none";
        p.companionDriver.events.push("hugged");
        p.cheerTimer = 2.5;
        d.events.push("hugged");
        fx.burst("hearts", P.x, P.y + 1.2, 0.6, 12);
        celebrate(p.x, p.y + 1.5, 0.4);
        sfx.hug();
        store.pushToast("HUG! +300", "#FF6F91");
      }
    }

    /* ---------- crumble timers ---------- */
    for (const p of world.platforms) {
      if (p.type === "crumble" && p.crumbleTimer > 0) {
        p.crumbleTimer -= dt;
        if (p.crumbleTimer <= 0) {
          p.alive = false;
          fx.burst("smoke", p.x, p.y, 0.3, 8);
          sfx.crumble();
        }
      }
    }

    /* ---------- items ---------- */
    const catCy = P.y + 0.6;
    for (const it of world.items) {
      if (it.taken) continue;
      const collectible = it.kind === "heart" || it.kind === "fish" || it.kind === "star";
      if (P.power === "magnet" && collectible) {
        const ddx = P.x - it.x;
        const ddy = catCy - it.y;
        const dist = Math.hypot(ddx, ddy);
        if (dist < 4.5) {
          const k = Math.min(1, dt * (14 / Math.max(0.6, dist)));
          it.x += ddx * k;
          it.y += ddy * k;
        }
      }
      if (Math.abs(P.x - it.x) < 0.8 && Math.abs(catCy - it.y) < 0.9) {
        it.taken = true;
        it.takenT = 0;
        const info = ITEM_INFO[it.kind];
        switch (it.kind) {
          case "heart":
            P.hearts++;
            d.events.push("collect");
            fx.burst("hearts", it.x, it.y, 0.4, 7);
            fx.burst("sparkle", it.x, it.y, 0.4, 6);
            sfx.heart();
            break;
          case "fish":
            P.fish++;
            P.fishTimer = 1.0;
            d.events.push("yum");
            fx.burst("hearts", it.x, it.y, 0.4, 4);
            sfx.fish();
            break;
          case "star":
            P.stars++;
            d.events.push("star");
            celebrate(it.x, it.y, 0.4);
            sfx.star();
            break;
          case "rocket":
            P.power = "rocket";
            P.powerT = P.powerTotal = C.rocketTime;
            P.vy = Math.max(P.vy, 8);
            d.events.push("rocketOn");
            fx.burst("flame", P.x, P.y, 0.2, 10, 1.5);
            sfx.rocket();
            break;
          case "balloon":
            P.power = "balloon";
            P.powerT = P.powerTotal = C.balloonTime;
            P.vy = Math.max(P.vy, 4);
            d.events.push("balloonOn");
            fx.burst("hearts", P.x, P.y + 1, 0.4, 5);
            sfx.balloon();
            break;
          case "shield":
            P.shield = true;
            P.shieldT = C.shieldTime;
            P.shieldWarned = false;
            d.events.push("shieldOn");
            fx.burst("bubbles", P.x, P.y + 0.6, 0.4, 12);
            sfx.shield();
            break;
          case "magnet":
            P.power = "magnet";
            P.powerT = P.powerTotal = C.magnetTime;
            d.events.push("magnet");
            fx.burst("zap", P.x, P.y + 0.6, 0.4, 8);
            sfx.magnet();
            break;
        }
        P.bonus += info.points;
        store.pushToast(info.label, info.color);
      }
    }

    /* ---------- power timers ---------- */
    if (P.power) {
      P.powerT -= dt;
      if (P.powerT <= 0) {
        if (P.power === "balloon") {
          d.events.push("balloonPop");
          fx.burst("confetti", P.x + 0.4, P.y + 2.2, 0.4, 8);
          sfx.pop();
        } else if (P.power === "rocket") {
          P.vy = Math.min(P.vy, C.jumpV * 0.9);
          fx.burst("smoke", P.x, P.y, 0.2, 6);
        }
        P.power = null;
      }
    }
    store.setPower(P.power, P.power ? P.powerT / P.powerTotal : 0);
    if (P.shield) {
      P.shieldT -= dt;
      if (P.shieldT < 2.5 && !P.shieldWarned) {
        P.shieldWarned = true;
        sfx.tick();
      }
      if (P.shieldT <= 0) {
        P.shield = false;
        fx.burst("bubbles", P.x, P.y + 0.6, 0.4, 8);
        sfx.pop();
      }
    }
    store.setShield(P.shield);
    P.fishTimer -= dt;

    /* ---------- enemies ---------- */
    for (const e of world.enemies) {
      if (!e.alive) continue;
      const ddx = P.x - e.x;
      const ddy = catCy - e.y;
      const dist = Math.hypot(ddx, ddy);
      e.angry = damp(e.angry, dist < 3.2 ? 1 : 0, 4, dt);
      if (Math.abs(ddx) < 0.95 && Math.abs(ddy) < 0.8) {
        if (rocket || P.shield) {
          e.alive = false;
          e.popT = 0;
          fx.burst("zap", e.x, e.y, 0.4, 10);
          fx.burst("smoke", e.x, e.y, 0.4, 8);
          sfx.pop();
          P.bonus += 150;
          if (!rocket) {
            P.shield = false;
            d.events.push("shieldPop");
            fx.burst("bubbles", P.x, P.y + 0.6, 0.4, 12);
            store.pushToast("POOF! +150", "#9FD8FF");
          } else store.pushToast("ZAP! +150", "#FFE45C");
        } else if (P.stunTimer <= 0) {
          P.stunTimer = 0.95;
          P.combo = 0;
          P.vy = Math.min(P.vy, -2);
          P.vx = (ddx >= 0 ? 1 : -1) * 6;
          d.events.push("stun");
          fx.burst("stars", P.x, P.y + 1.2, 0.5, 5);
          sfx.stun();
          sfx.grumble();
          store.flashHurt();
          store.pushToast("BONK!", "#8E8AA6");
        }
      }
    }

    /* ---------- companions ---------- */
    for (const p of world.platforms) {
      if (!p.companion || !p.companionDriver) continue;
      const cd = p.companionDriver;
      const dy = p.y - P.y;
      const near = dy > -1 && dy < 9;
      let mem = compMem.get(p.id);
      if (!mem) {
        mem = { woke: false, wakeT: 0 };
        compMem.set(p.id, mem);
      }
      cd.look = clamp((P.x - p.x) * 0.5, -1, 1);
      cd.lookY = clamp(-dy * 0.15, -1, 1);
      if (p.hugged) {
        p.cheerTimer -= dt;
        if (p.cheerTimer > 0) cd.state = p.cheerTimer > 1.6 ? "hug" : "celebrate";
        else {
          cd.state = "sit";
          cd.expression = "love";
        }
        continue;
      }
      if (p.companionMood === "sleep") {
        if (near && !mem.woke) {
          mem.woke = true;
          mem.wakeT = 1.1;
          cd.events.push("wakeUp");
          cd.emote = null;
          cd.state = "sit";
          cd.expression = "confused";
        }
        if (mem.woke) {
          mem.wakeT -= dt;
          if (mem.wakeT <= 0) {
            cd.state = near ? "wave" : "sit";
            cd.expression = near ? null : "content";
          }
        }
      } else if (p.companionMood === "read") {
        if (near && dy < 5) {
          cd.state = "wave";
          cd.expression = null;
        } else {
          cd.state = "sit";
          cd.expression = near ? "surprised" : "focus";
          cd.lookY = near ? cd.lookY : -0.8;
        }
      } else if (p.companionMood === "wave") {
        cd.state = near ? "wave" : "sit";
        cd.expression = near ? "excited" : "content";
      } else {
        cd.state = near ? "wave" : "sit";
        cd.expression = near ? null : "content";
      }
    }

    /* ---------- state machine for the rig ---------- */
    P.landTimer -= dt;
    P.superTimer -= dt;
    P.springTimer -= dt;
    P.slipTimer -= dt;
    P.stunTimer -= dt;
    P.hurtTimer -= dt;
    if (P.dead) d.state = "plummet";
    else if (P.stunTimer > 0) d.state = "stunned";
    else if (P.hurtTimer > 0) d.state = "hurt";
    else if (rocket) d.state = "rocket";
    else if (balloon) d.state = "float";
    else if (P.slipTimer > 0) d.state = "slip";
    else if (P.springTimer > 0) d.state = "spin";
    else if (P.landTimer > 0) d.state = "land";
    else if (P.superTimer > 0) d.state = "superJump";
    else if (P.vy > 5) d.state = "rise";
    else if (P.vy > -2.5) d.state = "apex";
    else if (P.vy > -16) d.state = "fall";
    else d.state = "plummet";
    d.expression = P.dead ? "terrified" : P.combo >= 6 && d.state === "rise" ? "smug" : P.combo >= 3 && d.state === "rise" ? "determined" : null;
    d.vx = P.vx;
    d.vy = P.vy;
    d.look = clamp(P.vx / 5, -1, 1);
    d.lookY = clamp(P.vy / 22, -1, 1) * 0.6;
    let acc: Accessory = "none";
    if (rocket) acc = "rocket";
    else if (balloon) acc = "balloon";
    else if (P.fishTimer > 0) acc = "fish";
    d.accessory = acc;

    if (catRef.current) catRef.current.position.set(P.x, P.y, 0);

    /* ---------- shield bubble ---------- */
    if (shieldRef.current) {
      shieldRef.current.visible = P.shield;
      if (P.shield) {
        const blink = P.shieldT < 2.5 ? (Math.sin(P.t * 18) > 0 ? 1 : 0.35) : 1;
        shieldRef.current.position.set(P.x, P.y + 0.72, 0);
        shieldRef.current.scale.setScalar((1 + Math.sin(P.t * 3) * 0.03) * blink);
        shieldRef.current.rotation.y = P.t * 0.5;
      }
    }

    /* ---------- contact shadow ---------- */
    if (shadowRef.current) {
      let bestTop = -Infinity;
      for (const p of world.platforms) {
        if (!p.alive) continue;
        const top = p.y + topOffset(p);
        if (top <= P.y + 0.05 && top > bestTop && Math.abs(P.x - p.x) < p.w / 2 + 0.25) bestTop = top;
      }
      const dist = P.y - bestTop;
      if (bestTop > -Infinity && dist < 7) {
        const k = 1 - dist / 7;
        shadowRef.current.visible = true;
        shadowRef.current.position.set(P.x, bestTop + 0.03, 0.15);
        shadowRef.current.scale.set(0.35 + 0.65 * k, 0.6 * (0.35 + 0.65 * k), 1);
        shadowMat.opacity = 0.05 + 0.2 * k * k;
      } else shadowRef.current.visible = false;
    }

    /* ---------- camera ---------- */
    const aspect = size.width / size.height;
    const halfTan = Math.tan(THREE.MathUtils.degToRad(C.fov / 2));
    const dist = clamp((C.halfW * 1.08) / (halfTan * aspect), 8, 40);
    const H = dist * halfTan;
    const wanted = Math.max(camY.current, P.y + H * (rocket ? 0.15 : 0.3));
    camY.current = damp(camY.current, wanted, rocket ? 12 : 7, dt);
    camX.current = damp(camX.current, P.x, 3, dt);

    /* ---------- world streaming ---------- */
    let changed = false;
    if (spawnUpTo(world, camY.current + H + 6)) changed = true;
    if (cullBelow(world, camY.current - H - 6)) changed = true;
    if (changed) setVersion((v) => v + 1);

    /* ---------- scoring ---------- */
    P.maxY = Math.max(P.maxY, P.y);
    if (P.maxY >= P.nextMilestone) {
      store.pushToast(`${P.nextMilestone}m!`, "#FFFFFF");
      P.nextMilestone += 100;
      d.events.push("milestone");
      celebrate(P.x, P.y + 1.4, 0.4);
      sfx.milestone();
    }
    const score = Math.floor(P.maxY * 10) + P.hearts * 50 + P.hugs * 300 + P.bonus;
    if (score !== P.lastScore) {
      P.lastScore = score;
      store.updateRun({ score, altitude: Math.floor(P.maxY), hearts: P.hearts, hugs: P.hugs, combo: P.combo, bestCombo: P.bestCombo, stars: P.stars, fish: P.fish });
      const tier = P.maxY < 45 ? 0 : P.maxY < 110 ? 1 : P.maxY < 190 ? 2 : P.maxY < 300 ? 3 : 4;
      store.setSkyTier(tier);
      const best = store.best[character];
      if (!P.recordShown && best > 0 && score > best) {
        P.recordShown = true;
        d.events.push("record");
        store.pushToast("NEW BEST!", "#FFD35C");
        celebrate(P.x, P.y + 1.4, 0.4);
        sfx.milestone();
      }
    }

    /* ---------- death ---------- */
    if (!P.dead && P.y < camY.current - H - 1.2) {
      P.dead = true;
      P.deadTimer = 0.9;
      sfx.fall();
    }
    if (P.dead) {
      P.deadTimer -= dt;
      if (P.deadTimer <= 0) {
        store.endRun();
        sfx.sad();
      }
    }
  });

  return (
    <>
      <CameraRig camY={camY} camX={camX} />
      <Backdrop camYRef={camY} />
      {world.platforms.map((p) => (
        <Platform key={p.id} p={p} companionId={companionId} />
      ))}
      {world.items.map((it) => (
        <Item key={it.id} it={it} />
      ))}
      {world.enemies.map((e) => (
        <Grump key={e.id} e={e} />
      ))}
      <mesh ref={shadowRef} rotation={[-Math.PI / 2, 0, 0]} material={shadowMat}>
        <circleGeometry args={[0.6, 28]} />
      </mesh>
      <mesh ref={shieldRef} geometry={SHIELD_GEO} material={shieldMat} visible={false} />
      <Cat palette={palette} driver={driver} groupRef={catRef} scale={C.catScale} position={[0, 0.2, 0]} />
    </>
  );
}

<<<<< END FILE: src/scenes/GameScene.tsx >>>>>

<<<<< BEGIN FILE: src/scenes/LabScene.tsx (3505 bytes) >>>>>
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { Cat, createDriver } from "../character/Cat";
import { PALETTES } from "../character/palettes";
import { Part } from "../character/Part";
import { EXPRESSION_NAMES } from "../character/expressions";
import { POSE_NAMES } from "../character/poses";
import { useGame } from "../game/store";
import { C } from "../game/world";
import { Backdrop } from "../world/Backdrop";
import { fx } from "../world/Particles";
import { CameraRig } from "./GameScene";
import { catSound } from "./MenuScene";
import { damp } from "../character/springs";

const STAGE = new RoundedBoxGeometry(5.2, 0.6, 2.6, 5, 0.28);
const STAGE_TOP = new RoundedBoxGeometry(4.4, 0.25, 1.8, 4, 0.1);

/** Global hook so the overlay can fire events at the lab cat. */
export const labBus: { fire: (e: string) => void } = { fire: () => {} };

export function LabScene() {
  const character = useGame((s) => s.character);
  const pal = PALETTES[character];
  const camY = useRef(0.55);
  const camX = useRef(0);
  const driver = useRef(createDriver({ state: "idle" }));
  const g = useRef<THREE.Group | null>(null);
  const { pointer } = useThree();
  const mem = useMemo(() => ({ t: 0, tourT: 0, tourIdx: 0, vxDemo: 0, vyDemo: 0 }), []);

  useMemo(() => {
    labBus.fire = (e) => {
      driver.current.events.push(e as never);
      if (g.current) fx.burst("sparkle", g.current.position.x, 1.9, 0.6, 4);
    };
  }, []);

  useFrame((_, dt) => {
    mem.t += dt;
    const d = driver.current;
    const lab = useGame.getState().lab;
    const setLab = useGame.getState().setLab;
    if (lab.autoTour) {
      mem.tourT -= dt;
      if (mem.tourT <= 0) {
        mem.tourT = 2.4;
        mem.tourIdx++;
        const total = EXPRESSION_NAMES.length + POSE_NAMES.length;
        const i = mem.tourIdx % total;
        if (i < EXPRESSION_NAMES.length) setLab({ expression: EXPRESSION_NAMES[i], pose: "idle" });
        else setLab({ expression: null, pose: POSE_NAMES[i - EXPRESSION_NAMES.length] });
      }
    }
    d.state = lab.pose;
    d.expression = lab.expression;
    d.accessory = lab.accessory;
    d.emote = lab.emote;
    // simulated velocity so velocity-driven layers can be previewed
    mem.vxDemo = damp(mem.vxDemo, lab.vx, 4, dt);
    mem.vyDemo = damp(mem.vyDemo, lab.vy, 4, dt);
    d.vx = mem.vxDemo;
    d.vy = mem.vyDemo;
    d.look = THREE.MathUtils.clamp(pointer.x * 1.3, -1, 1);
    d.lookY = THREE.MathUtils.clamp(pointer.y, -1, 1);
    // when idle without overrides the fidget system shows off on its own
    if (g.current) {
      g.current.rotation.y = Math.sin(mem.t * 0.35) * 0.18;
      g.current.position.y = lab.pose === "float" || lab.pose === "rocket" || lab.pose === "glide" ? 0.6 + Math.sin(mem.t * 1.5) * 0.1 : 0;
    }
  });

  return (
    <>
      <CameraRig camY={camY} camX={camX} lookDown={1.25} zoom={2.05} />
      <group position={[0, -0.02, 0]}>
        <Part geometry={STAGE} color="#FBD9E4" position={[0, -0.3, 0]} outlineWidth={0.07} />
        <Part geometry={STAGE_TOP} color="#FFF0F5" position={[0, 0.05, 0]} outlineWidth={0} />
      </group>
      <group ref={g}>
        <Cat palette={pal} driver={driver} scale={C.catScale * 1.35} interactive onEvent={catSound} />
      </group>
      <Backdrop camYRef={camY} count={7} spread={8} />
    </>
  );
}

<<<<< END FILE: src/scenes/LabScene.tsx >>>>>

<<<<< BEGIN FILE: src/scenes/MenuScene.tsx (4572 bytes) >>>>>
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Cat, createDriver, type CatEvent } from "../character/Cat";
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
  const mem = useMemo(() => ({ x: index === 0 ? -1.3 : 1.3, hover: false, t: 0, greetT: 0 }), [index]);

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
      // cats look toward the pointer (2D)
      const px = pointer.x * 1.4 - g.current.position.x * 0.3;
      d.look = THREE.MathUtils.clamp(px, -1, 1);
      d.lookY = THREE.MathUtils.clamp(pointer.y * 0.9, -1, 1);
    }
    d.vx = 0;
    d.vy = 0;
    mem.greetT -= dt;
    // the rig's own fidget system handles idle life; we only steer hover + selection
    d.state = mem.greetT > 0 ? "celebrate" : mem.hover ? "wave" : "idle";
    d.expression = mem.greetT > 0 ? null : mem.hover ? "excited" : isSel ? null : "content";
  });

  return (
    <group ref={g} position={[mem.x, 0, 0]} scale={C.catScale}>
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

<<<<< END FILE: src/scenes/MenuScene.tsx >>>>>

<<<<< BEGIN FILE: src/three-jsx.d.ts (164 bytes) >>>>>
import type { ThreeElements } from "@react-three/fiber";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

<<<<< END FILE: src/three-jsx.d.ts >>>>>

<<<<< BEGIN FILE: src/ui/Overlays.tsx (19065 bytes) >>>>>
import { useEffect, useState } from "react";
import { useGame } from "../game/store";
import { PALETTES, type CatId } from "../character/palettes";
import { sfx } from "../game/sfx";
import { requestTilt } from "../game/useInput";
import { EXPRESSION_NAMES } from "../character/expressions";
import { POSE_NAMES } from "../character/poses";
import { ALL_ACCESSORIES, ALL_EMOTES, ALL_EVENTS } from "../character/Cat";
import { labBus } from "../scenes/LabScene";

/* ------------------------------------------------------------------ */
const Btn = ({ children, onClick, color = "#FF8FAF", className = "", small = false }: { children: React.ReactNode; onClick: () => void; color?: string; className?: string; small?: boolean }) => (
  <button
    data-ui
    onClick={(e) => {
      e.stopPropagation();
      sfx.unlock();
      sfx.click();
      onClick();
    }}
    className={`sticker-btn select-none rounded-full font-black tracking-wide text-white transition-transform hover:scale-105 active:scale-95 ${small ? "px-4 py-2 text-sm" : "px-9 py-4 text-xl"} ${className}`}
    style={{ background: color, boxShadow: `0 6px 0 rgba(0,0,0,0.18), 0 10px 24px ${color}66` }}
  >
    {children}
  </button>
);

const Title = () => (
  <div className="text-center">
    <div className="sticker-text-sm text-[13px] font-black uppercase tracking-[0.45em] text-white/95">Peach & Goma</div>
    <h1 className="sticker-text mt-1 text-5xl font-black leading-none text-white sm:text-6xl">
      Sky<span className="text-[#FFD3E0]">Hop</span>
    </h1>
  </div>
);

const LEGEND = [
  { icon: "☁️", text: "Clouds vanish" },
  { icon: "🛏️", text: "Pillows launch" },
  { icon: "🪀", text: "Trampolines flip" },
  { icon: "🧊", text: "Ice slips" },
  { icon: "🪨", text: "Crumble breaks" },
  { icon: "🌵", text: "Cactus hurts" },
  { icon: "⛈️", text: "Grumps bonk" },
  { icon: "🚀🎈🛡️🧲", text: "Power-ups!" },
];

/* ------------------------------------------------------------------ */
export function MenuOverlay() {
  const character = useGame((s) => s.character);
  const setCharacter = useGame((s) => s.setCharacter);
  const best = useGame((s) => s.best);
  const start = useGame((s) => s.start);
  const openLab = useGame((s) => s.openLab);
  const isTouch = typeof window !== "undefined" && matchMedia("(pointer: coarse)").matches;
  const [legend, setLegend] = useState(false);

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-between py-5">
      <div className="pointer-events-auto mt-1 floaty">
        <Title />
      </div>
      <div className="pointer-events-auto flex w-full max-w-sm flex-col items-center gap-3 px-5">
        <div className="grid w-full grid-cols-2 gap-3">
          {(["peach", "goma"] as CatId[]).map((id) => {
            const p = PALETTES[id];
            const sel = character === id;
            return (
              <button
                data-ui
                key={id}
                onClick={() => {
                  sfx.unlock();
                  sfx.select();
                  setCharacter(id);
                }}
                className={`rounded-3xl border-4 px-3 py-3 text-left transition-all ${sel ? "scale-[1.03] border-white bg-white/90 shadow-xl" : "border-white/40 bg-white/45 hover:bg-white/60"}`}
              >
                <div className="flex items-center gap-2">
                  <span className="inline-block h-5 w-5 rounded-full border-[3px] border-[#3B3231]" style={{ background: p.fur }} />
                  <span className="text-lg font-black text-[#3B3231]">{p.name}</span>
                  {sel && <span className="ml-auto rounded-full bg-[#FF8FAF] px-2 py-0.5 text-[10px] font-black text-white">PICKED</span>}
                </div>
                <div className="mt-1 text-[11px] font-semibold leading-tight text-[#6b5e5c]">{p.tagline}</div>
                <div className="mt-1 text-[11px] font-bold text-[#a0898a]">Best: {best[id].toLocaleString()}</div>
              </button>
            );
          })}
        </div>
        <Btn
          onClick={() => {
            if (isTouch) requestTilt();
            start();
          }}
          className="w-full"
        >
          ▶ &nbsp;Play as {PALETTES[character].name}
        </Btn>
        <div className="flex w-full gap-2">
          <Btn small color="#B08BEA" className="flex-1" onClick={openLab}>
            🔬 Cat Lab
          </Btn>
          <Btn small color="#8FB8FF" className="flex-1" onClick={() => setLegend((v) => !v)}>
            {legend ? "Hide" : "📖 How to play"}
          </Btn>
        </div>
        {legend ? (
          <div className="pop-in grid w-full grid-cols-2 gap-x-3 gap-y-1 rounded-2xl border-4 border-white/70 bg-white/80 px-3 py-2 text-[11px] font-bold text-[#3B3231]">
            {LEGEND.map((l) => (
              <div key={l.text} className="flex items-center gap-1.5">
                <span>{l.icon}</span>
                <span>{l.text}</span>
              </div>
            ))}
            <div className="col-span-2 mt-1 text-center text-[10px] text-[#6b5e5c]">Land dead-center for PERFECT combos ✨ Hug friends 🤗</div>
          </div>
        ) : (
          <p className="text-center text-[12px] font-bold leading-snug text-[#3B3231]/70">
            {isTouch ? "Tilt or tap left / right to steer." : "← → or A / D to steer."} Poke, pet & tickle the cats!
          </p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
const POWER_INFO = { rocket: { label: "🚀 ROCKET", color: "#FF6B7A" }, balloon: { label: "🎈 BALLOON", color: "#FFD35C" }, magnet: { label: "🧲 MAGNET", color: "#E9455D" } };

export function HUD() {
  const score = useGame((s) => s.score);
  const hearts = useGame((s) => s.hearts);
  const hugs = useGame((s) => s.hugs);
  const stars = useGame((s) => s.stars);
  const fish = useGame((s) => s.fish);
  const combo = useGame((s) => s.combo);
  const altitude = useGame((s) => s.altitude);
  const muted = useGame((s) => s.muted);
  const paused = useGame((s) => s.paused);
  const power = useGame((s) => s.power);
  const powerLeft = useGame((s) => s.powerLeft);
  const shield = useGame((s) => s.shield);
  const hurtFlash = useGame((s) => s.hurtFlash);
  const toggleMute = useGame((s) => s.toggleMute);
  const togglePause = useGame((s) => s.togglePause);
  const backToMenu = useGame((s) => s.backToMenu);
  const toasts = useGame((s) => s.toasts);
  const [pop, setPop] = useState(false);
  const [flashKey, setFlashKey] = useState(0);

  useEffect(() => {
    if (hearts === 0 && hugs === 0 && stars === 0 && fish === 0) return;
    setPop(true);
    const t = setTimeout(() => setPop(false), 220);
    return () => clearTimeout(t);
  }, [hearts, hugs, stars, fish]);
  useEffect(() => {
    if (hurtFlash > 0) setFlashKey((k) => k + 1);
  }, [hurtFlash]);

  useEffect(() => {
    const kd = (e: KeyboardEvent) => {
      if (e.code === "KeyP" || e.code === "Escape") togglePause();
      if (e.code === "KeyM") toggleMute();
    };
    window.addEventListener("keydown", kd);
    return () => window.removeEventListener("keydown", kd);
  }, [togglePause, toggleMute]);

  return (
    <div className="pointer-events-none absolute inset-0">
      {flashKey > 0 && <div key={flashKey} className="flash-hurt absolute inset-0 bg-[#FF6B7A]" />}
      <div className="absolute left-0 right-0 top-3 flex items-start justify-between px-4">
        <div className="flex flex-col gap-1">
          <div className={`sticker-text text-4xl font-black text-white transition-transform ${pop ? "scale-110" : ""}`}>{score.toLocaleString()}</div>
          <div className="flex flex-wrap gap-1.5 text-[12px] font-black text-white">
            <span className="rounded-full bg-black/15 px-2 py-0.5">⬆ {altitude}m</span>
            <span className="rounded-full bg-black/15 px-2 py-0.5">♥ {hearts}</span>
            {stars > 0 && <span className="rounded-full bg-black/15 px-2 py-0.5">★ {stars}</span>}
            {fish > 0 && <span className="rounded-full bg-black/15 px-2 py-0.5">🐟 {fish}</span>}
            {hugs > 0 && <span className="rounded-full bg-black/15 px-2 py-0.5">🤗 {hugs}</span>}
          </div>
          {shield && <div className="mt-1 w-fit rounded-full border-2 border-white/80 bg-[#9FD8FF]/80 px-2 py-0.5 text-[11px] font-black text-white">🛡️ SHIELD</div>}
        </div>
        <div className="pointer-events-auto flex gap-2">
          <Btn small color="#8FB8FF" onClick={toggleMute}>
            {muted ? "🔇" : "🔊"}
          </Btn>
          <Btn small color="#FFB380" onClick={togglePause}>
            {paused ? "▶" : "❚❚"}
          </Btn>
        </div>
      </div>
      {power && (
        <div className="absolute left-1/2 top-[17%] w-44 -translate-x-1/2">
          <div className="sticker-text-sm mb-1 text-center text-sm font-black text-white">{POWER_INFO[power].label}</div>
          <div className="h-3 w-full overflow-hidden rounded-full border-2 border-[#3B3231] bg-white/60">
            <div className="h-full rounded-full transition-[width] duration-100" style={{ width: `${Math.max(0, powerLeft * 100)}%`, background: POWER_INFO[power].color }} />
          </div>
        </div>
      )}
      {combo >= 2 && (
        <div key={combo} className="pop-in absolute right-4 top-[24%] rotate-6 text-right">
          <div className="sticker-text text-3xl font-black text-[#FFD35C]">x{combo}</div>
          <div className="sticker-text-sm text-[11px] font-black tracking-widest text-white">COMBO</div>
        </div>
      )}
      <div className="absolute left-0 right-0 top-[30%] flex flex-col items-center gap-1">
        {toasts.map((t) => (
          <div key={t.id} className="toast sticker-text text-3xl font-black" style={{ color: t.color }}>
            {t.text}
          </div>
        ))}
      </div>
      {paused && (
        <div className="pointer-events-auto absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white/30 backdrop-blur-[2px]">
          <div className="sticker-text text-5xl font-black text-white">Paused</div>
          <Btn onClick={togglePause}>Resume</Btn>
          <Btn small color="#B9A7A4" onClick={backToMenu}>
            Quit to menu
          </Btn>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
export function GameOverOverlay() {
  const score = useGame((s) => s.score);
  const altitude = useGame((s) => s.altitude);
  const hearts = useGame((s) => s.hearts);
  const hugs = useGame((s) => s.hugs);
  const stars = useGame((s) => s.stars);
  const fish = useGame((s) => s.fish);
  const bestCombo = useGame((s) => s.bestCombo);
  const best = useGame((s) => s.best);
  const character = useGame((s) => s.character);
  const start = useGame((s) => s.start);
  const backToMenu = useGame((s) => s.backToMenu);
  const record = score > 0 && score >= best[character];
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 900);
    return () => clearTimeout(t);
  }, []);

  const Stat = ({ v, l }: { v: React.ReactNode; l: string }) => (
    <div className="rounded-2xl bg-[#FFF0F4] px-2 py-1.5">
      <div className="text-xl font-black text-[#3B3231]">{v}</div>
      <div className="text-[10px] font-bold uppercase tracking-wider text-[#a0898a]">{l}</div>
    </div>
  );

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-between py-6">
      <div className="mt-2 text-center">
        <div className="sticker-text text-5xl font-black text-white">Oh no…</div>
        <div className="sticker-text-sm mt-1 text-sm font-black tracking-widest text-white/90">{PALETTES[character].name.toUpperCase()} FELL DOWN</div>
      </div>
      <div className={`pointer-events-auto w-full max-w-sm px-6 transition-all duration-500 ${show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
        <div className="rounded-3xl border-4 border-white bg-white/90 p-4 text-center shadow-2xl">
          {record && <div className="wiggle mb-1 inline-block rounded-full bg-[#FFD35C] px-3 py-0.5 text-[11px] font-black text-[#3B3231]">★ NEW BEST ★</div>}
          <div className="text-[11px] font-black uppercase tracking-widest text-[#a0898a]">Score</div>
          <div className="text-5xl font-black text-[#3B3231]">{score.toLocaleString()}</div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <Stat v={`${altitude}m`} l="height" />
            <Stat v={`♥ ${hearts}`} l="hearts" />
            <Stat v={`🤗 ${hugs}`} l="hugs" />
            <Stat v={`★ ${stars}`} l="stars" />
            <Stat v={`🐟 ${fish}`} l="snacks" />
            <Stat v={`x${bestCombo}`} l="best combo" />
          </div>
          <div className="mt-2 text-[11px] font-bold text-[#a0898a]">Best: {best[character].toLocaleString()}</div>
          <div className="mt-3 flex flex-col gap-2">
            <Btn onClick={start} className="w-full">
              ↻ &nbsp;Try again
            </Btn>
            <Btn small color="#B9A7A4" onClick={backToMenu}>
              Menu
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
type LabTab = "faces" | "poses" | "events" | "extras";
const chip = (active: boolean) =>
  `chip rounded-full px-2.5 py-1 text-[11px] font-black transition-all ${active ? "text-white scale-105" : "bg-white/85 text-[#3B3231] hover:bg-white"}`;

export function LabOverlay() {
  const lab = useGame((s) => s.lab);
  const setLab = useGame((s) => s.setLab);
  const backToMenu = useGame((s) => s.backToMenu);
  const character = useGame((s) => s.character);
  const setCharacter = useGame((s) => s.setCharacter);
  const [tab, setTab] = useState<LabTab>("faces");
  const pal = PALETTES[character];

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
      <div className="pointer-events-auto flex items-start justify-between px-4 pt-3">
        <div>
          <div className="sticker-text text-3xl font-black text-white">Cat Lab</div>
          <div className="sticker-text-sm text-[11px] font-black tracking-widest text-white/90">POKE · PET · TICKLE · POSE</div>
        </div>
        <div className="flex gap-2">
          <Btn
            small
            color={pal.accent}
            onClick={() => {
              setCharacter(character === "peach" ? "goma" : "peach");
              sfx.select();
            }}
          >
            {character === "peach" ? "→ Goma" : "→ Peach"}
          </Btn>
          <Btn small color="#B9A7A4" onClick={backToMenu}>
            ✕
          </Btn>
        </div>
      </div>

      <div className="pointer-events-auto mx-3 mb-3 rounded-3xl border-4 border-white/80 bg-white/70 p-2 backdrop-blur-sm">
        <div className="mb-2 flex gap-1.5">
          {(["faces", "poses", "events", "extras"] as LabTab[]).map((t) => (
            <button key={t} data-ui onClick={() => setTab(t)} className={`flex-1 rounded-full py-1.5 text-[12px] font-black capitalize ${tab === t ? "bg-[#3B3231] text-white" : "bg-white text-[#3B3231]"}`}>
              {t}
            </button>
          ))}
          <button data-ui onClick={() => setLab({ autoTour: !lab.autoTour })} className={`rounded-full px-3 py-1.5 text-[12px] font-black ${lab.autoTour ? "bg-[#FFD35C] text-[#3B3231]" : "bg-white text-[#3B3231]"}`}>
            {lab.autoTour ? "■ Tour" : "▶ Tour"}
          </button>
        </div>
        <div className="scrollbar-none flex max-h-[26vh] flex-wrap gap-1.5 overflow-y-auto">
          {tab === "faces" && (
            <>
              <button data-ui className={chip(lab.expression === null)} style={lab.expression === null ? { background: "#3B3231" } : {}} onClick={() => setLab({ expression: null, autoTour: false })}>
                auto
              </button>
              {EXPRESSION_NAMES.map((n) => (
                <button key={n} data-ui className={chip(lab.expression === n)} style={lab.expression === n ? { background: pal.accent } : {}} onClick={() => setLab({ expression: n, autoTour: false })}>
                  {n}
                </button>
              ))}
            </>
          )}
          {tab === "poses" && (
            <>
              {POSE_NAMES.map((n) => (
                <button key={n} data-ui className={chip(lab.pose === n)} style={lab.pose === n ? { background: "#B08BEA" } : {}} onClick={() => setLab({ pose: n, autoTour: false })}>
                  {n}
                </button>
              ))}
              <div className="mt-1 flex w-full items-center gap-2 px-1 text-[11px] font-black text-[#3B3231]">
                <span>vx</span>
                <input data-ui type="range" min={-9} max={9} step={0.5} value={lab.vx} onChange={(e) => setLab({ vx: +e.target.value })} className="flex-1 accent-[#FF8FAF]" />
                <span>vy</span>
                <input data-ui type="range" min={-25} max={25} step={1} value={lab.vy} onChange={(e) => setLab({ vy: +e.target.value })} className="flex-1 accent-[#8FB8FF]" />
                <button data-ui className="chip rounded-full bg-white px-2 py-0.5" onClick={() => setLab({ vx: 0, vy: 0 })}>
                  0
                </button>
              </div>
            </>
          )}
          {tab === "events" &&
            ALL_EVENTS.map((n) => (
              <button
                key={n}
                data-ui
                className={chip(false)}
                onClick={() => {
                  sfx.click();
                  labBus.fire(n);
                }}
              >
                ⚡ {n}
              </button>
            ))}
          {tab === "extras" && (
            <>
              <div className="w-full px-1 text-[10px] font-black uppercase tracking-widest text-[#a0898a]">Accessory</div>
              {ALL_ACCESSORIES.map((n) => (
                <button key={n} data-ui className={chip(lab.accessory === n)} style={lab.accessory === n ? { background: "#7FB8FF" } : {}} onClick={() => setLab({ accessory: n })}>
                  {n}
                </button>
              ))}
              <div className="mt-1 w-full px-1 text-[10px] font-black uppercase tracking-widest text-[#a0898a]">Emote</div>
              <button data-ui className={chip(lab.emote === null)} style={lab.emote === null ? { background: "#3B3231" } : {}} onClick={() => setLab({ emote: null })}>
                none
              </button>
              {ALL_EMOTES.map((n) => (
                <button key={n} data-ui className={chip(lab.emote === n)} style={lab.emote === n ? { background: "#FFB380" } : {}} onClick={() => setLab({ emote: n })}>
                  {n}
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

<<<<< END FILE: src/ui/Overlays.tsx >>>>>

<<<<< BEGIN FILE: src/ui/Sky.tsx (1066 bytes) >>>>>
import { useGame } from "../game/store";

const TIERS = [
  "linear-gradient(180deg,#BFE3FF 0%,#DDEBFF 40%,#FFE1EA 78%,#FFF2D9 100%)", // peach dawn
  "linear-gradient(180deg,#8EC5FF 0%,#B9DDFF 45%,#E4F1FF 100%)", // day sky
  "linear-gradient(180deg,#6F7CFF 0%,#B79BFF 45%,#FFB4CE 100%)", // dusk
  "linear-gradient(180deg,#1F2358 0%,#3E3F8F 50%,#8A6BC8 100%)", // starry night
  "linear-gradient(180deg,#07081C 0%,#1B1650 55%,#4A2E86 100%)", // outer space
];

export function Sky() {
  const tier = useGame((s) => s.skyTier);
  return (
    <div className="pointer-events-none absolute inset-0">
      {TIERS.map((bg, i) => (
        <div key={i} className="absolute inset-0 transition-opacity duration-[2500ms] ease-in-out" style={{ background: bg, opacity: tier === i ? 1 : 0 }} />
      ))}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 110%, rgba(255,255,255,0.35), transparent 60%)" }} />
      <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 120px rgba(80,40,90,0.10)" }} />
    </div>
  );
}

<<<<< END FILE: src/ui/Sky.tsx >>>>>

<<<<< BEGIN FILE: src/utils/cn.ts (169 bytes) >>>>>
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

<<<<< END FILE: src/utils/cn.ts >>>>>

<<<<< BEGIN FILE: src/world/Backdrop.tsx (6887 bytes) >>>>>
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type MutableRefObject } from "react";
import { rand } from "../character/springs";
import { toon, outline, flat } from "../character/materials";
import { useGame } from "../game/store";

const PUFF = new THREE.SphereGeometry(1, 18, 12);
const cloudMat = toon("#F6FAFF");
const cloudOutline = outline(0.08, "#D9E6F6");
const SUN = new THREE.CircleGeometry(2.2, 40);
const RING = new THREE.RingGeometry(2.4, 3.2, 48);
const PLANET = new THREE.SphereGeometry(1, 24, 16);
const PLANET_RING = new THREE.TorusGeometry(1.6, 0.12, 8, 40);
const BIRD = new THREE.TorusGeometry(0.22, 0.035, 6, 12, Math.PI);

interface CloudData {
  x: number;
  y: number;
  z: number;
  s: number;
  speed: number;
  parts: { x: number; y: number; r: number; sy: number }[];
}

function makeCloud(camY: number, spread: number): CloudData {
  const n = 3 + Math.floor(Math.random() * 3);
  const parts = [] as CloudData["parts"];
  for (let i = 0; i < n; i++) {
    parts.push({ x: (i - (n - 1) / 2) * 0.75 + rand(-0.15, 0.15), y: rand(-0.1, 0.25) - Math.abs(i - (n - 1) / 2) * 0.15, r: rand(0.55, 0.9), sy: rand(0.6, 0.8) });
  }
  return { x: rand(-14, 14), y: camY + rand(-spread, spread), z: rand(-24, -9), s: rand(0.7, 1.6), speed: rand(0.15, 0.45) * (Math.random() < 0.5 ? -1 : 1), parts };
}

function Cloud({ d }: { d: CloudData }) {
  return (
    <>
      {d.parts.map((p, i) => (
        <group key={i} position={[p.x, p.y, 0]} scale={[p.r, p.r * p.sy, p.r * 0.7]}>
          <mesh geometry={PUFF} material={cloudMat} />
          <mesh geometry={PUFF} material={cloudOutline} />
        </group>
      ))}
    </>
  );
}

function Birds({ camYRef }: { camYRef: MutableRefObject<number> }) {
  const g = useRef<THREE.Group>(null);
  const mem = useMemo(() => ({ x: -20, y: 0, dir: 1, t: rand(0, 10), wait: rand(4, 10), active: false }), []);
  useFrame(({ clock }, dt) => {
    const o = g.current;
    if (!o) return;
    mem.t += dt;
    if (!mem.active) {
      mem.wait -= dt;
      if (mem.wait <= 0 && camYRef.current < 95) {
        mem.active = true;
        mem.dir = Math.random() < 0.5 ? 1 : -1;
        mem.x = -mem.dir * 18;
        mem.y = camYRef.current + rand(2, 7);
      }
      o.visible = false;
      return;
    }
    o.visible = true;
    mem.x += mem.dir * 3.2 * dt;
    mem.y += Math.sin(mem.t * 2) * 0.01;
    if (Math.abs(mem.x) > 19) {
      mem.active = false;
      mem.wait = rand(8, 18);
    }
    o.position.set(mem.x, mem.y, -12);
    o.scale.x = mem.dir;
    const flap = Math.sin(clock.elapsedTime * 9) * 0.5;
    o.children.forEach((c, i) => {
      c.rotation.z = (i === 0 ? -1 : 1) * (0.4 + flap);
    });
  });
  return (
    <group ref={g} visible={false}>
      <mesh geometry={BIRD} material={flat("#6b5e5c")} position={[-0.2, 0, 0]} />
      <mesh geometry={BIRD} material={flat("#6b5e5c")} position={[0.2, 0, 0]} />
    </group>
  );
}

export function Backdrop({ camYRef, count = 14, spread = 26 }: { camYRef: MutableRefObject<number>; count?: number; spread?: number }) {
  const clouds = useMemo(() => Array.from({ length: count }, () => makeCloud(camYRef.current, spread)), [count, spread, camYRef]);
  const refs = useRef<(THREE.Group | null)[]>([]);
  const stars = useMemo(() => {
    const N = 220;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      pos[i * 3] = rand(-16, 16);
      pos[i * 3 + 1] = rand(-spread, spread);
      pos[i * 3 + 2] = rand(-22, -10);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, [spread]);
  const starMat = useMemo(() => new THREE.PointsMaterial({ color: "#FFF6D6", size: 0.16, transparent: true, opacity: 0, sizeAttenuation: true, depthWrite: false }), []);
  const starsRef = useRef<THREE.Points>(null);
  const sunRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Group>(null);
  const sunMat = useMemo(() => flat("#FFF1B8", { opacity: 0.9 }), []);
  const ringMat = useMemo(() => flat("#FFF7DA", { opacity: 0.25, depthWrite: false }), []);

  useFrame(({ clock }, dt) => {
    const camY = camYRef.current;
    const tier = useGame.getState().skyTier;
    clouds.forEach((c, i) => {
      c.x += c.speed * dt;
      if (c.x > 16) c.x = -16;
      if (c.x < -16) c.x = 16;
      if (c.y < camY - spread) Object.assign(c, makeCloud(camY, spread), { y: camY + spread * rand(0.7, 1) });
      const g = refs.current[i];
      if (g) {
        g.position.set(c.x, c.y + Math.sin(clock.elapsedTime * 0.4 + i) * 0.15, c.z);
        // clouds thin out in space
        const k = tier >= 4 ? 0.35 : 1;
        g.scale.setScalar(c.s * k);
      }
    });
    if (starsRef.current) {
      const pos = stars.attributes.position as THREE.BufferAttribute;
      let dirty = false;
      for (let i = 0; i < pos.count; i++) {
        const y = pos.getY(i);
        if (y < camY - spread) {
          pos.setY(i, camY + spread * rand(0.5, 1));
          pos.setX(i, rand(-16, 16));
          dirty = true;
        }
      }
      if (dirty) pos.needsUpdate = true;
      const target = camY > 95 ? Math.min(1, (camY - 95) / 60) : 0;
      starMat.opacity += (target - starMat.opacity) * Math.min(1, dt * 2);
      starMat.size = 0.14 + Math.sin(clock.elapsedTime * 3) * 0.03;
    }
    if (sunRef.current) {
      // the sun slowly sinks as you climb into dusk, then becomes the moon
      const k = Math.min(1, camY / 190);
      sunRef.current.position.set(6 - k * 3, camY + 9 - k * 6, -26);
      const isMoon = tier >= 3;
      sunMat.color.set(isMoon ? "#F4F1FF" : "#FFF1B8");
      ringMat.color.set(isMoon ? "#DCD6FF" : "#FFF7DA");
      sunRef.current.rotation.z = clock.elapsedTime * 0.05;
    }
    if (planetRef.current) {
      planetRef.current.visible = tier >= 4;
      planetRef.current.position.set(-7, camY + 5 + Math.sin(clock.elapsedTime * 0.3) * 0.3, -24);
      planetRef.current.rotation.y = clock.elapsedTime * 0.2;
    }
  });

  return (
    <group>
      <group ref={sunRef} position={[6, 9, -26]}>
        <mesh geometry={SUN} material={sunMat} />
        <mesh geometry={RING} material={ringMat} />
      </group>
      <group ref={planetRef} visible={false}>
        <mesh geometry={PLANET} material={toon("#C7B3FF")} scale={1.6} />
        <mesh geometry={PLANET} material={outline(0.1, "#8E77D6")} scale={1.6} />
        <mesh geometry={PLANET_RING} material={toon("#FFD7EB")} rotation={[1.2, 0.3, 0]} scale={1.4} />
      </group>
      {clouds.map((c, i) => (
        <group key={i} ref={(g) => (refs.current[i] = g)} position={[c.x, c.y, c.z]} scale={c.s}>
          <Cloud d={c} />
        </group>
      ))}
      <points ref={starsRef} geometry={stars} material={starMat} frustumCulled={false} />
      <Birds camYRef={camYRef} />
    </group>
  );
}

<<<<< END FILE: src/world/Backdrop.tsx >>>>>

<<<<< BEGIN FILE: src/world/Items.tsx (8770 bytes) >>>>>
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

<<<<< END FILE: src/world/Items.tsx >>>>>

<<<<< BEGIN FILE: src/world/Particles.tsx (6631 bytes) >>>>>
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { BUBBLE_GEO, CONFETTI_GEO, HEART_GEO_SMALL, PUFF_GEO, SHARD_GEO, SPARK_GEO, STAR_GEO } from "./geometries";
import { toon, outline } from "../character/materials";
import { rand } from "../character/springs";

export type FxKind = "hearts" | "puff" | "sparkle" | "dust" | "stars" | "flame" | "shards" | "bubbles" | "confetti" | "confetti2" | "smoke" | "zap";

interface Particle {
  alive: boolean;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  rot: number;
  vrot: number;
  life: number;
  maxLife: number;
  size: number;
  gravity: number;
  drag: number;
}

interface KindCfg {
  geo: THREE.BufferGeometry;
  color: string;
  emissive?: string;
  outline: number;
  count: number;
  life: [number, number];
  speed: number;
  gravity: number;
  up: number;
  size: [number, number];
  drag: number;
  pool?: number;
  grow?: boolean;
}

const KIND_CFG: Record<FxKind, KindCfg> = {
  hearts: { geo: HEART_GEO_SMALL, color: "#FF7A9C", outline: 0.025, count: 8, life: [0.9, 1.4], speed: 1.6, gravity: 2.5, up: 4, size: [0.7, 1.3], drag: 1.5 },
  puff: { geo: PUFF_GEO, color: "#FFFFFF", outline: 0.03, count: 9, life: [0.5, 0.8], speed: 2.5, gravity: -1.5, up: 0.5, size: [0.6, 1.3], drag: 3, grow: true },
  sparkle: { geo: SPARK_GEO, color: "#FFE07A", emissive: "#FFC93C", outline: 0.02, count: 12, life: [0.5, 0.9], speed: 4.5, gravity: 4, up: 3, size: [0.6, 1.4], drag: 2 },
  dust: { geo: PUFF_GEO, color: "#FFF6EC", outline: 0.02, count: 6, life: [0.3, 0.5], speed: 2, gravity: -0.5, up: 0.5, size: [0.3, 0.6], drag: 4, grow: true },
  stars: { geo: STAR_GEO, color: "#FFD86B", outline: 0.025, count: 10, life: [0.8, 1.3], speed: 5, gravity: 6, up: 5, size: [0.6, 1.2], drag: 1.5 },
  flame: { geo: PUFF_GEO, color: "#FFB347", emissive: "#FF6A00", outline: 0.02, count: 3, life: [0.25, 0.45], speed: 1.2, gravity: -3, up: -6, size: [0.5, 1.1], drag: 2, pool: 60, grow: true },
  shards: { geo: SHARD_GEO, color: "#CFF1FF", outline: 0.02, count: 10, life: [0.5, 0.9], speed: 4, gravity: 9, up: 3, size: [0.6, 1.3], drag: 1 },
  bubbles: { geo: BUBBLE_GEO, color: "#BFE6FF", outline: 0.02, count: 14, life: [0.6, 1.1], speed: 4, gravity: -1, up: 2, size: [0.5, 1.4], drag: 2.5 },
  confetti: { geo: CONFETTI_GEO, color: "#FF8FAF", outline: 0.015, count: 10, life: [1.2, 1.8], speed: 4, gravity: 3, up: 6, size: [0.8, 1.3], drag: 1.6 },
  confetti2: { geo: CONFETTI_GEO, color: "#7FB8FF", outline: 0.015, count: 10, life: [1.2, 1.8], speed: 4, gravity: 3, up: 6, size: [0.8, 1.3], drag: 1.6 },
  smoke: { geo: PUFF_GEO, color: "#B9AFA8", outline: 0.02, count: 8, life: [0.5, 0.9], speed: 2, gravity: -1, up: 1, size: [0.7, 1.4], drag: 3, grow: true },
  zap: { geo: SPARK_GEO, color: "#FFF4A3", emissive: "#FFE45C", outline: 0.02, count: 8, life: [0.25, 0.45], speed: 6, gravity: 0, up: 0, size: [0.5, 1], drag: 4 },
};

type BurstFn = (kind: FxKind, x: number, y: number, z?: number, count?: number, spread?: number) => void;
export const fx: { burst: BurstFn } = { burst: () => {} };

function Pool({ kind }: { kind: FxKind }) {
  const cfg = KIND_CFG[kind];
  const POOL = cfg.pool ?? 40;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const outl = useRef<THREE.InstancedMesh>(null);
  const parts = useMemo<Particle[]>(
    () => Array.from({ length: POOL }, () => ({ alive: false, x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, rot: 0, vrot: 0, life: 0, maxLife: 1, size: 1, gravity: 0, drag: 0 })),
    [POOL],
  );
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useMemo(() => {
    const prev = fx.burst;
    fx.burst = (k, x, y, z = 0, count, spread = 1) => {
      if (k !== kind) return prev(k, x, y, z, count, spread);
      let n = count ?? cfg.count;
      for (const p of parts) {
        if (n <= 0) break;
        if (p.alive) continue;
        const a = rand(0, Math.PI * 2);
        const sp = rand(0.4, 1) * cfg.speed * spread;
        p.alive = true;
        p.x = x + rand(-0.15, 0.15) * spread;
        p.y = y + rand(-0.1, 0.1);
        p.z = z + rand(-0.2, 0.2);
        p.vx = Math.cos(a) * sp;
        p.vy = Math.abs(Math.sin(a)) * sp * 0.5 + cfg.up * rand(0.5, 1);
        p.vz = rand(-0.5, 0.5);
        p.rot = rand(0, Math.PI * 2);
        p.vrot = rand(-4, 4);
        p.maxLife = rand(cfg.life[0], cfg.life[1]);
        p.life = p.maxLife;
        p.size = rand(cfg.size[0], cfg.size[1]);
        p.gravity = cfg.gravity;
        p.drag = cfg.drag;
        n--;
      }
    };
    return null;
  }, [kind, cfg, parts]);

  useFrame((_, dt) => {
    const m = mesh.current;
    const o = outl.current;
    if (!m || !o) return;
    parts.forEach((p, i) => {
      if (p.alive) {
        p.life -= dt;
        if (p.life <= 0) p.alive = false;
        p.vy -= p.gravity * dt;
        const dr = Math.exp(-p.drag * dt);
        p.vx *= dr;
        p.vz *= dr;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.z += p.vz * dt;
        p.rot += p.vrot * dt;
        const k = p.life / p.maxLife;
        const s = p.size * (cfg.grow ? 0.5 + (1 - k) * 0.9 : Math.min(1, k * 4)) * (k < 0.3 ? k / 0.3 : 1);
        dummy.position.set(p.x, p.y, p.z);
        if (kind === "hearts") dummy.rotation.set(0, Math.sin(p.rot) * 0.6, 0);
        else if (kind === "confetti" || kind === "confetti2") dummy.rotation.set(p.rot * 1.3, p.rot, p.rot * 0.7);
        else dummy.rotation.set(0, 0, p.rot);
        dummy.scale.setScalar(Math.max(0.0001, s));
      } else {
        dummy.position.set(0, -9999, 0);
        dummy.scale.setScalar(0.0001);
      }
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
      o.setMatrixAt(i, dummy.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
    o.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={mesh} args={[cfg.geo, toon(cfg.color, cfg.emissive ? { emissive: cfg.emissive, emissiveIntensity: 0.6 } : {}), POOL]} frustumCulled={false} />
      <instancedMesh ref={outl} args={[cfg.geo, outline(cfg.outline), POOL]} frustumCulled={false} />
    </>
  );
}

export function Particles() {
  return (
    <>
      {(Object.keys(KIND_CFG) as FxKind[]).map((k) => (
        <Pool key={k} kind={k} />
      ))}
    </>
  );
}

/** Celebration helper: confetti + stars + sparkles in one call. */
export function celebrate(x: number, y: number, z = 0.5) {
  fx.burst("confetti", x, y, z, 10, 1.4);
  fx.burst("confetti2", x, y, z, 10, 1.4);
  fx.burst("stars", x, y, z, 6, 1.2);
  fx.burst("sparkle", x, y + 0.3, z, 8, 1.2);
}

<<<<< END FILE: src/world/Particles.tsx >>>>>

<<<<< BEGIN FILE: src/world/Platform.tsx (10904 bytes) >>>>>
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

<<<<< END FILE: src/world/Platform.tsx >>>>>

<<<<< BEGIN FILE: src/world/geometries.ts (3032 bytes) >>>>>
import * as THREE from "three";

export function heartShape() {
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
  return s;
}

export function starShape(inner = 0.45) {
  const s = new THREE.Shape();
  const pts = 5;
  for (let i = 0; i < pts * 2; i++) {
    const r = i % 2 === 0 ? 1 : inner;
    const a = (i / (pts * 2)) * Math.PI * 2 + Math.PI / 2;
    const px = Math.cos(a) * r;
    const py = Math.sin(a) * r;
    if (i === 0) s.moveTo(px, py);
    else s.lineTo(px, py);
  }
  s.closePath();
  return s;
}

export function makeHeartGeometry(size = 0.3, depth = 0.12) {
  const g = new THREE.ExtrudeGeometry(heartShape(), { depth, bevelEnabled: true, bevelSegments: 4, bevelSize: 0.12, bevelThickness: 0.1, curveSegments: 12 });
  g.center();
  g.rotateZ(Math.PI); // point down
  g.scale(size, size, size);
  g.computeVertexNormals();
  return g;
}

export function makeStarGeometry(size = 0.2) {
  const g = new THREE.ExtrudeGeometry(starShape(), { depth: 0.3, bevelEnabled: true, bevelSegments: 2, bevelSize: 0.1, bevelThickness: 0.1 });
  g.center();
  g.scale(size, size, size);
  g.computeVertexNormals();
  return g;
}

/** Flat heart for eyes / emotes (unit ≈ 0.1 wide). */
export const HEART_FLAT = (() => {
  const g = new THREE.ShapeGeometry(heartShape(), 10);
  g.center();
  g.rotateZ(Math.PI);
  g.scale(0.055, 0.055, 0.055);
  return g;
})();

export const STAR_FLAT = (() => {
  const g = new THREE.ShapeGeometry(starShape(0.5), 4);
  g.center();
  g.scale(0.12, 0.12, 0.12);
  return g;
})();

export function makeFishGeometry() {
  const s = new THREE.Shape();
  s.moveTo(-0.5, 0);
  s.bezierCurveTo(-0.3, 0.45, 0.3, 0.45, 0.55, 0);
  s.bezierCurveTo(0.3, -0.45, -0.3, -0.45, -0.5, 0);
  s.lineTo(-0.85, 0.32);
  s.lineTo(-0.85, -0.32);
  s.lineTo(-0.5, 0);
  const g = new THREE.ExtrudeGeometry(s, { depth: 0.18, bevelEnabled: true, bevelSegments: 3, bevelSize: 0.06, bevelThickness: 0.06, curveSegments: 10 });
  g.center();
  g.scale(0.42, 0.42, 0.42);
  g.computeVertexNormals();
  return g;
}

export const HEART_GEO = makeHeartGeometry(0.3);
export const HEART_GEO_SMALL = makeHeartGeometry(0.16, 0.08);
export const STAR_GEO = makeStarGeometry(0.16);
export const STAR_GEO_BIG = makeStarGeometry(0.3);
export const FISH_GEO = makeFishGeometry();
export const PUFF_GEO = new THREE.SphereGeometry(0.22, 12, 10);
export const SPARK_GEO = new THREE.OctahedronGeometry(0.1, 0);
export const CONFETTI_GEO = new THREE.BoxGeometry(0.14, 0.09, 0.02);
export const SHARD_GEO = new THREE.TetrahedronGeometry(0.1, 0);
export const BUBBLE_GEO = new THREE.SphereGeometry(0.12, 10, 8);

<<<<< END FILE: src/world/geometries.ts >>>>>

<<<<< BEGIN FILE: tsconfig.json (681 bytes) >>>>>
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "types": ["node"],

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Path mapping */
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src", "vite.config.ts"]
}

<<<<< END FILE: tsconfig.json >>>>>

<<<<< BEGIN FILE: vite.config.ts (538 bytes) >>>>>
import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});

<<<<< END FILE: vite.config.ts >>>>>
