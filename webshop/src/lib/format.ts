/**
 * Calculates the discount percentage from an original price and a discounted price.
 * Returns 0 if discounted is missing or not actually lower than the original price.
 *
 * @param {number} price
 * @param {number | undefined} discounted
 * @returns {number}
 */
export function discountPercent(price: number, discounted?: number) {
  if (discounted === undefined || discounted === null || discounted >= price) return 0;
  return Math.round(100 - (discounted / price) * 100);
}

/**
 * Formats a number as a currency string.
 *
 * @param {number} n
 * @param {string} locale
 * @param {string} currency
 * @returns {string}
 */
export function formatCurrency(n: number, locale = "nb-NO", currency = "NOK") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(n);
}