/**
 * Runs inside Miacademy's own page (Chrome's "MAIN world") so it can see the
 * data Miacademy loads for itself: the kid's assignments list, and links to
 * lesson PDFs. It only reads copies of the answers and passes them to the
 * extension's content script with window.postMessage; it never changes a
 * request, an answer, or the page. When asked ("refreshPath"), it reads the
 * assignments list again the same way Miacademy last did, so a finished
 * video or practice shows up without the kid going back to that page.
 */
(() => {
  const PATH = "LearningPathController/BatchConvertAssignedCourses";
  const PDF = /https:\/\/miaplaza-content\.s3[\w.-]*\.amazonaws\.com\/[^"'\s\\]+?\.pdf/gi;

  type PathRequest = { url: string; method: string; body: string | null };
  /** How Miacademy last asked for the assignments list (from this page or, via the extension, an earlier one). */
  let pathRequest: PathRequest | null = null;

  const post = (kind: "path" | "pdfs" | "pathRequest", data: unknown) => window.postMessage({ __focusBuddy: true, kind, data }, window.location.origin);

  function look(url: string, text: string) {
    try {
      if (url.includes(PATH)) post("path", JSON.parse(text));
      const pdfs = text.match(PDF);
      if (pdfs) post("pdfs", [...new Set(pdfs.map((u) => u.replace(/\\u0026/g, "&")))]);
    } catch {
      // Not JSON or not ours: ignore.
    }
  }

  function remember(url: string, method: string, body: unknown) {
    if (!url.includes(PATH)) return;
    pathRequest = { url: new URL(url, location.href).href, method: method.toUpperCase(), body: typeof body === "string" ? body : null };
    post("pathRequest", pathRequest);
  }

  const open = XMLHttpRequest.prototype.open;
  const send = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.open = function (this: XMLHttpRequest & { __fbUrl?: string; __fbMethod?: string }, ...args: unknown[]) {
    this.__fbMethod = String(args[0] ?? "GET");
    this.__fbUrl = String(args[1] ?? "");
    this.addEventListener("load", () => {
      if (this.responseType === "" || this.responseType === "text") look(this.__fbUrl ?? "", this.responseText);
    });
    return (open as (...a: unknown[]) => void).apply(this, args);
  } as typeof XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.send = function (this: XMLHttpRequest & { __fbUrl?: string; __fbMethod?: string }, body?: Document | XMLHttpRequestBodyInit | null) {
    try {
      remember(this.__fbUrl ?? "", this.__fbMethod ?? "GET", body);
    } catch {
      // Never get in Miacademy's way.
    }
    return send.call(this, body);
  };

  const fetch0 = window.fetch;
  window.fetch = async function (...args: Parameters<typeof fetch>) {
    try {
      const url = typeof args[0] === "string" ? args[0] : args[0] instanceof URL ? args[0].href : args[0].url;
      remember(url, args[1]?.method ?? (args[0] instanceof Request ? args[0].method : "GET"), args[1]?.body);
    } catch {
      // Never get in Miacademy's way.
    }
    const res = await fetch0.apply(this, args);
    try {
      const url = typeof args[0] === "string" ? args[0] : args[0] instanceof URL ? args[0].href : args[0].url;
      if ((res.headers.get("content-type") ?? "").includes("json")) void res.clone().text().then((t) => look(url, t));
    } catch {
      // Never get in Miacademy's way.
    }
    return res;
  };

  window.addEventListener("message", (e) => {
    if (e.source !== window || !e.data?.__focusBuddy) return;
    // The extension remembers the request from an earlier page.
    if (e.data.kind === "knownPathRequest" && !pathRequest && e.data.data?.url) pathRequest = e.data.data as PathRequest;
    if (e.data.kind === "refreshPath" && pathRequest && new URL(pathRequest.url).origin === location.origin) {
      const r = pathRequest;
      void fetch0(r.url, { method: r.method, body: r.method === "GET" ? undefined : r.body, credentials: "include", headers: !r.body || r.method === "GET" ? undefined : { "Content-Type": /^[[{]/.test(r.body) ? "application/json" : "application/x-www-form-urlencoded" } })
        .then((res) => res.text())
        .then((t) => look(r.url, t))
        .catch(() => undefined);
    }
  });
})();
