import React from "react";
import {
  Box,
  Card,
  CardContent,
  createStyles,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
import clsx from "clsx";
import Slider, { Settings } from "react-slick";
import CustomIconButton from "../../../common/CustomIconButton";
import pc1 from "../../../../assets/images/pc1.png";
import product1 from "../../../../assets/images/product1.jpg";

interface ArrowProps {
  direction: "prevArrow" | "nextArrow";
  onClick?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
}

const useProductSliderStyles = makeStyles((theme) =>
  createStyles({
    slider: {
      padding: "0 3%",
    },
    arrowContainer: {
      position: "absolute",
      zIndex: 9,
      display: "flex",
      alignItems: "center",
      top: 0,
      bottom: 0,
      margin: "auto",
      "&.prevArrow": {
        left: "1%",
      },
      "&.nextArrow": {
        right: "1%",
      },
    },
    arrow: {
      opacity: 0.7,
      "&:hover, &:focus-visible": {
        opacity: 1,
      },
    },
    rating: {
      color: theme.palette.secondary.main,
      margin: "10px 0",
    },
    productTitle: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: 3,
      WebkitBoxOrient: "vertical",
    },
    imgContainer: {
      position: "relative",
      width: "100%",
      paddingTop: "100%",
      "& > div": {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 16,
        overflow: "hidden",
      },
    },
    img: {
      width: "100%",
      height: "100%",
      objectFit: "contain",
    },
    card: {
      position: "relative",
      cursor: "pointer",
      "&:hover": {
        "& $cardAction": {
          transform: "translateY(0)",
          opacity: 1,
        },
      },
    },
    cardAction: {
      position: "absolute",
      width: "100%",
      bottom: 0,
      textAlign: "center",
      fontWeight: 500,
      padding: "10px",
      zIndex: 2,
      transition: "background-color .15s, transform .5s, opacity 0.7s",
      transform: "translateY(100%)",
      opacity: 0,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
      "&:active": {
        backgroundColor: theme.palette.primary.light,
      },
    },
    actionArea: {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      borderRadius: "inherit",
      backgroundColor: "currentColor",
      opacity: 0,
      transition: "opacity 0.15s",
      zIndex: 1,
      "&:hover, &:focus-visible": {
        opacity: theme.palette.action.hoverOpacity,
      },
      "&:hover:active": {
        zIndex: 3,
        opacity: 0.3,
      },
    },
  })
);

const Arrow: React.FC<ArrowProps> = ({ direction, onClick }: ArrowProps) => {
  const classes = useProductSliderStyles();

  return (
    <Box className={clsx(classes.arrowContainer, direction)}>
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

const ProductSlider: React.FC = () => {
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
      <Slider className={classes.slider} {...settings}>
        <Box px="8px">
          <Card className={classes.card} tabIndex={0}>
            <Box className={classes.actionArea}></Box>
            <CardContent>
              <Box className={classes.imgContainer}>
                <Box>
                  <img className={classes.img} src={product1} />
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
                Samsung Galaxy Buds Pro In-Ear Noise Cancelling Truly Wireless
                Headphones - Phantom Violet
              </Box>
              <Rating className={classes.rating} value={5} readOnly />
              <Box fontSize="h6.fontSize" fontWeight={700}>
                $59.99
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box px="8px">
          <Card>
            <CardContent>
              <Box className={classes.imgContainer}>
                <Box className={classes.img}>
                  <img className={classes.img} src={pc1} />
                </Box>
              </Box>
              <Box className={classes.productTitle} fontSize="body2.fontSize">
                Samsung Galaxy Buds Pro In-Ear Noise Cancelling Truly Wireless
                Headphones - Phantom Violet
              </Box>
              <Rating className={classes.rating} value={5} readOnly />
              <Box fontSize="h6.fontSize" fontWeight={700}>
                $59.99
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box px="8px">
          <Card>
            <CardContent>
              <Box className={classes.imgContainer}>
                <Box className={classes.img}>
                  <img className={classes.img} src={pc1} />
                </Box>
              </Box>
              <Box className={classes.productTitle} fontSize="body2.fontSize">
                Samsung Galaxy Buds Pro In-Ear Noise Cancelling Truly Wireless
                Headphones - Phantom Violet
              </Box>
              <Rating className={classes.rating} value={5} readOnly />
              <Box fontSize="h6.fontSize" fontWeight={700}>
                $59.99
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box px="8px">
          <Card>
            <CardContent>
              <Box className={classes.imgContainer}>
                <Box className={classes.img}>
                  <img className={classes.img} src={pc1} />
                </Box>
              </Box>
              <Box className={classes.productTitle} fontSize="body2.fontSize">
                Samsung Galaxy Buds Pro In-Ear Noise Cancelling Truly Wireless
                Headphones - Phantom Violet
              </Box>
              <Rating className={classes.rating} value={5} readOnly />
              <Box fontSize="h6.fontSize" fontWeight={700}>
                $59.99
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box px="8px">
          <Card>
            <CardContent>
              <Box className={classes.imgContainer}>
                <Box className={classes.img}>
                  <img className={classes.img} src={pc1} />
                </Box>
              </Box>
              <Box className={classes.productTitle} fontSize="body2.fontSize">
                Samsung Galaxy Buds Pro In-Ear Noise Cancelling Truly Wireless
                Headphones - Phantom Violet
              </Box>
              <Rating className={classes.rating} value={5} readOnly />
              <Box fontSize="h6.fontSize" fontWeight={700}>
                $59.99
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box px="8px">
          <Card>
            <CardContent>
              <Box className={classes.imgContainer}>
                <Box className={classes.img}>
                  <img className={classes.img} src={pc1} />
                </Box>
              </Box>
              <Box className={classes.productTitle} fontSize="body2.fontSize">
                Samsung Galaxy Buds Pro In-Ear Noise Cancelling Truly Wireless
                Headphones - Phantom Violet
              </Box>
              <Rating className={classes.rating} value={5} readOnly />
              <Box fontSize="h6.fontSize" fontWeight={700}>
                $59.99
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box px="8px">
          <Card>
            <CardContent>
              <Box className={classes.imgContainer}>
                <Box className={classes.img}>
                  <img className={classes.img} src={pc1} />
                </Box>
              </Box>
              <Box className={classes.productTitle} fontSize="body2.fontSize">
                Samsung Galaxy Buds Pro In-Ear Noise Cancelling Truly Wireless
                Headphones - Phantom Violet
              </Box>
              <Rating className={classes.rating} value={5} readOnly />
              <Box fontSize="h6.fontSize" fontWeight={700}>
                $59.99
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Slider>
      <Box height="376px" />
    </>
  );
};

export default ProductSlider;
