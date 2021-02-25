import React from "react";
import { IconButton, IconButtonProps, useTheme } from "@material-ui/core";
import { Palette, PaletteColor } from "@material-ui/core/styles/createPalette";
import { hexToRgba } from "../../../helpers";
import useTextButtonStyles from "../TextButton/text-button-styles";
import clsx from "clsx";

interface CustomIconButtonProps extends IconButtonProps {
  href?: string;
  target?: string;
}

const CustomIconButton: React.FC<CustomIconButtonProps> = (
  props: CustomIconButtonProps
) => {
  const theme = useTheme();

  const stylesProps = {
    focusBackgroundColor: theme.palette.action.hover,
  };

  if (props.color && props.color !== "inherit") {
    stylesProps.focusBackgroundColor = hexToRgba(
      (theme.palette[props.color as keyof Palette] as PaletteColor).main,
      theme.palette.action.hoverOpacity
    );
  }

  const classes = useTextButtonStyles(stylesProps);

  return (
    <IconButton
      {...props}
      focusVisibleClassName={classes.focusVisible}
      className={clsx(classes.buttonActive, props.className)}
    />
  );
};

export default CustomIconButton;
