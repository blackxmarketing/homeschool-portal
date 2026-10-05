import { getDb } from "./db";
import { resolvePhoto, type Photo } from "./mediaFetch";

/**
 * Photos for lesson slides, looked up once and kept in the database so
 * lessons load fast and Wikimedia isn't asked again and again.
 */

const FOUND_DAYS = 30;
const MISSING_DAYS = 1;
const DAY = 86_400_000;
/** Lookups at a time: Wikimedia turns away bursts of requests. */
const AT_ONCE = 4;

function cached(ref: string): { photo: Photo | null; fresh: boolean } | null {
  const row = getDb().prepare("SELECT json, fetched_at FROM media_cache WHERE ref = ?").get(ref) as { json: string | null; fetched_at: number } | undefined;
  if (!row) return null;
  const photo = row.json ? (JSON.parse(row.json) as Photo) : null;
  const age = Date.now() - row.fetched_at;
  return { photo, fresh: age < (photo ? FOUND_DAYS : MISSING_DAYS) * DAY };
}

function save(ref: string, photo: Photo | null) {
  getDb()
    .prepare("INSERT INTO media_cache (ref, json, fetched_at) VALUES (?, ?, ?) ON CONFLICT(ref) DO UPDATE SET json = excluded.json, fetched_at = excluded.fetched_at")
    .run(ref, photo ? JSON.stringify(photo) : null, Date.now());
}

/**
 * Photos for these slide references. Cached ones come back right away; new
 * ones are looked up a few at a time, waiting at most `waitMs` so a slow
 * network never holds up a lesson (anything late is saved for next time).
 */
export async function photosFor(refs: string[], waitMs = 4000): Promise<Record<string, Photo | null>> {
  const out: Record<string, Photo | null> = {};
  const queue: string[] = [];
  for (const ref of new Set(refs.map((r) => r.trim()).filter(Boolean))) {
    const c = cached(ref);
    if (c) out[ref] = c.photo;
    if (!c || !c.fresh) queue.push(ref);
  }
  if (!queue.length) return out;

  const lookup = async (ref: string) => {
    try {
      const photo = await resolvePhoto(ref);
      save(ref, photo);
      out[ref] = photo;
    } catch {
      // Wikimedia unreachable or busy: keep any old photo and try again next time.
    }
  };
  const worker = async () => {
    for (let ref = queue.shift(); ref !== undefined; ref = queue.shift()) await lookup(ref);
  };
  const all = Promise.all(Array.from({ length: Math.min(AT_ONCE, queue.length) }, worker));
  await Promise.race([all, new Promise((r) => setTimeout(r, waitMs))]);
  // A snapshot, so lookups that finish later don't change what this page already sent.
  return { ...out };
}
