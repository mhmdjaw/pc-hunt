import React, { useState } from "react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { Box, MenuItem } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { CustomButton, FormLayout } from "../../common";
import { shallowEqual } from "recompose";
import { createCategory } from "../../../api/category";
import { useFacets } from "../../../context";

interface Values {
  parent: string;
  name: string;
}

interface State {
  error?: string;
  success?: string;
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
          success: "Category successfully created",
          error: undefined,
          lastSubmission: { ...values },
        });
        resetForm();
        setSubmitting(false);
      })
      .catch((err) => {
        setState({
          error: err.response.data.error,
          success: undefined,
          lastSubmission: { ...values },
        });
        setSubmitting(false);
      });
  };

  return (
    <FormLayout
      title="Create Category"
      maxWidth={700}
      error={state.error}
      success={state.success}
    >
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        {({ submitForm, isSubmitting, isValid, dirty, values }) => (
          <Form>
            <Box mb="24px" maxWidth="350px">
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
            <Box mb="24px" maxWidth="500px">
              <Field
                component={TextField}
                variant="outlined"
                name="name"
                label="Category name"
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
              create category
            </CustomButton>
          </Form>
        )}
      </Formik>
    </FormLayout>
  );
};

export default CategoryForm;
