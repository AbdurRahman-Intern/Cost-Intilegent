/**
 * MenuItemTable.jsx
 * Lists menu items with their derived cost/profit/margin. Every number
 * shown here was computed once by useMenuItemsWithCosts — this table
 * never recalculates anything itself, it only formats and displays.
 */
import { Link } from "react-router-dom";
import Badge from "../../../components/ui/Badge.jsx";
import EmptyState from "../../../components/ui/EmptyState.jsx";
import { formatCurrency, formatPercentage } from "../../../utils/formatters.js";
import { classifyMarginHealth } from "../../../utils/calculations.js";

const HEALTH_VARIANT = { healthy: "success", warning: "warning", low: "danger" };

export default function MenuItemTable({ items, onEdit, onDelete }) {
  if (items.length === 0) {
    return <EmptyState title="No menu items found" description="Add a menu item to start tracking its profitability." />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wide text-ink-700/50">
            <th className="px-4 py-3 font-medium">Menu Item</th>
            <th className="px-4 py-3 font-medium">Selling Price</th>
            <th className="px-4 py-3 font-medium">Food Cost</th>
            <th className="px-4 py-3 font-medium">Gross Profit</th>
            <th className="px-4 py-3 font-medium">Margin</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t border-ink-900/6">
              <td className="px-4 py-3 font-medium text-ink-900">
                <Link to={`/menu-items/${item.id}`} className="hover:text-gold-600 hover:underline">
                  {item.name}
                </Link>
                <span className="ml-2 text-xs font-normal text-ink-700/50">{item.category}</span>
              </td>
              <td className="px-4 py-3 text-ink-700/80">{formatCurrency(item.sellingPrice)}</td>
              <td className="px-4 py-3 text-ink-700/80">{formatCurrency(item.cost)}</td>
              <td className="px-4 py-3 font-medium text-profit-600">{formatCurrency(item.profit)}</td>
              <td className="px-4 py-3">
                <Badge variant={HEALTH_VARIANT[classifyMarginHealth(item.margin)]}>{formatPercentage(item.margin)}</Badge>
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-3">
                  <button onClick={() => onEdit(item)} className="text-xs font-medium text-ink-700 hover:text-ink-900">
                    Edit
                  </button>
                  <button onClick={() => onDelete(item)} className="text-xs font-medium text-loss-500 hover:text-loss-600">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
