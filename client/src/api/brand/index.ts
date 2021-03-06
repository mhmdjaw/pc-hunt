import axios, { AxiosResponse } from "axios";
import { API } from "../../config";
import { Brand } from "./brand-types";
export type { Brand } from "./brand-types";

export const getBrands = (): Promise<AxiosResponse<Brand[]>> =>
  axios.get<Brand[]>(`${API}/brands`);
