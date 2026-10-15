"use client";

import { useEffect, useRef, useState } from "react";
import { chime, speak, TeacherVoice, useVoiceSettings } from "../voice";
import TeacherFace from "../TeacherFace";
import { avatarFor } from "@/content/avatars";
import { SPELLING_TEACHER } from "./SpellRushGame";
import type { SpellCheck } from "@/lib/minigames/spellrush";
import css from "./SpellPlacement.module.css";

/**
 * The spelling check that works out where an older kid starts.
 *
 * Eight words, spread the length of the ladder. The teacher says each one
 * and they type it - no squares to pick from, because a list of spellings to
 * choose between is a reading test, not a spelling one.
 *
 * It never says right or wrong on the way through. It is finding out what
 * they know, and a kid who has just been told they got one wrong spells the
 * next one differently.
 */
export default function SpellPlacement({
  seed,
  questions,
  onDone,
}: {
  seed: number;
  questions: SpellCheck[];
  onDone: (r: { rung: number; title: string; right: number; asked: number }) => void;
}) {
  const [at, setAt] = useState(0);
  const [said, setSaid] = useState<string[]>(() => questions.map(() => ""));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const box = useRef<HTMLInputElement>(null);
  const { speakOn } = useVoiceSettings();
  const look = avatarFor(SPELLING_TEACHER.id);
  const q = questions[at];

  /** Said as it comes up, and again whenever they ask. */
  useEffect(() => {
    if (!q) return;
    box.current?.focus();
    if (speakOn) speak(`place-${at}`, `Spell: ${q.word}. ${q.word}.`, { kind: "male" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [at]);

  async function next() {
    if (at + 1 < questions.length) {
      setAt(at + 1);
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/place", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ game: "spellrush", seed, picks: said }),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error ?? "Couldn't save that.");
      chime("streak");
      onDone(d);
    } catch {
      setError("Couldn't save that - check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  if (!q) return null;

  return (
    <TeacherVoice kind="male">
      <div className={`mg ${css.sp}`}>
        <div className="mg-hud">
          <span className="chip">
            Word {at + 1} of {questions.length}
          </span>
          <span className="chip">Finding your starting point</span>
        </div>

        <div className={css.row}>
          <TeacherFace look={look} talking={false} size={84} speakingId={`place-${at}`} text={q.word} />
          <div className={css.ask}>
            <p className={css.say}>Listen, then type the word.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void next();
              }}
            >
              <input
                ref={box}
                className={css.box}
                value={said[at]}
                onChange={(e) => setSaid((all) => all.map((v, n) => (n === at ? e.target.value : v)))}
                placeholder="Type what you hear"
                maxLength={30}
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                aria-label={`Word ${at + 1}: type what you hear`}
              />
            </form>
            <div className={css.btns}>
              <button type="button" className="kbtn ghost small-btn" onClick={() => speak(`place-again-${at}`, `${q.word}. ${q.word}.`, { kind: "male" })}>
                🔊 Say it again
              </button>
              <button type="button" className="kbtn small-btn" onClick={() => void next()} disabled={busy}>
                {at + 1 < questions.length ? "Next ▶" : busy ? "Working it out…" : "Finish"}
              </button>
            </div>
            <p className="kmuted small">Not sure? Leave it blank and move on - that is an answer too.</p>
            {error && <p className="kmuted small">{error}</p>}
          </div>
        </div>
      </div>
    </TeacherVoice>
  );
}
