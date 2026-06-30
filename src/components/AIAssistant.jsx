import React, { useState, useRef, useEffect } from "react";
import { FiMessageCircle, FiX, FiSend } from "react-icons/fi";
import { products } from "../data/products.js";
import { useRouter } from "../context/RouterContext.jsx";

const WELCOME = {
  role: "bot",
  text: "Hi, I'm Anya — your cleaning assistant 👋 Ask me which product is best for a job, today's offers, or delivery & returns info.",
};

const SUGGESTIONS = [
  "Which cleaner is best for bathrooms?",
  "Do you have eco-friendly products?",
  "What's today's offer?",
  "What's your return policy?",
];

function findProductMatches(text) {
  const t = text.toLowerCase();
  return products.filter(
    (p) =>
      t.includes(p.category) ||
      p.tags.some((tag) => t.includes(tag)) ||
      t.includes(p.name.toLowerCase().split(" ")[0].toLowerCase())
  );
}

function generateReply(userText) {
  const t = userText.toLowerCase();

  if (/bathroom|toilet/.test(t)) {
    const p = products.find((p) => p.id === "cleaneo-toilet-cleaner");
    return {
      text: "For bathrooms and toilets, I'd recommend Cleaneo Disinfectant Toilet Cleaner — it removes limescale, tough stains, and kills germs. For bathroom tiles and floors, try Swish Floor Cleaner instead, since Cleaneo is formulated specifically for toilet bowls.",
      product: p,
    };
  }
  if (/floor|mop|tile|kitchen floor/.test(t)) {
    const p = products.find((p) => p.id === "swish-lemon-lavender");
    return {
      text: "Swish Floor Cleaner is great for everyday floors — it's safe on ceramic, marble, granite and mosaic, with a 10X cleaning & germ-kill formula. It comes in Lemon & Lavender or Neem & Tulasi fragrances.",
      product: p,
    };
  }
  if (/dish|utensil|grease|plate/.test(t)) {
    const p = products.find((p) => p.id === "vibe-dishwash-lemon");
    return {
      text: "Vibe Dish Wash Liquid is tough on grease, removes food smell, and stays soft on hands. It comes in 250ml and 1L sizes.",
      product: p,
    };
  }
  if (/cloth|laundry|wash.*clothes|detergent/.test(t)) {
    const p = products.find((p) => p.id === "lush-matic-detergent");
    return {
      text: "Anya's Lush Matic Liquid Detergent works in bucket wash, top-load and front-load machines, and is gentle on colours and hands. The 5L pack gives about 125 washes.",
      product: p,
    };
  }
  if (/glass|mirror|window/.test(t)) {
    const p = products.find((p) => p.id === "wipe-glass-cleaner");
    return {
      text: "Wipe Glass Cleaner gives a streak-free shine on glass, mirrors and windows — just spray and wipe with a dry cloth.",
      product: p,
    };
  }
  if (/eco|natural|herbal|chemical.free/.test(t)) {
    const p = products.find((p) => p.id === "swish-neem-tulasi");
    return {
      text: "Our Swish Neem & Tulasi Floor Cleaner uses a herbal fragrance profile if you'd like something more traditional. We don't currently have a fully chemical-free line — happy to flag that as feedback for the team!",
      product: p,
    };
  }
  if (/offer|discount|deal|sale/.test(t)) {
    return {
      text: "Today's best value: the Swish Floor Cleaner 5L pack and Lush Matic Detergent 5L are both discounted on the value-pack pricing. Check the 'Today's Deals' section on the homepage for current offers.",
    };
  }
  if (/deliver|shipping/.test(t)) {
    return {
      text: "Delivery timelines and charges depend on your pin code and are shown at checkout before you pay — this section is a placeholder until exact delivery zones are finalised.",
    };
  }
  if (/return|refund|exchange/.test(t)) {
    return {
      text: "Our return policy (placeholder): unopened products can typically be returned within a set window if there's a quality issue. Please see the Privacy Policy / Terms page for the finalised policy once it's published.",
    };
  }
  if (/contact|support|help.*human|talk.*someone/.test(t)) {
    return {
      text: "You can reach our team at anyasrrr.srenterprises@gmail.com or call +91 94903 28925 / 98493 92978. Or use the Contact Us page for a form.",
    };
  }
  if (/products|what.*sell|catalog/.test(t)) {
    return {
      text: `We make ${products.length} products across toilet, floor, dishwash, laundry and glass cleaning — Cleaneo, Swish, Lush, Vibe, Wipe and our multipurpose RRR Soap Oil.`,
    };
  }

  const matches = findProductMatches(t);
  if (matches.length > 0) {
    return {
      text: `Here's something that might help: ${matches[0].name}.`,
      product: matches[0],
    };
  }

  return {
    text: "I might not have a perfect answer for that yet, but I can help you pick a cleaner, check today's offers, or point you to delivery and return info. What would you like to know?",
  };
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);
  const { navigate } = useRouter();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { role: "user", text: trimmed }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply = generateReply(trimmed);
      setMessages((m) => [...m, { role: "bot", ...reply }]);
      setTyping(false);
    }, 700 + Math.random() * 500);
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close Anya AI Assistant" : "Open Anya AI Assistant"}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 200,
          width: 60,
          height: 60,
          borderRadius: "50%",
          border: "none",
          background: "var(--primary)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "var(--shadow-green)",
          animation: open ? "none" : "pulseRing 2.4s infinite",
        }}
      >
        {open ? <FiX size={24} /> : <FiMessageCircle size={24} />}
      </button>

      {open && (
        <div
          className="glass-strong"
          style={{
            position: "fixed",
            bottom: 96,
            right: 24,
            zIndex: 200,
            width: "min(380px, calc(100vw - 32px))",
            height: "min(560px, calc(100vh - 160px))",
            borderRadius: "var(--r-xl)",
            boxShadow: "var(--shadow-lg)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            animation: "fadeUp 0.25s ease",
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
              color: "white",
              padding: "16px 18px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
              }}
            >
              🌿
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>Anya AI Assistant</div>
              <div style={{ fontSize: 11.5, opacity: 0.85, display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ADE80" }} /> Online
              </div>
            </div>
          </div>

          <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 12 }}>
            {messages.map((m, i) => (
              <ChatBubble key={i} message={m} onProductClick={(id) => { navigate(`/product/${id}`); setOpen(false); }} />
            ))}
            {typing && <TypingBubble />}

            {messages.length <= 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 6 }}>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    style={{
                      textAlign: "left",
                      padding: "10px 14px",
                      borderRadius: "var(--r-md)",
                      border: "1px solid var(--line)",
                      background: "white",
                      fontSize: 13,
                      color: "var(--ink-soft)",
                      cursor: "pointer",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            style={{ display: "flex", gap: 8, padding: 12, borderTop: "1px solid var(--line-soft)", background: "rgba(255,255,255,0.5)" }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a product, offer, delivery..."
              style={{
                flex: 1,
                border: "1px solid var(--line)",
                borderRadius: "var(--r-pill)",
                padding: "10px 16px",
                fontSize: 13.5,
                outline: "none",
              }}
            />
            <button
              type="submit"
              aria-label="Send message"
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "none",
                background: "var(--primary)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <FiSend size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

function ChatBubble({ message, onProductClick }) {
  const isBot = message.role === "bot";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: isBot ? "flex-start" : "flex-end", gap: 6 }}>
      <div
        style={{
          maxWidth: "85%",
          padding: "10px 14px",
          borderRadius: isBot ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
          background: isBot ? "white" : "var(--primary)",
          color: isBot ? "var(--ink)" : "white",
          fontSize: 13.5,
          lineHeight: 1.5,
          boxShadow: "var(--shadow-sm)",
        }}
      >
        {message.text}
      </div>
      {message.product && (
        <button
          onClick={() => onProductClick(message.product.id)}
          className="glass"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: 10,
            borderRadius: "var(--r-md)",
            border: "1px solid var(--line)",
            cursor: "pointer",
            maxWidth: "85%",
          }}
        >
          <img src={message.product.variants[0].image} alt="" style={{ width: 36, height: 36, objectFit: "contain" }} />
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 12.5, fontWeight: 700 }}>{message.product.name}</div>
            <div style={{ fontSize: 11.5, color: "var(--primary-dark)", fontWeight: 600 }}>View product →</div>
          </div>
        </button>
      )}
    </div>
  );
}

function TypingBubble() {
  return (
    <div style={{ display: "flex", gap: 4, padding: "10px 14px", background: "white", borderRadius: "4px 16px 16px 16px", width: "fit-content", boxShadow: "var(--shadow-sm)" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--ink-faint)",
            animation: "floatY 0.9s ease-in-out infinite",
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}
