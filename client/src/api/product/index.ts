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
