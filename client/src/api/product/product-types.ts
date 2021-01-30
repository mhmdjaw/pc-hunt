import { Category } from "../admin/admin-types";

export interface ProductValues {
  name: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  image: File;
}

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
