"use client";

import { useEffect, useRef, useState } from "react";
import { appendSpoken, MicButton, SayButton, TeacherVoice } from "./voice";
import { avatarFor } from "@/content/avatars";

export interface TeacherInfo {
  /** The teacher id (e.g. "forge"), for their look and voice. */
  id?: string;
  name: string;
  avatar: string;
  hue: number;
  greeting: string;
  inspiredBy: string;
}

async function post<T>(body: unknown): Promise<T> {
  const res = await fetch("/api/teacher", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Your teacher couldn't answer right now.");
  return data as T;
}

export function TeacherBadge({ t, line }: { t: TeacherInfo; line?: string }) {
  return (
    <div className="teacher-badge" style={{ ["--t-hue" as string]: t.hue }}>
      <div className="teacher-avatar" title={`Inspired by ${t.inspiredBy}`}>
        {t.avatar}
      </div>
      <div>
        <div className="teacher-name">{t.name}</div>
        {line && <div className="teacher-line">{line}</div>}
      </div>
    </div>
  );
}

/** Chat with the teacher about the current question. Asking before answering means it won't count toward mastery. */
export function TeacherChat({ t, questionId, answered, onHelped }: { t: TeacherInfo; questionId: string; answered: boolean; onHelped: () => void }) {
  const [msgs, setMsgs] = useState<{ role: "kid" | "teacher"; content: string }[]>([]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [msgs]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const message = text.trim();
    if (!message || busy) return;
    setText("");
    setError(null);
    setMsgs((m) => [...m, { role: "kid", content: message }]);
    setBusy(true);
    try {
      const d = await post<{ reply: string }>({ action: "chat", questionId, message });
      setMsgs((m) => [...m, { role: "teacher", content: d.reply }]);
      if (!answered) onHelped();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <TeacherVoice kind={avatarFor(t.id ?? t.name).voice}>
    <div className="chat" style={{ ["--t-hue" as string]: t.hue }}>
      <TeacherBadge t={t} line={msgs.length ? undefined : answered ? "Want to dig into that one? Ask me anything about it." : t.greeting} />
      {!answered && (
        <div className="kmuted small">Asking for help is smart. This question just won&apos;t count toward mastery.</div>
      )}
      <div className="chat-log">
        {msgs.map((m, i) => (
          <div key={i} className={`bubble ${m.role}`}>
            {m.content}
            {m.role === "teacher" && <SayButton id={`chat-${i}-${m.content.slice(0, 20)}`} text={m.content} />}
          </div>
        ))}
        {busy && <div className="bubble teacher typing">{t.name} is thinking…</div>}
        <div ref={endRef} />
      </div>
      {error && <div className="error small">{error}</div>}
      <form onSubmit={send} className="chat-form">
        <input
          className="kinput"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={answered ? "Why does that work?" : "Where do I start?"}
          maxLength={500}
          aria-label={`Message ${t.name}`}
        />
        <MicButton onText={(t) => setText((cur) => appendSpoken(cur, t))} disabled={busy} label="Talk" compact />
        <button className="kbtn" disabled={busy || !text.trim()}>
          Send
        </button>
      </form>
    </div>
    </TeacherVoice>
  );
}

/** "Why was I wrong?" after a miss. */
export function WhyWrong({ t, questionId, kidAnswer }: { t: TeacherInfo; questionId: string; kidAnswer: string }) {
  const [reply, setReply] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function ask() {
    setBusy(true);
    setError(null);
    try {
      setReply((await post<{ reply: string }>({ action: "why", questionId, kidAnswer })).reply);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  if (reply) {
    return (
      <div className="teacher-note" style={{ ["--t-hue" as string]: t.hue }}>
        <TeacherBadge t={t} />
        <p>{reply}</p>
      </div>
    );
  }
  return (
    <>
      <button className="linkbtn" onClick={ask} disabled={busy}>
        {busy ? `${t.name} is looking at your work…` : `${t.avatar} Ask ${t.name} why my answer was wrong`}
      </button>
      {error && <div className="error small">{error}</div>}
    </>
  );
}

/** A mini-lesson from the teacher before practicing a new skill. */
export function MiniLesson({ t, skillId, onLoaded }: { t: TeacherInfo; skillId: string; onLoaded?: () => void }) {
  const [lesson, setLesson] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    post<{ lesson: string }>({ action: "lesson", skillId })
      .then((d) => {
        setLesson(d.lesson);
        onLoaded?.();
      })
      .catch((err) => setError((err as Error).message));
    // Load once per skill.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skillId]);

  return (
    <div className="teacher-note lesson" style={{ ["--t-hue" as string]: t.hue }}>
      <div className="eyebrow">Mini-lesson</div>
      <TeacherBadge t={t} />
      {error ? <div className="error small">{error}</div> : lesson ? <div className="lesson-text">{lesson}</div> : <p className="kmuted">{t.name} is getting the lesson ready…</p>}
    </div>
  );
}
