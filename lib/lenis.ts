"use client";

import Lenis from "lenis";
import { gsap, ScrollTrigger, registerGsap } from "./gsap";

let lenis: Lenis | null = null;
let tick: ((time: number) => void) | null = null;

/** Start Lenis smooth scroll, synced with ScrollTrigger. Idempotent. */
export function startLenis(): Lenis {
  registerGsap();
  if (lenis) return lenis;

  lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on("scroll", ScrollTrigger.update);
  tick = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

/** Stop Lenis and return to native scrolling. */
export function stopLenis() {
  if (tick) gsap.ticker.remove(tick);
  tick = null;
  lenis?.destroy();
  lenis = null;
  document.documentElement.classList.remove("lenis", "lenis-smooth", "lenis-scrolling", "lenis-stopped");
}

export function getLenis() {
  return lenis;
}

/**
 * Scroll to an element. Smooth through Lenis when animations are enabled,
 * an instant jump when they are reduced. Offset keeps content clear of the nav.
 */
export function scrollToElement(target: HTMLElement, opts: { reduced: boolean; offset?: number }) {
  const offset = opts.offset ?? 0;
  if (!opts.reduced && lenis) {
    lenis.scrollTo(target, { offset: -offset });
    return;
  }
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "auto" });
}
