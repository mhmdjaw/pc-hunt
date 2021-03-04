import { makeStyles } from "@material-ui/core";

const useFooterStyles = makeStyles({
  link: {
    textTransform: "uppercase",
    fontWeight: 500,
    "&:hover": {
      opacity: 0.7,
    },
    "&:focus-visible": {
      outline: "3px solid #fff",
    },
  },
  iconButton: {
    margin: "0 1%",
  },
});

export default useFooterStyles;
