import { TAX_RATE } from '../data/products';
import type { CartLine, Totals } from '../types';

const roundToCents = (value: number): number => Math.round(value * 100) / 100;

/**
 * Pure derivation of order totals from cart lines. The tax and total are
 * derived here rather than stored, so they can never drift out of sync.
 */
export const calculateTotals = (lines: CartLine[], taxRate: number = TAX_RATE): Totals => {
  const subtotal = roundToCents(
    lines.reduce((sum, line) => sum + line.product.unitPrice * line.quantity, 0),
  );
  const tax = roundToCents(subtotal * taxRate);
  const total = roundToCents(subtotal + tax);

  return { subtotal, tax, total };
};

export const countItems = (lines: CartLine[]): number =>
  lines.reduce((sum, line) => sum + line.quantity, 0);
