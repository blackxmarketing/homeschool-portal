"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Visual from "./Visual";
import { BreakScreen, countQuestion, SideQuest, SprintRing, useSprint } from "./focus";
import type { Visual as V } from "@/lib/curriculum/answers";
import type { FocusProfile } from "@/lib/focus";
import { CHEERS, ENCOURAGE } from "@/lib/game";

type Mode = "learn" | "review" | "placement";

interface Q {
  id: string;
  skillId: string;
  skillTitle: string;
  mode: Mode;
  prompt: string;
  kind: string;
  choices?: string[];
  visual?: V;
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

interface Example {
  prompt: string;
  visual?: V;
  hint: string;
  answer: string;
  explanation: string;
}

/** What's on screen between questions. */
type Interlude = null | "break" | "quest";

class ApiError extends Error {
  constructor(
    message: string,
    public capReached = false,
  ) {
    super(message);
  }
}

async function post<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  const data = await res.json();
  if (!res.ok && !data.formatError) throw new ApiError(data.error ?? "Something went wrong.", !!data.capReached);
  return data as T;
}

const pickOne = (list: string[]) => list[Math.floor(Math.random() * list.length)];

function Confetti() {
  const colors = ["#a78bfa", "#22d3ee", "#a3e635", "#fbbf24", "#f472b6", "#fb923c"];
  return (
    <div className="confetti" aria-hidden>
      {Array.from({ length: 60 }, (_, i) => (
        <span
          key={i}
          style={{
            left: `${(i * 37) % 100}%`,
            background: colors[i % colors.length],
            animationDelay: `${(i % 12) * 0.06}s`,
            animationDuration: `${1.6 + (i % 5) * 0.3}s`,
            transform: `rotate(${i * 29}deg)`,
          }}
        />
      ))}
    </div>
  );
}

