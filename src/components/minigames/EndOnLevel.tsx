"use client";

import { useEffect, useState } from "react";
import { chime } from "../voice";
import css from "./EndOnLevel.module.css";

/**
 * The end of a level, played out on the level itself.
 *
 * The XP Rush games finish where they were played rather than on a screen of
 * their own: the ground they ran, their character stood in it, and these
 * three things over the top - the stars landing one at a time, a sky full of
 * sparks when something rare has happened, and the way on underneath.
 *
 * Shared so the games cannot drift apart: a kid who learns what the end of a
 * level looks like in one of them knows it in all of them.
 */

/** A sky full of it, for the moments worth it. */
export function Fireworks({ big = false }: { big?: boolean }) {
  const bursts = [
    { x: 22, y: 24, hue: "#f2d24a" },
    { x: 70, y: 16, hue: "#e0453a" },
    { x: 44, y: 40, hue: "#63c47f" },
    { x: 84, y: 44, hue: "#7fd8ff" },
    ...(big
      ? [
          { x: 12, y: 58, hue: "#ec6aa0" },
          { x: 58, y: 66, hue: "#f2a516" },
          { x: 34, y: 8, hue: "#fff3bf" },
          { x: 90, y: 20, hue: "#8e44ad" },
        ]
      : []),
  ];
  return (
    <div className={css.sky} aria-hidden>
      {bursts.flatMap((b, bi) =>
        Array.from({ length: 10 }, (_, i) => {
          const a = (i / 10) * Math.PI * 2;
          return (
            <span
              key={`${bi}-${i}`}
              className={css.spark}
              style={
                {
                  left: `${b.x}%`,
                  top: `${b.y}%`,
                  background: b.hue,
                  "--dx": `${Math.round(Math.cos(a) * 62)}px`,
                  "--dy": `${Math.round(Math.sin(a) * 62)}px`,
                  animationDelay: `${bi * 0.28}s`,
                  animationIterationCount: big ? "infinite" : 2,
                } as React.CSSProperties
              }
            />
          );
        }),
      )}
    </div>
  );
}

/**
 * The stars, arriving one at a time with a note each.
 *
 * They land a moment after the level ends, so a kid watches them come in
 * rather than finding them already sitting there.
 */
export function StarPop({ stars, from }: { stars: number; from: number }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const timers = Array.from({ length: stars }, (_, i) =>
      setTimeout(() => {
        setShown(i + 1);
        chime("star", i);
      }, from + i * 650),
    );
    return () => timers.forEach(clearTimeout);
  }, [stars, from]);
  return (
    <div className={`mg-stars ${css.endStars}`} aria-label={`${stars} stars`}>
      {[1, 2, 3].map((n) => (
        <span key={n} className={`star ${shown >= n ? `lit ${css.starIn}` : ""}`} aria-hidden>
          ★
        </span>
      ))}
    </div>
  );
}

/**
 * The way out of a finished level, offered once the stars have landed.
 *
 * Moving on has to be earned: under two stars the only button is another go,
 * because the point of a drill is the part you do not have yet. The same
 * number opens the next level in the list, so this is never a door the list
 * has locked.
 */
export function EndChoices({
  from,
  canNext,
  onNext,
  onReplay,
  hint = "Two stars opens the next level - have another go.",
}: {
  from: number;
  canNext: boolean;
  onNext?: () => void;
  onReplay?: () => void;
  hint?: string;
}) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), from);
    return () => clearTimeout(t);
  }, [from]);
  if (!show) return null;
  return (
    <div className={css.endChoices}>
      {canNext && onNext && (
        <button type="button" className="kbtn small-btn" onClick={onNext} autoFocus>
          Next level ▶
        </button>
      )}
      {onReplay && (
        <button type="button" className={`kbtn small-btn ${canNext ? "ghost" : ""}`} onClick={onReplay}>
          ↺ Try again
        </button>
      )}
      {!canNext && <p className={css.endHint}>{hint}</p>}
    </div>
  );
}

/** The layer all three sit on, over the level itself. */
export function EndOver({ children }: { children: React.ReactNode }) {
  return <div className={css.endOver}>{children}</div>;
}
