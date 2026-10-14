"use client";

import { useCallback, useState } from "react";
import TeacherFace from "../TeacherFace";
import { avatarFor } from "@/content/avatars";
import { MicButton, speak, stopSpeaking, useAutoRead, useSpeech, useStopOnUnmount, useTeacherVoice, useVoiceSettings } from "../voice";
import css from "./TeacherBrief.module.css";

export interface BriefTeacher {
  id: string;
  name: string;
}

/**
 * The coach, sitting on the board itself beside the directions.
 *
 * Before the level he reads the directions out and waits to be told they are
 * ready; during it he is still there to take a question, which stops the
 * clock while he answers. Nothing here takes the screen away from the game -
 * the board stays where it is the whole time.
 *
 * His answers come from the AI coach, which is told the rule the kid can
 * already read and nothing else. It has never seen their board, so there is
 * nothing on it for it to give away.
 */
export default function TeacherBrief({
  teacher,
  directions,
  rule,
  levelId,
  board,
  seed,
  canAsk,
  stage,
  onReady,
  onAsking,
  onExample,
  example,
}: {
  teacher: BriefTeacher;
  /** The level's skill in plain words - what he reads out. */
  directions: string;
  /** The rule on the board right now, for the coach to answer against. */
  rule: string;
  levelId: string;
  board: number;
  seed: number;
  /** False when the AI coach is off or has no key, which hides the ask button. */
  canAsk: boolean;
  /** "brief" is before the level starts; "play" is while it is running. */
  stage: "brief" | "play";
  onReady: () => void;
  /** Tells the game to hold the clock while the coach has a question open. */
  onAsking: (open: boolean) => void;
  /** Asks the game for a worked example, which the coach then talks through. */
  onExample: () => void;
  /** The two squares to talk through, drawn by the game itself. */
  example?: React.ReactNode;
}) {
  const look = avatarFor(teacher.id);
  const { speakOn } = useVoiceSettings();
  /**
   * speak() is a plain function, so it cannot read the voice provider the way
   * the read-aloud hook does - leave the kind off and it talks in the default
   * voice, which is not his. Every speak() in here passes this.
   */
  const kind = useTeacherVoice();
  const speech = useSpeech();
  const readId = `coach-${levelId}`;
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<{ q: string; a: string }[]>([]);
  const [typed, setTyped] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // He reads the directions once, when the level opens.
  useAutoRead(readId, directions, stage === "brief");
  useStopOnUnmount();

  const talking = speech.id === readId && !speech.paused;

  function toggle(next: boolean) {
    setOpen(next);
    onAsking(next);
    if (!next) {
      setErr(null);
      setTyped("");
    }
  }

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
        if (speakOn) speak(`coach-a-${turns.length}`, d.answer, { kind });
      } catch {
        setErr("The coach could not be reached. Check you are online.");
      } finally {
        setBusy(false);
      }
    },
    [busy, levelId, board, seed, speakOn, turns.length, kind],
  );

  return (
    <div className={css.row}>
      <span className={css.face}>
        <TeacherFace look={look} talking={talking} size={92} speakingId={readId} text={directions} />
      </span>

      <div className={css.text}>
        <span className={css.who}>{teacher.name}</span>
        <p className={css.skill}>{directions}</p>

        {turns.map((t, i) => (
          <div key={i} className={css.turn}>
            <p className={css.q}>
              <span aria-hidden>🙋</span> {t.q}
            </p>
            <p className={css.a}>{t.a}</p>
          </div>
        ))}

        {example}

        {open && (
          <>
            {stage === "play" && <p className={css.rule}>The rule on your board: {rule}</p>}
            {err && <p className="error small">{err}</p>}
            <form
              className={css.askRow}
              onSubmit={(e) => {
                e.preventDefault();
                void ask(typed);
              }}
            >
              <input
                className={css.box}
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                placeholder={busy ? "Coach is thinking…" : "Ask the coach anything about this skill"}
                disabled={busy}
                maxLength={300}
                aria-label="Ask the coach a question"
                autoFocus
              />
              <MicButton onText={(t) => void ask(t)} disabled={busy} label="Ask" compact />
              <button type="submit" className="kbtn ghost small-btn" disabled={busy || !typed.trim()}>
                Ask
              </button>
            </form>
          </>
        )}

        <div className={css.btns}>
          {stage === "brief" && !open && (
            <>
              <button type="button" className="kbtn small-btn" onClick={onReady}>
                I&apos;m ready
              </button>
              <button type="button" className="kbtn ghost small-btn" onClick={onExample}>
                🔎 Show me an example
              </button>
            </>
          )}
          {canAsk && (
            <button type="button" className="kbtn ghost small-btn" onClick={() => toggle(!open)} disabled={busy}>
              {open ? "Done asking" : `🙋 Ask ${teacher.name}`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
