import { Box, List, ListItem, ListItemText, Paper } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import clsx from "clsx";
import React, { useState } from "react";
import { Category } from "../../../../api/category";
import { NavLink } from "../../../common";
import { Link as RouterLink } from "react-router-dom";
import useNavDropDownMenusStyles from "./nav-drop-down-menus-styes";
import { Brand } from "../../../../api/brand";

interface NavDropDownMenusProps {
  facets: {
    categories: Category[];
    brands: Brand[];
  };
}

const getNumberOfMenus = (categories: Category[]) =>
  categories.filter((category) => category.parent.slug === "root").length;

const NavDropDownMenus: React.FC<NavDropDownMenusProps> = ({
  facets: { categories, brands },
}: NavDropDownMenusProps) => {
  const classes = useNavDropDownMenusStyles();

  //array of menu toggle state
  const [open, setOpen] = useState<boolean[]>(
    new Array(getNumberOfMenus(categories) + 1).fill(false)
  );

  const toggleMenu = (isOpen: boolean, i: number) => {
    open[i] = isOpen;
    setOpen([...open]);
  };

  const handleCategoryClick = (slug: string, i: number) => {
    toggleMenu(false, i);
    // navigate to category results using slug
    console.log(slug);
  };

  const handleBrandClick = (slug: string) => {
    toggleMenu(false, open.length - 1);
    if (slug === "brands") {
      // show all brands
      console.log("brands");
    } else {
      // navigate to brand results using slug
      console.log(slug);
    }
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
            onMouseEnter={() => toggleMenu(true, i)}
            onMouseLeave={() => toggleMenu(false, i)}
          >
            <NavLink
              component={RouterLink}
              to="#"
              className="category-menu"
              color="inherit"
              onClick={() => handleCategoryClick(parentCategory.slug, i)}
            >
              {parentCategory.name}
              <ExpandMore className={classes.expandMore} />
            </NavLink>

            <Paper className={classes.dropDownMenu}>
              <List>
                {categories
                  .filter(
                    (category) => category.parent.slug === parentCategory.slug
                  )
                  .map(
                    (category, j) =>
                      j < 9 && (
                        <ListItem
                          key={j}
                          className={classes.dropDownItem}
                          button
                          onClick={() =>
                            handleCategoryClick(
                              j < 8 ? category.slug : category.parent.slug,
                              i
                            )
                          }
                        >
                          <ListItemText
                            primary={j < 8 ? category.name : "More..."}
                          />
                        </ListItem>
                      )
                  )}
              </List>
            </Paper>
          </Box>
        ))}

      <Box
        className={clsx(classes.categoryMenuContainer, {
          [classes.dropDownMenuHover]: open[open.length - 1],
        })}
        onMouseEnter={() => toggleMenu(true, open.length - 1)}
        onMouseLeave={() => toggleMenu(false, open.length - 1)}
      >
        <NavLink
          component={RouterLink}
          to="#"
          className="category-menu"
          color="inherit"
          onClick={() => handleBrandClick("brands")}
        >
          Brands
          <ExpandMore className={classes.expandMore} />
        </NavLink>

        <Paper className={classes.dropDownMenu}>
          <List>
            {brands.map(
              (brand, i) =>
                i < 9 && (
                  <ListItem
                    key={i}
                    className={classes.dropDownItem}
                    button
                    onClick={() =>
                      handleBrandClick(i < 8 ? brand.slug : "brands")
                    }
                  >
                    <ListItemText primary={i < 8 ? brand.name : "More..."} />
                  </ListItem>
                )
            )}
          </List>
        </Paper>
      </Box>
    </>
  );
};

export default NavDropDownMenus;
