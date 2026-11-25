import type { Metadata } from "next";
import { Chat } from "@/components/Chat";
import { JsonLd } from "@/components/JsonLd";
import { RevealOnScroll } from "@/components/Motion";
import { Contact, Experience, ProfessionalHero, Stack, Work } from "@/components/Professional";
import { SiteBar } from "@/components/SiteBar";
import { SiteFoot } from "@/components/SiteFoot";
import { person, positioning } from "@/lib/content";
import { pageCopy, pageMetadata, siteUrl } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("professional");

const sections = [
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
] as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  jobTitle: positioning.roles,
  email: person.email,
  telephone: "+1-440-340-8383",
  url: new URL(pageCopy.professional.path, siteUrl).toString(),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Wellington",
    addressRegion: "FL",
    addressCountry: "US",
  },
  sameAs: [person.linkedin, person.github, person.medium],
  image: `${siteUrl}/srikanth-bellary.jpg`,
};

// The IT and AI engineering work, and nothing else. This page links home, never to the other side.
export default function ProfessionalPage() {
  return (
    <div data-page="professional">
      <JsonLd data={jsonLd} />
      <a className="skip" href="#work">
        Skip to work
      </a>
      <SiteBar name={person.name} sections={sections} cta={{ href: `mailto:${person.email}`, label: "Write me" }} />
      <main id="top">
        <ProfessionalHero />
        <Work />
        <Stack />
        <Experience />
        <Contact />
        <SiteFoot privacy />
      </main>
      <Chat />
      <RevealOnScroll />
    </div>
  );
}
