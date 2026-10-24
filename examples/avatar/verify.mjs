// Run from project root: node examples/avatar/verify.mjs
import assert from 'node:assert/strict';
import { readFile, writeFile, unlink } from 'node:fs/promises';
import ts from 'typescript';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { clone } from 'three/addons/utils/SkeletonUtils.js';
import { BufferGeometry, Mesh, Quaternion, Vector3 } from 'three';

const temporaryModule = new URL('./.avatarMotion-verify.mjs', import.meta.url);
const source = await readFile(new URL('./avatarMotion.ts', import.meta.url), 'utf8');
await writeFile(temporaryModule, ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText);

try {
  const { createAvatarMotion } = await import(temporaryModule.href);
  // Node has no image decoder. Texture payloads are separately checked byte-for-byte
  // and visually rendered in Blender. This test checks loading, joints, and CPU skinning.
  globalThis.self = globalThis;
  globalThis.createImageBitmap = async () => ({ width: 2048, height: 2048, close() {} });
  globalThis.ProgressEvent ??= class ProgressEvent {};
  const bytes = await readFile(new URL('../../public/avatar_animated.glb', import.meta.url));
  const gltf = await new GLTFLoader().parseAsync(
    bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength), '',
  );
  assert.deepEqual(gltf.animations.map((a) => a.name), ['HeadLookTest']);
  const instance = clone(gltf.scene);
  const secondInstance = clone(gltf.scene);
  const head = instance.getObjectByName('Head');
  const neck = instance.getObjectByName('Neck');
  const restHead = head.quaternion.clone();
  const restNeck = neck.quaternion.clone();
  const restNeckPosition = neck.position.clone();
  let mesh;
  instance.traverse((object) => { if (object.isSkinnedMesh) mesh = object; });
  assert(mesh);
  const motion = createAvatarMotion(instance, () => 0.5);
  assert.equal(motion.blinkAvailable, false);
  assert.equal(mesh.morphTargetInfluences, undefined);
  instance.updateMatrixWorld(true);
  mesh.skeleton.update();
  const position = mesh.geometry.attributes.position;
  const weights = mesh.geometry.attributes.skinWeight;
  const joints = mesh.geometry.attributes.skinIndex;
  const headIndex = mesh.skeleton.bones.indexOf(head);
  const base = [];
  const rigid = [];
  for (let i = 0; i < position.count; i++) {
    let weight = 0;
    for (let j = 0; j < 4; j++) {
      if (joints.getComponent(i, j) === headIndex) weight += weights.getComponent(i, j);
    }
    const point = mesh.applyBoneTransform(i, new Vector3().fromBufferAttribute(position, i));
    if (weight === 0) base.push({ i, point });
    if (weight === 1) rigid.push({ i, point });
  }
  assert(base.length >= 367);
  const initialHeadInverse = head.matrixWorld.clone().invert();
  let maxBaseDrift = 0;
  let maxRigidError = 0;
  for (const [x, y] of [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [1, -1], [-1, 1], [1, 1], [2, 2]]) {
    for (let i = 0; i < 360; i++) motion.update(x, y, 1 / 60);
    instance.updateMatrixWorld(true);
    mesh.skeleton.update();
    const transform = head.matrixWorld.clone().multiply(initialHeadInverse);
    for (const { i, point } of base) {
      const actual = mesh.applyBoneTransform(i, new Vector3().fromBufferAttribute(position, i));
      maxBaseDrift = Math.max(maxBaseDrift, actual.distanceTo(point));
    }
    for (const { i, point } of rigid) {
      const actual = mesh.applyBoneTransform(i, new Vector3().fromBufferAttribute(position, i));
      maxRigidError = Math.max(maxRigidError, actual.distanceTo(point.clone().applyMatrix4(transform)));
    }
  }
  assert(maxBaseDrift < 0.000002);
  assert(maxRigidError < 0.000002);
  assert(neck.quaternion.angleTo(restNeck) < 1e-7);
  assert(neck.position.distanceTo(restNeckPosition) < 1e-7);
  assert(secondInstance.getObjectByName('Head').quaternion.angleTo(restHead) < 1e-7);
  const expected = restHead.clone()
    .multiply(new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), 25 * Math.PI / 180))
    .multiply(new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), -15 * Math.PI / 180));
  assert(head.quaternion.angleTo(expected) < 1e-6);

  // Exercise only the future-target scheduling branch, never claim a real eyelid blink.
  const synthetic = new Mesh(new BufferGeometry());
  synthetic.morphTargetDictionary = { BlinkLeft: 0, BlinkRight: 1 };
  synthetic.morphTargetInfluences = [0, 0];
  secondInstance.add(synthetic);
  const randomValues = [0.1, 0.8, 0.2, 0.6];
  let randomIndex = 0;
  const blinking = createAvatarMotion(secondInstance, () => randomValues[randomIndex++ % randomValues.length]);
  assert.equal(blinking.blinkAvailable, true);
  const blinkOnsets = [];
  let previous = 0;
  let peak = 0;
  for (let i = 0; i < 2400; i++) {
    blinking.update(0, 0, 1 / 120);
    const [left, right] = synthetic.morphTargetInfluences;
    assert.equal(left, right);
    assert(left >= 0 && left <= 1);
    peak = Math.max(peak, left);
    if (left > 0 && previous === 0) blinkOnsets.push((i + 1) / 120);
    previous = left;
  }
  assert.equal(peak, 1);
  assert(blinkOnsets.length >= 3);
  const intervals = blinkOnsets.slice(1).map((time, i) => time - blinkOnsets[i]);
  const primary = blinkOnsets.filter((time, i) => i === 0 || time - blinkOnsets[i - 1] > 1);
  const primaryIntervals = primary.slice(1).map((time, i) => time - primary[i]);
  assert(primaryIntervals.every((value) => value >= 2 && value <= 6.02));
  assert(new Set(primaryIntervals.map((value) => value.toFixed(1))).size > 1);
  const report = {
    loader: 'Three.js GLTFLoader; image decoding stubbed only in Node',
    animation: gltf.animations[0].name,
    skinnedVertices: position.count, fixedBaseVertices: base.length,
    maxBaseDrift, maxRigidError, skeletonClonesIndependent: true,
    runtimeBlinkAvailable: motion.blinkAvailable,
    syntheticBlinkOnsets: blinkOnsets,
    syntheticBlinkIntervals: intervals,
    note: 'Synthetic scheduling test does not validate eyelid geometry or appearance.',
  };
  await writeFile(new URL('../../../avatar-work/three-runtime-tests.json', import.meta.url), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally {
  await unlink(temporaryModule);
}
