import { isAxiosError } from "axios";

export function apiErrorMessage(e: unknown, fallback: string): string {
  if (isAxiosError(e)) {
    const body = e.response?.data;
    if (typeof body === "object" && body !== null && "message" in body) {
      const msg = (body as { message: string | string[] }).message;
      if (Array.isArray(msg)) return msg.join(", ");
      if (typeof msg === "string" && msg.trim()) return msg;
    }
    if (typeof body === "string" && body.trim()) return body;
    if (e.response) {
      return `${e.response.status} ${e.response.statusText}`;
    }
    return e.message;
  }
  if (e instanceof Error) return e.message;
  return fallback;
}
