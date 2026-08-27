import { lanes, stack } from "@/lib/content";

export function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="wrap">
        <div className="chapter-kicker">
          <span>01 — Skills</span>
          <span>A compact stack</span>
        </div>
        <h2 className="chapter-title">
          A few lanes I <em>keep current.</em>
        </h2>
        <p className="skills-lede">
          Not the inventory. The high-end work I still take: agents, retrieval,
          data platforms, mapping, and regulated quality.
        </p>

        <ol className="lanes">
          {lanes.map((lane) => (
            <li key={lane.id}>
              <h3>{lane.title}</h3>
              <p>{lane.line}</p>
              {lane.metric ? (
                <p className="lane-metric">
                  <em>{lane.metric.value}</em>
                  <span>{lane.metric.label}</span>
                </p>
              ) : null}
            </li>
          ))}
        </ol>

        <ul className="stack">
          {stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="stack-note">
          Estate inventory I still cite: 63 services, 236 controllers, 506 REST
          endpoints.
        </p>
      </div>
    </section>
  );
}
