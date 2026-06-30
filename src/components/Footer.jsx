import React from "react";
import { FiInstagram, FiFacebook, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { useRouter } from "../context/RouterContext.jsx";
import { categories } from "../data/products.js";

export default function Footer() {
  const { navigate } = useRouter();
  const go = (path) => (e) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <footer style={{ background: "var(--primary-dark)", color: "white", marginTop: 80 }}>
      <div className="container" style={{ padding: "56px 24px 32px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr",
            gap: 40,
          }}
          className="footer-grid"
        >
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
              Anya's RRR
            </div>
            <p style={{ fontSize: 14, opacity: 0.75, lineHeight: 1.6, maxWidth: 280 }}>
              Clean Home. Healthy Life. Premium floor, toilet, dish and laundry cleaners made by
              Sree Raghavendra Enterprises, Prakasam district, Andhra Pradesh.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              {[FiInstagram, FiFacebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <FooterHeading>Shop</FooterHeading>
            {categories.map((c) => (
              <FooterLink key={c.id} onClick={go(`/category/${c.id}`)}>
                {c.name}
              </FooterLink>
            ))}
          </div>

          <div>
            <FooterHeading>Company</FooterHeading>
            <FooterLink onClick={go("/about")}>About Us</FooterLink>
            <FooterLink onClick={go("/contact")}>Contact</FooterLink>
            <FooterLink onClick={go("/faq")}>FAQ</FooterLink>
            <FooterLink onClick={go("/privacy")}>Privacy Policy</FooterLink>
            <FooterLink onClick={go("/terms")}>Terms & Conditions</FooterLink>
          </div>

          <div>
            <FooterHeading>Get in touch</FooterHeading>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13.5, opacity: 0.85 }}>
              <span style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <FiMapPin size={15} style={{ marginTop: 2, flexShrink: 0 }} />
                3-387A, KG Road, Dornala, Prakasam, Andhra Pradesh – 523331
              </span>
              <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <FiPhone size={15} /> +91 94903 28925
              </span>
              <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <FiMail size={15} /> anyasrrr.srenterprises@gmail.com
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.15)",
            marginTop: 40,
            paddingTop: 20,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 10,
            fontSize: 12.5,
            opacity: 0.6,
          }}
        >
          <span>© {new Date().getFullYear()} Anya's RRR · Sree Raghavendra Enterprises. All rights reserved.</span>
          <span>Made with care for Indian homes.</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .footer-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) !important; }
        }
        @media (max-width: 520px) {
          .footer-grid { grid-template-columns: minmax(0, 1fr) !important; }
        }
      `}</style>
    </footer>
  );
}

function FooterHeading({ children }) {
  return (
    <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", opacity: 0.6, marginBottom: 14 }}>
      {children}
    </div>
  );
}

function FooterLink({ children, onClick }) {
  return (
    <a
      href="#/"
      onClick={onClick}
      style={{ display: "block", fontSize: 14, opacity: 0.85, marginBottom: 10, cursor: "pointer" }}
    >
      {children}
    </a>
  );
}
