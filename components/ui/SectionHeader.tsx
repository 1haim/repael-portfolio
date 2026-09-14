import ScrollReveal from "./ScrollReveal";

type Props = {
  eyebrow: string;
  headline?: string;
  note?: string;
  dark?: boolean;
  id: string;
};

/**
 * Eyebrow + large headline. Reveals on scroll (one animation).
 * Grid: the heading spans 2 of 3 columns on desktop (≥1024px) and the full
 * width below that, so long headlines never break into a narrow column.
 */
export default function SectionHeader({ eyebrow, headline, note, dark = false, id }: Props) {
  return (
    <ScrollReveal from="up" distance={40} className="w-full lg:w-2/3">
      <p className="eyebrow">{eyebrow}</p>
      {headline ? (
        <h2
          id={id}
          className={`display mt-5 text-balance text-[clamp(2.25rem,5.2vw,4.75rem)] ${dark ? "text-white" : "text-ink"}`}
        >
          {headline}
        </h2>
      ) : null}
      {note ? (
        <p className={`lead mt-6 max-w-measure text-lg sm:text-[1.375rem] ${dark ? "text-muted-dark" : "text-muted"}`}>
          {note}
        </p>
      ) : null}
    </ScrollReveal>
  );
}
