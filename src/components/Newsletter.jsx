import React, { useState } from "react";
import { FiMail, FiCheck } from "react-icons/fi";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  };

  return (
    <section className="container" style={{ padding: "16px 24px 64px" }}>
      <div
        style={{
          background: "var(--primary-light)",
          borderRadius: "var(--r-xl)",
          padding: "40px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <div style={{ maxWidth: 420 }}>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: "var(--primary-dark)" }}>Get offers in your inbox</h3>
          <p style={{ fontSize: 14, color: "var(--ink-soft)", marginTop: 6 }}>
            Subscribe for early access to value packs and seasonal cleaning offers. No spam, ever.
          </p>
        </div>

        {done ? (
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--primary-dark)", fontWeight: 700, fontSize: 14 }}>
            <FiCheck size={18} /> You're subscribed!
          </div>
        ) : (
          <form onSubmit={submit} style={{ display: "flex", gap: 10, flex: 1, minWidth: 280, maxWidth: 420 }}>
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "white",
                borderRadius: "var(--r-pill)",
                padding: "12px 18px",
              }}
            >
              <FiMail size={16} color="var(--ink-faint)" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                style={{ border: "none", outline: "none", fontSize: 14, width: "100%" }}
              />
            </div>
            <button
              type="submit"
              style={{
                background: "var(--primary-dark)",
                color: "white",
                border: "none",
                borderRadius: "var(--r-pill)",
                padding: "12px 22px",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
