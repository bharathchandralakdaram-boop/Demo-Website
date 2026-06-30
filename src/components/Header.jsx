import React, { useState, useEffect, useRef } from "react";
import { FiSearch, FiHeart, FiShoppingBag, FiMenu, FiX, FiUser } from "react-icons/fi";
import { useRouter } from "../context/RouterContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { products, categories } from "../data/products.js";

export default function Header() {
  const { navigate, path } = useRouter();
  const { itemCount, wishlist } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [path]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const suggestions =
    query.trim().length > 0
      ? products
          .filter(
            (p) =>
              p.name.toLowerCase().includes(query.toLowerCase()) ||
              p.tags.some((t) => t.includes(query.toLowerCase()))
          )
          .slice(0, 5)
      : [];

  const goSearch = (q) => {
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setSearchOpen(false);
    setMobileOpen(false);
    setQuery("");
  };

  const navLink = (label, target) => (
    <a
      key={target}
      onClick={(e) => {
        e.preventDefault();
        navigate(target);
        setMobileOpen(false);
      }}
      href={`#${target}`}
      style={{
        fontSize: 14,
        fontWeight: 600,
        color: path === target ? "var(--primary-dark)" : "var(--ink-soft)",
        padding: "8px 4px",
        cursor: "pointer",
        position: "relative",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </a>
  );

  return (
    <header
      className={scrolled ? "glass-strong" : ""}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: scrolled ? undefined : "rgba(248,250,252,0.0)",
        transition: "all 0.3s ease",
        borderBottom: scrolled ? "1px solid var(--line-soft)" : "1px solid transparent",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 72,
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <a
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
            style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
          >
            <LogoMark />
            <div style={{ lineHeight: 1.1 }} className="logo-text">
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--primary-dark)", whiteSpace: "nowrap" }}>
                Anya's RRR
              </div>
              <div style={{ fontSize: 10, color: "var(--ink-faint)", letterSpacing: "0.06em", fontWeight: 600, whiteSpace: "nowrap" }}>
                CLEAN HOME. HEALTHY LIFE.
              </div>
            </div>
          </a>

          <nav style={{ display: "none", gap: 22, alignItems: "center" }} className="nav-desktop">
            {navLink("Home", "/")}
            {navLink("Shop All", "/products")}
            {categories.slice(0, 4).map((c) => navLink(c.name, `/category/${c.id}`))}
          </nav>
        </div>

        <div
          className="nav-search-desktop"
          style={{
            display: "none",
            flex: 1,
            maxWidth: 380,
            position: "relative",
          }}
        >
          <div
            className="glass"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              borderRadius: "var(--r-pill)",
              padding: "10px 16px",
            }}
          >
            <FiSearch size={16} color="var(--ink-faint)" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && query.trim() && goSearch(query)}
              placeholder="Search floor cleaner, toilet cleaner..."
              style={{
                border: "none",
                background: "transparent",
                outline: "none",
                fontSize: 13,
                width: "100%",
                color: "var(--ink)",
              }}
            />
          </div>
          {suggestions.length > 0 && (
            <div
              className="glass-strong"
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                left: 0,
                right: 0,
                borderRadius: "var(--r-md)",
                boxShadow: "var(--shadow-lg)",
                overflow: "hidden",
                zIndex: 50,
              }}
            >
              {suggestions.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    navigate(`/product/${p.id}`);
                    setQuery("");
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    width: "100%",
                    border: "none",
                    background: "transparent",
                    padding: "10px 14px",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <img src={p.variants[0].image} alt="" style={{ width: 32, height: 32, objectFit: "contain" }} />
                  <span style={{ fontSize: 13, color: "var(--ink)" }}>{p.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="nav-icons-row" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            className="nav-icon-btn"
            aria-label="Search"
            onClick={() => setSearchOpen((s) => !s)}
            style={iconBtnStyle}
          >
            <FiSearch size={19} />
          </button>
          <button
            aria-label="Wishlist"
            onClick={() => navigate("/wishlist")}
            style={{ ...iconBtnStyle, position: "relative" }}
          >
            <FiHeart size={19} />
            {wishlist.length > 0 && <Badge count={wishlist.length} />}
          </button>
          <button aria-label="Account" onClick={() => navigate("/account")} style={iconBtnStyle} className="nav-account-btn">
            <FiUser size={19} />
          </button>
          <button
            aria-label="Cart"
            onClick={() => navigate("/cart")}
            style={{ ...iconBtnStyle, position: "relative" }}
          >
            <FiShoppingBag size={19} />
            {itemCount > 0 && <Badge count={itemCount} />}
          </button>
          <button
            aria-label="Menu"
            onClick={() => setMobileOpen((o) => !o)}
            style={{ ...iconBtnStyle, display: "none" }}
            className="nav-burger"
          >
            {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="container" style={{ paddingBottom: 14 }}>
          <div
            className="glass"
            style={{ display: "flex", alignItems: "center", gap: 8, borderRadius: "var(--r-pill)", padding: "10px 16px" }}
          >
            <FiSearch size={16} color="var(--ink-faint)" />
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && query.trim() && goSearch(query)}
              placeholder="Search products..."
              style={{ border: "none", background: "transparent", outline: "none", fontSize: 14, width: "100%" }}
            />
          </div>
        </div>
      )}

      {mobileOpen && (
        <div className="container" style={{ paddingBottom: 16, display: "flex", flexDirection: "column", gap: 4 }}>
          {navLink("Home", "/")}
          {navLink("Shop All", "/products")}
          {categories.map((c) => navLink(c.name, `/category/${c.id}`))}
          {navLink("Cart", "/cart")}
          {navLink("Wishlist", "/wishlist")}
        </div>
      )}

      <style>{`
        @media (min-width: 920px) {
          .nav-desktop { display: flex !important; }
          .nav-search-desktop { display: block !important; }
          .nav-search-mobile-toggle { display: none !important; }
        }
        @media (max-width: 919px) {
          .nav-burger { display: flex !important; }
        }
        @media (max-width: 480px) {
          .nav-icons-row { gap: 0px !important; }
          .nav-icons-row button { width: 34px !important; }
          .nav-account-btn { display: none !important; }
        }
        @media (max-width: 420px) {
          .logo-text > div:last-child { display: none; }
        }
      `}</style>
    </header>
  );
}

const iconBtnStyle = {
  width: 38,
  height: 38,
  borderRadius: "50%",
  border: "none",
  background: "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  color: "var(--ink)",
};

function Badge({ count }) {
  return (
    <span
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        background: "var(--primary)",
        color: "white",
        fontSize: 10,
        fontWeight: 700,
        width: 16,
        height: 16,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {count > 9 ? "9+" : count}
    </span>
  );
}

function LogoMark() {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <rect width="38" height="38" rx="12" fill="var(--primary)" />
      <path
        d="M19 9c3.5 4.2 7 8.1 7 12.2a7 7 0 1 1-14 0C12 17.1 15.5 13.2 19 9z"
        fill="white"
        opacity="0.95"
      />
      <path d="M19 14c1.8 2.2 3.5 4.2 3.5 6.4a3.5 3.5 0 1 1-7 0c0-2.2 1.7-4.2 3.5-6.4z" fill="var(--primary-light)" />
    </svg>
  );
}
