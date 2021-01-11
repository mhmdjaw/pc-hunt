import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../Home";
import NavBar from "../NavBar/NavBar";
import Login from "../../user/Login";
import Signup from "../../user/Signup";

const Routes: React.FC = () => {
  return (
    <Router>
      {/* <NavBar /> */}
      <Route exact path="/">
        <Signup />
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
    </Router>
  );
};

export default Routes;
