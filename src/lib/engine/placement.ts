import { STRANDS, strandChain, allPrereqs, type Strand } from "../curriculum/skills";

/**
 * Placement test. For each strand, binary-search the chain of skills (easiest
 * to hardest) to find the hardest one the kid can already do. Each probe asks
 * PROBE_QUESTIONS questions and passes only if all are right. When it ends,
 * the passed skill and everything it depends on count as known.
 */

export const PROBE_QUESTIONS = 2;

export interface StrandSearch {
  strand: Strand;
  chain: string[];
  lo: number;
  hi: number;
  best: number;
  /** Results of the current probe's questions. */
  probe: boolean[];
}

export interface PlacementState {
  strands: StrandSearch[];
  current: number;
}

export function startPlacement(): PlacementState {
  return {
    current: 0,
    strands: STRANDS.map(({ id }) => {
      const chain = strandChain(id).map((s) => s.id);
      return { strand: id, chain, lo: 0, hi: chain.length - 1, best: -1, probe: [] };
    }),
  };
}

function done(s: StrandSearch): boolean {
  return s.lo > s.hi;
}

function mid(s: StrandSearch): number {
  return (s.lo + s.hi) >> 1;
}

/** The skill to ask about next, or null when placement is finished. */
export function nextPlacementSkill(state: PlacementState): string | null {
  const s = state.strands[state.current];
  if (!s) return null;
  return s.chain[mid(s)];
}

/** Records one answer and advances the search. Returns a new state. */
export function recordPlacementAnswer(state: PlacementState, correct: boolean): PlacementState {
  const next: PlacementState = structuredClone(state);
  const s = next.strands[next.current];
  if (!s) return next;

  s.probe.push(correct);
  const failed = s.probe.includes(false);
  if (!failed && s.probe.length < PROBE_QUESTIONS) return next;

  const m = mid(s);
  if (failed) {
    s.hi = m - 1;
  } else {
    s.best = m;
    s.lo = m + 1;
  }
  s.probe = [];

  while (next.strands[next.current] && done(next.strands[next.current])) next.current++;
  return next;
}

export function placementFinished(state: PlacementState): boolean {
  return state.current >= state.strands.length;
}

export function placementProgress(state: PlacementState): { done: number; total: number } {
  return { done: Math.min(state.current, state.strands.length), total: state.strands.length };
}

/** Skills to mark as known once placement is finished. */
export function placedSkills(state: PlacementState): string[] {
  const known = new Set<string>();
  for (const s of state.strands) {
    if (s.best < 0) continue;
    // Everything up to the best skill in the chain, plus all their prerequisites.
    for (let i = 0; i <= s.best; i++) {
      known.add(s.chain[i]);
      for (const p of allPrereqs(s.chain[i])) known.add(p);
    }
  }
  return [...known];
}
