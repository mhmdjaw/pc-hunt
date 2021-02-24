import { createStyles, makeStyles } from "@material-ui/core";

const useNavLinkStyles = makeStyles((theme) =>
  createStyles({
    link: {
      fontWeight: "bold",
      display: "inline-block",
      fontSize: theme.typography.subtitle1.fontSize,
      "&:hover, &:focus-visible": {
        color: theme.palette.secondary.main,
      },
      "&:focus-visible": {
        outline: "3px solid",
        outlineColor: theme.palette.secondary.main,
      },
      "&.category-menu": {
        padding: "8px 0",
        marginLeft: 0,
      },
    },
  })
);

export default useNavLinkStyles;
