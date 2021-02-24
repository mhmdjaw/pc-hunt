import React from "react";
import { Link, LinkProps } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import useNavLinkStyles from "./nav-link-styles";
import clsx from "clsx";

interface NavLinkProps extends LinkProps {
  to: string;
}

const NavLink: React.FC<NavLinkProps> = ({
  to,
  children,
  className,
  ...otherProps
}: NavLinkProps) => {
  const classes = useNavLinkStyles();

  return (
    <Link
      {...otherProps}
      component={RouterLink}
      to={to}
      className={clsx(classes.link, className)}
      underline="none"
    >
      {children}
    </Link>
  );
};

export default NavLink;
