import { Box, List, ListItem, ListItemText, Paper } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Category, getCategories } from "../../../../api/category";
import { useFacets } from "../../../../context";
import { NavLink } from "../../../common";
import useNavDropDownMenusStyles from "./nav-drop-down-menus-styes";

const NavDropDownMenus: React.FC = () => {
  const classes = useNavDropDownMenusStyles();

  const { categories } = useFacets();

  const numberOfMenus = categories.filter(
    (category) => category.parent.slug === "root"
  ).length;

  const [open, setOpen] = useState<boolean[]>(
    new Array(numberOfMenus).fill(false)
  );
  // const [categories, setCategories] = useState<Category[]>([]);

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

  // useEffect(() => {
  //   getCategories()
  //     .then((response) => {
  //       const numberOfMenus = response.data.filter(
  //         (category) => category.parent.slug === "root"
  //       ).length;
  //       setCategories(response.data);
  //       setOpen(new Array(numberOfMenus).fill(false));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

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
