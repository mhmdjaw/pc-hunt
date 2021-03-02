import { makeStyles } from "@material-ui/core";

const useNavBarStyles = makeStyles((theme) => ({
  logo: {
    marginLeft: "calc(4% - 4px)",
    maxWidth: "224px",
    padding: "4px",
    "&:hover, &:focus-visible": {
      cursor: "pointer",
      fill: theme.palette.secondary.main,
    },
    "&:focus-visible": {
      outline: "3px solid !important",
      outlineColor: theme.palette.secondary.main + " !important",
    },
    "&:focus": {
      outline: "none",
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: "140px",
    },
  },
  link: {
    marginRight: "2%",
    "&.cart": {
      marginRight: "4%",
    },
    [theme.breakpoints.down("sm")]: {
      marginRight: "4%",
    },
  },
  grow: {
    textAlign: "center",
    flexGrow: 1,
  },
  toolbar: {
    minHeight: 75,
  },
  categoryBar: {
    height: "48px",
    display: "flex",
    alignItems: "center",
    padding: "0 24px",
    [theme.breakpoints.down("sm")]: {
      alignItems: "start",
      justifyContent: "center",
    },
  },
  navLinkIcon: {
    position: "relative",
    top: "0.4rem",
    fontSize: "1.6rem",
    "&.cart": {
      top: 0,
    },
    "&.account": {
      fontSize: "1.8rem",
    },
    [theme.breakpoints.up("md")]: {
      marginRight: "0.4rem",
    },
  },
}));

export default useNavBarStyles;
