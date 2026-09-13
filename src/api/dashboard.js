/**
 * api/dashboard.js
 *
 * PURPOSE:
 * The Dashboard needs data that's DERIVED from several other resources
 * (ingredients, recipes, menu items) rather than one raw table. In a
 * real backend, this is exactly the kind of endpoint you'd build
 * server-side (e.g. GET /api/dashboard/summary) so the frontend doesn't
 * have to fetch four resources and recombine them client-side.
 *
 * For now we compute the summary from the same mock data the other
 * api/*.js files use, so today's mock behavior matches tomorrow's real
 * endpoint shape.
 */
import { ingredients, recipes, menuItems, monthlyFinancials } from "../data/mockData.js";
import {
  calculateMenuItemCost,
  calculateGrossProfit,
  calculateProfitMargin,
} from "../utils/calculations.js";

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getDashboardSummary() {
  await delay();

  const ingredientsById = Object.fromEntries(ingredients.map((i) => [i.id, i]));
  const recipesById = Object.fromEntries(recipes.map((r) => [r.id, r]));

  const enrichedMenuItems = menuItems.map((item) => {
    const recipe = recipesById[item.recipeId];
    const cost = calculateMenuItemCost(recipe, ingredientsById, item.extraCosts);
    const profit = calculateGrossProfit(item.sellingPrice, cost);
    const margin = calculateProfitMargin(item.sellingPrice, cost);
    return { ...item, cost, profit, margin };
  });

  const sortedByMargin = [...enrichedMenuItems].sort((a, b) => b.margin - a.margin);

  return {
    totalIngredients: ingredients.length,
    totalMenuItems: menuItems.length,
    mostProfitableItem: sortedByMargin[0],
    lowestMarginItem: sortedByMargin[sortedByMargin.length - 1],
    topProfitableItems: sortedByMargin.slice(0, 5),
    monthlyFinancials,
  };
}
