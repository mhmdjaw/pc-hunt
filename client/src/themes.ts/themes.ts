import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

export const darkTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#26a69a",
      },
      secondary: {
        main: "#ffff00",
      },
    },
    props: {
      // Name of the component ⚛️
      MuiButtonBase: {
        // The default props to change
        disableRipple: true, // No more ripple, on the whole application 💣!
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
        main: "#ffea00",
      },
    },
    props: {
      // Name of the component ⚛️
      MuiButtonBase: {
        // The default props to change
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
  })
);
