import { Box, Paper, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import useFormLayoutStyles from "./form-layout-styles";

interface FormLayoutProps {
  title: string;
  maxWidth: number;
  children: React.ReactNode;
  error?: string;
  success?: string;
}

const FormLayout: React.FC<FormLayoutProps> = ({
  title,
  maxWidth,
  children,
  error,
  success,
}: FormLayoutProps) => {
  const classes = useFormLayoutStyles();

  return (
    <Box m="60px auto 90px" p="0 16px" maxWidth={`${maxWidth}px`}>
      <Typography className={classes.title} variant="h4">
        {title}
      </Typography>
      <Paper className={classes.paper} elevation={3}>
        {(error || success) && (
          <Box mb="24px" maxWidth="500px">
            <Alert severity={error ? "error" : "success"}>
              {success ? success : error}
            </Alert>
          </Box>
        )}
        {children}
      </Paper>
    </Box>
  );
};

export default FormLayout;
