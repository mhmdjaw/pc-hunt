import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@material-ui/core";
import { CustomButton, FormLayout } from "../../common";
import { useCancelToken } from "../../../helpers";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { TextField } from "formik-material-ui";
import { shallowEqual } from "recompose";
import axios from "axios";
import { useParams } from "react-router";
import { getReview, postReview } from "../../../api/review";
import { Rating } from "@material-ui/lab";
import useReviewFormStyles from "./review-form-styles";

interface Values {
  description: string;
  nickname: string;
}

interface State {
  error?: string;
  success?: string;
  rating: number;
  ratingDirty: boolean;
  lastSubmission: {
    rating: number;
    description: string;
    nickname: string;
  };
}

const initialValues: Values = {
  description: "",
  nickname: "",
};

const validate = (values: Values) => {
  const errors: Partial<Values> = {};
  if (!values.nickname) {
    errors.nickname = "Required";
  }

  return errors;
};

const Address: React.FC = () => {
  const classes = useReviewFormStyles();
  const cancelSource = useCancelToken();
  const { slug } = useParams<{ slug: string }>();
  const [state, setState] = useState<State>({
    error: undefined,
    success: undefined,
    rating: 3,
    ratingDirty: false,
    lastSubmission: { ...initialValues, rating: 3 },
  });
  const [formValues, setFormValues] = useState<Values>(initialValues);
  const [loaded, setLoaded] = useState(false);

  useEffect(
    () => {
      getReview(slug, cancelSource.current?.token)
        .then((response) => {
          if (response.data) {
            setFormValues(response.data);
            setState({ ...state, rating: response.data?.rating });
          }
          setLoaded(true);
        })
        .catch((err) => {
          if (!axios.isCancel(err)) {
            console.log(err.response.data.error);
          }
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onSubmit = (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) => {
    postReview(
      slug,
      { ...values, rating: state.rating },
      cancelSource.current?.token
    )
      .then(() => {
        setState({
          ...state,
          success: "Your review has been posted",
          error: undefined,
          lastSubmission: { ...values, rating: state.rating },
        });
        setSubmitting(false);
      })
      .catch((err) => {
        console.log(err);

        setState({
          ...state,
          error: err.response.data.error,
          success: undefined,
          lastSubmission: { ...values, rating: state.rating },
        });
        setSubmitting(false);
      });
  };

  return (
    <FormLayout
      title="Review"
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
                <Rating
                  className={classes.rating}
                  name="rating"
                  value={state.rating}
                  onChange={(_event, value) =>
                    value &&
                    setState({
                      ...state,
                      rating: value as number,
                      ratingDirty: true,
                    })
                  }
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
              <Box mb="24px" maxWidth="500px">
                <Field
                  component={TextField}
                  variant="outlined"
                  name="nickname"
                  label="Nickname"
                  fullWidth
                />
              </Box>
              <CustomButton
                variant="contained"
                color="primary"
                disabled={
                  isSubmitting ||
                  !((dirty || state.ratingDirty) && isValid) ||
                  (shallowEqual(state.lastSubmission, values) &&
                    state.lastSubmission.rating === state.rating)
                }
                isSubmitting={isSubmitting}
                onClick={submitForm}
              >
                post
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
