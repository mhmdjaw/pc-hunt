import React from "react";
import { Button, ButtonProps, useTheme } from "@material-ui/core";
import { Palette, PaletteColor } from "@material-ui/core/styles/createPalette";
import { hexToRgba } from "../../../helpers";
import useTextButtonStyles from "./text-button-styles";

interface TextButtonProps extends ButtonProps {
  component: string;
}

const TextButton: React.FC<TextButtonProps> = (props: TextButtonProps) => {
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

  const classes = useTextButtonStyles(stylesProps);

  return (
    <Button
      {...props}
      focusVisibleClassName={classes.focusVisible}
      className={classes.buttonActive}
    >
      {props.children}
    </Button>
  );
};

export default TextButton;
