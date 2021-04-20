import React, { useState } from "react";
import {
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  LinearProgress,
  OutlinedInput,
} from "@material-ui/core";
import { Field, FieldProps } from "formik";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { CustomIconButton } from "../../common";
import usePasswordInputFieldStyles from "./password-input-field-styles";

interface PasswordInputFieldProps {
  state: { color: string; backgroundColor: string; value: number };
}

const PasswordInputField: React.FC<PasswordInputFieldProps> = ({
  state: { color, backgroundColor, value },
}: PasswordInputFieldProps) => {
  const classes = usePasswordInputFieldStyles();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <Grid className={classes.progressContainer} container justify="flex-end">
        <Grid xs={3} item>
          <LinearProgress
            classes={{
              colorPrimary:
                classes[backgroundColor as keyof (string | undefined)],
              barColorPrimary: classes[color as keyof (string | undefined)],
            }}
            variant="determinate"
            value={value}
          />
        </Grid>
      </Grid>
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
                Password
              </InputLabel>
              <OutlinedInput
                {...field}
                id="outlined-adornment-password"
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                endAdornment={
                  <InputAdornment position="end">
                    <CustomIconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </CustomIconButton>
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
    </>
  );
};

export default PasswordInputField;