export default function Practice({ mode, skillId, focus }: { mode: Mode; skillId?: string; focus: FocusProfile }) {
  const [q, setQ] = useState<Q | null>(null);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [formatError, setFormatError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [capReached, setCapReached] = useState(false);
  const [busy, setBusy] = useState(false);
  const [history, setHistory] = useState<("y" | "n" | "h")[]>([]);
  const [xp, setXp] = useState(0);
  const [xpPop, setXpPop] = useState<number | null>(null);
  const [combo, setCombo] = useState(0);
  const [cheer, setCheer] = useState("");
  const [finished, setFinished] = useState<string | null>(null);
  const [celebrate, setCelebrate] = useState(false);
  const [placementInfo, setPlacementInfo] = useState<{ done: number; total: number } | null>(null);
  const [mastery, setMastery] = useState<{ correct: number; count: number } | null>(null);
  const [example, setExample] = useState<Example | null>(null);
  const [answeredAny, setAnsweredAny] = useState(false);
  const [interlude, setInterlude] = useState<Interlude>(null);
  const [questDue, setQuestDue] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const sprintLogged = useRef(false);

  const sprint = useSprint(focus);

  useEffect(() => {
    if (sprint.over && !sprintLogged.current) {
      sprintLogged.current = true;
      fetch("/api/sprint", { method: "POST" }).catch(() => {});
    }
  }, [sprint.over]);

  const load = useCallback(async () => {
    setBusy(true);
    setError(null);
    setResult(null);
    setHint(null);
    setFormatError(null);
    setAnswer("");
    setCheer("");
    setExample(null);
    try {
      const data = await post<{ question: Q; progress: { done?: number; total?: number; correct?: number; count?: number } }>(
        "/api/question",
        { mode, skillId },
      );
      setQ(data.question);
      if (mode === "learn") setMastery({ correct: data.progress.correct ?? 0, count: data.progress.count ?? 0 });
      if (mode === "placement" && data.progress.total) setPlacementInfo({ done: data.progress.done!, total: data.progress.total });
    } catch (e) {
      if (e instanceof ApiError && e.capReached) setCapReached(true);
      else setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }, [mode, skillId]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (q && !result && !interlude) inputRef.current?.focus();
    if (result) nextRef.current?.focus();
  }, [q, result, interlude]);

  function gainXp(n: number) {
    if (!n) return;
    setXp((x) => x + n);
    setXpPop(n);
    setTimeout(() => setXpPop(null), 1200);
  }

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
      setAnsweredAny(true);
      gainXp(data.xpGained);
      setCombo((c) => (data.correct ? c + 1 : 0));
      setCheer(data.correct ? pickOne(CHEERS) : pickOne(ENCOURAGE));
      if (countQuestion(focus.sideQuestEvery)) setQuestDue(true);
      if (data.mastery) setMastery({ correct: data.mastery.correct, count: data.mastery.count });
      setHistory((h) => [...h, data.correct ? (hint ? ("h" as const) : ("y" as const)) : ("n" as const)].slice(-10));
      if (data.mastery?.justMastered) {
        setFinished(`SKILL MASTERED: ${q.skillTitle}`);
        setCelebrate(true);
      }
      if (data.review?.finished) {
        setFinished(data.review.passed ? "Review passed! This skill is locked in. 💪" : "That one needs a little more practice. It's back on your list.");
        if (data.review.passed) setCelebrate(true);
      }
      if (data.placement) {
        setPlacementInfo({ done: data.placement.done, total: data.placement.total });
        if (data.placement.finished) {
          setFinished("Placement quest complete! Your map is ready. 🗺️");
          setCelebrate(true);
        }
      }
    } catch (e) {
      if (e instanceof ApiError && e.capReached) setCapReached(true);
      else setError((e as Error).message);
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

  async function showExample() {
    if (!q) return;
    try {
      setExample(await post<Example>("/api/example", { skillId: q.skillId }));
    } catch (e) {
      setError((e as Error).message);
    }
  }

  /** "Next" goes to a break if the sprint is over, then a side quest if one is due, then the next question. */
  function next() {
    if (sprint.over) {
      setInterlude("break");
      return;
    }
    if (questDue) {
      setQuestDue(false);
      setInterlude("quest");
      return;
    }
    load();
  }

  if (capReached) {
    return (
      <div className="kcard break-card pop">
        <div className="break-icon">🌅</div>
        <h2>Screen time's done for today!</h2>
        <p className="big-text">
          You hit your daily limit of {focus.dailyCapMinutes} minutes. Your brain needs time to lock in what you learned. Pick a
          real-world mission and go make something happen.
        </p>
        <Link href="/kid#missions" className="kbtn big">
          See today's missions →
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="kcard">
        <div className="error">{error}</div>
        <Link href="/kid">← Back to base</Link>
      </div>
    );
  }

  if (interlude === "break") {
    return (
      <BreakScreen
        minutes={focus.breakMinutes}
        onDone={() => {
          sprint.restart();
          sprintLogged.current = false;
          setInterlude(questDue ? "quest" : null);
          setQuestDue(false);
          if (!questDue) load();
        }}
      />
    );
  }

  if (interlude === "quest") {
    return (
      <SideQuest
        onDone={(gained) => {
          gainXp(gained);
          setInterlude(null);
          load();
        }}
      />
    );
  }

  if (!q) return <div className="kcard kmuted">Loading…</div>;

  const label = mode === "placement" ? "🗺️ Placement quest" : mode === "review" ? "🔁 Power review" : "⚔️ Training";
  const masteryPct = mode === "learn" ? Math.min(100, ((mastery?.correct ?? 0) / 9) * 100) : 0;

  return (
    <>
      {celebrate && <Confetti />}
      <div className="hud">
        <div className="hud-left">
          <div className="eyebrow">{label}</div>
          <div className="hud-title">{q.skillTitle}</div>
          {placementInfo && (
            <div className="kmuted small">
              Part {Math.min(placementInfo.done + 1, placementInfo.total)} of {placementInfo.total}
            </div>
          )}
        </div>
        <div className="hud-right">
          {combo >= 2 && <div className="combo pop">🔥 x{combo}</div>}
          <div className="xpchip">
            +{xp} XP{xpPop && <span className="xppop">+{xpPop}</span>}
          </div>
          <SprintRing left={sprint.left} total={sprint.total} />
        </div>
      </div>

      {sprint.left > 0 && sprint.left <= 120 && (
        <div className="cue">⏳ {Math.ceil(sprint.left / 60)} min left in this sprint. Finish strong!</div>
      )}
      {sprint.over && !result && <div className="cue">⏱️ Sprint's up! Finish this question, then take your break.</div>}

      <div className="kcard question-card">
        {mode === "learn" && (
          <div className="power">
            <div className="power-top">
              <span>Mastery power</span>
              <span>
                {mastery?.correct ?? 0}/9 needed (last 10, no hints)
              </span>
            </div>
            <div className="power-bar">
              <span style={{ width: `${masteryPct}%` }} />
            </div>
            <div className="dots" aria-label="This session's answers">
              {Array.from({ length: 10 }, (_, i) => (
                <span key={i} className={history[i] ?? ""} />
              ))}
            </div>
          </div>
        )}
        {mode === "placement" && (
          <div className="kmuted small">Some of these may be hard. That's OK! Just do your best so we know where to start.</div>
        )}

        <div className="question">{q.prompt}</div>
        {q.visual && <Visual v={q.visual} />}

        {q.kind === "choice" ? (
          <div className="choices">
            {q.choices!.map((c) => (
              <button
                key={c}
                className={`kbtn choice ${result && c === result.correctAnswer ? "right" : ""}`}
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
            className="answer-row"
          >
            <input
              ref={inputRef}
              className="kinput answer-input"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={!!result}
              autoComplete="off"
              aria-label="Your answer"
              placeholder="Your answer"
            />
            {!result && (
              <button className="kbtn big" disabled={busy || !answer.trim()}>
                Check ⚡
              </button>
            )}
          </form>
        )}
        <div className="kmuted small" style={{ marginTop: 8 }}>
          {q.formatHelp}
        </div>
        {formatError && <div className="error" style={{ marginTop: 10 }}>{formatError}</div>}

        {!result && mode !== "placement" && (
          <div className="helpers">
            {hint ? (
              <div className="hint">💡 {hint}</div>
            ) : (
              <button className="linkbtn" onClick={askHint} disabled={busy}>
                💡 I'm stuck. Give me a hint.
              </button>
            )}
            {mode === "learn" && !answeredAny && !example && (
              <button className="linkbtn" onClick={showExample}>
                🎬 Show me one first
              </button>
            )}
          </div>
        )}

        {example && !result && (
          <div className="example">
            <div className="eyebrow">Worked example: watch how it's done</div>
            <div className="example-q">{example.prompt}</div>
            {example.visual && <Visual v={example.visual} />}
            <ol>
              <li>
                <strong>Plan:</strong> {example.hint}
              </li>
              <li>
                <strong>Solve:</strong> {example.explanation}
              </li>
              <li>
                <strong>Answer:</strong> {example.answer}
              </li>
            </ol>
            <div className="kmuted small">Your turn! Try the question above the same way.</div>
          </div>
        )}

        {result && (
          <div className={`feedback ${result.correct ? "good" : "bad"} pop`}>
            <div className="feedback-head">{result.correct ? `✅ ${cheer}` : `🧠 ${cheer}`}</div>
            {!result.correct && (
              <div>
                The answer is <strong>{result.correctAnswer}</strong>.
              </div>
            )}
            <div>{result.explanation}</div>
          </div>
        )}

        {finished && <div className="mastered-banner pop">{finished}</div>}

        {result && (
          <div className="btnrow">
            {finished ? (
              <Link href="/kid" className="kbtn big">
                Back to base →
              </Link>
            ) : (
              <button ref={nextRef} className="kbtn big" onClick={next} disabled={busy}>
                {sprint.over ? "Take my break →" : questDue ? "Side quest! →" : "Next →"}
              </button>
            )}
            {!finished && (
              <Link href="/kid" className="kbtn ghost">
                Pause
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  );
}
