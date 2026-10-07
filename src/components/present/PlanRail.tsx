"use client";

import type { PlanItem } from "@/lib/lessonPlan";

/**
 * The lesson plan, always on screen, ticking off as the kid goes. The same
 * list they were shown in the brief and the same one on the map, so they can
 * always see where they are and how much is left.
 */
export default function PlanRail({
  plan,
  done,
  currentKey,
}: {
  plan: PlanItem[];
  /** Keys that are finished. */
  done: Set<string>;
  /** The item being worked on now. */
  currentKey: string | null;
}) {
  if (!plan.length) return null;
  const left = plan.filter((p) => !done.has(p.key)).reduce((t, p) => t + p.minutes, 0);
  const current = plan.find((p) => p.key === currentKey);
  // Closed by default: the teaching gets the screen, and the one line still
  // says where they are. Opening it shows the whole plan.
  return (
    <details className="pres-rail">
      <summary>
        <span className="pres-rail-title">{current ? `${current.icon} ${current.label}` : "The plan"}</span>
        <span className="pres-rail-left">
          {done.size}/{plan.length} done · {left} min left
        </span>
      </summary>
      <ol>
        {plan.map((p) => {
          const isDone = done.has(p.key);
          const now = p.key === currentKey;
          return (
            <li key={p.key} className={`${isDone ? "done" : ""} ${now ? "now" : ""}`.trim()}>
              <span className="pres-tick" aria-hidden>
                {isDone ? "✓" : now ? "▶" : ""}
              </span>
              <span className="pres-rail-icon" aria-hidden>
                {p.icon}
              </span>
              <span className="pres-rail-label">{p.label}</span>
              <span className="sr-only">{isDone ? " (done)" : now ? " (doing this now)" : ""}</span>
            </li>
          );
        })}
      </ol>
    </details>
  );
}
