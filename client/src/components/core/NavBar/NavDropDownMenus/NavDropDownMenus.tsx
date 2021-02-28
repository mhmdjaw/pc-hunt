import { Box, List, ListItem, ListItemText, Paper } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import clsx from "clsx";
import React, { useState } from "react";
import { Category } from "../../../../api/category";
import { useFacets } from "../../../../context";
import { NavLink } from "../../../common";
import useNavDropDownMenusStyles from "./nav-drop-down-menus-styes";

const getNumberOfMenus = (categories: Category[]) =>
  categories.filter((category) => category.parent.slug === "root").length;

const NavDropDownMenus: React.FC = () => {
  const classes = useNavDropDownMenusStyles();

  const { categories } = useFacets();

  //array of menu toggle state
  const [open, setOpen] = useState<boolean[]>(
    new Array(getNumberOfMenus(categories)).fill(false)
  );

  const openMenu = (i: number) => {
    open[i] = true;
    setOpen([...open]);
  };

  const closeMenu = (i: number) => {
    open[i] = false;
    setOpen([...open]);
  };

  const handleMenuItemClick = (slug: string, i: number) => {
    closeMenu(i);
    // navigate to category results using slug
  };

  return (
    <>
      {categories
        .filter((category) => category.parent.slug === "root")
        .map((parentCategory, i) => (
          <Box
            key={i}
            className={clsx(classes.categoryMenuContainer, {
              [classes.dropDownMenuHover]: open[i],
            })}
            position="relative"
            ml="4%"
            onMouseEnter={() => openMenu(i)}
            onMouseLeave={() => closeMenu(i)}
          >
            <NavLink to="#" className="category-menu" color="inherit">
              {parentCategory.name}
              <ExpandMore className={classes.expandMore} />
            </NavLink>

            <Paper className={classes.dropDownMenu}>
              <List>
                {categories
                  .filter(
                    (category) => category.parent.slug === parentCategory.slug
                  )
                  .map((category, j) => (
                    <ListItem
                      key={j}
                      className={classes.dropDownItem}
                      button
                      onClick={() => handleMenuItemClick(category.slug, i)}
                    >
                      <ListItemText primary={category.name} />
                    </ListItem>
                  ))}
              </List>
            </Paper>
          </Box>
        ))}
    </>
  );
};

export default NavDropDownMenus;
