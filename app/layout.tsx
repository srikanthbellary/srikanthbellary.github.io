import type { Metadata } from "next";
import { person } from "@/lib/content";
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
    "Gen AI",
    "Forward Deployment",
    "autonomous agents",
    "RAG",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  jobTitle: "Sr. Gen AI Solution Architect",
  email: person.email,
  telephone: "+1-440-340-8383",
  url: person.site,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Wellington",
    addressRegion: "FL",
    addressCountry: "US",
  },
  sameAs: [person.linkedin, person.github, person.medium],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
