"use client";

import { forwardRef, useImperativeHandle, useLayoutEffect, useRef } from "react";
import { useThree, type ThreeElements } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import type { MeshPhysicalMaterial } from "three";
import { preserveTransmissionAlpha } from "./transmissionAlpha";

export type TransmissionMaterial = ThreeElements["meshTransmissionMaterial"] & { thickness: number };

// Original refraction, with transparency and unlit brand artwork colours preserved.
const PostProcessing = forwardRef<TransmissionMaterial>(function PostProcessing(_, ref) {
  const { viewport } = useThree();
  const materialRef = useRef<TransmissionMaterial>(null);
  useImperativeHandle(ref, () => materialRef.current!, []);
  useLayoutEffect(() => {
    const material = materialRef.current as unknown as MeshPhysicalMaterial;
    const compile = material.onBeforeCompile;
    const cacheKey = material.customProgramCacheKey;
    material.onBeforeCompile = (shader, renderer) => {
      compile.call(material, shader, renderer);
      shader.fragmentShader = preserveTransmissionAlpha(shader.fragmentShader);
    };
    material.customProgramCacheKey = () => `${cacheKey.call(material)}-carousel-alpha`;
    material.needsUpdate = true;
    return () => {
      material.onBeforeCompile = compile;
      material.customProgramCacheKey = cacheKey;
    };
  }, []);
  return (
    <mesh position={[0, 0, 1]}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <MeshTransmissionMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        transmission={1}
        toneMapped={false}
        roughness={0}
        thickness={0}
        chromaticAberration={.06}
        anisotropy={0}
        ior={.9}
      />
    </mesh>
  );
});

export default PostProcessing;
