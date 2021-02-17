import React from "react";
import {
  Box,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { Rating, Skeleton } from "@material-ui/lab";
import useProductCardStyles from "./product-card-styles";

export interface CardProduct {
  img: string;
  title: string;
  rating: number;
  price: number;
}

type LoadingProductCardProps = {
  loading: true;
  img?: never;
  title?: never;
  rating?: never;
  price?: never;
};

type LoadedProductCardProps = {
  loading?: false;
  img: string;
  title: string;
  rating: number;
  price: number;
};

type ProductCardProps = LoadedProductCardProps | LoadingProductCardProps;

const ProductCard: React.FC<ProductCardProps> = ({
  img,
  title,
  rating,
  price,
  loading,
}: ProductCardProps) => {
  const classes = useProductCardStyles();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card className={classes.card}>
      <Box className={classes.actionArea} tabIndex={0}></Box>
      <CardContent>
        <Box className={classes.imgContainer}>
          <Box>
            {loading ? (
              <Skeleton animation="wave" variant="rect" height="100%" />
            ) : (
              <img className={classes.img} src={img} />
            )}
            {!(isTablet || loading) && (
              <Box
                className={classes.cardAction}
                bgcolor="primary.main"
                color="primary.contrastText"
                fontSize="h5.fontSize"
              >
                Learn More
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
            title
          )}
        </Box>
        <Box m="10px 0">
          {loading ? (
            <Skeleton width="120px" />
          ) : (
            <Rating className={classes.rating} value={rating} readOnly />
          )}
        </Box>
        <Box fontSize="h6.fontSize" fontWeight={700}>
          {loading ? <Skeleton width="80px" /> : `$${price}`}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
