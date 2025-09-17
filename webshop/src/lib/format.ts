export function discountPercent(price: number, discounted?: number) {
  if (discounted == null || discounted >= price) return 0;
  return Math.round(100 - (discounted / price) * 100);
}

export function formatCurrency(n: number, locale = "nb-NO", currency = "NOK") {
  return new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 2 }).format(n);
}