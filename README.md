# Anya's RRR — Website (Frontend Prototype)

A premium e-commerce frontend for **Anya's RRR**, a household cleaning brand manufactured
by Sree Raghavendra Enterprises (Dornala, Prakasam district, Andhra Pradesh). Built with
React, using your real product photography throughout.

---

## How to open it

**Easiest:** double-click `public/index.html` — no install, no build step. It runs entirely
in the browser using a pre-built bundle (`bundle.js` / `bundle.css`).

**If you change any code in `src/`**, you'll need to rebuild the bundle. See "Rebuilding"
below.

---

## What's real

- **All 27 product photos** are your actual uploaded images, organized by product/variant.
- **Product catalog** (`src/data/products.js`) — names, fragrances, sizes, and MRPs were
  read directly off your product labels wherever visible (marked `// [from label]` in
  comments). Anything I couldn't read off a label (long descriptions, "how to use" detail
  beyond what's printed, review counts, stock numbers) is placeholder copy, clearly meant
  to be replaced with real copy.
- **Pages built and working:** Home, Product Listing (with category/price/sort filters),
  Product Detail (gallery, variants, tabs, related products, recently viewed), Cart
  (coupon codes, live totals), multi-step Checkout (address → payment → review → confirm),
  Wishlist, Account (mock OTP login UI), About, Contact, FAQ, Privacy, Terms.
- **AI Assistant ("Anya AI Assistant")** — a floating chat widget with rule-based replies
  about products, bathrooms, floors, dishwashing, laundry, offers, delivery, and returns.
  It's not a real LLM; it pattern-matches keywords. Good enough to demo, not to ship as-is.

## What's mocked (and why)

This was built in a sandboxed environment with **no live backend, no database, and no
internet access for installing packages** — so the parts of the original brief that need
real infrastructure are built as realistic-looking UI only:

| Feature | Status |
|---|---|
| Firebase phone/OTP login | UI is fully built and walks through the OTP flow, but it's fake — any 4 digits log you in. No real Firebase project is connected. |
| Checkout / payment | Multi-step flow is fully functional, but "Place order" doesn't charge anything or hit a server — it's a 1.5s simulated delay then a confirmation screen. |
| Cart / wishlist persistence | Stored in the browser's `sessionStorage`, so it survives a refresh but not a closed tab, and isn't shared across devices. |
| Admin dashboard | **Not built** — by your own scoping decision, this round focused on the shopper-facing site only. |
| Node/Express/MongoDB backend | **Not built** — there's no server. All product data lives in `src/data/products.js`. |
| Order tracking, order history, email confirmation | UI placeholders only ("no orders yet" state) — there's nowhere for orders to actually go yet. |
| Reviews | Sample reviews on the Product Detail page are placeholder text, clearly labeled as such. |
| Google Maps on Contact page | Static placeholder box — needs a real Maps API key to embed live. |

None of this is hidden — every mocked feature says so directly in its own UI (e.g. "This is
a demo checkout — no real payment has been processed").

## Why no Vite/npm build step

This environment has no internet access, so I couldn't run `npm create vite` or install
packages from the registry. Instead, I used a pre-installed copy of **esbuild** to bundle
the real React source files in `src/` into the single `bundle.js` you see in `public/`.
The `src/` folder is genuine, readable, component-based React — it's not minified or
obfuscated, and it's structured the way a normal Vite/CRA project would be:

```
src/
  components/   — reusable UI (Header, Footer, ProductCard, AIAssistant, etc.)
  pages/        — one file per route (HomePage, ProductDetailPage, CheckoutPage, etc.)
  context/      — cart state, routing, toast notifications
  data/         — the product catalog
  utils/        — formatting helpers
  tokens.css    — design system (colors, spacing, shadows, fonts)
```

A developer can drop this `src/` folder straight into a fresh Vite project (`npm create
vite@latest -- --template react`) and it should work with minimal changes — the main thing
to add would be `react-router-dom` (this build uses a small hand-rolled hash router
instead, to avoid needing a package registry).

## Rebuilding the bundle after edits

If you have Node.js and internet access locally:

```bash
npm install esbuild --save-dev
npx esbuild src/main.jsx --bundle --outfile=public/bundle.js \
  --loader:.js=jsx --jsx=automatic --format=iife
```

(Or just set it up as a normal Vite project — that's the more future-proof path once
you're ready to add a real backend.)

## Design notes

- Palette follows the brief's greens (`#16A34A` primary), with product-card and category
  accents pulled from the real label colors (Cleaneo blue, Vibe yellow, etc.) so the site
  feels tied to the actual products rather than one flat color wash.
- Glassmorphism is used on the nav, cart/coupon panel, quick-view modal, and chat widget.
- The hero product photo is a real photo of your Swish Floor Cleaner bottle, given a soft
  vignette fade to clean up the busy warehouse background — it's honestly the same photo,
  just treated for a hero placement.
- Fully responsive — tested down to a 390px mobile viewport (filters drawer, collapsing
  nav, single-column layouts on cart/checkout/PDP, etc.)

## Known limitations / next steps for a developer

- Bundle is ~1.3MB unminified (includes all of `react-icons`). A real Vite build with
  tree-shaking and minification would cut this significantly.
- No automated tests included.
- Third-party products visible in your uploaded photos (Swipol, Fragfull, Trick Clean)
  were intentionally **excluded** from the catalog, since their labels show different
  manufacturers — only genuine "Anya's RRR" branded products (Cleaneo, Swish, Lush, Vibe,
  Wipe, RRR Soap Oil) are listed for sale.
- Legal pages (Privacy, Terms) are structural drafts only — have them reviewed by a
  professional before publishing live.
