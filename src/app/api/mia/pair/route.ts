import { NextResponse } from "next/server";
import { bearerToken, kidFromRequest } from "@/lib/auth";
import { familyFromParentToken, PortalError, redeemAnyPairCode, removeMiaDeviceByToken, removeMiaParentDeviceByToken, verifyParentPin } from "@/lib/store";

/**
 * The Chrome extension connects with a code from Settings: { code } -> { token, kind, name }.
 * kind "kid": the timers for that kid; kind "parent": parent mode (reads the Miacademy calendar).
 */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { code?: unknown };
  if (typeof body.code !== "string") return NextResponse.json({ error: "Type the code from Settings." }, { status: 400 });
  try {
    const r = redeemAnyPairCode(body.code);
    return NextResponse.json({ token: r.token, kind: r.kind, kidName: r.name });
  } catch (e) {
    if (e instanceof PortalError) return NextResponse.json({ error: e.message }, { status: 400 });
    throw e;
  }
}

/**
 * The extension disconnects itself. On a kid's computer this needs the parent
 * PIN when one is set, so a kid can't switch it off.
 */
export async function DELETE(req: Request) {
  const token = bearerToken(req);
  if (!token) return NextResponse.json({ ok: true });
  if (familyFromParentToken(token) !== null) {
    removeMiaParentDeviceByToken(token);
    return NextResponse.json({ ok: true });
  }
  const kid = await kidFromRequest(req);
  if (!kid) return NextResponse.json({ ok: true });
  const body = (await req.json().catch(() => ({}))) as { pin?: unknown };
  const check = verifyParentPin(kid.family_id, typeof body.pin === "string" ? body.pin : "");
  if (check === "wrong" || check === "locked")
    return NextResponse.json({ error: check === "locked" ? "Too many tries. Wait 5 minutes." : "That PIN isn't right." }, { status: 403 });
  removeMiaDeviceByToken(token);
  return NextResponse.json({ ok: true });
}
