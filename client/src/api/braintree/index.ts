import axios, { AxiosResponse, CancelToken } from "axios";
import { API } from "../../config";
import { ClientToken, PaymentValues } from "./braintree-types";
export type { ClientToken, PaymentValues } from "./braintree-types";

export const getBraintreeClientToken = (
  cancelToken?: CancelToken
): Promise<AxiosResponse<ClientToken>> =>
  axios.get<ClientToken>(`${API}/braintree/getToken`, {
    withCredentials: true,
    cancelToken,
  });

export const processPayment = (
  paymentValues: PaymentValues
): Promise<AxiosResponse<Record<string, unknown>>> =>
  axios.post(`${API}/braintree/payment`, paymentValues, {
    withCredentials: true,
  });
