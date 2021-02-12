import { makeStyles } from "@material-ui/core";
import { hexToRgba } from "../../../helpers";

const useNavBarStyles = makeStyles((theme) => ({
  menuItem: {
    marginLeft: "4%",
    fontWeight: "bold",
    "&:hover, &:focus-visible": {
      color: theme.palette.secondary.main,
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
  },
}));

export default useNavBarStyles;
