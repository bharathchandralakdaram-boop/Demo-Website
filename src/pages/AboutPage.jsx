import React from "react";
import { FiMapPin, FiAward, FiUsers, FiDroplet } from "react-icons/fi";

export default function AboutPage() {
  return (
    <div>
      <section style={{ background: "linear-gradient(160deg, #F0FDF4, #F8FAFC)", padding: "64px 24px" }}>
        <div className="container" style={{ maxWidth: 760, textAlign: "center" }}>
          <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Our story
          </span>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 600, marginTop: 10, marginBottom: 16 }}>
            Built in Andhra Pradesh, for everyday Indian homes
          </h1>
          <p style={{ fontSize: 16, color: "var(--ink-soft)", lineHeight: 1.7 }}>
            Anya's RRR is manufactured and marketed by Sree Raghavendra Enterprises out of Dornala,
            in the Prakasam district of Andhra Pradesh. What started as a small household cleaning
            line has grown into a full range across floor, toilet, dishwash, laundry and glass care —
            without losing sight of the basics: clean homes, gentle on hands, and priced for everyday use.
          </p>
        </div>
      </section>

      <section
        className="container about-stats"
        style={{ padding: "56px 24px", display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 24 }}
      >
        <Stat icon={<FiAward />} value="7" label="Product lines" />
        <Stat icon={<FiDroplet />} value="10X" label="Cleaning & germ-kill formula" />
        <Stat icon={<FiUsers />} value="🏡" label="Families across Prakasam & beyond" />
        <Stat icon={<FiMapPin />} value="AP" label="Manufactured in Andhra Pradesh" />
      </section>

      <section className="container" style={{ padding: "0 24px 64px", maxWidth: 760 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>What "RRR" stands for</h2>
        <p style={{ fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.75, marginBottom: 24 }}>
          RRR is our house mark — it appears across our multipurpose soap oil and is woven into every
          product label as "Anya's RRR." Each product line, from Cleaneo to Swish to Lush, carries that
          same mark as a promise: tested formulas, clear labelling, and prices that make sense for a
          weekly grocery run.
        </p>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>Our promise</h2>
        <ul style={{ paddingLeft: 20, color: "var(--ink-soft)", fontSize: 15, lineHeight: 1.8 }}>
          <li>Clear, honest labelling — every claim on our packaging is one you can verify.</li>
          <li>Formulas gentle enough for daily use on hands, fabrics and surfaces.</li>
          <li>Fair pricing across small (trial) sizes and 5L value packs.</li>
        </ul>
      </section>

      <style>{`
        @media (max-width: 900px) { .about-stats { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; } }
      `}</style>
    </div>
  );
}

function Stat({ icon, value, label }) {
  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <div style={{ color: "var(--primary)", display: "flex", justifyContent: "center", marginBottom: 10 }}>{icon}</div>
      <div style={{ fontSize: 28, fontWeight: 800, color: "var(--ink)" }}>{value}</div>
      <div style={{ fontSize: 13, color: "var(--ink-faint)", marginTop: 4 }}>{label}</div>
    </div>
  );
}
