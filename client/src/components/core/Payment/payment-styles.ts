import { createStyles, makeStyles } from "@material-ui/core";

const usePaymentStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },
    mainContainer: {
      paddingBottom: "30px",
      [theme.breakpoints.up("md")]: {
        flex: "1 1 70%",
        paddingRight: "24px",
      },
    },
    loading: {
      height: "120px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: "30px",
    },
    alert: {
      marginBottom: "8px",
    },
    backdrop: {
      zIndex: 1300,
    },
    successText: {
      fontWeight: 700,
      marginBottom: "32px",
      marginLeft: "24px",
    },
    orderID: {
      paddingBottom: "30px",
      marginLeft: "24px",
    },
  })
);

export default usePaymentStyles;
