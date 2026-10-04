"use client";

import { useEffect, useState } from "react";
import { BREAKS, type FocusProfile } from "@/lib/focus";
import { KIND_LABEL, THEME_LABEL, type Quest } from "@/content/quests";

/**
 * Focus sprint state lives in sessionStorage so it carries across skills and
 * page loads within one sitting, and resets when the browser is closed.
 */
const SPRINT_KEY = "lp.sprintStart";
const COUNT_KEY = "lp.questionsSinceQuest";

function read(key: string): number {
  try {
    return Number(sessionStorage.getItem(key)) || 0;
  } catch {
    return 0;
  }
}

function write(key: string, v: number): void {
  try {
    sessionStorage.setItem(key, String(v));
  } catch {
    // Private mode or storage blocked: timers just reset on reload.
  }
}

/** Seconds left in the current sprint; starts a sprint if none is running. */
export function useSprint(profile: FocusProfile) {
  const total = profile.sprintMinutes * 60;
  const [left, setLeft] = useState(total);

  useEffect(() => {
    let start = read(SPRINT_KEY);
    if (!start || Date.now() - start > (total + profile.breakMinutes * 60 + 15 * 60) * 1000) {
      // No sprint, or a stale one from long ago: start fresh.
      start = Date.now();
      write(SPRINT_KEY, start);
    }
    const tick = () => setLeft(Math.max(0, total - Math.floor((Date.now() - read(SPRINT_KEY)) / 1000)));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [total, profile.breakMinutes]);

  return {
    left,
    total,
    over: left <= 0,
    restart() {
      write(SPRINT_KEY, Date.now());
      setLeft(total);
    },
  };
}

/** Counts answered questions toward the next side quest. Returns true when one is due. */
export function countQuestion(every: number): boolean {
  const n = read(COUNT_KEY) + 1;
  if (n >= every) {
    write(COUNT_KEY, 0);
    return true;
  }
  write(COUNT_KEY, n);
  return false;
}

export function mmss(s: number): string {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export function SprintRing({ left, total }: { left: number; total: number }) {
  const pct = total ? left / total : 0;
  const r = 20;
  const c = 2 * Math.PI * r;
  const low = left <= 120;
  return (
    <div className={`sprint ${low ? "low" : ""}`} title="Focus sprint: time until your next break">
      <svg width={52} height={52} viewBox="0 0 52 52" aria-hidden>
        <circle cx={26} cy={26} r={r} fill="none" stroke="var(--k-track)" strokeWidth={6} />
        <circle
          cx={26}
          cy={26}
          r={r}
          fill="none"
          stroke={low ? "var(--k-warn)" : "var(--k-accent2)"}
          strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
          transform="rotate(-90 26 26)"
        />
      </svg>
      <div>
        <div className="sprint-time">{mmss(left)}</div>
        <div className="sprint-label">sprint</div>
      </div>
    </div>
  );
}

export function BreakScreen({ minutes, onDone }: { minutes: number; onDone: () => void }) {
  const [b] = useState(() => BREAKS[Math.floor(Math.random() * BREAKS.length)]);
  const [left, setLeft] = useState(minutes * 60);
  useEffect(() => {
    const t = setInterval(() => setLeft((l) => Math.max(0, l - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="kcard break-card pop">
      <div className="eyebrow">Sprint complete! ⏱️</div>
      <h2>Brain break time</h2>
      <div className="break-icon">{b.icon}</div>
      <h3>{b.title}</h3>
      <p className="big-text">{b.text}</p>
      <div className="break-timer">{mmss(left)}</div>
      <button className="kbtn big" disabled={left > 0} onClick={onDone}>
        {left > 0 ? "Break in progress…" : "I'm back! Next sprint →"}
      </button>
      <p className="kmuted small">Breaks help your brain lock in what you just learned.</p>
    </div>
  );
}

async function post<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
  return data as T;
}

/** A side quest card. Brain benders reveal their answer; creative challenges take a written answer. */
export function SideQuest({ onDone }: { onDone: (xp: number) => void }) {
  const [quest, setQuest] = useState<Quest | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [response, setResponse] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    post<{ quest: Quest }>("/api/quest", { action: "next", kinds: ["brain", "create"] })
      .then((d) => setQuest(d.quest))
      .catch((e) => setError((e as Error).message));
  }, []);

  async function finish() {
    if (!quest) return;
    setBusy(true);
    setError(null);
    try {
      const d = await post<{ xpGained: number }>("/api/quest", { action: "complete", questId: quest.id, response });
      onDone(d.xpGained);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  if (error && !quest) return <div className="kcard">{error}</div>;
  if (!quest) return <div className="kcard kmuted">Loading a side quest…</div>;

  return (
    <div className="kcard quest-card pop">
      <div className="eyebrow">
        🗝️ Side quest unlocked · {KIND_LABEL[quest.kind]} · {THEME_LABEL[quest.theme]}
      </div>
      <h2>{quest.title}</h2>
      <p className="big-text">{quest.text}</p>
      {quest.kind === "brain" &&
        (revealed ? (
          <div className="reveal">{quest.reveal}</div>
        ) : (
          <p className="kmuted">Think it through (scratch paper is great), then reveal the answer.</p>
        ))}
      {quest.kind === "create" && (
        <textarea
          className="kinput"
          rows={5}
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Your idea… (a parent can read this)"
          maxLength={1000}
        />
      )}
      {error && <div className="error">{error}</div>}
      <div className="btnrow">
        {quest.kind === "brain" && !revealed ? (
          <button className="kbtn big" onClick={() => setRevealed(true)}>
            Reveal the answer
          </button>
        ) : (
          <button className="kbtn big" onClick={finish} disabled={busy}>
            Claim +{quest.xp} XP
          </button>
        )}
        <button className="kbtn ghost" onClick={() => onDone(0)}>
          Skip
        </button>
      </div>
    </div>
  );
}
