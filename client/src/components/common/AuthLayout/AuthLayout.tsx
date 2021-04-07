import React, { useState } from "react";
import useAuthLayoutStyles from "./auth-layout-styles";
import {
  Box,
  Container,
  Link,
  Paper,
  Typography,
  useTheme,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { LogoPrimary } from "../../../assets";
import OrSplitter from "../OrSplitter";
import { GoogleIcon } from "../../../assets";
import { Link as RouterLink } from "react-router-dom";
import { AUTH } from "../../../config";
import { CustomButton } from "..";

interface AuthLayoutProps {
  headline: string;
  authType: "login" | "signup";
  footer: string;
  children: JSX.Element | null;
  error: string | undefined;
  success: string | undefined;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  headline,
  authType,
  footer,
  children,
  error,
  success,
}: AuthLayoutProps) => {
  const classes = useAuthLayoutStyles();
  const theme = useTheme();
  let timer: NodeJS.Timeout;

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const googleAuth = () => {
    const url = `${AUTH}/google`;
    const target = "google_login";
    const left = screen.width / 2 - 500 / 2;
    const top = screen.height / 2 - 500 / 2;
    const features = `width=500,height=500,top=${top},left=${left}`;
    const googleWindow = window.open(url, target, features);
    setIsAuthenticating(true);

    timer = setInterval(() => {
      if (googleWindow && googleWindow.closed) {
        window.clearInterval(timer);
        setIsAuthenticating(false);
      }
    }, 500);
  };

  return (
    <Container maxWidth="sm">
      <Box my="90px">
        <Box flexDirection="column" alignItems="center" display="flex">
          <LogoPrimary
            width="20%"
            height="20%"
            fill={theme.palette.primary.main}
          />
          <Typography className={classes.headline} align="center" variant="h4">
            {headline}
          </Typography>
        </Box>

        <Paper className={classes.paper} elevation={7}>
          {(error || success) && (
            <Box mb="24px">
              {error && <Alert severity="error">{error}</Alert>}
              {success && <Alert severity="success">{success}</Alert>}
            </Box>
          )}
          {children}
          <OrSplitter />
          <Box display="flex" justifyContent="center">
            <CustomButton
              variant="contained"
              startIcon={<GoogleIcon />}
              color="primary"
              onClick={googleAuth}
              disabled={isAuthenticating}
              isSubmitting={isAuthenticating}
              size="large"
              fullWidth
            >
              log in with google
            </CustomButton>
          </Box>
        </Paper>
        <Box display="flex" justifyContent="center">
          <Typography variant="subtitle1" align="center">
            {footer}{" "}
            <Link
              component={RouterLink}
              to={`/${authType === "signup" ? "login" : "signup"}`}
            >
              {authType === "signup" ? "Log in" : "Sign up"}!
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default AuthLayout;
