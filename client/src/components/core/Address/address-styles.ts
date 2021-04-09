import { createStyles, makeStyles } from "@material-ui/core";

const useAddressStyles = makeStyles((theme) =>
  createStyles({
    phoneContainer: {
      marginBottom: "24px",
      [theme.breakpoints.up("sm")]: {
        width: "calc(50% - 12px)",
      },
    },
  })
);

export default useAddressStyles;
