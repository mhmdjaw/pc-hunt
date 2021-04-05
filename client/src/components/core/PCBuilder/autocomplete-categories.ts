import { Product } from "../../../api/product";

export interface AutocompleteCategory {
  products: Product[];
  category: string;
  value: string;
  loading: boolean;
  loaded: boolean;
}

const autocompleteCategories: AutocompleteCategory[] = [
  "Gaming Desktops",
  "Everyday Desktops",
  "Gaming Laptops",
].map((category) => ({
  products: [],
  category,
  value: "",
  loading: false,
  loaded: false,
}));

export default autocompleteCategories;
