import React from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

import useAccountStyles from "./account-styles";
import accountFeaturesItems from "./account-features-items";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../context";

const AccountFeatures: React.FC = () => {
  const classes = useAccountStyles();
  const history = useHistory();
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Grid container spacing={isMobile ? 4 : 6}>
      {accountFeaturesItems.map((feature, i) => {
        const { Svg, title, subtitle, url, role } = feature;

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
                  <Svg
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
