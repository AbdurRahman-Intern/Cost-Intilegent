/**
 * IngredientDetailsPage.jsx
 * Route: /ingredients/:id
 *
 * PURPOSE:
 * Deep-dive on one ingredient: current vs previous price, a price
 * history chart, and which menu items are affected by this ingredient
 * (found by walking Recipes -> Menu Items, since ingredients don't
 * point at menu items directly — menu items point at recipes, and
 * recipes point at ingredients).
 */
import { useParams, Link } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";
import Badge from "../../components/ui/Badge.jsx";
import LoadingSpinner from "../../components/ui/LoadingSpinner.jsx";
import PriceHistoryChart from "./components/PriceHistoryChart.jsx";
import { useIngredient } from "./hooks/useIngredients.js";
import { useRecipes } from "../recipes/hooks/useRecipes.js";
import { useMenuItems } from "../menuItems/hooks/useMenuItems.js";
import { formatCurrency, formatSignedPercentage } from "../../utils/formatters.js";
import { calculatePriceChange } from "../../utils/calculations.js";

export default function IngredientDetailsPage() {
  const { id } = useParams();
  const { data: ingredient, isLoading } = useIngredient(id);
  const { data: recipes } = useRecipes();
  const { data: menuItems } = useMenuItems();

  if (isLoading || !ingredient) return <LoadingSpinner label="Loading ingredient..." />;

  const priceChange = calculatePriceChange(ingredient.previousPrice, ingredient.currentPrice);

  // TODO: Get affected menu items from a dedicated Laravel API endpoint
  // (e.g. GET /api/ingredients/:id/affected-menu-items) once the backend
  // exists — it can do this join far more efficiently in SQL than we
  // can client-side once the catalog is large.
  const affectedRecipeIds = new Set(
    (recipes || [])
      .filter((r) => r.items.some((line) => line.ingredientId === ingredient.id))
      .map((r) => r.id)
  );
  const affectedMenuItems = (menuItems || []).filter((item) => affectedRecipeIds.has(item.recipeId));

  return (
    <div>
      <PageHeader title={ingredient.name} description={`Supplied by ${ingredient.supplier}`} />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-sm text-ink-700/60">Current Price</p>
          <p className="mt-1 font-display text-xl font-semibold text-ink-900">
            {formatCurrency(ingredient.currentPrice)} / {ingredient.unit}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-ink-700/60">Previous Price</p>
          <p className="mt-1 font-display text-xl font-semibold text-ink-900">
            {formatCurrency(ingredient.previousPrice)} / {ingredient.unit}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-ink-700/60">Price Change</p>
          <Badge variant={priceChange > 0 ? "danger" : "success"} className="mt-2">
            {formatSignedPercentage(priceChange)}
          </Badge>
        </Card>
      </div>

      <div className="mb-6">
        <PriceHistoryChart history={ingredient.priceHistory} />
      </div>

      <Card>
        <h3 className="font-display text-base font-semibold text-ink-900">Affected Menu Items</h3>
        <p className="mb-4 text-sm text-ink-700/60">
          These menu items use {ingredient.name} and are impacted by its price.
        </p>
        <ul className="divide-y divide-ink-900/6">
          {affectedMenuItems.map((item) => (
            <li key={item.id} className="flex items-center justify-between py-2.5">
              <Link to={`/menu-items/${item.id}`} className="text-sm font-medium text-ink-900 hover:text-gold-600 hover:underline">
                {item.name}
              </Link>
              <span className="text-xs text-ink-700/60">{item.category}</span>
            </li>
          ))}
          {affectedMenuItems.length === 0 && (
            <li className="py-2.5 text-sm text-ink-700/60">No menu items currently use this ingredient.</li>
          )}
        </ul>
      </Card>
    </div>
  );
}
