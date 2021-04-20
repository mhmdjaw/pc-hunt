import React, { useState } from "react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { Box } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { CustomButton, FormLayout, PasswordInputField } from "../../common";
import { shallowEqual } from "recompose";
import { useAuth } from "../../../context";
import { calculatePasswordStrength } from "../../../helpers";
import { resetPassword, ResetPasswordValues } from "../../../auth";

interface Values {
  oldPassword: string;
  password: string;
  confirmPassword: string;
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

const initialValues = {
  oldPassword: "",
  password: "",
  confirmPassword: "",
};

const validate = (values: Values, oldPasswordAvailable: boolean) => {
  const errors: Partial<Values> = {};
  let bar = {
    color: "barColorPrimary",
    backgroundColor: "colorPrimary",
    value: 0,
  };

  if (oldPasswordAvailable) {
    if (!values.oldPassword) {
      errors.oldPassword = "Required";
    } else if (values.oldPassword === values.password) {
      errors.password = "Use a different password from your old one";
    }
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
  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "confirm password doesn't match your password";
  }
  return { errors, bar };
};

const CategoryForm: React.FC = () => {
  const { user, setUser } = useAuth();
  const [state, setState] = useState<State>({
    error: undefined,
    success: undefined,
    lastSubmission: { ...initialValues },
    bar: {
      backgroundColor: "colorPrimary",
      color: "barColorPrimary",
      value: 0,
    },
  });

  const onSubmit = (
    values: Values,
    { setSubmitting, resetForm }: FormikHelpers<Values>
  ) => {
    const resetPasswordValues: ResetPasswordValues = {
      newPassword: values.password,
    };
    if (values.oldPassword) {
      resetPasswordValues.oldPassword = values.oldPassword;
    }
    resetPassword(resetPasswordValues)
      .then((response) => {
        setState({
          success: response.data.message,
          error: undefined,
          lastSubmission: {
            ...values,
          },
          bar: {
            backgroundColor: "colorPrimary",
            color: "barColorPrimary",
            value: 0,
          },
        });
        if (user) {
          user.passwordAvailable = true;
          setUser({ user: { ...user }, isLoading: false });
        }
        resetForm();
        setSubmitting(false);
      })
      .catch((err) => {
        setState({
          ...state,
          error: err.response.data.error,
          success: undefined,
          lastSubmission: {
            ...values,
          },
        });
        setSubmitting(false);
      });
  };

  return (
    <FormLayout
      title="Reset Password"
      maxWidth={700}
      error={state.error}
      success={state.success}
    >
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const { errors, bar } = validate(
            values,
            user?.passwordAvailable as boolean
          );
          setState({ ...state, bar });
          return errors;
        }}
        onSubmit={onSubmit}
      >
        {({ submitForm, isSubmitting, isValid, dirty, values }) => (
          <Form>
            {user?.passwordAvailable && (
              <Box mb="24px" maxWidth="450px">
                <Field
                  component={TextField}
                  variant="outlined"
                  type="password"
                  name="oldPassword"
                  label="Old Password"
                  fullWidth
                />
              </Box>
            )}
            <Box mb="24px" maxWidth="450px">
              <PasswordInputField state={state.bar} />
            </Box>
            <Box mb="24px" maxWidth="450px">
              <Field
                component={TextField}
                variant="outlined"
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                fullWidth
              />
            </Box>
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
              save changes
            </CustomButton>
          </Form>
        )}
      </Formik>
    </FormLayout>
  );
};

export default CategoryForm;
