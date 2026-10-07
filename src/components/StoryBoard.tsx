"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { beatAt, slidePositions, type PublicBeat, type PublicShow } from "@/lib/storyboard";
import { stopSpeaking, useSpeech } from "./voice";

/** One slide: a real photo, a big emoji picture, or a big word or number. */
function Slide({ b }: { b: PublicBeat }) {
  if (b.photo) {
    return (
      <div className="sb-slide sb-photo">
        {/* The same photo, blurred, fills the frame so portraits and wide shots both look good. */}
        <div className="sb-photo-bg" style={{ backgroundImage: `url("${b.photo.src}")` }} aria-hidden />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={b.photo.src} alt={b.caption} width={b.photo.width} height={b.photo.height} referrerPolicy="no-referrer" />
      </div>
    );
  }
  if (b.emoji) {
    return (
      <div className="sb-slide sb-emoji" aria-label={b.caption}>
        <span>{b.emoji}</span>
      </div>
    );
  }
  return (
    <div className="sb-slide sb-big">
      <span>{b.big ?? b.caption}</span>
    </div>
  );
}

/**
 * The teacher's screen. While the teacher reads, slides change at the words
 * they go with; otherwise kids can flip through them.
 */
export function StoryBoard({ id, text, show }: { id: string; text: string; show: PublicShow }) {
  const beats = show.beats;
  const positions = useMemo(() => slidePositions(text, beats), [text, beats]);
  const s = useSpeech();
  const active = s.id === id;
  // Word-level position when the voice reports it; otherwise the end of the sentence being read.
  const pos = active ? (s.words && s.charIndex >= 0 ? s.charIndex : s.sentence[1] - 1) : -1;
  const auto = active ? beatAt(positions, pos) : null;
  const [picked, setPicked] = useState(0);
  const last = useRef(0);
  if (auto !== null) last.current = auto;
  const index = auto ?? picked;

  // When the teacher stops, stay on the slide they ended on.
  useEffect(() => {
    if (!active) setPicked(last.current);
  }, [active]);

  if (!beats.length) return null;
  const b = beats[Math.min(index, beats.length - 1)];
  const next = beats[index + 1];
  const go = (i: number) => {
    if (active) stopSpeaking();
    setPicked((i + beats.length) % beats.length);
  };

  return (
    <figure className="sb" aria-roledescription="slideshow">
      <div className="sb-screen">
        <div key={index} className="sb-frame">
          <Slide b={b} />
        </div>
        <figcaption className="sb-caption">{b.caption}</figcaption>
        {b.photo && (
          <a className="sb-credit" href={b.photo.link} target="_blank" rel="noreferrer noopener">
            📷 {b.photo.credit} · {b.photo.license}
          </a>
        )}
        {beats.length > 1 && (
          <>
            <button type="button" className="sb-arrow left" onClick={() => go(index - 1)} aria-label="Previous picture">
              ‹
            </button>
            <button type="button" className="sb-arrow right" onClick={() => go(index + 1)} aria-label="Next picture">
              ›
            </button>
          </>
        )}
        {/* Load the next photo early so it appears right on cue. */}
        {next?.photo && <link rel="preload" as="image" href={next.photo.src} />}
      </div>
      {beats.length > 1 && (
        <div className="sb-dots">
          {beats.map((_, i) => (
            <button key={i} type="button" className={i === index ? "on" : ""} onClick={() => go(i)} aria-label={`Picture ${i + 1}`} />
          ))}
        </div>
      )}
    </figure>
  );
}

const clip = (v: NonNullable<PublicShow["watch"]>) => {
  if (v.end === undefined) return null;
  const secs = v.end - (v.start ?? 0);
  return secs >= 60 ? `${Math.round(secs / 60)} min` : `${secs} sec`;
};

/**
 * A short video. Nothing loads from YouTube until the kid presses play
 * (privacy-friendly "no cookie" player, no recommended videos at the end).
 */
export function VideoCard({ video }: { video: NonNullable<PublicShow["watch"]> }) {
  const [playing, setPlaying] = useState(false);
  const params = new URLSearchParams({ autoplay: "1", rel: "0", modestbranding: "1", playsinline: "1", iv_load_policy: "3" });
  if (video.start) params.set("start", String(video.start));
  if (video.end) params.set("end", String(video.end));
  const length = clip(video);
  if (playing) {
    return (
      <div className="video-card playing">
        <div className="video-frame">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtube}?${params}`}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <div className="video-meta">
          🎬 {video.title} <span className="kmuted">· {video.channel}</span>
        </div>
      </div>
    );
  }
  return (
    <button
      type="button"
      className="video-card"
      onClick={() => {
        stopSpeaking();
        setPlaying(true);
      }}
    >
      <span className="video-play" aria-hidden>
        ▶
      </span>
      <span className="video-text">
        <span className="eyebrow">Watch a short video{length ? ` · ${length}` : ""}</span>
        <strong>{video.title}</strong>
        <span className="kmuted small">{video.channel}</span>
      </span>
    </button>
  );
}
