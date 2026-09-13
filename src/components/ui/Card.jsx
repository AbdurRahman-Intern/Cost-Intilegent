/**
 * Card.jsx
 * The generic content container used across almost every page. Keeping
 * border/radius/padding here means the whole app's "surface" look stays
 * consistent even as pages are built independently.
 */
export default function Card({ children, className = "", padded = true }) {
  return (
    <div
      className={`rounded-xl border border-ink-900/8 bg-white shadow-soft
        ${padded ? "p-5 sm:p-6" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
