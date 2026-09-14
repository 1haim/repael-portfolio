import { trajectory } from "@/data/content";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";

/** [6] TRAJECTORY — three styled rows, staggered on scroll. Not a table. */
export default function Trajectory() {
  return (
    <section id="trajectory" aria-label={trajectory.ariaLabel} className="px-gutter py-section-y">
      <div className="mx-auto w-full max-w-site">
        <SectionHeader id="trajectory-heading" eyebrow={trajectory.eyebrow} headline={trajectory.headline} />

        <ScrollReveal as="ul" from="up" stagger="li" staggerDelay={0.16} distance={40} className="mt-16 md:mt-24">
          {trajectory.rows.map((row) => (
            <li
              key={row.org}
              data-reveal
              className="grid gap-4 border-t rule py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16 md:py-12"
            >
              <div>
                <h3 className="display text-[1.75rem] text-ink sm:text-[2.25rem]">{row.org}</h3>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent">{row.period}</p>
              </div>
              <div className="max-w-measure">
                <p className="text-[1.125rem] font-medium text-ink sm:text-[1.25rem]">
                  {row.role} {row.text}
                </p>
                {row.clients ? <p className="mt-4 text-muted">{row.clients}</p> : null}
              </div>
            </li>
          ))}
          <li data-reveal className="border-t rule pt-8 text-sm text-muted sm:text-base">
            {trajectory.earlier}
          </li>
        </ScrollReveal>
      </div>
    </section>
  );
}
