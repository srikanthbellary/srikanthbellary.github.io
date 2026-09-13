import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { person } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("privacy");

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="fold" aria-labelledby="privacy">
          <div className="wrap">
            <div className="fold-meta">
              <span>Privacy</span>
              <span>{person.location}</span>
            </div>
            <hr className="hairline fold-rule" />
            <h1 id="privacy">Privacy</h1>
            <p className="fold-line">
              How this profile handles what you send.
            </p>
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
          </div>
        </section>
      </main>
      <footer className="contact">
        <div className="wrap">
          <div className="site-foot">
            <span>
              © {new Date().getFullYear()} {person.name}
            </span>
            <a href="/">Home</a>
            <span>srikanthbellary.com</span>
          </div>
        </div>
      </footer>
    </>
  );
}
