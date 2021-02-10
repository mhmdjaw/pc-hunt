import React from "react";
import {
  Box,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import ContainedButton from "../../../common/ContainedButton";
import Slider, { Settings } from "react-slick";
import "../../../../slick-carousel/slick.css";
import "../../../../slick-carousel/slick-theme.css";
import { motion } from "framer-motion";
import clsx from "clsx";
import CustomIconButton from "../../../common/CustomIconButton";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import useHomeCarouselStyles from "./home-carousel-styles";
import carouselAnimationVariants from "./carousel-animation-variants";

interface ArrowProps {
  direction: "prevArrow" | "nextArrow";
  onClick?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
}

interface HomeCarouselProps {
  features: {
    headline: string;
    buttonText: string;
    // buttonLinkTo: string,
    image: string;
  }[];
}

const Arrow: React.FC<ArrowProps> = ({ direction, onClick }: ArrowProps) => {
  const classes = useHomeCarouselStyles();

  return (
    <Box color="#fff" className={clsx(classes.arrowContainer, direction)}>
      <CustomIconButton
        className={classes.arrow}
        color="inherit"
        onClick={onClick}
        size="small"
      >
        {direction === "prevArrow" ? (
          <ChevronLeft fontSize="large" />
        ) : (
          <ChevronRight fontSize="large" />
        )}
      </CustomIconButton>
    </Box>
  );
};

const HomeCarousel: React.FC<HomeCarouselProps> = ({
  features,
}: HomeCarouselProps) => {
  const classes = useHomeCarouselStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const MotionBox = motion.custom(Box);
  const {
    topHeadlineVariants,
    bottomHeadlineVariants,
  } = carouselAnimationVariants;

  const customPaging = (i: number) => {
    return (
      <a tabIndex={0} className={classes.dot} aria-label={`Page dot ${i}`} />
    );
  };

  const settings: Settings = {
    dots: true,
    swipeToSlide: false,
    dotsClass: clsx("slick-dots", classes.dotsContainer),
    customPaging: customPaging,
    arrows: isMobile ? false : true,
    prevArrow: <Arrow direction="prevArrow" />,
    nextArrow: <Arrow direction="nextArrow" />,
  };

  return (
    <Box bgcolor="primary.main" color="primary.contrastText">
      <Slider className={classes.slider} {...settings}>
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
                    animate="visible"
                    variants={topHeadlineVariants}
                  >
                    Keep your distance
                  </MotionBox>
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
                    animate="visible"
                    variants={bottomHeadlineVariants}
                  >
                    Shop safely
                  </MotionBox>
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
      </Slider>
    </Box>
  );
};

export default HomeCarousel;
