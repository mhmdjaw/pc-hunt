import { createStyles, makeStyles } from "@material-ui/core";

const useProductCardStyles = makeStyles((theme) =>
  createStyles({
    rating: {
      color: theme.palette.secondary.main,
    },
    productTitle: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: 3,
      WebkitBoxOrient: "vertical",
    },
    imgContainer: {
      position: "relative",
      width: "100%",
      paddingTop: "100%",
      "& > div": {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 16,
        overflow: "hidden",
      },
    },
    img: {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      display: "none",
    },
    imgLoaded: {
      display: "inline-block",
    },
    card: {
      position: "relative",
      cursor: "pointer",
      "&:hover": {
        "& $cardAction": {
          transform: "translateY(0)",
          opacity: 1,
        },
      },
    },
    cardAction: {
      position: "absolute",
      width: "100%",
      bottom: 0,
      textAlign: "center",
      fontWeight: 500,
      padding: "10px",
      zIndex: 2,
      transition: "background-color .15s, transform .5s, opacity 0.7s",
      transform: "translateY(100%)",
      opacity: 0,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
      "&:active": {
        backgroundColor: theme.palette.primary.light,
      },
    },
    actionArea: {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      borderRadius: "inherit",
      backgroundColor: "currentColor",
      opacity: 0,
      transition: "opacity 0.15s",
      zIndex: 1,
      "&:hover, &:focus-visible": {
        opacity: theme.palette.action.hoverOpacity,
      },
      "&:hover:active": {
        zIndex: 3,
        opacity: 0.3,
      },
    },
  })
);

export default useProductCardStyles;
