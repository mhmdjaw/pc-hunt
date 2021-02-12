import React from "react";
import { Box, Grid } from "@material-ui/core";
import { Feature } from "../home-features";
import useHomeFeaturesStyles from "./home-features-styles";

interface HomeFeaturesProps {
  features: Feature[];
}

const HomeFeatures: React.FC<HomeFeaturesProps> = ({
  features,
}: HomeFeaturesProps) => {
  const classes = useHomeFeaturesStyles();

  return (
    <Box p="100px 12% 124px">
      <Grid container justify="space-around">
        {features.map((feature, i) => (
          <Grid key={i} className={classes.feature} item xs={8} md={3}>
            <Box className={classes.iconContainer}>
              <feature.icon style={{ fontSize: "4.5rem" }} />
            </Box>
            <Box
              fontSize="h4.fontSize"
              fontWeight={700}
              textAlign="center"
              my={2}
            >
              {feature.title}
            </Box>
            <Box
              color="text.secondary"
              fontSize="h6.fontSize"
              textAlign="center"
            >
              {feature.subtitle}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomeFeatures;
