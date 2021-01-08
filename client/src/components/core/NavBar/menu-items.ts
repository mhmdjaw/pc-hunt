interface menuItem {
  itemTitle: string;
  itemURL: string;
}

const menuItems: menuItem[] = [
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
