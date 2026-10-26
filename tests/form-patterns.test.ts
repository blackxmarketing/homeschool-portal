import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/** Every .tsx file under a folder. */
function tsxFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? tsxFiles(p) : p.endsWith(".tsx") ? [p] : [];
  });
}

describe("form input patterns", () => {
  it("never lost the backslash in \\d (a pattern of plain d's turns away every number)", () => {
    const bad = tsxFiles(path.join(process.cwd(), "src")).filter((f) => /pattern="d\{|pattern=\{"d\{/.test(fs.readFileSync(f, "utf8")));
    expect(bad).toEqual([]);
  });
});
