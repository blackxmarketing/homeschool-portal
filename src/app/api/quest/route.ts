import { NextResponse } from "next/server";
import { kidFromRequest } from "@/lib/auth";
import { completeQuest, nextSideQuest, PortalError } from "@/lib/store";
import type { QuestKind } from "@/content/quests";

const KINDS: QuestKind[] = ["brain", "create", "mission"];

/** { action: "next", kinds?: QuestKind[] } picks a side quest; { action: "complete", questId, response? } turns one in. */
export async function POST(req: Request) {
  const kid = await kidFromRequest();
  if (!kid) return NextResponse.json({ error: "Please log in again." }, { status: 401 });
  const body = (await req.json().catch(() => ({}))) as {
    action?: string;
    kinds?: QuestKind[];
    questId?: string;
    response?: string;
  };
  try {
    if (body.action === "next") {
      const kinds = (body.kinds ?? KINDS).filter((k) => KINDS.includes(k));
      return NextResponse.json({ quest: nextSideQuest(kid.id, kinds.length ? kinds : KINDS) });
    }
    if (body.action === "complete" && body.questId) {
      return NextResponse.json(completeQuest(kid.id, body.questId, typeof body.response === "string" ? body.response : ""));
    }
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  } catch (e) {
    if (e instanceof PortalError) return NextResponse.json({ error: e.message }, { status: 400 });
    throw e;
  }
}
