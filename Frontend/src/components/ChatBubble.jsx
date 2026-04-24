// src/components/ChatBubble.jsx
import React, { useEffect, useRef, useState } from "react";

const SUGGESTIONS = [
  "Get a quick cost estimate",
  "Book a free design call",
  "See kitchen ideas",
  "What’s included in packages?",
];

export default function ChatBubble() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I’m Aura — how can I help you today?" },
  ]);
  const [draft, setDraft] = useState("");
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open]);

  function send(text) {
    const value = (text ?? draft).trim();
    if (!value) return;

    setMessages((m) => [...m, { from: "user", text: value }]);
    setDraft("");

    // demo reply
    setTimeout(() => {
      let reply = "Got it! A designer will contact you shortly.";
      if (/estimate|cost|price/i.test(value))
        reply =
          "Use the 'Get Started' button on the hero to get a quick estimate. Want me to open it?";
      if (/call|book/i.test(value))
        reply =
          "Great! Share your phone/email and preferred time — we’ll schedule a callback.";

      setMessages((m) => [...m, { from: "bot", text: reply }]);
    }, 550);
  }

  return (
    <>
      {/* Embedded CSS for ChatBubble */}
      <style>{`
        /* Floating chat bubble */
        .cb-fab{
          position: fixed; right: 20px; bottom: 22px; z-index: 60;
          width: 56px; height: 56px; border-radius: 999px; border: none; cursor: pointer;
          background: linear-gradient(135deg,#ef4444,#fb923c); color:#fff; font-size:22px;
          box-shadow: 0 10px 30px rgba(2,6,23,.25);
        }

        /* Panel */
        .cb-panel{
          position: fixed; right: 20px; bottom: 90px; z-index: 60; width: min(360px, 92vw);
          background:#fff; border:1px solid #e5e7eb; border-radius: 16px;
          box-shadow: 0 30px 60px rgba(2,6,23,.22); overflow:hidden; transform: translateY(12px);
          opacity:0; pointer-events:none; transition: all .18s ease;
        }
        .cb-panel.on{ transform: translateY(0); opacity:1; pointer-events:auto; }

        .cb-head{
          display:flex; align-items:center; justify-content:space-between;
          padding:10px 12px; background:#f8fafc; border-bottom:1px solid #e5e7eb;
        }
        .cb-title{ font-weight:700; }
        .cb-close{ background:none; border:none; font-size:16px; cursor:pointer; }

        .cb-body{
          max-height: 320px; overflow:auto; padding:12px; background:#fff;
        }
        .msg{
          max-width:80%; padding:10px 12px; border-radius:14px; margin:6px 0;
          line-height:1.25; box-shadow:0 3px 12px rgba(2,6,23,.06);
        }
        .msg.bot{ background:#f1f5f9; color:#0f172a; }
        .msg.user{ background:#111827; color:#fff; margin-left:auto; }

        .cb-suggestions{
          display:flex; flex-wrap:wrap; gap:8px; margin-top:10px;
        }
        .cb-suggestions button{
          border:1px solid #e5e7eb; background:#fff; border-radius:999px;
          padding:6px 10px; cursor:pointer;
        }
        .cb-suggestions button:hover{ background:#f8fafc; }

        .cb-input{
          display:flex; gap:8px; padding:10px;
          border-top:1px solid #e5e7eb; background:#fff;
        }
        .cb-input input{
          flex:1; padding:10px 12px; border-radius:999px;
          border:1px solid #e5e7eb; outline:none;
        }
        .cb-input button{
          padding:10px 14px; border-radius:999px; border:none; cursor:pointer; color:#fff;
          background: linear-gradient(135deg,#ef4444,#fb923c);
        }
      `}</style>

      {/* Trigger button */}
      <button
        className="cb-fab"
        onClick={() => setOpen((o) => !o)}
        aria-label="Chat"
      >
        {open ? "✖" : "💬"}
      </button>

      {/* Panel */}
      <div className={`cb-panel ${open ? "on" : ""}`}>
        <div className="cb-head">
          <div className="cb-title">
            Chat with <strong>Aura</strong>
          </div>
          <button className="cb-close" onClick={() => setOpen(false)}>
            ✖
          </button>
        </div>

        <div className="cb-body" ref={listRef}>
          {messages.map((m, i) => (
            <div key={i} className={`msg ${m.from}`}>
              {m.text}
            </div>
          ))}

          {!messages.find((m) => m.from === "user") && (
            <div className="cb-suggestions">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => send(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="cb-input">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Type your message…"
          />
          <button onClick={() => send()}>Send</button>
        </div>
      </div>
    </>
  );
}
