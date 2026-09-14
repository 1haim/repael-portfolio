/**
 * ALL site copy lives here. Components never hardcode text.
 */

export const site = {
  domain: "repael.com",
  year: "2026",
  title: "Haim Repael Azoulay — VP Product Design & Experience",
  description:
    "Design executive. Built design at accessiBe from one designer to a 16-person organization through growth from under $1M to nearly $60M ARR. Hands-on in AI and accessibility. Tel Aviv.",
  ogImage: "/og.png",
  email: "repael@me.com",
  linkedin: "linkedin.com/in/1haim",
  linkedinUrl: "https://www.linkedin.com/in/1haim",
  location: "Tel Aviv",
  ui: {
    skipLink: "Skip to content",
    newTab: " (opens in a new tab)",
  },
} as const;

export const nav = {
  ariaLabel: "Primary",
  menuLabel: "Menu",
  closeLabel: "Close",
  links: [
    { label: "Work", href: "#trajectory" },
    { label: "Impact", href: "#numbers" },
    { label: "Approach", href: "#poc" },
    { label: "Speaking", href: "#speaking" },
    { label: "Contact", href: "#contact" },
  ],
  toggle: {
    label: "Reduce animations",
    announceReduced: "Animations reduced",
    announceEnabled: "Animations enabled",
  },
} as const;

export const hero = {
  ariaLabel: "Introduction",
  name: "Haim Repael Azoulay",
  nameLines: ["Haim Repael", "Azoulay"],
  position: "Product Design & Experience Executive",
  subline:
    "Builds design organizations that move business metrics. Hands-on in AI and accessibility.",
  stats: [
    { from: "< $1M", to: "$60M", label: "ARR", prefix: "", value: 60, unit: "M", display: "$60M" },
    { from: "16", to: "200+", label: "people", value: 200, unit: "+", display: "200+" },
    { from: "1", to: "16", label: "in Design", value: 16, unit: "", display: "16" },
    { from: "", to: "2.64×", label: "demo bookings", value: 2.64, unit: "×", display: "2.64×", decimals: 2 },
  ],
} as const;

export const profile = {
  ariaLabel: "Who I am",
  eyebrow: "Who I am",
  paragraphs: [
    "Product design executive with 15+ years across product, brand, and entrepreneurship. Since 2020, led Design at accessiBe through growth from under $1M to nearly $60M ARR and from 16 to 200+ employees — building the function from one designer into a multidisciplinary organization with full budget ownership.",
    "Runs design as an evidence-driven function: experiments validated in the data warehouse, AI prototypes built hands-on that the company then staffs into production. Every designer on the team learns and uses Mixpanel, FullStory, and Clarity directly.",
    "Speaks internationally on accessibility and AI (UXDX New York, Berlin). Founded Beyond Pixels — a 200+ attendee design and product event.",
  ],
} as const;

export const numbers = {
  ariaLabel: "The numbers",
  eyebrow: "The numbers",
  headline: "Design that moves the funnel.",
  note: "Data-warehouse-validated experiments.",
  cards: [
    {
      title: "Tailored Onboarding",
      value: 2.64,
      decimals: 2,
      prefix: "",
      suffix: "×",
      headline: "2.64×",
      sub: "demo bookings",
      detail: "13.2% vs 5.0% — direct impact on ARR",
      context: "Portal capability spanning 13 customer journeys",
      credit: "Ofri Bichar",
    },
    {
      title: "Signup Redesign",
      value: 6.0,
      decimals: 1,
      prefix: "+",
      suffix: "pp",
      headline: "+6.0pp",
      sub: "trial activation",
      detail: "36.4% vs 30.4%",
      context: "Removed onboarding friction",
      credit: "David Amsalem",
    },
    {
      title: "Domain-First Onboarding",
      value: 4.0,
      decimals: 1,
      prefix: "+",
      suffix: "pp",
      headline: "+4.0pp",
      sub: "trial activation",
      detail: "49.9% vs 45.9%",
      context: "Higher-intent user entry",
      credit: "Assi Kraif",
    },
  ],
  creditLabel: "Design lead",
  pullout: {
    label: "What we learned",
    text: "Design excels at Activation. The next frontier is Monetization — converting trial users who already activated into paying customers. That's the design problem I'm solving next.",
  },
} as const;

