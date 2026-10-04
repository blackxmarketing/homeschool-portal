import { NextResponse } from "next/server";
import { currentSession } from "@/lib/auth";
import { weeklySummary, aiEnabled } from "@/lib/ai";
import { addDays } from "@/lib/engine/mastery";
import { gradeProgress } from "@/lib/engine/planner";
import { getKid, kidFlags, learnerProfiles, recentMastered, skillStates, today, weekStats } from "@/lib/store";

export async function POST(req: Request) {
  const s = await currentSession();
  if (s?.role !== "parent") return NextResponse.json({ error: "Please log in again." }, { status: 401 });
  const { kidId } = (await req.json().catch(() => ({}))) as { kidId?: number };
  const kid = kidId ? getKid(kidId) : undefined;
  if (!kid || kid.family_id !== s.familyId) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (!aiEnabled()) {
    return NextResponse.json({ error: "Add ANTHROPIC_API_KEY to the server's environment to turn on AI summaries." }, { status: 400 });
  }
  const summary = await weeklySummary({
    child: { firstName: kid.name, gradeOfRecord: kid.grade },
    lastSevenDays: weekStats(kid.id),
    skillsMasteredThisWeek: recentMastered(kid.id, addDays(today(), -6)).map((m) => m.title),
    masteryByGrade: gradeProgress(skillStates(kid.id)),
    flags: kidFlags(kid.id).map((f) => ({ kind: f.kind, skill: f.skillTitle, detail: f.message })),
    learnerProfileBySubject: learnerProfiles(kid.id).map((s) => ({
      subject: s.title,
      status: s.profile.status,
      firstTryAccuracy: s.profile.accuracy,
      timeVsExpected: s.profile.speed,
      helpRate: s.profile.helpRate,
      reasons: s.profile.reasons,
      weakestIdeas: s.weakest.map((w) => w.title),
      whatHelpsWhenStuck: s.helps.best,
      howTheCoachIsAdapting: s.adaptation.mode === "standard" ? [] : s.adaptation.why.slice(0, 3),
    })),
  });
  if (!summary) return NextResponse.json({ error: "Couldn't write a summary right now. Try again later." }, { status: 502 });
  return NextResponse.json({ summary });
}
