import { createStyles, makeStyles } from "@material-ui/core";

const useBrandsStyles = makeStyles((theme) =>
  createStyles({
    content: {
      maxWidth: "700px",
      margin: "60px auto 90px",
      padding: "0 16px",
    },
    listContainer: {
      overflow: "hidden",
      WebkitColumnCount: 3,
      MozColumnCount: 3,
      columnCount: 3,
      [theme.breakpoints.down("sm")]: {
        WebkitColumnCount: 2,
        MozColumnCount: 2,
        columnCount: 2,
      },
    },
    alphabet: {
      fontWeight: 700,
      textAlign: "center",
      padding: "5px 0",
    },
    link: {
      display: "block",
      textAlign: "center",
      padding: "5px 0",
    },
  })
);

export default useBrandsStyles;
