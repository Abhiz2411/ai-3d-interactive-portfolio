import { useCallback, useEffect, useRef, useState } from "react";
import { ChatError, fetchStatus, streamChat } from "./api.js";
import Markdown from "./Markdown.jsx";

const SITE = "https://abhijitzende.com";
const STORAGE_KEY = "azchat:v1";
const MAX_CHARS = 500;

const SUGGESTIONS = [
  "What does Abhijit do at Pure Billion?",
  "Tell me about his RAG projects",
  "What is his tech stack?",
  "What has he built with real-time AI?",
];

const store = {
  load() {
    try {
      return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  },
  save(v) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(v.slice(-30)));
    } catch {
      /* private mode etc. */
    }
  },
};

let uid = 0;
const nextId = () => `m${Date.now().toString(36)}${uid++}`;

const SOURCE_LABEL = { resume: "Resume", linkedin: "LinkedIn", github: "GitHub", portfolio: "Portfolio" };

function Sources({ message }) {
  // Show only sources the answer actually cited, de-duplicated by document.
  const cited = new Set([...message.content.matchAll(/\[(\d{1,2})\]/g)].map((m) => Number(m[1])));
  const seen = new Set();
  const list = (message.sources || []).filter((s) => {
    if (!cited.has(s.n) || seen.has(s.title)) return false;
    seen.add(s.title);
    return true;
  });
  if (!list.length || message.streaming) return null;
  return (
    <div className="sources" aria-label="Sources">
      {list.map((s) => {
        const short = s.title
          .split(" > ")
          .slice(-1)[0]
          .replace(/\s*\(part \d+\)$/, "")
          .replace(/^(GitHub repo|Portfolio project|Achievement): /, "");
        const body = (
          <>
            <span className="sources__kind">{SOURCE_LABEL[s.source] || s.source}</span>
            <span className="sources__title">{short}</span>
          </>
        );
        return s.url ? (
          <a key={s.n} className="chip" href={s.url} target="_blank" rel="noopener noreferrer" title={s.title}>
            {body}
          </a>
        ) : (
          <span key={s.n} className="chip" title={s.title}>
            {body}
          </span>
        );
      })}
    </div>
  );
}

function Message({ m }) {
  if (m.role === "user") return <div className="msg msg--user"><div className="bubble">{m.content}</div></div>;
  return (
    <div className="msg msg--bot">
      <div className="avatar" aria-hidden="true">AZ</div>
      <div className="reply">
        {m.content ? (
          <div className="prose">
            <Markdown text={m.content} sources={m.sources} />
          </div>
        ) : m.streaming ? (
          <div className="typing" role="status" aria-label="Assistant is thinking"><i /><i /><i /></div>
        ) : null}
        {m.error && <p className="reply__error">{m.error}</p>}
        <Sources message={m} />
      </div>
    </div>
  );
}

