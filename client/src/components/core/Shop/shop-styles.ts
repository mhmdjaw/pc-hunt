import { createStyles, makeStyles } from "@material-ui/core";

const useShopStyles = makeStyles((theme) =>
  createStyles({
    productsContainer: {
      display: "flex",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },
    facetContainer: {
      "& > div": {
        paddingBottom: "30px",
      },
      [theme.breakpoints.up("md")]: {
        flex: "1 1 25%",
        height: "auto !important",
        visibility: "visible",
        overflow: "visible",
      },
    },
    productListContainer: {
      [theme.breakpoints.up("md")]: {
        flex: "1 1 75%",
        paddingLeft: "24px",
      },
    },
    accordionHeading: {
      fontWeight: 700,
    },
    accordionExpandIcon: {
      color: "#000",
    },
    categoryList: {
      padding: "8px 0 16px",
    },
    listItem: {
      "&:active": {
        backgroundColor: "rgba(0, 0, 0, 0.3)",
      },
    },
    parentCategoryText: {
      fontWeight: 500,
    },
    categoryExpandIcon: {
      transition: theme.transitions.create("transform"),
      transform: "rotate(0deg)",
    },
    categoryExpanded: {
      transform: "rotate(180deg)",
    },
    nested: {
      paddingLeft: "32px",
    },
  })
);

export default useShopStyles;
