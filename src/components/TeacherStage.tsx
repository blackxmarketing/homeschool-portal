"use client";

import { useEffect, useState } from "react";
import TeacherAvatar from "./TeacherAvatar";
import { avatarFor, type AvatarLook } from "@/content/avatars";
import {
  appendSpoken,
  MicButton,
  pauseSpeaking,
  resumeSpeaking,
  SayButton,
  speak,
  speechSupported,
  stopSpeaking,
  useAutoRead,
  useSpeech,
  useStopOnUnmount,
  useVoicePrefs,
  useVoiceSettings,
} from "./voice";

export interface StageTeacher {
  name: string;
  avatar: string;
  /** How the illustrated teacher looks; falls back to one picked from the name. */
  look?: AvatarLook;
  /** A small tag under the name, e.g. "Science coach". */
  title?: string;
}

const lookOf = (t: StageTeacher) => t.look ?? avatarFor(t.name);

/** The text being read, with the current sentence and word lit up like captions. */
function Captions({ id, text }: { id: string; text: string }) {
  const s = useSpeech();
  const active = s.id === id;
  const tokens: { t: string; start: number }[] = [];
  const re = /\S+|\s+/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) tokens.push({ t: m[0], start: m.index });
  const [ss, se] = active ? s.sentence : [-1, -1];
  return (
    <div className={`stage-text ${active ? "speaking" : ""}`}>
      {tokens.map(({ t, start }) => {
        if (!t.trim()) return t;
        const end = start + t.length;
        let cls = "w";
        if (active) {
          if (end <= ss) cls += " done";
          else if (start < se) cls += s.words ? (s.charIndex >= start && s.charIndex < end ? " now cur" : " cur") : " cur";
        }
        return (
          <span key={start} className={cls}>
            {t}
          </span>
        );
      })}
    </div>
  );
}

/** Listen / pause / replay, speed and auto-read. */
function StageControls({ id, text }: { id: string; text: string }) {
  const s = useSpeech();
  const [p, setP] = useVoicePrefs();
  const active = s.id === id;
  return (
    <div className="stage-controls">
      {!active ? (
        <button type="button" className="stage-btn on" onClick={() => speak(id, text)}>
          ▶ Listen
        </button>
      ) : s.paused ? (
        <button type="button" className="stage-btn on" onClick={resumeSpeaking}>
          ▶ Keep going
        </button>
      ) : (
        <button type="button" className="stage-btn" onClick={pauseSpeaking}>
          ❚❚ Pause
        </button>
      )}
      {active && (
        <button type="button" className="stage-btn" onClick={() => speak(id, text)}>
          ↺ Start over
        </button>
      )}
      {active && (
        <button type="button" className="stage-btn" onClick={stopSpeaking}>
          ■ Stop
        </button>
      )}
      <select
        className="stage-select"
        value={p.rate}
        aria-label="Reading speed"
        onChange={(e) => {
          const rate = Number(e.target.value);
          setP({ rate });
          if (active) speak(id, text, rate);
        }}
      >
        <option value={0.8}>🐢 Slower</option>
        <option value={1}>Normal speed</option>
        <option value={1.2}>🐇 Faster</option>
      </select>
      <button type="button" className={`stage-btn ${p.autoRead ? "on-soft" : ""}`} onClick={() => setP({ autoRead: !p.autoRead })} aria-pressed={p.autoRead}>
        {p.autoRead ? "🔊 Auto-read on" : "🔇 Auto-read off"}
      </button>
    </div>
  );
}

/**
 * The teacher at the front of the class: an illustrated teacher who reads the
 * lesson aloud, with captions that follow along.
 */
