import type { Metadata } from "next";
import { person } from "@/lib/content";

export const siteUrl = person.site;

export const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Srikanth Bellary — Sr. Gen AI Solution Architect, Wellington, Florida",
} as const;

export const pageCopy = {
  home: {
    title: "Srikanth Bellary — Sr. Gen AI Solution Architect",
    description:
      "2026 profile. Sr. Gen AI Solution Architect / Forward Deployment. Career chapters, OpenStinger, and how to write me. Wellington, FL.",
    path: "/",
  },
  privacy: {
    title: "Privacy",
    description:
      "How srikanthbellary.com handles questions sent through Ask about my work. Wellington, FL. No street address.",
    path: "/privacy/",
  },
  missing: {
    title: "Page not found",
    description:
      "That address is not on Srikanth Bellary's 2026 profile. Return to the career record.",
    path: "/404",
  },
} as const;

export function pageMetadata(
  key: keyof typeof pageCopy,
  extra?: Metadata,
): Metadata {
  const page = pageCopy[key];
  const url = new URL(page.path, siteUrl).toString();
  const title =
    key === "home" ? { absolute: page.title } : page.title;

  return {
    title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      images: [ogImage],
    },
    twitter: {
      title: page.title,
      description: page.description,
      images: [ogImage.url],
    },
    ...extra,
  };
}
