import { makeStyles } from "@material-ui/core";

const useAccountInformationStyles = makeStyles({
  label: {
    fontWeight: 700,
    marginBottom: "8px",
  },
  info: {
    marginBottom: "24px",
    display: "flex",
    justifyContent: "space-between",
  },
  save: {
    marginRight: "12px",
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "24px",
    marginTop: "12px",
  },
  buttons: {
    width: "90px",
  },
});

export default useAccountInformationStyles;
