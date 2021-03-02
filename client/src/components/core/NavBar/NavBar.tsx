import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {
  Badge,
  Box,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from "@material-ui/core";
import { useHistory, useLocation, Link as RouterLink } from "react-router-dom";
import useNavBarStyles from "./nav-bar-styles";
import clsx from "clsx";
import { useAuth } from "../../../context";
import {
  BuildOutlined,
  PersonOutlineOutlined,
  ShoppingCartOutlined,
  Menu,
} from "@material-ui/icons";
import TopBar from "./TopBar";
import { NavLink } from "../../common";
import NavDropDownMenus from "./NavDropDownMenus";
import SearchAppBar from "./SearchAppBar";
import { LogInIcon, LogoSecondary, LogOutIcon } from "../../../assets";
import Hamburger from "hamburger-react";

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
  const isLaptop = useMediaQuery(theme.breakpoints.up(1102));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <ElevationScroll isHomePage={pathname === "/" ? true : false}>
        <AppBar>
          <TopBar />
          <Toolbar className={classes.toolbar}>
            <LogoSecondary
              tabIndex={0}
              className={classes.logo}
              fill={"/" === pathname ? theme.palette.secondary.main : "#fff"}
              onClick={() => history.push("/")}
            />
            <Box flexGrow={1} textAlign="center" p="0 2%">
              {!isMobile && (
                <Box
                  width={isLaptop ? "364px" : "240px"}
                  display="inline-block"
                  textAlign="end"
                >
                  <SearchAppBar />
                </Box>
              )}
            </Box>
            {user && !isMobile && (
              <NavLink
                className={classes.link}
                component={RouterLink}
                to="#"
                color="inherit"
                onClick={() => logout()}
              >
                <LogOutIcon className={classes.navLinkIcon} />
                {!isMobile && "Log Out"}
              </NavLink>
            )}
            {!user && (
              <NavLink
                className={classes.link}
                component={RouterLink}
                to="/login"
                color="inherit"
              >
                <LogInIcon className={classes.navLinkIcon} />
                {!isMobile && "Log In"}
              </NavLink>
            )}
            {user && (
              <NavLink
                className={classes.link}
                component={RouterLink}
                to="/account"
                color={"/account" === pathname ? "secondary" : "inherit"}
              >
                <PersonOutlineOutlined
                  className={clsx(classes.navLinkIcon, "account")}
                />
                {!isMobile && "Account"}
              </NavLink>
            )}
            <NavLink
              className={classes.link}
              component={RouterLink}
              to="#"
              color={"/pc-builder" === pathname ? "secondary" : "inherit"}
            >
              <BuildOutlined className={classes.navLinkIcon} />
              {!isMobile && "PC Builder"}
            </NavLink>
            <NavLink
              className={clsx(classes.link, "cart")}
              component={RouterLink}
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
              {!isMobile && "Cart"}
            </NavLink>
            {/* {isMobile && (
              <NavLink className={classes.link} color="inherit">
                <Menu className={classes.navLinkIcon} />
              </NavLink>
            )} */}
            {isMobile && (
              <NavLink className={classes.link} color="inherit">
                <Box width="35px" height="42px">
                  <Hamburger rounded size={22} distance="sm" />
                </Box>
              </NavLink>
            )}
          </Toolbar>
          <Box
            className={classes.categoryBar}
            bgcolor="primary.main"
            color="primary.contrastText"
          >
            {isMobile ? (
              <Box width="70vw">
                <SearchAppBar />
              </Box>
            ) : (
              <NavDropDownMenus />
            )}
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
