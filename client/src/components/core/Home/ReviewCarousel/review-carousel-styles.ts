import { createStyles, makeStyles } from "@material-ui/core";

const useReviewCarouselStyles = makeStyles((theme) =>
  createStyles({
    rating: {
      color: theme.palette.secondary.main,
      marginBottom: "30px",
    },
  })
);

export default useReviewCarouselStyles;
