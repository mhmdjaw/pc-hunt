import React from "react";
import { Router, Route } from "react-router-dom";
import Home from "../Home";
import NavBar from "../NavBar/NavBar";
import Login from "../../user/Login";
import Signup from "../../user/Signup";
import { AuthSuccess } from "../../user/Auth";
import { AuthRoute } from "../../user/Auth";
import history from "./history";

const Routes: React.FC = () => {
  return (
    <Router history={history}>
      <AuthRoute exact path="/" authType="unprotected">
        <NavBar />
        <AuthRoute path="/" authType="unprotected">
          <Home />
        </AuthRoute>
      </AuthRoute>
      <AuthRoute path="/login" authType="guest">
        <Login />
      </AuthRoute>
      <AuthRoute path="/signup" authType="guest">
        <Signup />
      </AuthRoute>
      <Route path="/auth/success">
        <AuthSuccess />
      </Route>
    </Router>
  );
};

export default Routes;
