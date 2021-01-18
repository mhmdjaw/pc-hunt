import { useEffect, useState } from "react";
import { User } from "../api/user";
import * as Auth from "../auth";
import { AuthContext, AuthResultCallback } from "./auth-context-types";

interface AuthState {
  isLoading: boolean;
  user: User | null;
}

const useProvideAuth = (): AuthContext => {
  const [state, setState] = useState<AuthState>({
    isLoading: true,
    user: null,
  });

  useEffect(() => {
    Auth.validateSession().then((response) => {
      if (response.data.user) {
        setState({
          user: response.data.user,
          isLoading: false,
        });
      } else {
        setState({
          user: null,
          isLoading: false,
        });
      }
    });
  }, []);

  const login = (values: Auth.LoginValues, cb: AuthResultCallback) => {
    Auth.login(values)
      .then((response) => {
        setState({
          ...state,
          user: response.data,
        });
        cb(true, "Authentication successfull");
      })
      .catch((err) => {
        cb(false, err.response.data.error);
      });
  };

  const signup = (values: Auth.SignupValues, cb: CallableFunction) => {
    Auth.signup(values)
      .then((response) => {
        setState({
          ...state,
          user: response.data,
        });
        cb(true, "Account successfully created");
      })
      .catch((err) => {
        cb(false, err.response.data.error);
      });
  };

  const logout = (cb: CallableFunction) => {
    Auth.logout()
      .then(() => {
        setState({
          ...state,
          user: null,
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    user: state.user,
    loading: state.isLoading,
    signup,
    login,
    logout,
  };
};

export default useProvideAuth;
