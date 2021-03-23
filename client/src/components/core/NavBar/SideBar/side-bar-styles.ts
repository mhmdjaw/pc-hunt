import { createStyles, makeStyles } from "@material-ui/core";

const useSideBarStyles = makeStyles((theme) =>
  createStyles({
    sideBarContainer: {
      width: "320px",
      height: "100%",
      position: "relative",
      overflowX: "hidden",
      "& div:not(:first-of-type)": {
        animation: ".5s cubic-bezier(0.4, 0, 0.2, 1) 0s 1 $slideInFromRight",
      },
    },
    "@keyframes slideInFromRight": {
      from: { transform: "translateX(100%)" },
      to: { transform: "none" },
    },
    page: {
      backgroundColor: "#fff",
      position: "absolute",
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      overflowY: "auto",
      transitionProperty: "transform,filter",
      transitionDuration: ".5s",
      transitionTimingFunction: "cubic-bezier(0.8, 0, 0.6, 1)",
    },
    pageExitActive: {
      transform: "translateX(100%)",
    },
    subPageOpen: {
      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      transform: "translateX(-100px)",
      filter: "brightness(0.5)",
    },
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
      textTransform: "uppercase",
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
