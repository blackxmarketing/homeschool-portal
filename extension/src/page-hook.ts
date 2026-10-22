/**
 * Runs inside Miacademy's own page (Chrome's "MAIN world") so it can see the
 * data Miacademy loads for itself: the kid's assignments list, and links to
 * lesson PDFs. It only reads copies of the answers and passes them to the
 * extension's content script with window.postMessage; it never changes a
 * request, an answer, or the page.
 */
(() => {
  const PATH = "LearningPathController/BatchConvertAssignedCourses";
  const PDF = /https:\/\/miaplaza-content\.s3[\w.-]*\.amazonaws\.com\/[^"'\s\\]+?\.pdf/gi;

  const post = (kind: "path" | "pdfs", data: unknown) => window.postMessage({ __focusBuddy: true, kind, data }, window.location.origin);

  function look(url: string, text: string) {
    try {
      if (url.includes(PATH)) post("path", JSON.parse(text));
      const pdfs = text.match(PDF);
      if (pdfs) post("pdfs", [...new Set(pdfs.map((u) => u.replace(/\\u0026/g, "&")))]);
    } catch {
      // Not JSON or not ours: ignore.
    }
  }

  const open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (this: XMLHttpRequest & { __fbUrl?: string }, ...args: unknown[]) {
    this.__fbUrl = String(args[1] ?? "");
    this.addEventListener("load", () => {
      if (this.responseType === "" || this.responseType === "text") look(this.__fbUrl ?? "", this.responseText);
    });
    return (open as (...a: unknown[]) => void).apply(this, args);
  } as typeof XMLHttpRequest.prototype.open;

  const fetch0 = window.fetch;
  window.fetch = async function (...args: Parameters<typeof fetch>) {
    const res = await fetch0.apply(this, args);
    try {
      const url = typeof args[0] === "string" ? args[0] : args[0] instanceof URL ? args[0].href : args[0].url;
      if ((res.headers.get("content-type") ?? "").includes("json")) void res.clone().text().then((t) => look(url, t));
    } catch {
      // Never get in Miacademy's way.
    }
    return res;
  };
})();
