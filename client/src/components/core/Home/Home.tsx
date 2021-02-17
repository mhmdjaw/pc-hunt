import React from "react";
import { Box, createStyles, makeStyles } from "@material-ui/core";
import HomeCarousel from "./HomeCarousel";
import homeCarouselFeatures from "./home-carousel-features";
import homeFeatures from "./home-features";
import HomeFeatures from "./HomeFeatures";
import ReviewCarousel from "./ReviewCarousel";
import carouselReviews from "./carousel-reviews";
import HomeLinks from "./HomeLinks";
import homeLinks from "./home-links";
import ProductSlider from "../../common/ProductSlider";
import trendingProducts from "./trending-products";

const useHomeStyles = makeStyles((theme) => createStyles({}));

const Home: React.FC = () => {
  return (
    <>
      <HomeCarousel features={homeCarouselFeatures} />
      <HomeFeatures features={homeFeatures} />
      <ReviewCarousel reviews={carouselReviews} />
      <HomeLinks links={homeLinks} />
      <Box mb="376px">
        <ProductSlider
          title="Trending Products"
          products={trendingProducts || undefined}
        />
      </Box>
    </>
  );
};

export default Home;
