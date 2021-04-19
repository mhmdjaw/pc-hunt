import { Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";
import { Review as IReview } from "../../../../api/review";
import { displayDate } from "../../../../helpers";
import useReviewStyles from "./review-styles";

interface ReviewProps {
  review: IReview;
}

const Review: React.FC<ReviewProps> = ({ review }: ReviewProps) => {
  const classes = useReviewStyles();

  return (
    <>
      <Typography className={classes.nickName}>{review.nickname}</Typography>
      <Rating
        className={classes.customerRating}
        value={review.rating}
        size="small"
        precision={0.5}
        readOnly
      />
      <Typography className={classes.date} variant="body2">
        {displayDate(review.updatedAt)}
        {review.verified && (
          <b>
            {" "}
            | <i className={classes.verified}>Verified Purchase</i>
          </b>
        )}
      </Typography>
      <Typography className={classes.customerDescription}>
        {review.description}
      </Typography>
    </>
  );
};

export default Review;
