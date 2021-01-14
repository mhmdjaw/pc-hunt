import axios, { AxiosResponse } from "axios";
import { AUTH } from "../config";
import { SignupValues, LoginValues } from "./values";

export const signup = (
  values: SignupValues
): Promise<AxiosResponse<SignupValues>> =>
  axios.post<SignupValues>(`${AUTH}/signup`, values, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

export const login = (
  values: LoginValues
): Promise<AxiosResponse<LoginValues>> =>
  axios.post<LoginValues>(`${AUTH}/login`, values, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
