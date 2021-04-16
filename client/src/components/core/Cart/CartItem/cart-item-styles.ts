import { createStyles, makeStyles } from "@material-ui/core";

const useCartItemStyles = makeStyles((theme) =>
  createStyles({
    cartItem: {
      position: "relative",
      padding: "24px 32px",
      display: "flex",
      transition: "filter 0.3s",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },
    disableCartItem: {
      position: "absolute",
      zIndex: 1,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      borderRadius: "inherit",
    },
    removingItem: {
      backgroundColor: "#fff",
      filter: "brightness(0.5)",
    },
    img: {
      width: "112px",
      height: "112px",
      objectFit: "contain",
      cursor: "pointer",
      display: "none",
      [theme.breakpoints.down("sm")]: {
        margin: "0 auto",
      },
    },
    imgLoaded: {
      display: "inline-block",
    },
    skeletonImg: {
      width: "112px",
      height: "112px",
      [theme.breakpoints.down("sm")]: {
        margin: "0 auto",
      },
    },
    productContent: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      [theme.breakpoints.up("md")]: {
        marginLeft: "24px",
      },
      [theme.breakpoints.down("sm")]: {
        marginTop: "24px",
      },
    },
    productDetails: {
      display: "flex",
      justifyContent: "space-between",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },
    productTitle: {
      maxWidth: "300px",
      color: "#000",
      paddingRight: "16px",
      "&:hover": {
        color: theme.palette.primary.main,
      },
      [theme.breakpoints.down("sm")]: {
        maxWidth: "100%",
        marginBottom: "12px",
      },
    },
    productPrice: {
      fontWeight: 700,
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        marginBottom: "24px",
      },
    },
    productActions: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    quantity: {
      display: "flex",
    },
    iconButton: {
      fontSize: "1.3rem",
    },
    quantityInput: {
      width: "70px",
      outline: "none",
      border: "none",
      textAlign: "center",
      font: "inherit",
      fontSize: "1rem",
      fontWeight: 700,
      "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
        WebkitAppearance: "none",
      },
    },
  })
);

export default useCartItemStyles;
