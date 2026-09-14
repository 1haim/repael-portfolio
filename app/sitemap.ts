import type { MetadataRoute } from "next";
import { site } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `https://${site.domain}`,
      lastModified: new Date("2026-09-15"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
