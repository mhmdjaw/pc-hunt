import { Product } from "../product";

export interface Badget {
  badget: number;
}

export interface CartItemValues {
  product: string;
  quantity?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
