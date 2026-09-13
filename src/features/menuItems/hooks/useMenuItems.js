/**
 * useMenuItems.js
 *
 * SLIGHTLY DIFFERENT FROM useIngredients/useRecipes:
 * `useMenuItemsWithCosts` combines menu items + recipes + ingredients
 * into one "enriched" list (each item gets .cost/.profit/.margin
 * attached). This is the shape almost every Menu Items / Profitability
 * component actually wants, so we compute it once here instead of
 * repeating the same three-hook-combination in every component.
 */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../../../api/menuItems.js";
import { useIngredientsMap } from "../../ingredients/hooks/useIngredients.js";
import { useRecipesMap } from "../../recipes/hooks/useRecipes.js";
import { calculateMenuItemCost, calculateGrossProfit, calculateProfitMargin } from "../../../utils/calculations.js";

const MENU_ITEMS_KEY = ["menu-items"];

export function useMenuItems() {
  return useQuery({ queryKey: MENU_ITEMS_KEY, queryFn: getMenuItems });
}

export function useMenuItem(id) {
  return useQuery({
    queryKey: ["menu-item", id],
    queryFn: () => getMenuItem(id),
    enabled: Boolean(id),
  });
}

/**
 * Returns menu items with cost/profit/margin already calculated, plus
 * the raw ingredientsById/recipesById maps in case a component needs
 * to show a cost breakdown (see MenuItemDetailsPage.jsx).
 */
export function useMenuItemsWithCosts() {
  const { data: menuItems, isLoading: itemsLoading } = useMenuItems();
  const { recipesById, isLoading: recipesLoading } = useRecipesMap();
  const { ingredientsById, isLoading: ingredientsLoading } = useIngredientsMap();

  const isLoading = itemsLoading || recipesLoading || ingredientsLoading;

  const enrichedItems = (menuItems || []).map((item) => {
    const recipe = recipesById[item.recipeId];
    const cost = calculateMenuItemCost(recipe, ingredientsById, item.extraCosts);
    const profit = calculateGrossProfit(item.sellingPrice, cost);
    const margin = calculateProfitMargin(item.sellingPrice, cost);
    return { ...item, recipe, cost, profit, margin };
  });

  return { menuItems: enrichedItems, ingredientsById, recipesById, isLoading };
}

export function useCreateMenuItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMenuItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: MENU_ITEMS_KEY }),
  });
}

export function useUpdateMenuItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateMenuItem(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: MENU_ITEMS_KEY }),
  });
}

export function useDeleteMenuItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMenuItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: MENU_ITEMS_KEY }),
  });
}
