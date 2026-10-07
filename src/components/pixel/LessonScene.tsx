"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PixelSprite } from "./PixelArt";
import { LESSON_SCENES } from "@/lib/pixel/lessonArt";
import type { PublicBeat } from "@/lib/storyboard";

/**
 * One animated pixel scene on the teaching board.
 *
 * Two clocks drive it, and it needs both:
 *
 *  - `t` is real time, always running. This is what makes it a moving picture
 *    rather than a slide: water sloshes, steam rises, numbers tick over.
 *  - `progress` is how far through the words this picture belongs to. This is
 *    what makes it teach: the answer appears when it is explained, not before.
 *
 * When the teacher is reading, progress follows the voice exactly. When they
 * are not - the kid turned narration off, or is reading it themselves - it
 * runs on a timer paced to the length of the words instead, so the picture
 * still builds rather than jumping to the finished state.
 */

/** Pixel art does not need 60fps, and this is a lot cheaper. */
const FPS = 12;

export default function LessonScene({
  beat,
  /** 0 to 1 from the voice, or null when the voice is not driving this slide. */
  voiceProgress,
  /** Roughly how long the words for this picture take to say. */
  expectedMs,
  /** How far the teacher has read, in characters, for timing the key words. */
  charIndex,
  text,
}: {
  beat: PublicBeat;
  voiceProgress: number | null;
  expectedMs: number;
  charIndex: number;
  text: string;
}) {
  const draw = beat.art ? LESSON_SCENES[beat.art] : undefined;
  const [tick, setTick] = useState(0);
  const started = useRef(Date.now());
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // A fresh picture starts its own clock.
  useEffect(() => {
    started.current = Date.now();
    setTick(0);
  }, [beat.art, beat.caption]);

  useEffect(() => {
    if (!draw) return;
    // Reduced motion still builds the picture, it just does not idle-animate.
    const every = reduced.current ? 400 : 1000 / FPS;
    const id = setInterval(() => setTick((n) => n + 1), every);
    return () => clearInterval(id);
  }, [draw]);

  const elapsed = tick * (1000 / FPS);
  // The voice when it is speaking, otherwise paced to the length of the words.
  const progress = voiceProgress ?? Math.min(1, elapsed / Math.max(1200, expectedMs));
  const t = reduced.current ? 0 : elapsed / 1000;

  const grid = useMemo(
    // Quantised so the sprite is only redrawn when the picture would change.
    () => draw?.({ progress: Math.round(progress * 40) / 40, t: Math.round(t * FPS) / FPS, frame: tick }),
    [draw, progress, t, tick],
  );

  const words = useMemo(() => {
    const list = beat.words ?? [];
    return list.map((w, i) => {
      const cueAt = w.at ? text.toLowerCase().indexOf(w.at.toLowerCase()) : -1;
      const dueChar = cueAt >= 0 ? cueAt : Math.floor(((i + 1) / (list.length + 1)) * text.length);
      // Follow the voice when it is reading; otherwise fall in with the timer.
      const shown = voiceProgress === null ? progress >= (i + 1) / (list.length + 1) : charIndex >= dueChar;
      return { ...w, shown, x: w.x ?? 8 + (i * 84) / Math.max(1, list.length), y: w.y ?? 78 };
    });
  }, [beat.words, text, charIndex, voiceProgress, progress]);

  if (!grid) return null;

  return (
    <div className="sb-slide sb-art">
      <PixelSprite grid={grid} scale={1} className="sb-art-canvas" />
      {words.map((w) => (
        <span key={w.text} className={`sb-word ${w.shown ? "in" : ""}`} style={{ left: `${w.x}%`, top: `${w.y}%` }}>
          {w.text}
        </span>
      ))}
    </div>
  );
}
