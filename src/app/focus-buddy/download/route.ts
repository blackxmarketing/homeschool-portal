import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { currentSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

/** Newest Focus Buddy zip in a folder (focus-buddy-<version>.zip), or null. */
function newestZip(dir: string): string | null {
  try {
    const zips = fs
      .readdirSync(/*turbopackIgnore: true*/ dir)
      .filter((f) => /^focus-buddy-\d+(\.\d+)*\.zip$/.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    return zips.length ? path.join(dir, zips[zips.length - 1]) : null;
  } catch {
    return null;
  }
}

/**
 * Focus Buddy (the Chrome extension) for a parent to install on the family's
 * computers. The server's build makes the zip (Dockerfile -> /app/downloads);
 * on a laptop it's the one `npm run ext:zip` wrote.
 */
export async function GET(req: Request) {
  const s = await currentSession();
  if (s?.role !== "parent") return NextResponse.redirect(new URL("/parent/login", req.url));
  const file = newestZip(path.join(/*turbopackIgnore: true*/ process.cwd(), "downloads")) ?? newestZip(path.join(/*turbopackIgnore: true*/ process.cwd(), "extension"));
  if (!file) return new NextResponse("Focus Buddy isn't ready to download yet. Try again after the next update.", { status: 404 });
  return new NextResponse(new Uint8Array(fs.readFileSync(/*turbopackIgnore: true*/ file)), {
    headers: {
      "content-type": "application/zip",
      "content-disposition": `attachment; filename="${path.basename(file)}"`,
      "cache-control": "no-store",
    },
  });
}