export function TeacherStage({
  teacher,
  id,
  text,
  eyebrow,
  heading,
  children,
  auto = true,
}: {
  teacher: StageTeacher;
  id: string;
  text: string;
  eyebrow?: string;
  heading?: string;
  children?: React.ReactNode;
  auto?: boolean;
}) {
  const { speakOn } = useVoiceSettings();
  const s = useSpeech();
  const [supported, setSupported] = useState(false);
  useEffect(() => setSupported(speechSupported()), []);
  useAutoRead(id, text, auto);
  useStopOnUnmount();
  const talking = s.id === id && !s.paused;
  return (
    <section className="stage" aria-label={`${teacher.name} is teaching`}>
      <div className="stage-teacher">
        <div className={`stage-avatar ${talking ? "talking" : ""}`}>
          <TeacherAvatar look={lookOf(teacher)} talking={talking} />
        </div>
        <div className="stage-name">{teacher.name}</div>
        {teacher.title && <div className="stage-title-tag">{teacher.title}</div>}
      </div>
      <div className="stage-board">
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        {heading && <h2 className="stage-title">{heading}</h2>}
        <Captions id={id} text={text} />
        {children}
        {speakOn && supported && <StageControls id={id} text={text} />}
      </div>
    </section>
  );
}

/**
 * A short thing the teacher says (a hint, praise, an answer). Read aloud
 * automatically when auto-read is on, with a button to hear it again.
 */
export function CoachLine({
  teacher,
  id,
  say,
  tone = "",
  auto = true,
  children,
}: {
  teacher: StageTeacher;
  id: string;
  /** The words spoken aloud (children may add formatting). */
  say: string;
  tone?: string;
  auto?: boolean;
  children?: React.ReactNode;
}) {
  const s = useSpeech();
  useAutoRead(id, say, auto);
  const talking = s.id === id && !s.paused;
  return (
    <div className={`coach-bubble ${tone}`}>
      <div className="coach-face">
        <TeacherAvatar look={lookOf(teacher)} talking={talking} size={52} />
      </div>
      <div style={{ flex: 1 }}>
        <div className="coach-name">
          {teacher.name} <SayButton id={id} text={say} />
        </div>
        <div className="coach-text">{children ?? say}</div>
      </div>
    </div>
  );
}

/**
 * "Raise your hand": the kid asks the teacher a question by talking or
 * typing. The answer is read aloud, and the question is remembered for
 * later lessons.
 */
export function AskTeacher({ teacher, ask }: { teacher: StageTeacher; ask: (question: string) => Promise<string> }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<{ q: string; a: string }[]>([]);

  async function send(e?: React.FormEvent) {
    e?.preventDefault();
    const q = text.trim();
    if (q.length < 3 || busy) return;
    setBusy(true);
    setError(null);
    try {
      const a = await ask(q);
      setAnswers((list) => [...list, { q, a }]);
      setText("");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  if (!open) {
    return (
      <button type="button" className="kbtn ghost raise-hand" onClick={() => setOpen(true)}>
        ✋ Raise my hand: ask {teacher.name}
      </button>
    );
  }
  return (
    <div className="ask">
      <div className="eyebrow">Ask {teacher.name} anything about this</div>
      {answers.map((x, i) => (
        <div key={i} className="ask-answer">
          <div className="bubble kid">{x.q}</div>
          <CoachLine teacher={teacher} id={`ask-${i}-${x.q}`} say={x.a} tone="ai" />
        </div>
      ))}
      <form className="ask-row" onSubmit={send}>
        <input
          className="kinput"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Say or type your question…"
          maxLength={500}
          aria-label={`Ask ${teacher.name} a question`}
        />
        <MicButton onText={(t) => setText((cur) => appendSpoken(cur, t))} disabled={busy} label="Ask out loud" />
        <button className="kbtn" disabled={busy || text.trim().length < 3}>
          {busy ? `${teacher.name} is thinking…` : "Ask"}
        </button>
      </form>
      {error && <div className="error small">{error}</div>}
      <button type="button" className="linkbtn small" onClick={() => setOpen(false)}>
        Put my hand down
      </button>
    </div>
  );
}
