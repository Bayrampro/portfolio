"use client";

import { useEffect, useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { Color, ShaderMaterial, Vector2 } from "three";
import gsap from "gsap";
import { animationSettings, planeSettings } from "@/lib/experience-carousel";
import { vertexShader, fragmentShader } from "./shaders";
import { createLogoTexture } from "./textures";
import type { ExperiencePreview } from "../ExperienceCarousel";

type Props = {
  item: ExperiencePreview;
  index: number;
  active: boolean;
  covered: boolean;
  foreground: string;
  background: string;
  reducedMotion: boolean;
};

// Port of src/three/Plane.js. Geometry and expansion are the original source.
export default function Plane({ item, active, covered, background, reducedMotion }: Props) {
  const material = useRef<ShaderMaterial>(null);
  const { viewport } = useThree();
  const { width, height } = planeSettings;
  const logo = useMemo(() => createLogoTexture(item, background), [item, background]);
  const uniforms = useMemo(() => ({
    uProgress: { value: 0 },
    uZoomScale: { value: new Vector2(1, 1) },
    uTex: { value: logo.texture },
    uRes: { value: new Vector2(1, 1) },
    uImageRes: { value: new Vector2(600, 1500) },
    uContent: { value: 0 },
    uOpacity: { value: 1 },
    uSurface: { value: new Color(background) },
  }), [logo, background]);

  useEffect(() => () => logo.dispose(), [logo]);
  useEffect(() => {
    const opacity = material.current?.uniforms.uOpacity;
    if (!opacity) return;
    gsap.to(opacity, {
      value: covered ? 0 : 1,
      duration: reducedMotion ? 0 : .4,
      delay: covered && !reducedMotion ? 1.4 : 0,
      ease: "power3.out",
    });
    return () => { gsap.killTweensOf(opacity); };
  }, [covered, reducedMotion, logo]);
  useEffect(() => {
    const shader = material.current;
    if (!shader) return;
    const u = shader.uniforms;
    u.uZoomScale.value.set(viewport.width / width, viewport.height / height);
    const timing = { ...animationSettings, duration: reducedMotion ? 0 : animationSettings.duration };
    gsap.to(u.uProgress, { ...timing, value: active ? 1 : 0 });
    gsap.to(u.uRes.value, {
      ...timing,
      x: active ? viewport.width : width,
      y: active ? viewport.height : height,
    });
    // Content substitution only: the logo disappears when the original expansion completes.
    gsap.to(u.uContent, {
      value: active ? 1 : 0,
      duration: reducedMotion ? 0 : .4,
      delay: active && !reducedMotion ? 1.4 : 0,
      ease: "power3.out",
    });
    return () => {
      gsap.killTweensOf([u.uProgress, u.uRes.value, u.uContent]);
    };
  }, [active, viewport, width, height, logo, reducedMotion]);

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[width, height, 30, 30]} />
      <shaderMaterial ref={material} uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} toneMapped={false} transparent depthWrite={false} />
    </mesh>
  );
}
