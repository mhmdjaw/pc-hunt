import React, { useState } from "react";
import { Link, Typography } from "@material-ui/core";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { Skeleton } from "@material-ui/lab";
import clsx from "clsx";
import { getProductImage, Product } from "../../../../api/product";
import { CustomButton } from "../../../common";
import useMyProductStyles from "./my-product-styles";

type LoadingMyProductProps = {
  loading: true;
  product?: never;
  removing?: never;
  removeProduct?: never;
};

type LoadedMyProductProps = {
  loading?: false;
  product: Product;
  removing: boolean;
  removeProduct: () => void;
};

type MyProductProps = LoadingMyProductProps | LoadedMyProductProps;

const MyProduct: React.FC<MyProductProps> = ({
  product,
  removing,
  removeProduct,
  loading,
}: MyProductProps) => {
  const classes = useMyProductStyles();
  const history = useHistory();
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className={clsx(classes.product, {
        [classes.removingProduct]: removing,
      })}
    >
      {removing && <div className={classes.disableProduct} />}
      {(!imageLoaded || loading) && (
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
            {product ? (
              <Link
                component={RouterLink}
                to={`/product/${product.slug}`}
                variant="body2"
                className={classes.title}
              >
                {product.name}
              </Link>
            ) : (
              <Typography variant="body2">
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" width={100} />
              </Typography>
            )}
          </div>
          {product && (
            <Typography className={classes.price} variant="h6">
              ${product.price.toLocaleString()}
            </Typography>
          )}
        </div>
        <div className={classes.actions}>
          <CustomButton color="primary" disabled={loading}>
            update
          </CustomButton>
          <CustomButton
            color="primary"
            onClick={removeProduct}
            disabled={loading}
          >
            delete
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default MyProduct;
