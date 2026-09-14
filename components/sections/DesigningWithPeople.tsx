"use client";

import { useRef } from "react";
import { designingWithPeople as dwp } from "@/data/content";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TimelineRow from "@/components/ui/TimelineRow";
import TimelineLine from "@/components/ui/TimelineLine";
import ParallaxImage from "@/components/ui/ParallaxImage";
import type { SiteImage } from "@/data/content";

/**
 * [5] DESIGNING WITH PEOPLE — three moments on a timeline. Rows stagger in;
 * an SVG line draws itself through the dots as the user scrolls.
 */
export default function DesigningWithPeople({ image }: { image: SiteImage | null }) {
  const list = useRef<HTMLDivElement>(null);
  return (
    <section id="people" aria-label={dwp.ariaLabel} className="px-gutter py-section-y">
      <div className="mx-auto w-full max-w-site">
        <SectionHeader id="people-heading" eyebrow={dwp.eyebrow} headline={dwp.headline} note={dwp.intro} />

        <div className={`mt-16 md:mt-24 ${image ? "grid gap-16 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-24" : ""}`}>
          <div ref={list} className="relative md:ml-8 md:pl-[1.9rem]">
            <TimelineLine containerRef={list} dotSelector="[data-timeline-dot]" />
            <ScrollReveal as="ol" from="up" stagger="li" staggerDelay={0.18} distance={40} className="relative">
              {dwp.moments.map((m, i) => (
                <TimelineRow key={m.period} {...m} isLast={i === dwp.moments.length - 1} />
              ))}
            </ScrollReveal>
          </div>
          {image ? (
            <div className="lg:sticky lg:top-32 lg:self-start">
              <ParallaxImage src={`/${image.file}`} alt={image.alt} aspect={image.aspect} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
