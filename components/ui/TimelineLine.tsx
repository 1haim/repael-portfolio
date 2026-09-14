"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP, registerGsap } from "@/lib/gsap";
import { useMotion } from "@/lib/motion";

type Props = {
  /** The positioned container holding the timeline rows. */
  containerRef: RefObject<HTMLElement>;
  /** Selector for the dot elements whose centres the line passes through. */
  dotSelector: string;
};

type Geometry = { width: number; height: number; d: string };

/**
 * Builds a path through the centre of each timeline dot (measured from the
 * rendered boxes) with a gentle quadratic curve between consecutive points,
 * then draws it with stroke-dashoffset as the user scrolls through the list.
 */
/** Offset of `el` relative to `root`, ignoring CSS transforms (so pending reveals do not skew it). */
function relativeOffset(el: HTMLElement, root: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== root) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

function buildGeometry(container: HTMLElement, dots: HTMLElement[]): Geometry | null {
  const box = { width: container.offsetWidth, height: container.offsetHeight };
  const pts = dots.map((d) => {
    const o = relativeOffset(d, container);
    return { x: o.x + d.offsetWidth / 2, y: o.y + d.offsetHeight / 2 };
  });
  if (pts.length < 2) return null;

  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const bend = Math.min(28, Math.abs(b.y - a.y) * 0.12) * (i % 2 ? 1 : -1);
    const cx = (a.x + b.x) / 2 + bend;
    const cy = (a.y + b.y) / 2;
    d += ` Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
  }
  return { width: box.width, height: box.height, d };
}

export default function TimelineLine({ containerRef, dotSelector }: Props) {
  const path = useRef<SVGPathElement>(null);
  const [geo, setGeo] = useState<Geometry | null>(null);
  const { reduced, ready } = useMotion();

  // Measure from real element boxes; re-measure on resize.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const update = () => {
      const dots = Array.from(container.querySelectorAll<HTMLElement>(dotSelector));
      setGeo(buildGeometry(container, dots));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(container);
    if (document.fonts?.ready) document.fonts.ready.then(update);
    return () => ro.disconnect();
  }, [containerRef, dotSelector]);

  useGSAP(
    () => {
      registerGsap();
      const p = path.current;
      const container = containerRef.current;
      if (!p || !container || !geo || !ready) return;
      const length = p.getTotalLength();
      if (reduced) {
        gsap.set(p, { strokeDasharray: length, strokeDashoffset: 0 });
        return;
      }
      gsap.fromTo(
        p,
        { strokeDasharray: length, strokeDashoffset: length },
        {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top 70%",
            end: "bottom 65%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        },
      );
      ScrollTrigger.refresh();
    },
    { dependencies: [geo, reduced, ready], revertOnUpdate: true },
  );

  if (!geo) return null;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute inset-0 overflow-visible"
      width={geo.width}
      height={geo.height}
      viewBox={`0 0 ${geo.width} ${geo.height}`}
    >
      <path
        ref={path}
        d={geo.d}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
