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
  Menu,
  MenuItem,
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

interface HideOnScrollProps {
  children: React.ReactElement;
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
            className={classes.menuItem}
            component={RouterLink}
            to="/"
            underline="none"
            color={"/" === pathname ? "secondary" : "inherit"}
          >
            HOME
          </Link>
          {!user && (
            <Link
              className={classes.menuItem}
              component={RouterLink}
              to="/login"
              underline="none"
              color={"/login" === pathname ? "secondary" : "inherit"}
            >
              LOG IN
            </Link>
          )}
          {!user && (
            <Link
              className={classes.menuItem}
              component={RouterLink}
              to="/signup"
              underline="none"
              color={"/signup" === pathname ? "secondary" : "inherit"}
            >
              SIGN UP
            </Link>
          )}
          {user && (
            <Link
              className={classes.menuItem}
              component={RouterLink}
              to="/account"
              underline="none"
              color={"/account" === pathname ? "secondary" : "inherit"}
            >
              ACCOUNT
            </Link>
          )}
          {user && (
            <Link
              component={RouterLink}
              to="#"
              className={classes.menuItem}
              underline="none"
              color="inherit"
              // onClick={() => logout(() => history.push("/login"))}
              onClick={() => logout(() => history.push("/login"))}
            >
              LOG OUT
            </Link>
          )}
          <div className={classes.grow}></div>
        </Toolbar>
        <Box className={classes.categoryBar} />
      </AppBar>

      <Box height="72px" />
      <Toolbar className={classes.toolbar} />
    </>
  );
};

export default NavBar;
