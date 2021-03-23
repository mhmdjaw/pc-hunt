import { Category } from "../category";

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  categories: Category[] | string[];
  brand: string;
  quantity: number;
  sold: number;
}

export interface SearchResults {
  priceRanges: {
    _id: number;
    count: number;
  }[];
  brands: {
    _id: string;
    count: number;
  }[];
  products: Product[];
  count: {
    numberOfResults: number;
  }[];
}

export interface SearchParams {
  order?: 1 | -1;
  sortBy?: string;
  limit?: number;
  skip?: number;
  category?: string;
  brand?: string[];
  price?: string;
  keywords?: string;
}
