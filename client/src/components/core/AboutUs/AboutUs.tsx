import React from "react";
import { Container, Typography } from "@material-ui/core";
import useAboutUsStyles from "./about-us-styles";

const AboutUs: React.FC = () => {
  const classes = useAboutUsStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h4">
        About PC Hunt
      </Typography>
      <section className={classes.sectionWhite}>
        <Container maxWidth="lg">
          <Typography className={classes.sectionHeader} variant="h5">
            Our Mission
          </Typography>
          <Typography className={classes.sectionContent} variant="h6">
            To provide you with the highest quality computer hardware, best
            service at the best available price.
          </Typography>
        </Container>
      </section>
      <section className={classes.sectionPrimary}>
        <Container maxWidth="lg">
          <Typography className={classes.sectionHeader} variant="h5">
            Our Products
          </Typography>
          <Typography className={classes.sectionContent} variant="h6">
            We Only Sell Brands! We always make sure our products have the best
            quality through testing and supporting, and by selling top names,
            it&apos;s unlikely you&apos;ll face any issues with our products.
          </Typography>
        </Container>
      </section>
      <section className={classes.sectionWhite}>
        <Container maxWidth="lg">
          <Typography className={classes.sectionHeader} variant="h5">
            Our Vision
          </Typography>
          <Typography className={classes.sectionContent} variant="h6">
            To be a major provider of PC hardware in the tech world now that
            online shopping is becoming more popular than ever. We intend to
            provide our tech savvy people with the best possible online shopping
            experience.
          </Typography>
        </Container>
      </section>
    </div>
  );
};

export default AboutUs;
