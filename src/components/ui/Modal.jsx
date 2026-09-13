/**
 * Modal.jsx
 *
 * PURPOSE:
 * A reusable dialog overlay. IngredientForm, RecipeForm, and
 * ConfirmModal all render INSIDE one of these rather than each building
 * their own overlay/positioning/close logic.
 *
 * WHY children INSTEAD OF SPECIFIC PROPS FOR CONTENT:
 * Using `children` (React's composition model) means Modal doesn't need
 * to know anything about what it contains — it could be a form, a
 * confirmation message, or a details view. This is the same pattern
 * React itself uses for layout components.
 */
export default function Modal({ open, title, onClose, children, size = "md" }) {
  if (!open) return null;

  const sizeClasses = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl" };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop: clicking it closes the modal, same as clicking the X. */}
      <div className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm" onClick={onClose} />

      <div
        className={`relative w-full ${sizeClasses[size]} rounded-2xl bg-white p-6 shadow-xl`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 id="modal-title" className="font-display text-lg font-semibold text-ink-900">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1.5 text-ink-700/60 hover:bg-ink-900/5 hover:text-ink-900"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
