const CURRENCY_FORMATTERIntl = Intl.NumberFormat(undefined, {
  currency: "USD",
  style: "currency",
});
export function formatCurrency(n: number) {
  return CURRENCY_FORMATTERIntl.format(n);
}
