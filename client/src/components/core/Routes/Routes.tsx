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
      {/* <NavBar /> */}
      <AuthRoute exact path="/" authType="guest">
        <Login />
      </AuthRoute>
      <Switch>
        <AuthRoute exact path="/home" authType="admin">
          <Home />
        </AuthRoute>
        <Route exact path="/login">
          <Login />
        </Route>
        <AuthRoute exact path="/signup" authType="guest">
          <Signup />
        </AuthRoute>
      </Switch>
      <Route path="/auth/success">
        <AuthSuccess />
      </Route>
    </Router>
  );
};

export default Routes;
