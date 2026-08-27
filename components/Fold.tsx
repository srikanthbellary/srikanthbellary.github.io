import { person } from "@/lib/content";

export function Fold() {
  return (
    <section className="fold" id="fold" aria-label="Introduction">
      <div className="wrap">
        <div className="fold-meta">
          <span>Profile</span>
          <span>{person.location}</span>
        </div>
        <hr className="hairline fold-rule" />
        <h1>{person.name}</h1>
        <p className="fold-title">{person.title}</p>
        <p className="fold-line">
          I build production GenAI — <em>agents, retrieval, and data</em> — that
          has to run.
        </p>
        <p className="fold-caps">
          Autonomous agents · Multi-agent systems · RAG · Data
        </p>
        <div className="chip-row">
          <span className="chip">{person.years} years</span>
          <span className="chip">{person.degree}</span>
          <span className="chip chip-gold">{person.cert}</span>
        </div>
        <div className="metric-chip">
          60% mapping <em>·</em> 3× throughput
        </div>
        <hr className="hairline" />
        <div className="fold-foot">
          <span>Forward deployment</span>
          <a className="scroll-cue" href="#work">
            Work ↓
          </a>
        </div>
      </div>
    </section>
  );
}
