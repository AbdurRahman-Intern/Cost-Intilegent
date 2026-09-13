/**
 * StatCard.jsx
 *
 * The big-number cards on the Dashboard ("Total Ingredients", "Most
 * Profitable Item", etc.). `change` is optional — pass a signed string
 * like "+14%" and it's colored automatically based on its sign, so the
 * Dashboard doesn't have to decide "is up good or bad" every time (it
 * isn't, always — see the `invertChangeColor` prop for cost-type stats
 * where a decrease is the good direction).
 */
export default function StatCard({ title, value, change, icon, invertChangeColor = false }) {
  const isPositive = typeof change === "string" && change.trim().startsWith("+");
  const isNegative = typeof change === "string" && change.trim().startsWith("-");
  const goodDirection = invertChangeColor ? isNegative : isPositive;

  return (
    <div className="rounded-xl border border-ink-900/8 bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-ink-700/70">{title}</p>
        {icon && <span className="text-gold-500">{icon}</span>}
      </div>
      <p className="mt-2 font-display text-2xl font-semibold text-ink-900">{value}</p>
      {change && (
        <p className={`mt-1 text-xs font-medium ${goodDirection ? "text-profit-500" : "text-loss-500"}`}>
          {change}
        </p>
      )}
    </div>
  );
}
