"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig, useReducedMotion } from "framer-motion";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  return (
    <MotionConfig reducedMotion="user">
      {reducedMotion ? children : <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true, anchors: { offset: -95 } }}>{children}</ReactLenis>}
    </MotionConfig>
  );
}
