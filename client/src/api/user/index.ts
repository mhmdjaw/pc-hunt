import axios, { AxiosResponse } from "axios";
import { API } from "../../config";
import { User } from "./user-types";
export type { User } from "./user-types";

export const getUser = (): Promise<boolean> =>
  axios
    .get<User>(`${API}/user`, {
      withCredentials: true,
    })
    .then((user) => {
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    })
    .catch(() => {
      return false;
    });

export const getAdmin = (): Promise<boolean> =>
  axios
    .get<User>(`${API}/admin`, {
      withCredentials: true,
    })
    .then((user) => {
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    })
    .catch(() => {
      return false;
    });

export const updateUser = (name: string): Promise<AxiosResponse<User>> =>
  axios.put<User>(`${API}/user`, { name }, { withCredentials: true });
