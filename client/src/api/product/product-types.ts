import { Category } from "../category";

export interface Product {
  name: string;
  description: string;
  price: number;
  category: Category;
  quantity: number;
  sold: number;
  image: {
    data: Buffer;
    contentType: string;
  };
}
