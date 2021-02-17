import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Home from "../Home";
import NavBar from "../NavBar/NavBar";
import Login from "../../user/Login";
import Signup from "../../user/Signup";
import { AuthSuccess } from "../../user/Auth";
import { AuthRoute } from "../../user/Auth";
import history from "./history";
import Account from "../Account";
import Category from "../Category";
import Product from "../Product";
import ScrollToTop from "./ScrollToTop";
import Footer from "../Footer";

const Routes: React.FC = () => {
  return (
    <Router history={history}>
      <ScrollToTop />
      <Switch>
        <AuthRoute path="/login" authType="guest">
          <Login />
        </AuthRoute>
        <AuthRoute path="/signup" authType="guest">
          <Signup />
        </AuthRoute>
        <Route exact path="/auth/success">
          <AuthSuccess />
        </Route>

        <AuthRoute path="/" authType="unprotected">
          <NavBar />
          <AuthRoute exact path="/" authType="unprotected">
            <Home />
          </AuthRoute>
          <AuthRoute exact path="/account" authType="protected">
            <Account />
          </AuthRoute>
          <AuthRoute path="/account/update" authType="protected"></AuthRoute>
          <AuthRoute path="/category" authType="admin">
            <Category />
          </AuthRoute>
          <AuthRoute path="/product" authType="admin">
            <Product />
          </AuthRoute>
          <Footer />
        </AuthRoute>
      </Switch>
    </Router>
  );
};

export default Routes;
