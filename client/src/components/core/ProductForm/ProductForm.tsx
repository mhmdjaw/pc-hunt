import React, { ChangeEvent, useEffect, useState } from "react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import {
  Box,
  CircularProgress,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { CustomIconButton, CustomButton, FormLayout } from "../../common";
import { shallowEqual } from "recompose";
import { Add, Delete } from "@material-ui/icons";
import useProductFormStyles from "./product-form-styles";
import {
  createProduct,
  getProduct,
  getProductImage,
  updateProduct,
} from "../../../api/product";
import { useFacets } from "../../../context";
import { useCancelToken } from "../../../helpers";
import { useParams } from "react-router";
import axios from "axios";

interface Values {
  name: string;
  description: string;
  category: string;
  price: string;
  quantity: string;
}

interface Errors {
  name: string;
  description: string;
  category: string;
  price?: string;
  quantity?: string;
}

interface State {
  error?: string;
  success?: string;
  lastSubmission: {
    values: Values;
    imageURL: string;
  };
  imageURL: string;
  image: File | null;
}

const initialValues: Values = {
  name: "",
  description: "",
  category: "",
  price: "",
  quantity: "",
};

const validate = (values: Values) => {
  const errors: Partial<Errors> = {};

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
  const cancelSource = useCancelToken();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { categories } = useFacets();

  const { slug } = useParams<{ slug: string }>();
  const [state, setState] = useState<State>({
    error: undefined,
    success: undefined,
    lastSubmission: { values: { ...initialValues }, imageURL: "" },
    imageURL: "",
    image: null,
  });
  const [formValues, setFormValues] = useState<Values>(initialValues);
  const [loaded, setLoaded] = useState(false);

  useEffect(
    () => {
      if (slug) {
        getProduct(slug, cancelSource.current?.token)
          .then((response) => {
            const {
              categories,
              price,
              quantity,
              slug,
              ...otherFields
            } = response.data;
            setFormValues({
              ...otherFields,
              category: categories[0] as string,
              price: price.toString(),
              quantity: quantity.toString(),
            });
            setState({ ...state, imageURL: getProductImage(slug) });
            setLoaded(true);
          })
          .catch((err) => {
            if (!axios.isCancel(err)) {
              console.log(err.response.data.error);
            }
          });
      } else {
        setLoaded(true);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onSubmit = (
    formikValues: Values,
    { setSubmitting, resetForm }: FormikHelpers<Values>
  ) => {
    const { name, description, category, price, quantity } = formikValues;

    const values = new FormData();

    values.append("name", name);
    values.append("description", description);
    values.append("category", category);
    values.append("price", price?.toString() as string);
    values.append("quantity", quantity?.toString() as string);
    if (state.image) {
      values.append("image", state.image);
    }

    const request = slug ? updateProduct(slug, values) : createProduct(values);

    request
      .then(() => {
        setState({
          success: "Product successfully created",
          error: undefined,
          imageURL: slug ? state.imageURL : "",
          image: slug ? state.image : null,
          lastSubmission: {
            values: { ...formikValues },
            imageURL: state.imageURL,
          },
        });
        if (slug) {
          resetForm();
        }
        setSubmitting(false);
      })
      .catch((err) => {
        setState({
          ...state,
          error: err.response.data.error,
          success: undefined,
          lastSubmission: {
            values: { ...formikValues },
            imageURL: state.imageURL,
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
    <FormLayout
      title={slug ? "Update Product" : "Create Product"}
      maxWidth={700}
      error={state.error}
      success={state.success}
    >
      {loaded ? (
        <Formik
          initialValues={formValues}
          validate={validate}
          onSubmit={onSubmit}
          enableReinitialize
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
                  rows={7}
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
                {state.imageURL.length > 0 && (
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
                  !((dirty || (slug && state.image)) && isValid) ||
                  (shallowEqual(state.lastSubmission.values, values) &&
                    state.lastSubmission.imageURL === state.imageURL) ||
                  state.imageURL.length === 0
                }
                isSubmitting={isSubmitting}
                onClick={submitForm}
              >
                {slug ? "update product" : "create product"}
              </CustomButton>
            </Form>
          )}
        </Formik>
      ) : (
        <Box display="flex" justifyContent="center">
          <CircularProgress disableShrink />
        </Box>
      )}
    </FormLayout>
  );
};

export default ProductForm;
