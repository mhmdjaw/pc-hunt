import { createStyles, makeStyles } from "@material-ui/core";

const useReviewStyles = makeStyles((theme) =>
  createStyles({
    nickName: {
      marginBottom: "8px",
      fontWeight: 700,
    },
    customerRating: {
      color: theme.palette.secondary.main,
      marginLeft: -2,
      marginBottom: "8px",
    },
    date: {
      marginBottom: "16px",
    },
    verified: {
      fontStyle: "normal",
      color: theme.palette.primary.main,
    },
    customerDescription: {
      whiteSpace: "pre-wrap",
    },
  })
);

export default useReviewStyles;
