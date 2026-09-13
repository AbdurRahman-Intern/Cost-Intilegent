/**
 * ProfitabilityFilters.jsx
 * The filter pill row (All / Healthy / Warning / Low Profit) and the
 * sort dropdown. Pure presentational component — ProfitabilityPage owns
 * the actual filter/sort STATE and passes it down, this just renders
 * buttons that call back up when clicked.
 */
const FILTERS = [
  { value: "all", label: "All" },
  { value: "healthy", label: "Healthy" },
  { value: "warning", label: "Warning" },
  { value: "low", label: "Low Profit" },
];

const SORTS = [
  { value: "profit-desc", label: "Highest Profit" },
  { value: "profit-asc", label: "Lowest Profit" },
  { value: "margin-desc", label: "Highest Margin" },
  { value: "margin-asc", label: "Lowest Margin" },
];

export default function ProfitabilityFilters({ filter, onFilterChange, sort, onSortChange }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors
              ${filter === f.value ? "bg-ink-900 text-white" : "bg-ink-900/5 text-ink-700 hover:bg-ink-900/10"}`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="rounded-lg border border-ink-900/15 bg-white px-3 py-2 text-sm text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
      >
        {SORTS.map((s) => (
          <option key={s.value} value={s.value}>
            Sort: {s.label}
          </option>
        ))}
      </select>
    </div>
  );
}
