type Props = {
  period: string;
  org: string;
  text: string;
  isLast?: boolean;
};

/** One moment on the timeline. Typography and colour only, no imagery. */
export default function TimelineRow({ period, org, text, isLast = false }: Props) {
  return (
    <li data-reveal className="relative grid gap-4 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] md:gap-12">
      <div className="flex items-start gap-4 md:block">
        <span
          aria-hidden="true"
          className="mt-[0.6rem] block h-3 w-3 shrink-0 rounded-full bg-accent md:absolute md:-left-[1.9rem] md:mt-[0.65rem]"
        />
        <p className="stat-number text-[1.75rem] text-accent sm:text-[2rem]">{period}</p>
      </div>
      <div className={`pb-12 md:pb-16 ${isLast ? "" : ""}`}>
        <h3 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">{org}</h3>
        <p className="mt-3 max-w-measure text-muted">{text}</p>
      </div>
    </li>
  );
}
