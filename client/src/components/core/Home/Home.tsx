import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
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

const Home: React.FC = () => {
  const [productsBySell, setProductsBySell] = useState<Product[]>([]);
  const [productsByArrival, setProductsByArrival] = useState<Product[]>([]);

  const loadProductsBySell = () => {
    getProducts({ sortBy: "sold", limit: 10 })
      .then((response) => {
        setProductsBySell(response.data);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  const loadProductsByArrival = () => {
    getProducts({ sortBy: "createdAt", limit: 10 })
      .then((response) => {
        setProductsByArrival(response.data);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      loadProductsBySell();
      loadProductsByArrival();
    }, 1500);
  }, []);

  return (
    <>
      <HomeCarousel features={homeCarouselFeatures} />
      <HomeFeatures features={homeFeatures} />
      <ReviewCarousel reviews={carouselReviews} />
      <HomeLinks links={homeLinks} />
      {
        // productsBySell.length !== 0 &&
        <Box mb="200px">
          <ProductSlider title="Trending Products" products={productsBySell} />
        </Box>
      }
      {
        // productsByArrival.length !== 0 &&
        <Box mb="300px">
          <ProductSlider title="Newest Products" products={productsByArrival} />
        </Box>
      }
    </>
  );
};

export default Home;
