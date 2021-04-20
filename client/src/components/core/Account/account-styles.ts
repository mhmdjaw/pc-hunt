import { createStyles, makeStyles } from "@material-ui/core/styles";

const useAccountStyles = makeStyles((theme) =>
  createStyles({
    accountName: {
      marginBottom: "12px",
    },
    icon: {
      marginRight: "5%",
    },
    card: {
      minHeight: 100,
      display: "flex",
      alignContent: "center",
      transition: ".15s",
      "&:hover, &:focus-visible": {
        outline: "none",
        boxShadow: theme.shadows[15],
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
