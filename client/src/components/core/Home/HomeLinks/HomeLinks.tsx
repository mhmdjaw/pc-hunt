import { Box, Grid, Link } from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { HomeLink } from "../home-links";
import useHomeLinksStyles from "./home-links-styles";

interface HomeLinksProps {
  links: HomeLink[];
}

const HomeLinks: React.FC<HomeLinksProps> = ({ links }: HomeLinksProps) => {
  const classes = useHomeLinksStyles();

  return (
    <Box p="100px 12% 124px" fontSize="h4.fontSize">
      <Grid container justify="space-around">
        {links.map((link, i) => (
          <Grid key={i} className={classes.linkContainer} item xs={8} md={3}>
            <Link
              className={classes.link}
              component={RouterLink}
              to={link.to}
              underline="none"
            >
              {link.text}
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomeLinks;
