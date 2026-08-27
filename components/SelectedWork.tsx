import { clients } from "@/lib/content";

export function SelectedWork() {
  return (
    <section className="selected" id="selected">
      <div className="wrap">
        <div className="chapter-kicker">
          <span>02 — Selected work</span>
          <span>A quiet ledger</span>
        </div>
        <h2 className="chapter-title">
          Names I have <em>worked under</em>
        </h2>
        <p>
          Staffed and engaged work across telecom, CPG measurement, life
          sciences, health, auto retail, QSR, and banking. Listed, not
          advertised.
        </p>
        <ul className="rail-names">
          {clients.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
