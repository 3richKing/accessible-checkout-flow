import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { initialCart } from '../data/products';
import type { CartLine, Totals } from '../types';
import { calculateTotals, countItems } from './totals';

interface CartContextValue {
  lines: CartLine[];
  totals: Totals;
  itemCount: number;
  setQuantity: (productId: string, quantity: number) => void;
  removeLine: (productId: string) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [lines, setLines] = useState<CartLine[]>(initialCart);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    const nextQuantity = Math.max(1, Math.floor(quantity));
    setLines((current) =>
      current.map((line) =>
        line.product.id === productId ? { ...line, quantity: nextQuantity } : line,
      ),
    );
  }, []);

  const removeLine = useCallback((productId: string) => {
    setLines((current) => current.filter((line) => line.product.id !== productId));
  }, []);

  // Totals and item count are derived from lines, never stored separately.
  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      totals: calculateTotals(lines),
      itemCount: countItems(lines),
      setQuantity,
      removeLine,
    }),
    [lines, setQuantity, removeLine],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
