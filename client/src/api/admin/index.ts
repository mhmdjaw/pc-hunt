import axios, { AxiosResponse } from "axios";
import { API } from "../../config";
import { Category } from "./admin-types";
export type { Category } from "./admin-types";

export const createCategory = (
  values: Category
): Promise<AxiosResponse<Category>> =>
  axios.post<Category>(`${API}/category/create`, values, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
