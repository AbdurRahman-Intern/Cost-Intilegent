/**
 * AppRoutes.jsx
 *
 * PURPOSE:
 * The single, centralized place that maps every URL to the page
 * component that renders there. If you're wondering "what page does
 * this app have", this file is the answer.
 *
 * ROUTE ORGANIZATION:
 * Every route below is nested inside one parent route that renders
 * DashboardLayout (sidebar + header). React Router calls this a
 * "layout route" — the parent has no `index` element of its own, it
 * just provides the shell, and its children render into its <Outlet />.
 * That's why every real page only needs to worry about its own content,
 * never the sidebar/header around it.
 *
 * FUTURE:
 * TODO: Add authentication. Once login exists, wrap this whole tree in
 * a <ProtectedRoute> that redirects to /login if there's no auth token,
 * and add an AuthLayout-based /login route alongside this one.
 */
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout.jsx";

import DashboardPage from "../features/dashboard/DashboardPage.jsx";
import IngredientsPage from "../features/ingredients/IngredientsPage.jsx";
import IngredientDetailsPage from "../features/ingredients/IngredientDetailsPage.jsx";
import RecipesPage from "../features/recipes/RecipesPage.jsx";
import RecipeDetailsPage from "../features/recipes/RecipeDetailsPage.jsx";
import MenuItemsPage from "../features/menuItems/MenuItemsPage.jsx";
import MenuItemDetailsPage from "../features/menuItems/MenuItemDetailsPage.jsx";
import ProfitabilityPage from "../features/profitability/ProfitabilityPage.jsx";
import AlertsPage from "../features/alerts/AlertsPage.jsx";
import AIAnalystPage from "../features/ai/AIAnalystPage.jsx";
import SettingsPage from "../features/settings/SettingsPage.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />

        <Route path="ingredients" element={<IngredientsPage />} />
        <Route path="ingredients/:id" element={<IngredientDetailsPage />} />

        <Route path="recipes" element={<RecipesPage />} />
        <Route path="recipes/:id" element={<RecipeDetailsPage />} />

        <Route path="menu-items" element={<MenuItemsPage />} />
        <Route path="menu-items/:id" element={<MenuItemDetailsPage />} />

        <Route path="profitability" element={<ProfitabilityPage />} />
        <Route path="alerts" element={<AlertsPage />} />
        <Route path="ai-analyst" element={<AIAnalystPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}
