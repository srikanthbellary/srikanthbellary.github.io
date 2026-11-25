import { career, person } from "@/lib/content";
import { telugu } from "@/lib/music";
import { doorSummary, other, type Side, type SideKey } from "@/lib/sides";
import { BlueprintBackdrop, StormBackdrop } from "./Backdrops";
import { IncidentPlate } from "./figures/Plates";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "./icons";
import { Picture, Portrait } from "./Picture";

function Sub({ side }: { side: Side }) {
  return (
    <p className="door-sub">
      {side.sub.flatMap((item, index) =>
        index === 0 ? [<span key={item}>{item}</span>] : [<i aria-hidden="true" key={`dot-${item}`} />, <span key={item}>{item}</span>],
      )}
    </p>
  );
}

/**
 * One of the two doors on the home page: a link the size of half the screen.
 * Professional carries the portrait and the incident-path drawing on a drafting grid.
 * Personal carries the storm and the album cover, and never the portrait.
 */
export function Door({ side }: { side: Side }) {
  const pro = side.key === "professional";

  return (
    <a
      className={pro ? "door door-pro" : "door door-per"}
      href={side.href}
      data-door={side.key}
      data-side-link
      data-area={pro ? undefined : "music"}
      aria-label={doorSummary(side)}
    >
      <div className={pro ? "door-bg" : "door-bg screen-bg"} aria-hidden="true">
        {pro ? <div className="screen-scrim" /> : <StormBackdrop sizes="(max-width: 900px) 150vw, 90vw" eager />}
      </div>
      <span className="door-mast" aria-hidden="true">
        {pro ? person.name.split(" ")[0] : person.name.split(" ").slice(1).join(" ")}
      </span>

      <div className="door-head">
        <p className="door-n">
          <span>Screen {side.n}</span>
          <em>{side.tagline}</em>
        </p>
        <h2>{side.label}</h2>
        <Sub side={side} />
      </div>

      <div className="door-stage">
        {pro ? (
          <>
            <figure className="door-inset">
              <Portrait sizes="(max-width: 900px) 110px, 220px" eager />
            </figure>
            <div className="door-plate" aria-hidden="true">
              <IncidentPlate chapter={career[0]} decorative />
            </div>
          </>
        ) : (
          <figure className="door-inset">
            <Picture art={telugu.cover} sizes="(max-width: 900px) 140px, 280px" alt="" eager />
            <span className="record-tag">{telugu.out}</span>
          </figure>
        )}
      </div>

      <div className="door-foot">
        <p className="door-line">{side.line}</p>
        <ul className="door-list">
          {side.contents.map((item) => (
            <li key={item.label}>
              <b>{item.label}</b>
              <span>{item.note}</span>
            </li>
          ))}
        </ul>
        <span className="door-enter">
          Enter {side.label} <ArrowRight size={16} />
        </span>
      </div>
    </a>
  );
}

/** At the foot of each side: the other side as one wide door, and the way home. */
export function CrossOver({ from }: { from: SideKey }) {
  const to = other(from);
  const storm = to.key === "personal";

  return (
    <section className="cross" aria-label="The other side">
      <a
        className={storm ? "cross-door cross-per" : "cross-door cross-pro"}
        href={to.href}
        data-side-link
        data-area={storm ? "music" : undefined}
      >
        <div className={storm ? "door-bg screen-bg" : "door-bg"} aria-hidden="true">
          {storm ? <StormBackdrop sizes="100vw" /> : <BlueprintBackdrop />}
        </div>
        <div className="cross-head">
          <p className="label">
            <span>Screen {to.n}</span>
            <span>The other side</span>
          </p>
          <h2>{to.label}</h2>
          <Sub side={to} />
        </div>
        <div className="cross-side">
          <p>{to.line}</p>
          <span className="door-enter">
            Enter {to.label} <ArrowRight size={16} />
          </span>
        </div>
      </a>
      <a className="cross-home" href="/" data-side-link>
        <ArrowLeft size={16} /> <b>Home</b> <span>Both sides, side by side</span>
      </a>
    </section>
  );
}

export function SiteFoot({ from }: { from?: SideKey }) {
  const to = from ? other(from) : null;

  return (
    <footer className="foot">
      <span>
        © {new Date().getFullYear()} {person.name}
      </span>
      <a href="/">Home</a>
      {to ? <a href={to.href}>{to.label}</a> : null}
      <a href="/privacy/">Privacy</a>
      <span>srikanthbellary.com</span>
      <a href="#top" className="foot-top">
        Back to top <ArrowUpRight size={14} />
      </a>
    </footer>
  );
}
