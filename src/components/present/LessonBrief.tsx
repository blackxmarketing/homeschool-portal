"use client";

import PixelTeacher from "../pixel/PixelTeacher";
import { SayButton } from "../voice";
import type { PlanItem } from "@/lib/lessonPlan";
import type { AvatarLook } from "@/content/avatars";

/**
 * What the lesson is for, before any of it starts: what the kid will be able
 * to do by the end, the plan for getting there, and roughly how long it takes.
 */
export default function LessonBrief({
  title,
  teacherName,
  look,
  objectives,
  plan,
  teaching,
  doing,
  speakingId,
  text,
  onStart,
  onTestOut,
}: {
  title: string;
  teacherName: string;
  look: AvatarLook;
  objectives: string[];
  plan: PlanItem[];
  teaching: number;
  doing: number;
  speakingId?: string | null;
  text?: string;
  onStart: () => void;
  onTestOut?: () => void;
}) {
  const spoken = `Today's lesson: ${title}. By the end you'll be able to: ${objectives.join(". ")}.`;
  return (
    <div className="pres-brief pop">
      <div className="pres-brief-top">
        <div className="pres-brief-face">
          <PixelTeacher look={look} speakingId={speakingId} text={text} scale={5} pointing />
        </div>
        <div>
          <div className="eyebrow">Today with {teacherName}</div>
          <h2 className="pres-brief-title">{title}</h2>
          <p className="pres-time">
            About <strong>{teaching} min</strong> of teaching, then <strong>{doing} min</strong> of your turn.
          </p>
        </div>
      </div>

      <div className="pres-goals">
        <div className="pres-goals-head">
          <span>By the end you&apos;ll be able to</span>
          <SayButton id="brief-goals" text={spoken} />
        </div>
        <ul>
          {objectives.map((o, i) => (
            <li key={i}>{o}</li>
          ))}
        </ul>
      </div>

      <div className="pres-plan">
        <div className="eyebrow">The plan</div>
        <ol>
          {plan.map((p) => (
            <li key={p.key}>
              <span className="pres-plan-icon" aria-hidden>
                {p.icon}
              </span>
              <span className="pres-plan-label">{p.label}</span>
              <span className="pres-plan-min">{p.minutes} min</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="btnrow pres-brief-actions">
        {/* No autoFocus: it scrolls the page past the objectives the kid is meant to read. */}
        <button className="kbtn big game-btn" onClick={onStart}>
          ▶ Start the lesson
        </button>
        {onTestOut && (
          <button className="kbtn ghost" onClick={onTestOut}>
            I already know this: test out
          </button>
        )}
      </div>
    </div>
  );
}
