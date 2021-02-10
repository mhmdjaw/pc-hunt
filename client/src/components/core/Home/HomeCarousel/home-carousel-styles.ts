import { createStyles, makeStyles } from "@material-ui/core";

const useHomeCarouselStyles = makeStyles((theme) =>
  createStyles({
    slider: {
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
      cursor: "pointer",
      "&:hover, &:focus-visible, &:focus": {
        outline: "none",
        opacity: 0.7,
      },
    },
    arrowContainer: {
      position: "absolute",
      zIndex: 9,
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
    slide: {
      height: "100%",
      width: "100%",
    },
    image: {
      height: "auto",
      width: "100%",
      objectFit: "contain",
      [theme.breakpoints.down("sm")]: {
        height: "100%",
      },
    },
  })
);

export default useHomeCarouselStyles;
