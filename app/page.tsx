import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { person } from "@/lib/content";
import { pageMetadata, siteUrl } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("home");

// Home is one screen that never scrolls: the name and two buttons, nothing else.
// The two sides are separate pages, and this is the only place that offers both.
export default function Page() {
  const [first, ...rest] = person.name.split(" ");

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Person", name: person.name, url: siteUrl }} />
      <main className="home">
        <h1>
          <span>{first}</span> <span>{rest.join(" ")}</span>
        </h1>
        <nav className="home-choices" aria-label="Choose a page">
          <a className="home-btn" href="/professional/" data-side-link>
            Professional
          </a>
          <a className="home-btn" href="/personal/" data-side-link>
            Personal
          </a>
        </nav>
      </main>
    </>
  );
}
