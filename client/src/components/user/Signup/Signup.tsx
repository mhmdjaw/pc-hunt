import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Grid,
} from "@material-ui/core";
import {
  makeStyles,
  Theme,
  createStyles,
  useTheme,
} from "@material-ui/core/styles";
import { Formik, Form, Field, FormikHelpers, FieldProps } from "formik";
import { TextField } from "formik-material-ui";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import LinearProgress from "@material-ui/core/LinearProgress";
import { ReactComponent as LogoPrimary } from "../../../assets/logo-primary.svg";
import { hexToRgba } from "../../../helpers";

interface Values {
  email: string;
  password: string;
  username: string;
}

interface State {
  showPassword: boolean;
  barBgColor: string;
  barColor: string;
  barValue: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headline: {
      margin: "6vh 0 2vh 0",
    },
    paper: {
      padding: "10%",
    },
    progressContainer: {
      marginBottom: "1vh",
    },
    colorPrimary: {
      backgroundColor: theme.palette.action.disabled,
    },
    barColorPrimary: {
      backgroundColor: theme.palette.action.disabled,
    },
    colorWeak: {
      backgroundColor: hexToRgba(theme.palette.error.main),
    },
    barColorWeak: {
      backgroundColor: theme.palette.error.main,
    },
    colorMed: {
      backgroundColor: hexToRgba(theme.palette.warning.main),
    },
    barColorMed: {
      backgroundColor: theme.palette.warning.main,
    },
    colorStrong: {
      backgroundColor: hexToRgba(theme.palette.success.main),
    },
    barColorStrong: {
      backgroundColor: theme.palette.success.main,
    },
  })
);

const validate = (values: Values) => {
  const errors: Partial<Values> = {};
  let conditionsFulfilled = 0;
  if (!values.username) {
    errors.username = "Required";
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

const onSubmit = (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
  setTimeout(() => {
    setSubmitting(false);
    alert(JSON.stringify(values, null, 2));
  }, 500);
};

const Signup: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [state, setState] = useState<State>({
    showPassword: false,
    barBgColor: "colorPrimary",
    barColor: "barColorPrimary",
    barValue: 0,
  });

  const handleClickShowPassword = () => {
    setState({
      ...state,
      showPassword: !state.showPassword,
    });
  };

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

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="sm">
      <Box my="15vh">
        <Box flexDirection="column" alignItems="center" display="flex" mb="5vh">
          <LogoPrimary
            width="20%"
            height="20%"
            fill={theme.palette.primary.main}
          />
          <Typography className={classes.headline} variant="h4">
            Create your account
          </Typography>
        </Box>

        <Paper className={classes.paper} elevation={7}>
          <Formik
            initialValues={{
              email: "",
              password: "",
              username: "",
            }}
            validate={(values) => {
              const { errors, conditionsFulfilled } = validate(values);
              handleProgressBar(conditionsFulfilled);
              return errors;
            }}
            onSubmit={onSubmit}
          >
            {({ submitForm, isSubmitting, isValid, dirty }) => (
              <Form>
                <Box mb="5vh">
                  <Field
                    component={TextField}
                    variant="outlined"
                    name="username"
                    type="username"
                    label="Username *"
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
                          classes[
                            state.barBgColor as keyof (string | undefined)
                          ],
                        barColorPrimary:
                          classes[state.barColor as keyof (string | undefined)],
                      }}
                      variant="determinate"
                      value={state.barValue}
                    />
                  </Grid>
                </Grid>
                <Box mb="5vh">
                  <Field name="password">
                    {(props: FieldProps) => {
                      const { field, meta } = props;
                      return (
                        <FormControl
                          variant="outlined"
                          error={meta.touched && Boolean(meta.error)}
                          fullWidth
                        >
                          <InputLabel htmlFor="outlined-adornment-password">
                            Password *
                          </InputLabel>
                          <OutlinedInput
                            {...field}
                            id="outlined-adornment-password"
                            label="Password *"
                            type={state.showPassword ? "text" : "password"}
                            fullWidth
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {state.showPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                          {meta.touched && (
                            <FormHelperText id="outlined-adornment-password">
                              {meta.error}
                            </FormHelperText>
                          )}
                        </FormControl>
                      );
                    }}
                  </Field>
                </Box>

                <Box my="5vh" display="flex" justifyContent="flex-end">
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting || !(dirty && isValid)}
                    onClick={submitForm}
                  >
                    create account
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </Container>
  );
};

export default Signup;
