"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PixelSprite } from "./PixelArt";
import { useSpeech } from "../voice";
import { bustFrames, fullFrames, visemeAt, visemeAtTime, type TeacherPose, type Viseme } from "@/lib/pixel/teacher";
import type { AvatarLook } from "@/content/avatars";

/**
 * The teacher, as a pixel character who talks.
 *
 * The mouth follows the real audio: the voice layer publishes how far through
 * the line it has read, so the shape on screen is the sound being made rather
 * than a random flap. When the voice can't say where it is (some browser
 * voices), it falls back to a steady rhythm.
 *
 * `body="full"` draws them standing, for the teacher who lives on the slide.
 */

const BLINK_MS = 120;
const blinkGap = () => 3000 + Math.random() * 4000;

export default function PixelTeacher({
  look,
  speakingId,
  text,
  talking: talkingProp,
  scale = 6,
  pointing = false,
  mood = "neutral",
  body = "bust",
  facing = "right",
  walking = false,
  title,
}: {
  look: AvatarLook;
  /** The id of the line being spoken, so the mouth follows this teacher's own line. */
  speakingId?: string | null;
  text?: string;
  /** For callers that only know "is the teacher speaking", with no line to follow. */
  talking?: boolean;
  scale?: number;
  pointing?: boolean;
  mood?: TeacherPose["mood"];
  body?: "bust" | "full";
  facing?: TeacherPose["facing"];
  /** Swap the legs on a walk cycle while they cross the slide. */
  walking?: boolean;
  title?: string;
}) {
  const speech = useSpeech();
  const talking = speakingId ? speech.id === speakingId && !speech.paused : !!talkingProp;

  const [blink, setBlink] = useState(false);
  const [flap, setFlap] = useState<Viseme>("closed");
  const [step, setStep] = useState(0);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Both walk frames are built up front so the legs can swap without redrawing.
  const stand = useMemo(
    () => (body === "full" ? fullFrames(look, pointing ? "point" : "rest", mood, facing, 0) : bustFrames(look, pointing ? "point" : "rest", mood)),
    [body, look, pointing, mood, facing],
  );
  const stride = useMemo(
    () => (body === "full" ? fullFrames(look, pointing ? "point" : "rest", mood, facing, 1) : null),
    [body, look, pointing, mood, facing],
  );

  // Blink on a human rhythm, not a metronome.
  useEffect(() => {
    if (reduced.current) return;
    let timer: ReturnType<typeof setTimeout>;
    const loop = () => {
      timer = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), BLINK_MS);
        loop();
      }, blinkGap());
    };
    loop();
    return () => clearTimeout(timer);
  }, []);

  // Legs only move while they are actually crossing the slide.
  useEffect(() => {
    if (!walking || !stride || reduced.current) {
      setStep(0);
      return;
    }
    const t = setInterval(() => setStep((s) => 1 - s), 180);
    return () => clearInterval(t);
  }, [walking, stride]);

  // Only needed when the voice gives no position to follow.
  const following = !!speakingId && speech.words && !!text;
  useEffect(() => {
    if (!talking || following || reduced.current) {
      setFlap("closed");
      return;
    }
    const started = Date.now();
    const t = setInterval(() => setFlap(visemeAtTime(Date.now() - started)), 140);
    return () => clearInterval(t);
  }, [talking, following]);

  const mouth: Viseme = !talking ? "closed" : following ? visemeAt(text!, speech.charIndex) : flap;
  const frames = step === 1 && stride ? stride : stand;
  const grid = frames[`${mouth}${blink ? ":blink" : ""}` as keyof typeof frames];

  return <PixelSprite grid={grid} scale={scale} className="pixel-teacher" title={title} />;
}
