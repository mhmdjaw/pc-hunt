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
import { displayCost, newToken, round, useCancelToken } from "../../../helpers";
import { CustomButton, CustomIconButton } from "../../common";
import { Add, Delete, Remove } from "@material-ui/icons";
import axios from "axios";
import clsx from "clsx";
import useCartStyles from "./cart-styles";
import { CartItem, CartItemValues } from "../../../api/cart";
import { Skeleton } from "@material-ui/lab";

interface CartItemsState {
  items: {
    product: Product;
    quantity: number;
    quantityValue: string;
    removing: boolean;
  }[];
  loaded: boolean;
}

const calculateOrderSummary = (items: CartItem[]) => {
  const subtotal = items.reduce(
    (accumulator, item) => accumulator + item.product.price * item.quantity,
    0
  );
  const taxes = 0.13 * subtotal;
  return {
    subtotal: round(subtotal, 2),
    taxes: round(taxes, 2),
    loading: false,
  };
};

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
              quantityValue: item.quantity.toString(),
              removing: false,
            })),
            loaded: true,
          });
          setOrderSummary(calculateOrderSummary(items));
        })
        .catch((err) => {
          if (!axios.isCancel(err)) {
            showSnackbar("Failed to load items.", false);
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
    let value = e.target.value;
    if (value.length > 0 && Number(value) < 1) {
      value = "1";
    }
    if (Number(value) > 99) {
      value = "99";
    }
    if (Number(value) > 0 && Number(value) < 100) {
      changeProductQuantity(
        { product: cartItems.items[i].product._id, quantity: Number(value) },
        i
      );
    }
    cartItems.items[i].quantityValue = value;
    setCartItems({ ...cartItems });
  };

  const quantityStepperClick = (i: number, direction: "add" | "remove") => {
    const newQuantity =
      Number(cartItems.items[i].quantityValue) + (direction === "add" ? 1 : -1);
    changeProductQuantity(
      { product: cartItems.items[i].product._id, quantity: newQuantity },
      i
    );
    cartItems.items[i].quantityValue = newQuantity.toString();
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
        showSnackbar("Product quantity upated.", true);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          cartItems.items[i].quantityValue = cartItems.items[
            i
          ].quantity.toString();
          setCartItems({ ...cartItems });
          setOrderSummary({ ...orderSummary, loading: false });
          showSnackbar("Failed to update the quantity of the product.", false);
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
        showSnackbar("Product has been removed from cart.", true);
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
                              disabled={Number(item.quantityValue) <= 1}
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
                              disabled={Number(item.quantityValue) >= 99}
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
            <div className={classes.orderSummaryContainer}>
              <Card className={classes.orderSummaryCard} elevation={3}>
                <Box mb="32px" fontWeight={700} fontSize="h4.fontSize">
                  Order Summary
                </Box>
                <table className={classes.orderSummaryTable}>
                  <tbody>
                    <tr>
                      <th>subtotal</th>
                      <td>
                        {orderSummary.loading ? (
                          <Skeleton
                            className={classes.costSkeleton}
                            animation="wave"
                            width={70}
                          />
                        ) : (
                          displayCost(orderSummary.subtotal, 2)
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>shipping</th>
                      <td>
                        {orderSummary.loading ? (
                          <Skeleton
                            className={classes.costSkeleton}
                            animation="wave"
                            width={70}
                          />
                        ) : (
                          "Free"
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>Estimated Taxes</th>
                      <td>
                        {orderSummary.loading ? (
                          <Skeleton
                            className={classes.costSkeleton}
                            animation="wave"
                            width={70}
                          />
                        ) : (
                          displayCost(orderSummary.taxes, 2)
                        )}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>Estimated Total</th>
                      <td>
                        {orderSummary.loading ? (
                          <Skeleton
                            className={classes.costSkeleton}
                            animation="wave"
                            width={70}
                          />
                        ) : (
                          displayCost(
                            orderSummary.subtotal + orderSummary.taxes,
                            2
                          )
                        )}
                      </td>
                    </tr>
                  </tfoot>
                </table>
                <CustomButton
                  variant="contained"
                  buttonClassName={classes.checkoutButton}
                  color="secondary"
                  size="large"
                  fullWidth
                >
                  Proceed to Checkout
                </CustomButton>
              </Card>
            </div>
          </div>
        ) : (
          <Box pb="30px" ml="16px" fontSize="h4.fontSize">
            Looks like it&aops;s empty! Why don&apos;t you add something?
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
