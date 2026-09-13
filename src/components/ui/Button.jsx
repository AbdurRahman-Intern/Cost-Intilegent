/**
 * Button.jsx
 *
 * WHY THIS EXISTS:
 * Every button in the app should look and behave consistently. Instead
 * of typing the same Tailwind classes on every <button> in the codebase,
 * we define the variants ONCE here. Changing the brand's primary color
 * later means editing one object, not fifty JSX files.
 */
const VARIANT_CLASSES = {
  primary: "bg-ink-900 text-white hover:bg-ink-800 focus-visible:ring-ink-900",
  gold: "bg-gold-500 text-white hover:bg-gold-600 focus-visible:ring-gold-500",
  secondary: "bg-white text-ink-900 border border-ink-900/15 hover:bg-paper",
  danger: "bg-loss-500 text-white hover:bg-loss-600 focus-visible:ring-loss-500",
  ghost: "bg-transparent text-ink-700 hover:bg-ink-900/5",
};

const SIZE_CLASSES = {
  sm: "text-sm px-3 py-1.5",
  md: "text-sm px-4 py-2.5",
  lg: "text-base px-5 py-3",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  type = "button",
  className = "",
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium
        transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
      {...rest}
    >
      {loading && (
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  );
}
