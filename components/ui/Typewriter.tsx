"use client";

import { useRef, type ElementType } from "react";
import { gsap, useGSAP, registerGsap } from "@/lib/gsap";
import { useMotion } from "@/lib/motion";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  /** Dark background: characters settle on the off-white instead of ink. */
  dark?: boolean;
  /** Delay before the first character, seconds. */
  delay?: number;
};

const SEQUENCE = ["#FFFFFF", "#F4B3C2", "#E8853A", "#7A4A2A"];

/**
 * Character-by-character reveal with a colour ride: white → pink → orange →
 * brown → settle. Fires once at 80% of the viewport.
 *
 * Accessibility: the complete string is always in the DOM as a single
 * visually-hidden text node; the animated characters are aria-hidden, so a
 * screen reader never hears the line one letter at a time. (aria-label is not
 * used because naming is prohibited on paragraph/generic roles.)
 *
 * Reading rule: the stagger adapts to length so a long line completes in
 * roughly 2.5 s — 25–30 ms per character for a short line, tighter for a paragraph.
 */
export default function Typewriter({ text, as: Tag = "p", className = "", dark = false, delay = 0 }: Props) {
  const root = useRef<HTMLElement>(null);
  const { reduced, ready } = useMotion();

  useGSAP(
    () => {
      registerGsap();
      const el = root.current;
      if (!el || !ready) return;
      const chars = gsap.utils.toArray<HTMLElement>(".tw-char", el);
      if (!chars.length) return;

      if (reduced) {
        gsap.set(chars, { clearProps: "all" });
        return;
      }

      const settle = dark ? "#F5F4F1" : "#1A1A1A";
      const stagger = gsap.utils.clamp(0.012, 0.03, 2.4 / chars.length);

      gsap.set(chars, { opacity: 0, color: SEQUENCE[0] });
      gsap.to(chars, {
        keyframes: [
          { opacity: 1, color: SEQUENCE[0], duration: 0.08 },
          { color: SEQUENCE[1], duration: 0.12 },
          { color: SEQUENCE[2], duration: 0.12 },
          { color: SEQUENCE[3], duration: 0.1 },
          { color: settle, duration: 0.1 },
        ],
        ease: "none",
        stagger,
        delay,
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
        onComplete: () => gsap.set(chars, { clearProps: "color" }),
      });
    },
    { scope: root, dependencies: [reduced, ready, text], revertOnUpdate: true },
  );

  const words = text.split(" ");

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={root as any} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wi) => (
          <span key={wi} className="inline-block whitespace-nowrap">
            {word.split("").map((ch, ci) => (
              <span key={ci} className="tw-char inline-block">
                {ch}
              </span>
            ))}
            {wi < words.length - 1 ? <span className="tw-char inline-block">&nbsp;</span> : null}
          </span>
        ))}
      </span>
    </Tag>
  );
}
