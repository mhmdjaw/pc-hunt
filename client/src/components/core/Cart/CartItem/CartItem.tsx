import React, { useRef, useState } from "react";
import clsx from "clsx";
import { getProductImage, Product } from "../../../../api/product";
import useCartItemStyles from "./cart-item-styles";
import { useHistory } from "react-router";
import { Link, Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { CustomIconButton } from "../../../common";
import { Add, Delete, Remove } from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";
import { displayCost } from "../../../../helpers";

interface CartItemProps {
  product: Product;
  quantityValue: number;
  removing: boolean;
  quantityStepperRemove: () => void;
  quantityStepperAdd: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeItem: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  product,
  quantityValue,
  removing,
  quantityStepperRemove,
  quantityStepperAdd,
  handleInputChange,
  removeItem,
}: CartItemProps) => {
  const classes = useCartItemStyles();
  const history = useHistory();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const onWheel = () => {
    inputRef.current?.blur();
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <div
      key={product._id}
      className={clsx(classes.cartItem, {
        [classes.removingItem]: removing,
      })}
    >
      {removing && <div className={classes.disableCartItem} />}
      {!imageLoaded && (
        <Skeleton
          className={classes.skeletonImg}
          animation="wave"
          variant="rect"
        />
      )}
      <img
        src={getProductImage(product.slug)}
        className={clsx(classes.img, {
          [classes.imgLoaded]: imageLoaded,
        })}
        onLoad={() => setImageLoaded(true)}
        onClick={() => history.push(`/product/${product.slug}`)}
        alt="product-image"
      />
      <div className={classes.productContent}>
        <div className={classes.productDetails}>
          <Link
            component={RouterLink}
            to={`/product/${product.slug}`}
            variant="body2"
            className={classes.productTitle}
          >
            {product.name}
          </Link>
          <Typography className={classes.productPrice} variant="h6">
            {displayCost(product.price, 2)}
          </Typography>
        </div>
        <div className={classes.productActions}>
          <div className={classes.quantity}>
            <CustomIconButton
              className={classes.iconButton}
              color="primary"
              size="small"
              disabled={Boolean(quantityValue) && quantityValue <= 1}
              onClick={quantityStepperRemove}
            >
              <Remove fontSize="inherit" />
            </CustomIconButton>
            <input
              className={classes.quantityInput}
              ref={inputRef}
              type="number"
              name="quantity"
              min="1"
              max="99"
              autoComplete="off"
              onWheel={onWheel}
              value={quantityValue}
              onChange={handleInputChange}
            />
            <CustomIconButton
              className={classes.iconButton}
              color="primary"
              size="small"
              disabled={quantityValue >= 99}
              onClick={quantityStepperAdd}
            >
              <Add fontSize="inherit" />
            </CustomIconButton>
          </div>
          <CustomIconButton color="primary" onClick={removeItem}>
            <Delete />
          </CustomIconButton>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
