/**
 * PriceChangeImpact.jsx
 *
 * PURPOSE:
 * For a recently-changed ingredient, shows the "before vs after" cost
 * and profit impact on every menu item that uses it. This is what turns
 * a raw price change into a business decision — the product's core
 * philosophy from the brief ("clear financial decisions", not just data).
 *
 * HOW OLD COST IS COMPUTED:
 * We recompute each affected menu item's cost twice: once with the
 * ingredient's `currentPrice` (today) and once with a temporary copy of
 * the ingredient using `previousPrice` instead (yesterday). Comparing
 * those two numbers is what produces "Old Cost" / "New Cost" / "Profit
 * Change" below.
 */
import Card from "../../../components/ui/Card.jsx";
import Badge from "../../../components/ui/Badge.jsx";
import { formatCurrency, formatSignedPercentage } from "../../../utils/formatters.js";
import { calculateMenuItemCost, calculatePriceChange } from "../../../utils/calculations.js";

export default function PriceChangeImpact({ ingredient, affectedMenuItems, recipesById, ingredientsById }) {
  const priceIncrease = calculatePriceChange(ingredient.previousPrice, ingredient.currentPrice);

  // A temporary ingredients map where THIS ingredient still has its old
  // price, so we can compute what menu item costs used to be.
  const previousIngredientsById = {
    ...ingredientsById,
    [ingredient.id]: { ...ingredient, currentPrice: ingredient.previousPrice },
  };

  return (
    <Card>
      <h3 className="font-display text-base font-semibold text-ink-900">{ingredient.name} Price Increased</h3>
      <div className="mt-3 flex items-center gap-6 text-sm">
        <div>
          <p className="text-ink-700/60">Previous Price</p>
          <p className="font-medium text-ink-900">{formatCurrency(ingredient.previousPrice)}</p>
        </div>
        <div>
          <p className="text-ink-700/60">Current Price</p>
          <p className="font-medium text-ink-900">{formatCurrency(ingredient.currentPrice)}</p>
        </div>
        <div>
          <p className="text-ink-700/60">Increase</p>
          <Badge variant="danger">{formatSignedPercentage(priceIncrease)}</Badge>
        </div>
      </div>

      <p className="mb-2 mt-6 text-sm font-medium text-ink-800">Affected Menu Items</p>
      <ul className="divide-y divide-ink-900/6">
        {affectedMenuItems.map((item) => {
          const recipe = recipesById[item.recipeId];
          const newCost = calculateMenuItemCost(recipe, ingredientsById, item.extraCosts);
          const oldCost = calculateMenuItemCost(recipe, previousIngredientsById, item.extraCosts);
          const profitChange = oldCost - newCost; // higher cost -> more negative profit change
          return (
            <li key={item.id} className="flex items-center justify-between py-3 text-sm">
              <span className="font-medium text-ink-900">{item.name}</span>
              <span className="text-ink-700/70">
                {formatCurrency(oldCost)} → {formatCurrency(newCost)}
              </span>
              <span className={profitChange < 0 ? "text-loss-500" : "text-profit-500"}>
                {profitChange >= 0 ? "+" : ""}
                {formatCurrency(profitChange)}
              </span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
