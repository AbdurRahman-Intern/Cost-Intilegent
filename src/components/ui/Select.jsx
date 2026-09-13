/**
 * Select.jsx
 * A labeled <select>, styled to match Input.jsx. `options` accepts either
 * an array of strings or an array of { value, label } objects — this
 * flexibility means callers don't have to reshape their data just to use
 * this component (see IngredientForm's Unit dropdown for both usages).
 */
export default function Select({ label, error, options = [], id, className = "", ...rest }) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-ink-800">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`rounded-lg border bg-white px-3.5 py-2.5 text-sm text-ink-900
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500
          ${error ? "border-loss-500" : "border-ink-900/15"} ${className}`}
        {...rest}
      >
        {options.map((option) => {
          const value = typeof option === "string" ? option : option.value;
          const label_ = typeof option === "string" ? option : option.label;
          return (
            <option key={value} value={value}>
              {label_}
            </option>
          );
        })}
      </select>
      {error && <span className="text-xs text-loss-500">{error}</span>}
    </div>
  );
}
