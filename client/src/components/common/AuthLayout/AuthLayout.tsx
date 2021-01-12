import React from "react";
import { useTheme } from "@material-ui/core/styles";
import useAuthLayoutStyles from "./auth-layout-styles";
import { Box, Container, Paper, Typography } from "@material-ui/core";
import { ReactComponent as LogoPrimary } from "../../../assets/logo-primary.svg";
import OrSplitter from "../OrSplitter";
import ContainedButton from "../ContainedButton";
import GoogleIcon from "../../../assets/GoogleIcon";

interface AuthLayoutProps {
  headline: string;
  AuthType: "login" | "signup";
  footer: string;
  children: JSX.Element | null;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  headline,
  AuthType,
  footer,
  children,
}: AuthLayoutProps) => {
  const classes = useAuthLayoutStyles();
  const theme = useTheme();

  return (
    <Container maxWidth="sm">
      <Box my="15vh">
        <Box flexDirection="column" alignItems="center" display="flex" mb="5vh">
          <LogoPrimary
            width="20%"
            height="20%"
            fill={theme.palette.primary.main}
          />
          <Typography className={classes.headline} variant="h4">
            {headline}
          </Typography>
        </Box>

        <Paper className={classes.paper} elevation={7}>
          {children}
          <OrSplitter />
          <Box display="flex" justifyContent="center">
            <ContainedButton startIcon={<GoogleIcon />} size="large" fullWidth>
              {AuthType === "signup" ? "sign up" : "log in"} with google
            </ContainedButton>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default AuthLayout;
