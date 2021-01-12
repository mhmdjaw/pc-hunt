import React from "react";
import { Button, ButtonProps } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    focusVisible: {
      backgroundColor: theme.palette.primary.dark,
    },
    buttonActive: {
      "&:active": {
        backgroundColor: theme.palette.primary.light,
      },
    },
  })
);

const ContainedButton: React.FC<ButtonProps> = (props) => {
  const classes = useStyles();

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
