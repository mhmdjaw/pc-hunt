import { makeStyles } from "@material-ui/core";

const useCarouselStyles = makeStyles({
  slider: {
    cursor: "grab",
    "& .slick-dots li.slick-active a": {
      backgroundColor: "#fff",
      opacity: 1,
    },
    "&:hover": {
      "& $arrowContainer": {
        visibility: "visible",
      },
    },
    "&:active": {
      cursor: "grabbing",
    },
  },
  dotsContainer: {
    cursor: "auto",
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
    height: "41px",
    width: "41px",
    borderRadius: "50%",
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
});

export default useCarouselStyles;
