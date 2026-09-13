/**
 * PageHeader.jsx
 *
 * WHY THIS EXISTS:
 * Almost every page starts with the same shape: a title, an optional
 * description, and optional action buttons on the right (like "+ Add
 * Ingredient"). Extracting this means every page's header lines up
 * pixel-for-pixel instead of drifting apart over time.
 */
export default function PageHeader({ title, description, actions }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900">{title}</h1>
        {description && <p className="mt-1 text-sm text-ink-700/70">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}
