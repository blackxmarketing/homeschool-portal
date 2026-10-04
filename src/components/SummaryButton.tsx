"use client";

import { useState } from "react";

export default function SummaryButton({ kidId }: { kidId: number }) {
  const [text, setText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function run() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/summary", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ kidId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setText(data.summary);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <button className="btn secondary" onClick={run} disabled={busy}>
        {busy ? "Writing…" : text ? "Rewrite summary" : "Write this week's AI summary"}
      </button>
      {error && <div className="error" style={{ marginTop: 10 }}>{error}</div>}
      {text && <div style={{ marginTop: 12, whiteSpace: "pre-wrap" }}>{text}</div>}
    </div>
  );
}
