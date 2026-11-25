"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Plus } from "./icons";

// Videos play from YouTube's no-cookie host, and nothing is requested from it until play is pressed.
const embed = (id: string) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`;
const ALLOW = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

type Clip = { id: string; title: string };

/**
 * A video still that turns into the player when pressed. The whole still is the target;
 * the round button is its keyboard handle.
 */
export function LiteYouTube({ id, title, className, children, play }: Clip & { className?: string; children: ReactNode; play: ReactNode }) {
  const [playing, setPlaying] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (playing) frame.current?.focus({ preventScroll: true });
  }, [playing]);

  return (
    <div
      className={["yt", className, playing ? "is-playing" : ""].filter(Boolean).join(" ")}
      data-yt={id}
      onClick={() => setPlaying(true)}
    >
      {children}
      <button className="yt-play" type="button" aria-label={`Play ${title}`}>
        {play}
      </button>
      {playing ? <iframe ref={frame} src={embed(id)} title={title} allow={ALLOW} allowFullScreen /> : null}
    </div>
  );
}

const OPEN = "theater:open";

/** Opens a video in the theater from anywhere on the page. */
export function TheaterButton({ id, title, className, children }: Clip & { className?: string; children: ReactNode }) {
  return (
    <button
      className={className}
      type="button"
      data-theater={id}
      onClick={() => window.dispatchEvent(new CustomEvent<Clip>(OPEN, { detail: { id, title } }))}
    >
      {children}
    </button>
  );
}

/** One dialog per page. The player exists only while the dialog is open. */
export function Theater() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [clip, setClip] = useState<Clip | null>(null);

  useEffect(() => {
    const onOpen = (event: Event) => setClip((event as CustomEvent<Clip>).detail);
    window.addEventListener(OPEN, onOpen);
    return () => window.removeEventListener(OPEN, onOpen);
  }, []);

  useEffect(() => {
    if (clip && !dialog.current?.open) dialog.current?.showModal();
  }, [clip]);

  return (
    <dialog
      className="theater"
      ref={dialog}
      aria-label="Video"
      onClose={() => setClip(null)}
      onClick={(event) => {
        if (event.target === dialog.current) dialog.current?.close();
      }}
    >
      <form method="dialog">
        <button className="theater-close" aria-label="Close video">
          Close <Plus size={16} />
        </button>
      </form>
      <div className="theater-frame">
        {clip ? <iframe src={embed(clip.id)} title={clip.title} allow={ALLOW} allowFullScreen /> : null}
      </div>
      <p className="theater-title">{clip?.title}</p>
    </dialog>
  );
}
