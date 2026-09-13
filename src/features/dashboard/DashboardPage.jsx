/**
 * DashboardPage.jsx
 *
 * PURPOSE:
 * The landing page. It answers, at a glance: how many ingredients/menu
 * items exist, which item makes the most/least money, how profit has
 * trended, and what needs attention right now.
 *
 * DATA FLOW:
 *   useDashboardSummary() ─┐
 *   useAlerts()            ├─→ DashboardPage ─→ StatCard / ProfitOverviewChart /
 *                          │                    TopProfitableItemsTable / AttentionRequiredList
 *
 * WHY TWO SEPARATE HOOKS INSTEAD OF ONE "useEverything" HOOK:
 * Dashboard summary and alerts are conceptually different resources
 * that happen to both appear on this page. Keeping them as separate
 * React Query hooks means the Alerts page can reuse useAlerts() as-is,
 * and each has its own cache entry / independent loading state.
 */
import StatCard from "../../components/common/StatCard.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import LoadingSpinner from "../../components/ui/LoadingSpinner.jsx";
import { useDashboardSummary } from "./hooks/useDashboard.js";
import { useAlerts } from "../alerts/hooks/useAlerts.js";
import ProfitOverviewChart from "./components/ProfitOverviewChart.jsx";
import TopProfitableItemsTable from "./components/TopProfitableItemsTable.jsx";
import AttentionRequiredList from "./components/AttentionRequiredList.jsx";
import { formatCurrency, formatPercentage } from "../../utils/formatters.js";

export default function DashboardPage() {
  const { data: summary, isLoading: summaryLoading, isError: summaryError } = useDashboardSummary();
  const { data: alerts, isLoading: alertsLoading } = useAlerts();

  // LOADING STATE: neither dataset is ready yet.
  if (summaryLoading || alertsLoading) return <LoadingSpinner label="Loading your dashboard..." />;

  // ERROR STATE: never render a blank page on failure — explain and let
  // the user retry (a real Retry button would call refetch(); omitted
  // here for brevity, see IngredientsPage.jsx for a full example).
  if (summaryError || !summary) {
    return <p className="text-sm text-loss-500">Something went wrong loading the dashboard.</p>;
  }

  const unreadHighPriorityAlerts = (alerts || []).filter((a) => !a.dismissed).slice(0, 3);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Your food business, at a glance."
      />

      {/* --- Stat Cards --- */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Ingredients" value={summary.totalIngredients} />
        <StatCard title="Total Menu Items" value={summary.totalMenuItems} />
        <StatCard
          title="Most Profitable Item"
          value={summary.mostProfitableItem?.name}
          change={formatPercentage(summary.mostProfitableItem?.margin) + " margin"}
        />
        <StatCard
          title="Lowest Margin Item"
          value={summary.lowestMarginItem?.name}
          change={formatPercentage(summary.lowestMarginItem?.margin) + " margin"}
          invertChangeColor
        />
      </div>

      {/* --- Chart + Alerts side by side on large screens --- */}
      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ProfitOverviewChart data={summary.monthlyFinancials} />
        </div>
        <AttentionRequiredList alerts={unreadHighPriorityAlerts} />
      </div>

      {/* --- Top Profitable Items --- */}
      <TopProfitableItemsTable items={summary.topProfitableItems} />
    </div>
  );
}
