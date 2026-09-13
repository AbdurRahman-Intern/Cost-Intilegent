/**
 * LoadingSpinner.jsx
 *
 * WHY A SHARED SPINNER MATTERS:
 * Every React Query hook exposes an `isLoading` flag (see the "four
 * states" explained in features/dashboard/hooks/useDashboard.js). This
 * component is what every page renders while that flag is true, so
 * loading feels consistent everywhere instead of each page inventing
 * its own spinner.
 */
export default function LoadingSpinner({ label = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-ink-700/60">
      <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-gold-500 border-t-transparent" />
      <span className="text-sm">{label}</span>
    </div>
  );
}
