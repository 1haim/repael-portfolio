import ScrollReveal from "./ScrollReveal";

type Props = {
  eyebrow: string;
  headline?: string;
  note?: string;
  dark?: boolean;
  id: string;
};

/** Eyebrow + large headline. Headline reveals on scroll (one animation). */
export default function SectionHeader({ eyebrow, headline, note, dark = false, id }: Props) {
  return (
    <ScrollReveal from="up" distance={48} className="max-w-[22ch]">
      <p className="eyebrow">{eyebrow}</p>
      {headline ? (
        <h2
          id={id}
          className={`display mt-5 text-[clamp(2.25rem,5.2vw,4.75rem)] ${dark ? "text-white" : "text-ink"}`}
        >
          {headline}
        </h2>
      ) : null}
      {note ? (
        <p className={`mt-5 text-base sm:text-lg ${dark ? "text-muted-dark" : "text-muted"}`}>{note}</p>
      ) : null}
    </ScrollReveal>
  );
}
