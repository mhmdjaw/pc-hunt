import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import menuItems from "./menu-items";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Badge,
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
import {
  BuildOutlined,
  ExpandMore,
  PersonOutlineOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import TopBar from "./TopBar";
import { NavLink } from "../../common";
import NavDropDownMenus from "./NavDropDownMenus";
import SearchAppBar from "./SearchAppBar";
import { LogInIcon, LogoSecondary, LogOutIcon } from "../../../assets";

interface ElevationScrollProps {
  children: React.ReactElement;
  isHomePage: boolean;
}

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
          <TopBar />
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
            <LogoSecondary
              tabIndex={0}
              className={classes.logo}
              fill={"/" === pathname ? theme.palette.secondary.main : "#fff"}
              onClick={() => history.push("/")}
            />
            <Box flexGrow={1} textAlign="center" p="0 2%">
              <Box width="364px" display="inline-block" textAlign="end">
                <SearchAppBar />
              </Box>
            </Box>
            {user && (
              <NavLink
                className={classes.link}
                to="#"
                color="inherit"
                onClick={() => logout()}
              >
                <LogOutIcon className={classes.navLinkIcon} />
                Log Out
              </NavLink>
            )}
            {!user && (
              <NavLink
                className={classes.link}
                to="/login"
                color={"/login" === pathname ? "secondary" : "inherit"}
              >
                <LogInIcon className={classes.navLinkIcon} />
                Log In
              </NavLink>
            )}
            {user && (
              <NavLink
                className={classes.link}
                to="/account"
                color={"/account" === pathname ? "secondary" : "inherit"}
              >
                <PersonOutlineOutlined
                  className={clsx(classes.navLinkIcon, "account")}
                />
                Account
              </NavLink>
            )}
            <NavLink
              className={classes.link}
              to="#"
              color={"/pc-builder" === pathname ? "secondary" : "inherit"}
            >
              <BuildOutlined className={classes.navLinkIcon} />
              PC Builder
            </NavLink>
            <NavLink
              className={clsx(classes.link, "cart")}
              to="#"
              color={"/cart" === pathname ? "secondary" : "inherit"}
            >
              <Box
                className={clsx(classes.navLinkIcon, "cart")}
                display="inline"
              >
                <Badge badgeContent={4} color="secondary">
                  <ShoppingCartOutlined />
                </Badge>
              </Box>
              Cart
            </NavLink>
          </Toolbar>
          <Box
            className={classes.categoryBar}
            bgcolor="primary.main"
            color="primary.contrastText"
          >
            <NavDropDownMenus />
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
