import React, { useState, useMemo } from "react";
import { FiFilter, FiX, FiChevronDown } from "react-icons/fi";
import ProductCard from "../components/ProductCard.jsx";
import QuickView from "../components/QuickView.jsx";
import { products, categories } from "../data/products.js";

export default function ProductListingPage({ categoryId, searchQuery }) {
  const [sortBy, setSortBy] = useState("relevance");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [activeCategories, setActiveCategories] = useState(categoryId ? [categoryId] : []);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const filtered = useMemo(() => {
    let list = [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      );
    }

    if (activeCategories.length > 0) {
      list = list.filter((p) => activeCategories.includes(p.category));
    }

    list = list.filter((p) => p.variants[0].price <= maxPrice);

    if (sortBy === "price-asc") list.sort((a, b) => a.variants[0].price - b.variants[0].price);
    if (sortBy === "price-desc") list.sort((a, b) => b.variants[0].price - a.variants[0].price);
    if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [searchQuery, activeCategories, maxPrice, sortBy]);

  const toggleCategory = (id) => {
    setActiveCategories((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
  };

  const title = searchQuery
    ? `Results for "${searchQuery}"`
    : categoryId
    ? categories.find((c) => c.id === categoryId)?.name || "Products"
    : "Shop all products";

  return (
    <div className="container" style={{ padding: "32px 24px 64px" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 600 }}>{title}</h1>
        <p style={{ fontSize: 14, color: "var(--ink-faint)", marginTop: 4 }}>{filtered.length} products</p>
      </div>

      <button
        onClick={() => setFiltersOpen((o) => !o)}
        className="filters-toggle"
        style={{
          display: "none",
          alignItems: "center",
          gap: 8,
          marginBottom: 16,
          padding: "10px 18px",
          borderRadius: "var(--r-pill)",
          border: "1px solid var(--line)",
          background: "white",
          fontWeight: 600,
          fontSize: 13.5,
          cursor: "pointer",
        }}
      >
        <FiFilter size={15} /> Filters
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 32 }} className="plp-grid">
        <aside
          className={filtersOpen ? "filters-panel open" : "filters-panel"}
          style={{ flexDirection: "column", gap: 28 }}
        >
          <div className="filters-mobile-header" style={{ display: "none", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 700, fontSize: 16 }}>Filters</span>
            <button onClick={() => setFiltersOpen(false)} style={{ border: "none", background: "none", cursor: "pointer" }}>
              <FiX size={20} />
            </button>
          </div>

          <FilterBlock title="Category">
            {categories.map((c) => (
              <label key={c.id} style={checkboxRow}>
                <input
                  type="checkbox"
                  checked={activeCategories.includes(c.id)}
                  onChange={() => toggleCategory(c.id)}
                  style={{ accentColor: "var(--primary)" }}
                />
                <span style={{ fontSize: 13.5 }}>{c.name}</span>
              </label>
            ))}
          </FilterBlock>

          <FilterBlock title={`Max price: ₹${maxPrice}`}>
            <input
              type="range"
              min={50}
              max={1000}
              step={10}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ width: "100%", accentColor: "var(--primary)" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, color: "var(--ink-faint)" }}>
              <span>₹50</span>
              <span>₹1000+</span>
            </div>
          </FilterBlock>

          <FilterBlock title="Availability">
            <label style={checkboxRow}>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                style={{ accentColor: "var(--primary)" }}
              />
              <span style={{ fontSize: 13.5 }}>In stock only</span>
            </label>
          </FilterBlock>

          {(activeCategories.length > 0 || maxPrice < 1000) && (
            <button
              onClick={() => {
                setActiveCategories([]);
                setMaxPrice(1000);
              }}
              style={{ fontSize: 13, color: "var(--primary-dark)", fontWeight: 700, background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: 0 }}
            >
              Clear all filters
            </button>
          )}
        </aside>

        <div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
            <div style={{ position: "relative" }}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  appearance: "none",
                  padding: "10px 36px 10px 16px",
                  borderRadius: "var(--r-pill)",
                  border: "1px solid var(--line)",
                  background: "white",
                  fontSize: 13.5,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                <option value="relevance">Sort: Relevance</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
              <FiChevronDown
                size={14}
                style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--ink-faint)" }}>
              <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>No products match those filters.</p>
              <button
                onClick={() => {
                  setActiveCategories([]);
                  setMaxPrice(1000);
                }}
                style={{ color: "var(--primary-dark)", fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 20 }} className="plp-product-grid">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
              ))}
            </div>
          )}
        </div>
      </div>

      {quickViewProduct && <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />}

      <style>{`
        .filters-panel { display: flex; }
        @media (max-width: 980px) { .plp-product-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; } }
        @media (max-width: 900px) {
          .plp-grid { grid-template-columns: minmax(0, 1fr) !important; }
          .filters-toggle { display: flex !important; }
          .filters-panel {
            display: none;
            position: fixed; inset: 0; z-index: 300; background: white;
            padding: 24px; overflow-y: auto;
          }
          .filters-panel.open { display: flex !important; }
          .filters-mobile-header { display: flex !important; margin-bottom: 12px; }
        }
        @media (max-width: 480px) { .plp-product-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 12px !important; } }
      `}</style>
    </div>
  );
}

function FilterBlock({ title, children }) {
  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: "var(--ink)" }}>{title}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{children}</div>
    </div>
  );
}

const checkboxRow = { display: "flex", alignItems: "center", gap: 10, cursor: "pointer" };
