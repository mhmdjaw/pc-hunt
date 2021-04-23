import { makeStyles } from "@material-ui/core";

const usePostStyles = makeStyles({
  root: {
    textAlign: "center",
    margin: "60px 0 90px",
  },
  loading: {
    height: "120px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    padding: "0 24px 24px 24px",
  },
  title: {
    fontWeight: 700,
    marginBottom: "24px",
  },
  postedOnBy: {
    textTransform: "uppercase",
    fontWeight: 500,
  },
  splitter: {
    width: "70px",
    margin: "auto",
    height: "3px",
  },
  content: {
    paddingTop: "24px",
    fontWeight: 500,
    whiteSpace: "pre-wrap",
    textAlign: "left",
  },
});

export default usePostStyles;
