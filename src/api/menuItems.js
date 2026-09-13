/**
 * api/menuItems.js
 * See api/ingredients.js for the mock-now/Laravel-later pattern.
 */
import { menuItems as mockMenuItems } from "../data/mockData.js";

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

let menuItemsStore = [...mockMenuItems];

export async function getMenuItems() {
  await delay();
  return menuItemsStore;
}

export async function getMenuItem(id) {
  await delay();
  const found = menuItemsStore.find((item) => item.id === Number(id));
  if (!found) throw new Error("Menu item not found");
  return found;
}

export async function createMenuItem(data) {
  await delay();
  const newItem = {
    id: Math.max(0, ...menuItemsStore.map((i) => i.id)) + 1,
    extraCosts: [],
    ...data,
  };
  menuItemsStore = [...menuItemsStore, newItem];
  return newItem;
}

export async function updateMenuItem(id, data) {
  await delay();
  menuItemsStore = menuItemsStore.map((item) =>
    item.id === Number(id) ? { ...item, ...data } : item
  );
  return menuItemsStore.find((item) => item.id === Number(id));
}

export async function deleteMenuItem(id) {
  await delay();
  menuItemsStore = menuItemsStore.filter((item) => item.id !== Number(id));
  return { success: true };
}
