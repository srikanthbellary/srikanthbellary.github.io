import type { Metadata } from "next";
import { PlainBar } from "@/components/Plain";
import { person } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { sides } from "@/lib/sides";

export const metadata: Metadata = pageMetadata("missing");

export default function NotFound() {
  return (
    <div className="plain">
      <PlainBar />
      <main id="top">
        <section className="legal" aria-labelledby="missing">
          <p className="label">
            <span>Missing</span>
            <span>{person.location}</span>
          </p>
          <h1 id="missing">Page not found</h1>
          <p className="legal-lede">
            That address is not on this site. <a href="/">Return home</a>, or go straight to{" "}
            <a href={sides.professional.href}>{sides.professional.label}</a> or{" "}
            <a href={sides.personal.href}>{sides.personal.label}</a>.
          </p>
        </section>
      </main>
    </div>
  );
}
