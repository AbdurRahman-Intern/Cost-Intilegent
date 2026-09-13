/**
 * AlertsPage.jsx
 *
 * PURPOSE:
 * Groups every alert by priority and lets the user mark-as-read or
 * dismiss them.
 *
 * WHY GROUPING HAPPENS HERE, NOT IN A HOOK:
 * Grouping-by-priority is purely a PRESENTATION decision for this one
 * page, not a reusable piece of business logic — so it stays as a small
 * derived variable in the component rather than living in useAlerts.js.
 * A good rule of thumb: business rules (margin health, cost formulas) go
 * in utils/hooks; "how do I want to lay this out" stays in the page.
 */
import { useMemo, useState } from "react";
import PageHeader from "../../components/common/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";
import LoadingSpinner from "../../components/ui/LoadingSpinner.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import AlertItem from "./components/AlertItem.jsx";
import { useAlerts, useMarkAlertAsRead, useDismissAlert } from "./hooks/useAlerts.js";

const PRIORITY_ORDER = ["high", "medium", "low"];
const PRIORITY_TITLE = { high: "High Priority", medium: "Medium Priority", low: "Low Priority" };

export default function AlertsPage() {
  const { data: alerts, isLoading } = useAlerts();
  const markAsRead = useMarkAlertAsRead();
  const dismiss = useDismissAlert();
  const [priorityFilter, setPriorityFilter] = useState("all");

  const visibleAlerts = useMemo(() => {
    const active = (alerts || []).filter((a) => !a.dismissed);
    return priorityFilter === "all" ? active : active.filter((a) => a.priority === priorityFilter);
  }, [alerts, priorityFilter]);

  const grouped = PRIORITY_ORDER.map((priority) => ({
    priority,
    items: visibleAlerts.filter((a) => a.priority === priority),
  })).filter((group) => group.items.length > 0);

  if (isLoading) return <LoadingSpinner label="Loading alerts..." />;

  return (
    <div>
      <PageHeader
        title="Alerts"
        description="Price changes and margin shifts that need your attention."
        actions={
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="rounded-lg border border-ink-900/15 bg-white px-3 py-2 text-sm text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
          >
            <option value="all">All priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        }
      />

      {grouped.length === 0 && (
        <Card>
          <EmptyState title="You're all caught up" description="No active alerts right now." />
        </Card>
      )}

      <div className="space-y-6">
        {grouped.map((group) => (
          <Card key={group.priority} padded={false}>
            <div className="border-b border-ink-900/8 px-5 py-3 sm:px-6">
              <h3 className="text-sm font-semibold text-ink-900">{PRIORITY_TITLE[group.priority]}</h3>
            </div>
            <ul>
              {group.items.map((alert) => (
                <AlertItem
                  key={alert.id}
                  alert={alert}
                  onMarkRead={(id) => markAsRead.mutate(id)}
                  onDismiss={(id) => dismiss.mutate(id)}
                />
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
