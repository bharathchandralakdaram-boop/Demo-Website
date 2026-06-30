import React, { useState, useEffect } from "react";
import { FiZap } from "react-icons/fi";
import { useRouter } from "../context/RouterContext.jsx";

function getMidnight() {
  const d = new Date();
  d.setHours(24, 0, 0, 0);
  return d;
}

export default function FlashSaleBanner() {
  const { navigate } = useRouter();
  const [target] = useState(getMidnight());
  const [remaining, setRemaining] = useState(target - new Date());

  useEffect(() => {
    const id = setInterval(() => setRemaining(target - new Date()), 1000);
    return () => clearInterval(id);
  }, [target]);

  const total = Math.max(0, Math.floor(remaining / 1000));
  const h = String(Math.floor(total / 3600)).padStart(2, "0");
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
  const s = String(total % 60).padStart(2, "0");

  return (
    <section className="container" style={{ padding: "8px 24px 40px" }}>
      <div
        onClick={() => navigate("/products")}
        style={{
          background: "linear-gradient(120deg, var(--primary-dark), var(--primary) 70%, var(--accent))",
          borderRadius: "var(--r-xl)",
          padding: "28px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 20,
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            right: -40,
            top: -40,
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 14, position: "relative", zIndex: 1 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            <FiZap size={22} />
          </div>
          <div>
            <div style={{ color: "white", fontSize: 19, fontWeight: 700 }}>Flash Sale — value packs up to 33% off</div>
            <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 13.5 }}>On 5L Swish &amp; Lush packs, today only</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, position: "relative", zIndex: 1 }}>
          {[["Hrs", h], ["Min", m], ["Sec", s]].map(([label, val]) => (
            <div
              key={label}
              className="glass"
              style={{
                width: 60,
                padding: "8px 0",
                borderRadius: "var(--r-md)",
                textAlign: "center",
                background: "rgba(255,255,255,0.18)",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              <div style={{ color: "white", fontSize: 20, fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>{val}</div>
              <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 10 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
