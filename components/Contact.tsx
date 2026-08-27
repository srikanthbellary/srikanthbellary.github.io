import { person } from "@/lib/content";

export function Contact() {
  return (
    <footer className="contact" id="contact">
      <div className="wrap">
        <div className="chapter-kicker">
          <span>04 — Contact</span>
          <span>{person.location}</span>
        </div>
        <h2 className="chapter-title">
          If the work has to run, <em>write me.</em>
        </h2>
        <p>
          I take the hard one: the agent that must finish, the retrieval that
          must refuse, the estate that has never agreed on a schema.
        </p>
        <dl className="contact-grid">
          <div>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${person.email}`}>{person.email}</a>
            </dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>
              <a href={person.phoneHref}>{person.phone}</a>
            </dd>
          </div>
          <div>
            <dt>LinkedIn</dt>
            <dd>
              <a href={person.linkedin} rel="noreferrer">
                linkedin.com/in/srikanth-bellary
              </a>
            </dd>
          </div>
          <div>
            <dt>GitHub</dt>
            <dd>
              <a href={person.github} rel="noreferrer">
                github.com/srikanthbellary
              </a>
            </dd>
          </div>
          <div>
            <dt>Medium</dt>
            <dd>
              <a href={person.medium} rel="noreferrer">
                medium.com/@srikanthbellary01
              </a>
            </dd>
          </div>
          <div>
            <dt>Studio</dt>
            <dd>{person.location}</dd>
          </div>
        </dl>
        <div className="site-foot">
          <span>© {new Date().getFullYear()} {person.name}</span>
          <span>srikanthbellary.com</span>
        </div>
      </div>
    </footer>
  );
}
