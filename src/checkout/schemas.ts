import { z } from 'zod';

export const shippingSchema = z.object({
  fullName: z.string().trim().min(1, 'Enter your full name.'),
  addressLine1: z.string().trim().min(1, 'Enter your street address.'),
  addressLine2: z.string().trim().optional(),
  city: z.string().trim().min(1, 'Enter your city or town.'),
  postalCode: z.string().trim().min(3, 'Enter a valid postal or ZIP code.'),
  country: z.string().trim().min(1, 'Select a country.'),
});

export const paymentSchema = z.object({
  cardName: z.string().trim().min(1, 'Enter the name on the card.'),
  cardNumber: z
    .string()
    .trim()
    .regex(/^\d{13,19}$/, 'Enter a card number with 13 to 19 digits.'),
  expiry: z
    .string()
    .trim()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Use the MM/YY format, for example 04/28.'),
  cvc: z
    .string()
    .trim()
    .regex(/^\d{3,4}$/, 'Enter the 3 or 4 digit security code.'),
});

export type ShippingFormValues = z.infer<typeof shippingSchema>;
export type PaymentFormValues = z.infer<typeof paymentSchema>;
