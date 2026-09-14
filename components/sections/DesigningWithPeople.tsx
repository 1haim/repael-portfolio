import { designingWithPeople as dwp } from "@/data/content";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TimelineRow from "@/components/ui/TimelineRow";

/** [5] DESIGNING WITH PEOPLE — timeline of three moments, rows stagger in on scroll. */
export default function DesigningWithPeople() {
  return (
    <section id="people" aria-label={dwp.ariaLabel} className="px-gutter py-section-y">
      <div className="mx-auto w-full max-w-site">
        <SectionHeader id="people-heading" eyebrow={dwp.eyebrow} headline={dwp.headline} note={dwp.intro} />

        <ScrollReveal
          as="ol"
          from="up"
          stagger="li"
          staggerDelay={0.18}
          distance={40}
          className="relative mt-16 md:mt-24 md:ml-8 md:border-l md:border-[color:var(--rule)] md:pl-[1.9rem]"
        >
          {dwp.moments.map((m, i) => (
            <TimelineRow key={m.period} {...m} isLast={i === dwp.moments.length - 1} />
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
