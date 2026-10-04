"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Op = "+" | "−" | "×" | "÷";

/** Facts within 12 (a×b up to 12×12, and the matching +, −, ÷ facts). */
function makeFact(op: Op): { text: string; answer: number } {
  const r = (lo: number, hi: number) => lo + Math.floor(Math.random() * (hi - lo + 1));
  const a = r(2, 12);
  const b = r(2, 12);
  switch (op) {
    case "+":
      return { text: `${a} + ${b}`, answer: a + b };
    case "−":
      return { text: `${a + b} − ${b}`, answer: a };
    case "×":
      return { text: `${a} × ${b}`, answer: a * b };
    case "÷":
      return { text: `${a * b} ÷ ${a}`, answer: b };
  }
}

/** A 60-second math-fact speed drill. Wrong answers show the right one and move on. */
export default function Drill({ seconds, fluent }: { seconds: number; fluent: number }) {
  const [op, setOp] = useState<Op | null>(null);
  const [fact, setFact] = useState(() => makeFact("×"));
  const [answer, setAnswer] = useState("");
  const [left, setLeft] = useState(seconds);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [flash, setFlash] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const saved = useRef(false);

  useEffect(() => {
    if (!op || done) return;
    const t = setInterval(() => setLeft((l) => Math.max(0, l - 1)), 1000);
    return () => clearInterval(t);
  }, [op, done]);

  useEffect(() => {
    if (op && left === 0 && !done) {
      setDone(true);
      if (!saved.current) {
        saved.current = true;
        fetch("/api/drill", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ op, correct, wrong, seconds }),
        }).catch(() => {});
      }
    }
  }, [left, op, done, correct, wrong, seconds]);

  function start(o: Op) {
    setOp(o);
    setFact(makeFact(o));
    setLeft(seconds);
    setCorrect(0);
    setWrong(0);
    setDone(false);
    saved.current = false;
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!op || done || !answer.trim()) return;
    if (Number(answer) === fact.answer) {
      setCorrect((c) => c + 1);
      setFlash(null);
    } else {
      setWrong((w) => w + 1);
      setFlash(`${fact.text} = ${fact.answer}`);
    }
    setAnswer("");
    setFact(makeFact(op));
  }

  if (!op) {
    return (
      <div className="kcard break-card">
        <h2>Pick your drill</h2>
        <p className="kmuted">Answer as many as you can in {seconds} seconds. Goal: {fluent}+ correct.</p>
        <div className="choices" style={{ justifyContent: "center" }}>
          {(["+", "−", "×", "÷"] as Op[]).map((o) => (
            <button key={o} className="kbtn choice" onClick={() => start(o)}>
              {o}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (done) {
    const perMin = Math.round((correct / seconds) * 60);
    return (
      <div className="kcard break-card pop">
        <div className="break-icon">{perMin >= fluent ? "🏆" : "💪"}</div>
        <h2>
          {correct} correct · {perMin} per minute
        </h2>
        <p>{perMin >= fluent ? "Fluent! These facts are automatic for you." : `Keep drilling. Fluent is ${fluent}+ a minute. You're ${fluent - perMin} away.`}</p>
        <div className="btnrow" style={{ justifyContent: "center" }}>
          <button className="kbtn big" onClick={() => start(op)}>
            Again
          </button>
          <button className="kbtn ghost" onClick={() => setOp(null)}>
            Another operation
          </button>
          <Link href="/kid" className="kbtn ghost">
            Back to base
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="kcard break-card">
      <div className="drill-top">
        <span className="tag ok">✓ {correct}</span>
        <span className="break-timer" style={{ margin: 0 }}>
          {left}
        </span>
        <span className="tag">✗ {wrong}</span>
      </div>
      <div className="drill-fact">{fact.text} = ?</div>
      <form onSubmit={submit} className="answer-row" style={{ justifyContent: "center" }}>
        <input
          ref={inputRef}
          className="kinput answer-input"
          inputMode="numeric"
          value={answer}
          onChange={(e) => setAnswer(e.target.value.replace(/[^\d]/g, ""))}
          autoComplete="off"
          aria-label="Answer"
          style={{ textAlign: "center" }}
        />
        <button className="kbtn big">Go</button>
      </form>
      {flash && <div className="kmuted" style={{ marginTop: 8 }}>Missed: {flash}</div>}
    </div>
  );
}
