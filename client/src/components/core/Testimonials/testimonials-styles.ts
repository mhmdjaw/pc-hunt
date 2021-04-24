import { createStyles, makeStyles } from "@material-ui/core";

const useTestimonialsStyles = makeStyles((theme) =>
  createStyles({
    root: {
      textAlign: "center",
      margin: "60px 0 90px",
    },
    card: {
      transition: "all .3s",
      "&:hover": {
        boxShadow: theme.shadows[15],
        transform: "translateY(-6px)",
      },
    },
    heading: {
      fontWeight: 700,
      marginBottom: "48px",
      textAlign: "left",
    },
    rating: {
      color: theme.palette.secondary.main,
      margin: "0 auto 24px",
    },
    content: {
      whiteSpace: "pre-wrap",
      fontStyle: "italic",
      marginBottom: "24px",
    },
  })
);

export default useTestimonialsStyles;
