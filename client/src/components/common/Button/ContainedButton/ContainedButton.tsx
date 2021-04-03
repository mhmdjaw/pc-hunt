import React from "react";
import {
  Box,
  Button,
  ButtonProps,
  CircularProgress,
  useTheme,
} from "@material-ui/core";
import { Palette, PaletteColor } from "@material-ui/core/styles/createPalette";
import useButtonStyles from "../button-styles";

interface ContainedButtonProps extends ButtonProps {
  isSubmitting?: boolean;
}

const ContainedButton: React.FC<ContainedButtonProps> = ({
  isSubmitting,
  ...props
}: ContainedButtonProps) => {
  const theme = useTheme();

  const stylesProps = {
    focusBackgroundColor: theme.palette.grey[400],
    activeBackgroundColor: theme.palette.grey[200],
  };

  if (props.color && props.color !== "inherit") {
    stylesProps.focusBackgroundColor = (theme.palette[
      props.color as keyof Palette
    ] as PaletteColor).dark;
    stylesProps.activeBackgroundColor = (theme.palette[
      props.color as keyof Palette
    ] as PaletteColor).light;
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
          variant="contained"
          color={props.color}
          focusVisibleClassName={classes.focusVisible}
          className={classes.containedButtonActive}
        />
      </Box>
    </Box>
  );
};

export default ContainedButton;
