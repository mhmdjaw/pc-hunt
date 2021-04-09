export interface ClientToken {
  clientToken: string;
  success: boolean;
}

export interface PaymentValues {
  amount: number;
  paymentMethodNonce: string;
}
