import React from "react";
import { Box, createStyles, makeStyles } from "@material-ui/core";
import HomeCarousel from "./HomeCarousel";
import homeCarouselFeatures from "./home-carousel-features";

const useHomeStyles = makeStyles((theme) => createStyles({}));

const Home: React.FC = () => {
  return (
    <>
      <HomeCarousel features={homeCarouselFeatures} />
      <Box height="350px"></Box>
    </>
  );
};

export default Home;
