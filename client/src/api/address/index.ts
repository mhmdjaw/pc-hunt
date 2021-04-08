import axios, { AxiosResponse, CancelToken } from "axios";
import { API } from "../../config";
import { Address } from "./address-types";
export type { Address } from "./address-types";

export const getAddress = (
  cancelToken?: CancelToken
): Promise<AxiosResponse<Address | null>> =>
  axios.get<Address | null>(`${API}/address`, {
    withCredentials: true,
    cancelToken,
  });

export const saveAddress = (
  address: Address,
  cancelToken?: CancelToken
): Promise<AxiosResponse<Address>> =>
  axios.post<Address>(`${API}/address`, address, {
    withCredentials: true,
    cancelToken,
  });
