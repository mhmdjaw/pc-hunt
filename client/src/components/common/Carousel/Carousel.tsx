import React from "react";
import { Box, useMediaQuery, useTheme } from "@material-ui/core";
import Slider, { Settings } from "react-slick";
import "../../../slick-carousel/slick.css";
import "../../../slick-carousel/slick-theme.css";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import useCarouselStyles from "./carousel-styles";
import CustomIconButton from "../Button/CustomIconButton";

interface ArrowProps {
  direction: "prevArrow" | "nextArrow";
  onClick?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
}

interface CarouselProps {
  children: React.ReactNode;
}

const Arrow: React.FC<ArrowProps> = ({ direction, onClick }: ArrowProps) => {
  const classes = useCarouselStyles();

  return (
    <Box color="#fff" className={clsx(classes.arrowContainer, direction)}>
      <CustomIconButton
        className={classes.arrow}
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
    </Box>
  );
};

const Carousel: React.FC<CarouselProps> = ({ children }: CarouselProps) => {
  const classes = useCarouselStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const customPaging = (i: number) => {
    return <a href="#" className={classes.dot} aria-label={`Page dot ${i}`} />;
  };

  const settings: Settings = {
    dots: true,
    dotsClass: clsx("slick-dots", classes.dotsContainer),
    customPaging: customPaging,
    arrows: isMobile ? false : true,
    prevArrow: <Arrow direction="prevArrow" />,
    nextArrow: <Arrow direction="nextArrow" />,
  };

  return (
    <Box bgcolor="primary.main" color="primary.contrastText">
      <Slider className={classes.slider} {...settings}>
        {children}
      </Slider>
    </Box>
  );
};

export default Carousel;
