import { closing, site } from "@/data/content";
import Typewriter from "@/components/ui/Typewriter";
import ScrollReveal from "@/components/ui/ScrollReveal";

/**
 * [8] CLOSING — one line about what comes next, set light and large, then
 * the only hard CTA on the page. Generous vertical room: at least 200px.
 */
export default function Closing() {
  return (
    <section
      id="contact"
      aria-label={closing.ariaLabel}
      className="px-gutter py-[max(12.5rem,22vh)]"
    >
      <div className="mx-auto w-full max-w-site">
        <Typewriter
          as="h2"
          text={closing.line}
          className="lead max-w-[22ch] text-[clamp(3rem,5vw,4.5rem)] leading-[1.12] tracking-[-0.015em] text-ink"
        />

        <ScrollReveal
          from="up"
          delay={0.3}
          className="mt-14 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8"
        >
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
            className="inline-link inline-flex items-center justify-center px-1 py-3 text-lg font-semibold text-ink"
          >
            {site.linkedin}
            <span className="sr-only">{site.ui.newTab}</span>
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
