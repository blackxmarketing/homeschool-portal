import { NextResponse } from "next/server";
import { kidFromRequest } from "@/lib/auth";
import { aiEnabled, gameAsk } from "@/lib/ai";
import { aiLimits, features } from "@/lib/content";
import { logTutor, tutorMessagesToday } from "@/lib/store";
import { teacherFor } from "@/content/teachers";
import { GAME_COACH, buildBoard, levelById } from "@/lib/minigames/chompers";

/**
 * The coach in XP Rush: Math answers a question - from the briefing before a
 * level, or from the Stuck? button inside one.
 *
 *  { levelId, board, seed, text }  ->  { answer }
 *
 * The board is rebuilt here only to read its rule back off it, and only the
 * rule is passed on. The squares never leave this function, so a kid cannot
 * use the coach to find out which ones to eat - the same reason the board is
 * scored by replaying it on the server instead of trusting the browser.
 */
export async function POST(req: Request) {
  const kid = await kidFromRequest();
  if (!kid) return NextResponse.json({ error: "Please log in again." }, { status: 401 });
  if (!features().aiTeachers || !aiEnabled()) {
    return NextResponse.json({ error: "The coach is not available right now." }, { status: 400 });
  }

  const b = (await req.json().catch(() => ({}))) as { levelId?: unknown; board?: unknown; seed?: unknown; text?: unknown };
  const level = typeof b.levelId === "string" ? levelById(b.levelId) : null;
  if (!level) return NextResponse.json({ error: "Bad request." }, { status: 400 });

  const text = String(b.text ?? "").trim().slice(0, 300);
  if (!text) return NextResponse.json({ error: "Ask the coach something first." }, { status: 400 });

  if (tutorMessagesToday(kid.id) >= aiLimits().messagesPerKidPerDay) {
    return NextResponse.json({ error: "That's all the coach's questions for today. Keep playing!" }, { status: 400 });
  }

  // Whatever the browser sends, the rule comes from a board this server built.
  const n = Math.floor(Number(b.board));
  const bi = Number.isFinite(n) ? Math.min(Math.max(n, 0), level.boards.length - 1) : 0;
  const s = Math.floor(Number(b.seed));
  const seed = Number.isFinite(s) && s > 0 ? s : 1;
  const rule = buildBoard(level.boards[bi], bi, seed).label;

  const teacher = teacherFor(GAME_COACH);
  logTutor(kid.id, { questionId: null, skillId: level.skill, teacherId: teacher.id, kind: "chat", role: "kid", content: text });

  const r = await gameAsk({
    teacher,
    levelTitle: level.title,
    intro: level.intro,
    rule,
    grade: level.grade,
    question: text,
  });
  if (!r) return NextResponse.json({ error: "The coach could not answer that one. Try asking it a different way." }, { status: 400 });

  logTutor(kid.id, { questionId: null, skillId: level.skill, teacherId: teacher.id, kind: "chat", role: "teacher", content: r.answer });
  return NextResponse.json({ answer: r.answer, onTopic: r.onTopic });
}
