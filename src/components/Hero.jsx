import React from "react";
import { FiArrowRight, FiShield, FiTruck, FiAward } from "react-icons/fi";
import { useRouter } from "../context/RouterContext.jsx";
import { getProductById } from "../data/products.js";

export default function Hero() {
  const { navigate } = useRouter();
  const hero = getProductById("swish-lemon-lavender");

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(160deg, #F0FDF4 0%, #F8FAFC 55%, #F8FAFC 100%)",
      }}
    >
      {/* ambient blobs */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -120,
          right: -120,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,197,94,0.18), transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: -160,
          left: -100,
          width: 360,
          height: 360,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(22,163,74,0.12), transparent 70%)",
        }}
      />

      <div
        className="container hero-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          alignItems: "center",
          gap: 40,
          padding: "56px 24px 64px",
          position: "relative",
        }}
      >
        <div style={{ position: "relative", zIndex: 2 }}>
          <span
            className="glass"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "7px 16px",
              borderRadius: "var(--r-pill)",
              fontSize: 12.5,
              fontWeight: 700,
              color: "var(--primary-dark)",
              marginBottom: 20,
            }}
          >
            🌿 Made in Andhra Pradesh, trusted by families
          </span>

          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 58px)",
              fontWeight: 600,
              lineHeight: 1.08,
              color: "var(--ink)",
              marginBottom: 18,
            }}
          >
            Clean Home.
            <br />
            <span style={{ color: "var(--primary)" }}>Healthy Life.</span>
          </h1>

          <p style={{ fontSize: 17, color: "var(--ink-soft)", lineHeight: 1.6, maxWidth: 440, marginBottom: 30 }}>
            Floor, toilet, dish and laundry cleaners formulated for everyday Indian homes —
            10X germ-kill power, gentle on hands, tough on grime.
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button
              onClick={() => navigate("/products")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "var(--primary)",
                color: "white",
                border: "none",
                padding: "15px 28px",
                borderRadius: "var(--r-pill)",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "var(--shadow-green)",
              }}
            >
              Shop all products <FiArrowRight size={17} />
            </button>
            <button
              onClick={() => navigate("/category/floor")}
              className="glass"
              style={{
                padding: "15px 26px",
                borderRadius: "var(--r-pill)",
                border: "none",
                fontSize: 15,
                fontWeight: 700,
                color: "var(--ink)",
                cursor: "pointer",
              }}
            >
              Explore floor cleaners
            </button>
          </div>

          <div style={{ display: "flex", gap: 28, marginTop: 40, flexWrap: "wrap" }}>
            <TrustPoint icon={<FiShield />} label="Germ-kill tested" />
            <TrustPoint icon={<FiTruck />} label="Doorstep delivery" />
            <TrustPoint icon={<FiAward />} label="7 product lines" />
          </div>
        </div>

        <div style={{ position: "relative", display: "flex", justifyContent: "center", zIndex: 2 }}>
          <div
            style={{
              position: "relative",
              width: "min(380px, 80vw)",
              aspectRatio: "1/1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                width: "85%",
                height: "85%",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,255,255,0.9), rgba(220,252,231,0.5) 60%, transparent 75%)",
                filter: "blur(2px)",
              }}
            />
            <img
              src="/images/hero-swish-cutout.png"
              alt={hero.name}
              style={{
                width: "78%",
                position: "relative",
                zIndex: 2,
                objectFit: "contain",
                animation: "floatY 5s ease-in-out infinite",
                filter: "drop-shadow(0 30px 40px rgba(15,23,42,0.18))",
              }}
            />
            {/* floor shine reflection */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: "6%",
                width: "60%",
                height: "14%",
                background: "radial-gradient(ellipse, rgba(56,189,248,0.35), transparent 75%)",
                borderRadius: "50%",
                filter: "blur(6px)",
              }}
            />
          </div>

          <div
            className="glass-strong"
            style={{
              position: "absolute",
              bottom: 8,
              left: 0,
              padding: "14px 18px",
              borderRadius: "var(--r-lg)",
              boxShadow: "var(--shadow-md)",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={{ fontSize: 22 }}>✨</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>10X Cleaning Power</div>
              <div style={{ fontSize: 11.5, color: "var(--ink-faint)" }}>Swish Floor Cleaner</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .hero-grid { grid-template-columns: minmax(0, 1fr) !important; padding-top: 32px !important; }
          .hero-grid > div:last-child { order: -1; }
        }
      `}</style>
    </section>
  );
}

function TrustPoint({ icon, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, fontWeight: 600, color: "var(--ink-soft)" }}>
      <span style={{ color: "var(--primary)", display: "flex" }}>{icon}</span>
      {label}
    </div>
  );
}
