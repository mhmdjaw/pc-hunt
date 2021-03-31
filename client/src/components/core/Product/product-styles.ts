import { makeStyles } from "@material-ui/core";

const useProductStyles = makeStyles({
  productTitle: {
    fontWeight: 700,
  },
  divider: {
    margin: "24px 0",
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
      bottom: 0,
    },
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "none",
  },
  imgLoaded: {
    display: "inline-Block",
  },
  rating: {
    fontSize: "2.3rem",
  },
  cartButton: {
    marginTop: "36px",
  },
  wishlistButton: {
    marginTop: "24px",
  },
  tabs: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  overview: {
    whiteSpace: "pre-wrap",
  },
});

export default useProductStyles;
