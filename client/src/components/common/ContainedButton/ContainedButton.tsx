import React from "react";
import {
  Box,
  Button,
  ButtonProps,
  CircularProgress,
  useTheme,
} from "@material-ui/core";
import useContainedIconStyles from "./contained-button-styles";
import { Palette, PaletteColor } from "@material-ui/core/styles/createPalette";

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

  const classes = useContainedIconStyles(stylesProps);

  return (
    <Box
      position="relative"
      display="inline-flex"
      width={props.fullWidth && "100%"}
    >
      {isSubmitting && (
        <Box className={classes.circularProgress}>
          <CircularProgress size={25} />
        </Box>
      )}
      <Box position="inherit" display="inherit" width="inherit">
        <Button
          {...props}
          variant="contained"
          color={props.color}
          focusVisibleClassName={classes.focusVisible}
          className={classes.buttonActive}
        />
      </Box>
    </Box>
  );
};

export default ContainedButton;
