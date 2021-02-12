import { Box, Grid, Link, makeStyles } from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { HomeLink } from "../home-links";

interface HomeLinksProps {
  links: HomeLink[];
}

const useHomeLinksStyles = makeStyles({
  linkContainer: {
    margin: "24px 0",
    textAlign: "center",
  },
  link: {
    padding: "24px",
    fontWeight: 700,
    display: "inline-block",
    width: "100%",
    transition: "all .2s",
    "&:hover, &:focus-visible": {
      outline: "none",
      boxShadow: "0 0 0 3px",
      borderRadius: "9999px",
    },
  },
});

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
              to="#"
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
