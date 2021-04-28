import React, { useState } from "react";
import {
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { CustomButton } from "../../../common";
import { forgotPassword } from "../../../../auth";

interface ForgotPasswordProps {
  isSubmitting: boolean;
}

const useForgotPasswordStyles = makeStyles((theme) =>
  createStyles({
    link: {
      cursor: "pointer",
    },
    disabled: {
      color: theme.palette.grey[500],
    },
  })
);

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  isSubmitting,
}: ForgotPasswordProps) => {
  const classes = useForgotPasswordStyles();
  const [state, setState] = useState({
    value: "",
    isSubmitting: false,
    buttonDisabled: true,
    dialog1: false,
    dialog2: false,
    response: "",
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    let disabled = true;
    if (
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value
      )
    ) {
      disabled = false;
    }
    setState({ ...state, value, buttonDisabled: disabled });
  };

  const send = () => {
    setState({ ...state, isSubmitting: true });
    forgotPassword(state.value)
      .then((response) => {
        setState({
          value: "",
          isSubmitting: false,
          buttonDisabled: true,
          dialog1: false,
          dialog2: true,
          response: response.data.message,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={classes.disabled}>
      <Link
        className={classes.link}
        color={isSubmitting ? "inherit" : "primary"}
        underline={isSubmitting ? "none" : "hover"}
        onClick={() => setState({ ...state, dialog1: !state.dialog1 })}
      >
        Forgot Password?
      </Link>
      <Dialog open={state.dialog1} maxWidth="xs" fullWidth>
        <DialogTitle>Enter your email address</DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            name="email"
            label="Email"
            fullWidth
            value={state.value}
            onChange={onChange}
          />
        </DialogContent>
        <DialogActions>
          <CustomButton
            color="primary"
            onClick={() => setState({ ...state, dialog1: false })}
          >
            close
          </CustomButton>
          <CustomButton
            color="primary"
            isSubmitting={state.isSubmitting}
            disabled={state.isSubmitting || state.buttonDisabled}
            onClick={send}
          >
            send
          </CustomButton>
        </DialogActions>
      </Dialog>
      <Dialog
        open={state.dialog2}
        onClose={() => setState({ ...state, dialog2: false })}
      >
        <DialogContent>
          <DialogContentText>{state.response}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <CustomButton
            color="primary"
            onClick={() => setState({ ...state, dialog2: false })}
          >
            close
          </CustomButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ForgotPassword;