export default function App() {
  const [messages, setMessages] = useState(store.load);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [remaining, setRemaining] = useState(null);
  const [cooldown, setCooldown] = useState(0);
  const abortRef = useRef(null);
  const scrollRef = useRef(null);
  const stickRef = useRef(true);
  const inputRef = useRef(null);

  useEffect(() => store.save(messages.filter((m) => !m.streaming)), [messages]);

  useEffect(() => {
    fetchStatus().then((s) => s && setRemaining(s.remaining));
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  // Keep the latest text in view unless the reader scrolled up.
  useEffect(() => {
    const el = scrollRef.current;
    if (el && stickRef.current) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const onScroll = () => {
    const el = scrollRef.current;
    stickRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
  };

  const resizeInput = () => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 140) + "px";
  };
  useEffect(resizeInput, [input]);

  const send = useCallback(
    async (text) => {
      const content = text.trim().slice(0, MAX_CHARS);
      if (!content || busy || cooldown > 0) return;
      setNotice("");
      setInput("");
      stickRef.current = true;

      const userMsg = { id: nextId(), role: "user", content };
      const botId = nextId();
      const history = [...messages.filter((m) => !m.error || m.content), userMsg];
      setMessages([...messages, userMsg, { id: botId, role: "assistant", content: "", streaming: true, sources: [] }]);
      setBusy(true);

      const ac = new AbortController();
      abortRef.current = ac;
      const patch = (fn) => setMessages((all) => all.map((m) => (m.id === botId ? { ...m, ...fn(m) } : m)));

      try {
        const payload = history.map(({ role, content: c }) => ({ role, content: c }));
        for await (const evt of streamChat(payload, ac.signal)) {
          if (evt.t === "meta") patch(() => ({ sources: evt.sources || [] }));
          else if (evt.t === "token") patch((m) => ({ content: m.content + evt.v }));
          else if (evt.t === "done") {
            if (typeof evt.remaining === "number") setRemaining(evt.remaining);
          } else if (evt.t === "error") patch(() => ({ error: evt.message }));
        }
      } catch (e) {
        if (e.name !== "AbortError") {
          patch((m) => (m.content ? {} : { error: e.message }));
          if (e instanceof ChatError) {
            if (typeof e.remaining === "number") setRemaining(e.remaining);
            if (e.code === "rate_minute" && e.retryAfter) setCooldown(Math.min(e.retryAfter, 90));
            if (e.code === "rate_daily" || e.code === "rate_global") setRemaining(0);
          }
        }
      } finally {
        patch(() => ({ streaming: false }));
        setBusy(false);
        abortRef.current = null;
        inputRef.current?.focus();
      }
    },
    [messages, busy, cooldown]
  );

  const stop = () => abortRef.current?.abort();
  const clear = () => {
    abortRef.current?.abort();
    setMessages([]);
    setNotice("");
  };

  const limited = remaining === 0;
  const canSend = input.trim().length > 0 && !busy && cooldown === 0 && !limited;
  const empty = messages.length === 0;
  const nearLimit = input.length > MAX_CHARS - 80;

  return (
    <div className="app">
      <header className="top">
        <div className="top__id">
          <div className="avatar avatar--lg" aria-hidden="true">AZ</div>
          <div>
            <h1>Abhijit's AI assistant</h1>
            <p>Grounded in his resume, LinkedIn and GitHub</p>
          </div>
        </div>
        <div className="top__actions">
          {!empty && (
            <button className="ghost" onClick={clear} type="button">New chat</button>
          )}
          <a className="ghost" href={SITE}>abhijitzende.com <span aria-hidden="true">↗</span></a>
        </div>
      </header>

      <main className="scroll" ref={scrollRef} onScroll={onScroll}>
        <div className="col">
          {empty ? (
            <section className="hero">
              <h2>Ask me about <span>Abhijit</span></h2>
              <p>His projects, experience, skills and writing. I answer only from his real work and cite where it came from.</p>
              <div className="suggest">
                {SUGGESTIONS.map((s) => (
                  <button key={s} type="button" onClick={() => send(s)} disabled={limited}>
                    {s}
                  </button>
                ))}
              </div>
            </section>
          ) : (
            <div className="thread" aria-live="polite">
              {messages.map((m) => (
                <Message key={m.id} m={m} />
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="dock">
        <div className="col">
          {(notice || limited || cooldown > 0) && (
            <div className="notice" role="status">
              {limited
                ? "You've used today's messages. Come back tomorrow, or reach Abhijit through the contact section on his site."
                : cooldown > 0
                ? `You're sending messages quickly. You can ask again in ${cooldown}s.`
                : notice}
            </div>
          )}
          <form
            className="composer"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <textarea
              ref={inputRef}
              value={input}
              rows={1}
              maxLength={MAX_CHARS}
              placeholder={limited ? "Daily limit reached" : "Ask about Abhijit's work…"}
              aria-label="Your question"
              disabled={limited}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                  e.preventDefault();
                  send(input);
                }
              }}
            />
            {busy ? (
              <button type="button" className="send send--stop" onClick={stop} aria-label="Stop generating">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" /></svg>
              </button>
            ) : (
              <button type="submit" className="send" disabled={!canSend} aria-label="Send message">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            )}
          </form>
          <div className="meta">
            <span>AI can make mistakes. Confirm key details with Abhijit.</span>
            <span className={nearLimit ? "meta__warn" : ""}>
              {nearLimit ? `${input.length}/${MAX_CHARS}` : remaining !== null ? `${remaining} left today` : ""}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
