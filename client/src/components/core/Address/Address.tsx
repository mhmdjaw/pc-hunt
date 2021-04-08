import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  CircularProgress,
  createStyles,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { CustomButton, FormLayout } from "../../common";
import {
  Address as IAddress,
  getAddress,
  saveAddress,
} from "../../../api/address";
import { useCancelToken } from "../../../helpers";
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import { TextField as TextFieldFormik } from "formik-material-ui";
import { shallowEqual } from "recompose";

const useAddressStyles = makeStyles((theme) =>
  createStyles({
    phoneContainer: {
      marginBottom: "24px",
      [theme.breakpoints.up("sm")]: {
        width: "calc(50% - 12px)",
      },
    },
    phone: {
      "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
        WebkitAppearance: "none",
      },
    },
  })
);

interface State {
  error?: string;
  success?: string;
  lastSubmission: IAddress;
}

const initialValues: IAddress = {
  firstName: "",
  lastName: "",
  addressLine: "",
  country: "",
  city: "",
  province: "",
  postalCode: "",
  phone: "",
};

const validate = (values: IAddress) => {
  const errors: Partial<IAddress> = {};
  const keys = Object.keys(initialValues);
  if (!/^\d+$/.test(values.phone)) {
    errors.phone = "Only numerals are allowed";
  }
  keys.forEach((key) => {
    if (!values[key as keyof IAddress]) {
      errors[key as keyof IAddress] = "Required";
    }
  });

  return errors;
};

const Address: React.FC = () => {
  const classes = useAddressStyles();
  const cancelSource = useCancelToken();
  const [state, setState] = useState<State>({
    error: undefined,
    success: undefined,
    lastSubmission: initialValues,
  });
  const [formValues, setFormValues] = useState<IAddress>(initialValues);
  const [loaded, setLoaded] = useState(false);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(
    () => {
      getAddress(cancelSource.current?.token).then((response) => {
        if (response.data) {
          setFormValues(response.data);
        }
        setLoaded(true);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onSubmit = (
    values: IAddress,
    { setSubmitting }: FormikHelpers<IAddress>
  ) => {
    saveAddress(values, cancelSource.current?.token)
      .then(() => {
        console.log("hello");

        setState({
          success: "Your address has been saved",
          error: undefined,
          lastSubmission: values,
        });
        setSubmitting(false);
      })
      .catch((err) => {
        console.log(err);

        setState({
          error: err.response.data.error,
          success: undefined,
          lastSubmission: values,
        });
        setSubmitting(false);
      });
  };

  const onWheel = () => {
    phoneInputRef.current?.blur();
    setTimeout(() => phoneInputRef.current?.focus(), 100);
  };

  return (
    <FormLayout
      title="Address"
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
              <Box mb="24px">
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TextFieldFormik}
                      variant="outlined"
                      name="firstName"
                      label="First Name"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TextFieldFormik}
                      variant="outlined"
                      name="lastName"
                      label="Last Name"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box mb="24px">
                <Field
                  component={TextFieldFormik}
                  variant="outlined"
                  name="addressLine"
                  label="Address"
                  fullWidth
                />
              </Box>
              <Box mb="12px">
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TextFieldFormik}
                      variant="outlined"
                      name="country"
                      label="Country"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TextFieldFormik}
                      variant="outlined"
                      name="city"
                      label="City"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box mb="24px">
                <Grid container spacing={3}>
                  <Grid item xs={6} sm={6}>
                    <Field
                      component={TextFieldFormik}
                      variant="outlined"
                      name="province"
                      label="Province"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Field
                      component={TextFieldFormik}
                      variant="outlined"
                      name="postalCode"
                      label="Postal Code"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Box>
              <div className={classes.phoneContainer}>
                <Field name="phone">
                  {(props: FieldProps) => (
                    <TextField
                      {...props.field}
                      variant="outlined"
                      label="Phone"
                      error={props.meta.touched && Boolean(props.meta.error)}
                      helperText={props.meta.touched && <>{props.meta.error}</>}
                      fullWidth
                      inputProps={{
                        className: classes.phone,
                        onWheel,
                        ref: phoneInputRef,
                      }}
                    />
                  )}
                </Field>
              </div>
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
                save address
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

export default Address;
