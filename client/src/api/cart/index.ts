import axios, { AxiosResponse, CancelToken } from "axios";
import { API } from "../../config";
import { Badget, CartItemValues } from "./cart-types";

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
