import React, { ChangeEvent, useState } from "react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import {
  Box,
  MenuItem,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { CustomIconButton, CustomButton } from "../../common";
import { shallowEqual } from "recompose";
import { Alert } from "@material-ui/lab";
import { Add, Delete } from "@material-ui/icons";
import useProductFormStyles from "./product-form-styles";
import { createProduct } from "../../../api/product";
import { useFacets } from "../../../context";

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
  lastSubmission: {
    values: Values;
    image: File | null;
  };
  imageURL: string;
  image: File | null;
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
  if (values.price.length === 0) {
    errors.price = "Required";
  } else if (Number(values.price) < 0) {
    errors.price = "Price can't be negative";
  }
  if (values.quantity.length === 0) {
    errors.quantity = "Required";
  } else if (Number(values.quantity) < 0) {
    errors.quantity = "Quantity can't be negative";
  }

  return errors;
};

const ProductForm: React.FC = () => {
  const classes = useProductFormStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { categories } = useFacets();

  const [state, setState] = useState<State>({
    error: undefined,
    success: undefined,
    lastSubmission: { values: { ...initialValues }, image: null },
    imageURL: "",
    image: null,
  });

  const onSubmit = (
    formikValues: Values,
    { setSubmitting, resetForm }: FormikHelpers<Values>
  ) => {
    const { name, description, category, price, quantity } = formikValues;

    const values = new FormData();

    values.append("name", name);
    values.append("description", description);
    values.append("category", category);
    values.append("price", price);
    values.append("quantity", quantity);
    if (state.image) {
      values.append("image", state.image);
    }

    createProduct(values)
      .then(() => {
        setState({
          ...state,
          success: "Product successfully created",
          error: undefined,
          imageURL: "",
          image: null,
          lastSubmission: {
            values: { ...formikValues },
            image: state.image,
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
            values: { ...formikValues },
            image: state.image,
          },
        });
        setSubmitting(false);
      });
  };

  const setImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const image = e.target.files[0];
      const url = URL.createObjectURL(image);
      setState({
        ...state,
        imageURL: url,
        image: image,
      });
    }
  };

  // in case there are multiple images pass the index of the image in the array
  const removeImage = () => {
    setState({
      ...state,
      imageURL: "",
      image: null,
    });
  };

  return (
    <Box m="60px auto 90px" p="0 16px" maxWidth="700px">
      <Typography className={classes.title} variant="h4">
        Create Product
      </Typography>
      <Box mt="30px">
        <Paper className={classes.paper} elevation={3}>
          {(state.error || state.success) && (
            <Box mb="24px" maxWidth="500px">
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
                <Box mb="24px" maxWidth="500px">
                  <Field
                    component={TextField}
                    variant="outlined"
                    name="name"
                    label="Product name"
                    fullWidth
                  />
                </Box>
                <Box mb="24px" maxWidth="500px">
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
                <Box mb="24px" maxWidth="350px">
                  <Field
                    component={TextField}
                    variant="outlined"
                    name="category"
                    label="Category"
                    select
                    fullWidth
                  >
                    {categories.map(
                      (category, i) =>
                        category.parent.slug !== "root" && (
                          <MenuItem key={i} value={category._id}>
                            {category.name}
                          </MenuItem>
                        )
                    )}
                  </Field>
                </Box>
                <Box
                  display="flex"
                  maxWidth="350px"
                  flexDirection={isMobile ? "column" : "row"}
                  justifyContent="space-between"
                >
                  <Box mb="24px" maxWidth="200px">
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
                  <Box mb="24px" maxWidth="126px">
                    <Field
                      component={TextField}
                      variant="outlined"
                      name="quantity"
                      type="number"
                      label="Quantity"
                      inputProps={{ min: 0 }}
                      fullWidth
                    />
                  </Box>
                </Box>
                <Box mb="24px">
                  <CustomButton
                    component="label"
                    color="primary"
                    startIcon={<Add />}
                  >
                    add image
                    <input
                      type="file"
                      accept="image/jpg, image/png, image/jpeg, image/bmp"
                      onChange={(event) => setImage(event)}
                      hidden
                    />
                  </CustomButton>
                </Box>
                <Box mb="24px">
                  {state.image && (
                    <Box
                      display="flex"
                      maxWidth="200px"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <img className={classes.image} src={state.imageURL} />
                      <CustomIconButton
                        aria-label="remove image"
                        onClick={removeImage}
                        color="primary"
                      >
                        <Delete />
                      </CustomIconButton>
                    </Box>
                  )}
                </Box>
                <CustomButton
                  variant="contained"
                  color="primary"
                  disabled={
                    isSubmitting ||
                    !(dirty && isValid) ||
                    (shallowEqual(state.lastSubmission.values, values) &&
                      state.lastSubmission.image?.size === state.image?.size) ||
                    !state.image
                  }
                  isSubmitting={isSubmitting}
                  onClick={submitForm}
                >
                  create product
                </CustomButton>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </Box>
  );
};

export default ProductForm;
