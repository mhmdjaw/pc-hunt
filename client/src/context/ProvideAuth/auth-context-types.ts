import { User } from "../../api/user";
import { LoginValues, SignupValues } from "../../auth";

export type AuthResultCallback = (authStatus: boolean, message: string) => void;

export interface State {
  isLoading: boolean;
  user: User | null;
}

export interface AuthContext {
  user: User | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<State>>;
  signup: (values: SignupValues, cb: AuthResultCallback) => void;
  login: (values: LoginValues, cb: AuthResultCallback) => void;
  logout: () => void;
}
