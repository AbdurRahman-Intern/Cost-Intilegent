/**
 * MenuItemDetailsPage.jsx
 * Route: /menu-items/:id
 * The full cost story for one menu item: selling price, ingredient-by-
 * ingredient cost breakdown, extra costs, and the resulting profit/margin.
 */
import { useParams } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader.jsx";
import LoadingSpinner from "../../components/ui/LoadingSpinner.jsx";
import CostBreakdown from "./components/CostBreakdown.jsx";
import { useMenuItemsWithCosts } from "./hooks/useMenuItems.js";

export default function MenuItemDetailsPage() {
  const { id } = useParams();
  const { menuItems, ingredientsById, isLoading } = useMenuItemsWithCosts();

  if (isLoading) return <LoadingSpinner label="Loading menu item..." />;

  const item = menuItems.find((i) => i.id === Number(id));
  if (!item) return <p className="text-sm text-ink-700/70">Menu item not found.</p>;

  return (
    <div>
      <PageHeader title={item.name} description={item.category} />
      <CostBreakdown
        recipe={item.recipe}
        extraCosts={item.extraCosts}
        ingredientsById={ingredientsById}
        sellingPrice={item.sellingPrice}
        totalCost={item.cost}
        grossProfit={item.profit}
        margin={item.margin}
      />
    </div>
  );
}
