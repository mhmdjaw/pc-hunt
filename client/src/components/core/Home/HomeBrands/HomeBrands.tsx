import {
  Box,
  Container,
  Grid,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { HomeBrand } from "../home-brands";
import useHomeBrandsStyles from "./home-brands-styles";

interface HomeBrandsProps {
  brands: HomeBrand[];
}

const HomeBrands: React.FC<HomeBrandsProps> = ({ brands }: HomeBrandsProps) => {
  const classes = useHomeBrandsStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Container maxWidth="lg">
      <Box fontSize="h3.fontSize" fontWeight={700} textAlign="center" mb="50px">
        From Top Brands
      </Box>
      <Grid
        container
        spacing={4}
        justify={isMobile ? "center" : "space-around"}
        alignItems="center"
      >
        {brands.map((brand, i) => (
          <Grid key={i} item xs={4} sm={2}>
            <Link className={classes.link} to={`/brand/${brand.slug}`}>
              <brand.svg width="100%" />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomeBrands;
