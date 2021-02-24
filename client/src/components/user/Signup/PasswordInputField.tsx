import React, { useState } from "react";
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import { Field, FieldProps } from "formik";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { CustomIconButton } from "../../common";

const PasswordInputField: React.FC = () => {
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
  );
};

export default PasswordInputField;
