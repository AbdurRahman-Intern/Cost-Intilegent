/**
 * useIngredients.js
 *
 * PURPOSE:
 * All React Query hooks for the Ingredients feature: reading the list,
 * reading one ingredient, and the three mutations (create/update/delete).
 *
 * WHY invalidateQueries AFTER EVERY MUTATION:
 * After creating/editing/deleting an ingredient, the cached ["ingredients"]
 * list is now out of date. `invalidateQueries` marks it stale, so the
 * next render automatically refetches — this is how the IngredientsPage
 * table updates itself right after you submit the form, with no manual
 * "add this to the local array" code.
 */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getIngredients,
  getIngredient,
  createIngredient,
  updateIngredient,
  deleteIngredient,
} from "../../../api/ingredients.js";

const INGREDIENTS_KEY = ["ingredients"];

export function useIngredients() {
  return useQuery({ queryKey: INGREDIENTS_KEY, queryFn: getIngredients });
}

export function useIngredient(id) {
  return useQuery({
    queryKey: ["ingredient", id],
    queryFn: () => getIngredient(id),
    enabled: Boolean(id), // don't fire until we actually have an id
  });
}

/**
 * Many calculations (recipe cost, menu item cost) need to look an
 * ingredient up by id repeatedly. Rather than each caller writing its
 * own `.find()`, this hook returns a ready-made { [id]: ingredient }
 * lookup object built from the same cached list.
 */
export function useIngredientsMap() {
  const { data: ingredients, ...rest } = useIngredients();
  const ingredientsById = Object.fromEntries((ingredients || []).map((i) => [i.id, i]));
  return { ingredientsById, ingredients, ...rest };
}

export function useCreateIngredient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createIngredient,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: INGREDIENTS_KEY }),
  });
}

export function useUpdateIngredient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateIngredient(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: INGREDIENTS_KEY }),
  });
}

export function useDeleteIngredient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteIngredient,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: INGREDIENTS_KEY }),
  });
}
