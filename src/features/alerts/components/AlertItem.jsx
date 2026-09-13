/**
 * AlertItem.jsx
 * One row in the Alerts list, with Mark as Read / Dismiss actions. Kept
 * dumb on purpose: it just calls the callbacks it's given and lets
 * AlertsPage decide what those callbacks actually do (call a mutation).
 */
const PRIORITY_META = {
  high: { dot: "bg-loss-500", label: "High Priority" },
  medium: { dot: "bg-gold-500", label: "Medium Priority" },
  low: { dot: "bg-ink-700/40", label: "Low Priority" },
};

export default function AlertItem({ alert, onMarkRead, onDismiss }) {
  const meta = PRIORITY_META[alert.priority];
  return (
    <li className={`flex items-start justify-between gap-4 border-b border-ink-900/6 px-5 py-4 sm:px-6 ${alert.read ? "opacity-60" : ""}`}>
      <div className="flex items-start gap-3">
        <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${meta.dot}`} />
        <div>
          <p className="text-sm font-medium text-ink-900">{alert.title}</p>
          <p className="mt-0.5 text-xs text-ink-700/60">{alert.description}</p>
        </div>
      </div>
      <div className="flex shrink-0 gap-3">
        {!alert.read && (
          <button onClick={() => onMarkRead(alert.id)} className="text-xs font-medium text-ink-700 hover:text-ink-900">
            Mark as read
          </button>
        )}
        <button onClick={() => onDismiss(alert.id)} className="text-xs font-medium text-loss-500 hover:text-loss-600">
          Dismiss
        </button>
      </div>
    </li>
  );
}
