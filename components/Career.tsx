"use client";

import { career } from "@/lib/content";
import { CareerMeter, CareerYearStrip } from "./CareerMeter";
import { CareerPlate } from "./figures/CareerPlate";
import { useCareerScroll } from "./useCareerScroll";

export function Career() {
  const { activeId, chapterRefs, subscribe, jump } = useCareerScroll();

  return (
    <section className="career" id="career">
      <div className="wrap career-intro">
        <div className="chapter-kicker">
          <span>03 — Client projects</span>
          <span>The chronometer advances</span>
        </div>
        <h2 className="chapter-title">
          Work I can <em>put a name on.</em>
        </h2>
        <p>
          Newest first. Client, dates, the firm I came through when that is how
          the seat was staffed, and what I built. This is the record.
        </p>
      </div>

      <CareerYearStrip activeId={activeId} onJump={jump} />

      <div className="wrap career-shell">
        <div className="career-chapters">
          {career.map((chapter, index) => (
            <article
              className="career-chapter"
              id={`career-${chapter.id}`}
              key={chapter.id}
              ref={(el) => {
                chapterRefs.current[index] = el;
              }}
            >
              <header className="career-head">
                <div className="career-meta">
                  <span>{chapter.dates}</span>
                  {chapter.via ? <span>via {chapter.via}</span> : null}
                  {chapter.city ? <span>{chapter.city}</span> : null}
                </div>
                <p className="career-index">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(career.length).padStart(2, "0")}
                </p>
                <h3>{chapter.client}</h3>
                <p className="lede">{chapter.role}</p>
                <p className="career-program">{chapter.program}</p>
              </header>

              <ul>
                {chapter.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>

              {chapter.metrics ? (
                <dl className="metrics">
                  {chapter.metrics.map((metric) => (
                    <div className="metric" key={metric.value}>
                      <dt>{metric.value}</dt>
                      <dd>{metric.label}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}

              <p className="career-env">{chapter.env}</p>

              <figure className="plate career-plate">
                <div className="plate-frame">
                  <CareerPlate kind={chapter.figure} />
                </div>
                <figcaption>
                  <span>{chapter.plateKicker}</span>
                  <span>{chapter.plate}</span>
                </figcaption>
              </figure>
            </article>
          ))}
        </div>

        <aside className="meter-col">
          <CareerMeter activeId={activeId} subscribe={subscribe} onJump={jump} />
        </aside>
      </div>
    </section>
  );
}
