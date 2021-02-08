import React from "react";
import axios from "axios";
import { API } from "../../../config";
import {
  Box,
  createStyles,
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import ContainedButton from "../../common/ContainedButton";
import Slider, { Settings } from "react-slick";
import "../../../slick-carousel/slick.css";
import "../../../slick-carousel/slick-theme.css";
import clsx from "clsx";
import CustomIconButton from "../../common/CustomIconButton";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";

const useHomeStyles = makeStyles((theme) =>
  createStyles({
    container: {
      padding: "90px 12%",
      "& .slick-dots li.slick-active a": {
        backgroundColor: "#fff",
        opacity: 1,
      },
      "&:hover": {
        "& $arrowContainer": {
          visibility: "visible",
        },
      },
    },
    dotsContainer: {
      bottom: 30,
    },
    dot: {
      display: "inline-block",
      width: "12px",
      height: "12px",
      border: "3px solid #fff",
      borderRadius: "50%",
      opacity: 0.4,
      transition: "opacity .3s",
      "&:hover, &:focus-visible, &:focus": {
        outline: "none",
        opacity: 0.7,
      },
    },
    arrowContainer: {
      position: "absolute",
      display: "flex",
      alignItems: "center",
      top: 0,
      bottom: 0,
      margin: "auto",
      visibility: "hidden",
      "&.prevArrow": {
        left: "6%",
      },
      "&.nextArrow": {
        right: "6%",
      },
    },
    arrow: {
      opacity: 0.7,
      "&:hover, &:focus-visible": {
        opacity: 1,
      },
    },
    firstSlide: {
      height: "100%",
      width: "100%",
    },
  })
);

interface ArrowProps {
  direction: "prevArrow" | "nextArrow";
  onClick?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
}

const Arrow: React.FC<ArrowProps> = ({ direction, onClick }: ArrowProps) => {
  const classes = useHomeStyles();

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

const Home: React.FC = () => {
  const classes = useHomeStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const customPaging = (i: number) => {
    return (
      <a tabIndex={0} className={classes.dot} aria-label={`Page dot ${i}`} />
    );
  };

  const settings: Settings = {
    dots: true,
    swipeToSlide: false,
    dotsClass: clsx("slick-dots", classes.dotsContainer),
    customPaging: customPaging,
    arrows: isMobile ? false : true,
    prevArrow: <Arrow direction="prevArrow" />,
    nextArrow: <Arrow direction="nextArrow" />,
  };

  return (
    <>
      <Box bgcolor="primary.main" color="primary.contrastText">
        <Slider className={classes.container} {...settings}>
          <Box height="376px" p="3%" bgcolor="primary.dark">
            <Grid
              className={classes.firstSlide}
              container
              direction="column"
              justify="space-between"
              alignItems="center"
            >
              <Grid
                component={Box}
                item
                alignSelf={isMobile ? "center" : "flex-start"}
              >
                <Typography variant="h1">
                  <Box
                    fontWeight={700}
                    textAlign={isMobile ? "center" : "left"}
                  >
                    Keep your distance
                  </Box>
                </Typography>
              </Grid>
              <Grid
                component={Box}
                item
                alignSelf={isMobile ? "center" : "flex-end"}
              >
                <Typography variant="h1">
                  <Box
                    fontWeight={700}
                    textAlign={isMobile ? "center" : "left"}
                  >
                    Shop safely
                  </Box>
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box height="376px" bgcolor="primary.dark"></Box>
        </Slider>
      </Box>
      <Box height="350px"></Box>
    </>
  );
};

export default Home;
