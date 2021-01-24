import { createStyles, makeStyles } from "@material-ui/core/styles";

const useAccountStyles = makeStyles((theme) =>
  createStyles({
    container: {
      padding: "6%",
    },
    divider: {
      margin: "10vh 0",
    },
    icon: {
      marginRight: "5%",
    },
    accountDetails: {
      marginBottom: "15vh",
    },
    card: {
      height: 100,
      display: "flex",
      alignContent: "center",
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        cursor: "pointer",
        transform: "scale(1.1)",
        "& $description": {
          display: "none",
        },
        "& $cardContent": {
          justifyContent: "center",
        },
        "& $icon": {
          color: theme.palette.primary.contrastText,
        },
      },
    },
    cardContent: {
      width: "100%",
      display: "flex",
      alignContent: "center",
      alignItems: "center",
      paddingLeft: "10%",
      fontSize: "40px",
    },
    description: {},
  })
);

export default useAccountStyles;
