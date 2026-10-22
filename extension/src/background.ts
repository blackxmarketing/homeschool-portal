import type { ApiReply, ExtMessage, Status } from "./messages";

/**
 * The extension's background worker. It holds the connection to the portal
 * (the token from a parent's connect code), makes every portal call for the
 * Miacademy pages, and plays the teacher's voice through an offscreen page.
 */

async function config(): Promise<{ portal: string; token: string | null; kidName: string | null; kind: "kid" | "parent" }> {
  const c = (await chrome.storage.local.get(["portal", "token", "kidName", "kind"])) as { portal?: string; token?: string; kidName?: string; kind?: string };
  return { portal: c.portal || __PORTAL__, token: c.token ?? null, kidName: c.kidName ?? null, kind: c.kind === "parent" ? "parent" : "kid" };
}

async function call(method: string, path: string, body?: unknown): Promise<ApiReply> {
  const { portal, token } = await config();
  if (!token) return { ok: false, status: 401, data: { error: "Not connected yet." } };
  try {
    const res = await fetch(portal + path, {
      method,
      headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const data = (await res.json().catch(() => ({}))) as ApiReply["data"];
    // A parent disconnected this computer in Settings. (A parent-mode connection is only cleared by its own pages.)
    if (res.status === 401 && path.startsWith("/api/mia") && (await config()).kind === "kid") await chrome.storage.local.remove(["token", "kidName", "kind"]);
    return { ok: res.ok, status: res.status, data };
  } catch {
    return { ok: false, status: 0, data: { error: "Can't reach the portal. Check the internet." } };
  }
}

// ---- Voice: the portal's natural teacher voice when it's on, otherwise Chrome's own ----

let offscreenReady: Promise<void> | null = null;
function ensureOffscreen(): Promise<void> {
  offscreenReady ??= (async () => {
    if (await chrome.offscreen.hasDocument()) return;
    await chrome.offscreen.createDocument({
      url: "offscreen.html",
      reasons: [chrome.offscreen.Reason.AUDIO_PLAYBACK],
      justification: "Plays the teacher's voice and chimes for the learning timers.",
    });
  })().catch((e) => {
    offscreenReady = null;
    throw e;
  });
  return offscreenReady;
}

function toBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let s = "";
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s);
}

function chromeVoice(text: string) {
  chrome.tts.getVoices((voices) => {
    const female = voices.find((v) => /en-US/i.test(v.lang ?? "") && /female|zira|aria|jenny|samantha|google us english/i.test(v.voiceName ?? ""));
    chrome.tts.speak(text, { lang: "en-US", rate: 0.95, pitch: 1.05, voiceName: female?.voiceName });
  });
}

async function say(text: string) {
  try {
    await ensureOffscreen();
    await chrome.runtime.sendMessage({ target: "offscreen", type: "chime" });
    const clip = await call("POST", "/api/voice", { text, kind: "female" });
    const id = (clip.data as { id?: string }).id;
    if (clip.ok && id) {
      const { portal, token } = await config();
      const res = await fetch(`${portal}/api/voice/${id}`, { headers: { authorization: `Bearer ${token}` } });
      if (res.ok) {
        const src = `data:audio/mpeg;base64,${toBase64(await res.arrayBuffer())}`;
        const played = (await chrome.runtime.sendMessage({ target: "offscreen", type: "play", src })) as { ok?: boolean } | undefined;
        if (played?.ok) return;
      }
    }
  } catch {
    // Fall through to Chrome's voice.
  }
  chromeVoice(text);
}

// ---- Messages from the Miacademy pages and the popup ----

async function handle(msg: ExtMessage): Promise<unknown> {
  switch (msg.type) {
    case "status": {
      const { portal, token, kidName, kind } = await config();
      return { connected: !!token, kind, kidName, portal } satisfies Status;
    }
    case "pair": {
      const portal = msg.portal.trim().replace(/\/+$/, "") || __PORTAL__;
      try {
        const res = await fetch(`${portal}/api/mia/pair`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ code: msg.code }),
        });
        const data = (await res.json().catch(() => ({}))) as { token?: string; kidName?: string; kind?: string; error?: string };
        if (!res.ok || !data.token) return { ok: false, error: data.error ?? "That code didn't work." };
        await chrome.storage.local.set({ portal, token: data.token, kidName: data.kidName ?? null, kind: data.kind === "parent" ? "parent" : "kid" });
        return { ok: true, kidName: data.kidName };
      } catch {
        return { ok: false, error: "Can't reach the portal. Check the address and the internet." };
      }
    }
    case "unpair": {
      const r = await call("DELETE", "/api/mia/pair", { pin: msg.pin });
      if (!r.ok && r.status !== 401) return { ok: false, error: r.data.error ?? "Couldn't disconnect." };
      await chrome.storage.local.remove(["token", "kidName", "kind"]);
      return { ok: true };
    }
    case "api":
      return call(msg.method, msg.path, msg.body);
    case "say":
      void say(msg.text);
      return { ok: true };
  }
}

chrome.runtime.onMessage.addListener((msg: ExtMessage & { target?: string }, _sender, sendResponse) => {
  if (msg.target === "offscreen") return false;
  handle(msg).then(sendResponse, () => sendResponse({ ok: false, status: 0, data: { error: "Something went wrong." } }));
  return true;
});
