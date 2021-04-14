import { createStyles, makeStyles } from "@material-ui/core";

const useOrderStyles = makeStyles((theme) =>
  createStyles({
    order: {
      padding: "24px 32px",
    },
    cornerInfo: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    productContent: {
      margin: "40px 0",
      display: "flex",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
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
    productDetails: {
      width: "100%",
      [theme.breakpoints.up("md")]: {
        marginLeft: "24px",
      },
      [theme.breakpoints.down("sm")]: {
        marginTop: "24px",
      },
    },
    productTitle: {
      color: "#000",
      fontWeight: 700,
      "&:hover": {
        color: theme.palette.primary.main,
      },
    },
    productTitleContainer: {
      maxWidth: "400px",
      marginBottom: "16px",
      [theme.breakpoints.down("sm")]: {
        maxWidth: "100%",
        marginBottom: "12px",
      },
    },
    orderId: {
      marginRight: "16px",
    },
    textButton: {
      textTransform: "none",
    },
    details: {
      padding: "40px 0 40px 136px",
      [theme.breakpoints.down("sm")]: {
        padding: "40px 0",
      },
    },
    detail: {
      marginBottom: "40px",
    },
    paymentImg: {
      width: "48px",
      height: "48px",
      objectFit: "contain",
      marginRight: "16px",
    },
    orderSummaryDetail: {
      display: "flex",
      justifyContent: "space-between",
      maxWidth: "300px",
    },
    orderTotal: {
      fontWeight: 500,
    },
  })
);

export default useOrderStyles;
