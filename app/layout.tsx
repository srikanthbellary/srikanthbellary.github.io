import type { Metadata, Viewport } from "next";
import { person } from "@/lib/content";
import { siteUrl } from "@/lib/seo";
import "./globals.css";

// Only what every page shares. Descriptions, keywords, share images and structured data belong to
// each page (see lib/seo.ts), so that neither side carries a word about the other.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: person.name,
    template: "%s — Srikanth Bellary",
  },
  applicationName: person.name,
  authors: [{ name: person.name, url: person.site }],
  creator: person.name,
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#07090d",
  colorScheme: "dark",
};

// The faces used on the first screen of every page. The italic and the mono load when first used.
const fonts = ["sofia-sans-extra-condensed-latin-wght-normal", "instrument-sans-latin-wdth-normal"];

// The pages are separate documents joined by ordinary links. Where the browser supports speculation
// rules, a page is prepared while the pointer rests on a link to it, so the click itself is instant.
// Nothing is shown and nothing navigates until the link is pressed.
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
      <body>{children}</body>
    </html>
  );
}
