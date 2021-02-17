import { Box, Grid, Link, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { LogoSecondary } from "../../../assets";
import CustomIconButton from "../../common/CustomIconButton";
import { Facebook, Twitter, Instagram, GitHub } from "@material-ui/icons";

const useStyles = makeStyles({
  link: {
    textTransform: "uppercase",
    fontWeight: 500,
    "&:hover": {
      opacity: 0.7,
    },
    "&:focus-visible": {
      outline: "3px solid #fff",
    },
  },
  iconButton: {
    margin: "0 1%",
  },
});

const Footer: React.FC = () => {
  const classes = useStyles();

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
      <Box
        mt="50px"
        fontWeight={500}
        // fontSize="body1.fontSize"
        color="grey.300"
      >
        © 2021 PC hunt
      </Box>
    </Box>
  );
};

export default Footer;
