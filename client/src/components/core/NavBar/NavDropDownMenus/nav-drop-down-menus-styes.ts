import { createStyles, makeStyles } from "@material-ui/core";

const useNavDropDownMenusStyles = makeStyles((theme) =>
  createStyles({
    expandMore: {
      position: "relative",
      top: "0.25rem",
      fontSize: "1.2rem",
      marginLeft: "0.2rem",
    },
    categoryMenuContainer: {
      position: "relative",
      marginLeft: "4%",
      "&::after": {
        content: "''",
        position: "absolute",
        width: 0,
        height: 0,
        borderStyle: "solid",
        borderWidth: "0 8px 8px 8px",
        borderColor: "transparent transparent #fff transparent",
        bottom: 0,
        left: 0,
        right: 0,
        margin: "0 auto",
        opacity: 0,
        transition: "all .25s",
        visibility: "hidden",
      },
    },
    dropDownMenuHover: {
      "&::after, & $dropDownMenu": {
        opacity: 1,
        visibility: "visible",
      },
    },
    dropDownMenu: {
      position: "absolute",
      transition: "all .25s",
      minWidth: "230px",
      left: "-15px",
      boxShadow: theme.shadows[10],
      visibility: "hidden",
      opacity: 0,
    },
    dropDownItem: {
      // padding: "4px 16px",
      "&:active": {
        backgroundColor: "rgba(0, 0, 0, 0.3)",
      },
    },
  })
);

export default useNavDropDownMenusStyles;
