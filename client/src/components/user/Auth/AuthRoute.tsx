import React from "react";
import {
  Redirect,
  Route,
  RouteProps,
  RouteComponentProps,
} from "react-router-dom";
import { useAuth } from "../../../context";
import LoadingPage from "../../common/LoadingPage";

type AuthType = "unprotected" | "guest" | "protected" | "admin";

interface AuthRouteProps extends RouteProps {
  authType: AuthType;
}

const AuthRoute: React.FC<AuthRouteProps> = ({
  authType,
  children,
  ...props
}: AuthRouteProps) => {
  const { loading, user } = useAuth();

  const proceed = (): boolean => {
    switch (authType) {
      case "protected":
        return user ? true : false;

      case "guest":
        return user ? false : true;

      case "admin":
        return user && user.role === 1 ? true : false;

      default:
        return true;
    }
  };

  const handleRender = ({ location }: RouteComponentProps) => {
    return loading ? (
      <LoadingPage />
    ) : proceed() ? (
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
