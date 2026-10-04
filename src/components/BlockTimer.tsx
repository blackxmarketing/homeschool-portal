"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { mmss } from "./focus";

/**
 * A guided, off-screen block of the 2-hour day: start the timer, go do the
 * work, then tell a parent what you did. The parent approves it.
 */
export default function BlockTimer({ blockId, label, minutes, initial }: { blockId: string; label: string; minutes: number; initial: string }) {
  const key = `lp.block.${blockId}`;
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState(Date.now());
  const [note, setNote] = useState("");
  const [state, setState] = useState(initial);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = Number(sessionStorage.getItem(key));
      if (saved) setStartedAt(saved);
    } catch {
      // Storage blocked: the timer just starts fresh.
    }
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [key]);

  function start() {
    const t = Date.now();
    setStartedAt(t);
    try {
      sessionStorage.setItem(key, String(t));
    } catch {}
  }

  const elapsed = startedAt ? Math.floor((now - startedAt) / 1000) : 0;
  const left = Math.max(0, minutes * 60 - elapsed);

  async function finish() {
    setError(null);
    const res = await fetch("/api/block", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ blockId, minutes: Math.max(1, Math.round(elapsed / 60)), note }),
    });
    const data = await res.json();
    if (!res.ok) return setError(data.error ?? "Something went wrong.");
    try {
      sessionStorage.removeItem(key);
    } catch {}
    setState("pending");
  }

  if (state === "pending" || state === "approved") {
    return (
      <div className="kcard break-card pop">
        <div className="break-icon">{state === "approved" ? "✅" : "⏳"}</div>
        <h2>{state === "approved" ? `${label} block approved!` : `${label} block turned in!`}</h2>
        <p>{state === "approved" ? "Nice work. That ring is full." : "A parent will check it, then your ring fills up (+25 XP)."}</p>
        <Link href="/kid" className="kbtn big">
          Back to base
        </Link>
      </div>
    );
  }

  return (
    <div className="kcard break-card">
      {!startedAt ? (
        <button className="kbtn big" onClick={start}>
          ▶ Start my {minutes}-minute {label} block
        </button>
      ) : (
        <>
          <div className="break-timer">{left > 0 ? mmss(left) : "Time!"}</div>
          <p className="kmuted">{left > 0 ? "Go do it! Come back when the timer's done." : "Block complete. What did you do?"}</p>
          <textarea
            className="kinput"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What did you read, write, build or discover?"
            maxLength={500}
          />
          {error && <div className="error">{error}</div>}
          <div className="btnrow" style={{ justifyContent: "center" }}>
            <button className="kbtn big" onClick={finish} disabled={note.trim().length < 5 || elapsed < 60}>
              I finished this block ✔
            </button>
          </div>
          {elapsed < 60 && <p className="kmuted small">You can turn it in after at least a minute.</p>}
        </>
      )}
    </div>
  );
}
