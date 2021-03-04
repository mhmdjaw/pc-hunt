import { createStyles, makeStyles } from "@material-ui/core";

const useNavLinkStyles = makeStyles((theme) =>
  createStyles({
    link: {
      fontWeight: "bold",
      display: "inline-block",
      whiteSpace: "nowrap",
      cursor: "Pointer",
      fontSize: theme.typography.subtitle1.fontSize,
      "@media(hover: hover) and (pointer: fine)": {
        "&:hover": {
          color: theme.palette.secondary.main,
        },
      },
      "&:focus-visible": {
        color: theme.palette.secondary.main,
        outline: "3px solid",
        outlineColor: theme.palette.secondary.main,
      },
      "&.category-menu": {
        padding: "8px 0",
        marginLeft: 0,
      },
      // "&:active": {
      //   color: theme.palette.secondary.main,
      // },
    },
  })
);

export default useNavLinkStyles;
