"use client";

import { useState } from "react";
import ProbeView, { type ProbeResult } from "./Probes";
import type { PublicProbe } from "@/lib/probes";

async function coach<T>(body: Record<string, unknown>): Promise<T> {
  const res = await fetch("/api/coach", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
  return data as T;
}

/**
 * "Show what you know": interactive questions graded one at a time. A
 * second try earns partial credit; after that the answer is shown.
 */
export function MasteryCheck({
  courseId,
  lessonId,
  probes,
  testOut = false,
  onPassed,
  onCancel,
}: {
  courseId: string;
  lessonId: string;
  probes: PublicProbe[];
  testOut?: boolean;
  onPassed: () => void;
  onCancel?: () => void;
}) {
  const [round, setRound] = useState(0);
  const [feedback, setFeedback] = useState<Record<number, { text: string; good: boolean }>>({});
  const [summary, setSummary] = useState<{ score: number; passed: boolean } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit(i: number, answer: unknown, ms: number): Promise<ProbeResult> {
    setError(null);
    try {
      const r = await coach<{
        correct: boolean;
        parts: boolean[];
        coach: string | null;
        detail?: string;
        tries: number;
        itemDone: boolean;
        solution: unknown;
        summary: { score: number; passed: boolean } | null;
      }>({ action: "mastery", courseId, lessonId, index: i, answer, ms, testOut });
      setFeedback((f) => ({
        ...f,
        [i]: r.correct
          ? { text: r.tries === 1 ? "Correct!" : "Got it on the second try.", good: true }
          : r.itemDone
            ? { text: `${r.coach ? `${r.coach} ` : ""}Here's the right answer, shown above.`, good: false }
            : { text: `${r.coach ?? "Not quite."} One more try.`, good: false },
      }));
      if (r.summary) setSummary(r.summary);
      return { correct: r.correct, parts: r.parts, solution: r.solution ?? undefined, detail: r.detail };
    } catch (e) {
      setError((e as Error).message);
      return { correct: false, parts: [] };
    }
  }

  async function retry() {
    await coach({ action: "mastery-retry", courseId, lessonId });
    setFeedback({});
    setSummary(null);
    setRound((r) => r + 1);
  }

  return (
    <div className="kcard pop">
      <div className="eyebrow">{testOut ? "Test out" : "Show what you know"}</div>
      <h2>{testOut ? "Prove you've got it, and skip ahead" : "Show what you know"}</h2>
      <p className="kmuted small">
        {testOut
          ? "Score 90% and the teaching for this lesson counts as done. You can always come back to it."
          : "Use what you learned: fill in, place, match and build. First try earns full credit; you get one more try on each."}
      </p>
      {probes.map((p, i) => (
        <div key={`${round}-${i}`} className="mastery-item">
          <div className="mastery-num">{i + 1}</div>
          <div style={{ flex: 1 }}>
            <ProbeView p={p} submit={(a, ms) => submit(i, a, ms)} />
            {feedback[i] && <div className={`check-why ${feedback[i].good ? "good" : "bad"}`}>{feedback[i].text}</div>}
          </div>
        </div>
      ))}
      {error && <div className="error">{error}</div>}
      {summary && (
        <div className={`band-kid ${summary.passed ? "good" : "bad"}`}>
          Score: {summary.score}% {summary.passed ? "· Mastered! 🎉" : "· Not yet. Review the parts in red, then try a fresh round."}
        </div>
      )}
      <div className="btnrow">
        {summary?.passed && (
          <button className="kbtn big" onClick={onPassed}>
            {testOut ? "On to the task →" : "On to the task →"}
          </button>
        )}
        {summary && !summary.passed && (
          <button className="kbtn" onClick={retry}>
            Try a fresh round
          </button>
        )}
        {onCancel && !summary?.passed && (
          <button className="kbtn ghost" onClick={onCancel}>
            {testOut ? "Never mind, teach me" : "Back"}
          </button>
        )}
      </div>
    </div>
  );
}

/** A quick warm-up on the weakest ideas from earlier lessons in this course. */
export function ReviewWarmup({
  courseId,
  items,
  onDone,
}: {
  courseId: string;
  items: { lessonId: string; seg: number; title: string; probe: PublicProbe }[];
  onDone: () => void;
}) {
  const [attempts, setAttempts] = useState<Record<number, number>>({});
  const [done, setDone] = useState<Record<number, string>>({});
  async function submit(i: number, answer: unknown, ms: number): Promise<ProbeResult> {
    const attempt = (attempts[i] ?? 0) + 1;
    setAttempts((a) => ({ ...a, [i]: attempt }));
    const r = await coach<{ correct: boolean; parts: boolean[]; coach: string | null; solution: unknown; detail?: string }>({
      action: "review",
      courseId,
      lessonId: items[i].lessonId,
      seg: items[i].seg,
      answer,
      ms,
      attempt,
    });
    if (r.correct) setDone((d) => ({ ...d, [i]: "Nice, that one's sticking. ✓" }));
    else if (r.solution !== null && r.solution !== undefined) setDone((d) => ({ ...d, [i]: `${r.coach ? `${r.coach} ` : ""}Here's how it works, shown above.` }));
    else setDone((d) => ({ ...d, [i]: `${r.coach ?? "Not quite."} Try once more.` }));
    return { correct: r.correct, parts: r.parts, solution: r.solution ?? undefined, detail: r.detail };
  }
  return (
    <div className="kcard pop">
      <div className="eyebrow">Warm-up</div>
      <h2>Quick review before we start</h2>
      <p className="kmuted small">A couple of ideas from earlier lessons that are worth another look. Remembering them makes today easier.</p>
      {items.map((it, i) => (
        <div key={i} className="mastery-item">
          <div className="mastery-num">{i + 1}</div>
          <div style={{ flex: 1 }}>
            <div className="kmuted small">From: {it.title}</div>
            <ProbeView p={it.probe} submit={(a, ms) => submit(i, a, ms)} />
            {done[i] && <div className="check-why">{done[i]}</div>}
          </div>
        </div>
      ))}
      <button className="kbtn big" onClick={onDone}>
        On to today&apos;s lesson →
      </button>
    </div>
  );
}
