import React, { useState } from "react";
import { FiMapPin, FiPhone, FiMail, FiClock, FiCheck } from "react-icons/fi";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="container" style={{ padding: "40px 24px 64px" }}>
      <h1 style={{ fontSize: "clamp(26px, 3.5vw, 34px)", fontWeight: 600, marginBottom: 10 }}>Contact us</h1>
      <p style={{ fontSize: 15, color: "var(--ink-soft)", marginBottom: 40, maxWidth: 560 }}>
        Questions about an order, a product, or wholesale enquiries — reach out and our team will get back to you.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 40 }} className="contact-grid">
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 32 }}>
            <ContactRow icon={<FiMapPin />} title="Address">
              3-387A, KG Road, Dornala, Prakasam, Andhra Pradesh – 523331
            </ContactRow>
            <ContactRow icon={<FiPhone />} title="Phone">
              +91 94903 28925 · +91 98493 92978
            </ContactRow>
            <ContactRow icon={<FiMail />} title="Email">
              anyasrrr.srenterprises@gmail.com
            </ContactRow>
            <ContactRow icon={<FiClock />} title="Hours">
              Mon–Sat, 9:00 AM – 7:00 PM IST
            </ContactRow>
          </div>

          <div
            style={{
              borderRadius: "var(--r-lg)",
              overflow: "hidden",
              border: "1px solid var(--line-soft)",
              aspectRatio: "16/10",
              background: "linear-gradient(135deg, #E2E8F0, #F1F5F9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 8,
              color: "var(--ink-faint)",
            }}
          >
            <FiMapPin size={28} />
            <span style={{ fontSize: 13 }}>Map preview — connect Google Maps API for a live embed</span>
          </div>
        </div>

        <div className="glass" style={{ borderRadius: "var(--r-xl)", padding: 28 }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "var(--primary)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <FiCheck size={26} />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Message sent</h3>
              <p style={{ fontSize: 13.5, color: "var(--ink-faint)" }}>We'll get back to you within 1-2 business days.</p>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <FormField label="Your name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
              <FormField label="Email address" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
              <div>
                <label style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink-soft)", marginBottom: 6, display: "block" }}>Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "var(--r-md)",
                    border: "1px solid var(--line)",
                    fontSize: 14,
                    fontFamily: "inherit",
                    resize: "vertical",
                    outline: "none",
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  background: "var(--primary)",
                  color: "white",
                  border: "none",
                  borderRadius: "var(--r-pill)",
                  padding: "13px 0",
                  fontWeight: 700,
                  fontSize: 14.5,
                  cursor: "pointer",
                }}
              >
                Send message
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) { .contact-grid { grid-template-columns: minmax(0, 1fr) !important; } }
      `}</style>
    </div>
  );
}

function ContactRow({ icon, title, children }) {
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
      <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--primary-light)", color: "var(--primary-dark)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {icon}
      </div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{title}</div>
        <div style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>{children}</div>
      </div>
    </div>
  );
}

function FormField({ label, value, onChange, type = "text", required }) {
  return (
    <div>
      <label style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink-soft)", marginBottom: 6, display: "block" }}>{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", padding: "12px 14px", borderRadius: "var(--r-md)", border: "1px solid var(--line)", fontSize: 14, outline: "none" }}
      />
    </div>
  );
}
