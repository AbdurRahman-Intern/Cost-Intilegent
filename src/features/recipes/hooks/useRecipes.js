/**
 * useRecipes.js
 * Same pattern as useIngredients.js — query + map + mutations, backed
 * by api/recipes.js. See that file's comments for the full reasoning;
 * we don't repeat it in every feature to keep the codebase focused.
 */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getRecipes, getRecipe, createRecipe, updateRecipe, deleteRecipe } from "../../../api/recipes.js";

const RECIPES_KEY = ["recipes"];

export function useRecipes() {
  return useQuery({ queryKey: RECIPES_KEY, queryFn: getRecipes });
}

export function useRecipe(id) {
  return useQuery({
    queryKey: ["recipe", id],
    queryFn: () => getRecipe(id),
    enabled: Boolean(id),
  });
}

export function useRecipesMap() {
  const { data: recipes, ...rest } = useRecipes();
  const recipesById = Object.fromEntries((recipes || []).map((r) => [r.id, r]));
  return { recipesById, recipes, ...rest };
}

export function useCreateRecipe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRecipe,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: RECIPES_KEY }),
  });
}

export function useUpdateRecipe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateRecipe(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: RECIPES_KEY }),
  });
}

export function useDeleteRecipe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRecipe,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: RECIPES_KEY }),
  });
}
