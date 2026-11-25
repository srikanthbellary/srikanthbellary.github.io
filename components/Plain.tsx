import { person } from "@/lib/content";
import { ArrowLeft } from "./icons";

/** The bar on the plain pages (privacy, not found): the mark, and the way home. */
export function PlainBar() {
  return (
    <header className="bar">
      <a className="bar-id" href="/" aria-label={`${person.name}: home`}>
        <span className="bar-mark">SB</span>
        <span className="bar-name">{person.name}</span>
      </a>
      <a className="back" href="/">
        <ArrowLeft size={14} /> Home
      </a>
    </header>
  );
}
