/**
 * SearchInput.jsx
 * A text input with a search icon, used at the top of every list page
 * (Ingredients, Recipes, Menu Items). Kept "controlled" — the parent
 * owns the value/onChange — so each page decides how to use the typed
 * text (usually to filter a list with useMemo; see
 * features/ingredients/hooks/useIngredients.js).
 */
export default function SearchInput({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="relative w-full sm:w-72">
      <svg
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-700/40"
        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-ink-900/15 bg-white py-2.5 pl-9 pr-3.5 text-sm
          text-ink-900 placeholder:text-ink-700/40 focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-gold-500"
      />
    </div>
  );
}
