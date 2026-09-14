import { faq } from "@/data/content";
import ScrollReveal from "@/components/ui/ScrollReveal";

/**
 * Compact FAQ for people and answer engines. Visually quiet; the same
 * questions and answers are emitted as FAQPage JSON-LD in the layout.
 */
export default function Faq() {
  return (
    <section id="faq" aria-label={faq.ariaLabel} className="px-gutter pb-section-y pt-6">
      <div className="mx-auto grid w-full max-w-site gap-8 border-t rule pt-12 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16">
        <div>
          <p className="eyebrow">{faq.eyebrow}</p>
          <h2 className="mt-4 text-xl font-semibold tracking-tight text-ink">{faq.headline}</h2>
        </div>
        <ScrollReveal as="dl" from="up" stagger="div" staggerDelay={0.1} distance={24} className="space-y-8">
          {faq.items.map((item) => (
            <div key={item.q} data-reveal className="max-w-measure">
              <dt className="font-semibold text-ink">
                <h3 className="text-base font-semibold sm:text-lg">{item.q}</h3>
              </dt>
              <dd className="mt-2 text-base text-muted">{item.a}</dd>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
