// The two sides of the site. The home page offers them as two doors;
// each side links home and across to the other.

import { career, positioning } from "@/lib/content";
import { albums, featuredVideo, films, teaser } from "@/lib/music";

export type SideKey = "professional" | "personal";

export type Side = {
  key: SideKey;
  n: string;
  href: string;
  label: string;
  /** Half of the line "Engineer by day, storyteller always." */
  tagline: string;
  sub: readonly string[];
  line: string;
  contents: { label: string; note: string }[];
};

export const sides: Record<SideKey, Side> = {
  professional: {
    key: "professional",
    n: "01",
    href: "/professional/",
    label: "Professional",
    tagline: "Engineer by day,",
    sub: positioning.roles,
    line: positioning.overview,
    contents: [
      { label: "Work", note: career.slice(0, 4).map((c) => c.client).join(", ") },
      { label: "Stack", note: "Agents, retrieval, data platforms" },
      { label: "Experience", note: `${career.length} engagements, 2006 to now` },
      { label: "Contact", note: "Write me directly" },
    ],
  },
  personal: {
    key: "personal",
    n: "02",
    href: "/personal/",
    label: "Personal",
    tagline: "storyteller always.",
    sub: ["Films & Music"],
    line: "I write cinematic songs in Telugu and Hindi and turn them into AI-generated music videos.",
    contents: [
      { label: "Albums", note: albums.map((a) => a.title).join(" · ") },
      { label: "Featured video", note: featuredVideo.kind },
      { label: "Shorts", note: "Vertical cuts from both albums" },
      { label: teaser.status, note: teaser.title },
      { label: "Short films", note: `Three from ${films[0].year}` },
    ],
  },
};

export const other = (key: SideKey): Side => sides[key === "professional" ? "personal" : "professional"];

export const doorSummary = (side: Side) =>
  `${side.label}: ${side.sub.join(", ")}. ${side.contents.map((c) => c.label).join(", ")}.`;
