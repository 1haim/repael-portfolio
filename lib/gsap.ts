"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

/** The single easing used site-wide: cubic-bezier(0.16, 1, 0.3, 1). No bounce. */
export const EASE = "siteEase";

let registered = false;

/** Register plugins once, on the client only. */
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, CustomEase, useGSAP);
  CustomEase.create(EASE, "0.16, 1, 0.3, 1");
  gsap.defaults({ ease: EASE, duration: 1 });
  registered = true;
}

/** True when the visitor prefers reduced motion. All GSAP is skipped. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Default ScrollTrigger config: fire once, when the element is 80% up the viewport. */
export const scrollOnce = (trigger: Element) => ({
  trigger,
  start: "top 80%",
  once: true,
});

export { gsap, ScrollTrigger, useGSAP };
