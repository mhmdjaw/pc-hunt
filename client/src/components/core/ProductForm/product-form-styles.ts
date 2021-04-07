import { makeStyles } from "@material-ui/core";

const useProductFormStyles = makeStyles({
  title: {
    marginLeft: "9%",
    marginBottom: "32px",
    fontWeight: 500,
  },
  paper: {
    padding: "9% 9% 10%",
  },
  image: {
    width: "100px",
    height: "100px",
    objectFit: "contain",
  },
});

export default useProductFormStyles;
