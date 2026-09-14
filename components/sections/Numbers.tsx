import { numbers } from "@/data/content";
import SectionHeader from "@/components/ui/SectionHeader";
import ImpactCard from "@/components/ui/ImpactCard";
import ScrollReveal from "@/components/ui/ScrollReveal";

/**
 * [3] THE NUMBERS — the one dark section. Three data-warehouse-validated
 * experiments; cards enter staggered and count up on scroll.
 */
export default function Numbers() {
  return (
    <section
      id="numbers"
      aria-label={numbers.ariaLabel}
      className="on-dark bg-bg-dark px-gutter py-section-y text-white"
    >
      <div className="mx-auto w-full max-w-site">
        <SectionHeader id="numbers-heading" eyebrow={numbers.eyebrow} headline={numbers.headline} note={numbers.note} dark />

        <ul className="mt-16 grid gap-12 md:mt-24 md:grid-cols-3 md:gap-10 lg:gap-14">
          {numbers.cards.map((card, i) => (
            <ImpactCard key={card.title} index={i} creditLabel={numbers.creditLabel} {...card} />
          ))}
        </ul>

        <ScrollReveal
          from="up"
          distance={40}
          className="mt-20 grid gap-6 border-t border-white/20 pt-10 md:mt-28 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16"
        >
          <p className="eyebrow">{numbers.pullout.label}</p>
          <p className="max-w-measure text-[1.25rem] font-medium leading-[1.55] text-white sm:text-[1.5rem]">
            {numbers.pullout.text}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
