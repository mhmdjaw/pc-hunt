import { Box } from "@material-ui/core";
import React, { lazy, Suspense } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { ProvideFacets } from "../../../context";
import { LoadingPage, PageNotFound } from "../../common";
import {
  // Login,
  // Signup,
  AuthRoute,
  AuthSuccess,
} from "../../user";
import history from "./history";
import ScrollToTop from "./ScrollToTop";
const NavBar = lazy(() => import("../NavBar"));
const Home = lazy(() => import("../Home"));
const Account = lazy(() => import("../Account"));
const ProductForm = lazy(() => import("../ProductForm"));
const Footer = lazy(() => import("../Footer"));
const CategoryForm = lazy(() => import("../CategoryForm"));
const Login = lazy(() => import("../../user/Login"));
const Signup = lazy(() => import("../../user/Signup"));
const Shop = lazy(() => import("../Shop"));
const Product = lazy(() => import("../Product"));
const PCBuilder = lazy(() => import("../PCBuilder"));
const Cart = lazy(() => import("../Cart"));
const Payment = lazy(() => import("../Payment"));
const Address = lazy(() => import("../Address"));
const Orders = lazy(() => import("../Orders"));
const MyProducts = lazy(() => import("../MyProducts"));
const ReviewForm = lazy(() => import("../ReviewForm"));
const Wishlist = lazy(() => import("../Wishlist"));
const PasswordReset = lazy(() => import("../PasswordReset"));
const AccountInformation = lazy(() => import("../AccountInformation"));
const Brands = lazy(() => import("../Brands"));
const MyPosts = lazy(() => import("../MyPosts"));
const PostForm = lazy(() => import("../PostForm"));
const Blog = lazy(() => import("../Blog"));
const Post = lazy(() => import("../Post"));
const Testimonials = lazy(() => import("../Testimonials"));
const AboutUs = lazy(() => import("../AboutUs"));
const ContactUs = lazy(() => import("../ContactUs"));

const Routes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Router history={history}>
        <ScrollToTop />
        <Switch>
          <AuthRoute path="/login" authType="guest">
            <Login />
          </AuthRoute>
          <AuthRoute path="/signup" authType="guest">
            <Signup />
          </AuthRoute>
          <Route exact path="/auth-success">
            <AuthSuccess />
          </Route>

          <AuthRoute path="/" authType="unprotected">
            <ProvideFacets>
              <Box flex="1 0 auto">
                <NavBar />
                <Switch>
                  <AuthRoute exact path="/" authType="unprotected">
                    <Home />
                  </AuthRoute>
                  <AuthRoute path="/pc-builder" authType="unprotected">
                    <PCBuilder />
                  </AuthRoute>
                  <AuthRoute path="/cart" authType="protected">
                    <Cart />
                  </AuthRoute>
                  <AuthRoute path="/checkout/payment" authType="protected">
                    <Payment />
                  </AuthRoute>
                  <AuthRoute path="/orders" authType="protected">
                    <Orders />
                  </AuthRoute>
                  <AuthRoute path="/account" authType="protected">
                    <Account />
                  </AuthRoute>
                  <AuthRoute path="/account-information" authType="protected">
                    <AccountInformation />
                  </AuthRoute>
                  <AuthRoute path="/address" authType="protected">
                    <Address />
                  </AuthRoute>
                  <AuthRoute path="/wishlist" authType="protected">
                    <Wishlist />
                  </AuthRoute>
                  <AuthRoute path="/review/:slug" authType="protected">
                    <ReviewForm />
                  </AuthRoute>
                  <AuthRoute path="/my/products" authType="admin">
                    <MyProducts />
                  </AuthRoute>
                  <AuthRoute path="/my/posts" authType="admin">
                    <MyPosts />
                  </AuthRoute>
                  <AuthRoute path="/password" authType="protected">
                    <PasswordReset />
                  </AuthRoute>
                  <AuthRoute path="/brands" authType="unprotected">
                    <Brands />
                  </AuthRoute>
                  <AuthRoute path="/blog" authType="unprotected">
                    <Blog />
                  </AuthRoute>
                  <AuthRoute path="/reviews" authType="unprotected">
                    <Testimonials />
                  </AuthRoute>
                  <AuthRoute path="/about-us" authType="unprotected">
                    <AboutUs />
                  </AuthRoute>
                  <AuthRoute path="/contact-us" authType="unprotected">
                    <ContactUs />
                  </AuthRoute>
                  <AuthRoute path="/category/create" authType="admin">
                    <CategoryForm />
                  </AuthRoute>
                  <AuthRoute
                    exact
                    path={["/product/create", "/product/update/:slug"]}
                    authType="admin"
                  >
                    <ProductForm />
                  </AuthRoute>
                  <AuthRoute
                    path={[
                      "/category/:categorySlug",
                      "/brand/:brandSlug",
                      "/search/:keywords",
                      "/shop",
                    ]}
                    authType="unprotected"
                  >
                    <Shop />
                  </AuthRoute>
                  <AuthRoute exact path="/product/:slug" authType="unprotected">
                    <Product />
                  </AuthRoute>
                  <AuthRoute path="/post/create" authType="admin">
                    <PostForm />
                  </AuthRoute>
                  <AuthRoute path="/post/:slug" authType="unprotected">
                    <Post />
                  </AuthRoute>
                  <Route path="*">
                    <PageNotFound />
                  </Route>
                </Switch>
              </Box>
              <Footer />
            </ProvideFacets>
          </AuthRoute>
        </Switch>
      </Router>
    </Suspense>
  );
};

export default Routes;
