"use client";

import { useEffect, useRef } from "react";
import { career } from "@/lib/content";

type MeterProps = {
  activeId: string;
  subscribe: (fn: (value: number) => void) => () => void;
  onJump: (id: string) => void;
};

const SWEEP = 240;
const START = 150;

export function CareerMeter({ activeId, subscribe, onJump }: MeterProps) {
  const needleRef = useRef<SVGGElement>(null);
  const beadRef = useRef<SVGCircleElement>(null);
  const indexRef = useRef<SVGTextElement>(null);
  const clientRef = useRef<SVGTextElement>(null);

  useEffect(() => {
    return subscribe((progress) => {
      const angle = START + progress * SWEEP;
      needleRef.current?.setAttribute("transform", `rotate(${angle} 70 78)`);
      const y = 176 + progress * (516 - 176);
      beadRef.current?.setAttribute("cy", String(y));
    });
  }, [subscribe]);

  useEffect(() => {
    const index = Math.max(0, career.findIndex((chapter) => chapter.id === activeId));
    if (indexRef.current) {
      indexRef.current.textContent = `${String(index + 1).padStart(2, "0")} / ${String(career.length).padStart(2, "0")}`;
    }
    if (clientRef.current) {
      clientRef.current.textContent = career[index]?.tick ?? career[0].tick;
    }
  }, [activeId]);

  const activeIndex = Math.max(
    0,
    career.findIndex((chapter) => chapter.id === activeId),
  );

  return (
    <div className="meter" aria-label="Career chronometer">
      <svg
        className="meter-face"
        viewBox="0 0 140 560"
        role="img"
        aria-hidden="true"
      >
        <rect width="140" height="560" fill="#0E1A2B" />
        <rect
          x="6"
          y="6"
          width="128"
          height="548"
          fill="none"
          stroke="#A8893D"
          strokeWidth="0.75"
        />
        <rect
          x="11"
          y="11"
          width="118"
          height="538"
          fill="none"
          stroke="#A8893D"
          strokeOpacity="0.35"
          strokeWidth="0.5"
        />

        <text
          x="70"
          y="28"
          textAnchor="middle"
          fill="#A8893D"
          fontFamily="Cormorant Garamond, serif"
          fontSize="8"
          letterSpacing="2.2"
        >
          CHRONOMETER
        </text>

        <circle
          cx="70"
          cy="78"
          r="42"
          fill="none"
          stroke="#A8893D"
          strokeOpacity="0.28"
        />
        <circle
          cx="70"
          cy="78"
          r="34"
          fill="none"
          stroke="#A8893D"
          strokeWidth="1.1"
        />
        {Array.from({ length: 24 }, (_, i) => {
          const a = ((START + (i / 23) * SWEEP) * Math.PI) / 180;
          const inner = i % 2 === 0 ? 28 : 31;
          return (
            <line
              key={i}
              x1={70 + Math.cos(a) * inner}
              y1={78 + Math.sin(a) * inner}
              x2={70 + Math.cos(a) * 34}
              y2={78 + Math.sin(a) * 34}
              stroke="#A8893D"
              strokeWidth={i % 2 === 0 ? 1.1 : 0.5}
            />
          );
        })}
        <g ref={needleRef} transform={`rotate(${START} 70 78)`}>
          <line
            x1="70"
            y1="78"
            x2="70"
            y2="48"
            stroke="#A8893D"
            strokeWidth="1.4"
          />
          <circle cx="70" cy="78" r="3.2" fill="#A8893D" />
        </g>
        <text
          ref={indexRef}
          x="70"
          y="136"
          textAnchor="middle"
          fill="#A8893D"
          fontFamily="Cormorant Garamond, serif"
          fontSize="11"
          letterSpacing="1.6"
        >
          01 / 14
        </text>
        <text
          ref={clientRef}
          x="70"
          y="152"
          textAnchor="middle"
          fill="#F7F6F2"
          fontFamily="Cormorant Garamond, serif"
          fontSize="10"
          letterSpacing="1.8"
        >
          VZ
        </text>

        <line
          x1="46"
          y1="176"
          x2="46"
          y2="516"
          stroke="#A8893D"
          strokeOpacity="0.45"
        />
        {career.map((_, index) => {
          const y = 176 + (index / (career.length - 1)) * (516 - 176);
          return (
            <line
              key={career[index].id}
              x1="42"
              y1={y}
              x2="50"
              y2={y}
              stroke="#A8893D"
              strokeWidth="1"
            />
          );
        })}
        <circle ref={beadRef} cx="46" cy="176" r="4" fill="#A8893D" />
      </svg>

      <ol className="meter-ticks">
        {career.map((chapter, index) => (
          <li key={chapter.id}>
            <button
              type="button"
              data-active={chapter.id === activeId}
              aria-current={chapter.id === activeId ? "true" : undefined}
              onClick={() => onJump(chapter.id)}
            >
              <span className="meter-year">{chapter.year}</span>
              <span className="meter-tick">{chapter.tick}</span>
              <span className="meter-dot" data-passed={index <= activeIndex} />
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function CareerYearStrip({
  activeId,
  onJump,
}: {
  activeId: string;
  onJump: (id: string) => void;
}) {
  const scroller = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const active = scroller.current?.querySelector("[data-active='true']");
    if (active instanceof HTMLElement) {
      active.scrollIntoView({
        inline: "center",
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [activeId]);

  return (
    <nav className="year-strip" aria-label="Career years">
      <ol ref={scroller}>
        {career.map((chapter) => (
          <li key={chapter.id}>
            <button
              type="button"
              data-active={chapter.id === activeId}
              aria-current={chapter.id === activeId ? "true" : undefined}
              onClick={() => onJump(chapter.id)}
            >
              <span>{chapter.year}</span>
              <span>{chapter.tick}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
