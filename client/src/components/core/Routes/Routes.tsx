import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../Home";
import NavBar from "../NavBar/NavBar";
import Login from "../../user/Login";
import Signup from "../../user/Signup";
import { AuthSuccess } from "../../user/Auth";
import AuthRoute from "../../user/Auth/AuthRoute";

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <AuthRoute key={0} exact path="/login" authType="guest">
          <Login />
        </AuthRoute>
        <AuthRoute key={1} exact path="/signup" authType="guest">
          <Signup />
        </AuthRoute>
        <AuthRoute key={2} exact path="/" authType="unprotected">
          <NavBar />
          <AuthRoute exact path="/" authType="unprotected">
            <Home />
          </AuthRoute>
        </AuthRoute>
      </Switch>
      <Route path="/auth/success">
        <AuthSuccess />
      </Route>
    </Router>
  );
};

export default Routes;
