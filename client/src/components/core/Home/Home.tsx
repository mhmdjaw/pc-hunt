import React from "react";
import { createStyles, makeStyles } from "@material-ui/core";
import HomeCarousel from "./HomeCarousel";
import homeCarouselFeatures from "./home-carousel-features";
import homeFeatures from "./home-features";
import HomeFeatures from "./HomeFeatures";
import ReviewCarousel from "./ReviewCarousel";
import carouselReviews from "./carousel-reviews";
import HomeLinks from "./HomeLinks";
import homeLinks from "./home-links";

const useHomeStyles = makeStyles((theme) => createStyles({}));

const Home: React.FC = () => {
  return (
    <>
      <HomeCarousel features={homeCarouselFeatures} />
      <HomeFeatures features={homeFeatures} />
      <ReviewCarousel reviews={carouselReviews} />
      <HomeLinks links={homeLinks} />
    </>
  );
};

export default Home;
