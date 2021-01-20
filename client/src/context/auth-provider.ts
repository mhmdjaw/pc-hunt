import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "../api/user";
import * as Auth from "../auth";
import history from "../components/core/Routes/history";
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
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 403) {
          setState({
            isLoading: false,
            user: null,
          });
          history.push("/login");
        }
        return Promise.reject(error);
      }
    );

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
          isLoading: false,
          user: response.data.user,
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
          isLoading: false,
          user: response.data.user,
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
          isLoading: false,
          user: null,
        });
        cb();
      })
      .catch((err) => {
        setState({
          isLoading: false,
          user: null,
        });
        cb();
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
