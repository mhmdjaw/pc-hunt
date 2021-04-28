import axios from "axios";
import { useEffect, useState } from "react";
import * as Auth from "../../auth";
import history from "../../components/core/Routes/history";
import { AuthContext, AuthResultCallback, State } from "./auth-context-types";

const useProvideAuth = (): AuthContext => {
  const [state, setState] = useState<State>({
    isLoading: true,
    user: null,
  });

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response && error.response.status === 403) {
          setState({
            isLoading: false,
            user: null,
          });
          history.replace("/login", { from: history.location });
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

  const logout = () => {
    Auth.logout()
      .then(() => {
        setState({
          isLoading: false,
          user: null,
        });
      })
      .catch((err) => {
        setState({
          isLoading: false,
          user: null,
        });
        console.log(err);
      });
  };

  return {
    user: state.user,
    loading: state.isLoading,
    setUser: setState,
    signup,
    login,
    logout,
  };
};

export default useProvideAuth;
