import { Box, Grid, Link } from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { LogoSecondary } from "../../../assets";
import { CustomIconButton } from "../../common";
import useFooterStyles from "./footer-styles";
import footerLinks from "./footer-links";
import footerSocials from "./footer-socials";

const Footer: React.FC = () => {
  const classes = useFooterStyles();

  return (
    <footer>
      <Box
        bgcolor="primary.main"
        color="primary.contrastText"
        textAlign="center"
        p="90px 15%"
      >
        <LogoSecondary width="200px" fill="#fff" />
        <Box m="40px">
          <Grid container justify="center" spacing={5}>
            {footerLinks.map((link, i) => (
              <Grid key={i} item>
                <Link
                  component={RouterLink}
                  to={link.to}
                  className={classes.link}
                  variant="body2"
                  color="inherit"
                  underline="none"
                >
                  {link.text}
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
        {footerSocials.map((social, i) => (
          <CustomIconButton
            key={i}
            href={social.href}
            target="_blank"
            className={classes.iconButton}
            color="inherit"
          >
            <social.icon />
          </CustomIconButton>
        ))}
        <Box mt="50px" fontWeight={500} color="grey.300">
          © 2021 PC hunt
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
