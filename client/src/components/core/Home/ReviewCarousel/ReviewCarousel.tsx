import { Box, createStyles, makeStyles } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";
import Carousel from "../../../common/Carousel";

interface ReviewCarouselProps {
  // reviews: CarouselReview[];
  hello: string;
}

const useReviewCarouselStyles = makeStyles((theme) =>
  createStyles({
    rating: {
      color: theme.palette.secondary.main,
      marginBottom: "30px",
    },
  })
);

const ReviewCarousel: React.FC<ReviewCarouselProps> = () =>
  // {reviews}: ReviewCarouselProps
  {
    const classes = useReviewCarouselStyles();

    return (
      <Carousel>
        <Box
          p="90px 15%"
          textAlign="center"
          whiteSpace="pre-wrap"
          fontSize="h6.fontSize"
        >
          <Rating className={classes.rating} size="large" value={5} readOnly />
          <Box fontStyle="italic" mb={6}>
            PChunt has the cheapest and best quality components, they are always
            up to date on newest products, and the first to bring them. I will
            continue to buy from them everytime I need parts or a new system.
          </Box>

          <Box fontSize="body1.fontSize">Someone, 03/10/2020</Box>
        </Box>

        <Box
          p="90px 15%"
          textAlign="center"
          whiteSpace="pre-wrap"
          fontSize="h6.fontSize"
        >
          <Rating className={classes.rating} size="large" value={5} readOnly />
          <Box fontStyle="italic" mb={6}>
            Thank you for your excellent services, quick response, and accuracy.
            You guys really set the bar high for professionalism.
          </Box>

          <Box fontSize="body1.fontSize">Someone, 03/10/2020</Box>
        </Box>

        <Box
          p="90px 15%"
          textAlign="center"
          whiteSpace="pre-wrap"
          fontSize="h6.fontSize"
        >
          <Rating className={classes.rating} size="large" value={5} readOnly />
          <Box fontStyle="italic" mb={6}>
            The work is absolutely magnificent. I&apos;m more than happy with
            every single piece I bought from you. Your service is excellent and
            I had a very nice first experience. Looking forward to buy more
            items.
          </Box>

          <Box fontSize="body1.fontSize">Someone, 03/10/2020</Box>
        </Box>
      </Carousel>
    );
  };

export default ReviewCarousel;
