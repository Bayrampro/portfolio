"use client";

import { useEffect, useState, type RefObject } from "react";

/** Keep WebGL contexts mounted, but stop their frame loops outside the viewport. */
export function useSceneActivity(ref: RefObject<HTMLElement | null>, enabled = true) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let intersecting = false;
    const sync = () => setActive(intersecting && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      intersecting = entry.isIntersecting;
      sync();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [ref]);

  return enabled && active;
}
