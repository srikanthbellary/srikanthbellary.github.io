import type { Metadata } from "next";
import { PlainBar } from "@/components/Plain";
import { SiteFoot } from "@/components/Sides";
import { person } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("privacy");

export default function PrivacyPage() {
  return (
    <div className="plain">
      <PlainBar />
      <main id="top">
        <section className="legal" aria-labelledby="privacy">
          <p className="label">
            <span>Privacy</span>
            <span>{person.location}</span>
          </p>
          <h1 id="privacy">Privacy</h1>
          <p className="legal-lede">How this profile handles what you send.</p>
          <div className="legal-copy">
            <h2>Ask about my work</h2>
            <p>
              When the chat is connected, a question you type — and the short
              turn history still in that panel — goes to a hosted function so
              a language model can draft a reply about this profile. This
              site does not keep a chat archive. I do not sell what you send.
              The function uses your network address only to pace traffic.
            </p>
            <p>
              I do not ask for a street address. The studio line here is
              Wellington, Florida.
            </p>
            <h2>Write me directly</h2>
            <p>
              Email and phone are listed so you can reach me. Those messages
              travel through your own mail or phone, not through a form on
              this site.
            </p>
            <h2>Video</h2>
            <p>
              The music videos and short films play from YouTube. Nothing is
              requested from YouTube until you press play on one of them.
            </p>
            <h2>Cookies</h2>
            <p>
              This profile does not set extra cookies for advertising or
              analytics.
            </p>
            <h2>Questions</h2>
            <p>
              Write{" "}
              <a href={`mailto:${person.email}`}>{person.email}</a>.{" "}
              <a href="/">Return home</a>.
            </p>
          </div>
        </section>
        <SiteFoot />
      </main>
    </div>
  );
}
