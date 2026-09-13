/**
 * AttentionRequiredList.jsx
 * A compact preview of the highest-priority alerts on the Dashboard.
 * The full alert management experience (filter/mark read/dismiss) lives
 * on the Alerts page — this component intentionally does none of that,
 * it just displays what it's given.
 */
import { Link } from "react-router-dom";
import Card from "../../../components/ui/Card.jsx";

const PRIORITY_DOT = { high: "bg-loss-500", medium: "bg-gold-500", low: "bg-ink-700/40" };

export default function AttentionRequiredList({ alerts }) {
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-base font-semibold text-ink-900">Attention Required</h3>
        <Link to="/alerts" className="text-xs font-medium text-gold-600 hover:underline">
          View all
        </Link>
      </div>
      <ul className="space-y-3">
        {alerts.map((alert) => (
          <li key={alert.id} className="flex items-start gap-3">
            <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${PRIORITY_DOT[alert.priority]}`} />
            <div>
              <p className="text-sm font-medium text-ink-900">{alert.title}</p>
              <p className="text-xs text-ink-700/60">{alert.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
