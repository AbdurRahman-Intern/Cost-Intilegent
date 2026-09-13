/**
 * RecipeTable.jsx
 * Lists recipes with their ingredient count and computed cost. The cost
 * calculation itself lives in utils/calculations.js — this component
 * only decides how to DISPLAY that number, never how to calculate it.
 */
import { Link } from "react-router-dom";
import EmptyState from "../../../components/ui/EmptyState.jsx";
import { formatCurrency } from "../../../utils/formatters.js";
import { calculateFoodCost } from "../../../utils/calculations.js";

export default function RecipeTable({ recipes, ingredientsById, onEdit, onDelete }) {
  if (recipes.length === 0) {
    return <EmptyState title="No recipes found" description="Create your first recipe to start tracking its cost." />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wide text-ink-700/50">
            <th className="px-4 py-3 font-medium">Recipe</th>
            <th className="px-4 py-3 font-medium">Ingredients</th>
            <th className="px-4 py-3 font-medium">Food Cost</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => (
            <tr key={recipe.id} className="border-t border-ink-900/6">
              <td className="px-4 py-3 font-medium text-ink-900">
                <Link to={`/recipes/${recipe.id}`} className="hover:text-gold-600 hover:underline">
                  {recipe.name}
                </Link>
              </td>
              <td className="px-4 py-3 text-ink-700/80">{recipe.items.length} items</td>
              <td className="px-4 py-3 text-ink-700/80">
                {formatCurrency(calculateFoodCost(recipe, ingredientsById))}
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-3">
                  <button onClick={() => onEdit(recipe)} className="text-xs font-medium text-ink-700 hover:text-ink-900">
                    Edit
                  </button>
                  <button onClick={() => onDelete(recipe)} className="text-xs font-medium text-loss-500 hover:text-loss-600">
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
