import axios, { AxiosResponse, CancelToken } from "axios";
import { API } from "../../config";
import { Badget, CartItem, CartItemValues } from "./cart-types";
export type { CartItem, CartItemValues } from "./cart-types";

export const getBadget = (): Promise<AxiosResponse<Badget>> =>
  axios.get<Badget>(`${API}/cart/badget`, { withCredentials: true });

export const addOneToCart = (
  item: CartItemValues,
  cancelToken?: CancelToken
): Promise<AxiosResponse<Badget>> =>
  axios.post<Badget>(`${API}/cart/add-one`, item, {
    withCredentials: true,
    cancelToken,
  });

export const addManyToCart = (
  items: { products: CartItemValues[] },
  cancelToken?: CancelToken
): Promise<AxiosResponse<Badget>> =>
  axios.post<Badget>(`${API}/cart/add-many`, items, {
    withCredentials: true,
    cancelToken,
  });

export const getCartItems = (
  cancelToken?: CancelToken
): Promise<AxiosResponse<CartItem[]>> =>
  axios.get<CartItem[]>(`${API}/cart`, { withCredentials: true, cancelToken });

export const removeCartItem = (
  item: CartItemValues,
  cancelToken?: CancelToken
): Promise<AxiosResponse<Badget>> =>
  axios.delete<Badget>(`${API}/cart/remove-item`, {
    data: item,
    withCredentials: true,
    cancelToken,
  });
