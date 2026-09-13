/**
 * CostBreakdown.jsx
 * Shown on the Menu Item Details page: every ingredient line plus any
 * flat extra costs (packaging, sauces), then the totals. Splitting this
 * out of the details page keeps that page focused on layout/composition
 * rather than the breakdown's row-by-row rendering logic.
 */
import Card from "../../../components/ui/Card.jsx";
import { formatCurrency } from "../../../utils/formatters.js";
import { calculateIngredientLineCost } from "../../../utils/calculations.js";

export default function CostBreakdown({ recipe, extraCosts, ingredientsById, sellingPrice, totalCost, grossProfit, margin }) {
  return (
    <Card padded={false}>
      <div className="border-b border-ink-900/8 p-5 sm:p-6">
        <h3 className="font-display text-base font-semibold text-ink-900">Cost Breakdown</h3>
      </div>
      <ul className="divide-y divide-ink-900/6">
        {recipe?.items.map((line) => {
          const ingredient = ingredientsById[line.ingredientId];
          if (!ingredient) return null;
          return (
            <li key={line.id} className="flex items-center justify-between px-5 py-3 sm:px-6">
              <span className="text-sm text-ink-900">{ingredient.name}</span>
              <span className="text-sm text-ink-700/80">
                {formatCurrency(calculateIngredientLineCost(ingredient, line.quantity, line.unit))}
              </span>
            </li>
          );
        })}
        {extraCosts.map((extra) => (
          <li key={extra.label} className="flex items-center justify-between px-5 py-3 sm:px-6">
            <span className="text-sm text-ink-900">{extra.label}</span>
            <span className="text-sm text-ink-700/80">{formatCurrency(extra.amount)}</span>
          </li>
        ))}
      </ul>
      <div className="space-y-2 border-t border-ink-900/8 px-5 py-4 sm:px-6">
        <Row label="Total Cost" value={formatCurrency(totalCost)} />
        <Row label="Selling Price" value={formatCurrency(sellingPrice)} />
        <Row label="Gross Profit" value={formatCurrency(grossProfit)} strong className="text-profit-600" />
        <Row label="Profit Margin" value={`${margin.toFixed(1)}%`} strong />
      </div>
    </Card>
  );
}

function Row({ label, value, strong, className = "" }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-sm ${strong ? "font-semibold text-ink-900" : "text-ink-700/70"}`}>{label}</span>
      <span className={`text-sm ${strong ? "font-semibold" : ""} ${className || "text-ink-900"}`}>{value}</span>
    </div>
  );
}
