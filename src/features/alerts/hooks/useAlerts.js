/**
 * useAlerts.js
 *
 * PURPOSE:
 * Fetches alerts and exposes two mutations (markAsRead, dismiss).
 *
 * WHY useMutation INSTEAD OF useQuery FOR WRITES:
 * useQuery is for READING data; useMutation is React Query's tool for
 * WRITES (create/update/delete). The key benefit here is
 * `onSuccess: () => queryClient.invalidateQueries(...)` — after a
 * mutation succeeds, we tell React Query "the alerts list might be
 * stale now," and it automatically refetches. This keeps the UI in
 * sync without us manually updating local component state.
 */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAlerts, markAlertAsRead, dismissAlert } from "../../../api/alerts.js";

const ALERTS_KEY = ["alerts"];

export function useAlerts() {
  return useQuery({ queryKey: ALERTS_KEY, queryFn: getAlerts });
}

export function useMarkAlertAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markAlertAsRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ALERTS_KEY }),
  });
}

export function useDismissAlert() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: dismissAlert,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ALERTS_KEY }),
  });
}
