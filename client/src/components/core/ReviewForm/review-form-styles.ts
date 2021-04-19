import { createStyles, makeStyles } from "@material-ui/core";

const useReviewFormStyles = makeStyles((theme) =>
  createStyles({
    rating: {
      color: theme.palette.secondary.main,
      fontSize: "3rem",
    },
  })
);

export default useReviewFormStyles;
