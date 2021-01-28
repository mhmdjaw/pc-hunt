import { IconButton, IconButtonProps } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useCustomIconButtonStyles from "./custom-icon-button-styles";
import React from "react";
import { Palette, PaletteColor } from "@material-ui/core/styles/createPalette";
import { hexToRgba } from "../../../helpers";

const CustomIconButton: React.FC<IconButtonProps> = (
  props: IconButtonProps
) => {
  const theme = useTheme();

  const stylesProps = {
    focusBackgroundColor: theme.palette.action.hover,
    activeBackgroundColor: theme.palette.action.disabled,
  };

  if (props.color && props.color !== "inherit") {
    stylesProps.focusBackgroundColor = hexToRgba(
      (theme.palette[props.color as keyof Palette] as PaletteColor).main,
      theme.palette.action.hoverOpacity
    );
    stylesProps.activeBackgroundColor = hexToRgba(
      (theme.palette[props.color as keyof Palette] as PaletteColor).main,
      0.3
    );
  }

  const classes = useCustomIconButtonStyles(stylesProps);

  return (
    <IconButton
      {...props}
      focusVisibleClassName={classes.focusVisible}
      className={classes.buttonActive}
    />
  );
};

export default CustomIconButton;
