import type { Metadata } from "next";
import { Chat } from "@/components/Chat";
import { RevealOnScroll } from "@/components/Motion";
import { Contact, Experience, ProfessionalHero, Stack, Work } from "@/components/Professional";
import { CrossOver, SiteFoot } from "@/components/Sides";
import { SiteBar } from "@/components/SiteBar";
import { person } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { sides } from "@/lib/sides";

export const metadata: Metadata = pageMetadata("professional");

const sections = [
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
] as const;

export default function ProfessionalPage() {
  return (
    <div data-page="professional">
      <a className="skip" href="#work">
        Skip to work
      </a>
      <SiteBar
        name={person.name}
        sides={[
          { href: sides.professional.href, label: sides.professional.label },
          { href: sides.personal.href, label: sides.personal.label },
        ]}
        current={0}
        sections={sections}
        cta={{ href: `mailto:${person.email}`, label: "Write me" }}
      />
      <main id="top">
        <ProfessionalHero />
        <Work />
        <Stack />
        <Experience />
        <Contact />
        <CrossOver from="professional" />
        <SiteFoot from="professional" />
      </main>
      <Chat />
      <RevealOnScroll />
    </div>
  );
}
