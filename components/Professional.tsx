import {
  buildNotes,
  career,
  education,
  lanes,
  person,
  positioning,
  projects,
  stackGroups,
  type CareerChapter,
} from "@/lib/content";
import { BlueprintBackdrop } from "./Backdrops";
import { AskCard } from "./Chat";
import { CareerPlate } from "./figures/CareerPlate";
import { IncidentPlate, MappingPlate } from "./figures/Plates";
import { ArrowDown, ArrowUpRight, Plus } from "./icons";
import { Portrait } from "./Picture";

// The Professional page: the IT and AI engineering work, and nothing else.
// It links home and never to the other page, and it does not mention that page's content.

const pad = (n: number) => String(n).padStart(2, "0");
const viaLine = (chapter: CareerChapter) =>
  [chapter.via ? `via ${chapter.via}` : "", chapter.city ?? ""].filter(Boolean).join(" · ");

const [verizon, circana, thermo, cvs] = career;

function SectionHead({ n, id, title, children }: { n: string; id: string; title: React.ReactNode; children: React.ReactNode }) {
  return (
    <header className="sec-head">
      <p className="sec-n">
        <span>{n}</span>
        <span>{id}</span>
      </p>
      <h2>{title}</h2>
      <div className="sec-aside">{children}</div>
    </header>
  );
}

function Dots({ items }: { items: readonly string[] }) {
  return (
    <>
      {items.flatMap((item, index) =>
        index === 0 ? [<span key={item}>{item}</span>] : [<i aria-hidden="true" key={`dot-${item}`} />, <span key={item}>{item}</span>],
      )}
    </>
  );
}

/* —— Hero: who, then what is showing now —— */

export function ProfessionalHero() {
  // "SRE multi-agent incident intelligence", with "multi-agent" kept on one line.
  const [before, after] = verizon.program.replace(/\.$/, "").split("multi-agent");

  return (
    <section className="hero hero-pro" id="intro" aria-label="Introduction">
      <p className="id-meta">
        <span>Profile · {new Date().getFullYear()}</span>
        <span>{person.location}</span>
        <span>
          Now{" "}
          <b>
            {verizon.role}, {verizon.client} via {verizon.via}
          </b>
        </span>
      </p>

      <div className="id">
        <figure className="id-portrait">
          <Portrait sizes="(max-width: 900px) 84px, 124px" eager />
        </figure>
        <div className="id-name">
          <h1>{person.name}</h1>
          <p className="id-roles">
            <Dots items={positioning.roles} />
          </p>
          <p className="id-now">{positioning.now}</p>
        </div>
      </div>

      <div className="id-about">
        <p>
          {positioning.overview} {positioning.home}
        </p>
        <ul className="chips">
          <li>{person.years} years</li>
          <li>{person.degree}</li>
          <li>{person.cert}</li>
        </ul>
      </div>

      <div className="screen screen-pro">
        <div className="screen-bg" aria-hidden="true">
          <BlueprintBackdrop />
        </div>

        <div className="screen-hud">
          <p>
            <span className="rec" aria-hidden="true" />
            Now showing <b>Case file 01</b>
          </p>
          <p>
            {verizon.dates}{" "}
            <b>
              {verizon.client} via {verizon.via}
            </b>
          </p>
        </div>

        <div className="screen-main">
          <div className="title-card">
            <p className="label label-row">
              <span>Case file 01</span>
              <span>{verizon.client}</span>
              <span>{verizon.role}</span>
            </p>
            <h2>
              {before}
              <span className="nb">multi-agent</span>
              {after}
            </h2>
            <p className="title-line">{verizon.bullets[3]}</p>
            <div className="title-cta">
              <a className="btn btn-solid" href={`#case-${verizon.id}`}>
                Open the case file <ArrowDown size={14} />
              </a>
              <a className="btn btn-ghost" href={`mailto:${person.email}`}>
                Write me <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          <a
            className="record record-plate"
            href={`#case-${verizon.id}`}
            aria-label={`Case file 01: ${verizon.client}, the incident path`}
          >
            <span className="plate">
              <IncidentPlate chapter={verizon} decorative />
            </span>
            <span className="record-tag">Case file 01</span>
          </a>
        </div>
      </div>

      <nav className="rail rail-pro" aria-label="On this page">
        <a className="rail-item" href="#work">
          <span className="rail-n">01</span>
          <b>Work</b>
          <i>Case files, newest first</i>
        </a>
        <a className="rail-item" href="#stack">
          <span className="rail-n">02</span>
          <b>Stack</b>
          <i>A compact stack</i>
        </a>
        <a className="rail-item" href="#experience">
          <span className="rail-n">03</span>
          <b>Experience</b>
          <i>{career.length} engagements · 2006 to now</i>
        </a>
        <a className="rail-item" href="#contact">
          <span className="rail-n">04</span>
          <b>Contact</b>
          <i>Write me directly</i>
        </a>
      </nav>
    </section>
  );
}

