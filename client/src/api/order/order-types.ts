import { Address } from "../address";
import { Product } from "../product";

export interface Order {
  _id: string;
  item: {
    product: Product;
    quantity: number;
  };
  orderId: string;
  orderSummary: {
    productTotal: number;
    taxes: number;
  };
  status: "Unprocessed" | "Processing" | "Shipping" | "Delivered" | "Cancelled";
  address: Address;
  paymentMethod: {
    instrumentType: string;
    card: {
      cardType: string;
      last4: string;
    } | null;
    paypalEmail: string | null;
    imageUrl: string;
  };
  createdAt: string;
}
