"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, registerGsap, scrollOnce } from "@/lib/gsap";
import { useMotion } from "@/lib/motion";

type Direction = "up" | "left" | "right";

type Props = {
  children: ReactNode;
  /** Direction the content travels from. */
  from?: Direction;
  /** Animate descendants matching this selector with a stagger. Omit to animate the wrapper itself. */
  stagger?: string;
  staggerDelay?: number;
  delay?: number;
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
 * The universal scroll reveal. Defaults: 40px, 0.9s, site easing, triggers
 * at 80% of the viewport, fires once. Rebuilds when the motion preference
 * changes; in reduced mode it sets final state and creates no tweens.
 */
export default function ScrollReveal({
  children,
  from = "up",
  stagger,
  staggerDelay = 0.12,
  delay = 0,
  distance = 40,
  duration = 0.9,
  as: Tag = "div",
  className,
  id,
  ...rest
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const { reduced, ready } = useMotion();

  useGSAP(
    () => {
      registerGsap();
      const el = ref.current;
      if (!el || !ready) return;

      const targets = stagger ? Array.from(el.querySelectorAll<HTMLElement>(stagger)) : [el];
      if (reduced) {
        gsap.set(targets, { clearProps: "transform,opacity" });
        return;
      }

      const { x, y } = offset(from, distance);
      gsap.fromTo(
        targets,
        { opacity: 0, x, y, willChange: "transform, opacity" },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          stagger: staggerDelay,
          scrollTrigger: scrollOnce(el),
          onComplete: () => gsap.set(targets, { clearProps: "willChange" }),
        },
      );
    },
    { scope: ref, dependencies: [reduced, ready], revertOnUpdate: true },
  );

  const revealAttr = stagger ? {} : { "data-reveal": "" };

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} id={id} className={className} {...revealAttr} {...rest}>
      {children}
    </Tag>
  );
}
