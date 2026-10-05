/**
 * Checks every photo and video against the internet. Slow, so it only runs
 * when asked:  MEDIA_NET=1 npx vitest run tests/media-net.test.ts
 * (add MEDIA_COURSE=science to check one course).
 */
import { describe, expect, it } from "vitest";
import { MEDIA } from "@/content/media";
import { resolvePhoto } from "@/lib/mediaFetch";

const on = !!process.env.MEDIA_NET;
const only = process.env.MEDIA_COURSE;

describe.skipIf(!on)("photos and videos exist", () => {
  for (const [courseId, media] of Object.entries(MEDIA)) {
    if (only && only !== courseId) continue;
    it(`${courseId}`, { timeout: 300_000 }, async () => {
      const photos = new Set<string>();
      const videos = new Set<string>();
      for (const m of Object.values(media)) {
        for (const part of [m.hook, ...(m.teach ?? [])]) {
          part?.show?.forEach((b) => b.photo && photos.add(b.photo));
          if (part?.watch) videos.add(part.watch.youtube);
        }
      }
      const bad: string[] = [];
      for (const p of photos) {
        const r = await resolvePhoto(p);
        if (!r) bad.push(`photo: ${p}`);
        else if (process.env.MEDIA_LIST) console.log(`PHOTO\t${p}\t${r.src}\t${r.credit}\t${r.license}`);
      }
      for (const v of videos) {
        const res = await fetch(`https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(`https://www.youtube.com/watch?v=${v}`)}`);
        if (!res.ok) bad.push(`video: ${v} (${res.status})`);
      }
      expect(bad).toEqual([]);
    });
  }
});
