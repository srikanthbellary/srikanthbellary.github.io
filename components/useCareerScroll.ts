"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { career } from "@/lib/content";

export function useCareerScroll() {
  const [activeId, setActiveId] = useState(career[0].id);
  const progressRef = useRef(0);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);
  const listeners = useRef(new Set<(value: number) => void>());

  const subscribe = useCallback((fn: (value: number) => void) => {
    listeners.current.add(fn);
    fn(progressRef.current);
    return () => {
      listeners.current.delete(fn);
    };
  }, []);

  const measure = useCallback(() => {
    const chapters = chapterRefs.current.filter((el): el is HTMLElement => Boolean(el));
    if (!chapters.length) return;

    const line = window.innerHeight * 0.38;
    let best = 0;
    let bestDist = Number.POSITIVE_INFINITY;

    chapters.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      const mid = rect.top + rect.height * 0.35;
      const dist = Math.abs(mid - line);
      if (dist < bestDist) {
        bestDist = dist;
        best = index;
      }
    });

    const el = chapters[best];
    const rect = el.getBoundingClientRect();
    const local = (line - rect.top) / Math.max(rect.height, 1);
    const clamped = Math.min(1, Math.max(0, local));
    const progress = Math.min(0.999, Math.max(0, (best + clamped) / career.length));
    progressRef.current = progress;
    listeners.current.forEach((fn) => fn(progress));

    const nextId = career[best]?.id ?? career[0].id;
    setActiveId((prev) => (prev === nextId ? prev : nextId));
  }, []);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        measure();
      });
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [measure]);

  const jump = useCallback((id: string) => {
    document.getElementById(`career-${id}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  return { activeId, chapterRefs, subscribe, jump };
}
