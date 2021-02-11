import { createStyles, makeStyles } from "@material-ui/core";

const useHomeCarouselStyles = makeStyles((theme) =>
  createStyles({
    slide: {
      height: "100%",
      width: "100%",
    },
    image: {
      height: "auto",
      width: "100%",
      objectFit: "contain",
      [theme.breakpoints.down("sm")]: {
        height: "100%",
      },
    },
  })
);

export default useHomeCarouselStyles;
