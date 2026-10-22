"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { MiaSettings } from "@/content/miacademy";
import { bikeGrid, mountainGrid, treeGrid } from "@/lib/pixel/buddies";
import { breakMusic } from "@/components/voice";
import Buddy, { PixelSvg } from "./Buddy";

/** What the buddy does on a break. Breaks during a class always walk; breaks between classes take turns. */
export type BreakActivity = "walk" | "swim" | "mountain" | "tree" | "bike";
export const BREAK_ACTIVITIES: BreakActivity[] = ["walk", "swim", "mountain", "tree", "bike"];

const CAPTION: Record<BreakActivity, string> = {
  walk: "is going for a walk!",
  swim: "is floating on its back!",
  mountain: "is climbing a mountain!",
  tree: "is climbing a tree!",
  bike: "is riding a bike!",
};

/** A different activity from last time. */
export function nextActivity(last: BreakActivity | null, random = Math.random): BreakActivity {
  const choices = BREAK_ACTIVITIES.filter((a) => a !== last);
  return choices[Math.floor(random() * choices.length)] ?? "walk";
}

const BUDDY_W = 220;


/** Where the buddy is (left/bottom in px), how it's turned, and whether it's on its back. */
function pose(activity: BreakActivity, p: number, w: number, h: number, now: number) {
  const across = -BUDDY_W + p * (w + BUDDY_W);
  switch (activity) {
    case "swim":
      // Lying on its back right on the water (the water's top is 38% up the screen).
      return { x: across, y: h * 0.38 - 26 + Math.sin(now / 500) * 5, rot: Math.sin(now / 700) * 4, flip: true, scale: 1 };
    case "mountain": {
      // Up the left slope to the peak (the middle of the screen), then a rest on top.
      const climb = Math.min(1, p / 0.85);
      const peakY = h * 0.55 * 0.9;
      const angle = (-Math.atan2(peakY, w / 2) * 180) / Math.PI;
      return { x: -BUDDY_W / 2 + climb * (w / 2), y: climb * peakY - 10, rot: climb < 1 ? angle : 0, flip: false, scale: 1 };
    }
    case "tree": {
      const climb = Math.min(1, p / 0.85);
      // Smaller, up the trunk (the tree is up to 400px tall, from 8% up the screen) to just under the leaves.
      const treeH = Math.min(400, h * 0.44);
      return { x: w / 2 - BUDDY_W / 2, y: h * 0.08 + 10 + climb * treeH * 0.4, rot: -90, flip: false, scale: 0.55 };
    }
    default:
      return { x: across, y: h * 0.22, rot: 0, flip: false, scale: 1 };
  }
}

/**
 * The full-screen break: a countdown, a 30-second warning, a little tune, and
 * the kid's buddy doing something active for the whole break.
 */
export default function BreakScene({
  endAt,
  lenMs,
  now,
  buddy,
  color,
  activity = "walk",
  title = "Break time!",
  onDone,
  onWarn,
  onTimeUp,
}: {
  endAt: number;
  lenMs: number;
  now: number;
  buddy: MiaSettings["buddy"];
  color: string;
  activity?: BreakActivity;
  title?: string;
  /** "I'm ready to go back". */
  onDone: () => void;
  /** 30 seconds left (when the scene keeps its own time). */
  onWarn?: () => void;
  /** The break is over (when the scene keeps its own time). */
  onTimeUp?: () => void;
}) {
  const [size, setSize] = useState({ w: 1000, h: 800 });
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const set = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    set();
    window.addEventListener("resize", set);
    const t = setInterval(() => setFrame((f) => 1 - f), 220);
    return () => {
      window.removeEventListener("resize", set);
      clearInterval(t);
    };
  }, []);
  // A little tune while the buddy moves; it stops when the break ends.
  useEffect(() => breakMusic(), []);

  const rem = Math.max(0, endAt - now);
  const fired = useRef({ warn: false, up: false });
  useEffect(() => {
    if (onWarn && !fired.current.warn && rem <= 30000 && rem > 0) {
      fired.current.warn = true;
      onWarn();
    }
    if (onTimeUp && !fired.current.up && rem <= 0) {
      fired.current.up = true;
      onTimeUp();
    }
  }, [rem, onWarn, onTimeUp]);

  const bikes = useMemo(() => [bikeGrid(0), bikeGrid(1)], []);
  const tree = useMemo(() => treeGrid(), []);
  const mountain = useMemo(() => mountainGrid(), []);
  const at = pose(activity, 1 - rem / lenMs, size.w, size.h, now);
  const buddyName = buddy === "wolf" ? "Your wolf" : "Your panda";

  return (
    <div className={`mia-break ${activity} ${rem <= 30000 ? "ending" : ""}`}>
      <div className="mia-sun" />
      <div className="mia-cloud c1" />
      <div className="mia-cloud c2" />
      {activity === "mountain" && <PixelSvg grid={mountain} className="mia-scene-mountain" stretch />}
      {activity === "tree" && <PixelSvg grid={tree} className="mia-scene-tree" />}
      {activity === "swim" && <div className="mia-scene-water" />}
      <h1>{title}</h1>
      <div className="mia-count">{mmss(rem)}</div>
      {activity !== "walk" && (
        <div className="mia-break-caption">
          {buddyName} {CAPTION[activity]}
        </div>
      )}
      <div className="mia-warn">30 seconds! Head back to your seat!</div>
      <button className="mia-btn big" style={{ ["--c" as string]: color }} onClick={onDone}>
        I&apos;m ready to go back
      </button>
      <div
        className={`mia-walker ${at.flip ? "on-back" : ""}`}
        style={{ transform: `translate(${Math.round(at.x)}px, ${-Math.round(at.y)}px) rotate(${at.rot.toFixed(1)}deg) scale(${at.scale})` }}
      >
        <Buddy kind={buddy} className="mia-buddy" />
        {activity === "bike" && <PixelSvg grid={bikes[frame]} className="mia-bike" />}
      </div>
    </div>
  );
}

function mmss(ms: number): string {
  const s = Math.ceil(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

