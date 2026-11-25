import type { Metadata, Viewport } from "next";
import { person, positioning } from "@/lib/content";
import { artist } from "@/lib/music";
import { ogImage, pageCopy, siteUrl } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: pageCopy.home.title,
    template: "%s — Srikanth Bellary",
  },
  description: pageCopy.home.description,
  applicationName: person.name,
  authors: [{ name: person.name, url: person.site }],
  creator: person.name,
  keywords: [
    "Srikanth Bellary",
    "Applied AI Engineer",
    "AI Solutions Architect",
    "Gen AI",
    "autonomous agents",
    "RAG",
    "generative music",
    "AI music video",
    "short film",
    "Wellington FL",
  ],
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: siteUrl,
    siteName: person.name,
    title: pageCopy.home.title,
    description: pageCopy.home.description,
    firstName: "Srikanth",
    lastName: "Bellary",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: pageCopy.home.title,
    description: pageCopy.home.description,
    images: [ogImage.url],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  themeColor: "#07090d",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  jobTitle: positioning.roles,
  description: positioning.bridge,
  email: person.email,
  telephone: "+1-440-340-8383",
  url: person.site,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Wellington",
    addressRegion: "FL",
    addressCountry: "US",
  },
  sameAs: [person.linkedin, person.github, person.medium, artist.spotify, artist.appleMusic],
  image: `${siteUrl}/srikanth-bellary.jpg`,
};

// The faces used on the first screen of every page. The italic and the mono load when first used.
const fonts = ["sofia-sans-extra-condensed-latin-wght-normal", "instrument-sans-latin-wdth-normal"];

// Moving between the three documents: a side is prepared while the pointer rests on a link to it,
// in browsers that support speculation rules. Everywhere else the link is an ordinary link.
const speculation = {
  prerender: [{ where: { selector_matches: "[data-side-link]" }, eagerness: "moderate" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The class is set before first paint so reveal-on-scroll never hides content when scripts are off.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: 'document.documentElement.classList.add("js")' }} />
        {fonts.map((font) => (
          <link
            rel="preload"
            href={`/fonts/${font}.woff2`}
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
            key={font}
          />
        ))}
        <script type="speculationrules" dangerouslySetInnerHTML={{ __html: JSON.stringify(speculation) }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
