import axios, { AxiosResponse, CancelToken } from "axios";
import { API } from "../../config";
import { Product } from "../product";

export const getWishlist = (
  cancelToken?: CancelToken
): Promise<AxiosResponse<Product[]>> =>
  axios.get<Product[]>(`${API}/wishlist`, {
    withCredentials: true,
    cancelToken,
  });

export const addToWishlist = (
  slug: string,
  cancelToken?: CancelToken
): Promise<AxiosResponse<{ exists: boolean }>> =>
  axios.post<{ exists: boolean }>(`${API}/wishlist/${slug}`, undefined, {
    withCredentials: true,
    cancelToken,
  });

export const removeFromWishlist = (
  slug: string,
  cancelToken?: CancelToken
): Promise<AxiosResponse<{ message: string }>> =>
  axios.delete<{ message: string }>(`${API}/wishlist/${slug}`, {
    withCredentials: true,
    cancelToken,
  });
