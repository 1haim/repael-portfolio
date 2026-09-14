"use client";

import Lenis from "lenis";
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from "./gsap";

/**
 * Initialise Lenis smooth scroll and sync it with GSAP ScrollTrigger.
 * Returns a cleanup function. Skipped entirely under reduced motion
 * so the page uses native scrolling.
 */
export function initLenis(): () => void {
  if (typeof window === "undefined") return () => {};
  registerGsap();

  if (prefersReducedMotion()) {
    document.documentElement.classList.add("no-motion");
    return () => {};
  }

  const lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on("scroll", ScrollTrigger.update);

  const tick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    lenis.destroy();
  };
}
