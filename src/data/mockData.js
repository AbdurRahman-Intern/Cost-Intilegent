/**
 * mockData.js
 *
 * PURPOSE:
 * A single source of realistic, interconnected fake data that stands in
 * for the Laravel/MySQL backend during frontend development.
 *
 * WHY ONE FILE INSTEAD OF DATA SCATTERED IN COMPONENTS?
 * Every api/*.js file imports FROM here. That means the moment the real
 * backend is ready, we only rewrite the api/*.js functions (see
 * api/ingredients.js etc.) — no component ever has to change, because
 * components only ever talk to the api layer, never to this file
 * directly.
 *
 * RELATIONSHIPS IN THIS DATA:
 * ingredients  <---- recipeItems (by ingredientId)
 * recipes      <---- menuItems   (by recipeId)
 * This mirrors how the real database will be normalized (foreign keys),
 * which makes the eventual Laravel/MySQL migration much more natural.
 */

export const ingredients = [
  {
    id: 1,
    name: "Chicken",
    unit: "KG",
    currentPrice: 40,
    previousPrice: 35,
    supplier: "Al Safi Meats",
    lastUpdated: "2026-04-05",
    priceHistory: [
      { month: "Jan", price: 30 },
      { month: "Feb", price: 32 },
      { month: "Mar", price: 35 },
      { month: "Apr", price: 40 },
    ],
  },
  {
    id: 2,
    name: "Beef",
    unit: "KG",
    currentPrice: 55,
    previousPrice: 52,
    supplier: "Al Safi Meats",
    lastUpdated: "2026-03-28",
    priceHistory: [
      { month: "Jan", price: 48 },
      { month: "Feb", price: 50 },
      { month: "Mar", price: 52 },
      { month: "Apr", price: 55 },
    ],
  },
  {
    id: 3,
    name: "Rice",
    unit: "KG",
    currentPrice: 6,
    previousPrice: 5.5,
    supplier: "Gulf Grains Co.",
    lastUpdated: "2026-02-10",
    priceHistory: [
      { month: "Jan", price: 5.2 },
      { month: "Feb", price: 5.5 },
      { month: "Mar", price: 5.5 },
      { month: "Apr", price: 6 },
    ],
  },
  {
    id: 4,
    name: "Tomato",
    unit: "KG",
    currentPrice: 7,
    previousPrice: 6,
    supplier: "Fresh Farms",
    lastUpdated: "2026-04-01",
    priceHistory: [
      { month: "Jan", price: 5.5 },
      { month: "Feb", price: 6 },
      { month: "Mar", price: 6 },
      { month: "Apr", price: 7 },
    ],
  },
  {
    id: 5,
    name: "Flour",
    unit: "KG",
    currentPrice: 4,
    previousPrice: 3.8,
    supplier: "Gulf Grains Co.",
    lastUpdated: "2026-01-20",
    priceHistory: [
      { month: "Jan", price: 3.6 },
      { month: "Feb", price: 3.8 },
      { month: "Mar", price: 3.8 },
      { month: "Apr", price: 4 },
    ],
  },
  {
    id: 6,
    name: "Oil",
    unit: "Liter",
    currentPrice: 18,
    previousPrice: 16,
    supplier: "Al Rawabi Supplies",
    lastUpdated: "2026-03-15",
    priceHistory: [
      { month: "Jan", price: 14 },
      { month: "Feb", price: 15 },
      { month: "Mar", price: 16 },
      { month: "Apr", price: 18 },
    ],
  },
  {
    id: 7,
    name: "Cheese",
    unit: "KG",
    currentPrice: 32,
    previousPrice: 30,
    supplier: "Al Rawabi Supplies",
    lastUpdated: "2026-03-22",
    priceHistory: [
      { month: "Jan", price: 27 },
      { month: "Feb", price: 28 },
      { month: "Mar", price: 30 },
      { month: "Apr", price: 32 },
    ],
  },
  {
    id: 8,
    name: "Bread",
    unit: "Piece",
    currentPrice: 1.2,
    previousPrice: 1.1,
    supplier: "City Bakery Supplies",
    lastUpdated: "2026-02-28",
    priceHistory: [
      { month: "Jan", price: 1.0 },
      { month: "Feb", price: 1.1 },
      { month: "Mar", price: 1.1 },
      { month: "Apr", price: 1.2 },
    ],
  },
];

