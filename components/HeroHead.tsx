"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { clone } from "three/addons/utils/SkeletonUtils.js";
import { createAvatarMotion } from "../examples/avatar/avatarMotion";
import { useSceneActivity } from "@/lib/use-scene-activity";

function Head() {
  const { scene } = useGLTF("/avatar_with_blink.glb");
  const instance = useMemo(() => clone(scene), [scene]);
  const motion = useMemo(() => createAvatarMotion(instance), [instance]);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = 1 - (event.clientY / window.innerHeight) * 2;
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  useFrame((_, delta) => {
    motion.update(pointer.current.x, pointer.current.y, delta);
  });

  return (
    <group scale={1.35}>
      <primitive object={instance} dispose={null} />
    </group>
  );
}

export default function HeroHead() {
  const container = useRef<HTMLDivElement>(null);
  const active = useSceneActivity(container);
  return (
    <div ref={container} className="w-full h-full">
    <Canvas
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 4.8], fov: 38 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[-3, 5, 5]} intensity={2.2} />
      <directionalLight position={[4, 1, -3]} intensity={1.4} />
      <Suspense fallback={null}>
        <Head />
      </Suspense>
    </Canvas>
    </div>
  );
}
