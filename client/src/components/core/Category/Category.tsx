import React, { useState } from "react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { Box, Paper, Typography } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import ContainedButton from "../../common/ContainedButton";
import { shallowEqual } from "recompose";
import { createCategory } from "../../../api/category";
import { Alert } from "@material-ui/lab";
import useCategoryStyles from "./category-styles";

interface Values {
  name: string;
}

interface State {
  error: string | undefined;
  success: string | undefined;
  lastSubmission: Values;
}

const initialValues = {
  name: "",
};

const validate = (values: Values) => {
  const errors: Partial<Values> = {};

  if (!values.name) {
    errors.name = "Required";
  }

  return errors;
};

const Category: React.FC = () => {
  const classes = useCategoryStyles();

  const [state, setState] = useState<State>({
    error: undefined,
    success: undefined,
    lastSubmission: { ...initialValues },
  });

  const onSubmit = (
    values: Values,
    { setSubmitting, resetForm }: FormikHelpers<Values>
  ) => {
    createCategory(values)
      .then(() => {
        setState({
          success: "Category successfully created",
          error: undefined,
          lastSubmission: {
            ...values,
          },
        });
        resetForm();
        setSubmitting(false);
      })
      .catch((err) => {
        setState({
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
    <Box m="60px 10vw">
      <Typography variant="h4">Create Category</Typography>
      <Box mt="30px">
        <Paper className={classes.paper}>
          {(state.error || state.success) && (
            <Box mb="5vh" maxWidth="500px">
              {state.error && <Alert severity="error">{state.error}</Alert>}
              {state.success && (
                <Alert severity="success">{state.success}</Alert>
              )}
            </Box>
          )}
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={onSubmit}
          >
            {({ submitForm, isSubmitting, isValid, dirty, values }) => (
              <Form>
                <Box mb="5vh" maxWidth="500px">
                  <Field
                    component={TextField}
                    variant="outlined"
                    name="name"
                    label="Category name"
                    fullWidth
                  />
                </Box>
                <ContainedButton
                  color="primary"
                  disabled={
                    isSubmitting ||
                    !(dirty && isValid) ||
                    shallowEqual(state.lastSubmission, values)
                  }
                  isSubmitting={isSubmitting}
                  onClick={submitForm}
                >
                  create category
                </ContainedButton>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </Box>
  );
};

export default Category;
