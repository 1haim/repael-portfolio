import { speaking } from "@/data/content";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Typewriter from "@/components/ui/Typewriter";
import type { SiteImage } from "@/data/content";

/** [7] SPEAKING + WHAT I'M LOOKING FOR — ends with the CTA. */
export default function Speaking({ image }: { image: SiteImage | null }) {
  const { lookingFor } = speaking;
  return (
    <section id="speaking" aria-label={speaking.ariaLabel} className="px-gutter py-section-y">
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
          <div>
            <h2 id="speaking-heading" data-reveal className="eyebrow">
              {speaking.eyebrow}
            </h2>
            {image ? (
              <div className="mt-8 hidden max-w-[22rem] md:block">
                <ParallaxImage src={`/${image.file}`} alt={image.alt} aspect={image.aspect} sizes="(min-width: 768px) 30vw, 100vw" />
              </div>
            ) : null}
          </div>
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
                className={`lead max-w-[36ch] text-[clamp(1.5rem,2.6vw,2.375rem)] text-ink ${
                  i > 0 ? "mt-8" : ""
                }`}
              >
                {text}
              </p>
            ))}
            <Typewriter text={lookingFor.closing} className="display mt-12 text-[clamp(2rem,4vw,3.5rem)] text-ink" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
