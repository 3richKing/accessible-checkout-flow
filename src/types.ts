export interface Product {
  id: string;
  name: string;
  description: string;
  unitPrice: number;
}

export interface CartLine {
  product: Product;
  quantity: number;
}

export interface Totals {
  subtotal: number;
  tax: number;
  total: number;
}

export interface ShippingDetails {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface PaymentDetails {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}
