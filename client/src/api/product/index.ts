import axios, { AxiosResponse } from "axios";
import { API } from "../../config";
import { Product, ProductValues } from "./product-types";
export type { Product, ProductValues } from "./product-types";

export const createProduct = (
  product: ProductValues
): Promise<AxiosResponse<Product>> =>
  axios.post<Product>(`${API}/product/create`, product, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
    },
  });
