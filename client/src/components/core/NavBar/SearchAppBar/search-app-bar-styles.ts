import { createStyles, fade, makeStyles } from "@material-ui/core";

const useSearchAppBarStyles = makeStyles((theme) =>
  createStyles({
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,

      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2, 0, 0),
      height: "100%",
      position: "absolute",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1,
      right: 0,
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      paddingLeft: theme.spacing(2),
      // vertical padding + font size from searchIcon
      paddingRight: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
      [theme.breakpoints.up("sm")]: {
        width: "180px",
        "&:focus": {
          width: "240px",
        },
      },
    },
    paper: {
      boxShadow: theme.shadows[10],
    },
    popper: {
      [theme.breakpoints.up("sm")]: {
        // padding left and right from input + width of input
        width: `calc(1em + ${theme.spacing(6)}px + 240px) !important`,
      },
    },
    closePopper: {
      display: "none",
    },
  })
);

export default useSearchAppBarStyles;
