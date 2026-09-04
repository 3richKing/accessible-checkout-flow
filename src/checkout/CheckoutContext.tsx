import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { PaymentDetails, ShippingDetails } from '../types';

export const STEPS = ['cart', 'shipping', 'payment', 'review', 'confirmation'] as const;
export type StepId = (typeof STEPS)[number];

export const STEP_LABELS: Record<StepId, string> = {
  cart: 'Cart',
  shipping: 'Shipping',
  payment: 'Payment',
  review: 'Review',
  confirmation: 'Confirmation',
};

interface CheckoutContextValue {
  stepIndex: number;
  currentStep: StepId;
  shipping?: ShippingDetails;
  payment?: PaymentDetails;
  orderReference?: string;
  goToNext: () => void;
  goToPrevious: () => void;
  saveShipping: (details: ShippingDetails) => void;
  savePayment: (details: PaymentDetails) => void;
  placeOrder: () => void;
}

const CheckoutContext = createContext<CheckoutContextValue | undefined>(undefined);

const generateOrderReference = (): string => {
  const suffix = Math.floor(100000 + Math.random() * 900000);
  return `PS-${suffix}`;
};

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [shipping, setShipping] = useState<ShippingDetails>();
  const [payment, setPayment] = useState<PaymentDetails>();
  const [orderReference, setOrderReference] = useState<string>();

  const goToNext = useCallback(() => {
    setStepIndex((index) => Math.min(index + 1, STEPS.length - 1));
  }, []);

  const goToPrevious = useCallback(() => {
    setStepIndex((index) => Math.max(index - 1, 0));
  }, []);

  const saveShipping = useCallback((details: ShippingDetails) => {
    setShipping(details);
  }, []);

  const savePayment = useCallback((details: PaymentDetails) => {
    setPayment(details);
  }, []);

  const placeOrder = useCallback(() => {
    setOrderReference((current) => current ?? generateOrderReference());
    setStepIndex(STEPS.indexOf('confirmation'));
  }, []);

  const value = useMemo<CheckoutContextValue>(
    () => ({
      stepIndex,
      currentStep: STEPS[stepIndex],
      shipping,
      payment,
      orderReference,
      goToNext,
      goToPrevious,
      saveShipping,
      savePayment,
      placeOrder,
    }),
    [
      stepIndex,
      shipping,
      payment,
      orderReference,
      goToNext,
      goToPrevious,
      saveShipping,
      savePayment,
      placeOrder,
    ],
  );

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
};

export const useCheckout = (): CheckoutContextValue => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};
