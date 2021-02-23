import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import menuItems from "./menu-items";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Box,
  Button,
  Collapse,
  Link,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Typography,
  useScrollTrigger,
  useTheme,
} from "@material-ui/core";
import { useHistory, useLocation, Link as RouterLink } from "react-router-dom";
import { logout } from "../../../auth";
//import { v4 as uuidv4 } from "uuid";
import useNavBarStyles from "./nav-bar-styles";
import clsx from "clsx";
import { useAuth } from "../../../context";
import { ExpandMore } from "@material-ui/icons";

interface HideOnScrollProps {
  children: React.ReactElement;
}

interface ElevationScrollProps {
  children: React.ReactElement;
  isHomePage: boolean;
}

const HideOnScroll: React.FC<HideOnScrollProps> = ({
  children,
}: HideOnScrollProps) => {
  const trigger = useScrollTrigger();

  return (
    <Collapse appear={false} unmountOnExit in={!trigger}>
      {children}
    </Collapse>
  );
};

const ElevationScroll: React.FC<ElevationScrollProps> = ({
  children,
  isHomePage,
}: ElevationScrollProps) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: isHomePage && !trigger ? 0 : 4,
  });
};

const NavBar: React.FC = () => {
  const classes = useNavBarStyles();
  const theme = useTheme();
  const history = useHistory();
  const { pathname } = useLocation();
  const { logout, user } = useAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (algorithmURL: string) => {
    if (algorithmURL === pathname) {
      handleClose();
    } else {
      history.push(algorithmURL);
    }
    handleClose();
  };

  return (
    <>
      <ElevationScroll isHomePage={pathname === "/" ? true : false}>
        <AppBar>
          <HideOnScroll>
            <Box className={classes.topBar}>
              <Typography className={classes.topBarText} variant="subtitle2">
                hunt down the pc of your dream!
              </Typography>
              <Link
                className={classes.topBarLink}
                underline="none"
                component={RouterLink}
                to="#"
              >
                Contact Us
              </Link>
            </Box>
          </HideOnScroll>
          <Toolbar className={classes.toolbar}>
            {/* {menuItems.map((menuItem, i) => {
            const { itemTitle, itemURL } = menuItem;
            return (
              <Link
                key={i}
                className={clsx(classes.menuItem, {
                  [classes.active]: itemURL === pathname,
                })}
                component={RouterLink}
                to={itemURL}
                underline="none"
                color="inherit"
              >
                {itemTitle}
              </Link>
            );
          })} */}
            <Link
              className={classes.link}
              component={RouterLink}
              to="/"
              underline="none"
              color={"/" === pathname ? "secondary" : "inherit"}
            >
              Home
            </Link>
            {!user && (
              <Link
                className={classes.link}
                component={RouterLink}
                to="/login"
                underline="none"
                color={"/login" === pathname ? "secondary" : "inherit"}
              >
                Log In
              </Link>
            )}
            {!user && (
              <Link
                className={classes.link}
                component={RouterLink}
                to="/signup"
                underline="none"
                color={"/signup" === pathname ? "secondary" : "inherit"}
              >
                Sign Up
              </Link>
            )}
            {user && (
              <Link
                className={classes.link}
                component={RouterLink}
                to="/account"
                underline="none"
                color={"/account" === pathname ? "secondary" : "inherit"}
              >
                Account
              </Link>
            )}
            {user && (
              <Link
                component={RouterLink}
                to="#"
                className={classes.link}
                underline="none"
                color="inherit"
                onClick={() => logout()}
              >
                Log Out
              </Link>
            )}
            <div className={classes.grow}></div>
          </Toolbar>
          <Box
            className={classes.categoryBar}
            bgcolor="primary.main"
            color="primary.contrastText"
          >
            <Box
              className={classes.categoryMenuContainer}
              position="relative"
              ml="4%"
            >
              <Link
                component={RouterLink}
                to="#"
                className={clsx(classes.link, "category-menu")}
                underline="none"
                color="inherit"
              >
                Components
                <ExpandMore className={classes.expandMore} />
              </Link>

              <Paper className={classes.dropDownMenu}>
                <List>
                  <ListItem button>
                    <ListItemText primary="Motherboards" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Memory" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Video Cards" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="CPUs" />
                  </ListItem>
                </List>
              </Paper>
            </Box>
          </Box>
        </AppBar>
      </ElevationScroll>
      <Toolbar className={classes.toolbar} />
      <Box height="48px" />
      <Box
        height="32px"
        bgcolor={pathname === "/" ? "primary.main" : "transparent"}
      />
    </>
  );
};

export default NavBar;
