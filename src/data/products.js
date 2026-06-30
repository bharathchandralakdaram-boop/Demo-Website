// Anya's RRR product catalog.
// MRPs and claims marked [from label] are read directly off the product photography.
// Everything else (long descriptions, ingredients, how-to-use detail beyond the label,
// stock counts, ratings) is placeholder copy — clearly editable — until real copy is supplied.

export const categories = [
  { id: "toilet", name: "Toilet Cleaners", icon: "toilet", color: "#2563EB" },
  { id: "floor", name: "Floor Cleaners", icon: "floor", color: "#16A34A" },
  { id: "laundry", name: "Laundry", icon: "laundry", color: "#0EA5E9" },
  { id: "dishwash", name: "Dish Wash", icon: "dish", color: "#EAB308" },
  { id: "glass", name: "Glass & Surface", icon: "glass", color: "#0891B2" },
  { id: "multipurpose", name: "Multipurpose", icon: "multi", color: "#D97706" },
];

// Helper to build the public image path
const img = (name) => `/images/${name}`;

export const products = [
  {
    id: "cleaneo-toilet-cleaner",
    name: "Cleaneo Disinfectant Toilet Cleaner",
    brand: "Anya's RRR",
    category: "toilet",
    tagline: "Advanced germicide formula", // [from label]
    description:
      "A deep-action disinfectant toilet cleaner built around an advanced germicide formula. Formulated to cut through limescale and everyday toilet stains while leaving bathrooms smelling clean, not chemical.",
    benefits: [
      "Removes unpleasant odours", // [from label]
      "Removes 100% limescale", // [from label]
      "Removes tough stains", // [from label]
      "Kills all germs*", // [from label]
      "Suitable for all toilet bowls and does not affect your septic tank", // [from label, 1L pack]
    ],
    howToUse:
      "Squeeze the cleaner liquid around the toilet bowl, just under the rim. Leave for 2-4 minutes, then brush and flush. Kills germs in 60 minutes when used undiluted. Safe for Indian and Western style toilets.", // [from label]
    caution:
      "For external use only. Don't mix with other household cleaners or acids. Keep out of reach of children. Avoid contact with eyes; in case of accidental contact, wash eyes with plenty of water and seek medical advice.", // [from label]
    rating: 4.3,
    reviewCount: 128,
    variants: [
      { id: "500ml", label: "500 ml", mrp: 89, price: 79, image: img("cleaneo-toilet-500ml-1.jpg") },
      { id: "1l", label: "1 L", mrp: 169, price: 149, image: img("cleaneo-toilet-1l-1.jpg") }, // MRP 169 [from label]
      { id: "5l", label: "5 L (Value Pack)", mrp: 799, price: 699, image: img("cleaneo-toilet-5l-1.jpg") },
    ],
    images: [
      img("cleaneo-toilet-1l-1.jpg"),
      img("cleaneo-toilet-1l-3.jpg"),
      img("cleaneo-toilet-1l-4.jpg"),
      img("cleaneo-toilet-5l-1.jpg"),
      img("cleaneo-toilet-5l-2.jpg"),
      img("cleaneo-toilet-500ml-1.jpg"),
    ],
    badges: ["Bestseller", "Kills 99.9% Germs"],
    tags: ["toilet", "bathroom", "disinfectant", "limescale"],
  },
  {
    id: "swish-lemon-lavender",
    name: "Swish Floor Cleaner — Lemon & Lavender",
    brand: "Anya's RRR",
    category: "floor",
    tagline: "10X cleaning & germ kill", // [from label]
    description:
      "An everyday floor cleaner with a bright lemon and lavender fragrance. Works on ceramic, marble, granite and mosaic floors, and doubles up for kitchen surfaces and bathroom floors.",
    benefits: [
      "10X cleaning & germ kill", // [from label]
      "Safe on ceramic, marble, granite and mosaic", // [from label]
      "Long-lasting lemon & lavender fragrance",
      "Cuts grease on kitchen surfaces",
    ],
    howToUse:
      "For floor or bathroom surfaces: add a capful to half a bucket of water, gently mop the surface and leave. For kitchen surfaces: apply undiluted, leave for 10 minutes, then rinse off.", // [from label]
    caution:
      "For external use only. Don't mix with other household cleaners or acids. Keep out of reach of children. Avoid contact with eyes; in case of accidental contact, wash eyes with plenty of water and seek medical advice.", // [from label]
    rating: 4.5,
    reviewCount: 214,
    variants: [
      { id: "1l", label: "1 L", mrp: 169, price: 149, image: img("swish-lemonlavender-1l-1.jpg") }, // MRP 169 [from label]
      { id: "5l", label: "5 L (Value Pack)", mrp: 750, price: 499, image: img("swish-lemonlavender-5l-1.jpg") }, // MRP 750, price 499 [from label]
    ],
    images: [
      img("swish-lemonlavender-5l-1.jpg"),
      img("swish-lemonlavender-1l-1.jpg"),
      img("swish-lemonlavender-1l-2.jpg"),
      img("swish-lemonlavender-5l-3.jpg"),
      img("swish-lemonlavender-1l-3.jpg"),
      img("swish-lemonlavender-5l-5.jpg"),
    ],
    badges: ["Most Loved", "10X Germ Kill"],
    tags: ["floor", "kitchen", "lemon", "lavender"],
  },
  {
    id: "swish-neem-tulasi",
    name: "Swish Floor Cleaner — Neem & Tulasi",
    brand: "Anya's RRR",
    category: "floor",
    tagline: "10X cleaning & germ kill", // [from label]
    description:
      "The same trusted Swish 10X formula in a neem and tulasi fragrance, for homes that prefer a herbal, traditional scent on their floors.",
    benefits: [
      "10X cleaning & germ kill", // [from label]
      "Neem & tulasi fragrance", // [from label]
      "Safe on ceramic, marble, granite and mosaic",
    ],
    howToUse:
      "Add a capful to half a bucket of water, mop the surface and leave to dry. Can be used on most hard floor surfaces.",
    caution:
      "For external use only. Keep out of reach of children. Avoid contact with eyes.",
    rating: 4.4,
    reviewCount: 76,
    variants: [
      { id: "1l", label: "1 L", mrp: 169, price: 149, image: img("swish-neemtulasi-1l-1.jpg") },
    ],
    images: [img("swish-neemtulasi-1l-1.jpg"), img("swish-neemtulasi-1l-2.jpg")],
    badges: ["Herbal"],
    tags: ["floor", "herbal", "neem", "tulasi"],
  },
  {
    id: "lush-matic-detergent",
    name: "Anya's Lush Matic Liquid Detergent",
    brand: "Anya's RRR",
    category: "laundry",
    tagline: "Safe on hands, safe on colours, safe on clothes", // [from label]
    description:
      "A liquid detergent for both top-load and front-load machines, as well as bucket wash. Designed to be gentle on hands and on coloured fabrics while still lifting everyday stains.",
    benefits: [
      "Refreshing fragrance", // [from label]
      "Safe on hands", // [from label]
      "Safe on colours", // [from label]
      "Safe on clothes", // [from label]
      "Works in bucket wash, top load and front load machines", // [from label]
    ],
    howToUse:
      "Bucket wash: 1 cap (40ml) for 1 bucket of clothes. Top load: 2 caps (80ml) for 1 full load of clothes. Front load: 1½ caps (60ml) for 1 full load of clothes.", // [from label]
    caution: "Keep out of reach of children. Avoid contact with eyes.",
    rating: 4.6,
    reviewCount: 302,
    variants: [
      { id: "1l", label: "1 L (25 washes)", mrp: 149, price: 129, image: img("lush-detergent-1l-1.jpg") }, // MRP 149, 25 washes [from label]
      { id: "5l", label: "5 L (125 washes)", mrp: 875, price: 749, image: img("lush-detergent-5l-1.jpg") }, // MRP 875, 125 washes [from label]
    ],
    images: [
      img("lush-detergent-5l-1.jpg"),
      img("lush-detergent-5l-2.jpg"),
      img("lush-detergent-1l-1.jpg"),
      img("lush-detergent-5l-3.jpg"),
    ],
    badges: ["Bestseller", "125 Washes"],
    tags: ["laundry", "detergent", "matic"],
  },
  {
    id: "vibe-dishwash-lemon",
    name: "Vibe Dish Wash Liquid — Lemon",
    brand: "Anya's RRR",
    category: "dishwash",
    tagline: "Extra shine & advanced protect", // [from label]
    description:
      "A lemon-fresh dishwashing liquid that cuts through grease while staying gentle on hands, with a new formula aimed at extra shine on steel and ceramic.",
    benefits: [
      "Removes food smell", // [from label]
      "Tough on grease", // [from label]
      "Soft on hands", // [from label]
      "Extra shine & advanced protect", // [from label]
    ],
    howToUse:
      "Apply a few drops directly onto a wet scrubber or sponge. Scrub dishes, utensils and cookware, then rinse thoroughly with water.",
    caution: "For dishwashing use only. Keep out of reach of children.",
    rating: 4.4,
    reviewCount: 189,
    variants: [
      { id: "250ml", label: "250 ml", mrp: 65, price: 55, image: img("vibe-dishwash-250ml-1.jpg") }, // 250ml [from label]
      { id: "1l", label: "1 L", mrp: 220, price: 189, image: img("vibe-dishwash-1l-1.jpg") },
    ],
    images: [
      img("vibe-dishwash-250ml-1.jpg"),
      img("vibe-dishwash-250ml-2.jpg"),
      img("vibe-dishwash-250ml-3.jpg"),
      img("vibe-dishwash-1l-1.jpg"),
    ],
    badges: ["New Formula"],
    tags: ["dishwash", "kitchen", "lemon"],
  },
  {
    id: "wipe-glass-cleaner",
    name: "Wipe Glass Cleaner",
    brand: "Anya's RRR",
    category: "glass",
    tagline: "Streak-free shine", // [from label]
    description:
      "A trigger-spray glass and surface cleaner formulated for a streak-free shine on windows, mirrors, and glass tabletops, with a light fresh fragrance.",
    benefits: ["5X shine", "Fresh fragrance", "Streak-free finish on glass and mirrors"], // [from label]
    howToUse:
      "Spray directly onto the glass surface from about 20cm away. Wipe with a clean, dry microfibre cloth or newspaper for a streak-free shine.",
    caution: "Keep out of reach of children. Avoid spraying near open flame or eyes.",
    rating: 4.2,
    reviewCount: 54,
    variants: [
      { id: "500ml", label: "500 ml (Spray)", mrp: 99, price: 85, image: img("wipe-glass-500ml-1.jpg") },
    ],
    images: [img("wipe-glass-500ml-1.jpg")],
    badges: ["Streak-Free"],
    tags: ["glass", "windows", "mirrors", "spray"],
  },
  {
    id: "rrr-soap-oil",
    name: "RRR Multipurpose Cleaning Soap Oil",
    brand: "Anya's RRR",
    category: "multipurpose",
    tagline: "One bottle, many jobs", // descriptive, not on label
    description:
      "A multipurpose cleaning soap oil that label photography shows being used for laundry, dishwashing, vehicle cleaning and even as a hair wash — a true do-it-all bottle for households that want one concentrate for several jobs.",
    benefits: [
      "Multipurpose cleaning concentrate", // [from label]
      "Usable for laundry, dishes, vehicle wash and more", // [from label, per product icons]
    ],
    howToUse:
      "Dilute with water according to the task — a smaller ratio for tougher cleaning jobs, a more diluted mix for everyday use. Test on a small area first for delicate surfaces.",
    caution: "Keep out of reach of children. Avoid contact with eyes.",
    rating: 4.1,
    reviewCount: 41,
    variants: [
      { id: "1l", label: "1 L", mrp: 119, price: 99, image: img("rrr-soapoil-1l-1.jpg") },
      { id: "5l", label: "5 L (Value Pack)", mrp: 530, price: 459, image: img("rrr-soapoil-1l-2.jpg") }, // MRP 530 [from label, 5L can]
    ],
    images: [img("rrr-soapoil-1l-1.jpg"), img("rrr-soapoil-1l-2.jpg"), img("rrr-soapoil-1l-3.jpg")],
    badges: ["Multipurpose"],
    tags: ["multipurpose", "soap oil", "utility"],
  },
];

export const getProductById = (id) => products.find((p) => p.id === id);
export const getProductsByCategory = (categoryId) =>
  products.filter((p) => p.category === categoryId);
