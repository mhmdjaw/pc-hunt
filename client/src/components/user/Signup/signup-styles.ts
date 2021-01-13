import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { hexToRgba } from "../../../helpers";

const useSignupStyles = makeStyles((theme: Theme) =>
  createStyles({
    progressContainer: {
      marginBottom: "1vh",
    },
    colorPrimary: {
      backgroundColor: theme.palette.action.disabled,
    },
    barColorPrimary: {
      backgroundColor: theme.palette.action.disabled,
    },
    colorWeak: {
      backgroundColor: hexToRgba(theme.palette.error.main, 0.5),
    },
    barColorWeak: {
      backgroundColor: theme.palette.error.main,
    },
    colorMed: {
      backgroundColor: hexToRgba(theme.palette.warning.main, 0.5),
    },
    barColorMed: {
      backgroundColor: theme.palette.warning.main,
    },
    colorStrong: {
      backgroundColor: hexToRgba(theme.palette.success.main, 0.5),
    },
    barColorStrong: {
      backgroundColor: theme.palette.success.main,
    },
    circularProgress: {
      position: "absolute",
      zIndex: 1,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      margin: "auto",
      width: "25px",
      height: "25px",
    },
  })
);

export default useSignupStyles;
