import type { CartLine } from '../types';

// Mock catalogue. No real store or payment processing is involved.
export const initialCart: CartLine[] = [
  {
    product: {
      id: 'console-bundle',
      name: 'Nova Console Bundle',
      description: 'Console, wireless controller, and a digital game voucher.',
      unitPrice: 499.99,
    },
    quantity: 1,
  },
  {
    product: {
      id: 'extra-controller',
      name: 'Wireless Controller',
      description: 'Second controller for local co-op play.',
      unitPrice: 69.99,
    },
    quantity: 1,
  },
  {
    product: {
      id: 'subscription-12m',
      name: 'Plus Membership (12 months)',
      description: 'Online multiplayer and a monthly games catalogue.',
      unitPrice: 59.99,
    },
    quantity: 1,
  },
];

export const TAX_RATE = 0.08;
export const CURRENCY = 'USD';
export const LOCALE = 'en-US';
