# Peach & Goma character rig

Everything about the cats lives in this folder and is **data-driven**:

| File | What it holds | How to extend |
| --- | --- | --- |
| `expressions.ts` | Facial presets (eyes, brows, mouth shapes, blush, tears, sweat) | Add a key to `EXPRESSIONS` – it becomes available everywhere (`driver.expression = "myFace"`). |
| `poses.ts` | Body motion states (arms, legs, ears, tail, squash, crouch) + default expression per state + spring tuning | Add a key to `POSES` and `POSE_EXPRESSION`; set `driver.state = "myState"`. |
| `Cat.tsx` | The procedural rig: reads a `CatDriver` every frame, springs toward the pose, cross-fades the expression, layers velocity reactions, blinking, look-around, ear twitches | Add new one-shot reactions in `EVENT_FLASH` / the `switch` inside the event loop. |
| `palettes.ts` | Colours per character | Add a new cat by adding a palette. |
| `materials.ts` / `Part.tsx` | Toon shading + inverted-hull ink outline | Shared by props/platforms too. |

## Driving a cat from game code

```ts
const driver = useRef(createDriver());
<Cat palette={PALETTES.peach} driver={driver} />

// every frame
driver.current.vx = velocity.x;   // lean, tail inertia, look direction
driver.current.vy = velocity.y;   // stretch, ear fold, head pitch
driver.current.state = "fall";    // any MotionState
driver.current.expression = null; // or force an ExpressionName
driver.current.events.push("land"); // one-shot: squash, ear flop, squint flash…
```
