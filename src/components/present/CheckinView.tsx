"use client";

import { useState } from "react";
import ProbeView, { type ProbeResult } from "../Probes";
import type { TutorStep } from "@/lib/tutorFlow";

/**
 * A quick check in the middle of the teacher's talk: did that land before we
 * carry on? Not the part's real problem, so there is no coaching ladder and
 * nothing to lose - a miss just gets a nudge and the lesson moves on.
 */
export default function CheckinView({
  step,
  courseId,
  lessonId,
  setLine,
  onNext,
}: {
  step: Extract<TutorStep, { kind: "checkin" }>;
  courseId: string;
  lessonId: string;
  setLine: (text: string, tone?: string) => void;
  onNext: () => void;
}) {
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(answer: unknown, ms: number): Promise<ProbeResult> {
    setError(null);
    try {
      const res = await fetch("/api/coach", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: "checkin", courseId, lessonId, seg: step.seg, scene: step.scene, answer, ms }),
      });
      const d = (await res.json()) as { correct: boolean; parts: boolean[]; coach: string | null; detail?: string; error?: string };
      if (!res.ok) throw new Error(d.error ?? "Something went wrong.");
      setDone(true);
      setLine(d.correct ? "That's it. Let's keep going." : (d.coach ?? "Not quite - keep it in mind as we carry on."), d.correct ? "good" : "warn");
      return { correct: d.correct, parts: d.parts ?? [], detail: d.detail };
    } catch (e) {
      setError((e as Error).message);
      return { correct: false, parts: [] };
    }
  }

  return (
    <div className="pres-checkin">
      <div className="pres-checkin-tag">Quick check</div>
      <ProbeView p={step.probe} submit={submit} locked={done} />
      {error && <p className="kmuted small">{error}</p>}
      <div className="tutor-next">
        <button className="kbtn big game-btn" onClick={onNext} disabled={!done}>
          Keep going ▶
        </button>
      </div>
    </div>
  );
}
