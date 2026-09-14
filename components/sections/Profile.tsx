import { profile } from "@/data/content";
import ScrollReveal from "@/components/ui/ScrollReveal";

/** [2] WHO I AM — three paragraphs entering from the left, staggered. */
export default function Profile() {
  return (
    <section id="who" aria-label={profile.ariaLabel} className="px-gutter py-section-y">
      <div className="mx-auto grid w-full max-w-site gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16">
        <p className="eyebrow">{profile.eyebrow}</p>
        <ScrollReveal from="left" stagger="p" staggerDelay={0.16} distance={48} className="space-y-8">
          {profile.paragraphs.map((text, i) => (
            <p
              key={i}
              data-reveal
              className={
                i === 0
                  ? "max-w-measure text-[1.25rem] font-medium leading-[1.55] text-ink sm:text-[1.5rem]"
                  : "max-w-measure text-muted"
              }
            >
              {text}
            </p>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
