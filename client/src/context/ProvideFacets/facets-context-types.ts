import { Brand } from "../../api/brand";
import { Category } from "../../api/category";

export interface FacetsState {
  categories: Category[];
  brands: Brand[];
  badget: number;
  updateBadget: (number: number) => void;
  loading: boolean;
  snackbar: { open: boolean; success: boolean; text: string };
  showSnackbar: (text: string, success: boolean) => void;
  closeSnackbar: () => void;
}

export interface FacetsContext {
  categories: Category[];
  brands: Brand[];
  badget: number;
  updateBadget: (number: number) => void;
  showSnackbar: (text: string, success: boolean) => void;
}
