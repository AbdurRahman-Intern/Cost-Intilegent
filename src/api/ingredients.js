/**
 * api/ingredients.js
 *
 * PURPOSE:
 * Every function a component needs to read or change ingredient data,
 * gathered in one place. Components and hooks NEVER import mockData.js
 * directly — they always go through here. That indirection is what lets
 * us swap mock data for real Laravel calls without touching any UI code.
 *
 * CURRENT STATE:
 * Uses in-memory mock data with a fake network delay (so loading states
 * are visible during development).
 *
 * FUTURE (Laravel):
 *   export const getIngredients = () => api.get('/ingredients').then(r => r.data);
 */
import apiClient from "./axios.js";
import { ingredients as mockIngredients } from "../data/mockData.js";

// A tiny helper to simulate real network latency in development.
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

// We mutate this in-memory copy so Add/Edit/Delete feel real across the
// app during a session, without needing a real database yet.
let ingredientsStore = [...mockIngredients];

export async function getIngredients() {
  await delay();
  return ingredientsStore;
}

export async function getIngredient(id) {
  await delay();
  const found = ingredientsStore.find((item) => item.id === Number(id));
  if (!found) throw new Error("Ingredient not found");
  return found;
}

export async function createIngredient(data) {
  await delay();
  const newIngredient = {
    id: Math.max(0, ...ingredientsStore.map((i) => i.id)) + 1,
    previousPrice: data.currentPrice,
    priceHistory: [],
    lastUpdated: new Date().toISOString().slice(0, 10),
    ...data,
  };
  ingredientsStore = [...ingredientsStore, newIngredient];
  return newIngredient;
}

export async function updateIngredient(id, data) {
  await delay();
  ingredientsStore = ingredientsStore.map((item) =>
    item.id === Number(id)
      ? {
          ...item,
          previousPrice: item.currentPrice,
          ...data,
          lastUpdated: new Date().toISOString().slice(0, 10),
        }
      : item
  );
  return ingredientsStore.find((item) => item.id === Number(id));
}

export async function deleteIngredient(id) {
  await delay();
  ingredientsStore = ingredientsStore.filter((item) => item.id !== Number(id));
  return { success: true };
}
