import { NextResponse } from "next/server";
import { bearerToken, kidFromRequest } from "@/lib/auth";
import { PortalError, redeemPairCode, removeMiaDeviceByToken, verifyParentPin } from "@/lib/store";

/** The Chrome extension connects with a parent's code: { code } -> { token, kidName }. */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { code?: unknown };
  if (typeof body.code !== "string") return NextResponse.json({ error: "Type the code from Settings." }, { status: 400 });
  try {
    const { token, kid } = redeemPairCode(body.code);
    return NextResponse.json({ token, kidName: kid.name });
  } catch (e) {
    if (e instanceof PortalError) return NextResponse.json({ error: e.message }, { status: 400 });
    throw e;
  }
}

/** The extension disconnects itself. Needs the parent PIN when one is set, so a kid can't switch it off. */
export async function DELETE(req: Request) {
  const kid = await kidFromRequest(req);
  const token = bearerToken(req);
  if (!kid || !token) return NextResponse.json({ ok: true });
  const body = (await req.json().catch(() => ({}))) as { pin?: unknown };
  const check = verifyParentPin(kid.family_id, typeof body.pin === "string" ? body.pin : "");
  if (check === "wrong" || check === "locked")
    return NextResponse.json({ error: check === "locked" ? "Too many tries. Wait 5 minutes." : "That PIN isn't right." }, { status: 403 });
  removeMiaDeviceByToken(token);
  return NextResponse.json({ ok: true });
}
