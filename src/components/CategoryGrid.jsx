import React from "react";
import { FiDroplet } from "react-icons/fi";
import { categories, getProductsByCategory } from "../data/products.js";
import { useRouter } from "../context/RouterContext.jsx";

const ICONS = {
  toilet: "🚽",
  floor: "🧼",
  laundry: "👕",
  dishwash: "🍽️",
  glass: "🪟",
  multi: "🧴",
};

export default function CategoryGrid() {
  const { navigate } = useRouter();

  return (
    <section className="container" style={{ padding: "56px 24px 24px" }}>
      <SectionHeading eyebrow="Browse" title="Shop by category" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
          gap: 16,
          marginTop: 28,
        }}
        className="category-grid"
      >
        {categories.map((c) => {
          const count = getProductsByCategory(c.id).length;
          return (
            <button
              key={c.id}
              onClick={() => navigate(`/category/${c.id}`)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                padding: "24px 12px",
                borderRadius: "var(--r-lg)",
                border: "1px solid var(--line-soft)",
                background: "white",
                cursor: "pointer",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
              }}
              className="category-tile"
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: `${c.color}22`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                }}
              >
                {ICONS[c.icon]}
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", textAlign: "center" }}>{c.name}</span>
              <span style={{ fontSize: 11.5, color: "var(--ink-faint)" }}>{count} product{count !== 1 ? "s" : ""}</span>
            </button>
          );
        })}
      </div>

      <style>{`
        .category-tile:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
        @media (max-width: 920px) { .category-grid { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; } }
        @media (max-width: 520px) { .category-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; } }
      `}</style>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, action }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
      <div>
        {eyebrow && (
          <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            {eyebrow}
          </span>
        )}
        <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 600, color: "var(--ink)", marginTop: 4 }}>{title}</h2>
      </div>
      {action}
    </div>
  );
}
