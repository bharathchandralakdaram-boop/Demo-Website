import React from "react";
import { FiArrowRight } from "react-icons/fi";
import ProductCard from "./ProductCard.jsx";
import { SectionHeading } from "./CategoryGrid.jsx";
import { useRouter } from "../context/RouterContext.jsx";

export default function ProductRail({ eyebrow, title, products, onQuickView, viewAllPath }) {
  const { navigate } = useRouter();

  return (
    <section className="container" style={{ padding: "40px 24px" }}>
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        action={
          viewAllPath && (
            <button
              onClick={() => navigate(viewAllPath)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "none",
                border: "none",
                color: "var(--primary-dark)",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              View all <FiArrowRight size={15} />
            </button>
          )
        }
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: 20,
          marginTop: 28,
        }}
        className="product-grid-4"
      >
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onQuickView={onQuickView} />
        ))}
      </div>
      <style>{`
        @media (max-width: 980px) { .product-grid-4 { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; } }
        @media (max-width: 720px) { .product-grid-4 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 14px !important; } }
        @media (max-width: 420px) { .product-grid-4 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; } }
      `}</style>
    </section>
  );
}
