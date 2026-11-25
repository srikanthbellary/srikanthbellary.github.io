import { person } from "@/lib/content";
import { ArrowUpRight } from "./icons";

/** The foot of a page. It links home and nowhere else on the site, except to the privacy note where one applies. */
export function SiteFoot({ privacy = false }: { privacy?: boolean }) {
  return (
    <footer className="foot">
      <span>
        © {new Date().getFullYear()} {person.name}
      </span>
      <a href="/">Home</a>
      {privacy ? <a href="/privacy/">Privacy</a> : null}
      <span>srikanthbellary.com</span>
      <a href="#top" className="foot-top">
        Back to top <ArrowUpRight size={14} />
      </a>
    </footer>
  );
}
