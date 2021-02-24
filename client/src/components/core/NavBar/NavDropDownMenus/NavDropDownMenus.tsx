import { Box, List, ListItem, ListItemText, Paper } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import React from "react";
import { NavLink } from "../../../common";
import useNavDropDownMenusStyles from "./nav-drop-down-menus-styes";

const NavDropDownMenus: React.FC = () => {
  const classes = useNavDropDownMenusStyles();

  return (
    <Box className={classes.categoryMenuContainer} position="relative" ml="4%">
      <NavLink to="#" className="category-menu" color="inherit">
        Components
        <ExpandMore className={classes.expandMore} />
      </NavLink>

      <Paper className={classes.dropDownMenu}>
        <List>
          <ListItem className={classes.dropDownItem} button>
            <ListItemText primary="Motherboards" />
          </ListItem>
          <ListItem className={classes.dropDownItem} button>
            <ListItemText primary="Memory" />
          </ListItem>
          <ListItem className={classes.dropDownItem} button>
            <ListItemText primary="Video Cards" />
          </ListItem>
          <ListItem className={classes.dropDownItem} button>
            <ListItemText primary="CPUs" />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
};

export default NavDropDownMenus;
