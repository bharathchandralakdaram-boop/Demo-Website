import React, { useState, useMemo } from "react";
import { FiCheck, FiMapPin, FiCreditCard, FiTruck, FiChevronLeft } from "react-icons/fi";
import { formatINR } from "../utils/format.js";
import { useCart } from "../context/CartContext.jsx";
import { useRouter } from "../context/RouterContext.jsx";
import { getProductById } from "../data/products.js";

const STEPS = ["Address", "Payment", "Review"];

export default function CheckoutPage() {
  const { items, coupon, clearCart } = useCart();
  const { navigate } = useRouter();
  const [step, setStep] = useState(0);
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [address, setAddress] = useState({ name: "", phone: "", line1: "", city: "", state: "", pincode: "" });
  const [payment, setPayment] = useState("cod");
  const [orderSnapshot, setOrderSnapshot] = useState(null);

  const lineItems = useMemo(() => {
    return Object.values(items)
      .map((item) => {
        const product = getProductById(item.productId);
        const variant = product?.variants.find((v) => v.id === item.variantId);
        return product && variant ? { ...item, product, variant } : null;
      })
      .filter(Boolean);
  }, [items]);

  const subtotal = lineItems.reduce((sum, li) => sum + li.variant.price * li.qty, 0);
  let discount = 0;
  if (coupon) {
    if (coupon.type === "percent") discount = Math.round(subtotal * (coupon.value / 100));
    if (coupon.type === "flat" && subtotal >= (coupon.minOrder || 0)) discount = coupon.value;
  }
  const shipping = subtotal > 499 || subtotal === 0 ? 0 : 49;
  const tax = Math.round((subtotal - discount) * 0.05);
  const total = Math.max(0, subtotal - discount + shipping + tax);

  const addressValid = address.name && address.phone.length >= 10 && address.line1 && address.city && address.pincode.length === 6;

  const placeOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      setOrderSnapshot({ total, orderNumber: `AR${Math.floor(100000 + Math.random() * 899999)}` });
      setPlacing(false);
      setPlaced(true);
      clearCart();
    }, 1400);
  };

  if (lineItems.length === 0 && !placed) {
    return (
      <div className="container" style={{ padding: "80px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: 22, marginBottom: 12 }}>Your cart is empty</h2>
        <button onClick={() => navigate("/products")} style={{ color: "var(--primary-dark)", fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}>
          Browse products
        </button>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="container" style={{ padding: "80px 24px", textAlign: "center", maxWidth: 520 }}>
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: "50%",
            background: "var(--primary)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
            boxShadow: "var(--shadow-green)",
          }}
        >
          <FiCheck size={40} />
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 10 }}>Order placed!</h2>
        <p style={{ fontSize: 14.5, color: "var(--ink-soft)", marginBottom: 8 }}>
          Order #{orderSnapshot?.orderNumber} for {formatINR(orderSnapshot?.total ?? 0)} is confirmed.
        </p>
        <p style={{ fontSize: 13, color: "var(--ink-faint)", marginBottom: 28 }}>
          This is a demo checkout — no real payment has been processed. Order tracking and email confirmation will be added when the backend is connected.
        </p>
        <button
          onClick={() => navigate("/products")}
          style={{ background: "var(--primary)", color: "white", border: "none", borderRadius: "var(--r-pill)", padding: "13px 28px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}
        >
          Continue shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: "32px 24px 64px" }}>
      <button onClick={() => navigate("/cart")} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "var(--ink-faint)", fontSize: 13, cursor: "pointer", marginBottom: 16, padding: 0 }}>
        <FiChevronLeft size={14} /> Back to cart
      </button>
      <h1 style={{ fontSize: "clamp(24px, 3vw, 30px)", fontWeight: 600, marginBottom: 28 }}>Checkout</h1>

      {/* stepper */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 36, maxWidth: 480 }}>
        {STEPS.map((label, i) => (
          <React.Fragment key={label}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: i <= step ? "var(--primary)" : "var(--line)",
                  color: i <= step ? "white" : "var(--ink-faint)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 13,
                  flexShrink: 0,
                }}
              >
                {i < step ? <FiCheck size={15} /> : i + 1}
              </div>
              <span style={{ fontSize: 13.5, fontWeight: 700, color: i <= step ? "var(--ink)" : "var(--ink-faint)", whiteSpace: "nowrap" }}>{label}</span>
            </div>
            {i < STEPS.length - 1 && <div style={{ flex: 1, height: 2, background: i < step ? "var(--primary)" : "var(--line)", margin: "0 12px" }} />}
          </React.Fragment>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 32 }} className="checkout-grid">
        <div className="glass" style={{ borderRadius: "var(--r-xl)", padding: 28 }}>
          {step === 0 && (
            <div>
              <SectionTitle icon={<FiMapPin />} title="Shipping address" />
              <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 14 }} className="form-grid">
                <Field label="Full name" value={address.name} onChange={(v) => setAddress({ ...address, name: v })} placeholder="Your name" full />
                <Field label="Phone number" value={address.phone} onChange={(v) => setAddress({ ...address, phone: v.replace(/\D/g, "").slice(0, 10) })} placeholder="10-digit mobile" />
                <Field label="Pincode" value={address.pincode} onChange={(v) => setAddress({ ...address, pincode: v.replace(/\D/g, "").slice(0, 6) })} placeholder="6-digit pincode" />
                <Field label="Address line" value={address.line1} onChange={(v) => setAddress({ ...address, line1: v })} placeholder="House no, street, locality" full />
                <Field label="City" value={address.city} onChange={(v) => setAddress({ ...address, city: v })} placeholder="City" />
                <Field label="State" value={address.state} onChange={(v) => setAddress({ ...address, state: v })} placeholder="State" />
              </div>
              <button
                disabled={!addressValid}
                onClick={() => setStep(1)}
                style={{
                  marginTop: 24,
                  background: addressValid ? "var(--primary)" : "var(--line)",
                  color: addressValid ? "white" : "var(--ink-faint)",
                  border: "none",
                  borderRadius: "var(--r-pill)",
                  padding: "13px 28px",
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: addressValid ? "pointer" : "not-allowed",
                }}
              >
                Continue to payment
              </button>
            </div>
          )}

          {step === 1 && (
            <div>
              <SectionTitle icon={<FiCreditCard />} title="Payment method" />
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  ["cod", "Cash on Delivery", "Pay when your order arrives"],
                  ["upi", "UPI", "Pay via Google Pay, PhonePe, Paytm and more"],
                  ["card", "Credit / Debit Card", "Visa, Mastercard, RuPay"],
                ].map(([id, label, desc]) => (
                  <label
                    key={id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: 16,
                      borderRadius: "var(--r-md)",
                      border: payment === id ? "1.5px solid var(--primary)" : "1px solid var(--line)",
                      background: payment === id ? "var(--primary-light)" : "white",
                      cursor: "pointer",
                    }}
                  >
                    <input type="radio" checked={payment === id} onChange={() => setPayment(id)} style={{ accentColor: "var(--primary)" }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{label}</div>
                      <div style={{ fontSize: 12.5, color: "var(--ink-faint)" }}>{desc}</div>
                    </div>
                  </label>
                ))}
              </div>
              <p style={{ fontSize: 12, color: "var(--ink-faint)", marginTop: 14 }}>
                This is a demo checkout — no real payment gateway is connected yet.
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                <button onClick={() => setStep(0)} style={secondaryBtn}>Back</button>
                <button onClick={() => setStep(2)} style={primaryBtn}>Review order</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <SectionTitle icon={<FiTruck />} title="Review your order" />
              <div style={{ marginBottom: 20 }}>
                <Label>Deliver to</Label>
                <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.6 }}>
                  {address.name} · {address.phone}
                  <br />
                  {address.line1}, {address.city}, {address.state} – {address.pincode}
                </p>
              </div>
              <div style={{ marginBottom: 20 }}>
                <Label>Payment</Label>
                <p style={{ fontSize: 14, color: "var(--ink-soft)" }}>
                  {{ cod: "Cash on Delivery", upi: "UPI", card: "Credit / Debit Card" }[payment]}
                </p>
              </div>
              <div>
                <Label>Items ({lineItems.length})</Label>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {lineItems.map((li) => (
                    <div key={`${li.productId}-${li.variantId}`} style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5 }}>
                      <span style={{ color: "var(--ink-soft)" }}>
                        {li.product.name} ({li.variant.label}) × {li.qty}
                      </span>
                      <span style={{ fontWeight: 700 }}>{formatINR(li.variant.price * li.qty)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                <button onClick={() => setStep(1)} style={secondaryBtn}>Back</button>
                <button onClick={placeOrder} disabled={placing} style={{ ...primaryBtn, opacity: placing ? 0.7 : 1 }}>
                  {placing ? "Placing order..." : `Place order — ${formatINR(total)}`}
                </button>
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="glass-strong" style={{ borderRadius: "var(--r-xl)", padding: 24, position: "sticky", top: 90 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Order summary</h3>
            <SummaryRow label="Subtotal" value={formatINR(subtotal)} />
            {discount > 0 && <SummaryRow label="Coupon discount" value={`− ${formatINR(discount)}`} highlight />}
            <SummaryRow label="Shipping" value={shipping === 0 ? "Free" : formatINR(shipping)} />
            <SummaryRow label="Estimated tax" value={formatINR(tax)} />
            <div style={{ borderTop: "1px solid var(--line)", marginTop: 12, paddingTop: 12, display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 700 }}>Total</span>
              <span style={{ fontWeight: 800, fontSize: 18 }}>{formatINR(total)}</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) { .checkout-grid { grid-template-columns: minmax(0, 1fr) !important; } }
        @media (max-width: 560px) { .form-grid { grid-template-columns: minmax(0, 1fr) !important; } }
      `}</style>
    </div>
  );
}

const primaryBtn = {
  background: "var(--primary)",
  color: "white",
  border: "none",
  borderRadius: "var(--r-pill)",
  padding: "13px 26px",
  fontWeight: 700,
  fontSize: 14,
  cursor: "pointer",
};
const secondaryBtn = {
  background: "white",
  color: "var(--ink-soft)",
  border: "1px solid var(--line)",
  borderRadius: "var(--r-pill)",
  padding: "13px 26px",
  fontWeight: 700,
  fontSize: 14,
  cursor: "pointer",
};

function SectionTitle({ icon, title }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
      <span style={{ color: "var(--primary)", display: "flex" }}>{icon}</span>
      <h2 style={{ fontSize: 18, fontWeight: 700 }}>{title}</h2>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, full }) {
  return (
    <div style={{ gridColumn: full ? "1 / -1" : "auto" }}>
      <Label>{label}</Label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "11px 14px",
          borderRadius: "var(--r-md)",
          border: "1px solid var(--line)",
          fontSize: 14,
          outline: "none",
          background: "white",
        }}
      />
    </div>
  );
}

function Label({ children }) {
  return <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink-soft)", marginBottom: 6 }}>{children}</div>;
}

function SummaryRow({ label, value, highlight }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, color: highlight ? "var(--primary-dark)" : "var(--ink-soft)", marginBottom: 10, fontWeight: highlight ? 700 : 500 }}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
