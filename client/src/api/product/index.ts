import axios, { AxiosResponse } from "axios";
import { API } from "../../config";
import { Product } from "./product-types";
export type { Product } from "./product-types";

export const createProduct = (
  product: FormData
): Promise<AxiosResponse<Product>> =>
  axios.post<Product>(`${API}/product/create`, product, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
    },
  });

export const getProducts = (
  sortBy: string
): Promise<AxiosResponse<Product[]>> =>
  axios.get<Product[]>(`${API}/products?sortBy=${sortBy}&order=desc&limit=10`);

export const getProductImage = (id: string): string => {
  return `${API}/product/image/${id}`;
};
