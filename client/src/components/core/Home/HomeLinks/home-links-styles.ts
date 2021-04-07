import { makeStyles } from "@material-ui/core";

const useHomeLinksStyles = makeStyles({
  linkContainer: {
    margin: "24px 0",
    textAlign: "center",
  },
  link: {
    padding: "24px",
    fontWeight: 700,
    display: "inline-block",
    width: "100%",
    transition: "all .2s",
    "&:hover, &:focus-visible": {
      outline: "none",
      boxShadow: "0 0 0 3px",
      borderRadius: "9999px",
    },
  },
});

export default useHomeLinksStyles;
