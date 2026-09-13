/**
 * api/alerts.js
 * See api/ingredients.js for the mock-now/Laravel-later pattern.
 *
 * TODO: Persist alert status (read/dismissed) using the Laravel API
 * instead of this in-memory array, so status survives a page refresh.
 */
import { alerts as mockAlerts } from "../data/mockData.js";

const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

let alertsStore = [...mockAlerts];

export async function getAlerts() {
  await delay();
  return alertsStore;
}

export async function markAlertAsRead(id) {
  await delay();
  alertsStore = alertsStore.map((a) => (a.id === Number(id) ? { ...a, read: true } : a));
  return alertsStore;
}

export async function dismissAlert(id) {
  await delay();
  alertsStore = alertsStore.map((a) => (a.id === Number(id) ? { ...a, dismissed: true } : a));
  return alertsStore;
}
