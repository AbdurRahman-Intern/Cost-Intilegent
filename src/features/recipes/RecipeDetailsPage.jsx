/**
 * RecipeDetailsPage.jsx
 * Route: /recipes/:id
 * Shows a recipe's full ingredient breakdown and total cost.
 */
import { useParams } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";
import LoadingSpinner from "../../components/ui/LoadingSpinner.jsx";
import { useRecipe } from "./hooks/useRecipes.js";
import { useIngredientsMap } from "../ingredients/hooks/useIngredients.js";
import { formatCurrency } from "../../utils/formatters.js";
import { calculateIngredientLineCost, calculateFoodCost } from "../../utils/calculations.js";

export default function RecipeDetailsPage() {
  const { id } = useParams();
  const { data: recipe, isLoading } = useRecipe(id);
  const { ingredientsById } = useIngredientsMap();

  if (isLoading || !recipe) return <LoadingSpinner label="Loading recipe..." />;

  const totalCost = calculateFoodCost(recipe, ingredientsById);

  return (
    <div>
      <PageHeader title={recipe.name} description={`${recipe.items.length} ingredients · ${recipe.servings} serving(s)`} />

      <Card padded={false}>
        <ul className="divide-y divide-ink-900/6">
          {recipe.items.map((line) => {
            const ingredient = ingredientsById[line.ingredientId];
            if (!ingredient) return null;
            const lineCost = calculateIngredientLineCost(ingredient, line.quantity, line.unit);
            return (
              <li key={line.id} className="flex items-center justify-between px-5 py-3 sm:px-6">
                <div>
                  <p className="text-sm font-medium text-ink-900">{ingredient.name}</p>
                  <p className="text-xs text-ink-700/60">{line.quantity} {line.unit}</p>
                </div>
                <p className="text-sm text-ink-700/80">{formatCurrency(lineCost)}</p>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center justify-between border-t border-ink-900/8 px-5 py-4 sm:px-6">
          <p className="font-display font-semibold text-ink-900">Total Food Cost</p>
          <p className="font-display text-lg font-semibold text-ink-900">{formatCurrency(totalCost)}</p>
        </div>
      </Card>
    </div>
  );
}
