// Actual exported asset and actual runtime controller. No synthetic shape keys.
import assert from 'node:assert/strict';
import { readFile, writeFile, unlink } from 'node:fs/promises';
import ts from 'typescript';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { clone } from 'three/addons/utils/SkeletonUtils.js';
import { AnimationMixer, LoopOnce, Vector3 } from 'three';

const temporary = new URL('./.avatarBlink-verify.mjs', import.meta.url);
await writeFile(temporary, ts.transpileModule(await readFile(new URL('./avatarMotion.ts', import.meta.url), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText);

try {
  const { createAvatarMotion } = await import(temporary.href);
  globalThis.self = globalThis;
  // CPU geometry tests need no image decoder; actual texture rendering is checked in browser/Blender.
  globalThis.createImageBitmap = async () => ({ width: 2048, height: 2048, close() {} });
  globalThis.ProgressEvent ??= class ProgressEvent {};
  const bytes = await readFile(new URL('../../public/avatar_with_blink.glb', import.meta.url));
  const gltf = await new GLTFLoader().parseAsync(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength), '');
  const names = gltf.animations.map((clip) => clip.name).sort();
  assert.deepEqual(names, ['Blink', 'EyesClosed', 'EyesHalfClosed', 'EyesOpen', 'HeadLookTest']);
  const root = clone(gltf.scene);
  const motion = createAvatarMotion(root, () => 0.5);
  assert.equal(motion.blinkAvailable, true);
  const meshes = [];
  root.traverse((o) => { if (o.isSkinnedMesh) meshes.push(o); });
  assert.equal(meshes.length, 5); // Original face plus skin/margin primitive for each eye.
  function updateWorld() {
    root.updateMatrixWorld(true);
    for (const mesh of meshes) mesh.skeleton.update();
  }
  updateWorld();
  const reference = JSON.parse(await readFile(new URL('../../../avatar-work/blink-work/runtime-reference.json', import.meta.url), 'utf8'));
  const mappings = {};
  for (const side of ['Left', 'Right']) {
    const eyeMeshes = meshes.filter((m) => m.morphTargetDictionary?.['Blink' + side] !== undefined);
    assert.equal(eyeMeshes.length, 2);
    for (const mesh of eyeMeshes) {
      for (const suffix of ['', 'Curve25', 'Curve50', 'Curve75']) {
        assert.notEqual(mesh.morphTargetDictionary['Blink' + side + suffix], undefined);
      }
    }
    mappings[side] = reference.basis[side].map(({ point }, sampleIndex) => {
      const expected = new Vector3(...point);
      const expectedClosed = new Vector3(...reference.cases.find((test) => test.name === 'phase_1').points[side][sampleIndex]);
      let best = { mesh: null, index: -1, distance: Infinity };
      for (const mesh of eyeMeshes) {
        for (let index = 0; index < mesh.geometry.attributes.position.count; index++) {
          const p = mesh.localToWorld(new Vector3().fromBufferAttribute(mesh.geometry.attributes.position, index));
          const closed = new Vector3().fromBufferAttribute(mesh.geometry.attributes.position, index)
            .add(new Vector3().fromBufferAttribute(mesh.geometry.morphAttributes.position[mesh.morphTargetDictionary['Blink' + side]], index));
          mesh.localToWorld(closed);
          // Margin and cap share positions when stowed. Closed positions disambiguate them.
          const distance = p.distanceTo(expected) + closed.distanceTo(expectedClosed);
          if (distance < best.distance) best = { mesh, index, distance };
        }
      }
      assert(best.distance < 0.000002);
      return best;
    });
  }
  const face = meshes.find((m) => !m.morphTargetInfluences);
  const head = root.getObjectByName('Head');
  const headIndex = face.skeleton.bones.indexOf(head);
  const base = [];
  for (let index = 0; index < face.geometry.attributes.position.count; index++) {
    let headWeight = 0;
    for (let j = 0; j < 4; j++) {
      if (face.geometry.attributes.skinIndex.getComponent(index, j) === headIndex) {
        headWeight += face.geometry.attributes.skinWeight.getComponent(index, j);
      }
    }
    if (headWeight === 0) base.push({ index, p: face.getVertexPosition(index, new Vector3()) });
  }
  let maxBaseDrift = 0;
  let maxReferenceError = 0;
  for (const test of reference.cases) {
    motion.setBlink(test.left, test.right);
    for (let frame = 0; frame < 360; frame++) motion.update(test.yaw / 25, -test.pitch / 15, 1 / 60);
    updateWorld();
    for (const side of ['Left', 'Right']) {
      for (let i = 0; i < mappings[side].length; i++) {
        const { mesh, index } = mappings[side][i];
        const actual = mesh.localToWorld(mesh.getVertexPosition(index, new Vector3()));
        maxReferenceError = Math.max(maxReferenceError, actual.distanceTo(new Vector3(...test.points[side][i])));
      }
    }
    for (const { index, p } of base) maxBaseDrift = Math.max(maxBaseDrift, face.getVertexPosition(index, new Vector3()).distanceTo(p));
  }
  assert(maxReferenceError < 0.000003, `Blender/runtime mismatch: ${maxReferenceError}`);
  assert(maxBaseDrift < 0.000002);

  // Run automatic scheduling on the real lid meshes; force occasional doubles deterministically.
  const automaticRoot = clone(gltf.scene);
  const randomValues = [0.1, 0.8, 0.1, 0.5, 0.4, 0.9, 0.7, 0.1, 0.3];
  let randomIndex = 0;
  const automatic = createAvatarMotion(automaticRoot, () => randomValues[randomIndex++ % randomValues.length]);
  const onsets = [];
  let previous = 0;
  let peak = 0;
  let maximumCorrection = 0;
  for (let i = 0; i < 3600; i++) {
    automatic.update(Math.sin(i / 80), Math.cos(i / 100), 1 / 120);
    const value = automatic.blinkLeft;
    assert.equal(value, automatic.blinkRight);
    peak = Math.max(peak, value);
    if (value > 0 && previous === 0) onsets.push((i + 1) / 120);
    previous = value;
    automaticRoot.traverse((mesh) => {
      if (!mesh.isSkinnedMesh || !mesh.morphTargetDictionary) return;
      const side = mesh.morphTargetDictionary.BlinkLeft !== undefined ? 'Left' : 'Right';
      const mainIndex = mesh.morphTargetDictionary['Blink' + side];
      assert.equal(mesh.morphTargetInfluences[mainIndex], value);
      for (const phase of [25, 50, 75]) {
        const index = mesh.morphTargetDictionary['Blink' + side + 'Curve' + phase];
        const expected = Math.max(0, 1 - Math.abs(value - phase / 100) / 0.25);
        assert.equal(mesh.morphTargetInfluences[index], expected);
        maximumCorrection = Math.max(maximumCorrection, expected);
      }
    });
  }
  assert.equal(peak, 1);
  assert(maximumCorrection > 0.9);
  const clusters = onsets.filter((time, i) => i === 0 || time - onsets[i - 1] > 1);
  const intervals = clusters.slice(1).map((time, i) => time - clusters[i]);
  assert(intervals.every((time) => time >= 2 && time <= 6.03));
  const doubles = onsets.slice(1).map((time, i) => time - onsets[i]).filter((time) => time < 1);
  assert(doubles.length > 0 && doubles.every((time) => time >= 0.32 && time <= 0.42));

  // Real exported animation channels, including coordinated correctives, play correctly.
  const clip = gltf.animations.find((animation) => animation.name === 'Blink');
  const clipRoot = clone(gltf.scene);
  const mixer = new AnimationMixer(clipRoot);
  const action = mixer.clipAction(clip).setLoop(LoopOnce, 1);
  action.clampWhenFinished = true;
  action.play();
  const clipWeights = [];
  for (const time of [0, 0.067, 0.1, 0.15, clip.duration]) {
    mixer.setTime(time);
    let value;
    clipRoot.traverse((mesh) => {
      if (mesh.morphTargetDictionary?.BlinkLeft !== undefined) value = mesh.morphTargetInfluences[mesh.morphTargetDictionary.BlinkLeft];
    });
    clipWeights.push(value);
  }
  assert(Math.max(...clipWeights) > 0.9);
  assert(clipWeights[0] === 0 && clipWeights.at(-1) < 0.001);
  assert(clip.duration >= 0.15 && clip.duration <= 0.25);
  const fresh = createAvatarMotion(clone(gltf.scene));
  assert.equal(fresh.blinkLeft, 0);
  assert.equal(fresh.blinkRight, 0);

  const report = {
    realAsset: 'avatar_with_blink.glb', skinnedMeshes: meshes.length,
    referenceCases: reference.cases.length, samplesPerEye: reference.basis.Left.length,
    maxReferenceError, maxBaseDrift, automaticOnsets: onsets, primaryIntervals: intervals,
    doubleIntervals: doubles, exportedClipDuration: clip.duration,
    exportedClipWeights: clipWeights, animations: names, freshInstanceOpen: true,
    syntheticMorphsUsed: false,
  };
  await writeFile(new URL('../../../avatar-work/blink-work/runtime-tests.json', import.meta.url), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally {
  await unlink(temporary);
}
