"use client";

import { useEffect, useState } from "react";
import { person } from "@/lib/content";
import { Monogram } from "./Monogram";

const links = [
  { href: "#skills", id: "skills", label: "Skills" },
  { href: "#projects", id: "projects", label: "Built" },
  { href: "#career", id: "career", label: "Career" },
  { href: "#contact", id: "contact", label: "Contact" },
] as const;

export function Nav() {
  const [active, setActive] = useState<string>("fold");

  useEffect(() => {
    const ids = ["fold", ...links.map((l) => l.id)];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a className="wordmark" href="#fold">
          <Monogram className="mono" />
          <span className="wordmark-name">{person.name}</span>
        </a>
        <nav aria-label="Primary">
          <ul className="nav-links">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} data-active={active === link.id}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
