import type { Metadata } from "next";
import { RevealOnScroll } from "@/components/Motion";
import { Coming, FeaturedVideo, Films, Music, PersonalHero, Shorts } from "@/components/Personal";
import { CrossOver, SiteFoot } from "@/components/Sides";
import { SiteBar } from "@/components/SiteBar";
import { Theater } from "@/components/Video";
import { person } from "@/lib/content";
import { artist } from "@/lib/music";
import { pageMetadata } from "@/lib/seo";
import { sides } from "@/lib/sides";

export const metadata: Metadata = pageMetadata("personal");

const sections = [
  { href: "#music", label: "Albums" },
  { href: "#video", label: "Video" },
  { href: "#shorts", label: "Shorts" },
  { href: "#coming-2027", label: "2027" },
  { href: "#film", label: "Short films" },
] as const;

// Films & Music. The portrait never appears on this side: music, not face.
export default function PersonalPage() {
  return (
    <div data-page="personal">
      <a className="skip" href="#music">
        Skip to the albums
      </a>
      <SiteBar
        name={person.name}
        sides={[
          { href: sides.professional.href, label: sides.professional.label },
          { href: sides.personal.href, label: sides.personal.label },
        ]}
        current={1}
        sections={sections}
        cta={{ href: artist.spotify, label: "Listen", external: true }}
      />
      <main id="top">
        <PersonalHero />
        <Music />
        <FeaturedVideo />
        <Shorts />
        <Coming />
        <Films />
        <CrossOver from="personal" />
        <SiteFoot from="personal" />
      </main>
      <Theater />
      <RevealOnScroll />
    </div>
  );
}
