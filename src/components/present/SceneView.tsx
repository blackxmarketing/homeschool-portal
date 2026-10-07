"use client";

import { useEffect, useRef, useState } from "react";
import { StoryBoard } from "../StoryBoard";
import PixelTeacher from "../pixel/PixelTeacher";
import { useSpeech } from "../voice";
import type { TutorStep } from "@/lib/tutorFlow";
import type { AvatarLook } from "@/content/avatars";

/**
 * One scene of the teacher's talk: the slide fills the screen and the teacher
 * stands on it, in the corner, pointing at what they are talking about.
 *
 * They walk to the other corner when the slide changes, so the kid's eye
 * follows them to the new picture instead of the screen just cutting.
 */

/** How long the walk across takes. Matches the CSS transition. */
const WALK_MS = 900;

export default function SceneView({
  step,
  id,
  look,
  teacherName,
  onNext,
  onSkip,
  nextLabel,
}: {
  step: Extract<TutorStep, { kind: "present" }>;
  id: string;
  look: AvatarLook;
  teacherName: string;
  onNext: () => void;
  /** Jump past the rest of the talk to the part's problem. */
  onSkip?: () => void;
  nextLabel: string;
}) {
  const hasSlides = !!step.show?.beats.length;
  const speech = useSpeech();
  const slideCount = step.show?.beats.length ?? 0;

  // Which slide is up, worked out the same way the storyboard does it.
  const [side, setSide] = useState<"left" | "right">("left");
  const [walking, setWalking] = useState(false);
  const lastSlide = useRef(-1);

  useEffect(() => {
    if (!hasSlides || slideCount < 2) return;
    // Roughly how far through the narration we are, so we can tell when the
    // picture behind the teacher has changed.
    const pos = speech.id === id && speech.charIndex >= 0 ? speech.charIndex : 0;
    const idx = Math.min(slideCount - 1, Math.floor((pos / Math.max(1, step.text.length)) * slideCount));
    if (idx === lastSlide.current) return;
    const first = lastSlide.current === -1;
    lastSlide.current = idx;
    if (first) return;
    // New picture: cross to the other corner so the eye follows.
    setSide((s) => (s === "left" ? "right" : "left"));
    setWalking(true);
    const t = setTimeout(() => setWalking(false), WALK_MS);
    return () => clearTimeout(t);
  }, [speech.charIndex, speech.id, id, hasSlides, slideCount, step.text.length]);

  // A new scene starts from the left again.
  useEffect(() => {
    lastSlide.current = -1;
    setSide("left");
    setWalking(false);
  }, [id]);

  return (
    <div className="pres-scene">
      <div className={`pres-stage ${walking ? "walking" : ""}`}>
        <div className="pres-stage-head">
          <h3 className="pres-heading">{step.heading}</h3>
          <span className="pres-counter">
            Scene {step.scene + 1} of {step.of}
          </span>
        </div>

        <div className="pres-stage-slide">
          {hasSlides ? (
            <StoryBoard id={id} text={step.text} show={step.show!} />
          ) : (
            <div className="pres-board-text">
              <p>{step.text}</p>
            </div>
          )}
        </div>

        {/* The teacher stands on the slide itself, in the corner. */}
        <div className={`pres-stage-teacher at-${side}`}>
          <PixelTeacher
            look={look}
            speakingId={id}
            text={step.text}
            scale={4}
            body="full"
            pointing={hasSlides && !walking}
            walking={walking}
            facing={side === "left" ? "right" : "left"}
            title={teacherName}
          />
        </div>
      </div>

      {!!step.terms?.length && (
        <ul className="pres-terms">
          {step.terms.map((t) => (
            <li key={t.word}>
              <strong>{t.word}</strong> <span>{t.meaning}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="tutor-next pres-scene-actions">
        <button className="kbtn big game-btn" onClick={onNext}>
          {nextLabel}
        </button>
        {onSkip && (
          <button className="kbtn ghost small-btn" onClick={onSkip}>
            Skip ahead to my turn ▸
          </button>
        )}
      </div>
    </div>
  );
}
