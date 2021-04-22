import { createStyles, makeStyles } from "@material-ui/core";

const useProductStyles = makeStyles((theme) =>
  createStyles({
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
      color: theme.palette.secondary.main,
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
    tab: {
      fontWeight: 700,
      "&::before": {
        content: "''",
        position: "absolute",
        pointerEvents: "none",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        borderRadius: "inherit",
        backgroundColor: "currentColor",
        opacity: 0,
        transition: "opacity 0.15s",
      },
      "&:active": {
        "&::before": {
          opacity: 0.3,
        },
      },
    },
    overview: {
      fontWeight: 500,
      whiteSpace: "pre-wrap",
    },
    reviewButtonContainer: {
      marginBottom: "64px",
      display: "flex",
    },
    reviewButton: {
      marginRight: "12px",
    },
  })
);

export default useProductStyles;
