import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Card,
  CircularProgress,
  Divider,
  Link,
  Typography,
} from "@material-ui/core";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { addOneToCart, getCartItems, removeCartItem } from "../../../api/cart";
import { getProductImage, Product } from "../../../api/product";
import { useFacets } from "../../../context";
import { newToken, useCancelToken } from "../../../helpers";
import { CustomIconButton } from "../../common";
import { Add, Delete, Remove } from "@material-ui/icons";
import axios from "axios";
import clsx from "clsx";
import useCartStyles from "./cart-styles";
import { CartItemValues } from "../../../api/cart";
import OrderSummary from "../../common/OrderSummary";
import { calculateOrderSummary } from "../../../helpers/helpers";

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
  const history = useHistory();
  const cancelSource = useCancelToken();
  const inputRef = useRef<Array<HTMLInputElement | null>>([]);
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
          inputRef.current = new Array(response.data.length);
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
            showSnackbar("Failed to load items", false);
            setCartItems({ items: [], loaded: true });
          }
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onWheel = (i: number) => {
    inputRef.current[i]?.blur();
    setTimeout(() => inputRef.current[i]?.focus(), 100);
  };

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
        showSnackbar("Product quantity upated", true);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          cartItems.items[i].quantityValue = cartItems.items[i].quantity;
          setCartItems({ ...cartItems });
          setOrderSummary({ ...orderSummary, loading: false });
          showSnackbar("Failed to update the quantity of the product", false);
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
        inputRef.current.splice(i, 1);
        cartItems.items.splice(i, 1);
        updateBadget(response.data.badget);
        setCartItems({ ...cartItems });
        setOrderSummary(calculateOrderSummary(cartItems.items));
        showSnackbar("Product has been removed from cart", true);
      })
      .catch((err) => {
        cartItems.items[i].removing = false;
        setCartItems({ ...cartItems });
        if (!axios.isCancel(err)) {
          setOrderSummary({ ...orderSummary, loading: false });
          showSnackbar(err.response.data.error, false);
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
                    <div
                      key={item.product._id}
                      className={clsx(classes.cartItem, {
                        [classes.removingItem]: item.removing,
                      })}
                    >
                      {item.removing && (
                        <div className={classes.disableCartItem} />
                      )}
                      <img
                        src={getProductImage(item.product.slug)}
                        className={classes.img}
                        onClick={() =>
                          history.push(`/product/${item.product.slug}`)
                        }
                      />
                      <div className={classes.productContent}>
                        <div className={classes.productDetails}>
                          <Link
                            component={RouterLink}
                            to={`/product/${item.product.slug}`}
                            variant="body2"
                            className={classes.productTitle}
                          >
                            {item.product.name}
                          </Link>
                          <Typography
                            className={classes.productPrice}
                            variant="h6"
                          >
                            ${item.product.price.toLocaleString()}
                          </Typography>
                        </div>
                        <div className={classes.productActions}>
                          <div className={classes.quantity}>
                            <CustomIconButton
                              className={classes.iconButton}
                              color="primary"
                              size="small"
                              disabled={
                                Boolean(item.quantityValue) &&
                                item.quantityValue <= 1
                              }
                              onClick={() => quantityStepperClick(i, "remove")}
                            >
                              <Remove fontSize="inherit" />
                            </CustomIconButton>
                            <input
                              className={classes.quantityInput}
                              ref={(el) => (inputRef.current[i] = el)}
                              type="number"
                              name="quantity"
                              min="1"
                              max="99"
                              autoComplete="off"
                              onWheel={() => onWheel(i)}
                              value={item.quantityValue}
                              onChange={(e) => handleInputChange(e, i)}
                            />
                            <CustomIconButton
                              className={classes.iconButton}
                              color="primary"
                              size="small"
                              disabled={item.quantityValue >= 99}
                              onClick={() => quantityStepperClick(i, "add")}
                            >
                              <Add fontSize="inherit" />
                            </CustomIconButton>
                          </div>
                          <CustomIconButton
                            color="primary"
                            onClick={() => removeItem(i)}
                          >
                            <Delete />
                          </CustomIconButton>
                        </div>
                      </div>
                    </div>
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
