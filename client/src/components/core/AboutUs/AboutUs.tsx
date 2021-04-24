import React from "react";
import {
  Container,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useAboutUsStyles = makeStyles((theme) =>
  createStyles({
    root: {
      textAlign: "center",
      margin: "60px 0",
    },
    title: {
      fontWeight: 700,
      marginBottom: "32px",
    },
    sectionWhite: {
      padding: "60px 0 90px",
    },
    sectionPrimary: {
      padding: "60px 0 90px",
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    sectionHeader: {
      fontWeight: 700,
      marginBottom: "24px",
    },
    sectionContent: {
      fontWeight: 500,
    },
  })
);

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