export const recipes = [
  {
    id: 1,
    name: "Chicken Burger",
    servings: 1,
    items: [
      { id: 1, ingredientId: 1, quantity: 150, unit: "Gram" }, // Chicken
      { id: 2, ingredientId: 8, quantity: 1, unit: "Piece" },  // Bread
      { id: 3, ingredientId: 7, quantity: 30, unit: "Gram" },  // Cheese
      { id: 4, ingredientId: 4, quantity: 20, unit: "Gram" },  // Tomato
      { id: 5, ingredientId: 6, quantity: 10, unit: "ML" },    // Oil
    ],
  },
  {
    id: 2,
    name: "Beef Burger",
    servings: 1,
    items: [
      { id: 1, ingredientId: 2, quantity: 160, unit: "Gram" }, // Beef
      { id: 2, ingredientId: 8, quantity: 1, unit: "Piece" },  // Bread
      { id: 3, ingredientId: 7, quantity: 30, unit: "Gram" },  // Cheese
      { id: 4, ingredientId: 4, quantity: 25, unit: "Gram" },  // Tomato
    ],
  },
  {
    id: 3,
    name: "Chicken Kabab",
    servings: 1,
    items: [
      { id: 1, ingredientId: 1, quantity: 200, unit: "Gram" }, // Chicken
      { id: 2, ingredientId: 3, quantity: 150, unit: "Gram" }, // Rice
      { id: 3, ingredientId: 6, quantity: 15, unit: "ML" },    // Oil
    ],
  },
  {
    id: 4,
    name: "Margherita Pizza",
    servings: 1,
    items: [
      { id: 1, ingredientId: 5, quantity: 220, unit: "Gram" }, // Flour (dough)
      { id: 2, ingredientId: 4, quantity: 100, unit: "Gram" }, // Tomato (sauce)
      { id: 3, ingredientId: 7, quantity: 120, unit: "Gram" }, // Cheese
      { id: 4, ingredientId: 6, quantity: 10, unit: "ML" },    // Oil
    ],
  },
];

// Each menu item points at a recipe (recipeId) and can add flat extra
// costs on top of the raw-ingredient cost — packaging, a pre-made sauce
// bought from a supplier, etc. Selling price is set by the business owner.
export const menuItems = [
  {
    id: 1,
    name: "Chicken Burger",
    recipeId: 1,
    category: "Burgers",
    sellingPrice: 30,
    extraCosts: [
      { label: "Sauce", amount: 1 },
      { label: "Packaging", amount: 1 },
    ],
  },
  {
    id: 2,
    name: "Beef Burger",
    recipeId: 2,
    category: "Burgers",
    sellingPrice: 34,
    extraCosts: [
      { label: "Sauce", amount: 1 },
      { label: "Packaging", amount: 1 },
    ],
  },
  {
    id: 3,
    name: "Chicken Kabab",
    recipeId: 3,
    category: "Grills",
    sellingPrice: 28,
    extraCosts: [{ label: "Packaging", amount: 0.75 }],
  },
  {
    id: 4,
    name: "Margherita Pizza",
    recipeId: 4,
    category: "Pizza",
    sellingPrice: 32,
    extraCosts: [{ label: "Packaging", amount: 1.25 }],
  },
];

// Alerts reference an ingredient when relevant, so the UI can deep-link
// from an alert straight to the ingredient's detail page.
export const alerts = [
  {
    id: 1,
    priority: "high",
    title: "Chicken price increased by 14%",
    description:
      "Chicken went from 35 SAR/KG to 40 SAR/KG. This affects 2 menu items.",
    relatedIngredientId: 1,
    read: false,
    dismissed: false,
    createdAt: "2026-04-05",
  },
  {
    id: 2,
    priority: "medium",
    title: "Chicken Burger margin decreased",
    description:
      "Profit margin dropped from 68% to 61.7% after the last ingredient price update.",
    relatedIngredientId: 1,
    read: false,
    dismissed: false,
    createdAt: "2026-04-05",
  },
  {
    id: 3,
    priority: "medium",
    title: "Oil price increased by 12.5%",
    description: "Oil went from 16 SAR/L to 18 SAR/L, affecting 3 recipes.",
    relatedIngredientId: 6,
    read: false,
    dismissed: false,
    createdAt: "2026-03-15",
  },
  {
    id: 4,
    priority: "low",
    title: "3 menu items affected by recent price changes",
    description: "Chicken Burger, Chicken Kabab, and Margherita Pizza all use ingredients with recent price updates.",
    relatedIngredientId: null,
    read: true,
    dismissed: false,
    createdAt: "2026-04-06",
  },
  {
    id: 5,
    priority: "low",
    title: "Cheese price increased by 6.7%",
    description: "Cheese went from 30 SAR/KG to 32 SAR/KG.",
    relatedIngredientId: 7,
    read: true,
    dismissed: false,
    createdAt: "2026-03-22",
  },
];

// Monthly revenue/cost overview shown on the Dashboard's Profit Overview
// chart. In production this would be aggregated server-side from orders.
export const monthlyFinancials = [
  { month: "Nov", revenue: 42000, foodCost: 15200 },
  { month: "Dec", revenue: 48500, foodCost: 17800 },
  { month: "Jan", revenue: 45200, foodCost: 16500 },
  { month: "Feb", revenue: 47800, foodCost: 17650 },
  { month: "Mar", revenue: 51200, foodCost: 19900 },
  { month: "Apr", revenue: 49600, foodCost: 20100 },
];

export const businessSettings = {
  businessName: "Bayt Al Tabkha Kitchen",
  currency: "SAR",
  country: "Saudi Arabia",
  defaultProfitMargin: 55,
  alertPreferences: {
    priceIncreaseThreshold: 10,
    marginDropThreshold: 5,
  },
};
