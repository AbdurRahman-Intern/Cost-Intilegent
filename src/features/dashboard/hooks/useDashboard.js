/**
 * useDashboard.js
 *
 * PURPOSE:
 * A custom hook that wraps React Query's useQuery for the Dashboard's
 * summary data. Components call `useDashboardSummary()` and get back
 * `{ data, isLoading, isError }` without knowing anything about caching,
 * queryKeys, or the api layer underneath.
 *
 * WHAT IS A queryKey?
 * React Query caches results by a "key" (here: ["dashboard-summary"]).
 * If two components call this hook at the same time, React Query fetches
 * ONCE and shares the result — that's the caching benefit. If the key
 * ever needs parameters (e.g. a date range), it becomes an array like
 * ["dashboard-summary", { from, to }] so different parameters get their
 * own cache entry.
 *
 * THE FOUR QUERY STATES (why they all matter):
 *   loading -> we don't know the data yet: show a spinner, not an empty page.
 *   error   -> the request failed: show a retry option, never silently blank.
 *   success + empty -> request worked but there's genuinely nothing: show
 *              an EmptyState, not a blank screen a user might mistake for a bug.
 *   success + data  -> render the real UI.
 * DashboardPage.jsx handles all four explicitly.
 */
import { useQuery } from "@tanstack/react-query";
import { getDashboardSummary } from "../../../api/dashboard.js";

export function useDashboardSummary() {
  return useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: getDashboardSummary,
  });
}
