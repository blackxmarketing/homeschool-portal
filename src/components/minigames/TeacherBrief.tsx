"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import TeacherFace from "../TeacherFace";
import { avatarFor } from "@/content/avatars";
import { MicButton, speak, stopSpeaking, useAutoRead, useSpeech, useStopOnUnmount, useVoiceSettings } from "../voice";
import css from "./TeacherBrief.module.css";

/** How long each number of the countdown stays up. */
const TICK = 700;

export interface BriefTeacher {
  id: string;
  name: string;
}

/**
 * The coach, before a level and whenever a kid gets stuck inside one.
 *
 * Before a level he reads the skill out loud, takes questions, and counts the
 * kid in from three. From the Stuck? button he skips the reading and goes
 * straight to the question. Either way the answers come from the AI coach,
 * which is told the rule the kid can already read and nothing else - it has
 * never seen their board, so there is nothing on it for it to give away.
 */
export default function TeacherBrief({
  teacher,
  mode,
  title,
  text,
  levelId,
  board,
  seed,
  canAsk,
  onDone,
}: {
  teacher: BriefTeacher;
  /** "brief" runs before a level; "stuck" opens mid-board and returns to it. */
  mode: "brief" | "stuck";
  title: string;
  /** What the coach reads out: the level's skill in plain words. */
  text: string;
  levelId: string;
  board: number;
  seed: number;
  /** False when the AI coach is switched off or has no key, which hides the question box. */
  canAsk: boolean;
  onDone: () => void;
}) {
  const look = avatarFor(teacher.id);
  const { speakOn } = useVoiceSettings();
  const speech = useSpeech();
  const readId = `brief-${levelId}-${mode}`;
  const [turns, setTurns] = useState<{ q: string; a: string }[]>([]);
  const [typed, setTyped] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [count, setCount] = useState<number | null>(null);
  const boxRef = useRef<HTMLInputElement>(null);

  // The coach reads the skill the moment the level opens. Nothing to read on
  // the Stuck? panel - the kid is already mid-board and wants to talk.
  useAutoRead(readId, mode === "brief" ? text : null, mode === "brief");
  useStopOnUnmount();

  const talking = speech.id === readId && !speech.paused;
  const answerId = `brief-a-${turns.length}`;
  const answering = speech.id === answerId && !speech.paused;

  const ask = useCallback(
    async (question: string) => {
      const q = question.trim().slice(0, 300);
      if (!q || busy) return;
      setBusy(true);
      setErr(null);
      setTyped("");
      stopSpeaking();
      try {
        const r = await fetch("/api/gamecoach", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ levelId, board, seed, text: q }),
        });
        const d = (await r.json().catch(() => ({}))) as { answer?: string; error?: string };
        if (!r.ok || !d.answer) {
          setErr(d.error || "The coach could not answer that one. Try asking it a different way.");
          return;
        }
        setTurns((t) => [...t, { q, a: d.answer as string }]);
        if (speakOn) speak(`brief-a-${turns.length}`, d.answer, { kind: look.voice });
      } catch {
        setErr("The coach could not be reached. Check you are online.");
      } finally {
        setBusy(false);
      }
    },
    [busy, levelId, board, seed, speakOn, turns.length, look.voice],
  );

  /** Three, two, one - then the board. */
  function countIn() {
    stopSpeaking();
    if (speakOn) speak("brief-count", "Three. Two. One. Go!", { kind: look.voice });
    setCount(3);
  }

  useEffect(() => {
    if (count === null) return;
    if (count === 0) {
      onDone();
      return;
    }
    const t = setTimeout(() => setCount((c) => (c === null ? null : c - 1)), TICK);
    return () => clearTimeout(t);
  }, [count, onDone]);

  if (count !== null) {
    return (
      <div className={`${css.brief} ${css.counting}`} role="status" aria-live="assertive">
        <span className={css.face}>
          <TeacherFace look={look} talking size={92} />
        </span>
        <strong className={css.count}>{count === 0 ? "Go!" : count}</strong>
      </div>
    );
  }

  return (
    <div className={css.brief}>
      <div className={css.head}>
        <span className={css.face}>
          <TeacherFace look={look} talking={talking || answering} size={92} speakingId={readId} text={mode === "brief" ? text : undefined} />
        </span>
        <div className={css.headText}>
          <span className={css.who}>{teacher.name}</span>
          <strong className={css.title}>{mode === "brief" ? title : "What's got you stuck?"}</strong>
          <p className={css.skill}>{text}</p>
        </div>
      </div>

      {turns.map((t, i) => (
        <div key={i} className={css.turn}>
          <p className={css.q}>
            <span aria-hidden>🙋</span> {t.q}
          </p>
          <p className={css.a}>{t.a}</p>
        </div>
      ))}

      {err && <p className={`error small ${css.err}`}>{err}</p>}

      {canAsk ? (
        <form
          className={css.askRow}
          onSubmit={(e) => {
            e.preventDefault();
            void ask(typed);
          }}
        >
          <input
            ref={boxRef}
            className={css.box}
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            placeholder={busy ? "Coach is thinking…" : "Ask the coach anything about this skill"}
            disabled={busy}
            maxLength={300}
            aria-label="Ask the coach a question"
          />
          <MicButton onText={(t) => void ask(t)} disabled={busy} label="Ask" compact />
          <button type="submit" className="kbtn ghost small-btn" disabled={busy || !typed.trim()}>
            Ask
          </button>
        </form>
      ) : (
        <p className="kmuted small">The coach can only answer questions on the live portal.</p>
      )}

      <div className={css.go}>
        {mode === "brief" ? (
          <>
            <button type="button" className="kbtn" onClick={countIn} disabled={busy}>
              {turns.length ? "Got it - let's play" : "No questions - let's play"}
            </button>
            <button type="button" className="kbtn ghost small-btn" onClick={onDone}>
              Skip
            </button>
          </>
        ) : (
          <button type="button" className="kbtn" onClick={onDone} disabled={busy}>
            Back to the board
          </button>
        )}
      </div>
    </div>
  );
}
