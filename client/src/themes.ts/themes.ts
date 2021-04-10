import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

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
    overrides: {
      MuiCssBaseline: {
        "@global": {
          html: {
            height: "100%",
          },
          body: {
            height: "100%",
            "& > #root": {
              height: "100%",
              display: "flex",
              flexDirection: "column",
            },
          },
          footer: {
            flexShrink: 0,
          },
          a: {
            WebkitTapHighlightColor: "transparent",
          },
          ".braintree-method__label": {
            overflow: "visible !important",
          },
        },
      },
    },
  })
);
