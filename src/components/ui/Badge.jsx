/**
 * Badge.jsx
 * A small status pill. Variants map directly to the business meaning
 * they represent (a "danger" badge always means something needs urgent
 * attention), so callers pick the variant based on meaning, not color.
 */
const VARIANT_CLASSES = {
  success: "bg-profit-50 text-profit-600",
  warning: "bg-gold-50 text-gold-600",
  danger: "bg-loss-50 text-loss-600",
  info: "bg-ink-900/5 text-ink-700",
};

export default function Badge({ children, variant = "info", className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium
        ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
