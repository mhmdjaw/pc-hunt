import { makeStyles } from "@material-ui/core/styles";

interface StylesProps {
  focusBackgroundColor: string;
}

const useTextButtonStyles = makeStyles({
  focusVisible: {
    backgroundColor: (props: StylesProps) => props.focusBackgroundColor,
  },
  buttonActive: {
    transition: "all 0.15s",
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
      transition: "opacity 0.15s",
    },
    "&:active": {
      "&::before": {
        opacity: 0.3,
      },
    },
  },
});

export default useTextButtonStyles;
