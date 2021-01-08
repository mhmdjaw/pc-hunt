import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/core/Home";
import NavBar from "./components/core/NavBar/NavBar";
import Login from "./components/user/Login";
import Signup from "./components/user/Signup";

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/">
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

export default App;
