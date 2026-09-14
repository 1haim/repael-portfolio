# repael.com

Portfolio and positioning site for Haim Repael Azoulay. One page, seven sections.

## Stack

- Next.js 14 (App Router), TypeScript
- Tailwind CSS + CSS variables (`styles/globals.css`)
- GSAP + ScrollTrigger (`lib/gsap.ts`), Lenis smooth scroll (`lib/lenis.ts`)
- No WebGL, no Three.js, no canvas.

## Where things live

| Path | Purpose |
| --- | --- |
| `data/content.ts` | All copy. Components never hardcode text. |
| `components/sections/*` | The seven page sections, in order. |
| `components/ui/*` | StatBlock, ImpactCard, TimelineRow, ScrollReveal, SectionHeader, SmoothScroll. |
| `styles/globals.css` | Tokens, reset, focus styles, reduced-motion rules. |

## Run

```bash
npm install
npm run dev
```

```bash
npm run build && npm start
```

## Accessibility

- `prefers-reduced-motion`: every GSAP animation is skipped and content renders visible.
- `:focus-visible` ring on every interactive element.
- Body text contrast ≥ 4.5:1 (`#5B5B5B` on `#F5F4F1` ≈ 6.2:1; accent `#0F6E5E` ≈ 5.7:1).
- `aria-label` on every section, `lang="en"`, skip link, logical tab order.
- All text is real HTML. The code snippet is decorative (`role="img"` with a label).

## Deploy: Vercel + Cloudflare

1. Push to GitHub and import the repo in Vercel. Every push to `main` deploys.
2. Vercel → Project → Settings → Domains → add `repael.com` (and `www.repael.com`, redirecting to the apex).
3. Vercel shows the DNS records: an `A` record for the apex and a `CNAME` for `www`.
4. Cloudflare → DNS → add both records with proxy **OFF** (grey cloud).
5. Wait for Vercel to verify. SSL is issued by Vercel.
