import React, { useState } from "react";
import { FiHeart } from "react-icons/fi";
import ProductCard from "../components/ProductCard.jsx";
import QuickView from "../components/QuickView.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useRouter } from "../context/RouterContext.jsx";
import { getProductById } from "../data/products.js";

export default function WishlistPage() {
  const { wishlist } = useCart();
  const { navigate } = useRouter();
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const items = wishlist.map((id) => getProductById(id)).filter(Boolean);

  return (
    <div className="container" style={{ padding: "32px 24px 64px" }}>
      <h1 style={{ fontSize: "clamp(24px, 3vw, 30px)", fontWeight: 600, marginBottom: 8 }}>Your wishlist</h1>
      <p style={{ fontSize: 14, color: "var(--ink-faint)", marginBottom: 28 }}>{items.length} saved products</p>

      {items.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: "50%",
              background: "var(--primary-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}
          >
            <FiHeart size={32} color="var(--primary-dark)" />
          </div>
          <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Nothing saved yet</p>
          <button
            onClick={() => navigate("/products")}
            style={{ background: "var(--primary)", color: "white", border: "none", borderRadius: "var(--r-pill)", padding: "12px 26px", fontWeight: 700, cursor: "pointer" }}
          >
            Browse products
          </button>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 20 }} className="wishlist-grid">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
          ))}
        </div>
      )}

      {quickViewProduct && <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />}

      <style>{`
        @media (max-width: 980px) { .wishlist-grid { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; } }
        @media (max-width: 720px) { .wishlist-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; } }
      `}</style>
    </div>
  );
}
