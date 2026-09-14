"use client";

import { useRef } from "react";
import { gsap, useGSAP, registerGsap } from "@/lib/gsap";
import { useMotion } from "@/lib/motion";

type Props = { dark?: boolean };

/**
 * Section transition: a 1.5px line that draws itself across the content
 * width as it passes through the viewport (stroke-dashoffset, scrubbed).
 * Decorative only.
 */
export default function SectionRule({ dark = false }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const line = useRef<SVGLineElement>(null);
  const { reduced, ready } = useMotion();

  useGSAP(
    () => {
      registerGsap();
      const el = root.current;
      const l = line.current;
      if (!el || !l || !ready) return;
      if (reduced) {
        gsap.set(l, { strokeDasharray: "none", strokeDashoffset: 0 });
        return;
      }
      // pathLength="1" lets us animate in unit space regardless of width.
      gsap.fromTo(
        l,
        { strokeDasharray: 1, strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 92%", end: "top 45%", scrub: 1 },
        },
      );
    },
    { scope: root, dependencies: [reduced, ready], revertOnUpdate: true },
  );

  return (
    <div ref={root} aria-hidden="true" className={`px-gutter ${dark ? "on-dark bg-bg-dark" : ""}`}>
      <svg className="mx-auto block h-[2px] w-full max-w-site" preserveAspectRatio="none" viewBox="0 0 100 2">
        <line
          ref={line}
          x1="0"
          y1="1"
          x2="100"
          y2="1"
          pathLength="1"
          stroke={dark ? "var(--accent-on-dark)" : "var(--accent)"}
          strokeWidth="1.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
