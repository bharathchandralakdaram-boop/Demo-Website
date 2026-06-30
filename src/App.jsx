import React from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import AIAssistant from "./components/AIAssistant.jsx";
import { WhatsAppButton, BackToTop } from "./components/FloatingButtons.jsx";
import { useRouter } from "./context/RouterContext.jsx";

import HomePage from "./pages/HomePage.jsx";
import ProductListingPage from "./pages/ProductListingPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import WishlistPage from "./pages/WishlistPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import FAQPage from "./pages/FAQPage.jsx";
import PrivacyPage from "./pages/PrivacyPage.jsx";
import TermsPage from "./pages/TermsPage.jsx";

function NotFound() {
  const { navigate } = useRouter();
  return (
    <div className="container" style={{ padding: "100px 24px", textAlign: "center" }}>
      <h1 style={{ fontSize: 64, fontWeight: 800, color: "var(--primary)" }}>404</h1>
      <p style={{ fontSize: 16, color: "var(--ink-soft)", marginBottom: 24 }}>This page doesn't exist.</p>
      <button
        onClick={() => navigate("/")}
        style={{ background: "var(--primary)", color: "white", border: "none", borderRadius: "var(--r-pill)", padding: "12px 26px", fontWeight: 700, cursor: "pointer" }}
      >
        Go home
      </button>
    </div>
  );
}

export default function App() {
  const { path, params } = useRouter();
  const segments = path.split("/").filter(Boolean);

  let page;
  if (path === "/") {
    page = <HomePage />;
  } else if (segments[0] === "products") {
    page = <ProductListingPage />;
  } else if (segments[0] === "category" && segments[1]) {
    page = <ProductListingPage categoryId={segments[1]} />;
  } else if (segments[0] === "product" && segments[1]) {
    page = <ProductDetailPage productId={segments[1]} />;
  } else if (segments[0] === "search") {
    page = <ProductListingPage searchQuery={params.get("q") || ""} />;
  } else if (path === "/cart") {
    page = <CartPage />;
  } else if (path === "/checkout") {
    page = <CheckoutPage />;
  } else if (path === "/wishlist") {
    page = <WishlistPage />;
  } else if (path === "/account") {
    page = <AccountPage />;
  } else if (path === "/about") {
    page = <AboutPage />;
  } else if (path === "/contact") {
    page = <ContactPage />;
  } else if (path === "/faq") {
    page = <FAQPage />;
  } else if (path === "/privacy") {
    page = <PrivacyPage />;
  } else if (path === "/terms") {
    page = <TermsPage />;
  } else {
    page = <NotFound />;
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <main style={{ flex: 1 }}>{page}</main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
      <AIAssistant />
    </div>
  );
}
