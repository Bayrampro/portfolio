"use client";

import { Component, useEffect, useMemo, type ReactNode } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useSeason } from "@/components/SeasonProvider";
import Carousel, { type CarouselProps } from "./experience/Carousel";

type Props = Omit<CarouselProps, "foreground" | "background"> & { onReady: (ready: boolean) => void; running: boolean };

function ContextHealth({ onReady }: Pick<Props, "onReady">) {
  const { gl } = useThree();
  useEffect(() => {
    const canvas = gl.domElement;
    gl.setClearAlpha(0);
    const lost = (event: Event) => { event.preventDefault(); onReady(false); };
    const restored = () => onReady(true);
    canvas.addEventListener("webglcontextlost", lost);
    canvas.addEventListener("webglcontextrestored", restored);
    onReady(true);
    return () => {
      canvas.removeEventListener("webglcontextlost", lost);
      canvas.removeEventListener("webglcontextrestored", restored);
    };
  }, [gl, onReady]);
  return null;
}

class SceneBoundary extends Component<{ children: ReactNode; onReady: Props["onReady"] }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onReady(false); }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function ExperienceScene({ onReady, running, ...props }: Props) {
  const { id } = useSeason();
  const colors = useMemo(() => {
    // The carousel uses the original rendering chain; only artwork colours
    // inherit the portfolio theme, instead of the demo's white background.
    void id;
    const style = getComputedStyle(document.documentElement);
    return {
      foreground: style.getPropertyValue("--ice-200").trim(),
      background: style.getPropertyValue("--background").trim(),
    };
  }, [id]);
  return (
    <SceneBoundary onReady={onReady}>
      {/* Original Canvas defaults: perspective, fov 75, camera at [0, 0, 5]. */}
      <Canvas frameloop={running ? "always" : "never"} gl={{ alpha: true }} fallback={null}>
        <ContextHealth onReady={onReady} />
        <Carousel {...props} {...colors} />
      </Canvas>
    </SceneBoundary>
  );
}
