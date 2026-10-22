import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { kidFromRequest } from "@/lib/auth";
import { aiEnabled, checkWorksheetPhoto, type PhotoCheck } from "@/lib/ai";
import { answerKeyUrl } from "@/lib/miaLessons";
import { miaPhotoDir } from "@/lib/miaPhotos";
import { miaBoard } from "@/lib/miaSync";
import { miaFinishItem, miaLesson, miaRecordPhotoCheck, PortalError } from "@/lib/store";

const TYPES = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" } as const;
const MAX_BYTES = 8 * 1024 * 1024;

/**
 * A photo of a finished activity: { lessonId, itemId, image (base64), mediaType }.
 * Worksheets are checked against the answer key; hands-on activities wait for a parent.
 */
export async function POST(req: Request) {
  const kid = await kidFromRequest(req);
  if (!kid) return NextResponse.json({ error: "Please log in again." }, { status: 401 });
  const body = (await req.json().catch(() => ({}))) as { lessonId?: unknown; itemId?: unknown; image?: unknown; mediaType?: unknown };
  const mediaType = body.mediaType as keyof typeof TYPES;
  if (typeof body.lessonId !== "number" || typeof body.itemId !== "string" || typeof body.image !== "string" || !TYPES[mediaType])
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  const bytes = Buffer.from(body.image, "base64");
  if (!bytes.length || bytes.length > MAX_BYTES) return NextResponse.json({ error: "That photo is too big. Try again." }, { status: 400 });

  const lesson = miaLesson(kid.id, body.lessonId);
  const item = lesson?.items?.find((i) => i.id === body.itemId);
  if (!lesson || !item) return NextResponse.json({ error: "That activity isn't on the checklist." }, { status: 400 });

  // Keep every photo so a parent can look at it.
  const dir = path.join(miaPhotoDir(), String(kid.id));
  fs.mkdirSync(dir, { recursive: true });
  const file = `${lesson.id}-${item.id}-${Date.now()}.${TYPES[mediaType]}`;
  fs.writeFileSync(path.join(dir, file), bytes);
  const photo = `${kid.id}/${file}`;

  try {
    if (item.check === "parent") {
      miaFinishItem(kid.id, lesson.id, item.id, photo);
      return NextResponse.json({ waitingForParent: true, ...miaBoard(kid.id) });
    }
    const key = lesson.studentPdf ? answerKeyUrl(lesson.studentPdf) : null;
    if (!key) return NextResponse.json({ error: "There's no answer key for this one yet. Ask a grown-up." }, { status: 400 });
    const result =
      !aiEnabled() && process.env.NODE_ENV !== "production"
        ? previewCheck(lesson.states[item.id]?.total === undefined)
        : await checkWorksheetPhoto({ answerKeyUrl: key, activity: item.title, pages: item.pages, image: { data: body.image, mediaType } });
    if (!result) return NextResponse.json({ error: "I couldn't check that right now. Try again in a minute." }, { status: 503 });
    if (!result.readable) return NextResponse.json({ readable: false, message: result.message });
    miaRecordPhotoCheck(kid.id, lesson.id, item.id, result, photo);
    return NextResponse.json({ ...result, ...miaBoard(kid.id) });
  } catch (e) {
    if (e instanceof PortalError) return NextResponse.json({ error: e.message }, { status: 400 });
    throw e;
  }
}

/** Preview only (no Claude key on a laptop): two to fix on the first photo, all fixed on the next. */
function previewCheck(first: boolean): PhotoCheck {
  return first
    ? { readable: true, right: 4, total: 6, wrong: [{ question: "blank 3", answer: "mass" }, { question: "blank 4", answer: "distance" }], message: "Nice try! Just two to fix." }
    : { readable: true, right: 6, total: 6, wrong: [], message: "You fixed them all!" };
}
