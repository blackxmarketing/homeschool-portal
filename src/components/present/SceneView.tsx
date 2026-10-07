"use client";

import { StoryBoard } from "../StoryBoard";
import type { TutorStep } from "@/lib/tutorFlow";

/**
 * One scene of the teacher's talk: the heading on the board, the slides
 * changing underneath as they speak, and any words they put up and left there.
 */
export default function SceneView({
  step,
  id,
  onNext,
  onSkip,
  nextLabel,
}: {
  step: Extract<TutorStep, { kind: "present" }>;
  id: string;
  onNext: () => void;
  /** Jump past the rest of the talk to the part's problem. */
  onSkip?: () => void;
  nextLabel: string;
}) {
  return (
    <div className="pres-scene">
      <div className="pres-scene-head">
        <h3 className="pres-heading">{step.heading}</h3>
        <span className="pres-counter">
          Scene {step.scene + 1} of {step.of}
        </span>
      </div>

      {step.show?.beats.length ? (
        <StoryBoard id={id} text={step.text} show={step.show} />
      ) : (
        <div className="pres-board">
          <p>{step.text}</p>
        </div>
      )}

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
