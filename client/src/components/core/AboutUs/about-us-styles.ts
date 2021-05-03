import { makeStyles, createStyles } from "@material-ui/core";

const useAboutUsStyles = makeStyles((theme) =>
  createStyles({
    root: {
      textAlign: "center",
      margin: "60px 0",
    },
    title: {
      fontWeight: 700,
      marginBottom: "32px",
    },
    sectionWhite: {
      padding: "60px 0 90px",
    },
    sectionPrimary: {
      padding: "60px 0 90px",
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    sectionHeader: {
      fontWeight: 700,
      marginBottom: "24px",
    },
    sectionContent: {
      fontWeight: 500,
    },
  })
);

export default useAboutUsStyles;
