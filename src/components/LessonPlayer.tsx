"use client";

import Link from "next/link";
import { useState } from "react";
import type { Task } from "@/content/courses/types";

const STAGE_LABEL = { grammar: "Learn the facts", logic: "Reason it out", rhetoric: "Make & explain" } as const;
const TASK_LABEL = { write: "✍️ Write", project: "🛠️ Project", lab: "🧪 Lab", speak: "🎤 Speak" } as const;

interface Props {
  courseId: string;
  courseTitle: string;
  hue: number;
  teacher: { name: string; avatar: string; inspiredBy: string };
  lesson: { id: string; title: string; minutes: number; stage: "grammar" | "logic" | "rhetoric"; read: string; keyIdeas: string[]; check: { q: string; choices: string[] }[]; task?: Task };
  initial: { checkPassed: boolean; checkBest: number; taskStatus: string; taskResponse: string; taskFeedback: string; done: boolean };
  next: { id: string; title: string } | null;
  /** Where to open: lessons with the teaching model start at the check. */
  startAt?: "read" | "check";
}

async function post<T>(body: unknown): Promise<T> {
  const res = await fetch("/api/lesson", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
  return data as T;
}

export default function LessonPlayer({ courseId, courseTitle, hue, teacher, lesson, initial, next, startAt = "read" }: Props) {
  const [step, setStep] = useState<"read" | "check" | "task">(initial.checkPassed ? (lesson.task ? "task" : "check") : startAt);
  const [answers, setAnswers] = useState<(number | null)[]>(lesson.check.map(() => null));
  const [checked, setChecked] = useState<{ score: number; total: number; passed: boolean; results: { correct: boolean; answer: number; why: string }[] } | null>(null);
  const [checkPassed, setCheckPassed] = useState(initial.checkPassed);
  const [text, setText] = useState(initial.taskResponse);
  const [taskStatus, setTaskStatus] = useState(initial.taskStatus);
  const [feedback, setFeedback] = useState(initial.taskFeedback);
  const [done, setDone] = useState(initial.done);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function grade() {
    setBusy(true);
    setError(null);
    try {
      const d = await post<{ score: number; total: number; passed: boolean; results: { correct: boolean; answer: number; why: string }[]; completed: boolean }>({
        action: "check",
        courseId,
        lessonId: lesson.id,
        answers,
      });
      setChecked(d);
      if (d.passed) setCheckPassed(true);
      if (d.completed) setDone(true);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function turnIn() {
    setBusy(true);
    setError(null);
    try {
      const d = await post<{ status: string; completed: boolean; feedback: string }>({ action: "task", courseId, lessonId: lesson.id, response: text });
      setTaskStatus(d.status);
      setFeedback(d.feedback);
      if (d.completed) setDone(true);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  const paragraphs = lesson.read.split(/\n\s*\n/);

  return (
    <div style={{ ["--t-hue" as string]: hue }}>
      <div className="lesson-steps">
        {(["read", "check", ...(lesson.task ? ["task"] : [])] as const).map((s, i) => (
          <button
            key={s}
            className={`lesson-step ${step === s ? "active" : ""}`}
            onClick={() => (s === "task" && !checkPassed ? null : setStep(s as typeof step))}
            disabled={s === "task" && !checkPassed}
          >
            {i + 1}. {s === "read" ? "Read" : s === "check" ? "Check" : TASK_LABEL[lesson.task!.kind]}
          </button>
        ))}
      </div>

      {done && (
        <div className="mastered-banner pop">
          ✅ Lesson complete! +50 XP · {lesson.minutes} min logged
        </div>
      )}

      {step === "read" && (
        <div className="kcard lesson-read">
          <div className="eyebrow">
            {courseTitle} · {STAGE_LABEL[lesson.stage]} · ~{lesson.minutes} min
          </div>
          <div className="teacher-badge">
            <div className="teacher-avatar" title={teacher.inspiredBy ? `Inspired by ${teacher.inspiredBy}` : undefined}>
              {teacher.avatar}
            </div>
            <div className="teacher-name">{teacher.name}</div>
          </div>
          {paragraphs.map((p, i) => (
            <p key={i} className="big-text">
              {p}
            </p>
          ))}
          {lesson.keyIdeas.length > 0 && (
            <div className="key-ideas">
              <div className="eyebrow">Key ideas</div>
              <ul>
                {lesson.keyIdeas.map((k) => (
                  <li key={k}>{k}</li>
                ))}
              </ul>
            </div>
          )}
          <button className="kbtn big" onClick={() => setStep("check")}>
            Check my understanding →
          </button>
        </div>
      )}

      {step === "check" && (
        <div className="kcard">
          <h2>Check your understanding</h2>
          <p className="kmuted small">Get {Math.ceil(lesson.check.length * 0.8)} of {lesson.check.length} right to move on. You can retry as many times as you need.</p>
          {lesson.check.map((q, qi) => {
            const r = checked?.results[qi];
            return (
              <div key={qi} className="check-q">
                <div className="check-text">
                  {qi + 1}. {q.q}
                </div>
                <div className="check-choices">
                  {q.choices.map((c, ci) => (
                    <button
                      key={ci}
                      className={`check-choice ${answers[qi] === ci ? "picked" : ""} ${r ? (ci === r.answer ? "right" : answers[qi] === ci ? "wrong" : "") : ""}`}
                      disabled={!!checked}
                      onClick={() => setAnswers((a) => a.map((v, i) => (i === qi ? ci : v)))}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                {r && <div className={`check-why ${r.correct ? "good" : "bad"}`}>{r.correct ? "✅ " : "❌ "}{r.why}</div>}
              </div>
            );
          })}
          {error && <div className="error">{error}</div>}
          {!checked ? (
            <button className="kbtn big" disabled={busy || answers.some((a) => a === null)} onClick={grade}>
              Check answers
            </button>
          ) : (
            <div className="btnrow">
              <div className={`band-kid ${checked.passed ? "good" : "bad"}`}>
                {checked.score} / {checked.total} {checked.passed ? "· Passed! 🎉" : "· Not yet. Reread and try again."}
              </div>
              {checked.passed ? (
                lesson.task && !done ? (
                  <button className="kbtn big" onClick={() => setStep("task")}>
                    On to the {TASK_LABEL[lesson.task.kind]} task →
                  </button>
                ) : null
              ) : (
                <>
                  <button className="kbtn ghost" onClick={() => setStep("read")}>
                    Reread the lesson
                  </button>
                  <button
                    className="kbtn"
                    onClick={() => {
                      setChecked(null);
                      setAnswers(lesson.check.map(() => null));
                    }}
                  >
                    Try again
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {step === "task" && lesson.task && (
        <div className="kcard">
          <div className="eyebrow">{TASK_LABEL[lesson.task.kind]} task</div>
          <p className="big-text">{lesson.task.prompt}</p>
          <div className="key-ideas">
            <div className="eyebrow">What great work looks like</div>
            <ul>
              {lesson.task.rubric.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
          {lesson.task.kind !== "write" && (
            <p className="kmuted small">Do this one off-screen with a parent, then describe what you did. A parent checks it to finish the lesson.</p>
          )}
          <textarea
            className="kinput"
            rows={lesson.task.kind === "write" ? 10 : 5}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={lesson.task.kind === "write" ? "Write here…" : "What did you do, and what did you find out?"}
            disabled={taskStatus === "pending" || taskStatus === "approved"}
          />
          {error && <div className="error">{error}</div>}
          {taskStatus === "pending" ? (
            <div className="tag wait">⏳ Waiting for a parent to check</div>
          ) : taskStatus === "approved" ? (
            <div className="tag ok">✅ Approved</div>
          ) : (
            <div className="btnrow">
              <button className="kbtn big" disabled={busy || text.trim().length < 20} onClick={turnIn}>
                {busy ? (lesson.task.kind === "write" ? `${teacher.name} is reading…` : "Sending…") : taskStatus === "done" ? "Turn in my revision" : "Turn it in"}
              </button>
              {taskStatus === "declined" && <span className="kmuted small">A parent asked for another try.</span>}
            </div>
          )}
          {feedback && (
            <div className="teacher-note">
              <div className="teacher-badge">
                <div className="teacher-avatar">{teacher.avatar}</div>
                <div className="teacher-name">{teacher.name}&apos;s feedback</div>
              </div>
              <div className="lesson-text">{feedback}</div>
              <p className="kmuted small">Revise and turn it in again any time. Great writers rewrite.</p>
            </div>
          )}
          {taskStatus === "done" && !feedback && (
            <p className="kmuted small">Turned in! Read it over with the checklist above, and ask a parent to read it too.</p>
          )}
        </div>
      )}

      {done && (
        <div className="btnrow">
          {next ? (
            <Link href={`/kid/learn/${courseId}/${next.id}`} className="kbtn big">
              Next lesson: {next.title} →
            </Link>
          ) : null}
          <Link href={`/kid/learn/${courseId}`} className="kbtn ghost">
            Back to course
          </Link>
        </div>
      )}
    </div>
  );
}
