"use client";

import { useRef } from "react";
import { hero, site } from "@/data/content";
import StatBlock from "@/components/ui/StatBlock";
import { gsap, useGSAP, registerGsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * [1] HERO — above the fold. No image, no video, no texture.
 * Entrance: one stagger reveal per line, fires once on load. Never re-triggers.
 * Stats below reveal independently on ScrollTrigger (StatBlock).
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const lines = gsap.utils.toArray<HTMLElement>("[data-hero-line]");
      if (prefersReducedMotion()) {
        gsap.set(lines, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        lines,
        { opacity: 0, y: 56 },
        { opacity: 1, y: 0, duration: 1.4, stagger: 0.14, delay: 0.15 },
      );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="top"
      aria-label={hero.ariaLabel}
      className="relative flex min-h-[100svh] flex-col justify-between px-gutter pt-[clamp(5rem,14vh,9rem)] pb-[clamp(2.5rem,6vh,4rem)]"
    >
      <div className="mx-auto w-full max-w-site">
        <h1 className="display text-ink text-[clamp(2.75rem,8vw,7.5rem)]">
          {hero.nameLines.map((line, i) => (
            <span key={line} data-hero-line data-reveal className="block">
              {line}
              {i < hero.nameLines.length - 1 ? " " : ""}
            </span>
          ))}
        </h1>

        <p
          data-hero-line
          data-reveal
          className="mt-8 max-w-[28ch] text-[clamp(1.25rem,2.2vw,1.875rem)] font-semibold leading-tight tracking-tight text-ink sm:mt-10"
        >
          {hero.position}
        </p>
        <p
          data-hero-line
          data-reveal
          className="mt-4 max-w-measure text-base leading-relaxed text-muted sm:text-lg"
        >
          {hero.subline}
        </p>
      </div>

      <div className="mx-auto mt-16 w-full max-w-site sm:mt-20">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-10 border-t rule pt-8 md:grid-cols-4 md:gap-x-10">
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

        <address
          data-hero-line
          data-reveal
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
        </address>
      </div>
    </section>
  );
}
