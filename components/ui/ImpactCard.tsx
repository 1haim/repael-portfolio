"use client";

import { useRef } from "react";
import { gsap, useGSAP, registerGsap, scrollOnce } from "@/lib/gsap";
import { useMotion } from "@/lib/motion";

type Props = {
  index: number;
  title: string;
  value: number;
  decimals: number;
  prefix: string;
  suffix: string;
  headline: string;
  sub: string;
  detail: string;
  context: string;
  creditLabel: string;
  credit: string;
};

const fmt = (n: number, decimals: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/**
 * One experiment result. Enters with an index-based stagger and counts
 * its headline number up, in a single timeline that fires once on scroll.
 */
export default function ImpactCard({
  index,
  title,
  value,
  decimals,
  prefix,
  suffix,
  headline,
  sub,
  detail,
  context,
  creditLabel,
  credit,
}: Props) {
  const root = useRef<HTMLLIElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const { reduced, ready } = useMotion();

  useGSAP(
    () => {
      registerGsap();
      const el = root.current;
      const target = num.current;
      if (!el || !target || !ready) return;

      if (reduced) {
        target.textContent = headline;
        gsap.set(el, { clearProps: "transform,opacity" });
        return;
      }

      const counter = { v: 0 };
      target.textContent = `${prefix}${fmt(0, decimals)}${suffix}`;

      const tl = gsap.timeline({ scrollTrigger: scrollOnce(el), delay: index * 0.15 });
      tl.fromTo(el, { opacity: 0, y: 48 }, { opacity: 1, y: 0, duration: 1.1 }, 0).to(
        counter,
        {
          v: value,
          duration: 1.6,
          onUpdate: () => {
            target.textContent = `${prefix}${fmt(counter.v, decimals)}${suffix}`;
          },
          onComplete: () => {
            target.textContent = headline;
          },
        },
        0.2,
      );
    },
    { scope: root, dependencies: [reduced, ready], revertOnUpdate: true },
  );

  return (
    <li
      ref={root}
      data-reveal
      className="flex flex-col border-t border-white/20 pt-7 md:min-h-[26rem]"
    >
      <h3 className="text-sm font-medium uppercase tracking-[0.12em] text-accent-dark">{title}</h3>

      <p className="mt-10 md:mt-14">
        <span className="stat-number block text-[3.75rem] text-white sm:text-[4.5rem] lg:text-[5.25rem]">
          <span ref={num} aria-hidden="true">
            {headline}
          </span>
          <span className="sr-only">{headline}</span>
        </span>
        <span className="mt-2 block text-lg font-medium text-white sm:text-xl">{sub}</span>
      </p>

      <p className="mt-6 text-base text-muted-dark">{detail}</p>
      <p className="mt-2 text-base text-muted-dark">{context}</p>

      <p className="mt-auto pt-8 text-sm text-muted-dark">
        <span className="font-medium text-white/70">{creditLabel}</span>
        <span aria-hidden="true"> · </span>
        {credit}
      </p>
    </li>
  );
}
