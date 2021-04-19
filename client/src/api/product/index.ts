import axios, { AxiosResponse, CancelToken } from "axios";
import { API } from "../../config";
import { Product, SearchParams, SearchResults } from "./product-types";
import queryString from "query-string";
import { ajax, AjaxResponse } from "rxjs/ajax";
import { Observable } from "rxjs";
export type { Product, SearchParams } from "./product-types";

const searchParamsToUrl = (params: SearchParams) => {
  const query = queryString.stringify(params);
  return `${API}/products/search?${query}`;
};

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
  params: SearchParams,
  cancelToken?: CancelToken
): Promise<AxiosResponse<SearchResults>> =>
  axios.get<SearchResults>(searchParamsToUrl(params), { cancelToken });

export const getSearchResults = (
  params: SearchParams
): Observable<AjaxResponse> => ajax(searchParamsToUrl(params));

export const getProduct = (
  slug: string,
  cancelToken?: CancelToken
): Promise<AxiosResponse<Product>> =>
  axios.get<Product>(`${API}/product/${slug}`, { cancelToken });

export const getRelatedProducts = (
  slug: string,
  cancelToken?: CancelToken
): Promise<AxiosResponse<Product[]>> =>
  axios.get(`${API}/products/related/${slug}`, { cancelToken });

export const getMyProducts = (
  cancelToken?: CancelToken
): Promise<AxiosResponse<Product[]>> =>
  axios.get(`${API}/products/seller`, { withCredentials: true, cancelToken });

export const searchMyProducts = (
  search: string,
  cancelToken?: CancelToken
): Promise<AxiosResponse<Product[]>> =>
  axios.get(`${API}/products/seller/${search}`, {
    withCredentials: true,
    cancelToken,
  });

export const updateProduct = (
  slug: string,
  formData: FormData,
  cancelToken?: CancelToken
): Promise<AxiosResponse<Product>> =>
  axios.put(`${API}/product/${slug}`, formData, {
    withCredentials: true,
    cancelToken,
  });

export const deleteProduct = (
  slug: string,
  cancelToken?: CancelToken
): Promise<AxiosResponse<{ message: string }>> =>
  axios.delete<{ message: string }>(`${API}/product/${slug}`, {
    withCredentials: true,
    cancelToken,
  });
