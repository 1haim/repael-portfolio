# repael.com

Portfolio and positioning site for Haim Repael Azoulay. One page, eight sections plus a short FAQ.

## Stack

- Next.js 14 (App Router), TypeScript
- Tailwind CSS + CSS variables (`styles/globals.css`)
- GSAP + ScrollTrigger (`lib/gsap.ts`), Lenis smooth scroll (`lib/lenis.ts`)
- Fustat variable font (SIL OFL), self-hosted from `app/fonts/`
- No WebGL, no Three.js, no canvas.

## Where things live

| Path | Purpose |
| --- | --- |
| `data/content.ts` | All copy, nav labels, image definitions, FAQ, structured data. Components never hardcode text. |
| `components/sections/*` | Hero, Profile, Numbers, PocToProduct, DesigningWithPeople, Trajectory, Speaking, Closing, Faq. |
| `components/ui/*` | Nav (with the Reduce-animations switch), ScrollReveal, Typewriter, TimelineLine, SectionRule, ParallaxImage, StatBlock, ImpactCard, TimelineRow, SectionHeader, SmoothScroll. |
| `lib/motion.tsx` | Motion preference: OS default → saved choice, inline pre-paint script, context every animation reads. |
| `styles/globals.css` | Tokens, type helpers, focus styles, reduced-motion rules, grain overlay. |
| `app/robots.ts`, `app/sitemap.ts`, `public/llms.txt`, `public/og.png` | Search / answer-engine surface. |

## Run

```bash
npm install
npm run dev
```

```bash
npm run build && npm start
```

## Photos

Drop the conference photos into `public/images/` using these names (or change them in `data/content.ts` → `images`):

| File | Used in | Suggested crop |
| --- | --- | --- |
| `uxdx-talk.jpg` | Designing with people | landscape 3:2 |
| `uxdx-stage.jpg` | Speaking | portrait 4:5 |
| `auditor-screenshot.png` | From POC to product (optional) | 4:3 |

Each image renders only when its file exists, so the site works with none, some, or all of them. Rewrite the `alt` text in `content.ts` to describe the actual photo.

## Motion

- One easing everywhere: `cubic-bezier(0.16, 1, 0.3, 1)` (scrubbed hero uses `power2.inOut`).
- Every animation reads the motion preference and rebuilds when it changes. Reduced mode sets final states and creates no tweens; Lenis is turned off.
- The "Reduce animations" switch is the second tab stop, is a real `<button role="switch">`, announces through a polite live region, and persists in `localStorage` under `repael:reduce-motion`.

## Accessibility

- Lighthouse Accessibility 100, axe-core zero violations (WCAG 2.1 AA + best-practice rules), verified on the production build.
- Contrast: body `#5B5B5B` on `#F5F4F1` 6.17:1, accent `#9F4900` on `#F5F4F1` 5.57:1, dark-section accent `#E8853A` on `#0F0F0F` 7.16:1, white on accent button 6.13:1.
- Focus is never dimmed; hover dimming is hover-only.
- Typewriter and split-character text keep the full string in the DOM as visually hidden text; animated characters are `aria-hidden`.
- Still to do by a person: an end-to-end VoiceOver pass.

## Deploy

Vercel project `repael-portfolio` (team `repael`). Canonical host is `repael.com`; `www` redirects to it at the Vercel edge and again in `next.config.mjs`. Pushes to `main` on `1haim/repael-portfolio` deploy when the Git integration is connected; `vercel --prod` from this folder always works.
