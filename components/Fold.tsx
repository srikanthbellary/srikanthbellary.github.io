import { person } from "@/lib/content";

export function Fold() {
  return (
    <section className="fold" id="fold" aria-label="Introduction">
      <div className="wrap">
        <div className="fold-meta">
          <span>Profile · 2026</span>
          <span>{person.location}</span>
        </div>
        <hr className="hairline fold-rule" />
        <h1>{person.name}</h1>
        <p className="fold-title">{person.title}</p>
        <p className="fold-line">
          I have spent {person.years} years in production systems. I live in
          Wellington, Florida.
        </p>
        <div className="chip-row">
          <span className="chip">{person.years} years</span>
          <span className="chip">{person.degree}</span>
          <span className="chip chip-gold">{person.cert}</span>
        </div>
        <hr className="hairline" />
        <div className="fold-foot">
          <span>Wellington, FL</span>
          <a className="scroll-cue" href="#career">
            Career ↓
          </a>
        </div>
      </div>
    </section>
  );
}
