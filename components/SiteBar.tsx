"use client";

import { useEffect, useId, useState } from "react";
import { ArrowLeft, ArrowUpRight } from "./icons";

type Link = { href: string; label: string };

type SiteBarProps = {
  name: string;
  /** Sections of this page. Hash links; the one on screen is marked as you scroll. */
  sections: readonly Link[];
  cta: Link & { external?: boolean };
};

/** The mark and the Home link. Home is the only way out of a page: the two sides never link to each other. */
export function BarHome({ name }: { name: string }) {
  return (
    <div className="bar-left">
      {/* The mark also goes home; the Home link next to it is the one announced and tabbed to. */}
      <a className="bar-id" href="/" aria-hidden="true" tabIndex={-1}>
        <span className="bar-mark">SB</span>
        <span className="bar-name">{name}</span>
      </a>
      <a className="bar-home" href="/" data-side-link>
        <ArrowLeft size={13} /> Home
      </a>
    </div>
  );
}

/** The bar on a side: the way home, this page's sections, and one call to action. On a phone the sections fold into a menu. */
export function SiteBar({ name, sections, cta }: SiteBarProps) {
  const navId = useId();
  const [open, setOpen] = useState(false);
  const [onScreen, setOnScreen] = useState<string | null>(null);

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

  return (
    <header className="bar" data-open={open}>
      <BarHome name={name} />

      <nav className="bar-nav" id={navId} aria-label="On this page">
        {sections.map((section) => (
          <a
            href={section.href}
            key={section.href}
            aria-current={onScreen === section.href ? "true" : undefined}
            onClick={() => setOpen(false)}
          >
            {section.label}
          </a>
        ))}
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
