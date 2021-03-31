import React, { useMemo, useState } from "react";
import {
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
import { useAuth } from "../../../../context";
import { v4 as uuidv4 } from "uuid";
import clsx from "clsx";
import { Brand } from "../../../../api/brand";
import { useHistory } from "react-router";
const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

interface SideBarProps {
  facets: {
    categories: Category[];
    brands: Brand[];
  };
  sideBarState: {
    openSideBar: boolean;
    setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

interface SideBarItem {
  type: "category" | "brand";
  parent: string;
  name: string;
  slug: string;
  hasList: boolean;
}

interface SideBarPage {
  id: string;
  title: string;
  list: {
    type: "category" | "brand";
    name: string;
    slug: string;
    hasList: boolean;
  }[];
}

const SideBar: React.FC<SideBarProps> = ({
  facets: { categories, brands },
  sideBarState: { openSideBar, setOpenSideBar },
}: SideBarProps) => {
  const classes = useSideBarStyles();
  const history = useHistory();
  const { logout, user } = useAuth();
  const [sideBarPages, setSideBarPages] = useState<SideBarPage[]>([]);
  const [open, setOpen] = useState<boolean[]>([]);

  const sideBarItems: SideBarItem[] = useMemo(
    () => [
      ...categories.map(
        (category): SideBarItem => ({
          type: "category",
          name: category.name,
          slug: category.slug,
          hasList: category.parent.slug === "root" ? true : false,
          parent: category.parent.slug,
        })
      ),
      ...brands.map(
        (brand): SideBarItem => ({
          type: "brand",
          name: brand.name,
          slug: brand.slug,
          hasList: false,
          parent: "root",
        })
      ),
    ],
    [categories, brands]
  );

  const closeSideBar = () => {
    setTimeout(() => {
      setOpen([]);
      setSideBarPages([]);
    }, 500);
    setOpenSideBar(false);
  };

  const openPage = (type: "category" | "brand", name: string, slug: string) => {
    const newPage: SideBarPage = {
      id: uuidv4(),
      title: name,
      list: sideBarItems
        .filter((item) => item.parent === slug && item.type === type)
        .map((item) => ({
          type: item.type,
          name: item.name,
          slug: item.slug,
          hasList: item.hasList,
        })),
    };

    setOpen([...open, true]);
    setSideBarPages([...sideBarPages, newPage]);
  };

  const exitPage = (i: number) => {
    open[i] = false;
    setOpen([...open]);
    setTimeout(() => {
      open.splice(i, 1);
      sideBarPages.splice(i, 1);
      setOpen([...open]);
      setSideBarPages(sideBarPages);
    }, 500);
  };

  const handleListItemClick = (
    type: "category" | "brand",
    name: string,
    slug: string,
    hasList: boolean
  ) => {
    if (hasList) {
      openPage(type, name, slug);
    } else {
      history.push(`/${type}/${slug}`);
      closeSideBar();
    }
  };

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

    open ? setOpenSideBar(true) : closeSideBar();
  };

  return (
    <SwipeableDrawer
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      open={openSideBar}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <div className={classes.sideBarContainer}>
        <div
          className={clsx(classes.page, {
            [classes.subPageOpen]: sideBarPages.length > 0 && open[0],
          })}
        >
          <List component="nav">
            <ListItem
              className={classes.listItem}
              onClick={closeSideBar}
              button
            >
              <ListItemIcon>
                <ChevronLeft className={classes.listItemIcon} />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="shop"
              />
            </ListItem>
            <Divider className={classes.divider} />
            <ListItem
              className={classes.listItem}
              onClick={() =>
                handleListItemClick("category", "categories", "root", true)
              }
              button
            >
              <ListItemText
                inset
                classes={{ primary: classes.listItemText }}
                primary="categories"
              />
              <ChevronRight />
            </ListItem>
            <ListItem
              className={classes.listItem}
              onClick={() =>
                handleListItemClick("brand", "brands", "root", true)
              }
              button
            >
              <ListItemText
                inset
                classes={{ primary: classes.listItemText }}
                primary="brands"
              />
              <ChevronRight />
            </ListItem>
            {user && (
              <>
                <Divider className={classes.divider} />
                <ListItem
                  className={classes.logOutItem}
                  onClick={() => {
                    closeSideBar();
                    logout();
                  }}
                  button
                >
                  <ListItemIcon>
                    <LogOutIcon />
                  </ListItemIcon>
                  <ListItemText
                    classes={{ primary: classes.logoutText }}
                    primary="Log Out"
                  />
                </ListItem>
              </>
            )}
          </List>
        </div>

        {sideBarPages.map((page, i) => (
          <div
            key={page.id}
            className={clsx(classes.page, {
              [classes.pageExitActive]: !open[i],
              [classes.subPageOpen]: i < sideBarPages.length - 1 && open[i + 1],
            })}
          >
            <List>
              <ListItem
                className={classes.listItem}
                onClick={() => exitPage(i)}
                button
              >
                <ListItemIcon>
                  <ChevronLeft className={classes.listItemIcon} />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.listItemText }}
                  primary={page.title}
                />
              </ListItem>
              <Divider className={classes.divider} />
              {page.list.map((item, j) => (
                <ListItem
                  key={j}
                  className={classes.listItem}
                  onClick={() =>
                    handleListItemClick(
                      item.type,
                      item.name,
                      item.slug,
                      item.hasList
                    )
                  }
                  button
                >
                  <ListItemText inset primary={item.name} />
                  {item.hasList && <ChevronRight />}
                </ListItem>
              ))}
            </List>
          </div>
        ))}
      </div>
    </SwipeableDrawer>
  );
};

export default SideBar;
