import type { Metadata } from "next";
import { person } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://srikanthbellary.com"),
  title: {
    default: "Srikanth Bellary — Sr. Gen AI Solution Architect",
    template: "%s — Srikanth Bellary",
  },
  description:
    "Personal profile. I build production GenAI — agents, retrieval, and data — that has to run. Wellington, FL.",
  applicationName: "Srikanth Bellary",
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
    url: "https://srikanthbellary.com",
    siteName: "Srikanth Bellary",
    title: "Srikanth Bellary — Sr. Gen AI Solution Architect",
    description:
      "I build production GenAI — agents, retrieval, and data — that has to run.",
    firstName: "Srikanth",
    lastName: "Bellary",
  },
  twitter: {
    card: "summary",
    title: "Srikanth Bellary",
    description:
      "Sr. Gen AI Solution Architect / Forward Deployment. Production agents, retrieval, and data.",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  alternates: {
    canonical: "https://srikanthbellary.com",
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
