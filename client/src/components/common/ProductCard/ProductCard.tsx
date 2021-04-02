import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { Rating, Skeleton } from "@material-ui/lab";
import useProductCardStyles from "./product-card-styles";
import { getProductImage, Product } from "../../../api/product";
import clsx from "clsx";
import { useHistory } from "react-router";

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
  const history = useHistory();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("sm"));
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const handleProductClick = () => {
    if (product) {
      history.push(`/product/${product.slug}`);
    }
  };

  return (
    <Card className={classes.card}>
      <Box
        className={classes.actionArea}
        tabIndex={0}
        onClick={() => handleProductClick()}
        onKeyDown={(event) => event.key === "Enter" && handleProductClick()}
      />
      <CardContent>
        <Box className={classes.imgContainer}>
          <Box>
            {(!imageLoaded || loading) && (
              <Skeleton animation="wave" variant="rect" height="100%" />
            )}
            {product && (
              <img
                className={clsx(classes.img, {
                  [classes.imgLoaded]: imageLoaded,
                })}
                src={getProductImage(product.slug)}
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
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" width="80%" />
            </>
          ) : (
            product?.name
          )}
        </Box>
        <Box m="10px 0">
          {loading ? (
            <Skeleton animation="wave" width={120} />
          ) : (
            <Grid container justify="flex-start" alignItems="center">
              <Grid component={Box} item display="flex">
                <Rating
                  className={classes.rating}
                  value={5}
                  precision={0.5}
                  readOnly
                />
              </Grid>
              <Grid item>{"(99,999)"}</Grid>
            </Grid>
          )}
        </Box>
        <Box fontSize="h6.fontSize" fontWeight={700}>
          {loading ? (
            <Skeleton animation="wave" width={80} />
          ) : (
            `$${product?.price.toLocaleString()}`
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
