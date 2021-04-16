import { createStyles, makeStyles } from "@material-ui/core";

const useMyProductsStyles = makeStyles((theme) =>
  createStyles({
    title: {
      marginBottom: "32px",
      fontWeight: 500,
    },
    searchInput: {
      marginBottom: "24px",
    },
    fabAddProduct: {
      position: "fixed",
      bottom: theme.spacing(4),
      right: theme.spacing(4),
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
    fabFocusVisible: {
      backgroundColor: theme.palette.secondary.dark,
    },
  })
);

export default useMyProductsStyles;
