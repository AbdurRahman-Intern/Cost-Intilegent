/**
 * formatters.js
 *
 * PURPOSE:
 * Small, pure, reusable functions that turn raw numbers/dates into the
 * strings we show on screen. Centralizing this means "how do we show a
 * price" is decided in exactly one place. If the business later needs to
 * switch from SAR to another currency, this is the only file to touch
 * for formatting (the currency value itself would come from Settings/API).
 *
 * These are plain JS functions, not React components/hooks — they have
 * no dependency on React at all, which makes them trivial to unit test.
 */

/**
 * Formats a number as a currency string.
 * Example: formatCurrency(18.5) -> "18.50 SAR"
 *
 * TODO: read the currency code from the Settings feature / Laravel API
 * instead of hardcoding "SAR", once multi-currency support exists.
 */
export function formatCurrency(value, currency = "SAR") {
  if (value === null || value === undefined || Number.isNaN(value)) return "-";
  return `${Number(value).toFixed(2)} ${currency}`;
}

/**
 * Formats a decimal ratio or plain number as a percentage string.
 * Example: formatPercentage(61.7) -> "61.7%"
 */
export function formatPercentage(value, decimals = 1) {
  if (value === null || value === undefined || Number.isNaN(value)) return "-";
  return `${Number(value).toFixed(decimals)}%`;
}

/**
 * Formats an ISO date string into a short, human-friendly date.
 * Example: formatDate("2026-04-12") -> "Apr 12, 2026"
 */
export function formatDate(isoDate) {
  if (!isoDate) return "-";
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Formats a signed percentage change, adding a "+" for positive values.
 * Used anywhere we show price/margin movement, e.g. "+14%" or "-6.2%".
 */
export function formatSignedPercentage(value, decimals = 1) {
  if (value === null || value === undefined || Number.isNaN(value)) return "-";
  const sign = value > 0 ? "+" : "";
  return `${sign}${Number(value).toFixed(decimals)}%`;
}
