// Streams a chat answer from our own backend (never from Gemini directly).
// Yields parsed SSE events: {t:"meta",sources} {t:"token",v} {t:"done",remaining} {t:"error",...}
export class ChatError extends Error {
  constructor(code, message, extra = {}) {
    super(message);
    this.code = code;
    Object.assign(this, extra);
  }
}

export async function* streamChat(messages, signal) {
  let res;
  try {
    res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
      signal,
    });
  } catch (e) {
    if (e.name === "AbortError") throw e;
    throw new ChatError("network", "Can't reach the assistant. Check your connection and try again.");
  }

  if (!res.ok) {
    let body = {};
    try {
      body = await res.json();
    } catch {
      /* non-JSON error */
    }
    throw new ChatError(body.error || "server", body.message || "Something went wrong. Please try again.", {
      retryAfter: body.retryAfter,
      remaining: body.remaining,
    });
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    let i;
    while ((i = buf.indexOf("\n\n")) >= 0) {
      const frame = buf.slice(0, i);
      buf = buf.slice(i + 2);
      const line = frame.split("\n").find((l) => l.startsWith("data:"));
      if (!line) continue;
      try {
        yield JSON.parse(line.slice(5));
      } catch {
        /* ignore malformed frame */
      }
    }
  }
}

export async function fetchStatus() {
  try {
    const r = await fetch("/api/status");
    return r.ok ? await r.json() : null;
  } catch {
    return null;
  }
}
