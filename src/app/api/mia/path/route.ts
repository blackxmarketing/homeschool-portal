import { NextResponse } from "next/server";
import { kidFromRequest } from "@/lib/auth";
import { miaPathSync, miaSetStudentPdf } from "@/lib/store";
import { lessonKeyFromLink, miaChecklists, parsePathCourses, readLessonInBackground } from "@/lib/miaSync";

/**
 * What the Chrome extension sees on the kid's Miacademy pages:
 *   { courses }  - the assignments page's course list (Miacademy's own data), or
 *   { page, pdfs } - a lesson page's address and the PDF links on it.
 * Answers with the checklists.
 */
export async function POST(req: Request) {
  const kid = await kidFromRequest(req);
  if (!kid) return NextResponse.json({ error: "Please log in again." }, { status: 401 });
  const body = (await req.json().catch(() => ({}))) as { courses?: unknown; page?: unknown; pdfs?: unknown };
  const toRead: number[] = [];
  if (body.courses !== undefined) toRead.push(...miaPathSync(kid.id, parsePathCourses(body.courses)));
  if (typeof body.page === "string" && Array.isArray(body.pdfs)) {
    const key = lessonKeyFromLink(body.page);
    const student = body.pdfs.find((u): u is string => typeof u === "string" && /Student(\+|%20| )PDF\.pdf$/i.test(u));
    if (key && student) {
      const id = miaSetStudentPdf(kid.id, key, student);
      if (id) toRead.push(id);
    }
  }
  for (const id of toRead) readLessonInBackground(kid.id, id);
  return NextResponse.json({ checklists: miaChecklists(kid.id) });
}
