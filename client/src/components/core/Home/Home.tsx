import React, { useEffect, useState } from "react";
import { Box, createStyles, makeStyles } from "@material-ui/core";
import HomeCarousel from "./HomeCarousel";
import homeCarouselFeatures from "./home-carousel-features";
import homeFeatures from "./home-features";
import HomeFeatures from "./HomeFeatures";
import ReviewCarousel from "./ReviewCarousel";
import carouselReviews from "./carousel-reviews";
import HomeLinks from "./HomeLinks";
import homeLinks from "./home-links";
import { ProductSlider } from "../../common";
import { getProducts, Product } from "../../../api/product";

const useHomeStyles = makeStyles((theme) => createStyles({}));

const Home: React.FC = () => {
  const [productsBySell, setProductsBySell] = useState<Product[]>([]);
  const [productsByArrival, setProductsByArrival] = useState<Product[]>([]);

  const loadProductsBySell = () => {
    getProducts("sold")
      .then((response) => {
        setProductsBySell(response.data);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt")
      .then((response) => {
        setProductsByArrival(response.data);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  useEffect(() => {
    loadProductsBySell();
    loadProductsByArrival();
  }, []);

  return (
    <>
      <HomeCarousel features={homeCarouselFeatures} />
      <HomeFeatures features={homeFeatures} />
      <ReviewCarousel reviews={carouselReviews} />
      <HomeLinks links={homeLinks} />
      <Box mb="200px">
        <ProductSlider title="Trending Products" products={productsBySell} />
      </Box>
      <Box mb="300px">
        <ProductSlider title="Newest Products" products={productsByArrival} />
      </Box>
    </>
  );
};

export default Home;
