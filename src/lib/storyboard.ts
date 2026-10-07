import type { Beat } from "@/content/courses/types";

/**
 * Where each slide starts in the teacher's text (character position). A
 * slide's `at` words are found in order after the slide before it; if they
 * can't be found (say a parent reworded the text) the slide starts with the
 * one before it instead of breaking.
 */
export function cuePositions(text: string, beats: Pick<Beat, "at">[]): number[] {
  const lower = text.toLowerCase();
  let from = 0;
  return beats.map((b, i) => {
    if (!b.at || i === 0) return 0;
    const at = lower.indexOf(b.at.toLowerCase(), from);
    if (at < 0) return from;
    from = at + 1;
    return at;
  });
}

/**
 * Where each slide starts, for a scene that owns its slides. Exact `at` cues are
 * used when the author gave them; otherwise the slides are spread evenly through
 * the narration so they change at a steady pace. A scene's words can then be
 * reworded without silently collapsing its slides onto each other.
 */
export function slidePositions(text: string, beats: Pick<Beat, "at">[]): number[] {
  if (!beats.length) return [];
  if (beats.some((b, i) => i > 0 && b.at)) return cuePositions(text, beats);
  return beats.map((_, i) => Math.floor((i / beats.length) * text.length));
}

/** True when every slide's cue words appear in the text, in order. */
export function cuesFound(text: string, beats: Pick<Beat, "at">[]): { ok: boolean; missing: string[] } {
  const lower = text.toLowerCase();
  let from = 0;
  const missing: string[] = [];
  beats.forEach((b, i) => {
    if (!b.at || i === 0) return;
    const at = lower.indexOf(b.at.toLowerCase(), from);
    if (at < 0) missing.push(b.at);
    else from = at + 1;
  });
  return { ok: missing.length === 0, missing };
}

/** The slide to show when the teacher has read up to `pos`. */
export function beatAt(positions: number[], pos: number): number {
  let idx = 0;
  positions.forEach((p, i) => {
    if (p <= pos) idx = i;
  });
  return idx;
}

/** YouTube ids are 11 letters, digits, - or _. */
export const isYoutubeId = (id: string) => /^[A-Za-z0-9_-]{11}$/.test(id);

/** A slide as the browser gets it: the photo already looked up. */
export interface PublicBeat {
  at?: string;
  caption: string;
  emoji?: string;
  big?: string;
  photo?: { src: string; width: number; height: number; credit: string; license: string; link: string };
}

export interface PublicShow {
  beats: PublicBeat[];
  watch?: { youtube: string; title: string; channel: string; start?: number; end?: number };
}

/** Builds what the browser needs; slides whose photo couldn't be found keep their caption. */
export function publicShow(
  show: Beat[] | undefined,
  watch: PublicShow["watch"] | undefined,
  photos: Record<string, PublicBeat["photo"] | null>,
): PublicShow | undefined {
  const beats = (show ?? []).map((b): PublicBeat => {
    const photo = b.photo ? photos[b.photo.trim()] : null;
    return {
      ...(b.at ? { at: b.at } : {}),
      caption: b.caption,
      ...(photo ? { photo: { ...photo, credit: cleanCredit(photo.credit) } } : b.emoji ? { emoji: b.emoji } : b.big ? { big: b.big } : {}),
    };
  });
  if (!beats.length && !watch) return undefined;
  return { beats, ...(watch ? { watch } : {}) };
}

/** Tidies a photo credit from Wikimedia: no doubled names, and a plain fallback. */
export function cleanCredit(raw: string): string {
  let c = raw.replace(/\s+/g, " ").trim();
  // Credits sometimes come through twice in a row ("Jane DoeJane Doe").
  const half = c.length / 2;
  if (Number.isInteger(half) && c.slice(0, half) === c.slice(half)) c = c.slice(0, half).trim();
  if (!c || /^unknown( author)?$/i.test(c) || /^unknown author/i.test(c)) return "Wikimedia Commons";
  return c.length > 60 ? `${c.slice(0, 57)}…` : c;
}
