import { Category } from "../../api/category";

export interface FacetsState {
  categories: Category[];
  loading: boolean;
}

export interface FacetsContext {
  categories: Category[];
}
