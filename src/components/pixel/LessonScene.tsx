"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PixelSprite } from "./PixelArt";
import { LESSON_SCENES } from "@/lib/pixel/lessonArt";
import type { PublicBeat } from "@/lib/storyboard";

/**
 * One animated pixel scene on the teaching board.
 *
 * The picture is built from how far the teacher has got through the words it
 * belongs to, so it draws itself as they explain - jars fill, bars grow, a
 * tick lands on the fair test. Key words arrive on top at the moment they are
 * said, rather than a paragraph of caption sitting there from the start.
 */

/** Idle tick for movement that shouldn't wait on the words (wings, steam). */
const IDLE_MS = 420;

export default function LessonScene({
  beat,
  /** 0 to 1 through the words this picture belongs to. */
  progress,
  /** How far the teacher has read, in characters, for timing the key words. */
  charIndex,
  text,
}: {
  beat: PublicBeat;
  progress: number;
  charIndex: number;
  text: string;
}) {
  const draw = beat.art ? LESSON_SCENES[beat.art] : undefined;
  const [frame, setFrame] = useState(0);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (reduced.current) return;
    const t = setInterval(() => setFrame((f) => f + 1), IDLE_MS);
    return () => clearInterval(t);
  }, []);

  // Rounded so the sprite is only rebuilt when the picture would actually
  // change, rather than on every character the voice reports.
  const step = Math.round(Math.max(0, Math.min(1, progress)) * 24) / 24;
  const grid = useMemo(() => draw?.({ progress: step, frame }), [draw, step, frame]);

  const words = useMemo(() => {
    const list = beat.words ?? [];
    return list.map((w, i) => {
      // A word with no cue arrives on its share of the way through.
      const cueAt = w.at ? text.toLowerCase().indexOf(w.at.toLowerCase()) : -1;
      const due = cueAt >= 0 ? cueAt : Math.floor(((i + 1) / (list.length + 1)) * text.length);
      return {
        ...w,
        shown: charIndex >= due,
        x: w.x ?? 8 + (i * 84) / Math.max(1, list.length),
        y: w.y ?? 78,
      };
    });
  }, [beat.words, text, charIndex]);

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
