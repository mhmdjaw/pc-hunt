import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../Home";
import NavBar from "../NavBar/NavBar";
import Login from "../../user/Login";
import Signup from "../../user/Signup";
import { AuthSuccess } from "../../user/Auth";

const Routes: React.FC = () => {
  return (
    <Router>
      {/* <NavBar /> */}
      <Route exact path="/">
        <Login />
      </Route>
      <Switch>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
      </Switch>
      <Route path="/auth/success">
        <AuthSuccess />
      </Route>
    </Router>
  );
};

export default Routes;
