import { Box, Link, Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";
import clsx from "clsx";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import { getProductImage, Product } from "../../../../api/product";
import { displayCost } from "../../../../helpers";
import { CustomIconButton } from "../../../common";
import useWishlistProductStyles from "./wishlist-product-styles";

interface WishlistProductProps {
  product: Product;
  removing: boolean;
  removeProduct: () => void;
}

const WishlistProduct: React.FC<WishlistProductProps> = ({
  product,
  removing,
  removeProduct,
}: WishlistProductProps) => {
  const classes = useWishlistProductStyles();
  const history = useHistory();
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className={clsx(classes.product, {
        [classes.removingProduct]: removing,
      })}
    >
      {removing && <div className={classes.disableProduct} />}
      {!imageLoaded && (
        <Skeleton
          className={classes.skeletonImg}
          animation="wave"
          variant="rect"
        />
      )}
      {product && (
        <img
          src={getProductImage(product.slug)}
          className={clsx(classes.img, {
            [classes.imgLoaded]: imageLoaded,
          })}
          onLoad={() => setImageLoaded(true)}
          onClick={() => history.push(`/product/${product.slug}`)}
          alt="product-image"
        />
      )}
      <div className={classes.content}>
        <div className={classes.details}>
          <div className={classes.titleContainer}>
            <Link
              component={RouterLink}
              to={`/product/${product.slug}`}
              variant="body2"
              className={classes.title}
            >
              {product.name}
            </Link>
            <Box
              mt="12px"
              fontSize="body1.fontSize"
              fontWeight={500}
              color={product.quantity > 0 ? "success.main" : "error.main"}
            >
              {product.quantity > 0 ? "In Stock" : "Out of Stock"}
            </Box>
          </div>
          {product && (
            <Typography className={classes.price} variant="h6">
              {displayCost(product.price, 2)}
            </Typography>
          )}
        </div>
        <div className={classes.actions}>
          <CustomIconButton color="primary" onClick={removeProduct}>
            <Delete />
          </CustomIconButton>
        </div>
      </div>
    </div>
  );
};

export default WishlistProduct;
