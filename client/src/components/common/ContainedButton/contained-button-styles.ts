import { makeStyles } from "@material-ui/core/styles";

interface StylesProps {
  focusBackgroundColor: string;
  activeBackgroundColor: string;
}

const useContainedIconStyles = makeStyles({
  focusVisible: {
    backgroundColor: (props: StylesProps) => props.focusBackgroundColor,
  },
  buttonActive: {
    "&:active": {
      backgroundColor: (props: StylesProps) => props.activeBackgroundColor,
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
});

export default useContainedIconStyles;
