import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider,
  Fab,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { newToken, useCancelToken } from "../../../helpers";
import { CustomButton, CustomIconButton } from "../../common";
import { Add, Search } from "@material-ui/icons";
import {
  deleteProduct,
  getMyProducts,
  Product,
  searchMyProducts,
} from "../../../api/product";
import MyProduct from "./MyProduct/MyProduct";
import { useFacets } from "../../../context";
import axios from "axios";
import useMyProductsStyles from "./my-products-styles";

interface State {
  products: { product: Product; removing: boolean }[];
  loading: boolean;
  noProducts: boolean;
}

const MyProducts: React.FC = () => {
  const classes = useMyProductsStyles();
  const cancelSource = useCancelToken();
  const { showSnackbar } = useFacets();
  const [state, setState] = useState<State>({
    products: [],
    loading: true,
    noProducts: false,
  });
  const [value, setValue] = useState("");
  const [dialog, setDialog] = useState({
    open: false,
    productIndex: -1,
  });

  useEffect(
    () => {
      getMyProducts(cancelSource.current?.token)
        .then((response) => {
          setState({
            products: response.data.map((product) => ({
              product,
              removing: false,
            })),
            noProducts: response.data.length === 0,
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

  const search = () => {
    cancelSource.current?.cancel();
    cancelSource.current = newToken();
    setState({ ...state, loading: true });
    if (value.length > 0) {
      const encodedValue = encodeURIComponent(
        value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      );
      searchMyProducts(encodedValue, cancelSource.current.token)
        .then((response) => {
          setState({
            products: response.data.map((product) => ({
              product,
              removing: false,
            })),
            noProducts: false,
            loading: false,
          });
        })
        .catch((err) => {
          console.log(err.response.data.error);
        });
    } else {
      getMyProducts(cancelSource.current?.token)
        .then((response) => {
          setState({
            products: response.data.map((product) => ({
              product,
              removing: false,
            })),
            noProducts: response.data.length === 0,
            loading: false,
          });
        })
        .catch((err) => {
          console.log(err.response.data.error);
        });
    }
  };

  const confirmRemoveProduct = () => {
    cancelSource.current?.cancel();
    cancelSource.current = newToken();
    const i = dialog.productIndex;
    setDialog({ ...dialog, open: false });
    state.products[i].removing = true;
    setState({ ...state });
    deleteProduct(state.products[i].product.slug, cancelSource.current.token)
      .then((response) => {
        state.products.splice(i, 1);
        setState({ ...state, noProducts: state.products.length === 0 });
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

  const removeProduct = (i: number) => {
    setDialog({ open: true, productIndex: i });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue(value);
  };

  return (
    <Box m="60px auto 90px" p="0 16px" maxWidth="900px">
      <Typography className={classes.title} variant="h4">
        Your Products
      </Typography>
      {state.noProducts ? (
        <Box fontSize="h4.fontSize">
          You have no products. Click on the button at the bottom right of the
          page to create your first product.
        </Box>
      ) : (
        <>
          <FormControl
            className={classes.searchInput}
            variant="outlined"
            fullWidth
          >
            <InputLabel htmlFor="searchbox">Product Name</InputLabel>
            <OutlinedInput
              id="searchbox"
              name="Search"
              label="Product Name"
              fullWidth
              value={value}
              onChange={handleInputChange}
              onKeyDown={(event) => event.key === "Enter" && search()}
              endAdornment={
                <InputAdornment position="end">
                  <CustomIconButton edge="end" onClick={search}>
                    <Search />
                  </CustomIconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {state.loading || state.products.length > 0 ? (
            <Card variant="outlined">
              {state.loading ? (
                <>
                  <MyProduct loading />
                  <Divider />
                  <MyProduct loading />
                </>
              ) : (
                state.products.map((product, i) => (
                  <Fragment key={product.product._id}>
                    <MyProduct
                      product={product.product}
                      removing={product.removing}
                      removeProduct={() => removeProduct(i)}
                    />
                    {i < state.products.length - 1 && <Divider />}
                  </Fragment>
                ))
              )}
            </Card>
          ) : (
            <Box fontSize="h4.fontSize">No results found.</Box>
          )}
        </>
      )}
      <Dialog
        open={dialog.open}
        onClose={() => setDialog({ ...dialog, open: false })}
      >
        <DialogContent>
          <DialogContentText>
            Are you sure your want to remove this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CustomButton
            color="primary"
            onClick={() => setDialog({ ...dialog, open: false })}
          >
            No
          </CustomButton>
          <CustomButton color="primary" onClick={confirmRemoveProduct}>
            Yes
          </CustomButton>
        </DialogActions>
      </Dialog>
      <Fab
        component={RouterLink}
        to={"/product/create"}
        className={classes.fabAddProduct}
        color="secondary"
        focusVisibleClassName={classes.fabFocusVisible}
      >
        <Add />
      </Fab>
    </Box>
  );
};

export default MyProducts;
