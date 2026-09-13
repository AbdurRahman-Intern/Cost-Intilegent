/**
 * ProfitabilityTable.jsx
 * A ranked table (adds a "#" rank column, since order carries meaning
 * here — it IS the point of this page, unlike most tables in the app).
 */
import { Link } from "react-router-dom";
import Badge from "../../../components/ui/Badge.jsx";
import EmptyState from "../../../components/ui/EmptyState.jsx";
import { formatCurrency, formatPercentage } from "../../../utils/formatters.js";
import { classifyMarginHealth } from "../../../utils/calculations.js";

const HEALTH_VARIANT = { healthy: "success", warning: "warning", low: "danger" };

export default function ProfitabilityTable({ items }) {
  if (items.length === 0) {
    return <EmptyState title="No items match this filter" description="Try a different filter." />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wide text-ink-700/50">
            <th className="px-4 py-3 font-medium">#</th>
            <th className="px-4 py-3 font-medium">Menu Item</th>
            <th className="px-4 py-3 font-medium">Cost</th>
            <th className="px-4 py-3 font-medium">Price</th>
            <th className="px-4 py-3 font-medium">Profit</th>
            <th className="px-4 py-3 font-medium">Margin</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id} className="border-t border-ink-900/6">
              <td className="px-4 py-3 text-ink-700/50">{index + 1}</td>
              <td className="px-4 py-3 font-medium text-ink-900">
                <Link to={`/menu-items/${item.id}`} className="hover:text-gold-600 hover:underline">
                  {item.name}
                </Link>
              </td>
              <td className="px-4 py-3 text-ink-700/80">{formatCurrency(item.cost)}</td>
              <td className="px-4 py-3 text-ink-700/80">{formatCurrency(item.sellingPrice)}</td>
              <td className="px-4 py-3 font-medium text-profit-600">{formatCurrency(item.profit)}</td>
              <td className="px-4 py-3">
                <Badge variant={HEALTH_VARIANT[classifyMarginHealth(item.margin)]}>{formatPercentage(item.margin)}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
