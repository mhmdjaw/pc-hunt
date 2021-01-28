import React from "react";
import { Box, Button, ButtonProps, CircularProgress } from "@material-ui/core";
import useContainedIconStyles from "./contained-button-styles";

interface ContainedButtonProps extends ButtonProps {
  isSubmitting?: boolean;
}

const ContainedButton: React.FC<ContainedButtonProps> = ({
  isSubmitting,
  ...props
}: ContainedButtonProps) => {
  const classes = useContainedIconStyles();

  return (
    <Box position="relative" width={props.fullWidth && "100%"}>
      {isSubmitting && (
        <Box className={classes.circularProgress}>
          <CircularProgress size={25} />
        </Box>
      )}
      <Box position="relative">
        <Button
          {...props}
          variant="contained"
          color="primary"
          focusVisibleClassName={classes.focusVisible}
          className={classes.buttonActive}
        />
      </Box>
    </Box>
  );
};

export default ContainedButton;
