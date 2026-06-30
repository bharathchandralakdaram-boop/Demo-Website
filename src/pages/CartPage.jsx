import React, { useState, useMemo } from "react";
import { FiTrash2, FiTag, FiArrowRight, FiShoppingBag } from "react-icons/fi";
import { formatINR } from "../utils/format.js";
import { useCart } from "../context/CartContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { useRouter } from "../context/RouterContext.jsx";
import { getProductById } from "../data/products.js";

// Placeholder coupon codes — wire up to a real promo engine later.
const COUPONS = {
  CLEAN10: { label: "10% off your order", type: "percent", value: 10 },
  WELCOME50: { label: "₹50 off orders above ₹399", type: "flat", value: 50, minOrder: 399 },
};

export default function CartPage() {
  const { items, setQty, removeFromCart, coupon, applyCoupon } = useCart();
  const { navigate } = useRouter();
  const showToast = useToast();
  const [couponInput, setCouponInput] = useState("");

  const lineItems = useMemo(() => {
    return Object.values(items)
      .map((item) => {
        const product = getProductById(item.productId);
        if (!product) return null;
        const variant = product.variants.find((v) => v.id === item.variantId);
        if (!variant) return null;
        return { ...item, product, variant };
      })
      .filter(Boolean);
  }, [items]);

  const subtotal = lineItems.reduce((sum, li) => sum + li.variant.price * li.qty, 0);
  const mrpTotal = lineItems.reduce((sum, li) => sum + li.variant.mrp * li.qty, 0);
  const savings = mrpTotal - subtotal;

  let discount = 0;
  if (coupon) {
    if (coupon.type === "percent") discount = Math.round(subtotal * (coupon.value / 100));
    if (coupon.type === "flat" && subtotal >= (coupon.minOrder || 0)) discount = coupon.value;
  }
  const shipping = subtotal > 499 || subtotal === 0 ? 0 : 49;
  const tax = Math.round((subtotal - discount) * 0.05);
  const total = Math.max(0, subtotal - discount + shipping + tax);

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (COUPONS[code]) {
      applyCoupon({ code, ...COUPONS[code] });
      showToast(`Coupon applied: ${COUPONS[code].label}`);
    } else {
      showToast("Invalid coupon code", { type: "error" });
    }
  };

  if (lineItems.length === 0) {
    return (
      <div className="container" style={{ padding: "80px 24px", textAlign: "center" }}>
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            background: "var(--primary-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
          }}
        >
          <FiShoppingBag size={36} color="var(--primary-dark)" />
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>Your cart is empty</h2>
        <p style={{ fontSize: 14, color: "var(--ink-faint)", marginBottom: 24 }}>Add a few cleaners to get started.</p>
        <button
          onClick={() => navigate("/products")}
          style={{ background: "var(--primary)", color: "white", border: "none", borderRadius: "var(--r-pill)", padding: "13px 28px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}
        >
          Browse products
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: "32px 24px 64px" }}>
      <h1 style={{ fontSize: "clamp(24px, 3vw, 30px)", fontWeight: 600, marginBottom: 28 }}>Your cart</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 32 }} className="cart-grid">
        <div className="glass" style={{ borderRadius: "var(--r-xl)", padding: 8 }}>
          {lineItems.map((li, i) => (
            <div
              key={`${li.productId}-${li.variantId}`}
              style={{
                display: "flex",
                gap: 16,
                padding: 16,
                borderBottom: i < lineItems.length - 1 ? "1px solid var(--line-soft)" : "none",
                alignItems: "center",
              }}
              className="cart-line"
            >
              <button onClick={() => navigate(`/product/${li.product.id}`)} style={{ background: "white", borderRadius: "var(--r-md)", padding: 10, border: "1px solid var(--line-soft)", flexShrink: 0, cursor: "pointer" }}>
                <img src={li.variant.image} alt={li.product.name} style={{ width: 72, height: 72, objectFit: "contain" }} />
              </button>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 4 }}>{li.product.name}</div>
                <div style={{ fontSize: 12.5, color: "var(--ink-faint)", marginBottom: 8 }}>{li.variant.label}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", border: "1px solid var(--line)", borderRadius: "var(--r-pill)" }}>
                    <QtyBtn onClick={() => setQty(li.productId, li.variantId, li.qty - 1)}>−</QtyBtn>
                    <span style={{ width: 32, textAlign: "center", fontWeight: 700, fontSize: 13 }}>{li.qty}</span>
                    <QtyBtn onClick={() => setQty(li.productId, li.variantId, li.qty + 1)}>+</QtyBtn>
                  </div>
                  <button
                    onClick={() => removeFromCart(li.productId, li.variantId)}
                    aria-label="Remove item"
                    style={{ background: "none", border: "none", color: "var(--ink-faint)", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 12.5 }}
                  >
                    <FiTrash2 size={14} /> Remove
                  </button>
                </div>
              </div>

              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontWeight: 800, fontSize: 15 }}>{formatINR(li.variant.price * li.qty)}</div>
                {li.variant.mrp > li.variant.price && (
                  <div style={{ fontSize: 12, color: "var(--ink-faint)", textDecoration: "line-through" }}>
                    {formatINR(li.variant.mrp * li.qty)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="glass-strong" style={{ borderRadius: "var(--r-xl)", padding: 24, position: "sticky", top: 90 }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 18 }}>Order summary</h3>

            <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
              <div className="glass" style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, borderRadius: "var(--r-pill)", padding: "10px 14px" }}>
                <FiTag size={14} color="var(--ink-faint)" />
                <input
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Coupon code"
                  style={{ border: "none", background: "transparent", outline: "none", fontSize: 13, width: "100%" }}
                />
              </div>
              <button
                onClick={handleApplyCoupon}
                style={{ background: "var(--primary-dark)", color: "white", border: "none", borderRadius: "var(--r-pill)", padding: "0 18px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}
              >
                Apply
              </button>
            </div>
            {coupon && (
              <div style={{ fontSize: 12.5, color: "var(--primary-dark)", fontWeight: 600, marginBottom: 14 }}>
                ✓ {coupon.code} applied — {coupon.label}
              </div>
            )}
            <p style={{ fontSize: 11.5, color: "var(--ink-faint)", marginTop: -10, marginBottom: 14 }}>Try CLEAN10 or WELCOME50</p>

            <SummaryRow label="Subtotal" value={formatINR(subtotal)} />
            {savings > 0 && <SummaryRow label="You save" value={`− ${formatINR(savings)}`} highlight />}
            {discount > 0 && <SummaryRow label="Coupon discount" value={`− ${formatINR(discount)}`} highlight />}
            <SummaryRow label="Shipping" value={shipping === 0 ? "Free" : formatINR(shipping)} />
            <SummaryRow label="Estimated tax" value={formatINR(tax)} />

            <div style={{ borderTop: "1px solid var(--line)", marginTop: 14, paddingTop: 14, display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 700, fontSize: 16 }}>Total</span>
              <span style={{ fontWeight: 800, fontSize: 20 }}>{formatINR(total)}</span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              style={{
                width: "100%",
                marginTop: 20,
                background: "var(--primary)",
                color: "white",
                border: "none",
                borderRadius: "var(--r-pill)",
                padding: "15px 0",
                fontWeight: 700,
                fontSize: 15,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                cursor: "pointer",
                boxShadow: "var(--shadow-green)",
              }}
            >
              Proceed to checkout <FiArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) { .cart-grid { grid-template-columns: minmax(0, 1fr) !important; } }
        @media (max-width: 520px) {
          .cart-line { flex-wrap: wrap; }
        }
      `}</style>
    </div>
  );
}

function SummaryRow({ label, value, highlight }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, color: highlight ? "var(--primary-dark)" : "var(--ink-soft)", marginBottom: 10, fontWeight: highlight ? 700 : 500 }}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function QtyBtn({ children, onClick }) {
  return (
    <button onClick={onClick} style={{ width: 30, height: 30, border: "none", background: "none", fontSize: 16, cursor: "pointer", color: "var(--ink-soft)" }}>
      {children}
    </button>
  );
}
