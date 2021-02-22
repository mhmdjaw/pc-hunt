import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { Rating, Skeleton } from "@material-ui/lab";
import useProductCardStyles from "./product-card-styles";
import { getProductImage, Product } from "../../../api/product";
import clsx from "clsx";

type LoadingProductCardProps = {
  loading: true;
  product?: never;
};

type LoadedProductCardProps = {
  loading?: false;
  product: Product;
};

type ProductCardProps = LoadedProductCardProps | LoadingProductCardProps;

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  loading,
}: ProductCardProps) => {
  const classes = useProductCardStyles();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("sm"));
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  return (
    <Card className={classes.card}>
      <Box className={classes.actionArea} tabIndex={0}></Box>
      <CardContent>
        <Box className={classes.imgContainer}>
          <Box>
            {!imageLoaded && (
              <Skeleton animation="wave" variant="rect" height="100%" />
            )}
            {product && (
              <img
                className={clsx(classes.img, {
                  [classes.imgLoaded]: imageLoaded,
                })}
                src={getProductImage(product._id)}
                onLoad={() => setImageLoaded(true)}
              />
            )}
            {!(isTablet || loading) && (
              <Box
                className={classes.cardAction}
                bgcolor="primary.main"
                color="primary.contrastText"
                fontSize="h5.fontSize"
              >
                {product && product?.quantity > 0
                  ? "Add to Cart"
                  : "Learn More"}
              </Box>
            )}
          </Box>
        </Box>
        <Box className={classes.productTitle} fontSize="body2.fontSize">
          {loading ? (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton width="80%" />
            </>
          ) : (
            product?.name
          )}
        </Box>
        <Box m="10px 0">
          {loading ? (
            <Skeleton width="120px" />
          ) : (
            <Rating className={classes.rating} value={5} readOnly />
          )}
        </Box>
        <Box fontSize="h6.fontSize" fontWeight={700}>
          {loading ? <Skeleton width="80px" /> : `$${product?.price}`}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
