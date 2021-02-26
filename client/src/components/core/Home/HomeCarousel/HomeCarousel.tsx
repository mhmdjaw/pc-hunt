import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { ContainedButton, Carousel } from "../../../common";
import "../../../../slick-carousel/slick.css";
import "../../../../slick-carousel/slick-theme.css";
import { motion, useAnimation } from "framer-motion";
import useHomeCarouselStyles from "./home-carousel-styles";
import carouselAnimationVariants from "./carousel-animation-variants";
import { HomeCarouselFeature } from "../home-carousel-features";

interface HomeCarouselProps {
  features: HomeCarouselFeature[];
}

const HomeCarousel: React.FC<HomeCarouselProps> = React.memo(
  ({ features }: HomeCarouselProps) => {
    const classes = useHomeCarouselStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const MotionBox = motion.custom(Box);
    const {
      topHeadlineVariants,
      bottomHeadlineVariants,
    } = carouselAnimationVariants;

    const [variant, setVariant] = useState("hidden");
    useEffect(() => {
      setVariant("visible");
    }, []);

    return (
      <Carousel>
        <Box p="90px 12%">
          <Box height="376px" p="3%">
            <Grid
              className={classes.slide}
              container
              direction="column"
              justify="space-between"
              alignItems="center"
            >
              <Grid
                component={Box}
                item
                alignSelf={isMobile ? "center" : "flex-start"}
              >
                <Typography variant="h1">
                  <MotionBox
                    fontWeight={700}
                    textAlign={isMobile ? "center" : "left"}
                    initial="hidden"
                    animate={variant}
                    variants={topHeadlineVariants}
                  >
                    Keep your distance
                  </MotionBox>
                  {/* <Box
                  className={classes.topHeadline}
                  fontWeight={700}
                  textAlign={isMobile ? "center" : "left"}
                >
                  Keep your distance
                </Box> */}
                </Typography>
              </Grid>
              <Grid
                component={Box}
                item
                alignSelf={isMobile ? "center" : "flex-end"}
              >
                <Typography variant="h1">
                  <MotionBox
                    fontWeight={700}
                    textAlign={isMobile ? "center" : "left"}
                    initial="hidden"
                    animate={variant}
                    variants={bottomHeadlineVariants}
                  >
                    Shop safely
                  </MotionBox>
                  {/* <Box fontWeight={700} textAlign={isMobile ? "center" : "left"}>
                  Shop safely
                </Box> */}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {features.map((feature, i) => (
          <Box key={i} p="90px 12%">
            <Box height="376px">
              <Grid
                className={classes.slide}
                container
                justify="space-between"
                alignItems="center"
                direction={isMobile ? "column-reverse" : "row"}
              >
                <Grid
                  component={Box}
                  item
                  sm={5}
                  textAlign={isMobile ? "center" : "left"}
                >
                  <Box
                    mb={3}
                    fontSize={isMobile ? "h4.fontSize" : "h2.fontSize"}
                    fontWeight={700}
                  >
                    {feature.headline}
                  </Box>
                  <ContainedButton color="secondary">
                    {feature.buttonText}
                  </ContainedButton>
                </Grid>
                <Grid
                  component={Box}
                  item
                  sm={6}
                  height={isMobile ? "55%" : "100%"}
                >
                  <img className={classes.image} src={feature.image} />
                </Grid>
              </Grid>
            </Box>
          </Box>
        ))}
      </Carousel>
    );
  }
);

HomeCarousel.displayName = "HomeCarousel";

export default HomeCarousel;
