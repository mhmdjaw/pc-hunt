import { makeStyles } from "@material-ui/core/styles";

interface StylesProps {
  focusBackgroundColor: string;
}

const useButtonStyles = makeStyles(
  {
    focusVisible: {
      backgroundColor: (props: StylesProps) => props.focusBackgroundColor,
    },
    buttonActive: {
      transition: "all .15s",
      "&::before": {
        content: "''",
        position: "absolute",
        pointerEvents: "none",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        borderRadius: "inherit",
        backgroundColor: "currentColor",
        opacity: 0,
        transition: "opacity .15s",
      },
      "&:active": {
        "&::before": {
          opacity: 0.3,
        },
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
  },
  { index: 1 }
);

export default useButtonStyles;