export const pocToProduct = {
  ariaLabel: "From POC to product",
  eyebrow: "From POC to product",
  headline: "I still write code.",
  story:
    "Built two Figma accessibility-auditor POCs, including a design-time engine that identifies and classifies Design System components. The company staffed production development on that basis. Still on the steering team for WCAG/ARIA rules, validation, and MVP scope.",
  strategyLabel: "Also led experience strategy for",
  strategyItems: ["accessWidget Co-Pilot", "accessFlow Code Agent", "Auto-Resolve"],
  strategyNote: "Explicit patterns for trust, validation, transparency, user control.",
  aiLabel: "How AI changed this",
  aiLine:
    "Every prototype, research synthesis, and design decision in this process was accelerated by AI — from classification logic to WCAG rule generation.",
  codeSnippet: {
    filename: "auditor/classify.ts",
    ariaLabel: "Decorative code snippet illustrating a design-system component classifier",
    lines: [
      { t: "// design-time engine · Figma plugin", k: "c" },
      { t: "export function classify(node: SceneNode): Component {", k: "code" },
      { t: "  const match = designSystem.find(node);", k: "code" },
      { t: "  if (!match) return { kind: 'unknown', node };", k: "code" },
      { t: "", k: "code" },
      { t: "  return {", k: "code" },
      { t: "    kind: match.kind,", k: "code" },
      { t: "    rules: wcag.rulesFor(match.kind),   // 1.4.3 · 2.4.7 · 4.1.2", k: "code" },
      { t: "    aria: aria.expectedFor(match.kind),", k: "code" },
      { t: "    issues: validate(node, match),", k: "code" },
      { t: "  };", k: "code" },
      { t: "}", k: "code" },
    ],
  },
} as const;

export const designingWithPeople = {
  ariaLabel: "Designing with people",
  eyebrow: "Designing with people",
  headline: "Empathy isn't a principle. It's a practice.",
  intro:
    "Empathy built over years. Products that change lives.",
  moments: [
    {
      period: "2010",
      org: "American Lifetime",
      text: "Designed connected hardware and software for older adults and people with dementia. Coordinated with manufacturing partners in China.",
    },
    {
      period: "2014–2017",
      org: "CET / Matach + RealFace",
      text: "Designed and directed 13 native apps for children with disabilities. First place, education category, People & Computers competition. Designed product work for RealFace — acquired by Apple, 2017.",
    },
    {
      period: "2020–Present",
      org: "accessiBe / accessLabs",
      text: "Built an inclusive usability-testing capability: two international team leaders, up to 10 blind analysts, six-figure annual budget. Presented original research on designing for autistic users (Beyond Pixels).",
    },
  ],
} as const;

export const trajectory = {
  ariaLabel: "Trajectory",
  eyebrow: "Trajectory",
  headline: "Sixteen years. One thread.",
  rows: [
    {
      org: "rep creative",
      period: "2010–Present",
      role: "Independent studio.",
      text: "100+ projects, 50+ clients.",
      clients:
        "Ituran · Toyota Israel · monday.com · Amdocs · Similarweb · Clalit · Bank Hapoalim · CET/Matach · Technion",
    },
    {
      org: "Toptal",
      period: "2017–Present",
      role: "Member, invitation-only network of elite product designers.",
      text: "International engagements across cultures, time zones, software and hardware.",
      clients: "",
    },
    {
      org: "accessiBe",
      period: "2020–Present",
      role: "VP Design & Experience (Head of Design 2020–2022).",
      text: "<$1M → $60M ARR. 16 → 200+ people. One designer → 16.",
      clients: "",
    },
  ],
  earlier: "Earlier: 888.com (via Mytopia acquisition), 2009–2010. Danbar International, 2008–2009.",
} as const;

export const speaking = {
  ariaLabel: "Speaking and what I'm looking for",
  eyebrow: "Speaking",
  talks: [
    {
      event: "UXDX USA 2025",
      title: "Accessibility in Practice: Integrating Accessibility Across the Product Lifecycle",
    },
    {
      event: "UXDX EMEA 2026",
      title: "AI & Web Accessibility in Practice: Closing the Design-to-Code Gap",
    },
    {
      event: "Beyond Pixels",
      title:
        "Founded and produced a 200+ attendee design and product event. Built the concept, brand, and campaign. Curated speakers. Presented original research on designing for autistic users.",
    },
  ],
  extras: "Public accessible-design webinar. Published writing on UX (Medium).",
  lookingFor: {
    eyebrow: "What I'm looking for",
    paragraphs: [
      "I'm looking for a company where design has — or can earn — a seat at the product table. Where the design leader is a business partner, not a service provider. Where accessibility is a value, not a checkbox.",
      "I work best where there's something real to build: a product that needs to grow, an org that needs structure, or a function that needs to prove its value in numbers.",
    ],
    closing: "If that's your company — let's talk.",
  },
  ctaLabel: "Get in touch",
} as const;

