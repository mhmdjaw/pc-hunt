import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

export const darkTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#26a69a",
      },
      secondary: {
        main: "#448aff",
      },
    },
  })
);

export const lightTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: "light",
      primary: {
        main: "#009688",
      },
      secondary: {
        main: "#2979ff",
      },
    },
  })
);
