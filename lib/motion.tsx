"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { gsap, ScrollTrigger, registerGsap } from "./gsap";

export const MOTION_STORAGE_KEY = "repael:reduce-motion";
const REDUCED_CLASS = "motion-reduced";
const ENABLED_CLASS = "motion-enabled";

/**
 * Runs inline in <head> before first paint so the page never flashes hidden
 * content for a visitor who wants reduced motion. Order of precedence:
 * saved user choice → OS prefers-reduced-motion.
 */
export const motionInitScript = `(function(){try{var k=${JSON.stringify(
  MOTION_STORAGE_KEY,
)};var s=null;try{s=localStorage.getItem(k)}catch(e){}var r=s===null?window.matchMedia("(prefers-reduced-motion: reduce)").matches:s==="1";document.documentElement.classList.add(r?${JSON.stringify(
  REDUCED_CLASS,
)}:${JSON.stringify(ENABLED_CLASS)})}catch(e){}})();`;

type MotionState = {
  /** True when animations are reduced (OS default or user toggle). */
  reduced: boolean;
  /** True once the client has read the real preference. */
  ready: boolean;
  setReduced: (value: boolean) => void;
};

const MotionContext = createContext<MotionState>({
  reduced: false,
  ready: false,
  setReduced: () => {},
});

function readDomPreference(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains(REDUCED_CLASS);
}

function applyDomClass(reduced: boolean) {
  const cl = document.documentElement.classList;
  cl.toggle(REDUCED_CLASS, reduced);
  cl.toggle(ENABLED_CLASS, !reduced);
}

/** Kill every running GSAP tween and ScrollTrigger so final states can be set directly. */
function killAllMotion() {
  registerGsap();
  ScrollTrigger.getAll().forEach((t) => t.kill(true));
  gsap.globalTimeline.clear();
  gsap.killTweensOf("*");
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const [reduced, setReducedState] = useState(false);
  const [ready, setReady] = useState(false);

  // Read the class the inline script set, after hydration.
  useEffect(() => {
    setReducedState(readDomPreference());
    setReady(true);
  }, []);

  // Follow OS changes only while the visitor has not made an explicit choice.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem(MOTION_STORAGE_KEY);
      } catch {}
      if (saved !== null) return;
      if (e.matches) killAllMotion();
      applyDomClass(e.matches);
      setReducedState(e.matches);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const setReduced = useCallback((value: boolean) => {
    try {
      localStorage.setItem(MOTION_STORAGE_KEY, value ? "1" : "0");
    } catch {}
    if (value) killAllMotion();
    applyDomClass(value);
    setReducedState(value);
    // Let the layout settle, then recalculate trigger positions for rebuilt animations.
    if (!value) requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  const value = useMemo(() => ({ reduced, ready, setReduced }), [reduced, ready, setReduced]);
  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

/** Every animated component reads this and rebuilds when it changes. */
export function useMotion() {
  return useContext(MotionContext);
}
