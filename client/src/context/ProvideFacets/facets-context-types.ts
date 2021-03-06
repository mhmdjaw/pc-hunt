import { Brand } from "../../api/brand";
import { Category } from "../../api/category";

export interface FacetsState {
  categories: Category[];
  brands: Brand[];
  loading: boolean;
}

export interface FacetsContext {
  categories: Category[];
  brands: Brand[];
}
