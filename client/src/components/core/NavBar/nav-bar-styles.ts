import { makeStyles } from "@material-ui/core";
import { hexToRgba } from "../../../helpers";

const useNavBarStyles = makeStyles((theme) => ({
  link: {
    marginLeft: "4%",
  },
  grow: {
    flexGrow: 1,
  },
  toolbar: {
    minHeight: 75,
  },
  categoryBar: {
    height: "48px",
    display: "flex",
    alignItems: "center",
    padding: "0 24px",
  },
}));

export default useNavBarStyles;
