interface MenuItem {
  itemTitle: string;
  itemURL: string;
}

const menuItems: MenuItem[] = [
  {
    itemTitle: "HOME",
    itemURL: "/",
  },
  {
    itemTitle: "LOG IN",
    itemURL: "/login",
  },
  {
    itemTitle: "SIGN UP",
    itemURL: "/signup",
  },
];

export default menuItems;
