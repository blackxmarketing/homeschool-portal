import { send, type Status } from "./messages";

/** The toolbar popup: a grown-up connects this computer with a code from the portal's Settings page. */

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

async function show() {
  const s = await send<Status>({ type: "status" });
  $("connected").hidden = !s.connected;
  $("connect").hidden = s.connected;
  $("kid").textContent = s.kidName ?? "";
  $<HTMLInputElement>("portal").value = s.portal;
}

$("connect").addEventListener("submit", async (e) => {
  e.preventDefault();
  $("error").textContent = "";
  const r = await send<{ ok: boolean; error?: string }>({
    type: "pair",
    portal: $<HTMLInputElement>("portal").value,
    code: $<HTMLInputElement>("code").value,
  });
  if (!r.ok) $("error").textContent = r.error ?? "That didn't work.";
  else await show();
});

$("disconnect").addEventListener("submit", async (e) => {
  e.preventDefault();
  $("error2").textContent = "";
  const r = await send<{ ok: boolean; error?: string }>({ type: "unpair", pin: $<HTMLInputElement>("pin").value });
  if (!r.ok) $("error2").textContent = r.error ?? "That didn't work.";
  else await show();
});

void show();
