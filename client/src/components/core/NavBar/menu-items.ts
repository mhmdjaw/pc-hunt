interface MenuItem {
  itemTitle: string;
  itemURL: string;
}

const menuItems: MenuItem[] = [
  {
    itemTitle: "Home",
    itemURL: "/",
  },
  {
    itemTitle: "Log in",
    itemURL: "/login",
  },
  {
    itemTitle: "Sign up",
    itemURL: "/signup",
  },
];

export default menuItems;
