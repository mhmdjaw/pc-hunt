import React from "react";
import { Button, ButtonProps } from "@material-ui/core";
import useContainedIconStyles from "./contained-button-styles";

const ContainedButton: React.FC<ButtonProps> = (props) => {
  const classes = useContainedIconStyles();

  return (
    <Button
      {...props}
      variant="contained"
      color="primary"
      disableRipple
      focusVisibleClassName={classes.focusVisible}
      className={classes.buttonActive}
    />
  );
};

export default ContainedButton;
