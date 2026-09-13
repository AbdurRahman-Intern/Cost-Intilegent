/**
 * Input.jsx
 *
 * A labeled text input with a built-in error message slot. Wrapping the
 * native <input> lets every form in the app (IngredientForm, RecipeForm,
 * MenuItemForm, Settings...) share the same label/spacing/error styling
 * without repeating it.
 */
export default function Input({ label, error, id, className = "", ...rest }) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-ink-800">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`rounded-lg border px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-700/40
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500
          ${error ? "border-loss-500" : "border-ink-900/15"} ${className}`}
        {...rest}
      />
      {error && <span className="text-xs text-loss-500">{error}</span>}
    </div>
  );
}
