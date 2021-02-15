import { makeStyles } from "@material-ui/core";

const useProductSliderStyles = makeStyles({
  slider: {
    padding: "0 3%",
  },
  arrow: {
    position: "absolute",
    zIndex: 9,
    top: 0,
    bottom: 0,
    margin: "auto",
    height: "41px",
    width: "41px",
    "&.prevArrow": {
      left: "1%",
    },
    "&.nextArrow": {
      right: "1%",
    },
    opacity: 0.7,
    "&:hover, &:focus-visible": {
      opacity: 1,
    },
  },
});

export default useProductSliderStyles;
