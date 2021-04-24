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

  const responsiveSettings = (number: number) => {
    if (products.length > 0) {
      if (products.length >= number) {
        return number;
      } else {
        return products.length;
      }
    } else {
      return number;
    }
  };

  const settings: Settings = {
    slidesToShow: responsiveSettings(5),
    slidesToScroll: responsiveSettings(5),
    swipe: isTablet ? true : false,
    prevArrow: <Arrow direction="prevArrow" />,
    nextArrow: <Arrow direction="nextArrow" />,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: responsiveSettings(4),
          slidesToScroll: responsiveSettings(4),
        },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: responsiveSettings(3),
          slidesToScroll: responsiveSettings(3),
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: responsiveSettings(2),
          slidesToScroll: responsiveSettings(2),
        },
      },
    ],
  };

  return (
    <>
      <Box fontSize="h3.fontSize" fontWeight={700} textAlign="center" mb="50px">
        {title}
      </Box>
      <Slider className={classes.slider} {...settings}>
        {products.length > 0
          ? products.map((product) => (
              <Box key={product._id} className={classes.slide}>
                <ProductCard product={product} />
              </Box>
            ))
          : [1, 2, 3, 4, 5].map((i) => (
              <Box key={i} px="8px" className={classes.slide}>
                <ProductCard loading />
              </Box>
            ))}
      </Slider>
    </>
  );
};

export default ProductSlider;
