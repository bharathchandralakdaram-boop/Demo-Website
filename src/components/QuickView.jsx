import React, { useState, useEffect } from "react";
import { FiX, FiShoppingBag, FiArrowRight } from "react-icons/fi";
import StarRating from "./StarRating.jsx";
import { formatINR, discountPercent } from "../utils/format.js";
import { useCart } from "../context/CartContext.jsx";
import { useRouter } from "../context/RouterContext.jsx";
import { useToast } from "../context/ToastContext.jsx";

export default function QuickView({ product, onClose }) {
  const [variantIdx, setVariantIdx] = useState(0);
  const { addToCart } = useCart();
  const { navigate } = useRouter();
  const showToast = useToast();

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!product) return null;
  const variant = product.variants[variantIdx];
  const discount = discountPercent(variant.mrp, variant.price);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15, 23, 42, 0.5)",
        backdropFilter: "blur(4px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        animation: "fadeUp 0.2s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-strong quickview-grid"
        style={{
          maxWidth: 800,
          width: "100%",
          maxHeight: "88vh",
          overflowY: "auto",
          borderRadius: "var(--r-xl)",
          boxShadow: "var(--shadow-lg)",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close quick view"
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            zIndex: 2,
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "none",
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <FiX size={18} />
        </button>

        <div
          style={{
            background: "linear-gradient(135deg, #F1F5F9, #E2E8F0)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 32,
            minHeight: 280,
          }}
        >
          <img src={variant.image} alt={product.name} style={{ maxHeight: 360, objectFit: "contain" }} />
        </div>

        <div style={{ padding: "32px 28px", display: "flex", flexDirection: "column", gap: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            {product.brand}
          </span>
          <h2 style={{ fontSize: 22, fontWeight: 700 }}>{product.name}</h2>
          <StarRating rating={product.rating} count={product.reviewCount} />
          <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.6 }}>{product.tagline}</p>

          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span style={{ fontSize: 26, fontWeight: 800 }}>{formatINR(variant.price)}</span>
            {variant.mrp > variant.price && (
              <>
                <span style={{ fontSize: 15, color: "var(--ink-faint)", textDecoration: "line-through" }}>
                  {formatINR(variant.mrp)}
                </span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--primary-dark)" }}>{discount}% off</span>
              </>
            )}
          </div>

          {product.variants.length > 1 && (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
              {product.variants.map((v, i) => (
                <button
                  key={v.id}
                  onClick={() => setVariantIdx(i)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "var(--r-pill)",
                    border: i === variantIdx ? "1.5px solid var(--primary)" : "1.5px solid var(--line)",
                    background: i === variantIdx ? "var(--primary-light)" : "white",
                    color: i === variantIdx ? "var(--primary-dark)" : "var(--ink-soft)",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {v.label}
                </button>
              ))}
            </div>
          )}

          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button
              onClick={() => {
                addToCart(product.id, variant.id, 1);
                showToast(`Added ${product.name} to cart`);
              }}
              style={{
                flex: 1,
                border: "1.5px solid var(--primary)",
                background: "white",
                color: "var(--primary-dark)",
                borderRadius: "var(--r-pill)",
                padding: "12px 16px",
                fontSize: 14,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                cursor: "pointer",
              }}
            >
              <FiShoppingBag size={16} /> Add to cart
            </button>
            <button
              onClick={() => {
                addToCart(product.id, variant.id, 1);
                navigate("/checkout");
                onClose();
              }}
              style={{
                flex: 1,
                border: "none",
                background: "var(--primary)",
                color: "white",
                borderRadius: "var(--r-pill)",
                padding: "12px 16px",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Buy now
            </button>
          </div>

          <button
            onClick={() => {
              navigate(`/product/${product.id}`);
              onClose();
            }}
            style={{
              marginTop: 6,
              background: "none",
              border: "none",
              color: "var(--ink-soft)",
              fontSize: 13,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 4,
              cursor: "pointer",
              padding: 0,
            }}
          >
            View full details <FiArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
