"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

type Mode = "learn" | "review" | "placement";

interface Q {
  id: string;
  skillId: string;
  skillTitle: string;
  mode: Mode;
  prompt: string;
  kind: string;
  choices?: string[];
  formatHelp: string;
}

interface Result {
  correct: boolean;
  correctAnswer: string;
  explanation: string;
  xpGained: number;
  mastery?: { correct: number; count: number; mastered: boolean; justMastered: boolean };
  review?: { answered: number; total: number; finished: boolean; passed?: boolean };
  placement?: { finished: boolean; done: number; total: number };
}

async function post<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  const data = await res.json();
  if (!res.ok && !data.formatError) throw new Error(data.error ?? "Something went wrong.");
  return data as T;
}

export default function Practice({ mode, skillId }: { mode: Mode; skillId?: string }) {
  const [q, setQ] = useState<Q | null>(null);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [formatError, setFormatError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [history, setHistory] = useState<("y" | "n" | "h")[]>([]);
  const [xp, setXp] = useState(0);
  const [finished, setFinished] = useState<string | null>(null);
  const [placementInfo, setPlacementInfo] = useState<{ done: number; total: number } | null>(null);
  const [mastery, setMastery] = useState<{ correct: number; count: number } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const load = useCallback(async () => {
    setBusy(true);
    setError(null);
    setResult(null);
    setHint(null);
    setFormatError(null);
    setAnswer("");
    try {
      const data = await post<{ question: Q; progress: { done?: number; total?: number; correct?: number; count?: number } }>(
        "/api/question",
        { mode, skillId },
      );
      setQ(data.question);
      if (mode === "learn") setMastery({ correct: data.progress.correct ?? 0, count: data.progress.count ?? 0 });
      if (mode === "placement" && data.progress.total) setPlacementInfo({ done: data.progress.done!, total: data.progress.total });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }, [mode, skillId]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (q && !result) inputRef.current?.focus();
    if (result) nextRef.current?.focus();
  }, [q, result]);

  async function submit(value: string) {
    if (!q || busy || result) return;
    setBusy(true);
    setFormatError(null);
    try {
      const data = await post<Result & { formatError?: string }>("/api/answer", { questionId: q.id, answer: value });
      if (data.formatError) {
        setFormatError(data.formatError);
        return;
      }
      setResult(data);
      setXp((x) => x + data.xpGained);
      if (data.mastery) setMastery({ correct: data.mastery.correct, count: data.mastery.count });
      setHistory((h) => [...h, data.correct ? (hint ? ("h" as const) : ("y" as const)) : ("n" as const)].slice(-10));
      if (data.mastery?.justMastered) setFinished(`You mastered "${q.skillTitle}"! 🎉`);
      if (data.review?.finished) {
        setFinished(data.review.passed ? "Review passed! This skill is locked in. 💪" : "That one needs a little more practice. It's back on your list.");
      }
      if (data.placement) {
        setPlacementInfo({ done: data.placement.done, total: data.placement.total });
        if (data.placement.finished) setFinished("Placement quest complete! Your learning plan is ready. 🗺️");
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function askHint() {
    if (!q) return;
    setBusy(true);
    try {
      const data = await post<{ hint: string }>("/api/hint", { questionId: q.id });
      setHint(data.hint);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  if (error) {
    return (
      <div className="card">
        <div className="error">{error}</div>
        <Link href="/kid">← Back to my plan</Link>
      </div>
    );
  }
  if (!q) return <div className="card muted">Loading…</div>;

  const label =
    mode === "placement" ? "Placement quest" : mode === "review" ? "Quick review" : "Practice";

  return (
    <div className="card">
      <div className="muted small">
        {label} · {q.skillTitle}
        {placementInfo && ` · part ${Math.min(placementInfo.done + 1, placementInfo.total)} of ${placementInfo.total}`}
        {xp > 0 && ` · +${xp} XP`}
      </div>
      {mode === "learn" && (
        <>
          <div className="dots" aria-label="This session's answers">
            {Array.from({ length: 10 }, (_, i) => (
              <span key={i} className={history[i] ?? ""} />
            ))}
          </div>
          <div className="muted small">
            Mastery meter: {mastery?.correct ?? 0} of your last {mastery?.count ?? 0} right (no hints). Get 9 of your last
            10 to master this skill.
          </div>
        </>
      )}
      {mode === "placement" && (
        <div className="muted small">Some of these may be hard. That's OK! Just try your best so we know where to start.</div>
      )}

      <div className="question">{q.prompt}</div>

      {q.kind === "choice" ? (
        <div className="choices">
          {q.choices!.map((c) => (
            <button
              key={c}
              className={`btn ${result && c === result.correctAnswer ? "" : "secondary"}`}
              disabled={busy || !!result}
              onClick={() => submit(c)}
            >
              {c}
            </button>
          ))}
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit(answer);
          }}
          className="row"
          style={{ alignItems: "center" }}
        >
          <input
            ref={inputRef}
            className="answer-input"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={!!result}
            autoComplete="off"
            aria-label="Your answer"
          />
          {!result && (
            <button className="btn big" disabled={busy || !answer.trim()} style={{ flex: "0 0 auto" }}>
              Check
            </button>
          )}
        </form>
      )}
      <div className="muted small" style={{ marginTop: 6 }}>
        {q.formatHelp}
      </div>
      {formatError && <div className="error" style={{ marginTop: 10 }}>{formatError}</div>}

      {!result && mode !== "placement" && (
        <div style={{ marginTop: 12 }}>
          {hint ? (
            <div className="hint">💡 {hint}</div>
          ) : (
            <button className="linkbtn" onClick={askHint} disabled={busy}>
              I'm stuck. Give me a hint.
            </button>
          )}
        </div>
      )}

      {result && (
        <div className={`feedback ${result.correct ? "good" : "bad"}`}>
          <strong>{result.correct ? "Correct! " : `Not quite. The answer is ${result.correctAnswer}. `}</strong>
          {result.explanation}
        </div>
      )}

      {finished && <div className="notice" style={{ marginTop: 14, fontSize: "1.15rem" }}>{finished}</div>}

      {result && (
        <div style={{ marginTop: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
          {finished ? (
            <Link href="/kid" className="btn big">
              Back to my plan
            </Link>
          ) : (
            <button ref={nextRef} className="btn big" onClick={load} disabled={busy}>
              Next question →
            </button>
          )}
          {!finished && (
            <Link href="/kid" className="btn secondary">
              Take a break
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
