"use client";

import { useRef } from "react";
import { gsap, useGSAP, registerGsap, scrollOnce } from "@/lib/gsap";
import { useMotion } from "@/lib/motion";

type Props = {
  /** Starting point shown small above the number, e.g. "< $1M" or "16". Optional. */
  from?: string;
  /** Final numeric value to count to. */
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Exact final string shown once settled (and read by screen readers). */
  display: string;
  label: string;
  size?: "md" | "lg";
  dark?: boolean;
  className?: string;
};

const fmt = (n: number, decimals: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/**
 * Oversized stat with a count-up that fires once on ScrollTrigger.
 * The visible number is aria-hidden while a static, visually-hidden copy
 * carries the final value for assistive tech.
 */
export default function StatBlock({
  from,
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  display,
  label,
  size = "md",
  dark = false,
  className = "",
}: Props) {
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const { reduced, ready } = useMotion();

  useGSAP(
    () => {
      registerGsap();
      const el = root.current;
      const target = num.current;
      if (!el || !target || !ready) return;

      if (reduced) {
        target.textContent = display;
        gsap.set(el, { clearProps: "transform,opacity" });
        return;
      }

      const counter = { v: 0 };
      target.textContent = `${prefix}${fmt(0, decimals)}${suffix}`;

      const tl = gsap.timeline({ scrollTrigger: scrollOnce(el) });
      tl.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9 }, 0).to(
        counter,
        {
          v: value,
          duration: 1.6,
          onUpdate: () => {
            target.textContent = `${prefix}${fmt(counter.v, decimals)}${suffix}`;
          },
          onComplete: () => {
            target.textContent = display;
          },
        },
        0.1,
      );
    },
    { scope: root, dependencies: [value, display, reduced, ready], revertOnUpdate: true },
  );

  const numSize =
    size === "lg"
      ? "text-[3.5rem] sm:text-[4.5rem] lg:text-[5.5rem]"
      : "text-[2.75rem] sm:text-[3.25rem] lg:text-[3.75rem]";

  return (
    <div ref={root} data-reveal className={`flex flex-col gap-1 ${className}`}>
      {from ? (
        <span className={`text-sm font-medium tracking-wide ${dark ? "text-muted-dark" : "text-muted"}`}>
          {from}
          <span aria-hidden="true"> →</span>
        </span>
      ) : null}
      <span className={`stat-number ${numSize} ${dark ? "text-white" : "text-ink"}`}>
        <span ref={num} aria-hidden="true">
          {display}
        </span>
        <span className="sr-only">{display}</span>
      </span>
      <span className={`text-sm sm:text-base font-medium ${dark ? "text-muted-dark" : "text-muted"}`}>
        {label}
      </span>
    </div>
  );
}
