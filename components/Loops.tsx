"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Album, Short } from "@/lib/music";
import { Play } from "./icons";
import { Thumb } from "./Picture";

const calm = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// The loops are silent and hosted here. Each one is fetched only when it is about to play.
function start(video: HTMLVideoElement | null) {
  if (!video || calm()) return;
  video.muted = true;
  if (!video.getAttribute("src") && video.dataset.src) video.src = video.dataset.src;
  video.play().catch(() => {});
}

/**
 * The tracklist of an album and the loop beside it. The loop follows the track under the pointer
 * (or the one focused or tapped) and plays only while it is on screen.
 */
export function AlbumTracks({ album, note, children }: { album: Album; note: string; children: ReactNode }) {
  const [index, setIndex] = useState(0);
  const video = useRef<HTMLVideoElement>(null);
  const visible = useRef(false);
  const track = album.tracks[index];

  useEffect(() => {
    const element = video.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
        if (entry.isIntersecting) start(element);
        else element.pause();
      },
      { threshold: 0.35 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // A new track: swap the loop, and keep playing if the frame is on screen.
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    element.removeAttribute("src");
    element.load();
    if (visible.current) start(element);
  }, [index]);

  return (
    <>
      <div className="album-body">
        {children}
        <details className="tracks" open>
          <summary>
            <span>Tracklist</span>
            <span>
              {album.countWord} · {note}
            </span>
          </summary>
          <ol>
            {album.tracks.map((item, i) => (
              <li
                className={i === index ? "trk is-on" : "trk"}
                key={item.n}
                tabIndex={0}
                onPointerEnter={() => setIndex(i)}
                onFocus={() => setIndex(i)}
                onClick={() => setIndex(i)}
              >
                <Thumb base={item.art} className="trk-art" />
                <span className="trk-n">{item.n}</span>
                <span className="trk-title">{item.title}</span>
                {item.credit ? <span className="trk-credit">{item.credit}</span> : null}
              </li>
            ))}
          </ol>
        </details>
      </div>

      <figure className="canvas">
        <div className="canvas-frame">
          <video
            ref={video}
            className="loop"
            data-src={track.loop}
            poster={track.still}
            muted
            loop
            playsInline
            preload="none"
            aria-label={`${album.title}: looping clip`}
          />
        </div>
        <figcaption>
          <span>Loop</span>
          <b>
            {track.n} {track.title}
          </b>
        </figcaption>
      </figure>
    </>
  );
}

function ShortCard({ short }: { short: Short }) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    start(video.current);
    setPlaying(!calm());
  };
  const stop = () => {
    video.current?.pause();
    setPlaying(false);
  };

  return (
    <li
      className={playing ? "short is-playing" : "short"}
      data-short
      onPointerEnter={(event) => event.pointerType === "mouse" && play()}
      onPointerLeave={(event) => event.pointerType === "mouse" && stop()}
      onClick={() => (video.current?.paused ? play() : stop())}
    >
      <div className="short-frame">
        <video
          ref={video}
          data-src={short.src}
          poster={short.still}
          muted
          loop
          playsInline
          preload="none"
          aria-label={`${short.title}: ${short.kind}`}
        />
        <span className="short-play" aria-hidden="true">
          <Play size={16} />
        </span>
      </div>
      <p className="label label-row">
        <span>{short.n}</span>
        <span>{short.album}</span>
      </p>
      <h4>{short.title}</h4>
    </li>
  );
}

/** The strip of vertical cuts. Each plays, muted, while it is pointed at, or on a tap. */
export function ShortsStrip({ shorts }: { shorts: Short[] }) {
  return (
    <ul className="shorts-row">
      {shorts.map((short) => (
        <ShortCard short={short} key={short.n} />
      ))}
    </ul>
  );
}
