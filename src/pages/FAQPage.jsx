import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const FAQS = [
  {
    q: "How long does delivery take?",
    a: "Delivery timelines depend on your pin code and will be shown at checkout before you place your order. (Placeholder — final delivery zones and timelines to be confirmed.)",
  },
  {
    q: "What is your return policy?",
    a: "Unopened products in their original packaging can typically be returned within a set window if there's a genuine quality issue. Full terms will be published on our Privacy & Terms pages once finalised.",
  },
  {
    q: "Are your products safe for daily use?",
    a: "Yes — our floor, dishwash and laundry formulas are designed for daily household use. Always follow the dilution and usage instructions printed on the pack, and keep products out of reach of children.",
  },
  {
    q: "Do you offer wholesale or bulk pricing?",
    a: "Yes, we work with retail and wholesale customers. Reach out via our Contact page or call us directly for bulk order pricing.",
  },
  {
    q: "Which floor cleaner fragrance should I pick?",
    a: "Swish comes in Lemon & Lavender (fresh, citrus-forward) and Neem & Tulasi (herbal, traditional). Both use the same 10X cleaning & germ-kill formula — it's purely a fragrance preference.",
  },
  {
    q: "Is Cleaneo safe for septic tanks?",
    a: "Yes — Cleaneo Disinfectant Toilet Cleaner is suitable for all toilet bowls and does not affect your septic tank, per the product label.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Cash on Delivery, UPI, and major credit/debit cards. (Live payment gateway integration is pending — current checkout is a demo flow.)",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="container" style={{ padding: "40px 24px 64px", maxWidth: 720 }}>
      <h1 style={{ fontSize: "clamp(26px, 3.5vw, 34px)", fontWeight: 600, marginBottom: 10 }}>Frequently asked questions</h1>
      <p style={{ fontSize: 15, color: "var(--ink-soft)", marginBottom: 36 }}>
        Can't find what you're looking for? Try the Anya AI Assistant in the corner, or visit our Contact page.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {FAQS.map((item, i) => {
          const open = openIndex === i;
          return (
            <div
              key={i}
              style={{
                border: "1px solid var(--line-soft)",
                borderRadius: "var(--r-lg)",
                background: "white",
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => setOpenIndex(open ? -1 : i)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "18px 20px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span style={{ fontWeight: 700, fontSize: 15, color: "var(--ink)" }}>{item.q}</span>
                <FiChevronDown
                  size={18}
                  color="var(--ink-faint)"
                  style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.25s ease", flexShrink: 0, marginLeft: 12 }}
                />
              </button>
              <div
                style={{
                  maxHeight: open ? 240 : 0,
                  overflow: "hidden",
                  transition: "max-height 0.3s ease",
                }}
              >
                <p style={{ padding: "0 20px 18px", fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.65 }}>{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
