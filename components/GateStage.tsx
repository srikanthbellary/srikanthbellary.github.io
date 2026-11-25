"use client";

import { useEffect, useRef, useState, type FocusEvent, type MouseEvent, type PointerEvent, type ReactNode } from "react";

type SideKey = "professional" | "personal";

const doorOf = (target: EventTarget | null) =>
  target instanceof Element ? target.closest<HTMLElement>("[data-door]") : null;

const keyOf = (door: HTMLElement | null | undefined) => (door?.dataset.door as SideKey | undefined) ?? null;

/**
 * The home page's two doors. A door wakes under the pointer or the keyboard, whichever moved last:
 * it widens, lights up and lists what is inside, and the other dims. The arrow keys pick a door,
 * Enter opens it. The doors themselves are plain links rendered on the server; this only keeps
 * track of which one is awake and marks it on the stage for the stylesheet.
 */
export function GateStage({ children }: { children: ReactNode }) {
  const stage = useRef<HTMLElement>(null);
  const [active, setActive] = useState<SideKey | null>(null);

  useEffect(() => {
    const doors = () => [...(stage.current?.querySelectorAll<HTMLElement>("[data-door]") ?? [])];

    const onKey = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const index = { ArrowLeft: 0, ArrowUp: 0, ArrowRight: 1, ArrowDown: 1 }[event.key];
      if (index === undefined) return;
      const door = doors()[index];
      if (!door) return;
      event.preventDefault();
      door.focus();
      setActive(keyOf(door));
    };

    // Coming back with the Back button restores the page as it was left: start it fresh.
    const onShow = () => {
      doors().forEach((door) => (door.style.viewTransitionName = ""));
      setActive(keyOf(doors().find((door) => door.matches(":hover"))));
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("pageshow", onShow);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pageshow", onShow);
    };
  }, []);

  // The pointer wakes a door when it enters it or moves on it. Moving between parts of the same door
  // is not an entry: the browser reports those too when the layout shifts under a resting pointer,
  // and a resting pointer must not take the choice back from the keyboard.
  const enter = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const door = doorOf(event.target);
    if (door && door !== doorOf(event.relatedTarget)) setActive(keyOf(door));
  };

  const move = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const key = keyOf(doorOf(event.target));
    if (key && key !== active) setActive(key);
  };

  const focus = (event: FocusEvent<HTMLElement>) => {
    const door = doorOf(event.target);
    if (door?.matches(":focus-visible")) setActive(keyOf(door));
  };

  const blur = () => setActive(keyOf(stage.current?.querySelector<HTMLElement>("[data-door]:hover")));

  const leave = () => setActive(keyOf(stage.current?.querySelector<HTMLElement>("[data-door]:focus-visible")));

  // The chosen door carries the page transition: it grows into the page it opens.
  const choose = (event: MouseEvent<HTMLElement>) => {
    const door = doorOf(event.target);
    if (door) door.style.viewTransitionName = "stage";
  };

  return (
    <main
      className="gate"
      id="top"
      ref={stage}
      data-active={active ?? undefined}
      onPointerOver={enter}
      onPointerMove={move}
      onPointerLeave={leave}
      onFocus={focus}
      onBlur={blur}
      onClick={choose}
    >
      {children}
    </main>
  );
}
