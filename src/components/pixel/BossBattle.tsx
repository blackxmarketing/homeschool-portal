"use client";

import { useState } from "react";
import ProbeView, { type ProbeResult } from "../Probes";
import { BossScene, type GameInfo } from "./QuestScene";
import { chime } from "../voice";
import type { PublicProbe } from "@/lib/probes";

async function coach<T>(body: Record<string, unknown>): Promise<T> {
  const res = await fetch("/api/coach", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
  return data as T;
}

/**
 * The boss challenge ("show what you know" as a battle): questions one at a
 * time; each right answer drains the Shade's darkness (a full hit on the first
 * try, half on the second). Mastery (80%) turns it back into light.
 */
export default function BossBattle({
  game,
  courseId,
  lessonId,
  probes,
  testOut = false,
  onPassed,
  onCancel,
}: {
  game: GameInfo;
  courseId: string;
  lessonId: string;
  probes: PublicProbe[];
  testOut?: boolean;
  onPassed: () => void;
  onCancel?: () => void;
}) {
  const [round, setRound] = useState(0);
  const [i, setI] = useState(0);
  const [damage, setDamage] = useState(0);
  const [hit, setHit] = useState(0);
  const [itemDone, setItemDone] = useState(false);
  const [feedback, setFeedback] = useState<{ text: string; good: boolean } | null>(null);
  const [summary, setSummary] = useState<{ score: number; passed: boolean } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const maxHp = probes.length * 2;
  const hp = Math.max(0, maxHp - damage);

  async function submit(answer: unknown, ms: number): Promise<ProbeResult> {
    setError(null);
    try {
      const r = await coach<{ correct: boolean; parts: boolean[]; coach: string | null; detail?: string; tries: number; itemDone: boolean; solution: unknown; summary: { score: number; passed: boolean } | null }>({
        action: "mastery",
        courseId,
        lessonId,
        index: i,
        answer,
        ms,
        testOut,
      });
      if (r.correct) {
        setDamage((d) => d + (r.tries === 1 ? 2 : 1));
        setHit((h) => h + 1);
        chime("right");
        setFeedback({ text: r.tries === 1 ? "Direct hit! Full power." : "A hit on the second try!", good: true });
      } else {
        chime("oops");
        setFeedback(r.itemDone ? { text: `${r.coach ? `${r.coach} ` : ""}The Shade blocked that one. The answer is shown; remember it for next time.`, good: false } : { text: `${r.coach ?? "Not quite."} One more try!`, good: false });
      }
      if (r.correct || r.itemDone) setItemDone(true);
      if (r.summary) {
        setSummary(r.summary);
        if (r.summary.passed) setTimeout(() => chime("streak"), 300);
      }
      return { correct: r.correct, parts: r.parts, solution: r.solution ?? undefined, detail: r.detail };
    } catch (e) {
      setError((e as Error).message);
      return { correct: false, parts: [] };
    }
  }

  function next() {
    setItemDone(false);
    setFeedback(null);
    setI((x) => x + 1);
  }

  async function retry() {
    await coach({ action: "mastery-retry", courseId, lessonId });
    setRound((r) => r + 1);
    setI(0);
    setDamage(0);
    setItemDone(false);
    setFeedback(null);
    setSummary(null);
  }

  const won = !!summary?.passed;
  return (
    <div className="boss-battle pop">
      <BossScene game={game} hp={won ? 0 : hp} maxHp={maxHp} hit={hit} gone={won} />
      <div className="boss-panel">
        {!summary && (
          <>
            <div className="boss-count">
              {testOut ? "Challenge the Shade early" : "Boss challenge"} · question {i + 1} of {probes.length}
            </div>
            <ProbeView key={`${round}-${i}`} p={probes[i]} submit={submit} locked={itemDone} />
            {feedback && <div className={`check-why ${feedback.good ? "good" : "bad"}`}>{feedback.text}</div>}
            {itemDone && i < probes.length - 1 && (
              <div className="btnrow">
                <button className="kbtn big game-btn" onClick={next} autoFocus>
                  Next attack ▶
                </button>
              </div>
            )}
          </>
        )}
        {error && <div className="error">{error}</div>}
        {summary && (
          <div className={`boss-result ${won ? "won" : ""}`}>
            <h2 className="pixel-title">{won ? "Victory!" : "The Shade slipped away…"}</h2>
            <p>
              Score: {summary.score}%.{" "}
              {won
                ? testOut
                  ? "You proved you know this. The beacon's teaching is done!"
                  : "You've mastered this. One step left: the field mission lights the beacon for good."
                : "You need 80% to win. Look over the answers you missed, then challenge it again with fresh questions."}
            </p>
            <div className="btnrow">
              {won ? (
                <button className="kbtn big game-btn" onClick={onPassed} autoFocus>
                  {testOut ? "Onward ▶" : "To the field mission ▶"}
                </button>
              ) : (
                <button className="kbtn big game-btn" onClick={retry}>
                  Challenge again ⚔
                </button>
              )}
            </div>
          </div>
        )}
        {onCancel && !won && (
          <button className="linkbtn small" onClick={onCancel}>
            {testOut ? "Never mind, teach me first" : "Back"}
          </button>
        )}
      </div>
    </div>
  );
}
