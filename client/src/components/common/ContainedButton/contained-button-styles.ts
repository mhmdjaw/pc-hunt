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
  })
);

export default useContainedIconStyles;
