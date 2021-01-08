import { createMuiTheme } from "@material-ui/core";
import { teal, blue } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: blue,
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#26a69a",
    },
    secondary: {
      main: "#448aff",
    },
  },
});

export const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: theme.palette.primary.main,
    },
    secondary: {
      main: theme.palette.secondary.main,
    },
  },
});
