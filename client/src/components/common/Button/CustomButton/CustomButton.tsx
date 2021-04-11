import React, { RefAttributes } from "react";
import {
  Box,
  Button,
  ButtonProps,
  CircularProgress,
  useTheme,
} from "@material-ui/core";
import { Palette, PaletteColor } from "@material-ui/core/styles/createPalette";
import useButtonStyles from "../button-styles";
import { hexToRgba } from "../../../../helpers";
import clsx from "clsx";
import { LinkProps } from "react-router-dom";

interface CustomButtonProps extends ButtonProps {
  isSubmitting?: boolean;
  buttonClassName?: string;
  component?:
    | string
    | React.ComponentType
    | (<S = unknown>(
        props: LinkProps<S> & RefAttributes<HTMLAnchorElement>
      ) => React.ReactElement | null);
  to?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  isSubmitting,
  buttonClassName,
  ...props
}: CustomButtonProps) => {
  const theme = useTheme();

  const stylesProps = {
    focusBackgroundColor:
      props.variant === "contained"
        ? theme.palette.grey[400]
        : "rgba(0,0,0,0.3)",
  };

  if (props.color && props.color !== "inherit") {
    stylesProps.focusBackgroundColor =
      props.variant === "contained"
        ? (theme.palette[props.color as keyof Palette] as PaletteColor).dark
        : hexToRgba(
            (theme.palette[props.color as keyof Palette] as PaletteColor).main,
            0.3
          );
  }

  const classes = useButtonStyles(stylesProps);

  return (
    <Box
      position="relative"
      display="inline-flex"
      width={props.fullWidth && "100%"}
      className={props.className}
    >
      {isSubmitting && (
        <Box className={classes.circularProgress}>
          <CircularProgress
            color={props.color === "default" ? "primary" : props.color}
            size={25}
          />
        </Box>
      )}
      <Box position="inherit" display="inherit" width="inherit">
        <Button
          {...props}
          color={props.color}
          focusVisibleClassName={classes.focusVisible}
          className={clsx(classes.buttonActive, buttonClassName)}
        />
      </Box>
    </Box>
  );
};

export default CustomButton;
