/**
 * EmptyState.jsx
 *
 * Shown whenever a list has zero items — an empty ingredients table,
 * zero search results, etc. An empty screen should tell the user WHY
 * it's empty and, when possible, give them a next action (the optional
 * `action` slot), rather than just being blank.
 */
export default function EmptyState({ title = "Nothing here yet", description, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
      <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-ink-900/5">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 7h16M4 12h16M4 17h10" strokeLinecap="round" />
        </svg>
      </div>
      <p className="font-display text-base font-semibold text-ink-900">{title}</p>
      {description && <p className="max-w-xs text-sm text-ink-700/70">{description}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}
