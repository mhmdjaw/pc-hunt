import { Box, Grid, Link } from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { LogoSecondary } from "../../../assets";
import { CustomIconButton } from "../../common";
import { Facebook, Twitter, Instagram, GitHub } from "@material-ui/icons";
import useFooterStyles from "./footer-styles";

const Footer: React.FC = () => {
  const classes = useFooterStyles();

  return (
    <Box
      bgcolor="primary.main"
      color="primary.contrastText"
      textAlign="center"
      p="90px 15%"
    >
      <LogoSecondary width="200px" fill="#fff" />
      <Box m="40px">
        <Grid container justify="center" spacing={5}>
          <Grid item>
            <Link
              component={RouterLink}
              to="#"
              className={classes.link}
              variant="body2"
              color="inherit"
              underline="none"
            >
              privacy policy
            </Link>
          </Grid>
          <Grid item>
            <Link
              component={RouterLink}
              to="#"
              className={classes.link}
              variant="body2"
              color="inherit"
              underline="none"
            >
              terms and conditions
            </Link>
          </Grid>
          <Grid item>
            <Link
              component={RouterLink}
              to="#"
              className={classes.link}
              variant="body2"
              color="inherit"
              underline="none"
            >
              blog
            </Link>
          </Grid>
          <Grid item>
            <Link
              component={RouterLink}
              to="#"
              className={classes.link}
              variant="body2"
              color="inherit"
              underline="none"
            >
              contact us
            </Link>
          </Grid>
          <Grid item>
            <Link
              component={RouterLink}
              to="#"
              className={classes.link}
              variant="body2"
              color="inherit"
              underline="none"
            >
              about us
            </Link>
          </Grid>
        </Grid>
      </Box>
      <CustomIconButton className={classes.iconButton} color="inherit">
        <Facebook />
      </CustomIconButton>
      <CustomIconButton className={classes.iconButton} color="inherit">
        <Twitter />
      </CustomIconButton>
      <CustomIconButton className={classes.iconButton} color="inherit">
        <Instagram />
      </CustomIconButton>
      <CustomIconButton className={classes.iconButton} color="inherit">
        <GitHub />
      </CustomIconButton>
      <Box mt="50px" fontWeight={500} color="grey.300">
        © 2021 PC hunt
      </Box>
    </Box>
  );
};

export default Footer;
