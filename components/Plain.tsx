import { person } from "@/lib/content";
import { BarHome } from "./SiteBar";

/** The bar on the plain pages (privacy, not found): the mark and the way home. */
export function PlainBar() {
  return (
    <header className="bar">
      <BarHome name={person.name} />
    </header>
  );
}
