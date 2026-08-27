import { projects } from "@/lib/content";

export function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="wrap">
        <div className="chapter-kicker">
          <span>02 — Open source and apps</span>
          <span>Things I ship under my own name</span>
        </div>
        <h2 className="chapter-title">
          Open source, a pitch, <em>and a firm</em>
        </h2>
        <div className="project-row">
          {projects.map((project) => (
            <article className="project" key={project.name}>
              <div className="project-num">{project.num}</div>
              <h3>{project.name}</h3>
              <p className="lede">{project.lede}</p>
              <p>{project.body}</p>
              <ul className="project-links">
                {project.hrefs.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} rel="noreferrer">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="tags">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
