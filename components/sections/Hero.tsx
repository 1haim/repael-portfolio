"use client";

import { useRef } from "react";
import { hero, site } from "@/data/content";
import StatBlock from "@/components/ui/StatBlock";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { gsap, useGSAP, registerGsap } from "@/lib/gsap";
import { useMotion } from "@/lib/motion";

/** Page-space offset that ignores CSS transforms (offsetParent chain). */
function pageOffset(el: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

const NAME_SLOT_OFFSET = 120; // px from viewport top where the name lands

/**
 * [1] HERO
 * Load: the name sits centred in a full-height frame, positioning line below.
 * Scroll: the name travels to its resting slot at the top of the next block
 * with a scrubbed, lagging ("liquid") motion — x, y, scale and letter-spacing
 * together, plus a barely-visible per-character ripple.
 * Reduced motion: the frame stays static; the resting slot is hidden.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const name = useRef<HTMLHeadingElement>(null);
  const position = useRef<HTMLParagraphElement>(null);
  const slot = useRef<HTMLDivElement>(null);
  const { reduced, ready } = useMotion();

  useGSAP(
    () => {
      registerGsap();
      const section = root.current;
      const h1 = name.current;
      const target = slot.current;
      const pos = position.current;
      if (!section || !h1 || !target || !pos || !ready) return;

      if (reduced) {
        gsap.set([h1, pos], { clearProps: "all" });
        return;
      }

      const chars = gsap.utils.toArray<HTMLElement>("[data-hero-char]", h1);

      const measure = () => {
        const a = pageOffset(h1);
        const b = pageOffset(target);
        const scale =
          parseFloat(getComputedStyle(target).fontSize) / parseFloat(getComputedStyle(h1).fontSize);
        return { x: b.x - a.x, y: b.y - a.y, scale, end: Math.max(1, b.y - NAME_SLOT_OFFSET) };
      };

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${measure().end}`,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        h1,
        {
          x: () => measure().x,
          y: () => measure().y,
          scale: () => measure().scale,
          letterSpacing: "-0.04em",
          transformOrigin: "0 0",
          duration: 1,
        },
        0,
      )
        .to(pos, { opacity: 0, y: 24, duration: 0.35 }, 0)
        .to(
          chars,
          { keyframes: [{ y: 0 }, { y: 7 }, { y: 0 }], duration: 0.6, stagger: 0.015, ease: "power2.inOut" },
          0.08,
        );
    },
    { scope: root, dependencies: [reduced, ready], revertOnUpdate: true },
  );

  const renderLines = (attr: string) =>
    hero.nameLines.map((line, li) => (
      <span key={line} className="block">
        {line.split("").map((ch, ci) =>
          ch === " " ? (
            <span key={ci} className="inline-block w-[0.22em]" />
          ) : (
            <span key={ci} {...{ [attr]: "" }} className="inline-block">
              {ch}
            </span>
          ),
        )}
        {li < hero.nameLines.length - 1 ? " " : ""}
      </span>
    ));

  return (
    <section ref={root} id="top" aria-label={hero.ariaLabel} className="relative">
      {/* Opening frame */}
      <div className="flex min-h-[100svh] flex-col items-center justify-center px-gutter pb-16 pt-nav text-center">
        <h1
          ref={name}
          className="display inline-block text-left text-[clamp(3.25rem,12vw,11.25rem)] leading-[0.98] text-ink"
        >
          <span className="sr-only">{hero.name}</span>
          <span aria-hidden="true">{renderLines("data-hero-char")}</span>
        </h1>
        <p ref={position} className="lead mt-8 max-w-[34ch] text-[clamp(1.125rem,1.8vw,1.625rem)] text-muted">
          {hero.position}
        </p>
      </div>

      {/* Resting block */}
      <div className="px-gutter pb-[clamp(3rem,8vh,6rem)] pt-[clamp(6rem,14vh,9rem)]">
        <div className="mx-auto w-full max-w-site">
          {/* Invisible slot that reserves the name's landing box */}
          <div
            ref={slot}
            data-hero-slot
            aria-hidden="true"
            className="display invisible inline-block text-left text-[clamp(2.5rem,4.6vw,4.25rem)] leading-[0.98] tracking-[-0.04em]"
          >
            {renderLines("data-hero-slot-char")}
          </div>

          <ScrollReveal from="up" className="mt-8">
            <p className="lead max-w-measure text-[1.25rem] text-ink sm:text-[1.5rem]">{hero.subline}</p>
          </ScrollReveal>

          <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 border-t rule pt-8 md:grid-cols-4 md:gap-x-10">
            {hero.stats.map((s) => (
              <li key={s.label} className="min-w-0">
                <StatBlock
                  from={s.from || undefined}
                  value={s.value}
                  decimals={"decimals" in s ? s.decimals : 0}
                  prefix={s.display.startsWith("$") ? "$" : ""}
                  suffix={s.unit}
                  display={s.display}
                  label={s.label}
                />
              </li>
            ))}
          </ul>

          <ScrollReveal
            as="address"
            from="up"
            className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm not-italic text-muted sm:text-base"
          >
            <span>{site.location}</span>
            <span aria-hidden="true">·</span>
            <a className="inline-link" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <span aria-hidden="true">·</span>
            <a className="inline-link" href={site.linkedinUrl} rel="me noopener" target="_blank">
              {site.linkedin}
              <span className="sr-only">{site.ui.newTab}</span>
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
