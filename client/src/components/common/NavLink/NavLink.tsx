import React from "react";
import { Link, LinkProps } from "@material-ui/core";
import useNavLinkStyles from "./nav-link-styles";
import clsx from "clsx";

interface NavLinkProps extends LinkProps {
  component?: React.ElementType;
  to?: string;
}

const NavLink: React.FC<NavLinkProps> = ({
  children,
  className,
  ...otherProps
}: NavLinkProps) => {
  const classes = useNavLinkStyles();

  return (
    <Link
      {...otherProps}
      className={clsx(classes.link, className)}
      underline="none"
    >
      {children}
    </Link>
  );
};

export default NavLink;
