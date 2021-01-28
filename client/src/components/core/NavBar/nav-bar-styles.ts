import { makeStyles } from "@material-ui/core";

const useNavBarStyles = makeStyles((theme) => ({
  menuItem: {
    marginLeft: "2%",
    fontWeight: "bold",
    "&:hover, &:focus-visible": {
      color: theme.palette.primary.main,
    },
    cursor: "pointer",
  },
  iconButton: {
    margin: "0 1%",
  },
  grow: {
    flexGrow: 1,
  },
}));

export default useNavBarStyles;
