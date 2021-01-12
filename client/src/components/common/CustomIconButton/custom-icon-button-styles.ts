import { makeStyles } from "@material-ui/core/styles";

interface StylesProps {
  focusBackgroundColor: string;
  activeBackgroundColor: string;
}

const useCustomIconButtonStyles = makeStyles({
  focusVisible: {
    backgroundColor: (props: StylesProps) => props.focusBackgroundColor,
  },
  buttonActive: {
    "&:active": {
      backgroundColor: (props: StylesProps) => props.activeBackgroundColor,
    },
  },
});

export default useCustomIconButtonStyles;
