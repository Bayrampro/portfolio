# Avatar with fitted eyelids

The homepage loads `/avatar_with_blink.glb` through `components/HeroHead.tsx` and the shared `avatarMotion.ts` controller. The temporary `/avatar-preview` page and its diagnostic UI were removed after validation. Existing dependencies suffice.

The original head and two-bone rig remain intact. `Head` follows the pointer with quaternion damping, yaw ±25° and pitch ±15°. `Neck` stays at rest. Each instance uses `SkeletonUtils.clone` for independent skeletons and morph influences. The diagnostic `HeadLookTest` clip is not played during cursor tracking.

Two additive curved eyelid meshes provide genuine exported morphs. Each eye has a main target (`BlinkLeft` or `BlinkRight`) and curvature correctives (`BlinkLeftCurve25/50/75`, or the Right equivalents). The controller resolves names on both material primitives and updates them in `useFrame` without React state updates.

Automatic cycles last 220 ms, with primary intervals of 2–6 seconds and an 18% chance of a second blink about 320–400 ms after the first starts. Independent overrides:

```ts
const motion = createAvatarMotion(clonedScene);
motion.setBlink(1, 0);       // Character left closed, right open.
motion.setBlink(0.5, 0.5);   // Half closed, including correctives.
motion.setBlink(null, null); // Resume automatic blinking.
// Inside useFrame:
motion.update(pointer.x, pointer.y, delta);
```

Use these controls rather than setting only the main morph: curvature correctives are part of the fitted eyelid system.

Exported clips: `HeadLookTest`, `Blink` (233 ms at 30 fps), `EyesOpen`, `EyesHalfClosed`, `EyesClosed`. Direct control and an AnimationMixer clip should not drive the same morph weights simultaneously.

Old `avatar_animated.blend` and `avatar_animated.glb` remain unchanged. Evidence and renders: workspace `avatar-work/BLINK_REPORT.md` and `avatar-work/blink-work/`.

Validation from project root:

```bash
rtk proxy node examples/avatar/verify-blink.mjs
rtk proxy ./node_modules/.bin/tsc --noEmit --incremental false
rtk proxy ./node_modules/.bin/eslint examples/avatar components/HeroHead.tsx
```

`verify-blink.mjs` checks real exported eyelids against Blender across 15 poses, independent controls, automatic/double blinking, clip playback, and the fixed neck. Node image decoding is stubbed only for CPU tests; actual rendering was checked in Blender and browser. `verify.mjs` remains a compatibility test for the old asset; its synthetic branch is not evidence of the new model's blink.

Frame-loop reference: https://r3f.docs.pmnd.rs/api/hooks#useframe
