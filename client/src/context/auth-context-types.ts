import { User } from "../api/user";
import { LoginValues, SignupValues } from "../auth";

export type AuthResultCallback = (authStatus: boolean, message: string) => void;

export interface AuthContext {
  user: User | null;
  loading: boolean;
  signup: (values: SignupValues, cb: AuthResultCallback) => void;
  login: (values: LoginValues, cb: AuthResultCallback) => void;
  logout: (cb: CallableFunction) => void;
}
