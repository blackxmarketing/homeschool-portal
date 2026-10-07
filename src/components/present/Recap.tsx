"use client";

import PixelTeacher from "../pixel/PixelTeacher";
import type { AvatarLook } from "@/content/avatars";

/** The end of the teaching: what they were promised, now ticked off. */
export default function Recap({
  look,
  objectives,
  keyIdeas,
  stars,
  xp,
  next,
  speakingId,
  text,
  onNext,
}: {
  look: AvatarLook;
  objectives: string[];
  keyIdeas: string[];
  stars: number;
  xp: number;
  next: "boss" | "mission" | "done";
  speakingId?: string | null;
  text?: string;
  onNext: () => void;
}) {
  const label = next === "boss" ? "On to the boss challenge ⚔" : next === "mission" ? "On to the field mission 🚩" : "Finish up ▶";
  return (
    <div className="pres-recap pop">
      <div className="pres-recap-top">
        <PixelTeacher look={look} speakingId={speakingId} text={text} scale={5} mood="happy" />
        <div>
          <div className="eyebrow">Nice work</div>
          <h2 className="pres-brief-title">Here&apos;s what you just learned</h2>
        </div>
      </div>

      <ul className="pres-goals-done">
        {objectives.map((o, i) => (
          <li key={i}>
            <span className="pres-tick" aria-hidden>
              ✓
            </span>
            {o}
          </li>
        ))}
      </ul>

      {!!keyIdeas.length && (
        <div className="pres-keyideas">
          <div className="eyebrow">Worth remembering</div>
          <ul>
            {keyIdeas.map((k, i) => (
              <li key={i}>{k}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="pres-recap-score">
        <span className="chip">★ {stars}</span>
        <span className="chip">+{xp} XP</span>
      </div>

      <div className="btnrow">
        <button className="kbtn big game-btn" onClick={onNext} autoFocus>
          {label}
        </button>
      </div>
    </div>
  );
}
