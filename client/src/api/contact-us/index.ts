import axios, { AxiosResponse } from "axios";
import { API } from "../../config";
import { ContactUsValues } from "./contact-us-types";

export const contactUs = (
  values: ContactUsValues
): Promise<AxiosResponse<{ message: string }>> =>
  axios.post<{ message: string }>(`${API}/contact-us`, values);
