import React, { useState, useEffect } from "react";
import { FiArrowUp } from "react-icons/fi";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919490328925"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="whatsapp-fab"
      style={{
        position: "fixed",
        bottom: 96,
        left: 24,
        zIndex: 150,
        width: 54,
        height: 54,
        borderRadius: "50%",
        background: "#25D366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 8px 24px rgba(37, 211, 102, 0.4)",
      }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.43 1.27 4.87L2 22l5.3-1.39A9.94 9.94 0 0 0 12.04 22c5.52 0 10-4.48 10-10s-4.48-10-10-10zm0 18.18c-1.6 0-3.13-.43-4.45-1.24l-.32-.19-3.14.82.84-3.06-.21-.32A8.16 8.16 0 0 1 3.82 12c0-4.54 3.7-8.24 8.24-8.24S20.3 7.46 20.3 12s-3.7 8.18-8.26 8.18zm4.52-6.13c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.96-.14.16-.29.18-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.22-1.45-1.37-1.69-.14-.25-.02-.38.11-.5.12-.12.27-.31.41-.47.14-.16.18-.27.27-.45.09-.18.04-.33-.03-.46-.08-.12-.62-1.5-.85-2.05-.22-.53-.45-.46-.62-.47-.16-.01-.35-.01-.54-.01s-.5.06-.76.31c-.27.25-1.02.99-1.02 2.42 0 1.43 1.04 2.81 1.18 3 .14.19 1.97 3 4.78 4.09 2.81 1.08 2.81.72 3.32.68.5-.05 1.62-.66 1.85-1.3.23-.64.23-1.18.16-1.3-.07-.11-.25-.18-.5-.3z" />
      </svg>
      <style>{`
        @media (max-width: 480px) {
          .whatsapp-fab { width: 46px !important; height: 46px !important; bottom: 80px !important; left: 12px !important; }
        }
      `}</style>
    </a>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 480);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="glass-strong"
      style={{
        position: "fixed",
        bottom: 24,
        right: 96,
        zIndex: 150,
        width: 44,
        height: 44,
        borderRadius: "50%",
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "var(--shadow-md)",
        animation: "fadeUp 0.25s ease",
      }}
    >
      <FiArrowUp size={18} />
    </button>
  );
}
