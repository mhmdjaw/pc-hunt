import axios, { AxiosResponse } from "axios";
import { User } from "../api/user/user-types";
import history from "../components/core/Routes/history";
import { AUTH } from "../config";
import { SignupValues, LoginValues, SessionResponse } from "./values-types";
export type {
  SignupValues,
  LoginValues,
  SessionResponse,
} from "./values-types";

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

export const validateSession = (): Promise<AxiosResponse<SessionResponse>> =>
  axios.get(`${AUTH}/session`, { withCredentials: true });

export const logout = (): Promise<AxiosResponse> =>
  axios.get(`${AUTH}/logout`, { withCredentials: true });

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 403) history.push("/login");
    return Promise.reject(error);
  }
);
