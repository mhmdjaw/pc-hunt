import {
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";
import reviews from "./reviews";
import useTestimonialsStyles from "./testimonials-styles";

const Testimonials: React.FC = () => {
  const classes = useTestimonialsStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Container maxWidth="lg">
      <div className={classes.root}>
        <Typography className={classes.heading} variant="h4">
          Reviews and Testimonials
        </Typography>
        <Grid container spacing={isMobile ? 2 : 3}>
          {[1, 2, 3].map(() =>
            reviews.map((review, i) => (
              <Grid key={i} item xs={12} sm={6} md={4}>
                <Card className={classes.card} elevation={3}>
                  <CardContent>
                    <Rating className={classes.rating} value={5} readOnly />
                    <Typography className={classes.content}>
                      {review.body}
                    </Typography>
                    <Typography>
                      {review.name}, {review.date}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </div>
    </Container>
  );
};

export default Testimonials;
