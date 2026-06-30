export function formatINR(amount) {
  return `₹${Number(amount).toLocaleString("en-IN")}`;
}

export function discountPercent(mrp, price) {
  if (!mrp || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}
