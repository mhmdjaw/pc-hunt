import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { TextField } from "formik-material-ui";
import { AuthLayout, CustomButton } from "../../common";
import PasswordInputField from "./PasswordInputField";
import { shallowEqual } from "recompose";
import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../../../context";
import { LocationState } from "../../core/Routes";
import { calculatePasswordStrength } from "../../../helpers";

interface Values {
  name: string;
  email: string;
  password: string;
}

interface State {
  error?: string;
  success?: string;
  lastSubmission: Values;
  bar: {
    color: string;
    backgroundColor: string;
    value: number;
  };
}

const initialValues: Values = {
  name: "",
  email: "",
  password: "",
};

const validate = (values: Values) => {
  const errors: Partial<Values> = {};
  let bar = {
    color: "barColorPrimary",
    backgroundColor: "colorPrimary",
    value: 0,
  };
  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (
    !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      values.email
    )
  ) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  } else {
    const { error, bar: barState } = calculatePasswordStrength(values.password);
    if (error) {
      errors.password = error;
    }
    bar = barState;
  }
  return { errors, bar };
};

const Signup: React.FC = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const { signup } = useAuth();

  const [state, setState] = useState<State>({
    error: undefined,
    success: undefined,
    bar: {
      backgroundColor: "colorPrimary",
      color: "barColorPrimary",
      value: 0,
    },
    lastSubmission: { ...initialValues },
  });

  const onSubmit = (
    values: Values,
    { setSubmitting, resetForm }: FormikHelpers<Values>
  ) => {
    signup(values, (authStatus, message) => {
      if (authStatus) {
        setState({
          ...state,
          success: message,
          error: undefined,
          lastSubmission: {
            ...values,
          },
        });
        resetForm();
        setSubmitting(false);
        if (location.state && location.state.from) {
          history.replace(location.state.from.pathname);
        } else {
          history.replace("/");
        }
      } else {
        setState({
          ...state,
          error: message,
          success: undefined,
          lastSubmission: {
            ...values,
          },
        });
        setSubmitting(false);
      }
    });
  };

  return (
    <AuthLayout
      authType="signup"
      headline="Create your account"
      footer="Already have an account?"
      error={state.error}
      success={state.success}
    >
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          if (state.error) state.error = undefined;
          if (state.success) state.success = undefined;
          const { errors, bar } = validate(values);
          setState({ ...state, bar });
          return errors;
        }}
        onSubmit={onSubmit}
      >
        {({ submitForm, isSubmitting, isValid, dirty, values }) => (
          <Form>
            <Box mb="24px">
              <Field
                component={TextField}
                variant="outlined"
                name="name"
                type="name"
                label="Name *"
                fullWidth
              />
            </Box>
            <Box mb="24px">
              <Field
                component={TextField}
                variant="outlined"
                name="email"
                type="email"
                label="Email *"
                fullWidth
              />
            </Box>
            <Box mb="24px">
              <PasswordInputField state={state.bar} />
            </Box>

            <Box mb="24px" display="flex" justifyContent="flex-end">
              <CustomButton
                variant="contained"
                color="primary"
                disabled={
                  isSubmitting ||
                  !(dirty && isValid) ||
                  shallowEqual(state.lastSubmission, values)
                }
                isSubmitting={isSubmitting}
                onClick={submitForm}
              >
                create account
              </CustomButton>
            </Box>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default Signup;
