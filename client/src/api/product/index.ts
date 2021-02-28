import axios, { AxiosResponse } from "axios";
import { API } from "../../config";
import { Product, SearchParams } from "./product-types";
import queryString from "query-string";
export type { Product, SearchParams } from "./product-types";

export const createProduct = (
  product: FormData
): Promise<AxiosResponse<Product>> =>
  axios.post<Product>(`${API}/product/create`, product, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
    },
  });

export const getProductImage = (id: string): string => {
  return `${API}/product/image/${id}`;
};

export const getProducts = (
  params: SearchParams
): Promise<AxiosResponse<Product[]>> => {
  const query = queryString.stringify(params);
  return axios.get<Product[]>(`${API}/products/search?${query}`);
};
