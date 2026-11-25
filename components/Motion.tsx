"use client";

import { useEffect, useState } from "react";

/**
 * Blocks marked `data-reveal` rise into place the first time they come on screen.
 *
 * Nothing is hidden until this has run: the stylesheet only hides blocks under `.reveal-ready`, which is
 * set here. A page whose script is switched off, slow or fails to load therefore shows everything.
 * Blocks already on screen, or above it, when this runs are left as they are.
 */
export function RevealOnScroll() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const root = document.documentElement;
    const waiting: HTMLElement[] = [];
    for (const block of document.querySelectorAll<HTMLElement>("[data-reveal]")) {
      if (block.getBoundingClientRect().top < window.innerHeight) block.classList.add("is-in");
      else waiting.push(block);
    }
    root.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }),
      { rootMargin: "0px 0px -6% 0px", threshold: 0.04 },
    );
    waiting.forEach((block) => observer.observe(block));

    return () => {
      observer.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}

/** Days to a release date, counted in the visitor's own time zone. Empty until the page is live in the browser. */
export function Countdown({ iso }: { iso: string }) {
  const [text, setText] = useState("");

  useEffect(() => {
    const [year, month, day] = iso.split("-").map(Number);
    const days = Math.ceil((new Date(year, month - 1, day).getTime() - Date.now()) / 86_400_000);
    setText(days > 1 ? `In ${days} days` : days === 1 ? "Tomorrow" : "Out now");
  }, [iso]);

  return <b>{text}</b>;
}
