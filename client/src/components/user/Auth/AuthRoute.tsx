import { Box, CircularProgress } from "@material-ui/core";
import React, { useState } from "react";
import {
  Redirect,
  Route,
  RouteProps,
  RouteComponentProps,
} from "react-router-dom";
import { getAdmin, getUser } from "../../../api/user";
import { verifyAdmin, verifyAuth } from "../../../auth";

type AuthType = "unprotected" | "guest" | "protected" | "admin";

interface AuthRouteProps extends RouteProps {
  authType: AuthType;
}

const checkBasedOnAuthType = (authType: AuthType): Promise<boolean> => {
  if (
    authType === "unprotected" ||
    authType === "guest" ||
    authType === "protected"
  ) {
    if (!localStorage.getItem("user")) {
      return getUser();
    } else {
      return verifyAuth();
    }
  } else {
    if (!localStorage.getItem("user")) {
      return getAdmin();
    } else {
      return verifyAdmin();
    }
  }
};

const AuthRoute: React.FC<AuthRouteProps> = ({
  authType,
  children,
  ...props
}: AuthRouteProps) => {
  const [state, setState] = useState({
    proceed: false,
    isLoading: true,
    isLoaded: false,
  });

  const checkAuthStatus = () => {
    checkBasedOnAuthType(authType)
      .then((authStatus) => {
        if (authStatus) {
          const proceed = authType === "guest" ? false : true;

          setState({
            isLoading: false,
            proceed: proceed,
            isLoaded: true,
          });
        } else {
          const proceed =
            authType === "guest" || authType === "unprotected" ? true : false;

          setState({
            isLoading: false,
            proceed: proceed,
            isLoaded: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRender = ({ location }: RouteComponentProps) => {
    if (!state.isLoaded) checkAuthStatus();

    return state.isLoading ? (
      <Box mt="50vh" ml="50vw">
        <CircularProgress />
      </Box>
    ) : state.proceed ? (
      children
    ) : authType === "guest" ? (
      <Redirect
        to={{
          pathname: "/",
          state: { from: location },
        }}
      />
    ) : (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: location },
        }}
      />
    );
  };

  return <Route {...props} render={handleRender} />;
};

export default AuthRoute;
