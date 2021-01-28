import React from "react";
import { Box, Card, CardContent, Grid, Typography } from "@material-ui/core";
import {
  OrdersIcon,
  AccountEditIcon,
  AddressIcon,
  PasswordResetIcon,
  WishListIcon,
  CategoryIcon,
  ProductIcon,
} from "../../../assets";
import useAccountStyles from "./account-styles";
import accountFeaturesItems from "./account-features-items";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../context";

const svgMapping = {
  AccountEditIcon,
  AddressIcon,
  OrdersIcon,
  PasswordResetIcon,
  WishListIcon,
  CategoryIcon,
  ProductIcon,
};

const AccountFeatures: React.FC = () => {
  const classes = useAccountStyles();
  const history = useHistory();
  const { user } = useAuth();

  return (
    <Grid container spacing={6} justify="center">
      {accountFeaturesItems.map((feature, i) => {
        const { svg, title, subtitle, url, role } = feature;
        const SvgIcon = svgMapping[svg as keyof typeof svgMapping];

        return (
          user &&
          user?.role >= role && (
            <Grid key={i} item xs={12} md={6} lg={4}>
              <Card
                tabIndex={0}
                className={classes.card}
                onClick={() => history.push(url)}
                onKeyDown={(event) =>
                  event.key === "Enter" && history.push(url)
                }
              >
                <CardContent className={classes.cardContent}>
                  <SvgIcon
                    className={classes.icon}
                    color="primary"
                    fontSize="inherit"
                  />
                  <Box className={classes.description}>
                    <Typography variant="h6">{title}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {subtitle}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )
        );
      })}
    </Grid>
  );
};

export default AccountFeatures;
