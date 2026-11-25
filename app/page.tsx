import type { Metadata } from "next";
import { GateStage } from "@/components/GateStage";
import { Door } from "@/components/Sides";
import { person } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { sides } from "@/lib/sides";

export const metadata: Metadata = pageMetadata("home");

// The home page is one screen: a choice between two sides.
export default function Page() {
  return (
    <div data-page="gateway">
      <header className="bar">
        <a className="bar-id" href="/" aria-current="page" aria-label={person.name}>
          <span className="bar-mark">SB</span>
          <span className="bar-name">{person.name}</span>
        </a>
        <p className="bar-note">
          <span>{person.location}</span>
          <span>{new Date().getFullYear()}</span>
        </p>
      </header>

      <GateStage>
        <h1 className="sr">{person.name}. Choose a side: Professional or Personal.</h1>
        <Door side={sides.professional} />
        <Door side={sides.personal} />
        <p className="gate-hint" aria-hidden="true">
          <kbd>←</kbd>
          <kbd>→</kbd>
          <span>to preview</span>
          <kbd>Enter</kbd>
          <span>to open</span>
        </p>
      </GateStage>
    </div>
  );
}
