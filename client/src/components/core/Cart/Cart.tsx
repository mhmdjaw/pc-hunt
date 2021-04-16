import React, { useEffect, useState } from "react";
import { Box, Card, CircularProgress, Divider } from "@material-ui/core";
import { addOneToCart, getCartItems, removeCartItem } from "../../../api/cart";
import { Product } from "../../../api/product";
import { useFacets } from "../../../context";
import {
  newToken,
  useCancelToken,
  calculateOrderSummary,
} from "../../../helpers";
import axios from "axios";
import useCartStyles from "./cart-styles";
import { CartItemValues } from "../../../api/cart";
import OrderSummary from "../../common/OrderSummary";
import CartItem from "./CartItem";

interface CartItemsState {
  items: {
    product: Product;
    quantity: number;
    quantityValue: number;
    removing: boolean;
  }[];
  loaded: boolean;
}

const Cart: React.FC = () => {
  const classes = useCartStyles();
  const cancelSource = useCancelToken();
  const { updateBadget, showSnackbar } = useFacets();
  const [cartItems, setCartItems] = useState<CartItemsState>({
    items: [],
    loaded: false,
  });
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    taxes: 0,
    loading: true,
  });

  useEffect(
    () => {
      getCartItems(cancelSource.current?.token)
        .then((response) => {
          const items = response.data;
          setCartItems({
            items: items.map((item) => ({
              product: item.product,
              quantity: item.quantity,
              quantityValue: item.quantity,
              removing: false,
            })),
            loaded: true,
          });
          setOrderSummary(calculateOrderSummary(items));
        })
        .catch((err) => {
          if (!axios.isCancel(err)) {
            showSnackbar("Failed to load items", "error");
            setCartItems({ items: [], loaded: true });
          }
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    let value = (e.target.value as unknown) as number;

    if (value && value < 1) {
      value = 1;
    }
    if (value && value > 99) {
      value = 99;
    }
    if (value > 0 && value < 100) {
      changeProductQuantity(
        { product: cartItems.items[i].product._id, quantity: value },
        i
      );
    }
    cartItems.items[i].quantityValue = value;
    setCartItems({ ...cartItems });
  };

  const quantityStepperClick = (i: number, direction: "add" | "remove") => {
    let newQuantity: number;
    if (!cartItems.items[i].quantityValue) {
      newQuantity = 1;
    } else {
      newQuantity =
        Number(cartItems.items[i].quantityValue) +
        (direction === "add" ? 1 : -1);
    }
    changeProductQuantity(
      { product: cartItems.items[i].product._id, quantity: newQuantity },
      i
    );
    cartItems.items[i].quantityValue = newQuantity;
    setCartItems({ ...cartItems });
  };

  const changeProductQuantity = (item: CartItemValues, i: number) => {
    cancelSource.current?.cancel();
    cancelSource.current = newToken();
    setOrderSummary({ ...orderSummary, loading: true });

    addOneToCart(item, cancelSource.current.token)
      .then((response) => {
        cartItems.items[i].quantity = item.quantity as number;
        updateBadget(response.data.badget);
        setCartItems({ ...cartItems });
        setOrderSummary(calculateOrderSummary(cartItems.items));
        showSnackbar("Product quantity upated", "success");
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          cartItems.items[i].quantityValue = cartItems.items[i].quantity;
          setCartItems({ ...cartItems });
          setOrderSummary({ ...orderSummary, loading: false });
          showSnackbar("Failed to update the quantity of the product", "error");
        }
      });
  };

  const removeItem = (i: number) => {
    cancelSource.current?.cancel();
    cancelSource.current = newToken();
    setOrderSummary({ ...orderSummary, loading: true });
    cartItems.items[i].removing = true;
    setCartItems({ ...cartItems });
    removeCartItem(
      { product: cartItems.items[i].product._id },
      cancelSource.current.token
    )
      .then((response) => {
        cartItems.items.splice(i, 1);
        updateBadget(response.data.badget);
        setCartItems({ ...cartItems });
        setOrderSummary(calculateOrderSummary(cartItems.items));
        showSnackbar("Product has been removed from cart", "success");
      })
      .catch((err) => {
        cartItems.items[i].removing = false;
        setCartItems({ ...cartItems });
        if (!axios.isCancel(err)) {
          setOrderSummary({ ...orderSummary, loading: false });
          showSnackbar(err.response.data.error, "error");
        }
      });
  };

  return (
    <Box m="60px 3vw">
      <Box m="0 0 30px 16px" fontWeight={700} fontSize="h4.fontSize">
        Your Cart
      </Box>
      {cartItems.loaded ? (
        cartItems.items.length > 0 ? (
          <div className={classes.cart}>
            <div className={classes.cartItems}>
              <Card variant="outlined">
                {cartItems.items.map((item, i) => (
                  <>
                    <CartItem
                      key={item.product._id}
                      product={item.product}
                      quantityValue={item.quantityValue}
                      removing={item.removing}
                      quantityStepperRemove={() =>
                        quantityStepperClick(i, "remove")
                      }
                      quantityStepperAdd={() => quantityStepperClick(i, "add")}
                      handleInputChange={(e) => handleInputChange(e, i)}
                      removeItem={() => removeItem(i)}
                    />
                    {i < cartItems.items.length - 1 && <Divider />}
                  </>
                ))}
              </Card>
            </div>
            <OrderSummary
              loading={orderSummary.loading}
              subtotal={orderSummary.subtotal}
              taxes={orderSummary.taxes}
              cart
            />
          </div>
        ) : (
          <Box pb="30px" ml="16px" fontSize="h4.fontSize">
            Looks like it&apos;s empty! Why don&apos;t you add something?
          </Box>
        )
      ) : (
        <div className={classes.loading}>
          <CircularProgress disableShrink size={50} />
        </div>
      )}
    </Box>
  );
};

export default Cart;
