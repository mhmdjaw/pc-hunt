import { createStyles, makeStyles } from "@material-ui/core";

const useOrderSummaryStyles = makeStyles((theme) =>
  createStyles({
    container: {
      paddingBottom: "30px",
      [theme.breakpoints.up("md")]: {
        flex: "1 1 30%",
      },
    },
    card: {
      padding: "24px 32px 40px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "16px",
      "& th": {
        paddingBottom: "16px",
        textAlign: "left",
        fontWeight: 400,
      },
      "& td": {
        paddingBottom: "16px",
        textAlign: "right",
      },
      "& tfoot tr": {
        borderTop: "1px solid rgba(0, 0, 0, 0.12)",
      },
      "& tfoot th, tfoot td": {
        padding: "16px 0",
        fontWeight: 700,
      },
    },
    costSkeleton: {
      display: "inline-block",
    },
    checkoutButton: {
      fontSize: "0.89rem",
      fontWeight: 700,
      padding: "9px 16px",
    },
  })
);

export default useOrderSummaryStyles;
