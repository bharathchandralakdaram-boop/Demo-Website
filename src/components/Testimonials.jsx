import React from "react";
import { SectionHeading } from "./CategoryGrid.jsx";
import StarRating from "./StarRating.jsx";

// Placeholder testimonials — swap for real customer reviews when available.
const TESTIMONIALS = [
  {
    name: "Lakshmi P.",
    location: "Prakasam, AP",
    text: "The lemon-lavender fragrance on the Swish floor cleaner is lovely, and our tile floors look genuinely shinier after mopping.",
    rating: 5,
  },
  {
    name: "Ramesh K.",
    location: "Hyderabad",
    text: "Switched our whole house to Anya's RRR — the Lush detergent is gentle and the 5L pack lasts our family weeks.",
    rating: 5,
  },
  {
    name: "Sandhya R.",
    location: "Ongole",
    text: "Cleaneo toilet cleaner genuinely removes the limescale our old cleaner never could. Repeat customer now.",
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <section className="container" style={{ padding: "48px 24px" }}>
      <SectionHeading eyebrow="Reviews" title="What our customers say" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 20,
          marginTop: 28,
        }}
        className="testimonial-grid"
      >
        {TESTIMONIALS.map((t, i) => (
          <div
            key={i}
            style={{
              background: "white",
              border: "1px solid var(--line-soft)",
              borderRadius: "var(--r-lg)",
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <StarRating rating={t.rating} showCount={false} size={15} />
            <p style={{ fontSize: 14.5, color: "var(--ink-soft)", lineHeight: 1.65 }}>"{t.text}"</p>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: "auto" }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "var(--primary-light)",
                  color: "var(--primary-dark)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                {t.name[0]}
              </div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 700 }}>{t.name}</div>
                <div style={{ fontSize: 12, color: "var(--ink-faint)" }}>{t.location}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 900px) { .testimonial-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) !important; } }
        @media (max-width: 600px) { .testimonial-grid { grid-template-columns: minmax(0, 1fr) !important; } }
      `}</style>
    </section>
  );
}
