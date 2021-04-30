import { createStyles, makeStyles } from "@material-ui/core";

const useMyPostsStyles = makeStyles((theme) =>
  createStyles({
    title: {
      marginBottom: "32px",
      fontWeight: 500,
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
    loading: {
      height: "120px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: "30px",
    },
    post: {
      position: "relative",
      padding: "24px 32px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      transition: "filter 0.3s",
    },
    removingProduct: {
      backgroundColor: "#fff",
      filter: "brightness(0.5)",
    },
    disablePost: {
      position: "absolute",
      zIndex: 1,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      borderRadius: "inherit",
    },
    postTitle: {
      fontWeight: 700,
    },
    postTitleContainer: {
      maxWidth: "500px",
      paddingRight: "16px",
    },
  })
);

export default useMyPostsStyles;
