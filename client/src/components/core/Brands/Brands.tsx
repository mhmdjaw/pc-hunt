import React from "react";
import { Link, Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { useFacets } from "../../../context";
import useBrandsStyles from "./brands-styles";

const Brands: React.FC = () => {
  const classes = useBrandsStyles();
  const { brands } = useFacets();

  return (
    <div className={classes.content}>
      <div className={classes.listContainer}>
        {brands
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((brand, i) =>
            i === 0 || brand.name.charAt(0) !== brands[i - 1].name.charAt(0) ? (
              <>
                <Typography className={classes.alphabet} variant="h3">
                  {brand.name.charAt(0)}
                </Typography>
                <Link
                  className={classes.link}
                  variant="body1"
                  component={RouterLink}
                  to={`/brand/${brand.slug}`}
                >
                  {brand.name}
                </Link>
              </>
            ) : (
              <Link
                className={classes.link}
                variant="body1"
                component={RouterLink}
                to={`/brand/${brand.slug}`}
              >
                {brand.name}
              </Link>
            )
          )}
      </div>
    </div>
  );
};

export default Brands;
