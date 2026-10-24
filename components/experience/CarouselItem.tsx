"use client";

import { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import { Group } from "three";
import gsap from "gsap";
import Plane from "./Plane";
import type { ExperiencePreview } from "../ExperienceCarousel";

type Props = {
  item: ExperiencePreview;
  index: number;
  activePlane: number | null;
  closingPlane: number | null;
  onOpen: (index: number) => void;
  onClose: () => void;
  foreground: string;
  background: string;
  reducedMotion: boolean;
};

// Port of src/three/CarouselItem.js, including the original hover and z timings.
export default function CarouselItem({ item, index, activePlane, closingPlane, onOpen, onClose, foreground, background, reducedMotion }: Props) {
  const root = useRef<Group>(null);
  const [hover, setHover] = useState(false);
  const { viewport } = useThree();
  const active = activePlane === index;

  useEffect(() => {
    const group = root.current;
    if (!group) return;
    gsap.killTweensOf(group.position, "z");
    gsap.to(group.position, {
      z: active ? 0 : -.01,
      duration: reducedMotion ? 0 : .2,
      ease: "power3.out",
      delay: active || reducedMotion ? 0 : 2,
    });
    return () => { gsap.killTweensOf(group.position, "z"); };
  }, [active, reducedMotion]);

  useEffect(() => {
    const group = root.current;
    if (!group) return;
    const hoverScale = hover && !active ? 1.1 : 1;
    gsap.to(group.scale, {
      x: hoverScale,
      y: hoverScale,
      duration: reducedMotion ? 0 : .5,
      ease: "power3.out",
    });
    return () => { gsap.killTweensOf(group.scale); };
  }, [hover, active, reducedMotion]);

  return (
    <group
      ref={root}
      onClick={() => { if (closingPlane === null) onOpen(index); }}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <Plane item={item} index={index} active={active} covered={activePlane !== null && !active} foreground={foreground} background={background} reducedMotion={reducedMotion} />
      {(active || closingPlane === index) && (
        <mesh position={[0, 0, .01]} onClick={(event) => {
          event.stopPropagation();
          if (!active) return;
          setHover(false);
          onClose();
        }}>
          <planeGeometry args={[viewport.width, viewport.height]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      )}
    </group>
  );
}
