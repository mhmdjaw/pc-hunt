import { createStyles, makeStyles } from "@material-ui/core";

const useForgotPasswordStyles = makeStyles((theme) =>
  createStyles({
    link: {
      cursor: "pointer",
    },
    disabled: {
      color: theme.palette.grey[500],
    },
  })
);

export default useForgotPasswordStyles;
