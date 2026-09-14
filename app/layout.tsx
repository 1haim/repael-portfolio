import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";
import { site, faq, structuredData } from "@/data/content";
import { MotionProvider, motionInitScript } from "@/lib/motion";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Nav from "@/components/ui/Nav";

/**
 * Fustat (SIL OFL 1.1), variable weight 200–800. Self-hosted: the font is not
 * in Next 14's next/font/google registry, so we ship the latin subset directly.
 */
const fustat = localFont({
  src: [{ path: "./fonts/Fustat-Variable-latin.woff2", weight: "200 800", style: "normal" }],
  variable: "--font-fustat",
  display: "swap",
  preload: true,
});

const SITE_URL = `https://${site.domain}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: site.title,
  description: site.description,
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "profile",
    title: site.title,
    description: site.description,
    url: SITE_URL,
    siteName: site.domain,
    locale: "en_US",
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: "Haim Repael Azoulay — VP Product Design & Experience" }],
    firstName: "Haim",
    lastName: "Azoulay",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [site.ogImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F5F4F1",
  width: "device-width",
  initialScale: 1,
};

/** Person + ProfilePage + FAQPage, all derived from content.ts. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    structuredData.person,
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profile`,
      url: SITE_URL,
      name: site.title,
      description: site.description,
      inLanguage: "en",
      mainEntity: { "@id": structuredData.person["@id"] },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fustat.variable} suppressHydrationWarning>
      <head>
        {/* Sets html.motion-reduced / html.motion-enabled before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: motionInitScript }} />
        <noscript>
          <style>{`[data-reveal],.tw-char{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body>
        <MotionProvider>
          <a href="#main" className="skip-link">
            {site.ui.skipLink}
          </a>
          <Nav />
          <SmoothScroll />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
