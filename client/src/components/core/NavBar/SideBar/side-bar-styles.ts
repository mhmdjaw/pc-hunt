import { createStyles, makeStyles } from "@material-ui/core";

const useSideBarStyles = makeStyles((theme) =>
  createStyles({
    listItem: {
      "&:active": {
        backgroundColor: "rgba(0, 0, 0, 0.3)",
      },
    },
    listItemIcon: {
      color: "#000",
    },
    listItemText: {
      fontWeight: 700,
    },
    divider: {
      margin: "20px 0",
    },
    logoutText: {
      color: theme.palette.grey[700],
    },
    logOutItem: {
      "&::after": {
        zIndex: 1,
        content: "''",
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.3)",
        opacity: 0,
        transition: "opacity .15s",
      },
      "&:active": {
        "&::after": {
          opacity: 1,
        },
      },
    },
  })
);

export default useSideBarStyles;
