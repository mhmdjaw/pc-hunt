import { createStyles, makeStyles } from "@material-ui/core";

const useHomeFeaturesStyles = makeStyles((theme) =>
  createStyles({
    iconContainer: {
      textAlign: "center",
      color: theme.palette.primary.main,
      transition: "color .3s",
    },
    feature: {
      margin: "24px 0",
      "&:hover": {
        "& $iconContainer": {
          color: theme.palette.primary.dark,
        },
      },
    },
  })
);

export default useHomeFeaturesStyles;
