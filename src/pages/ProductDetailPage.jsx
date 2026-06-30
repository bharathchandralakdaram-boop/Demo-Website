import React, { useState, useEffect } from "react";
import { FiHeart, FiShoppingBag, FiTruck, FiShield, FiRefreshCw, FiChevronRight, FiZoomIn } from "react-icons/fi";
import StarRating from "../components/StarRating.jsx";
import ProductCard from "../components/ProductCard.jsx";
import QuickView from "../components/QuickView.jsx";
import { formatINR, discountPercent } from "../utils/format.js";
import { useCart } from "../context/CartContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { useRouter } from "../context/RouterContext.jsx";
import { getProductById, products, categories } from "../data/products.js";

// Placeholder reviews — clearly marked, swap for real customer reviews later.
const SAMPLE_REVIEWS = [
  { name: "Anita S.", rating: 5, text: "Works exactly as described, the smell is pleasant and not overpowering. Will buy again.", date: "2 weeks ago" },
  { name: "Vinod M.", rating: 4, text: "Good cleaning power, the 5L pack is great value if you have a big house.", date: "1 month ago" },
  { name: "Priya K.", rating: 5, text: "Switched from a bigger brand and honestly don't see a difference in quality, for less money.", date: "1 month ago" },
];

export default function ProductDetailPage({ productId }) {
  const product = getProductById(productId);
  const { navigate } = useRouter();
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const showToast = useToast();
  const [variantIdx, setVariantIdx] = useState(0);
  const [imageIdx, setImageIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("description");
  const [zoomed, setZoomed] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    setVariantIdx(0);
    setImageIdx(0);
    setQty(1);
    window.scrollTo({ top: 0 });

    // track recently viewed in sessionStorage
    try {
      const raw = sessionStorage.getItem("anyasrrr_recent");
      let ids = raw ? JSON.parse(raw) : [];
      ids = [productId, ...ids.filter((id) => id !== productId)].slice(0, 8);
      sessionStorage.setItem("anyasrrr_recent", JSON.stringify(ids));
      setRecentlyViewed(ids.filter((id) => id !== productId).slice(0, 4));
    } catch {
      /* ignore */
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="container" style={{ padding: "80px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: 22, marginBottom: 12 }}>Product not found</h2>
        <button onClick={() => navigate("/products")} style={{ color: "var(--primary-dark)", fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}>
          Back to shop
        </button>
      </div>
    );
  }

  const variant = product.variants[variantIdx];
  const discount = discountPercent(variant.mrp, variant.price);
  const isWishlisted = wishlist.includes(product.id);
  const category = categories.find((c) => c.id === product.category);

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const similar = products.filter((p) => p.id !== product.id).slice(0, 4);
  const recentProducts = recentlyViewed.map((id) => getProductById(id)).filter(Boolean);

  const handleAddToCart = () => {
    addToCart(product.id, variant.id, qty);
    showToast(`Added ${qty} × ${product.name} to cart`);
  };

  const handleBuyNow = () => {
    addToCart(product.id, variant.id, qty);
    navigate("/checkout");
  };

  return (
    <div className="container" style={{ padding: "28px 24px 64px" }}>
      {/* breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--ink-faint)", marginBottom: 24, flexWrap: "wrap" }}>
        <Crumb onClick={() => navigate("/")}>Home</Crumb>
        <FiChevronRight size={12} />
        <Crumb onClick={() => navigate(`/category/${product.category}`)}>{category?.name}</Crumb>
        <FiChevronRight size={12} />
        <span style={{ color: "var(--ink)" }}>{product.name}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 48 }} className="pdp-grid">
        {/* gallery */}
        <div>
          <div
            onClick={() => setZoomed(true)}
            style={{
              position: "relative",
              aspectRatio: "1/1",
              borderRadius: "var(--r-xl)",
              background: "linear-gradient(135deg, #F1F5F9, #E2E8F0)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              cursor: "zoom-in",
              marginBottom: 14,
            }}
          >
            <img
              src={product.images[imageIdx]}
              alt={product.name}
              style={{ width: "78%", height: "78%", objectFit: "contain" }}
            />
            <span
              className="glass"
              style={{
                position: "absolute",
                bottom: 14,
                right: 14,
                width: 36,
                height: 36,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FiZoomIn size={16} />
            </span>
          </div>
          <div style={{ display: "flex", gap: 10, overflowX: "auto" }}>
            {product.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setImageIdx(i)}
                style={{
                  width: 64,
                  height: 64,
                  flexShrink: 0,
                  borderRadius: "var(--r-md)",
                  border: i === imageIdx ? "2px solid var(--primary)" : "1px solid var(--line)",
                  background: "white",
                  padding: 6,
                  cursor: "pointer",
                }}
              >
                <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </button>
            ))}
          </div>
        </div>

        {/* info */}
        <div>
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            {product.brand}
          </span>
          <h1 style={{ fontSize: "clamp(24px, 3vw, 30px)", fontWeight: 600, marginTop: 6, marginBottom: 10 }}>{product.name}</h1>

          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
            <StarRating rating={product.rating} count={product.reviewCount} />
            <span style={{ width: 1, height: 16, background: "var(--line)" }} />
            <span style={{ fontSize: 13, color: "var(--primary-dark)", fontWeight: 700 }}>In stock</span>
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 4 }}>
            <span style={{ fontSize: 30, fontWeight: 800 }}>{formatINR(variant.price)}</span>
            {variant.mrp > variant.price && (
              <>
                <span style={{ fontSize: 17, color: "var(--ink-faint)", textDecoration: "line-through" }}>{formatINR(variant.mrp)}</span>
                <span
                  style={{
                    fontSize: 12.5,
                    fontWeight: 700,
                    color: "white",
                    background: "var(--primary)",
                    padding: "3px 10px",
                    borderRadius: "var(--r-pill)",
                  }}
                >
                  {discount}% OFF
                </span>
              </>
            )}
          </div>
          <p style={{ fontSize: 13, color: "var(--ink-faint)", marginBottom: 22 }}>Inclusive of all taxes</p>

          {product.variants.length > 1 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Size</div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {product.variants.map((v, i) => (
                  <button
                    key={v.id}
                    onClick={() => setVariantIdx(i)}
                    style={{
                      padding: "10px 18px",
                      borderRadius: "var(--r-pill)",
                      border: i === variantIdx ? "1.5px solid var(--primary)" : "1.5px solid var(--line)",
                      background: i === variantIdx ? "var(--primary-light)" : "white",
                      color: i === variantIdx ? "var(--primary-dark)" : "var(--ink-soft)",
                      fontSize: 13.5,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Quantity</div>
            <div style={{ display: "inline-flex", alignItems: "center", border: "1px solid var(--line)", borderRadius: "var(--r-pill)" }}>
              <QtyBtn onClick={() => setQty((q) => Math.max(1, q - 1))}>−</QtyBtn>
              <span style={{ width: 40, textAlign: "center", fontWeight: 700, fontSize: 14 }}>{qty}</span>
              <QtyBtn onClick={() => setQty((q) => q + 1)}>+</QtyBtn>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
            <button
              onClick={handleAddToCart}
              style={{
                flex: 1,
                border: "1.5px solid var(--primary)",
                background: "white",
                color: "var(--primary-dark)",
                borderRadius: "var(--r-pill)",
                padding: "14px 16px",
                fontSize: 14.5,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                cursor: "pointer",
              }}
            >
              <FiShoppingBag size={17} /> Add to cart
            </button>
            <button
              onClick={handleBuyNow}
              style={{
                flex: 1,
                border: "none",
                background: "var(--primary)",
                color: "white",
                borderRadius: "var(--r-pill)",
                padding: "14px 16px",
                fontSize: 14.5,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Buy now
            </button>
            <button
              onClick={() => {
                toggleWishlist(product.id);
                showToast(isWishlisted ? "Removed from wishlist" : "Saved to wishlist");
              }}
              aria-label="Toggle wishlist"
              style={{
                width: 52,
                borderRadius: "50%",
                border: "1px solid var(--line)",
                background: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: isWishlisted ? "#EF4444" : "var(--ink-soft)",
                flexShrink: 0,
              }}
            >
              <FiHeart size={18} fill={isWishlisted ? "#EF4444" : "none"} />
            </button>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              padding: 18,
              borderRadius: "var(--r-lg)",
              background: "var(--bg)",
              border: "1px solid var(--line-soft)",
            }}
          >
            <InfoRow icon={<FiTruck />} text="Delivery charges & timelines shown at checkout based on your pin code" />
            <InfoRow icon={<FiRefreshCw />} text="Easy returns on unopened products — see Privacy & Terms for details" />
            <InfoRow icon={<FiShield />} text="Manufactured by Sree Raghavendra Enterprises, Andhra Pradesh" />
          </div>
        </div>
      </div>

      {/* tabs */}
      <div style={{ marginTop: 56 }}>
        <div style={{ display: "flex", gap: 28, borderBottom: "1px solid var(--line)", marginBottom: 24, overflowX: "auto" }}>
          {[
            ["description", "Description"],
            ["benefits", "Benefits"],
            ["usage", "How to use"],
            ["reviews", `Reviews (${product.reviewCount})`],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              style={{
                padding: "12px 2px",
                background: "none",
                border: "none",
                borderBottom: tab === key ? "2px solid var(--primary)" : "2px solid transparent",
                color: tab === key ? "var(--primary-dark)" : "var(--ink-faint)",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div style={{ maxWidth: 720 }}>
          {tab === "description" && <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ink-soft)" }}>{product.description}</p>}
          {tab === "benefits" && (
            <ul style={{ display: "flex", flexDirection: "column", gap: 10, paddingLeft: 0, listStyle: "none" }}>
              {product.benefits.map((b, i) => (
                <li key={i} style={{ display: "flex", gap: 10, fontSize: 14.5, color: "var(--ink-soft)" }}>
                  <span style={{ color: "var(--primary)", fontWeight: 700 }}>✓</span> {b}
                </li>
              ))}
            </ul>
          )}
          {tab === "usage" && (
            <>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ink-soft)", marginBottom: 16 }}>{product.howToUse}</p>
              {product.caution && (
                <div style={{ background: "#FEF3C7", borderRadius: "var(--r-md)", padding: 14, fontSize: 13.5, color: "#92400E" }}>
                  <strong>Caution:</strong> {product.caution}
                </div>
              )}
            </>
          )}
          {tab === "reviews" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
                <span style={{ fontSize: 36, fontWeight: 800 }}>{product.rating}</span>
                <div>
                  <StarRating rating={product.rating} showCount={false} />
                  <p style={{ fontSize: 13, color: "var(--ink-faint)", marginTop: 4 }}>Based on {product.reviewCount} reviews</p>
                </div>
              </div>
              <p style={{ fontSize: 12, color: "var(--ink-faint)", fontStyle: "italic" }}>
                Sample reviews shown below for layout — replace with real customer reviews.
              </p>
              {SAMPLE_REVIEWS.map((r, i) => (
                <div key={i} style={{ borderBottom: "1px solid var(--line-soft)", paddingBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{r.name}</span>
                    <span style={{ fontSize: 12.5, color: "var(--ink-faint)" }}>{r.date}</span>
                  </div>
                  <StarRating rating={r.rating} showCount={false} size={13} />
                  <p style={{ fontSize: 14, color: "var(--ink-soft)", marginTop: 8, lineHeight: 1.6 }}>{r.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <ProductSection title="Related products" products={related} onQuickView={setQuickViewProduct} />
      )}
      <ProductSection title="Frequently bought with this" products={similar} onQuickView={setQuickViewProduct} />
      {recentProducts.length > 0 && (
        <ProductSection title="Recently viewed" products={recentProducts} onQuickView={setQuickViewProduct} />
      )}

      {zoomed && (
        <div
          onClick={() => setZoomed(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15,23,42,0.85)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            cursor: "zoom-out",
          }}
        >
          <img src={product.images[imageIdx]} alt={product.name} style={{ maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain" }} />
        </div>
      )}

      {quickViewProduct && <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />}

      <style>{`
        @media (max-width: 860px) { .pdp-grid { grid-template-columns: minmax(0, 1fr) !important; gap: 28px !important; } }
      `}</style>
    </div>
  );
}

function ProductSection({ title, products, onQuickView }) {
  return (
    <div style={{ marginTop: 56 }}>
      <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 20 }}>{title}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 18 }} className="related-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onQuickView={onQuickView} />
        ))}
      </div>
      <style>{`
        @media (max-width: 920px) { .related-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; } }
      `}</style>
    </div>
  );
}

function Crumb({ children, onClick }) {
  return (
    <button onClick={onClick} style={{ background: "none", border: "none", color: "var(--ink-faint)", fontSize: 13, cursor: "pointer", padding: 0 }}>
      {children}
    </button>
  );
}

function InfoRow({ icon, text }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, color: "var(--ink-soft)" }}>
      <span style={{ color: "var(--primary)", marginTop: 1, flexShrink: 0 }}>{icon}</span>
      {text}
    </div>
  );
}

function QtyBtn({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ width: 36, height: 36, border: "none", background: "none", fontSize: 18, cursor: "pointer", color: "var(--ink-soft)" }}
    >
      {children}
    </button>
  );
}
