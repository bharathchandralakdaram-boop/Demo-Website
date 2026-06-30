import React, { useState } from "react";
import Hero from "../components/Hero.jsx";
import CategoryGrid from "../components/CategoryGrid.jsx";
import ProductRail from "../components/ProductRail.jsx";
import FlashSaleBanner from "../components/FlashSaleBanner.jsx";
import Testimonials from "../components/Testimonials.jsx";
import Newsletter from "../components/Newsletter.jsx";
import QuickView from "../components/QuickView.jsx";
import { products } from "../data/products.js";

export default function HomePage() {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const bestSellers = products.filter((p) => p.badges?.includes("Bestseller"));
  const newArrivals = [...products].slice(2, 6);
  const dealsOfTheDay = [...products]
    .map((p) => ({ p, d: p.variants[0].mrp - p.variants[0].price }))
    .sort((a, b) => b.d - a.d)
    .slice(0, 4)
    .map((x) => x.p);

  return (
    <>
      <Hero />
      <CategoryGrid />
      <ProductRail
        eyebrow="Loved by households"
        title="Bestsellers"
        products={bestSellers}
        onQuickView={setQuickViewProduct}
        viewAllPath="/products"
      />
      <FlashSaleBanner />
      <ProductRail
        eyebrow="Today's deals"
        title="Best value right now"
        products={dealsOfTheDay}
        onQuickView={setQuickViewProduct}
        viewAllPath="/products"
      />
      <ProductRail
        eyebrow="Just in"
        title="New & noteworthy"
        products={newArrivals}
        onQuickView={setQuickViewProduct}
        viewAllPath="/products"
      />
      <Testimonials />
      <Newsletter />

      {quickViewProduct && (
        <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
    </>
  );
}
