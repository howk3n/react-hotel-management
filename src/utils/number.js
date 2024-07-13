/**
 * Formats value to a currency string
 * @param {number} value - The value to format
 * @returns {string} Formatted value with currency
 */
export function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}
