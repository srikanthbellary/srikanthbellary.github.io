import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { RevealOnScroll } from "@/components/Motion";
import { Coming, FeaturedVideo, Films, Music, PersonalHero, Shorts } from "@/components/Personal";
import { SiteBar } from "@/components/SiteBar";
import { SiteFoot } from "@/components/SiteFoot";
import { Theater } from "@/components/Video";
import { person } from "@/lib/content";
import { artist } from "@/lib/music";
import { pageCopy, pageMetadata, siteUrl } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("personal");

const sections = [
  { href: "#music", label: "Albums" },
  { href: "#video", label: "Video" },
  { href: "#shorts", label: "Shorts" },
  { href: "#coming-2027", label: "2027" },
  { href: "#film", label: "Short films" },
] as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: artist.name,
  jobTitle: artist.roles,
  description: artist.bio,
  url: new URL(pageCopy.personal.path, siteUrl).toString(),
  sameAs: [artist.spotify, artist.appleMusic],
};

// Films & Music, and nothing else. This page links home, never to the other side.
// The portrait is not used here: music, not face.
export default function PersonalPage() {
  return (
    <div data-page="personal">
      <JsonLd data={jsonLd} />
      <a className="skip" href="#music">
        Skip to the albums
      </a>
      <SiteBar name={person.name} sections={sections} cta={{ href: artist.spotify, label: "Listen", external: true }} />
      <main id="top">
        <PersonalHero />
        <Music />
        <FeaturedVideo />
        <Shorts />
        <Coming />
        <Films />
        <SiteFoot />
      </main>
      <Theater />
      <RevealOnScroll />
    </div>
  );
}
