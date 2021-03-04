import React from "react";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@material-ui/core";
import { Category } from "../../../../api/category";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import useSideBarStyles from "./side-bar-styles";
import { LogOutIcon } from "../../../../assets";
const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

interface SideBarProps {
  categories: Category[];
  sideBarState: {
    openSideBar: boolean;
    setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

const SideBar: React.FC<SideBarProps> = ({
  categories,
  sideBarState: { openSideBar, setOpenSideBar },
}: SideBarProps) => {
  const classes = useSideBarStyles();

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setOpenSideBar(open);
  };

  return (
    <SwipeableDrawer
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      open={openSideBar}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <Box position="relative" width="320px">
        <Box position="absolute" top={0} right={0} left={0}>
          <List component="nav">
            <ListItem className={classes.listItem} button>
              <ListItemIcon>
                <ChevronLeft className={classes.listItemIcon} />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="SHOP"
              />
            </ListItem>
            <Divider className={classes.divider} />
            <ListItem className={classes.listItem} button>
              <ListItemText
                inset
                classes={{ primary: classes.listItemText }}
                primary="CATEGORIES"
              />
              <ChevronRight />
            </ListItem>
            <ListItem className={classes.listItem} button>
              <ListItemText
                inset
                classes={{ primary: classes.listItemText }}
                primary="BRANDS"
              />
              <ChevronRight />
            </ListItem>
            <Divider className={classes.divider} />
            <ListItem className={classes.logOutItem} button>
              <ListItemIcon>
                <LogOutIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.logoutText }}
                primary="Log Out"
              />
            </ListItem>
          </List>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
};

export default SideBar;
