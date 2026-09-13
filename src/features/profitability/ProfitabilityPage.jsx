/**
 * ProfitabilityPage.jsx
 *
 * PURPOSE:
 * Ranks every menu item by profit or margin, with health filters, and
 * shows the impact of the most recent ingredient price increase.
 *
 * FILTERING AND SORTING LOGIC:
 * Both are derived with useMemo from the same enriched `menuItems`
 * array — filtering narrows the list down to a health bucket (see
 * classifyMarginHealth in utils/calculations.js), and sorting re-orders
 * whatever survived the filter. Doing filter THEN sort (in that order,
 * inside one memo) means we never sort items we're about to throw away.
 */
import { useMemo, useState } from "react";
import PageHeader from "../../components/common/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";
import LoadingSpinner from "../../components/ui/LoadingSpinner.jsx";
import ProfitabilityFilters from "./components/ProfitabilityFilters.jsx";
import ProfitabilityTable from "./components/ProfitabilityTable.jsx";
import PriceChangeImpact from "./components/PriceChangeImpact.jsx";
import { useMenuItemsWithCosts } from "../menuItems/hooks/useMenuItems.js";
import { useIngredients } from "../ingredients/hooks/useIngredients.js";
import { useRecipesMap } from "../recipes/hooks/useRecipes.js";
import { classifyMarginHealth, calculatePriceChange } from "../../utils/calculations.js";

export default function ProfitabilityPage() {
  const { menuItems, ingredientsById, isLoading } = useMenuItemsWithCosts();
  const { data: ingredients } = useIngredients();
  const { recipesById } = useRecipesMap();

  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("margin-desc");

  const visibleItems = useMemo(() => {
    let result = menuItems;
    if (filter !== "all") {
      result = result.filter((item) => classifyMarginHealth(item.margin) === filter);
    }

    const [field, direction] = sort.split("-"); // e.g. "margin-desc" -> ["margin", "desc"]
    result = [...result].sort((a, b) => {
      const diff = a[field] - b[field];
      return direction === "desc" ? -diff : diff;
    });

    return result;
  }, [menuItems, filter, sort]);

  // Find the ingredient with the single largest recent price increase,
  // to power the "Price Change Impact" section below.
  const mostImpactfulIngredient = useMemo(() => {
    if (!ingredients?.length) return null;
    return [...ingredients].sort(
      (a, b) => calculatePriceChange(b.previousPrice, b.currentPrice) - calculatePriceChange(a.previousPrice, a.currentPrice)
    )[0];
  }, [ingredients]);

  const affectedMenuItems = useMemo(() => {
    if (!mostImpactfulIngredient) return [];
    const affectedRecipeIds = new Set(
      Object.values(recipesById)
        .filter((r) => r.items.some((line) => line.ingredientId === mostImpactfulIngredient.id))
        .map((r) => r.id)
    );
    return menuItems.filter((item) => affectedRecipeIds.has(item.recipeId));
  }, [mostImpactfulIngredient, recipesById, menuItems]);

  if (isLoading) return <LoadingSpinner label="Loading profitability data..." />;

  return (
    <div>
      <PageHeader title="Profitability" description="Rank every menu item by how much money it actually makes." />

      {mostImpactfulIngredient && affectedMenuItems.length > 0 && (
        <div className="mb-6">
          <PriceChangeImpact
            ingredient={mostImpactfulIngredient}
            affectedMenuItems={affectedMenuItems}
            recipesById={recipesById}
            ingredientsById={ingredientsById}
          />
        </div>
      )}

      <Card padded={false} className="overflow-hidden">
        <div className="border-b border-ink-900/8 p-4">
          <ProfitabilityFilters filter={filter} onFilterChange={setFilter} sort={sort} onSortChange={setSort} />
        </div>
        <ProfitabilityTable items={visibleItems} />
      </Card>
    </div>
  );
}