/* —— Work —— */

function Metrics({ chapter }: { chapter: CareerChapter }) {
  if (!chapter.metrics) return null;
  return (
    <dl className="metrics">
      {chapter.metrics.map((metric) => (
        <div key={metric.value}>
          <dt>{metric.value}</dt>
          <dd>{metric.label}</dd>
        </div>
      ))}
    </dl>
  );
}

function CaseFile({ chapter, index, children }: { chapter: CareerChapter; index: number; children: React.ReactNode }) {
  return (
    <article className="case" id={`case-${chapter.id}`}>
      <div className="case-meta">
        <p className="label">Case file {pad(index + 1)}</p>
        <dl>
          <div>
            <dt>Dates</dt>
            <dd>{chapter.dates}</dd>
          </div>
          {chapter.via ? (
            <div>
              <dt>Via</dt>
              <dd>{chapter.via}</dd>
            </div>
          ) : null}
          <div>
            <dt>Role</dt>
            <dd>{chapter.role}</dd>
          </div>
          <div>
            <dt>Environment</dt>
            <dd>{chapter.env}</dd>
          </div>
        </dl>
      </div>
      <div className="case-body">
        <h3>{chapter.client}</h3>
        <p className="case-program">{chapter.program}</p>
        <ul>
          {chapter.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </div>
      <figure className="case-figure">
        <div className="plate">{children}</div>
        <Metrics chapter={chapter} />
      </figure>
    </article>
  );
}

function CaseMini({ chapter }: { chapter: CareerChapter }) {
  return (
    <article className="mini" id={`case-${chapter.id}`}>
      <p className="label">
        {chapter.dates}
        {viaLine(chapter) ? ` · ${viaLine(chapter)}` : ""}
      </p>
      <h3>{chapter.client}</h3>
      <p className="mini-role">{chapter.role}</p>
      <p className="mini-program">{chapter.program}</p>
      <ul>
        {chapter.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      <p className="mini-env">{chapter.env}</p>
    </article>
  );
}

export function Work() {
  return (
    <section className="sec work" id="work" data-spy>
      <SectionHead
        n="01"
        id="Work"
        title={
          <>
            AI engineering <em>&amp;</em> architecture
          </>
        }
      >
        <p className="lead">Work I can put a name on.</p>
        <p>
          Newest first. Client, dates, the firm I came through when that is how the seat was staffed, and what I
          built. This is the record.
        </p>
      </SectionHead>

      <div className="cases">
        <CaseFile chapter={verizon} index={0}>
          <IncidentPlate chapter={verizon} />
        </CaseFile>
        <CaseFile chapter={circana} index={1}>
          <MappingPlate />
        </CaseFile>
      </div>

      <div className="minis" data-reveal>
        <CaseMini chapter={thermo} />
        <CaseMini chapter={cvs} />
      </div>

      <div className="lanes-block" data-reveal>
        <div className="sub-head">
          <h3>A few lanes I keep current.</h3>
          <p>
            Not the inventory. The high-end work I still take: agents, retrieval, data platforms, mapping, and
            regulated quality.
          </p>
        </div>
        <ol className="lanes">
          {lanes.map((lane, index) => (
            <li key={lane.id}>
              <p className="label">Lane {pad(index + 1)}</p>
              <h4>{lane.title}</h4>
              <p className="lane-line">{lane.line}</p>
              {lane.metric ? (
                <p className="lane-metric">
                  <b>{lane.metric.value}</b>
                  <span>{lane.metric.label}</span>
                </p>
              ) : null}
            </li>
          ))}
        </ol>
      </div>

      <div className="notes" data-reveal>
        {buildNotes.map((note) => (
          <article key={note.id}>
            <p className="note-value">{note.value}</p>
            <p className="label">{note.label}</p>
            <p className="note-line">{note.line}</p>
          </article>
        ))}
      </div>

      <div className="built" data-reveal>
        <div className="sub-head">
          <h3>Open source, a pitch, and a firm</h3>
          <p>Things I ship under my own name.</p>
        </div>
        <div className="built-row">
          {projects.map((project) => (
            <article className="project" key={project.name}>
              <p className="label">
                <span>{project.num}</span>
                <span>{project.kicker}</span>
              </p>
              <h4>{project.name}</h4>
              <p className="project-lede">{project.lede}</p>
              <p className="project-body">{project.body}</p>
              <ul className="project-links">
                {project.hrefs.map((link) => (
                  <li key={link.href}>
                    <a className="text-link" href={link.href} rel="noreferrer">
                      {link.label} <ArrowUpRight size={14} />
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

/* —— Stack —— */

export function Stack() {
  return (
    <section className="sec stack" id="stack" data-spy>
      <SectionHead
        n="02"
        id="Stack"
        title={
          <>
            Skills <em>&amp;</em> stack
          </>
        }
      >
        <p className="lead">A compact stack.</p>
        <p>The stack used on the work above. It is not a complete inventory.</p>
      </SectionHead>

      <dl className="groups" data-reveal>
        {stackGroups.map((group) => (
          <div className="group" key={group.id}>
            <dt>{group.title}</dt>
            <dd>
              {group.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </dd>
          </div>
        ))}
      </dl>

      <ul className="creds" data-reveal>
        {education.map((item) => (
          <li key={item.label}>
            <span className="label">Education · {item.year}</span>
            <b>{item.label}</b>
          </li>
        ))}
        <li>
          <span className="label">Certification</span>
          <b>{person.cert}</b>
        </li>
        <li>
          <span className="label">Experience</span>
          <b>{person.years} years in production systems</b>
        </li>
      </ul>
    </section>
  );
}

/* —— Experience: the whole record, one row per engagement, each row opens —— */

export function Experience() {
  return (
    <section className="sec exp" id="experience" data-spy>
      <SectionHead n="03" id="Experience" title="Credits">
        <p className="lead">Client projects, newest first.</p>
        <p>{career.length} engagements, 2006 to now. Staffing firms appear as “via”. Open a row for the detail.</p>
      </SectionHead>

      <ol className="credits" data-reveal>
        {career.map((chapter, index) => (
          <li className="credit" id={`credit-${chapter.id}`} key={chapter.id}>
            <details>
              <summary className="credit-row">
                <span className="credit-n">{pad(index + 1)}</span>
                <span className="credit-dates">{chapter.dates}</span>
                <h3 className="credit-client">{chapter.client}</h3>
                <span className="credit-role">{chapter.role}</span>
                <span className="credit-program">{chapter.program}</span>
                <span className="credit-via">{viaLine(chapter)}</span>
                <span className="credit-toggle" aria-hidden="true">
                  <Plus size={16} />
                </span>
              </summary>
              <div className="credit-more">
                <div className="credit-text">
                  <ul>
                    {chapter.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <Metrics chapter={chapter} />
                  <p className="credit-env">{chapter.env}</p>
                </div>
                <figure className="credit-plate">
                  <CareerPlate kind={chapter.figure} />
                  <figcaption>
                    <span>{chapter.plateKicker}</span>
                    <span>{chapter.plate}</span>
                  </figcaption>
                </figure>
              </div>
            </details>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* —— Contact —— */

const reach = [
  { label: "Phone", text: person.phone, href: person.phoneHref, external: false },
  { label: "LinkedIn", text: "linkedin.com/in/srikanth-bellary", href: person.linkedin, external: true },
  { label: "GitHub", text: "github.com/srikanthbellary", href: person.github, external: true },
  { label: "Medium", text: "medium.com/@srikanthbellary01", href: person.medium, external: true },
] as const;

export function Contact() {
  return (
    <section className="sec contact" id="contact" data-spy>
      <div className="contact-top">
        <p className="sec-n">
          <span>04</span>
          <span>Contact</span>
        </p>
        <h2>
          Write me <em>directly.</em>
        </h2>
        <p className="contact-lede">
          I am in Wellington, Florida. Email is the surest path. The record above is the work I can discuss.
        </p>
      </div>

      <a className="mail" href={`mailto:${person.email}`}>
        <span>{person.email}</span>
        <ArrowUpRight size={44} />
      </a>

      <div className="contact-grid">
        <dl className="reach">
          {reach.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>
                <a href={item.href} rel={item.external ? "noreferrer" : undefined}>
                  {item.text}
                </a>
              </dd>
            </div>
          ))}
          <div>
            <dt>Studio</dt>
            <dd>{person.location}</dd>
          </div>
        </dl>

        <AskCard />
      </div>
    </section>
  );
}
