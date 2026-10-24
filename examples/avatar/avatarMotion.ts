import { Bone, MathUtils, Object3D, Quaternion, Vector3 } from 'three';
import type { Mesh } from 'three';

/** Works on one independently cloned skeleton. Do not run HeadLookTest concurrently. */
export function createAvatarMotion(root: Object3D, random = Math.random) {
  const head = root.getObjectByName('Head');
  const neck = root.getObjectByName('Neck');
  if (!(head instanceof Bone) || !(neck instanceof Bone)) {
    throw new Error('Avatar requires Head and Neck bones.');
  }

  const rest = head.quaternion.clone();
  const target = new Quaternion();
  const yaw = new Quaternion();
  const pitch = new Quaternion();
  const up = new Vector3(0, 1, 0);
  const right = new Vector3(1, 0, 0);
  type Target = { mesh: Mesh; index: number };
  const channels = {
    Left: { main: [] as Target[], curves: [[], [], []] as Target[][] },
    Right: { main: [] as Target[], curves: [[], [], []] as Target[][] },
  };
  root.traverse((object) => {
    const mesh = object as Mesh;
    if (!mesh.isMesh || !mesh.morphTargetDictionary || !mesh.morphTargetInfluences) return;
    for (const side of ['Left', 'Right'] as const) {
      const index = mesh.morphTargetDictionary['Blink' + side];
      if (index !== undefined) channels[side].main.push({ mesh, index });
      for (let i = 0; i < 3; i++) {
        const curveIndex = mesh.morphTargetDictionary['Blink' + side + 'Curve' + (i + 1) * 25];
        if (curveIndex !== undefined) channels[side].curves[i].push({ mesh, index: curveIndex });
      }
    }
  });
  const blinkAvailable = channels.Left.main.length > 0 && channels.Right.main.length > 0;
  function applyEye(side: 'Left' | 'Right', value: number) {
    const weight = MathUtils.clamp(value, 0, 1);
    for (const { mesh, index } of channels[side].main) mesh.morphTargetInfluences![index] = weight;
    for (let i = 0; i < 3; i++) {
      const correction = Math.max(0, 1 - Math.abs(weight - (i + 1) * 0.25) / 0.25);
      for (const { mesh, index } of channels[side].curves[i]) mesh.morphTargetInfluences![index] = correction;
    }
  }
  let time = 0;
  let nextBlink = 2 + random() * 4;
  let doubleBlinkAt = Infinity;
  let blinkStart = -Infinity;
  let manualLeft: number | null = null;
  let manualRight: number | null = null;
  let currentLeft = 0;
  let currentRight = 0;
  applyEye('Left', 0);
  applyEye('Right', 0);

  return {
    blinkAvailable,
    /** 0=open, 1=closed; null resumes automatic blinking for that eye. */
    setBlink(left: number | null, right: number | null) {
      manualLeft = left;
      manualRight = right;
    },
    get blinkLeft() { return currentLeft; },
    get blinkRight() { return currentRight; },
    update(pointerX: number, pointerY: number, delta: number) {
      const dt = Math.min(Math.max(delta, 0), 0.1);
      time += dt;
      yaw.setFromAxisAngle(up, MathUtils.clamp(pointerX, -1, 1) * MathUtils.degToRad(25));
      pitch.setFromAxisAngle(right, -MathUtils.clamp(pointerY, -1, 1) * MathUtils.degToRad(15));
      target.copy(rest).multiply(yaw).multiply(pitch);
      head.quaternion.slerp(target, 1 - Math.exp(-8 * dt));
      // Neck is never animated; its weighted base stays fixed.
      if (!blinkAvailable) return;
      if (time >= doubleBlinkAt) {
        blinkStart = time;
        doubleBlinkAt = Infinity;
      } else if (time >= nextBlink) {
        blinkStart = time;
        nextBlink = time + 2 + random() * 4;
        if (random() < 0.18) doubleBlinkAt = time + 0.32 + random() * 0.08;
      }
      const age = time - blinkStart;
      let weight = 0;
      if (age >= 0 && age < 0.07) weight = MathUtils.smoothstep(age, 0, 0.07);
      else if (age < 0.095) weight = 1;
      else if (age < 0.22) weight = 1 - MathUtils.smoothstep(age, 0.095, 0.22);
      currentLeft = MathUtils.clamp(manualLeft ?? weight, 0, 1);
      currentRight = MathUtils.clamp(manualRight ?? weight, 0, 1);
      applyEye('Left', currentLeft);
      applyEye('Right', currentRight);
    },
  };
}
