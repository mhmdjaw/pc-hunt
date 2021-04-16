import { createStyles, makeStyles } from "@material-ui/core";

const useCartStyles = makeStyles((theme) =>
  createStyles({
    loading: {
      height: "120px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: "30px",
    },
    cart: {
      display: "flex",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },
    cartItems: {
      paddingBottom: "30px",
      [theme.breakpoints.up("md")]: {
        flex: "1 1 70%",
        paddingRight: "24px",
      },
    },
  })
);

export default useCartStyles;
