import { speaking, site } from "@/data/content";
import ScrollReveal from "@/components/ui/ScrollReveal";

/** [7] SPEAKING + WHAT I'M LOOKING FOR — ends with the CTA. */
export default function Speaking() {
  const { lookingFor } = speaking;
  return (
    <section id="contact" aria-label={speaking.ariaLabel} className="px-gutter py-section-y">
      <div className="mx-auto w-full max-w-site">
        {/* Speaking */}
        <ScrollReveal
          as="div"
          from="up"
          stagger="[data-reveal]"
          staggerDelay={0.12}
          distance={32}
          className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16"
        >
          <p data-reveal className="eyebrow">
            {speaking.eyebrow}
          </p>
          <div>
            <ul className="divide-y rule">
              {speaking.talks.map((talk) => (
                <li key={talk.event} data-reveal className="grid gap-2 py-6 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-8">
                  <h3 className="text-base font-semibold text-accent">{talk.event}</h3>
                  <p className="max-w-measure text-ink">{talk.title}</p>
                </li>
              ))}
            </ul>
            <p data-reveal className="mt-6 text-muted">
              {speaking.extras}
            </p>
          </div>
        </ScrollReveal>

        {/* What I'm looking for — the most important copy on the page */}
        <ScrollReveal
          from="up"
          distance={48}
          className="mt-[clamp(6rem,14vh,10rem)] grid gap-10 border-t rule pt-14 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16 md:pt-20"
        >
          <p className="eyebrow">{lookingFor.eyebrow}</p>
          <div>
            {lookingFor.paragraphs.map((text, i) => (
              <p
                key={i}
                className={`max-w-[34ch] text-[clamp(1.5rem,2.6vw,2.375rem)] font-semibold leading-[1.3] tracking-tight text-ink ${
                  i > 0 ? "mt-8" : ""
                }`}
              >
                {text}
              </p>
            ))}
            <p className="display mt-12 text-[clamp(2rem,4vw,3.5rem)] text-accent">{lookingFor.closing}</p>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-lg font-semibold text-white transition-colors duration-500 ease-out hover:bg-ink"
              >
                {site.email}
              </a>
              <a
                href={site.linkedinUrl}
                target="_blank"
                rel="me noopener"
                className="inline-link inline-flex items-center justify-center px-2 py-3 text-lg font-semibold text-ink"
              >
                {site.linkedin}
                <span className="sr-only">{site.ui.newTab}</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
