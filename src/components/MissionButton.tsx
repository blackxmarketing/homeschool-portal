"use client";

import { useState } from "react";

/** "I did it!" on a real-world mission. It waits for a parent's approval before XP is awarded. */
export default function MissionButton({ questId, initial }: { questId: string; initial: "open" | "pending" | "approved" | "declined" | "done" }) {
  const [state, setState] = useState(initial);
  const [error, setError] = useState<string | null>(null);

  async function done() {
    setError(null);
    const res = await fetch("/api/quest", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "complete", questId }),
    });
    const data = await res.json();
    if (!res.ok) setError(data.error ?? "Something went wrong.");
    else setState("pending");
  }

  if (state === "pending") return <span className="tag wait">⏳ Waiting for a parent to check</span>;
  if (state === "approved" || state === "done") return <span className="tag ok">✅ Approved!</span>;
  if (state === "declined") return <span className="tag">Not approved this time</span>;
  return (
    <>
      <button className="kbtn" onClick={done}>
        I did it! 🙌
      </button>
      {error && <div className="error small">{error}</div>}
    </>
  );
}
