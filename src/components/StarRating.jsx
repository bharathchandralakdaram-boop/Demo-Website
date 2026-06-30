import React from "react";

export default function StarRating({ rating = 0, count, size = 14, showCount = true }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.4 && rating - full < 0.9;

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <div style={{ display: "inline-flex", gap: 1 }} aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < full;
          const half = !filled && i === full && hasHalf;
          return (
            <svg key={i} width={size} height={size} viewBox="0 0 20 20">
              <defs>
                <linearGradient id={`star-half-${i}`}>
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="50%" stopColor="#E2E8F0" />
                </linearGradient>
              </defs>
              <path
                d="M10 1.5l2.6 5.6 6 .7-4.5 4.1 1.2 6L10 14.9 4.7 17.9l1.2-6L1.4 7.8l6-.7L10 1.5z"
                fill={filled ? "#F59E0B" : half ? `url(#star-half-${i})` : "#E2E8F0"}
              />
            </svg>
          );
        })}
      </div>
      <span className="visually-hidden">{rating} out of 5 stars</span>
      {showCount && count != null && (
        <span style={{ fontSize: 13, color: "var(--ink-faint)" }}>({count})</span>
      )}
    </div>
  );
}
