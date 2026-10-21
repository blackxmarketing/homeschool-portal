// Stand-in for Chrome's extension APIs on the pretend Miacademy page.
// The token from a connect code is kept in this page's localStorage.
(function () {
  const listeners = [];
  const store = {
    get token() {
      return localStorage.getItem("fb-token");
    },
  };
  async function call(method, path, body) {
    if (!store.token) return { ok: false, status: 401, data: { error: "Not connected yet." } };
    const res = await fetch(path, {
      method,
      headers: { "content-type": "application/json", authorization: "Bearer " + store.token },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    return { ok: res.ok, status: res.status, data: await res.json().catch(() => ({})) };
  }
  window.__log = [];
  window.chrome = {
    runtime: {
      getURL: (p) => "/dist/" + p,
      async sendMessage(msg) {
        if (msg.type === "api") return call(msg.method, msg.path, msg.body);
        if (msg.type === "say") {
          window.__log.push(msg.text);
          if ("speechSynthesis" in window) speechSynthesis.speak(new SpeechSynthesisUtterance(msg.text));
          return { ok: true };
        }
        return { ok: false };
      },
    },
    storage: {
      onChanged: { addListener: (f) => listeners.push(f), removeListener: () => {} },
    },
  };
  // Connect with a code from the portal's Settings: __pair("ABC123")
  window.__pair = async (code) => {
    const res = await fetch("/api/mia/pair", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ code }) });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("fb-token", data.token);
      listeners.forEach((f) => f({ token: { newValue: "set" } }));
    }
    return data.kidName ?? data.error;
  };
})();
