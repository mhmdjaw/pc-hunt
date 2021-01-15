import React, { useState } from "react";
import { Box, Grid } from "@material-ui/core";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { TextField } from "formik-material-ui";
import LinearProgress from "@material-ui/core/LinearProgress";
import ContainedButton from "../../common/ContainedButton";
import AuthLayout from "../../common/AuthLayout/AuthLayout";
import useSignupStyles from "./signup-styles";
import PasswordInputField from "./PasswordInputField";
import { shallowEqual } from "recompose";
import { signup } from "../../../auth";
import { useHistory } from "react-router-dom";

interface Values {
  name: string;
  email: string;
  password: string;
}

interface State {
  error: string | undefined;
  success: string | undefined;
  lastSubmission: Values;
  barBgColor: string;
  barColor: string;
  barValue: number;
}

const initialValues: Values = {
  name: "",
  email: "",
  password: "",
};

const validate = (values: Values) => {
  const errors: Partial<Values> = {};
  let conditionsFulfilled = 0;
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
    conditionsFulfilled += values.password.length > 7 ? 1 : 0;
    conditionsFulfilled += /[a-z]/g.test(values.password) ? 1 : 0;
    conditionsFulfilled += /[A-Z]/g.test(values.password) ? 1 : 0;
    conditionsFulfilled += /[0-9]/g.test(values.password) ? 1 : 0;
    conditionsFulfilled += /[ !"#$%&'()*+,-./:\\;<=>?@[\]^_`{|}~]/g.test(
      values.password
    )
      ? 1
      : 0;
    if (conditionsFulfilled < 5) {
      errors.password =
        "Your password should have at least 8 characters, one uppercase, one lowercase, one number and one special character";
    }
  }
  return { errors, conditionsFulfilled };
};

const Signup: React.FC = () => {
  const classes = useSignupStyles();
  const history = useHistory();

  const [state, setState] = useState<State>({
    error: undefined,
    success: undefined,
    barBgColor: "colorPrimary",
    barColor: "barColorPrimary",
    barValue: 0,
    lastSubmission: { ...initialValues },
  });

  const handleProgressBar = (conditionsFulfilled: number) => {
    let [barColor, barBgColor, barValue] = [
      "barColorPrimary",
      "colorPrimary",
      0,
    ];
    if (conditionsFulfilled > 0) {
      if (conditionsFulfilled > 2) {
        if (conditionsFulfilled > 4) {
          [barColor, barBgColor, barValue] = [
            "barColorStrong",
            "colorStrong",
            100,
          ];
        } else {
          [barColor, barBgColor, barValue] = ["barColorMed", "colorMed", 66];
        }
      } else {
        [barColor, barBgColor, barValue] = ["barColorWeak", "colorWeak", 33];
      }
    }

    setState({
      ...state,
      barBgColor: barBgColor,
      barColor: barColor,
      barValue: barValue,
    });
  };

  const onSubmit = (
    values: Values,
    { setSubmitting, resetForm }: FormikHelpers<Values>
  ) => {
    signup(values)
      .then((user) => {
        localStorage.setItem("user", JSON.stringify(user));
        setState({
          ...state,
          success: "Account successfully created",
          error: undefined,
          lastSubmission: {
            ...values,
          },
        });
        resetForm();
        setSubmitting(false);
        history.push("/home");
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
          const { errors, conditionsFulfilled } = validate(values);
          handleProgressBar(conditionsFulfilled);
          return errors;
        }}
        onSubmit={onSubmit}
      >
        {({ submitForm, isSubmitting, isValid, dirty, values }) => (
          <Form>
            <Box mb="5vh">
              <Field
                component={TextField}
                variant="outlined"
                name="name"
                type="name"
                label="Name *"
                fullWidth
              />
            </Box>
            <Box mb="5vh">
              <Field
                component={TextField}
                variant="outlined"
                name="email"
                type="email"
                label="Email *"
                fullWidth
              />
            </Box>
            <Grid
              className={classes.progressContainer}
              spacing={1}
              container
              justify="flex-end"
            >
              <Grid xs={3} item>
                <LinearProgress
                  classes={{
                    colorPrimary:
                      classes[state.barBgColor as keyof (string | undefined)],
                    barColorPrimary:
                      classes[state.barColor as keyof (string | undefined)],
                  }}
                  variant="determinate"
                  value={state.barValue}
                />
              </Grid>
            </Grid>
            <Box mb="5vh">
              <PasswordInputField />
            </Box>

            <Box mb="5vh" display="flex" justifyContent="flex-end">
              <ContainedButton
                disabled={
                  isSubmitting ||
                  !(dirty && isValid) ||
                  shallowEqual(state.lastSubmission, values)
                }
                isSubmitting={isSubmitting}
                onClick={submitForm}
              >
                create account
              </ContainedButton>
            </Box>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default Signup;
