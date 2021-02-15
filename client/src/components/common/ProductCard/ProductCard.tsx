import React from "react";
import {
  Box,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import useProductCardStyles from "./product-card-styles";

export interface ProductCardProps {
  img: string;
  title: string;
  rating: number;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  img,
  title,
  rating,
  price,
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
            <img className={classes.img} src={img} />
            {!isTablet && (
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
          {title}
        </Box>
        <Rating className={classes.rating} value={rating} readOnly />
        <Box fontSize="h6.fontSize" fontWeight={700}>
          ${price}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
