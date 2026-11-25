import type { Metadata } from "next";
import { person } from "@/lib/content";

export const siteUrl = person.site;

// Each page describes only itself: its own words, its own share image, its own structured data.
// The two sides never name each other; only the home page offers both.

const image = (file: string, alt: string) => ({ url: `/${file}`, width: 1200, height: 630, alt });

const homeImage = image("og.jpg", "Srikanth Bellary");

const professionalImage = image(
  "og-professional.jpg",
  "Srikanth Bellary, Applied AI Engineer and AI Solutions Architect, Wellington, Florida",
);

export const pageCopy = {
  home: {
    title: "Srikanth Bellary",
    description: "Srikanth Bellary. Two pages: Professional and Personal.",
    path: "/",
    image: homeImage,
    keywords: ["Srikanth Bellary"],
  },
  professional: {
    title: "Professional — Applied AI Engineer and AI Solutions Architect",
    description:
      "Srikanth Bellary, Applied AI Engineer and AI Solutions Architect. Client projects newest first, the stack, OpenStinger, and how to write me. Wellington, FL.",
    path: "/professional/",
    image: professionalImage,
    keywords: [
      "Srikanth Bellary",
      "Applied AI Engineer",
      "AI Solutions Architect",
      "Gen AI",
      "autonomous agents",
      "RAG",
      "Wellington FL",
    ],
  },
  // He makes these with AI in his personal time. Nothing here calls him an artist or a director.
  personal: {
    title: "Personal — Films & Music, made with AI",
    description:
      "Films and music made with AI by Srikanth Bellary, a technologist who loves both. Two albums, Inkaa Kadha Migilundhi and Abhi Kahani Baaki Hai, and three short films.",
    path: "/personal/",
    image: image("og-personal.jpg", "Films & Music, made with AI. Srikanth Bellary."),
    keywords: [
      "Srikanth Bellary",
      "films and music made with AI",
      "AI music",
      "AI short films",
      "Inkaa Kadha Migilundhi",
      "Abhi Kahani Baaki Hai",
      "Telugu songs",
      "Hindi songs",
      "music video",
    ],
  },
  // The privacy note is about the chat on the Professional page, so it shares that page's image.
  privacy: {
    title: "Privacy",
    description:
      "How srikanthbellary.com handles questions sent through Ask about my work. Wellington, FL. No street address.",
    path: "/privacy/",
    image: professionalImage,
    keywords: ["Srikanth Bellary", "privacy"],
  },
  missing: {
    title: "Page not found",
    description: "That address is not on srikanthbellary.com. Return home.",
    path: "/404",
    image: homeImage,
    keywords: ["Srikanth Bellary"],
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
    keywords: [...page.keywords],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: person.name,
      title: page.title,
      description: page.description,
      url,
      images: [page.image],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [page.image.url],
    },
    ...extra,
  };
}
