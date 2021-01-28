import axios, { AxiosResponse } from "axios";
import { API } from "../../config";

export const createProduct = (
  product: Product
): Promise<AxiosResponse<Product>> =>
  axios.post<Product>(`${API}/product/create`, product, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
    },
  });
