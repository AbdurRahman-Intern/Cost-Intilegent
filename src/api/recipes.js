/**
 * api/recipes.js
 *
 * See api/ingredients.js for the full explanation of this pattern
 * (mock-now, Laravel-later, same function signatures either way).
 */
import { recipes as mockRecipes } from "../data/mockData.js";

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

let recipesStore = [...mockRecipes];

export async function getRecipes() {
  await delay();
  return recipesStore;
}

export async function getRecipe(id) {
  await delay();
  const found = recipesStore.find((r) => r.id === Number(id));
  if (!found) throw new Error("Recipe not found");
  return found;
}

export async function createRecipe(data) {
  await delay();
  const newRecipe = {
    id: Math.max(0, ...recipesStore.map((r) => r.id)) + 1,
    servings: 1,
    ...data,
  };
  recipesStore = [...recipesStore, newRecipe];
  return newRecipe;
}

export async function updateRecipe(id, data) {
  await delay();
  recipesStore = recipesStore.map((r) => (r.id === Number(id) ? { ...r, ...data } : r));
  return recipesStore.find((r) => r.id === Number(id));
}

export async function deleteRecipe(id) {
  await delay();
  recipesStore = recipesStore.filter((r) => r.id !== Number(id));
  return { success: true };
}
