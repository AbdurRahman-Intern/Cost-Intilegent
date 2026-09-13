/**
 * TopProfitableItemsTable.jsx
 * A read-only, dashboard-sized preview of the profitability ranking
 * (the full, filterable/sortable version lives on the Profitability
 * page — see features/profitability/ProfitabilityPage.jsx). Splitting
 * these two keeps this component simple: it just renders a list it's
 * given, no filtering/sorting logic duplicated here.
 */
import Card from "../../../components/ui/Card.jsx";
import Badge from "../../../components/ui/Badge.jsx";
import { formatCurrency, formatPercentage } from "../../../utils/formatters.js";
import { classifyMarginHealth } from "../../../utils/calculations.js";

const HEALTH_VARIANT = { healthy: "success", warning: "warning", low: "danger" };

export default function TopProfitableItemsTable({ items }) {
  return (
    <Card padded={false}>
      <div className="border-b border-ink-900/8 p-5 sm:p-6">
        <h3 className="font-display text-base font-semibold text-ink-900">Top Profitable Items</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-ink-700/50">
              <th className="px-5 py-3 font-medium sm:px-6">Menu Item</th>
              <th className="px-5 py-3 font-medium sm:px-6">Cost</th>
              <th className="px-5 py-3 font-medium sm:px-6">Price</th>
              <th className="px-5 py-3 font-medium sm:px-6">Profit</th>
              <th className="px-5 py-3 font-medium sm:px-6">Margin</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-ink-900/6">
                <td className="px-5 py-3 font-medium text-ink-900 sm:px-6">{item.name}</td>
                <td className="px-5 py-3 text-ink-700/80 sm:px-6">{formatCurrency(item.cost)}</td>
                <td className="px-5 py-3 text-ink-700/80 sm:px-6">{formatCurrency(item.sellingPrice)}</td>
                <td className="px-5 py-3 font-medium text-profit-600 sm:px-6">{formatCurrency(item.profit)}</td>
                <td className="px-5 py-3 sm:px-6">
                  <Badge variant={HEALTH_VARIANT[classifyMarginHealth(item.margin)]}>
                    {formatPercentage(item.margin)}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
