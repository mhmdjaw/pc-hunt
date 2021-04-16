import {
  Backdrop,
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Address, getAddress } from "../../../api/address";
import {
  ClientToken,
  getBraintreeClientToken,
  PaymentValues,
  processPayment,
} from "../../../api/braintree";
import { CartItem, getCartItems } from "../../../api/cart";
import { useFacets } from "../../../context";
import { useCancelToken, calculateOrderSummary } from "../../../helpers";
import { CustomButton } from "../../common";
import OrderSummary from "../../common/OrderSummary";
import DropIn from "braintree-web-drop-in-react";
import { Alert } from "@material-ui/lab";
import usePaymentStyles from "./payment-styles";

interface State {
  items: CartItem[];
  address: Address | null;
  orderSummary: {
    subtotal: number;
    taxes: number;
    loading: boolean;
  };
  loaded: boolean;
  instance: { requestPaymentMethod: () => Promise<{ nonce: string }> } | null;
  error?: string;
  isSubmitting: boolean;
  isProcessingPayment: boolean;
  isOrderPlaced: boolean;
  orderId?: string;
}

const Payment: React.FC = () => {
  const classes = usePaymentStyles();
  const history = useHistory();
  const cancelSource = useCancelToken();
  const { showSnackbar, updateBadget } = useFacets();
  const [state, setState] = useState<State>({
    items: [],
    address: null,
    orderSummary: {
      subtotal: 0,
      taxes: 0,
      loading: true,
    },
    loaded: false,
    instance: null,
    isSubmitting: false,
    isProcessingPayment: false,
    isOrderPlaced: false,
  });
  const [clientToken, setClientToken] = useState<ClientToken | null>(null);
  const [productQuantityHigh, setProductQuantityHigh] = useState<
    CartItem | undefined
  >(undefined);

  const validateConditions = (
    items: CartItem[] | null,
    address: Address | null | boolean
  ) => {
    if (items && items.length === 0) {
      history.replace("/cart");
      return;
    }

    if (!address) {
      showSnackbar("Update your address before proceeding to checkout", "info");
      history.push("/address");
      return;
    }
    //check if one of the products quantity is too high
    const product = items
      ? items.find((item) => {
          if (item.product.quantity < item.quantity) {
            return true;
          }
          return false;
        })
      : undefined;
    setProductQuantityHigh(product);
  };

  useEffect(
    () => {
      Promise.all([
        getCartItems(cancelSource.current?.token)
          .then((response) => {
            const items = response.data;
            const orderSummary = calculateOrderSummary(items);
            setState((s) => ({ ...s, items, orderSummary }));
            return items;
          })
          .catch((err) => {
            if (!axios.isCancel(err)) {
              showSnackbar(
                "Failed to load items, please try again later",
                "error"
              );
            }
            return null;
          }),
        getAddress(cancelSource.current?.token)
          .then((response) => {
            setState((s) => ({ ...s, address: response.data }));
            return response.data;
          })
          .catch((err) => {
            if (!axios.get(err)) {
              showSnackbar(
                "Failed to load your address, please try again later",
                "error"
              );
            }
            return true;
          }),
      ]).then(([items, address]) => {
        setState((s) => ({ ...s, loaded: true }));
        validateConditions(items, address);
      });

      getBraintreeClientToken(cancelSource.current?.token)
        .then((response) => {
          setClientToken(response.data);
        })
        .catch((err) => {
          if (!axios.isCancel(err)) {
            showSnackbar(
              "Something went wrong, please try again later",
              "error"
            );
          }
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const placeOrder = () => {
    if (state.instance) {
      setState({ ...state, isSubmitting: true });
      state.instance
        .requestPaymentMethod()
        .then((data) => {
          const nonce = data.nonce;
          const total = state.orderSummary.subtotal + state.orderSummary.taxes;
          const payment: PaymentValues = {
            paymentMethodNonce: nonce,
            amount: total,
          };
          setState((s) => ({
            ...s,
            isProcessingPayment: true,
            error: undefined,
          }));
          processPayment(payment)
            .then((response) => {
              setState((s) => ({
                ...s,
                isSubmitting: false,
                isProcessingPayment: false,
                isOrderPlaced: true,
                orderId: response.data.orderId,
              }));
              updateBadget(0);
            })
            .catch((err) => {
              console.log(err);
              setState((s) => ({
                ...s,
                isSubmitting: false,
                isProcessingPayment: false,
                error: err.response.data.error,
              }));
            });
        })
        .catch((err) => {
          setState((s) => ({ ...s, error: err.message, isSubmitting: false }));
        });
    }
  };

  return (
    <Box m="60px auto" p="0 3vw" maxWidth="1500px">
      {!state.isOrderPlaced ? (
        <>
          <Box m="0 0 30px 16px" fontWeight={700} fontSize="h4.fontSize">
            Payment
          </Box>
          {clientToken &&
          state.address &&
          state.items.length > 0 &&
          state.loaded &&
          !productQuantityHigh ? (
            <>
              {state.error && (
                <Alert className={classes.alert} severity="error">
                  {state.error}
                </Alert>
              )}
              <div className={classes.root}>
                <div className={classes.mainContainer}>
                  <DropIn
                    options={{
                      authorization: clientToken.clientToken,
                      paypal: { flow: "vault" },
                    }}
                    onInstance={(instance) => (state.instance = instance)}
                  />
                </div>
                <OrderSummary
                  subtotal={state.orderSummary.subtotal}
                  taxes={state.orderSummary.taxes}
                  loading={state.orderSummary.loading}
                  onClick={placeOrder}
                  isSubmitting={state.isSubmitting}
                />
              </div>
            </>
          ) : (
            <div className={classes.loading}>
              <CircularProgress disableShrink size={50} />
            </div>
          )}
        </>
      ) : (
        <>
          <Typography
            className={classes.successText}
            variant="h3"
            color="primary"
          >
            Thank you for your order!
          </Typography>
          <Typography className={classes.orderID} variant="h5">
            Order ID: <b>{state.orderId}</b>
          </Typography>
        </>
      )}
      <Dialog open={Boolean(productQuantityHigh)}>
        <DialogTitle>Not Enough Stock</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`The quantity requested for the product "${productQuantityHigh?.product.name}" exceeds the online inventory (${productQuantityHigh?.product.quantity}).`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CustomButton component={Link} to="/cart" color="primary">
            return to cart
          </CustomButton>
        </DialogActions>
      </Dialog>
      <Backdrop className={classes.backdrop} open={state.isProcessingPayment}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </Box>
  );
};

export default Payment;
