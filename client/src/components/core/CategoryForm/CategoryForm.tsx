import React, { useState } from "react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { Box, MenuItem, Paper, Typography } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { ContainedButton } from "../../common";
import { shallowEqual } from "recompose";
import { createCategory } from "../../../api/category";
import { Alert } from "@material-ui/lab";
import useCategoryFormStyles from "./category-form-styles";
import { useFacets } from "../../../context";

interface Values {
  parent: string;
  name: string;
}

interface State {
  error: string | undefined;
  success: string | undefined;
  lastSubmission: Values;
}

const initialValues = {
  parent: "",
  name: "",
};

const validate = (values: Values) => {
  const errors: Partial<Values> = {};

  if (!values.parent) {
    errors.parent = "Required";
  }
  if (!values.name) {
    errors.name = "Required";
  }

  return errors;
};

const CategoryForm: React.FC = () => {
  const classes = useCategoryFormStyles();
  const { categories } = useFacets();

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
          ...state,
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
    <Box m="60px 10vw 90px">
      <Typography variant="h4">Create Category</Typography>
      <Box mt="30px">
        <Paper className={classes.paper} elevation={3}>
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
                <Box mb="5vh" maxWidth="350px">
                  <Field
                    component={TextField}
                    variant="outlined"
                    name="parent"
                    label="Parent category"
                    select
                    fullWidth
                  >
                    {categories.map(
                      (category, i) =>
                        category.parent.slug === "root" && (
                          <MenuItem key={i} value={category._id}>
                            {category.name}
                          </MenuItem>
                        )
                    )}
                  </Field>
                </Box>
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

export default CategoryForm;
