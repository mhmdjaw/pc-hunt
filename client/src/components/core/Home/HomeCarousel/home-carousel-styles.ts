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
    topHeadline: {
      animation: "$topHeadlineAnimation 1s ease-in-out 0s 1",
    },
    "@keyframes topHeadlineAnimation": {
      from: {
        opacity: 0,
        transform: "translateX(-10%)",
      },
      to: {
        opacity: 1,
        transform: "translateX(0%)",
      },
    },
  })
);

export default useHomeCarouselStyles;
