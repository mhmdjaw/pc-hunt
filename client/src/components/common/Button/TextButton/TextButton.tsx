import React from "react";
import { Button, ButtonProps, useTheme } from "@material-ui/core";
import { Palette, PaletteColor } from "@material-ui/core/styles/createPalette";
import { hexToRgba } from "../../../../helpers";
import clsx from "clsx";
import useButtonStyles from "../button-styles";

interface TextButtonProps extends ButtonProps {
  component?: string;
}

const TextButton: React.FC<TextButtonProps> = (props: TextButtonProps) => {
  const theme = useTheme();

  const stylesProps = {
    focusBackgroundColor: "rgba(0,0,0,0.3)",
  };

  if (props.color && props.color !== "inherit") {
    stylesProps.focusBackgroundColor = hexToRgba(
      (theme.palette[props.color as keyof Palette] as PaletteColor).main,
      0.3
    );
  }

  const classes = useButtonStyles(stylesProps);

  return (
    <Button
      {...props}
      focusVisibleClassName={classes.focusVisible}
      className={clsx(classes.buttonActive, props.className)}
    >
      {props.children}
    </Button>
  );
};

export default TextButton;
