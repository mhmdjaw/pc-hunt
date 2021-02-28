import { Category } from "../category";

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  categories: Category[] | string[];
  quantity: number;
  sold: number;
  // image: {
  //   data: Buffer;
  //   contentType: string;
  // };
}

export interface SearchParams {
  order?: string;
  sortBy?: string;
  limit?: number;
  skip?: number;
  category?: string;
  price?: string;
  keywords?: string;
}
