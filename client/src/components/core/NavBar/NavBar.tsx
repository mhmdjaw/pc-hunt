import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import menuItems from "./menu-items";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Button, Link, Menu, MenuItem } from "@material-ui/core";
import { useHistory, useLocation, Link as RouterLink } from "react-router-dom";
import { logout } from "../../../auth";
//import { v4 as uuidv4 } from "uuid";
import useNavBarStyles from "./nav-bar-styles";
import clsx from "clsx";
import { useAuth } from "../../../context";

const NavBar: React.FC = () => {
  const classes = useNavBarStyles();
  const history = useHistory();
  const { pathname } = useLocation();
  const { logout, user } = useAuth();
  console.log(pathname);

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
      <AppBar color="inherit">
        <Toolbar>
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
            color={"/" === pathname ? "primary" : "inherit"}
          >
            HOME
          </Link>
          {!user && (
            <Link
              className={classes.menuItem}
              component={RouterLink}
              to="/login"
              underline="none"
              color={"/login" === pathname ? "primary" : "inherit"}
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
              color={"/signup" === pathname ? "primary" : "inherit"}
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
              color={"/account" === pathname ? "primary" : "inherit"}
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
      </AppBar>

      <Toolbar />
    </>
  );
};

export default NavBar;
