import {
  Box,
  CircularProgress,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
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
import { useCancelToken } from "../../../helpers";
import { calculateOrderSummary } from "../../../helpers/helpers";
import { CustomButton } from "../../common";
import OrderSummary from "../../common/OrderSummary";
import DropIn from "braintree-web-drop-in-react";
import { Alert } from "@material-ui/lab";

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
}

const usePaymentStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },
    mainContainer: {
      paddingBottom: "30px",
      [theme.breakpoints.up("md")]: {
        flex: "1 1 70%",
        paddingRight: "24px",
      },
    },
    loading: {
      height: "120px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: "30px",
    },
  })
);

const Payment: React.FC = () => {
  const classes = usePaymentStyles();
  const history = useHistory();
  const cancelSource = useCancelToken();
  const { showSnackbar } = useFacets();
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
      showSnackbar("Update your address before proceeding to checkout", true);
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
                false
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
                false
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
            showSnackbar("Something went wrong, please try again later", false);
          }
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const buy = () => {
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
          setState((s) => ({ ...s, error: undefined }));
          processPayment(payment)
            .then((response) => {
              console.log(response.data);
              setState((s) => ({ ...s, isSubmitting: false }));
            })
            .catch((err) => {
              console.log(err);
              setState((s) => ({ ...s, isSubmitting: false }));
            });
        })
        .catch((err) => {
          setState((s) => ({ ...s, error: err.message, isSubmitting: false }));
        });
    }
  };

  return (
    <Box m="60px auto" p="0 3vw" maxWidth="1500px">
      <Box m="0 0 30px 16px" fontWeight={700} fontSize="h4.fontSize">
        Payment
      </Box>
      {clientToken &&
      state.address &&
      state.items.length > 0 &&
      state.loaded &&
      !productQuantityHigh ? (
        <>
          {state.error && <Alert severity="error">{state.error}</Alert>}
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
              onClick={buy}
              isSubmitting={state.isSubmitting}
            />
          </div>
        </>
      ) : (
        <div className={classes.loading}>
          <CircularProgress disableShrink size={50} />
        </div>
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
    </Box>
  );
};

export default Payment;
