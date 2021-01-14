import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useContainedIconStyles = makeStyles((theme: Theme) =>
  createStyles({
    focusVisible: {
      backgroundColor: theme.palette.primary.dark,
    },
    buttonActive: {
      "&:active": {
        backgroundColor: theme.palette.primary.light,
      },
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

export default useContainedIconStyles;
