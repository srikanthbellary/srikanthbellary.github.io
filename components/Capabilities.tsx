"use client";

import { useEffect, useRef, useState } from "react";
import { offers } from "@/lib/content";
import { OfferFigure } from "./figures";

export function Capabilities() {
  const [active, setActive] = useState(offers[0].id);
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (top?.target.id) {
          setActive(top.target.id.replace("offer-", ""));
        }
      },
      { rootMargin: "-25% 0px -45% 0px", threshold: [0.2, 0.4, 0.6] },
    );

    offers.forEach((offer) => {
      const el = refs.current[offer.id];
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="capabilities" id="work">
      <div className="wrap cap-intro">
        <div className="chapter-kicker">
          <span>01 — Capabilities</span>
          <span>The rail advances</span>
        </div>
        <h2 className="chapter-title">
          I build systems that <em>have to run.</em>
        </h2>
        <p>
          Fifteen years in, the work that holds my attention is the work that
          survives contact with production: live telemetry, real tickets, and
          data that never agreed on a schema. These are the systems I design
          and ship.
        </p>
      </div>

      <div className="wrap cap-grid">
        <nav className="rail" aria-label="Capabilities">
          <ol>
            {offers.map((offer) => (
              <li key={offer.id}>
                <a href={`#offer-${offer.id}`} data-active={active === offer.id}>
                  <span className="num">{offer.num}</span>
                  <span>{offer.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="panels">
          {offers.map((offer) => (
            <article
              className="panel"
              id={`offer-${offer.id}`}
              key={offer.id}
              ref={(el) => {
                refs.current[offer.id] = el;
              }}
            >
              <h3>{offer.title}</h3>
              <p className="lede">{offer.lede}</p>
              {offer.body.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
              <dl className="metrics">
                {offer.metrics.map((metric) => (
                  <div className="metric" key={metric.value}>
                    <dt>{metric.value}</dt>
                    <dd>{metric.label}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>

        <aside className="figure-col" aria-hidden={false}>
          <div className="plate-stack">
            {offers.map((offer) => (
              <figure
                className="plate"
                key={offer.id}
                data-active={active === offer.id}
              >
                <div className="plate-frame">
                  <OfferFigure kind={offer.figure} />
                </div>
                <figcaption>
                  <span>{offer.plateKicker}</span>
                  <span>{offer.plate}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
