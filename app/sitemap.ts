import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://srikanthbellary.com",
      lastModified: new Date("2026-08-27"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://srikanthbellary.com/privacy/",
      lastModified: new Date("2026-09-13"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
