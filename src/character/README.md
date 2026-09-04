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
