import { pocToProduct } from "@/data/content";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ParallaxImage from "@/components/ui/ParallaxImage";
import type { SiteImage } from "@/data/content";

const KEYWORDS = /\b(export|function|const|if|return)\b/g;

/** Tiny decorative highlighter: keywords in accent, inline comments muted. */
function highlight(line: string) {
  const commentAt = line.indexOf("//");
  const code = commentAt >= 0 ? line.slice(0, commentAt) : line;
  const comment = commentAt >= 0 ? line.slice(commentAt) : "";
  const parts = code.split(KEYWORDS);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="text-accent-dark">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
      {comment ? <span className="text-white/45">{comment}</span> : null}
    </>
  );
}

/**
 * [4] FROM POC TO PRODUCT — 60% text left, 40% static code block right.
 * Text enters from the left, code block from the right, on scroll.
 */
export default function PocToProduct({ image }: { image: SiteImage | null }) {
  const { codeSnippet } = pocToProduct;
  return (
    <section id="poc" aria-label={pocToProduct.ariaLabel} className="px-gutter py-section-y">
      <div className="mx-auto w-full max-w-site">
        <SectionHeader id="poc-heading" eyebrow={pocToProduct.eyebrow} headline={pocToProduct.headline} />

        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-[3fr_2fr] md:gap-16 lg:gap-24">
          <ScrollReveal from="left" distance={48} className="max-w-measure">
            <p className="lead text-[1.375rem] text-ink sm:text-[1.625rem]">
              {pocToProduct.story}
            </p>

            <p className="mt-10 text-sm font-medium uppercase tracking-[0.12em] text-muted">
              {pocToProduct.strategyLabel}
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-lg font-semibold text-ink">
              {pocToProduct.strategyItems.map((item, i) => (
                <li key={item} className="flex items-center gap-3">
                  {item}
                  {i < pocToProduct.strategyItems.length - 1 ? (
                    <span aria-hidden="true" className="text-accent">
                      ·
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-muted">{pocToProduct.strategyNote}</p>
          </ScrollReveal>

          <ScrollReveal from="right" distance={48} className="md:pt-2">
            <div
              role="img"
              aria-label={codeSnippet.ariaLabel}
              className="overflow-hidden rounded-lg bg-bg-dark text-white shadow-[0_30px_60px_-30px_rgba(15,15,15,0.5)]"
            >
              <div aria-hidden="true" className="flex items-center gap-2 border-b border-white/10 px-5 py-3 text-xs text-white/60">
                <span aria-hidden="true" className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                </span>
                <span className="ml-2 font-mono">{codeSnippet.filename}</span>
              </div>
              <pre aria-hidden="true" className="overflow-x-auto px-5 py-5 font-mono text-[0.8rem] leading-[1.75] sm:text-[0.85rem]">
                <code>
                  {codeSnippet.lines.map((line, i) => (
                    <span key={i} className="block whitespace-pre">
                      <span className="mr-5 inline-block w-4 select-none text-right text-white/25">{i + 1}</span>
                      {line.k === "c" ? <span className="text-white/45">{line.t}</span> : highlight(line.t)}
                    </span>
                  ))}
                </code>
              </pre>
            </div>
            {image ? (
              <div className="mt-6">
                <ParallaxImage src={`/${image.file}`} alt={image.alt} aspect={image.aspect} />
              </div>
            ) : null}
          </ScrollReveal>
        </div>

        <ScrollReveal
          from="up"
          distance={32}
          className="mt-16 grid gap-4 border-t rule pt-8 md:mt-24 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16"
        >
          <p className="eyebrow">{pocToProduct.aiLabel}</p>
          <p className="max-w-measure text-muted">{pocToProduct.aiLine}</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
