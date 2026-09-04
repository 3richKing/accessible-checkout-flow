import { describe, expect, it } from 'vitest';
import type { CartLine } from '../types';
import { calculateTotals, countItems } from './totals';

const makeLine = (unitPrice: number, quantity: number, id = 'p'): CartLine => ({
  product: { id, name: id, description: '', unitPrice },
  quantity,
});

describe('calculateTotals', () => {
  it('returns zeroed totals for an empty cart', () => {
    expect(calculateTotals([])).toEqual({ subtotal: 0, tax: 0, total: 0 });
  });

  it('sums line items by unit price and quantity', () => {
    const lines = [makeLine(100, 2, 'a'), makeLine(50, 1, 'b')];
    const { subtotal } = calculateTotals(lines, 0.1);
    expect(subtotal).toBe(250);
  });

  it('applies the tax rate to the subtotal and adds it to the total', () => {
    const lines = [makeLine(100, 1)];
    expect(calculateTotals(lines, 0.08)).toEqual({ subtotal: 100, tax: 8, total: 108 });
  });

  it('rounds to cents to avoid floating point drift', () => {
    const lines = [makeLine(9.99, 3)];
    const { subtotal, tax, total } = calculateTotals(lines, 0.08);
    expect(subtotal).toBe(29.97);
    expect(tax).toBe(2.4);
    expect(total).toBe(32.37);
  });

  it('reflects a changed quantity in the subtotal', () => {
    expect(calculateTotals([makeLine(20, 1)], 0).subtotal).toBe(20);
    expect(calculateTotals([makeLine(20, 3)], 0).subtotal).toBe(60);
  });

  it('reflects a removed item in the subtotal', () => {
    const lines = [makeLine(20, 1, 'a'), makeLine(30, 1, 'b')];
    const remaining = lines.filter((line) => line.product.id !== 'b');
    expect(calculateTotals(remaining, 0).subtotal).toBe(20);
  });
});

describe('countItems', () => {
  it('sums quantities across all lines', () => {
    expect(countItems([makeLine(1, 2, 'a'), makeLine(1, 3, 'b')])).toBe(5);
  });
});