/**
 * Photos live in /public/images. Each renders only when its file exists.
 * Alt text describes the content; adjust once the final photos are chosen.
 */
export const images = {
  people: {
    file: "images/uxdx-talk.jpg",
    alt: "Haim Repael Azoulay on stage at UXDX, presenting to a seated audience with a slide on integrating accessibility across the product lifecycle behind him.",
    aspect: 3 / 2,
  },
  speaking: {
    file: "images/uxdx-stage.jpg",
    alt: "Haim Repael Azoulay speaking at the UXDX conference podium, lit against a dark stage with the talk title on screen.",
    aspect: 4 / 5,
  },
  poc: {
    file: "images/auditor-screenshot.png",
    alt: "Screenshot of the Figma accessibility-auditor prototype listing detected design-system components with their WCAG rule results.",
    aspect: 4 / 3,
  },
} as const;

export type SiteImage = { file: string; alt: string; aspect: number };

export const closing = {
  ariaLabel: "What comes next",
  line: "Whatever you're building — it'll be used by people. Let's make sure it works for all of them.",
  ctaLabel: "Email",
} as const;

export const faq = {
  ariaLabel: "Frequently asked questions",
  eyebrow: "FAQ",
  headline: "Questions people ask",
  items: [
    {
      q: "Who is Haim Repael Azoulay?",
      a: "A product design executive based in Tel Aviv. VP Design & Experience at accessiBe since 2020 (Head of Design 2020–2022), where he built the design function from one designer into a 16-person organization while the company grew from under $1M to nearly $60M ARR and from 16 to 200+ employees. He speaks internationally on accessibility and AI and founded Beyond Pixels, a 200+ attendee design and product event.",
    },
    {
      q: "What does a VP of Design do at a company like accessiBe?",
      a: "Owns the design organization: structure, hiring, and budget. Runs design as an evidence-driven function, with experiments validated in the data warehouse and every designer working directly in Mixpanel, FullStory, and Clarity. Leads experience strategy for AI products such as accessWidget Co-Pilot, accessFlow Code Agent, and Auto-Resolve, builds inclusive research capability, and partners with product and engineering on funnel metrics like trial activation and demo bookings.",
    },
    {
      q: "What is Haim Repael Azoulay's experience with AI and accessibility?",
      a: "Hands-on. He built two Figma accessibility-auditor proofs of concept, including a design-time engine that classifies design-system components against WCAG and ARIA rules; the company staffed production development on that basis, and he remains on the steering team for rules, validation, and MVP scope. He built accessLabs, an inclusive usability-testing capability with up to 10 blind analysts, and speaks on AI and web accessibility at UXDX (USA 2025, EMEA 2026).",
    },
  ],
} as const;

/** Structured data for search and answer engines. */
export const structuredData = {
  person: {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `https://${site.domain}/#person`,
    name: "Haim Repael Azoulay",
    givenName: "Haim",
    familyName: "Azoulay",
    jobTitle: "VP Design & Experience",
    worksFor: { "@type": "Organization", name: "accessiBe" },
    url: `https://${site.domain}`,
    email: `mailto:${site.email}`,
    image: `https://${site.domain}/og.png`,
    sameAs: [site.linkedinUrl],
    address: { "@type": "PostalAddress", addressLocality: "Tel Aviv", addressCountry: "IL" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Shenkar College of Engineering, Design and Art" },
    knowsAbout: [
      "Product Design Leadership",
      "Design Organization Building",
      "Web Accessibility",
      "WCAG",
      "AI Product Design",
      "Design Systems",
      "Product Analytics",
      "A/B Testing",
    ],
  },
} as const;

export const footer = {
  ariaLabel: "Footer",
  text: `${site.domain} · ${site.year}`,
} as const;
