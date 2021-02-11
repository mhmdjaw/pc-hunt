import React from "react";
import { createStyles, makeStyles } from "@material-ui/core";
import HomeCarousel from "./HomeCarousel";
import homeCarouselFeatures from "./home-carousel-features";
import homeFeatures from "./home-features";
import HomeFeatures from "./HomeFeatures";
import ReviewCarousel from "./ReviewCarousel/ReviewCarousel";

const useHomeStyles = makeStyles((theme) => createStyles({}));

const Home: React.FC = () => {
  const features = homeFeatures;

  return (
    <>
      <HomeCarousel features={homeCarouselFeatures} />
      <HomeFeatures features={features} />
      <ReviewCarousel hello="abbas" />
    </>
  );
};

export default Home;
