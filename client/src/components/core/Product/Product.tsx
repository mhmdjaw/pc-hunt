import React, { useState } from "react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import {
  Box,
  makeStyles,
  MenuItem,
  Paper,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { TextField } from "formik-material-ui";
import ContainedButton from "../../common/ContainedButton";
import { shallowEqual } from "recompose";
import { createCategory } from "../../../api/admin";
import { Alert } from "@material-ui/lab";

interface Values {
  name: string;
  description: string;
  category: string;
  price: string;
  quantity: string;
}

interface State {
  error: string | undefined;
  success: string | undefined;
  lastSubmission: Values;
}

const initialValues = {
  name: "",
  description: "",
  category: "",
  price: "",
  quantity: "",
};

const validate = (values: Values) => {
  const errors: Partial<Values> = {};

  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.description) {
    errors.description = "Required";
  }
  if (!values.category) {
    errors.category = "Required";
  }
  if (!values.price) {
    errors.price = "Required";
  } else if (Number(values.price) < 0) {
    errors.price = "Price can't be negative";
  }
  if (!values.quantity) {
    errors.quantity = "Required";
  } else if (Number(values.quantity) < 0) {
    errors.quantity = "Quantity can't be negative";
  }

  return errors;
};

const useStyles = makeStyles({
  paper: {
    padding: "60px 5vw",
    marginBottom: "10vh",
  },
});

const Product: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

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
      <Typography variant="h4">Create Product</Typography>
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
                    label="Product name"
                    fullWidth
                  />
                </Box>
                <Box mb="5vh" maxWidth="500px">
                  <Field
                    component={TextField}
                    variant="outlined"
                    name="description"
                    label="Description"
                    multiline
                    rows={5}
                    fullWidth
                  />
                </Box>
                <Box mb="5vh" maxWidth="350px">
                  <Field
                    component={TextField}
                    variant="outlined"
                    name="category"
                    label="Category"
                    select
                    fullWidth
                  >
                    <MenuItem value="5ff3749cc01bc5144c80af9a">Node</MenuItem>
                  </Field>
                </Box>
                <Box
                  display="flex"
                  width="330px"
                  flexDirection={isMobile ? "column" : "row"}
                  justifyContent="space-between"
                >
                  <Box mb="5vh" maxWidth="200px">
                    <Field
                      component={TextField}
                      variant="outlined"
                      name="price"
                      type="number"
                      label="Price $"
                      inputProps={{ min: 0 }}
                      fullWidth
                    />
                  </Box>
                  <Box mb="5vh" maxWidth="100px">
                    <Field
                      component={TextField}
                      variant="outlined"
                      name="quantity"
                      type="number"
                      label="Qantity"
                      inputProps={{ min: 0 }}
                      fullWidth
                    />
                  </Box>
                </Box>
                <ContainedButton
                  disabled={
                    isSubmitting ||
                    !(dirty && isValid) ||
                    shallowEqual(state.lastSubmission, values)
                  }
                  isSubmitting={isSubmitting}
                  onClick={submitForm}
                >
                  create product
                </ContainedButton>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </Box>
  );
};

export default Product;
