/** Messages between the extension's parts (content script and popup -> background worker). */
export type ExtMessage =
  | { type: "status" }
  | { type: "pair"; portal: string; code: string }
  | { type: "unpair"; pin: string }
  | { type: "api"; method: "GET" | "POST"; path: string; body?: unknown }
  | { type: "say"; text: string };

export interface ApiReply<T = Record<string, unknown>> {
  ok: boolean;
  status: number;
  data: T & { error?: string };
}

export interface Status {
  connected: boolean;
  kidName: string | null;
  portal: string;
}

export function send<T>(msg: ExtMessage): Promise<T> {
  return chrome.runtime.sendMessage(msg) as Promise<T>;
}
