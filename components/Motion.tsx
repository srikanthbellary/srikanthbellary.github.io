"use client";

import { useEffect, useState } from "react";

/**
 * Blocks marked `data-reveal` rise into place the first time they come on screen.
 * The stylesheet only hides them when scripts run (html.js), so nothing is lost without this.
 */
export function RevealOnScroll() {
  useEffect(() => {
    const blocks = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    if (!("IntersectionObserver" in window)) {
      blocks.forEach((block) => block.classList.add("is-in"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }),
      { rootMargin: "0px 0px -6% 0px", threshold: 0.04 },
    );
    blocks.forEach((block) => observer.observe(block));
    return () => observer.disconnect();
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
