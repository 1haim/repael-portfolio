import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "../styles/globals.css";
import { site } from "@/data/content";
import SmoothScroll from "@/components/ui/SmoothScroll";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: site.title,
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    url: `https://${site.domain}`,
    siteName: site.domain,
    type: "website",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F5F4F1",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body>
        <a href="#main" className="skip-link">
          {site.ui.skipLink}
        </a>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
