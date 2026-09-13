/**
 * IngredientTable.jsx
 *
 * PURPOSE:
 * Displays a reusable table of ingredients with edit/delete actions.
 *
 * WHY THIS EXISTS AS ITS OWN COMPONENT:
 * Keeping the table separate from IngredientsPage prevents that page
 * from becoming a huge file, and means the table markup could be reused
 * elsewhere later (e.g. a "pick an ingredient" list) without dragging
 * page-level state (search, modals) along with it.
 *
 * DATA FLOW:
 *   IngredientsPage (owns search/filter state)
 *          ↓ passes filtered array + callbacks down as props
 *   IngredientTable (pure — just renders what it's given)
 */
import { Link } from "react-router-dom";
import Badge from "../../../components/ui/Badge.jsx";
import EmptyState from "../../../components/ui/EmptyState.jsx";
import { formatCurrency, formatDate, formatSignedPercentage } from "../../../utils/formatters.js";
import { calculatePriceChange } from "../../../utils/calculations.js";

export default function IngredientTable({ ingredients, onEdit, onDelete }) {
  if (ingredients.length === 0) {
    return <EmptyState title="No ingredients found" description="Try a different search, or add a new ingredient." />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wide text-ink-700/50">
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Unit</th>
            <th className="px-4 py-3 font-medium">Current Price</th>
            <th className="px-4 py-3 font-medium">Change</th>
            <th className="px-4 py-3 font-medium">Supplier</th>
            <th className="px-4 py-3 font-medium">Last Updated</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient) => {
            const change = calculatePriceChange(ingredient.previousPrice, ingredient.currentPrice);
            return (
              <tr key={ingredient.id} className="border-t border-ink-900/6">
                <td className="px-4 py-3 font-medium text-ink-900">
                  <Link to={`/ingredients/${ingredient.id}`} className="hover:text-gold-600 hover:underline">
                    {ingredient.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-ink-700/80">{ingredient.unit}</td>
                <td className="px-4 py-3 text-ink-700/80">{formatCurrency(ingredient.currentPrice)}</td>
                <td className="px-4 py-3">
                  {change !== 0 && (
                    <Badge variant={change > 0 ? "danger" : "success"}>{formatSignedPercentage(change)}</Badge>
                  )}
                </td>
                <td className="px-4 py-3 text-ink-700/80">{ingredient.supplier}</td>
                <td className="px-4 py-3 text-ink-700/60">{formatDate(ingredient.lastUpdated)}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-3">
                    <button onClick={() => onEdit(ingredient)} className="text-xs font-medium text-ink-700 hover:text-ink-900">
                      Edit
                    </button>
                    <button onClick={() => onDelete(ingredient)} className="text-xs font-medium text-loss-500 hover:text-loss-600">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
