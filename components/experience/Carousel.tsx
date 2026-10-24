"use client";

import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Group } from "three";
import gsap from "gsap";
import { animationSettings, getActiveIndex, lerp, planeSettings, speedDrag } from "@/lib/experience-carousel";
import CarouselItem from "./CarouselItem";
import PostProcessing, { type TransmissionMaterial } from "./PostProcessing";
import type { ExperiencePreview } from "../ExperienceCarousel";

export type CarouselProps = {
  items: ExperiencePreview[];
  progressRef: RefObject<number>;
  activePlane: number | null;
  closingPlane: number | null;
  onOpen: (index: number) => void;
  onClose: () => void;
  onActiveChange: (index: number) => void;
  reducedMotion: boolean;
  foreground: string;
  background: string;
};

// Direct port of src/three/Carousel.js. The finite progressRef, pyramid layout,
// frame-based interpolation, input multipliers and post-processing are retained.
export default function Carousel({ items, progressRef, activePlane, closingPlane, onOpen, onClose, onActiveChange, reducedMotion, foreground, background }: CarouselProps) {
  const root = useRef<Group>(null);
  const post = useRef<TransmissionMaterial>(null);
  const previousActivePlane = useRef<number | null>(null);
  const previousIndex = useRef(-1);
  const startX = useRef(0);
  const isDown = useRef(false);
  const travel = useRef(0);
  const oldProgress = useRef(0);
  const speed = useRef(0);
  const movers = useRef<{ x: ReturnType<typeof gsap.quickTo>; y: ReturnType<typeof gsap.quickTo> }[]>([]);
  const { viewport } = useThree();

  useEffect(() => {
    if (activePlane !== null && previousActivePlane.current === null) {
      progressRef.current = items.length > 1 ? (activePlane / (items.length - 1)) * 100 : 0;
    }
    previousActivePlane.current = activePlane;
  }, [activePlane, items.length, progressRef]);

  useLayoutEffect(() => {
    const positions = root.current?.children.map((item) => item.position) ?? [];
    oldProgress.current = progressRef.current;
    speed.current = 0;
    const active = getActiveIndex(progressRef.current, positions.length);
    positions.forEach((position, index) => {
      position.x = (index - active) * (planeSettings.width + planeSettings.gap);
      position.y = -Math.abs(index - active) * .1;
    });
    // Reuse tweens instead of allocating twelve new ones on every frame.
    // Retargeting keeps the source's per-frame easing and pyramid motion.
    movers.current = positions.map((position) => ({
      x: gsap.quickTo(position, "x", animationSettings),
      y: gsap.quickTo(position, "y", animationSettings),
    }));
    return () => {
      positions.forEach((position) => gsap.killTweensOf(position, "x,y"));
      movers.current = [];
    };
  }, [items.length, progressRef]);

  useFrame(() => {
    const children = root.current?.children;
    if (!children?.length) return;
    progressRef.current = Math.max(0, Math.min(progressRef.current, 100));
    const active = getActiveIndex(progressRef.current, children.length);
    children.forEach((item, index) => {
      const x = (index - active) * (planeSettings.width + planeSettings.gap);
      const y = -Math.abs(index - active) * .1;
      if (reducedMotion) {
        item.position.x = x;
        item.position.y = y;
      } else {
        const mover = movers.current[index];
        if (Math.abs(item.position.x - x) > .0001) mover?.x(x);
        if (Math.abs(item.position.y - y) > .0001) mover?.y(y);
      }
    });
    speed.current = lerp(speed.current, Math.abs(oldProgress.current - progressRef.current), .1);
    oldProgress.current = lerp(oldProgress.current, progressRef.current, .1);
    if (post.current) post.current.thickness = reducedMotion ? 0 : speed.current;
    if (active !== previousIndex.current) {
      previousIndex.current = active;
      onActiveChange(active);
    }
  });

  const handleDown = (event: ThreeEvent<PointerEvent>) => {
    if (activePlane !== null || closingPlane !== null) return;
    isDown.current = true;
    startX.current = event.clientX;
    travel.current = 0;
  };
  const handleUp = () => { isDown.current = false; };
  const handleMove = (event: ThreeEvent<PointerEvent>) => {
    if (activePlane !== null || closingPlane !== null || !isDown.current) return;
    const x = event.clientX;
    travel.current += Math.abs(x - startX.current);
    progressRef.current += (x - startX.current) * speedDrag;
    startX.current = x;
  };

  return (
    <group>
      <mesh position={[0, 0, -.01]} onPointerDown={handleDown} onPointerUp={handleUp} onPointerMove={handleMove} onPointerLeave={handleUp} onPointerCancel={handleUp}>
        <planeGeometry args={[viewport.width, viewport.height]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      <group ref={root}>
        {items.map((item, index) => (
          <CarouselItem key={`${item.company}-${index}`} item={item} index={index} activePlane={activePlane} closingPlane={closingPlane} onOpen={(index) => { if (travel.current < 5) onOpen(index); }} onClose={onClose} foreground={foreground} background={background} reducedMotion={reducedMotion} />
        ))}
      </group>
      <PostProcessing ref={post} />
    </group>
  );
}
