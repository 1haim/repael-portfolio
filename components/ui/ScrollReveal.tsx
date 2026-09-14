"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, registerGsap, prefersReducedMotion, scrollOnce } from "@/lib/gsap";

type Direction = "up" | "left" | "right";

type Props = {
  children: ReactNode;
  /** Direction the content travels from. */
  from?: Direction;
  /** Animate direct children matching this selector with a stagger. Omit to animate the wrapper itself. */
  stagger?: string;
  staggerDelay?: number;
  distance?: number;
  duration?: number;
  as?: ElementType;
  className?: string;
  id?: string;
  "aria-label"?: string;
};

const offset = (from: Direction, distance: number) => {
  if (from === "left") return { x: -distance, y: 0 };
  if (from === "right") return { x: distance, y: 0 };
  return { x: 0, y: distance };
};

/**
 * One scroll-triggered animation per wrapper. Fires once.
 * All GSAP is skipped under prefers-reduced-motion; content is shown via CSS.
 */
export default function ScrollReveal({
  children,
  from = "up",
  stagger,
  staggerDelay = 0.12,
  distance = 40,
  duration = 1.1,
  as: Tag = "div",
  className,
  id,
  ...rest
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const el = ref.current;
      if (!el) return;

      const targets = stagger ? Array.from(el.querySelectorAll<HTMLElement>(stagger)) : [el];
      if (prefersReducedMotion()) {
        gsap.set(targets, { clearProps: "all", opacity: 1 });
        return;
      }

      const { x, y } = offset(from, distance);
      gsap.fromTo(
        targets,
        { opacity: 0, x, y },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          stagger: staggerDelay,
          scrollTrigger: scrollOnce(el),
        },
      );
    },
    { scope: ref },
  );

  const revealAttr = stagger ? {} : { "data-reveal": "" };

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} id={id} className={className} {...revealAttr} {...rest}>
      {children}
    </Tag>
  );
}
