/**
 * calculations.js
 *
 * PURPOSE:
 * All food-cost business math lives here, and nowhere else. This is the
 * single most important file in the whole product — the entire value of
 * "Food Cost Intelligence Platform" is doing this math correctly and
 * consistently everywhere it's shown (Dashboard, Menu Items,
 * Profitability, and Alerts all reuse these same functions).
 *
 * WHY A SEPARATE UTILS FILE INSTEAD OF INLINE MATH IN COMPONENTS?
 * If a formula ever needs to change (e.g. how waste % factors into
 * cost), we fix it in ONE place instead of hunting through every
 * component that happened to compute margin inline.
 *
 * UNIT CONVERSION:
 * Ingredients are purchased in a "purchase unit" (KG, Liter, Piece,
 * Pack) but used in recipes in smaller "recipe units" (Gram, ML,
 * Piece, Pack). CONVERSION_TO_BASE expresses how many recipe-units fit
 * into one purchase-unit, so we can turn "150 Gram of Chicken" into a
 * fraction of a KG and multiply by the KG price.
 */

const CONVERSION_TO_BASE = {
  KG: { Gram: 1000 },
  Liter: { ML: 1000 },
  Piece: { Piece: 1 },
  Pack: { Pack: 1 },
};

/**
 * Calculates the cost of using `quantity` `recipeUnit`s of an ingredient,
 * given that ingredient's purchase price (currentPrice per purchase unit).
 *
 * Example: Chicken costs 40 SAR/KG. A recipe uses 150 Gram.
 * -> (150 / 1000) * 40 = 6 SAR
 */
export function calculateIngredientLineCost(ingredient, quantity, recipeUnit) {
  const unitsPerBase = CONVERSION_TO_BASE[ingredient.unit]?.[recipeUnit] ?? 1;
  const fractionOfPurchaseUnit = quantity / unitsPerBase;
  return fractionOfPurchaseUnit * ingredient.currentPrice;
}

/**
 * Sums every ingredient line in a recipe into a single food cost number.
 * `ingredientsById` is a lookup map so we don't do an O(n) `.find()` per
 * line — see features/ingredients/hooks/useIngredients.js for where
 * that map is built.
 */
export function calculateFoodCost(recipe, ingredientsById) {
  if (!recipe) return 0;
  return recipe.items.reduce((total, line) => {
    const ingredient = ingredientsById[line.ingredientId];
    if (!ingredient) return total;
    return total + calculateIngredientLineCost(ingredient, line.quantity, line.unit);
  }, 0);
}

/**
 * A menu item's full cost = the recipe's ingredient cost + any extra
 * flat costs (packaging, pre-made sauces, etc.).
 */
export function calculateMenuItemCost(recipe, ingredientsById, extraCosts = []) {
  const ingredientsCost = calculateFoodCost(recipe, ingredientsById);
  const extrasCost = extraCosts.reduce((sum, extra) => sum + extra.amount, 0);
  return ingredientsCost + extrasCost;
}

/** Gross Profit = Selling Price - Total Cost */
export function calculateGrossProfit(sellingPrice, totalCost) {
  return sellingPrice - totalCost;
}

/**
 * Profit Margin Formula:
 *
 * (Profit / Selling Price) × 100
 *
 * We guard against dividing by zero (an item priced at 0 shouldn't crash
 * the dashboard).
 */
export function calculateProfitMargin(sellingPrice, totalCost) {
  if (!sellingPrice) return 0;
  const profit = calculateGrossProfit(sellingPrice, totalCost);
  return (profit / sellingPrice) * 100;
}

/**
 * Percentage change between an old and a new value. Used for both
 * ingredient price changes and profit/margin trend arrows.
 *
 * Example: calculatePriceChange(35, 40) -> 14.28 (%)
 */
export function calculatePriceChange(previousValue, currentValue) {
  if (!previousValue) return 0;
  return ((currentValue - previousValue) / previousValue) * 100;
}

/**
 * Classifies a margin into a health bucket, used for filters/badges on
 * the Profitability page ("Healthy" / "Warning" / "Low Profit").
 * These thresholds are a simple starting rule of thumb for the food
 * business industry. TODO: make them configurable in Settings.
 */
export function classifyMarginHealth(marginPercent) {
  if (marginPercent >= 55) return "healthy";
  if (marginPercent >= 35) return "warning";
  return "low";
}
