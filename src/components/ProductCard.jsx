import React, { useState } from "react";
import { FiHeart, FiEye, FiShoppingBag } from "react-icons/fi";
import StarRating from "./StarRating.jsx";
import { formatINR, discountPercent } from "../utils/format.js";
import { useCart } from "../context/CartContext.jsx";
import { useRouter } from "../context/RouterContext.jsx";
import { useToast } from "../context/ToastContext.jsx";

export default function ProductCard({ product, onQuickView }) {
  const { navigate } = useRouter();
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const showToast = useToast();
  const [hovered, setHovered] = useState(false);

  const variant = product.variants[0];
  const discount = discountPercent(variant.mrp, variant.price);
  const isWishlisted = wishlist.includes(product.id);
  const secondImage = product.images[1] || product.images[0];

  const goToProduct = () => navigate(`/product/${product.id}`);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product.id, variant.id, 1);
    showToast(`Added ${product.name} to cart`);
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    addToCart(product.id, variant.id, 1);
    navigate("/checkout");
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
    showToast(isWishlisted ? "Removed from wishlist" : "Saved to wishlist");
  };

  return (
    <article
      className="product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={goToProduct}
      style={{
        background: "var(--white)",
        borderRadius: "var(--r-lg)",
        border: "1px solid var(--line-soft)",
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "var(--shadow-lg)" : "var(--shadow-sm)",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: "1 / 1",
          background: "linear-gradient(135deg, #F8FAFC, #EEF2F7)",
          overflow: "hidden",
        }}
      >
        {discount > 0 && (
          <span
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              zIndex: 2,
              background: "var(--primary-dark)",
              color: "white",
              fontSize: 12,
              fontWeight: 700,
              padding: "4px 10px",
              borderRadius: "var(--r-pill)",
            }}
          >
            {discount}% OFF
          </span>
        )}

        <button
          onClick={handleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="glass"
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 2,
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: isWishlisted ? "#EF4444" : "var(--ink-soft)",
          }}
        >
          <FiHeart size={16} fill={isWishlisted ? "#EF4444" : "none"} />
        </button>

        <img
          src={variant.image}
          alt={product.name}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            padding: "20px",
            transition: "opacity 0.4s ease, transform 0.4s ease",
            opacity: hovered && secondImage !== variant.image ? 0 : 1,
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />
        {secondImage !== variant.image && (
          <img
            src={secondImage}
            alt=""
            loading="lazy"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              padding: "20px",
              transition: "opacity 0.4s ease, transform 0.4s ease",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "scale(1.06)" : "scale(1)",
            }}
          />
        )}

        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            right: 10,
            display: "flex",
            gap: 8,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.25s ease, transform 0.25s ease",
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView?.(product);
            }}
            className="glass-strong"
            style={{
              flex: 1,
              border: "none",
              borderRadius: "var(--r-pill)",
              padding: "9px 0",
              fontSize: 13,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              cursor: "pointer",
              color: "var(--ink)",
            }}
          >
            <FiEye size={14} /> Quick view
          </button>
        </div>
      </div>

      <div style={{ padding: "14px 16px 16px", display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
          {product.brand}
        </span>
        <h3 style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.35, color: "var(--ink)", fontFamily: "var(--font-body)" }}>
          {product.name}
        </h3>
        <StarRating rating={product.rating} count={product.reviewCount} size={13} />

        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 4 }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: "var(--ink)" }}>{formatINR(variant.price)}</span>
          {variant.mrp > variant.price && (
            <span style={{ fontSize: 13, color: "var(--ink-faint)", textDecoration: "line-through" }}>
              {formatINR(variant.mrp)}
            </span>
          )}
        </div>
        <span style={{ fontSize: 12, color: "var(--ink-faint)" }}>{variant.label}</span>

        <div style={{ display: "flex", gap: 8, marginTop: "auto", paddingTop: 10 }}>
          <button
            onClick={handleAddToCart}
            style={{
              flex: 1,
              border: `1.5px solid var(--primary)`,
              background: "white",
              color: "var(--primary-dark)",
              borderRadius: "var(--r-pill)",
              padding: "9px 8px",
              fontSize: 13,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              cursor: "pointer",
            }}
          >
            <FiShoppingBag size={14} /> Add
          </button>
          <button
            onClick={handleBuyNow}
            style={{
              flex: 1,
              border: "none",
              background: "var(--primary)",
              color: "white",
              borderRadius: "var(--r-pill)",
              padding: "9px 8px",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Buy now
          </button>
        </div>
      </div>
    </article>
  );
}
