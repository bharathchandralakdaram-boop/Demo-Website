import React, { useState, useEffect, useRef } from "react";
import { FiPhone, FiUser, FiPackage, FiMapPin, FiLogOut, FiShield } from "react-icons/fi";
import { useToast } from "../context/ToastContext.jsx";
import { useRouter } from "../context/RouterContext.jsx";

export default function AccountPage() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("anyasrrr_user") || "null");
    } catch {
      return null;
    }
  });

  if (user) return <ProfileView user={user} onLogout={() => { sessionStorage.removeItem("anyasrrr_user"); setUser(null); }} />;
  return <LoginFlow onLoggedIn={(u) => { sessionStorage.setItem("anyasrrr_user", JSON.stringify(u)); setUser(u); }} />;
}

function LoginFlow({ onLoggedIn }) {
  const [stage, setStage] = useState("phone"); // phone | otp
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [sending, setSending] = useState(false);
  const showToast = useToast();
  const inputsRef = useRef([]);

  const sendOtp = (e) => {
    e.preventDefault();
    if (phone.length !== 10) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setStage("otp");
      showToast("OTP sent (demo) — enter 1 2 3 4");
    }, 900);
  };

  const verifyOtp = (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 4) return;
    onLoggedIn({ phone, name: "" });
  };

  const handleOtpChange = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 3) inputsRef.current[i + 1]?.focus();
  };

  return (
    <div className="container" style={{ padding: "64px 24px", display: "flex", justifyContent: "center" }}>
      <div className="glass-strong" style={{ width: "100%", maxWidth: 420, borderRadius: "var(--r-xl)", padding: 36, boxShadow: "var(--shadow-lg)" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "var(--primary-light)",
              color: "var(--primary-dark)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            {stage === "phone" ? <FiPhone size={24} /> : <FiShield size={24} />}
          </div>
          <h2 style={{ fontSize: 21, fontWeight: 700 }}>{stage === "phone" ? "Sign in with mobile" : "Verify your number"}</h2>
          <p style={{ fontSize: 13.5, color: "var(--ink-faint)", marginTop: 6 }}>
            {stage === "phone" ? "We'll send you a one-time code" : `Code sent to +91 ${phone}`}
          </p>
        </div>

        {stage === "phone" ? (
          <form onSubmit={sendOtp} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="glass" style={{ display: "flex", alignItems: "center", gap: 10, borderRadius: "var(--r-pill)", padding: "13px 18px" }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: "var(--ink-soft)" }}>+91</span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="10-digit mobile number"
                style={{ border: "none", background: "transparent", outline: "none", fontSize: 15, width: "100%" }}
              />
            </div>
            <button
              type="submit"
              disabled={phone.length !== 10 || sending}
              style={{
                background: phone.length === 10 ? "var(--primary)" : "var(--line)",
                color: phone.length === 10 ? "white" : "var(--ink-faint)",
                border: "none",
                borderRadius: "var(--r-pill)",
                padding: "14px 0",
                fontWeight: 700,
                fontSize: 14.5,
                cursor: phone.length === 10 ? "pointer" : "not-allowed",
              }}
            >
              {sending ? "Sending..." : "Send OTP"}
            </button>
            <p style={{ fontSize: 11.5, color: "var(--ink-faint)", textAlign: "center" }}>
              Demo flow — Firebase phone auth to be connected to a live backend.
            </p>
          </form>
        ) : (
          <form onSubmit={verifyOtp} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              {otp.map((val, i) => (
                <input
                  key={i}
                  ref={(el) => (inputsRef.current[i] = el)}
                  value={val}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  maxLength={1}
                  style={{
                    width: 52,
                    height: 56,
                    textAlign: "center",
                    fontSize: 22,
                    fontWeight: 700,
                    borderRadius: "var(--r-md)",
                    border: "1.5px solid var(--line)",
                    outline: "none",
                  }}
                />
              ))}
            </div>
            <button
              type="submit"
              style={{ background: "var(--primary)", color: "white", border: "none", borderRadius: "var(--r-pill)", padding: "14px 0", fontWeight: 700, fontSize: 14.5, cursor: "pointer" }}
            >
              Verify & continue
            </button>
            <button
              type="button"
              onClick={() => setStage("phone")}
              style={{ background: "none", border: "none", color: "var(--ink-faint)", fontSize: 13, cursor: "pointer" }}
            >
              Change number
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function ProfileView({ user, onLogout }) {
  const { navigate } = useRouter();
  const [tab, setTab] = useState("orders");

  return (
    <div className="container" style={{ padding: "32px 24px 64px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
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
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          <FiUser size={26} />
        </div>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700 }}>+91 {user.phone}</h1>
          <p style={{ fontSize: 13, color: "var(--ink-faint)" }}>Member since {new Date().toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</p>
        </div>
        <button
          onClick={onLogout}
          style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, background: "none", border: "1px solid var(--line)", borderRadius: "var(--r-pill)", padding: "9px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", color: "var(--ink-soft)" }}
        >
          <FiLogOut size={14} /> Logout
        </button>
      </div>

      <div style={{ display: "flex", gap: 24, borderBottom: "1px solid var(--line)", marginBottom: 28 }}>
        {[
          ["orders", "Order history", <FiPackage size={15} key="i" />],
          ["addresses", "Saved addresses", <FiMapPin size={15} key="i" />],
        ].map(([key, label, icon]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "10px 2px",
              background: "none",
              border: "none",
              borderBottom: tab === key ? "2px solid var(--primary)" : "2px solid transparent",
              color: tab === key ? "var(--primary-dark)" : "var(--ink-faint)",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            {icon} {label}
          </button>
        ))}
      </div>

      {tab === "orders" && (
        <div style={{ textAlign: "center", padding: "50px 0" }}>
          <FiPackage size={36} color="var(--ink-faint)" style={{ marginBottom: 14 }} />
          <p style={{ fontWeight: 600, marginBottom: 6 }}>No orders yet</p>
          <p style={{ fontSize: 13.5, color: "var(--ink-faint)", marginBottom: 20 }}>Your order history will appear here once you place an order.</p>
          <button onClick={() => navigate("/products")} style={{ background: "var(--primary)", color: "white", border: "none", borderRadius: "var(--r-pill)", padding: "11px 22px", fontWeight: 700, fontSize: 13.5, cursor: "pointer" }}>
            Start shopping
          </button>
        </div>
      )}

      {tab === "addresses" && (
        <div style={{ textAlign: "center", padding: "50px 0" }}>
          <FiMapPin size={36} color="var(--ink-faint)" style={{ marginBottom: 14 }} />
          <p style={{ fontWeight: 600, marginBottom: 6 }}>No saved addresses</p>
          <p style={{ fontSize: 13.5, color: "var(--ink-faint)" }}>Addresses you use at checkout will be saved here for next time.</p>
        </div>
      )}
    </div>
  );
}
