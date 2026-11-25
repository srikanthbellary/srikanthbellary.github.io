"use client";

import { useEffect, useId, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "./icons";

type Link = { href: string; label: string };

type SiteBarProps = {
  name: string;
  /** The two sides, Professional first. */
  sides: readonly [Link, Link];
  /** Which of the two this page is. */
  current: 0 | 1;
  /** Sections of this page. Hash links; the one on screen is marked as you scroll. */
  sections: readonly Link[];
  cta: Link & { external?: boolean };
};

/**
 * The bar on both sides: the mark (home), the Professional / Personal switch, this page's sections,
 * and one call to action. On a phone the sections fold into a menu that also lists Home and the other side.
 */
export function SiteBar({ name, sides, current, sections, cta }: SiteBarProps) {
  const navId = useId();
  const [open, setOpen] = useState(false);
  const [onScreen, setOnScreen] = useState<string | null>(null);
  const across = sides[current === 0 ? 1 : 0];

  useEffect(() => {
    const targets = [...document.querySelectorAll<HTMLElement>("[data-spy]")];
    if (!targets.length || !("IntersectionObserver" in window)) return;
    const spy = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setOnScreen(`#${entry.target.id}`);
        }),
      { rootMargin: "-35% 0px -60% 0px" },
    );
    targets.forEach((target) => spy.observe(target));
    return () => spy.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="bar" data-open={open}>
      <div className="bar-left">
        <a className="bar-id" href="/" data-side-link aria-label={`${name}: home, choose Professional or Personal`}>
          <span className="bar-mark">SB</span>
          <span className="bar-name">{name}</span>
        </a>
        <nav className="switch" aria-label="Sides">
          {sides.map((side, index) =>
            index === current ? (
              <a href={side.href} aria-current="page" key={side.href}>
                {side.label}
              </a>
            ) : (
              <a href={side.href} data-side-link key={side.href}>
                {side.label}
              </a>
            ),
          )}
        </nav>
      </div>

      <nav className="bar-nav" id={navId} aria-label="On this page">
        {sections.map((section) => (
          <a href={section.href} key={section.href} aria-current={onScreen === section.href ? "true" : undefined} onClick={close}>
            {section.label}
          </a>
        ))}
        <a className="bar-nav-more" href="/">
          <ArrowLeft size={14} /> Home
        </a>
        <a className="bar-nav-more" href={across.href}>
          {across.label} <ArrowRight size={14} />
        </a>
      </nav>

      <a className="bar-cta" href={cta.href} rel={cta.external ? "noreferrer" : undefined}>
        {cta.label} <ArrowUpRight size={16} />
      </a>

      <button
        className="bar-menu"
        type="button"
        aria-expanded={open}
        aria-controls={navId}
        onClick={() => setOpen((value) => !value)}
      >
        Menu
      </button>
    </header>
  );
}
