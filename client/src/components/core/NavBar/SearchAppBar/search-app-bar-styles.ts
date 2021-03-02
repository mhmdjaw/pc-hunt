import { createStyles, fade, makeStyles } from "@material-ui/core";

const useSearchAppBarStyles = makeStyles((theme) =>
  createStyles({
    search: {
      display: "inline-block",
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,

      width: "100%",
      [theme.breakpoints.up("md")]: {
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
      "&:hover": {
        color: theme.palette.secondary.main,
      },
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      paddingLeft: theme.spacing(2),
      // vertical padding + font size from searchIcon
      paddingRight: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      [theme.breakpoints.up("md")]: {
        width: "180px",
      },
      [theme.breakpoints.up(1102)]: {
        width: "210px",
        "&:focus": {
          width: "300px",
        },
      },
    },
    paper: {
      boxShadow: theme.shadows[10],
    },
    popper: {
      [theme.breakpoints.up("md")]: {
        // padding left and right from input + width of input
        width: `calc(1em + ${theme.spacing(6)}px + 300px) !important`,
      },
    },
    closePopper: {
      display: "none",
    },
    listBox: {
      maxHeight: "70vh",
    },
  })
);

export default useSearchAppBarStyles;
