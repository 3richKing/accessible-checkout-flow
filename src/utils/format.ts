import { CURRENCY, LOCALE } from '../data/products';

const currencyFormatter = new Intl.NumberFormat(LOCALE, {
  style: 'currency',
  currency: CURRENCY,
});

export const formatCurrency = (value: number): string => currencyFormatter.format(value);
