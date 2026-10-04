"use client";

import { useEffect, useState } from "react";
import WidgetView, { type CheckFn } from "./Widgets";
import type { PublicWidget } from "@/lib/teaching";

export interface PublicSegment {
  title: string;
  teach: string;
  visual?: PublicWidget;
  think: { q: string; choices: string[] };
}

export interface TeachInitial {
  segmentsDone: boolean[];
  activityDone: boolean;
  explainDone: boolean;
}

interface Props {
  courseId: string;
  lessonId: string;
  teacher: { name: string; avatar: string };
  hook?: { text: string; visual?: PublicWidget };
  segments: PublicSegment[];
  activity?: PublicWidget;
  explain?: { prompt: string };
  initial: TeachInitial;
  onFinished: () => void;
}

type Coaching = {
  hint: string;
  analogy: string | null;
  example: string | null;
  simpler: { q: string; choices: string[] } | null;
  reveal: { answer: number; why: string } | null;
};

async function coach<T>(body: Record<string, unknown>): Promise<T> {
  const res = await fetch("/api/coach", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
  return data as T;
}

function Coach({ teacher, children, tone = "" }: { teacher: { name: string; avatar: string }; children: React.ReactNode; tone?: string }) {
  return (
    <div className={`coach-bubble ${tone}`}>
      <div className="coach-avatar">{teacher.avatar}</div>
      <div>
        <div className="coach-name">{teacher.name}</div>
        <div className="coach-text">{children}</div>
      </div>
    </div>
  );
}

function SegmentView({
  courseId,
  lessonId,
  index,
  seg,
  teacher,
  alreadyDone,
  onDone,
}: {
  courseId: string;
  lessonId: string;
  index: number;
  seg: PublicSegment;
  teacher: { name: string; avatar: string };
  alreadyDone: boolean;
  onDone: () => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const [wrongPicks, setWrongPicks] = useState<number[]>([]);
  const [correctWhy, setCorrectWhy] = useState<string | null>(null);
  const [coaching, setCoaching] = useState<Coaching | null>(null);
  const [rescue, setRescue] = useState<{ explanation: string; tryThis: string } | null>(null);
  const [simpler, setSimpler] = useState<{ choice: number | null; feedback: string; correct: boolean } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nudge, setNudge] = useState(false);
  const done = alreadyDone || !!correctWhy || !!coaching?.reveal;

  // Struggle signal: a long pause without answering brings a gentle offer of help.
  useEffect(() => {
    if (done) return;
    const t = setTimeout(() => setNudge(true), 75_000);
    return () => clearTimeout(t);
  }, [done, coaching]);

  async function answer(choice: number) {
    if (busy || done) return;
    setBusy(true);
    setError(null);
    setPicked(choice);
    setNudge(false);
    try {
      const picks = [...wrongPicks, choice].map((c) => seg.think.choices[c]);
      const d = await coach<{ correct: boolean; why: string | null; coaching: Coaching | null; rescue: { explanation: string; tryThis: string } | null }>({
        action: "think",
        courseId,
        lessonId,
        seg: index,
        choice,
        picks,
      });
      if (d.correct) setCorrectWhy(d.why ?? "");
      else {
        setWrongPicks((w) => [...w, choice]);
        setCoaching(d.coaching);
        if (d.rescue) setRescue(d.rescue);
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function lost() {
    setBusy(true);
    setNudge(false);
    try {
      const d = await coach<{ coaching: Coaching; rescue: { explanation: string; tryThis: string } | null }>({
        action: "lost",
        courseId,
        lessonId,
        seg: index,
        picks: wrongPicks.map((c) => seg.think.choices[c]),
      });
      setCoaching(d.coaching);
      if (d.rescue) setRescue(d.rescue);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function answerSimpler(choice: number) {
    const d = await coach<{ correct: boolean; feedback: string }>({ action: "simpler", courseId, lessonId, seg: index, choice });
    setSimpler({ choice, ...d });
  }

  const checkVisual: CheckFn = (answer) => coach({ action: "visual", courseId, lessonId, seg: index, answer });

  return (
    <div className="kcard teach-seg pop">
      <div className="eyebrow">Part {index + 1}</div>
      <h2>{seg.title}</h2>
      <Coach teacher={teacher}>{seg.teach}</Coach>
      {seg.visual && <WidgetView w={seg.visual} onCheck={checkVisual} />}

      <div className="think">
        <div className="eyebrow">Quick think</div>
        <div className="check-text">{seg.think.q}</div>
        <div className="check-choices">
          {seg.think.choices.map((c, i) => (
            <button
              key={i}
              className={`check-choice ${picked === i ? "picked" : ""} ${correctWhy !== null && picked === i ? "right" : ""} ${wrongPicks.includes(i) ? "wrong" : ""} ${coaching?.reveal?.answer === i ? "right" : ""}`}
              disabled={busy || done || wrongPicks.includes(i)}
              onClick={() => answer(i)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {correctWhy !== null && (
        <Coach teacher={teacher} tone="good">
          ✅ {wrongPicks.length === 0 ? "Exactly right!" : "You worked it out! That's how learning happens."} {correctWhy}
        </Coach>
      )}

      {coaching && correctWhy === null && (
        <div className="ladder">
          {coaching.hint && <Coach teacher={teacher} tone="warn">🤔 {coaching.hint}</Coach>}
          {coaching.analogy && (
            <div className="approach">
              <div className="eyebrow">Another way to see it</div>
              <p>{coaching.analogy}</p>
            </div>
          )}
          {coaching.example && (
            <div className="approach">
              <div className="eyebrow">Watch it worked out</div>
              <p>{coaching.example}</p>
            </div>
          )}
          {rescue && (
            <Coach teacher={teacher} tone="ai">
              {rescue.explanation} <strong>{rescue.tryThis}</strong>
            </Coach>
          )}
          {coaching.simpler && !coaching.reveal && (
            <div className="approach">
              <div className="eyebrow">Let&apos;s take a smaller step first</div>
              <div className="check-text">{coaching.simpler.q}</div>
              <div className="check-choices">
                {coaching.simpler.choices.map((c, i) => (
                  <button
                    key={i}
                    className={`check-choice ${simpler?.choice === i ? (simpler.correct ? "right" : "wrong") : ""}`}
                    disabled={!!simpler?.correct}
                    onClick={() => answerSimpler(i)}
                  >
                    {c}
                  </button>
                ))}
              </div>
              {simpler && <div className={`check-why ${simpler.correct ? "good" : "bad"}`}>{simpler.feedback}</div>}
              {simpler?.correct && <p className="kmuted small">Now try the main question again with that in mind.</p>}
            </div>
          )}
          {coaching.reveal && (
            <Coach teacher={teacher} tone="good">
              Here&apos;s the answer: <strong>{seg.think.choices[coaching.reveal.answer]}</strong>. {coaching.reveal.why} We&apos;ll come back to
              this idea later so it sticks.
            </Coach>
          )}
          {!coaching.reveal && <p className="kmuted small">Give it another try. Every miss teaches your brain something.</p>}
        </div>
      )}

      {error && <div className="error">{error}</div>}
      {!done && (
        <div className="btnrow">
          <button className="kbtn ghost" onClick={lost} disabled={busy}>
            😵 I&apos;m lost, show me another way
          </button>
          {nudge && <span className="kmuted small">Taking a while? That&apos;s OK. Want me to explain it another way?</span>}
        </div>
      )}
      {done && (
        <div className="btnrow">
          <button className="kbtn big" onClick={onDone}>
            Keep going →
          </button>
        </div>
      )}
    </div>
  );
}

export default function TeachPlayer({ courseId, lessonId, teacher, hook, segments, activity, explain, initial, onFinished }: Props) {
  // Steps: hook, each segment, activity, explain.
  const steps: string[] = ["hook", ...segments.map((_, i) => `seg${i}`), ...(activity ? ["activity"] : []), ...(explain ? ["explain"] : [])];
  const firstOpen = (() => {
    const s = initial.segmentsDone.findIndex((d) => !d);
    if (s >= 0) return s === 0 ? 0 : s + 1;
    if (activity && !initial.activityDone) return 1 + segments.length;
    if (explain && !initial.explainDone) return steps.length - 1;
    return steps.length;
  })();
  const [step, setStep] = useState(firstOpen);
  const [activityDone, setActivityDone] = useState(initial.activityDone);
  const [ex, setEx] = useState<{ text: string; result: { understood: boolean; covered: string[]; missing: string[]; feedback: string; followUp: string; done: boolean } | null }>({
    text: "",
    result: null,
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (step >= steps.length) onFinished();
  }, [step, steps.length, onFinished]);

  const next = () => setStep((s) => s + 1);
  const current = steps[step];

  async function submitExplain() {
    setBusy(true);
    setError(null);
    try {
      const r = await coach<{ understood: boolean; covered: string[]; missing: string[]; feedback: string; followUp: string; done: boolean }>({
        action: "explain",
        courseId,
        lessonId,
        text: ex.text,
      });
      setEx((e) => ({ ...e, result: r }));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  const checkActivity: CheckFn = async (answer) => {
    const r = await coach<{ correct: boolean; parts: boolean[]; done: boolean; solution: number[] | null }>({ action: "activity", courseId, lessonId, answer });
    if (r.done) setActivityDone(true);
    return r;
  };

  return (
    <div>
      <div className="teach-progress" aria-label="Lesson progress">
        {steps.map((s, i) => (
          <span key={s} className={i < step ? "done" : i === step ? "on" : ""} title={s} />
        ))}
      </div>

      {current === "hook" && (
        <div className="kcard pop">
          <div className="eyebrow">Let&apos;s start with this</div>
          <Coach teacher={teacher}>{hook?.text ?? "Ready? Let's dig in."}</Coach>
          {hook?.visual && <WidgetView w={hook.visual} />}
          <button className="kbtn big" onClick={next}>
            Let&apos;s learn →
          </button>
        </div>
      )}

      {current?.startsWith("seg") && (
        <SegmentView
          key={current}
          courseId={courseId}
          lessonId={lessonId}
          index={Number(current.slice(3))}
          seg={segments[Number(current.slice(3))]}
          teacher={teacher}
          alreadyDone={initial.segmentsDone[Number(current.slice(3))]}
          onDone={next}
        />
      )}

      {current === "activity" && activity && (
        <div className="kcard pop">
          <div className="eyebrow">Hands-on: try it yourself</div>
          <WidgetView w={activity} onCheck={checkActivity} />
          {activityDone && (
            <button className="kbtn big" onClick={next}>
              Next →
            </button>
          )}
        </div>
      )}

      {current === "explain" && explain && (
        <div className="kcard pop">
          <div className="eyebrow">Explain it back</div>
          <Coach teacher={teacher}>
            {explain.prompt} Use your own words. Real understanding means you can teach it.
          </Coach>
          <textarea
            className="kinput"
            rows={6}
            value={ex.text}
            onChange={(e) => setEx({ ...ex, text: e.target.value })}
            placeholder="Explain it like you're teaching a friend…"
            disabled={ex.result?.done}
          />
          {error && <div className="error">{error}</div>}
          {ex.result && (
            <div className="explain-result">
              <Coach teacher={teacher} tone={ex.result.understood ? "good" : "warn"}>
                {ex.result.feedback} {ex.result.followUp && <strong>{ex.result.followUp}</strong>}
              </Coach>
              <div className="w-chips">
                {ex.result.covered.map((c) => (
                  <span key={c} className="w-chip right">
                    ✓ {c}
                  </span>
                ))}
                {ex.result.missing.map((c) => (
                  <span key={c} className="w-chip">
                    ＋ {c}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="btnrow">
            {!ex.result?.done && (
              <button className="kbtn big" disabled={busy || ex.text.trim().length < 15} onClick={submitExplain}>
                {busy ? `${teacher.name} is reading…` : ex.result ? "Try again with more" : "Check my explanation"}
              </button>
            )}
            {ex.result?.done && (
              <button className="kbtn big" onClick={next}>
                {ex.result.understood ? "Show what I know →" : "Keep going →"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
