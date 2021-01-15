import axios, { AxiosResponse } from "axios";
import { User } from "../api/user/user-types";
import { AUTH } from "../config";
import { SignupValues, LoginValues } from "./values-types";

export const signup = (values: SignupValues): Promise<AxiosResponse<User>> =>
  axios.post<User>(`${AUTH}/signup`, values, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

export const login = (values: LoginValues): Promise<AxiosResponse<User>> =>
  axios.post<User>(`${AUTH}/login`, values, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

export const verifyAuth = (): Promise<boolean> =>
  axios
    .get<User>(`${AUTH}/verify`, {
      withCredentials: true,
    })
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.log(err);

      return false;
    });

export const verifyAdmin = (): Promise<boolean> =>
  axios
    .get<User>(`${AUTH}/verify/admin`, {
      withCredentials: true,
    })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
