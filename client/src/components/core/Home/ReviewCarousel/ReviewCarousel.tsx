import { Box } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";
import { Carousel } from "../../../common";
import { CarouselReview } from "../carousel-reviews";
import useReviewCarouselStyles from "./review-carousel-styles";

interface ReviewCarouselProps {
  reviews: CarouselReview[];
}

const ReviewCarousel: React.FC<ReviewCarouselProps> = ({
  reviews,
}: ReviewCarouselProps) => {
  const classes = useReviewCarouselStyles();

  return (
    <Carousel>
      {reviews.map((review, i) => (
        <Box
          key={i}
          p="90px 15%"
          textAlign="center"
          whiteSpace="pre-wrap"
          fontSize="h6.fontSize"
        >
          <Rating className={classes.rating} size="large" value={5} readOnly />
          <Box fontStyle="italic" mb={6}>
            {review.body}
          </Box>
          <Box fontSize="body1.fontSize">
            {review.name}, {review.date}
          </Box>
        </Box>
      ))}
    </Carousel>
  );
};

export default ReviewCarousel;
