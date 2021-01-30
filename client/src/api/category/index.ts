import axios, { AxiosResponse } from "axios";
import { API } from "../../config";
import { Category, CategoryValues } from "./category-types";
export type { Category } from "./category-types";

export const createCategory = (
  values: CategoryValues
): Promise<AxiosResponse<Category>> =>
  axios.post<Category>(`${API}/category/create`, values, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

export const getCategories = (): Promise<AxiosResponse<Category[]>> =>
  axios.get<Category[]>(`${API}/categories`);
