import { makeStyles } from "@material-ui/core";
import { hexToRgba } from "../../../helpers";

const useNavBarStyles = makeStyles((theme) => ({
  link: {
    marginLeft: "4%",
  },
  expandMore: {
    position: "relative",
    top: "0.25rem",
    fontSize: "1.2rem",
    marginLeft: "0.2rem",
  },
  categoryMenuContainer: {
    "&::after": {
      content: "''",
      position: "absolute",
      width: 0,
      height: 0,
      borderStyle: "solid",
      borderWidth: "0 8px 8px 8px",
      borderColor: "transparent transparent #fff transparent",
      bottom: 0,
      left: 0,
      right: 0,
      margin: "0 auto",
      opacity: 0,
      transition: "all .25s",
      visibility: "hidden",
    },
    "&:hover": {
      "&::after, & $dropDownMenu": {
        opacity: 1,
        visibility: "visible",
      },
    },
  },
  dropDownMenu: {
    position: "absolute",
    transition: "all .25s",
    minWidth: "230px",
    left: "-15px",
    boxShadow: theme.shadows[10],
    visibility: "hidden",
    opacity: 0,
  },
  dropDownItem: {
    "&:active": {
      backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
  },
  iconButton: {
    margin: "0 1%",
  },
  grow: {
    flexGrow: 1,
  },
  toolbar: {
    minHeight: 75,
  },
  topBar: {
    backgroundColor: theme.palette.secondary.main,
    height: 32,
    display: "flex",
    alignItems: "center",
    padding: "0 24px",
    [theme.breakpoints.down("xs")]: {
      padding: "0 16px",
    },
  },
  topBarText: {
    color: theme.palette.secondary.contrastText,
    textTransform: "uppercase",
    fontWeight: "bolder",
    marginLeft: "4%",
    flexGrow: 1,
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
  topBarLink: {
    color: hexToRgba(theme.palette.secondary.contrastText, 0.6),
    "&:hover, &:focus-visible": {
      color: theme.palette.secondary.contrastText,
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    marginRight: "4%",
  },
  categoryBar: {
    height: "48px",
    display: "flex",
    alignItems: "center",
    padding: "0 24px",
  },
}));

export default useNavBarStyles;
