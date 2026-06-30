import React from "react";

export default function LegalPage({ title, updated, children }) {
  return (
    <div className="container" style={{ padding: "40px 24px 72px", maxWidth: 680 }}>
      <h1 style={{ fontSize: "clamp(26px, 3.5vw, 34px)", fontWeight: 600, marginBottom: 8 }}>{title}</h1>
      {updated && <p style={{ fontSize: 13, color: "var(--ink-faint)", marginBottom: 32 }}>{updated}</p>}
      <div className="legal-content">{children}</div>
      <style>{`
        .legal-content h3 {
          font-size: 17px;
          font-weight: 700;
          margin-top: 28px;
          margin-bottom: 10px;
          color: var(--ink);
        }
        .legal-content p {
          font-size: 14.5px;
          line-height: 1.75;
          color: var(--ink-soft);
          margin-bottom: 4px;
        }
      `}</style>
    </div>
  );
}
