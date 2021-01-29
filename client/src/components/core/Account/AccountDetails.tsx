import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { AccountCircle, Email } from "@material-ui/icons";
import React from "react";
import useAccountStyles from "./account-styles";

interface AccountDetailsProps {
  name: string;
  email: string;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({
  email,
  name,
}: AccountDetailsProps) => {
  const classes = useAccountStyles();
  const theme = useTheme();
  const isLaptop = useMediaQuery(theme.breakpoints.up("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Card variant="outlined" className={classes.accountDetails}>
      <CardContent>
        <Grid
          container
          justify="space-around"
          alignItems="center"
          className={classes.container}
        >
          <Grid item xs={12} md={6}>
            <Box
              display="flex"
              alignItems="center"
              mb="10%"
              fontSize={isMobile ? "30px" : "45px"}
            >
              <AccountCircle
                className={classes.icon}
                color="primary"
                fontSize="inherit"
              />
              <Typography variant={isMobile ? "h5" : "h4"} noWrap>
                {name}
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              fontSize={isMobile ? "30px" : "45px"}
            >
              <Email
                className={classes.icon}
                color="primary"
                fontSize="inherit"
              />
              <Typography variant={isMobile ? "subtitle2" : "h6"} noWrap>
                {email}
              </Typography>
            </Box>
          </Grid>
          {isLaptop ? (
            <Divider orientation="vertical" flexItem variant="middle" />
          ) : (
            <Grid xs={12}>
              <Divider className={classes.divider} variant="middle" />
            </Grid>
          )}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom>
              Mohamad Jawhar
            </Typography>
            <Typography variant="h5" gutterBottom>
              Mohamad Jawhar
            </Typography>
            <Typography variant="h5" gutterBottom>
              Mohamad Jawhar
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AccountDetails;
