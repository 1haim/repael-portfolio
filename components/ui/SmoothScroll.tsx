"use client";

import { useEffect } from "react";
import { startLenis, stopLenis } from "@/lib/lenis";
import { useMotion } from "@/lib/motion";

/** Mounts Lenis while animations are enabled; native scrolling when reduced. Renders nothing. */
export default function SmoothScroll() {
  const { reduced, ready } = useMotion();

  useEffect(() => {
    if (!ready) return;
    if (reduced) {
      stopLenis();
      return;
    }
    startLenis();
    return () => stopLenis();
  }, [reduced, ready]);

  return null;
}
