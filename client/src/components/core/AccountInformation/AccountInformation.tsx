import { Box, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { updateUser } from "../../../api/user";
import { useAuth } from "../../../context";
import { CustomButton, FormLayout } from "../../common";
import useAccountInformationStyles from "./account-information-styles";

interface State {
  edit: boolean;
  value: string;
  isSubmitting: boolean;
}

const AccountInformation: React.FC = () => {
  const classes = useAccountInformationStyles();
  const { user, setUser } = useAuth();
  const [state, setState] = useState<State>({
    value: user?.name as string,
    edit: false,
    isSubmitting: false,
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setState({ ...state, value });
  };

  const onSubmit = () => {
    setState({ ...state, isSubmitting: true });
    updateUser(state.value)
      .then((response) => {
        const updatedUser = response.data;
        setState({
          value: updatedUser.name,
          edit: false,
          isSubmitting: false,
        });
        setUser({ user: updatedUser, isLoading: false });
      })
      .catch((err) => {
        console.log(err);
        setState({ ...state, isSubmitting: false });
      });
  };

  return (
    <FormLayout title="Account Information" maxWidth={700}>
      {state.edit ? (
        <Box maxWidth="400px">
          <TextField
            fullWidth
            variant="outlined"
            autoComplete="off"
            label="Name"
            name="name"
            value={state.value}
            onChange={onChange}
          />
          <div className={classes.buttonsContainer}>
            <CustomButton
              className={classes.save}
              buttonClassName={classes.buttons}
              variant="contained"
              color="primary"
              disabled={
                user?.name === state.value.trim() ||
                state.isSubmitting ||
                state.value.length === 0
              }
              isSubmitting={state.isSubmitting}
              onClick={onSubmit}
            >
              save
            </CustomButton>
            <CustomButton
              buttonClassName={classes.buttons}
              variant="outlined"
              color="primary"
              onClick={() => setState({ ...state, edit: false })}
            >
              cancel
            </CustomButton>
          </div>
        </Box>
      ) : (
        <>
          <Typography className={classes.label} variant="h6">
            Name
          </Typography>
          <div className={classes.info}>
            <Typography noWrap>{user?.name}</Typography>
            <CustomButton
              color="primary"
              onClick={() => setState({ ...state, edit: true })}
            >
              Edit
            </CustomButton>
          </div>
        </>
      )}
      <Typography className={classes.label} variant="h6">
        Email
      </Typography>
      <div className={classes.info}>
        <Typography noWrap>{user?.email}</Typography>
        <CustomButton disabled color="primary">
          Edit
        </CustomButton>
      </div>
      <Typography className={classes.label} variant="h6">
        Password
      </Typography>
      <div className={classes.info}>
        <Typography>Account Password</Typography>
        <CustomButton component={Link} to="/password" color="primary">
          Edit
        </CustomButton>
      </div>
    </FormLayout>
  );
};

export default AccountInformation;
