import { createStyles, makeStyles } from "@material-ui/core";

const useMyProductStyles = makeStyles((theme) =>
  createStyles({
    product: {
      position: "relative",
      padding: "24px 32px",
      display: "flex",
      transition: "filter 0.3s",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },
    disableProduct: {
      position: "absolute",
      zIndex: 1,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      borderRadius: "inherit",
    },
    removingProduct: {
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
    content: {
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
    details: {
      display: "flex",
      justifyContent: "space-between",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },
    title: {
      color: "#000",
      "&:hover": {
        color: theme.palette.primary.main,
      },
    },
    titleContainer: {
      width: "300px",
      paddingRight: "16px",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        marginBottom: "12px",
      },
    },
    price: {
      fontWeight: 700,
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        marginBottom: "24px",
      },
    },
    actions: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  })
);

export default useMyProductStyles;
