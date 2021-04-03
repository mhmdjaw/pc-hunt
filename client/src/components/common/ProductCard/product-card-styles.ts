import { createStyles, makeStyles } from "@material-ui/core";

const useProductCardStyles = makeStyles((theme) =>
  createStyles({
    rating: {
      color: theme.palette.secondary.main,
      marginRight: "8px",
      marginBottom: "2px",
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
      },
    },
    img: {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      display: "none !important",
    },
    imgLoaded: {
      display: "inline-block !important",
    },
    card: {
      position: "relative",
      cursor: "pointer",
      "&:hover": {
        "& $cardAction": {
          maxHeight: "48px",
          padding: 10,
          opacity: 1,
        },
      },
    },
    cardAction: {
      position: "absolute",
      width: "calc(100% + 32px)",
      bottom: 0,
      left: -16,
      borderRadius: "30px 30px 0 0",
      textAlign: "center",
      fontWeight: 500,
      padding: 0,
      zIndex: 2,
      transition:
        "background-color .15s, max-height .5s, opacity .7s, padding .5s, filter .3s",
      maxHeight: 0,
      opacity: 0,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
      "&:active": {
        backgroundColor: theme.palette.primary.light,
      },
    },
    carActionDisabled: {
      cursor: "default",
      filter: "opacity(0.4)",
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
