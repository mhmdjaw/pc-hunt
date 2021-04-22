import {
  Box,
  Card,
  CircularProgress,
  Divider,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Product } from "../../../api/product";
import { getWishlist, removeFromWishlist } from "../../../api/wishlist";
import { useFacets } from "../../../context";
import { newToken, useCancelToken } from "../../../helpers";
import useWishlistStyles from "./wishlist-styles";
import WishlistProduct from "./WishlistProduct";

interface State {
  products: {
    product: Product;
    removing: boolean;
  }[];
  loading: boolean;
}

const Wishlist: React.FC = () => {
  const classes = useWishlistStyles();
  const cancelSource = useCancelToken();
  const { showSnackbar } = useFacets();
  const [state, setState] = useState<State>({ products: [], loading: true });

  useEffect(
    () => {
      getWishlist(cancelSource.current?.token)
        .then((response) => {
          setState({
            products: response.data.map((product) => ({
              product,
              removing: false,
            })),
            loading: false,
          });
        })
        .catch((err) => {
          if (!axios.isCancel(err)) {
            console.log(err.response.data.error);
          }
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const removeProduct = (i: number) => {
    cancelSource.current?.cancel();
    cancelSource.current = newToken();
    state.products[i].removing = true;
    setState({ ...state });
    removeFromWishlist(
      state.products[i].product.slug,
      cancelSource.current.token
    )
      .then((response) => {
        state.products.splice(i, 1);
        setState({ ...state });
        showSnackbar(response.data.message, "success");
      })
      .catch((err) => {
        state.products[i].removing = false;
        setState({ ...state });
        if (!axios.isCancel(err)) {
          showSnackbar(err.response.data.error, "error");
        }
      });
  };

  return (
    <Box m="60px auto 90px" p="0 16px" maxWidth="900px">
      <Typography className={classes.title} variant="h4">
        Your Wishlist
      </Typography>
      {state.loading ? (
        <div className={classes.loading}>
          <CircularProgress disableShrink size={50} />
        </div>
      ) : state.products.length === 0 ? (
        <Box fontSize="h4.fontSize">You have no products in your wishlist.</Box>
      ) : (
        <Card variant="outlined">
          {state.products.map((product, i) => (
            <Fragment key={product.product._id}>
              <WishlistProduct
                product={product.product}
                removing={product.removing}
                removeProduct={() => removeProduct(i)}
              />
              {i < state.products.length - 1 && <Divider />}
            </Fragment>
          ))}
        </Card>
      )}
    </Box>
  );
};

export default Wishlist;
