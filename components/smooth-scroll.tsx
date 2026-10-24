"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

// Keep Lenis available for modal scroll locking. Let the browser handle wheel
// and touch inertia directly instead of adding a second 1.4-second easing tail.
export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        smoothWheel: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
