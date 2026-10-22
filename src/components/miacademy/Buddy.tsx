"use client";

import { useEffect, useMemo, useState } from "react";
import type { BuddyId } from "@/content/miacademy";
import type { Grid } from "@/lib/pixel/grid";
import { buddyHead, buddyWalk } from "@/lib/pixel/buddies";

/**
 * A kid's animal buddy in the portal's pixel style (src/lib/pixel/buddies.ts).
 * The whole animal faces right and walks (two frames); `head` shows just the
 * face, for greetings and speech bubbles.
 */
export default function Buddy({ kind, head = false, className }: { kind: BuddyId; head?: boolean; className?: string }) {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    if (head || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setFrame((f) => 1 - f), 260);
    return () => clearInterval(t);
  }, [head]);
  const grids = useMemo(() => (head ? [buddyHead(kind)] : [buddyWalk(kind, 0), buddyWalk(kind, 1)]), [kind, head]);
  return <PixelSvg grid={grids[head ? 0 : frame]} className={className} />;
}

function PixelSvg({ grid, className }: { grid: Grid; className?: string }) {
  const runs = useMemo(() => grid.runs(), [grid]);
  return (
    <svg className={`mia-pixel ${className ?? ""}`} viewBox={`0 0 ${grid.w} ${grid.h}`} shapeRendering="crispEdges" aria-hidden="true">
      {runs.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={1} fill={r.c} />
      ))}
    </svg>
  );
}
