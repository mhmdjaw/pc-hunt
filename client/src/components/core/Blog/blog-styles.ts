import { makeStyles } from "@material-ui/core";

const useBlogStyles = makeStyles({
  root: {
    textAlign: "center",
    margin: "60px 0 90px",
  },
  heading: {
    fontWeight: 700,
    textTransform: "uppercase",
    marginBottom: "30px",
  },
  subHeading: {
    fontWeight: 500,
    marginBottom: "60px",
  },
  post: {
    margin: "48px 0 24px",
  },
  postHeader: {
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
  headerSplitter: {
    width: "70px",
    margin: "auto",
    height: "3px",
  },
  contentContainer: {
    padding: "24px 0",
  },
  content: {
    fontWeight: 500,
    whiteSpace: "pre-wrap",
    textAlign: "left",
    marginBottom: "24px",
  },
  postSplitter: {
    height: "2px",
  },
  loading: {
    height: "120px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "30px",
  },
  showMore: {
    marginTop: "24px",
  },
});

export default useBlogStyles;
