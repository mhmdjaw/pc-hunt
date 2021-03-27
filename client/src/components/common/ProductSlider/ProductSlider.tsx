import React from "react";
import { Box, useMediaQuery, useTheme } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import clsx from "clsx";
import Slider, { Settings } from "react-slick";
import CustomIconButton from "../Button/CustomIconButton";
import ProductCard from "../ProductCard";
import "../../../slick-carousel/slick.css";
import "../../../slick-carousel/slick-theme.css";
import useProductSliderStyles from "./product-slider-styles";
import { Product } from "../../../api/product";

interface ArrowProps {
  direction: "prevArrow" | "nextArrow";
  onClick?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
}

interface ProductSliderProps {
  title: string;
  products: Product[];
}

const Arrow: React.FC<ArrowProps> = ({ direction, onClick }: ArrowProps) => {
  const classes = useProductSliderStyles();

  return (
    <CustomIconButton
      className={clsx(classes.arrow, direction)}
      color="inherit"
      onClick={onClick}
      size="small"
    >
      {direction === "prevArrow" ? (
        <ChevronLeft fontSize="large" />
      ) : (
        <ChevronRight fontSize="large" />
      )}
    </CustomIconButton>
  );
};

const ProductSlider: React.FC<ProductSliderProps> = ({
  title,
  products,
}: ProductSliderProps) => {
  const classes = useProductSliderStyles();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("sm"));

  const settings: Settings = {
    slidesToShow: 5,
    slidesToScroll: 5,
    swipe: isTablet ? true : false,
    prevArrow: <Arrow direction="prevArrow" />,
    nextArrow: <Arrow direction="nextArrow" />,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <>
      <Box
        fontSize="h3.fontSize"
        fontWeight={700}
        textAlign="center"
        marginBottom="30px"
      >
        {title}
      </Box>
      <Slider className={classes.slider} {...settings}>
        {products.length > 0
          ? products.map((product, i) => (
              <Box key={i} px="8px">
                <ProductCard product={product} />
              </Box>
            ))
          : [1, 2, 3, 4].map((i) => (
              <Box key={i} px="8px">
                <ProductCard loading />
              </Box>
            ))}
      </Slider>
    </>
  );
};

export default ProductSlider;
