import type { Metadata } from "next";
import { person } from "@/lib/content";

export const siteUrl = person.site;

export const ogImage = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: "Srikanth Bellary. Two sides: Professional, applied AI engineering and architecture; Personal, films and music.",
} as const;

export const pageCopy = {
  home: {
    title: "Srikanth Bellary — Applied AI Engineer, AI Solutions Architect. Films & Music.",
    description:
      "Engineer by day, storyteller always. Two sides: Professional, the applied AI engineering and architecture work; Personal, the films and music. Wellington, FL.",
    path: "/",
  },
  professional: {
    title: "Professional — Applied AI Engineer and AI Solutions Architect",
    description:
      "Srikanth Bellary, Applied AI Engineer and AI Solutions Architect. Client projects newest first, the stack, OpenStinger, and how to write me. Wellington, FL.",
    path: "/professional/",
  },
  personal: {
    title: "Personal — Films & Music",
    description:
      "Srikanth Bellary writes cinematic songs in Telugu and Hindi and turns them into music videos. Inkaa Kadha Migilundhi, Abhi Kahani Baaki Hai, and three short films.",
    path: "/personal/",
  },
  privacy: {
    title: "Privacy",
    description:
      "How srikanthbellary.com handles questions sent through Ask about my work. Wellington, FL. No street address.",
    path: "/privacy/",
  },
  missing: {
    title: "Page not found",
    description: "That address is not on srikanthbellary.com. Return home and pick a side.",
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
