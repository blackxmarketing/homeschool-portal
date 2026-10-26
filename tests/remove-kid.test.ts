import { beforeEach, describe, expect, it } from "vitest";
import { getDb, openDb, setDb } from "@/lib/db";
import { addKid, createFamily, createPairCode, getKid, listKids, miaAct, miaDay, parentMiaMarkTimerDone, PortalError, removeKid } from "@/lib/store";

describe("removing a kid", () => {
  let family: number;
  beforeEach(() => {
    setDb(openDb(":memory:"));
    family = createFamily({ familyName: "Test", parentName: "P", email: `p${Math.random()}@test.test`, password: "password1" });
  });

  it("deletes the kid and everything saved for them, and leaves the other kids alone", () => {
    const keep = addKid(family, { name: "Bryce", avatar: "🐙", grade: 6, pin: "1111", dailyGoal: 45 });
    const extra = addKid(family, { name: "Bryce", avatar: "🦊", grade: 4, pin: "2222", dailyGoal: 45 });
    for (const k of [keep, extra]) {
      miaAct(k, "math", "start");
      parentMiaMarkTimerDone(family, k, "sci");
      createPairCode(family, k);
    }
    removeKid(family, extra);
    expect(getKid(extra)).toBeUndefined();
    expect(listKids(family).map((k) => k.id)).toEqual([keep]);
    const left = (t: string, id: number) => (getDb().prepare(`SELECT COUNT(*) AS n FROM ${t} WHERE kid_id = ?`).get(id) as { n: number }).n;
    expect(left("mia_timers", extra)).toBe(0);
    expect(left("mia_pair_codes", extra)).toBe(0);
    expect(left("mia_timers", keep)).toBe(2);
    expect(miaDay(keep).math).not.toBeNull();
  });

  it("only a kid in the parent's own family", () => {
    const kid = addKid(family, { name: "Emme", avatar: "🐼", grade: 6, pin: "1111", dailyGoal: 45 });
    expect(() => removeKid(family + 1, kid)).toThrow(PortalError);
    expect(getKid(kid)).toBeDefined();
  });
});
