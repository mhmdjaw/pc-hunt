interface AccountFeaturesItems {
  svg: string;
  title: string;
  subtitle: string;
  url: string;
  role: 0 | 1;
}

const accountFeaturesItems: AccountFeaturesItems[] = [
  {
    svg: "OrdersIcon",
    title: "Your Orders",
    subtitle: "Track and buy things again",
    url: "/orders",
    role: 0,
  },
  {
    svg: "AccountEditIcon",
    title: "Account Information",
    subtitle: "Edit your personal information",
    url: "/account/update",
    role: 0,
  },
  {
    svg: "WishListIcon",
    title: "Wish List",
    subtitle: "Add items to your whish list",
    url: "/wishlist",
    role: 0,
  },
  {
    svg: "AddressIcon",
    title: "Your Address",
    subtitle: "Edit your shipping address",
    url: "/address",
    role: 0,
  },
  {
    svg: "PasswordResetIcon",
    title: "Reset Password",
    subtitle: "Reset your password",
    url: "/password",
    role: 0,
  },
  {
    svg: "CategoryIcon",
    title: "Create Category",
    subtitle: "Create a new category",
    url: "/category",
    role: 1,
  },
  {
    svg: "ProductIcon",
    title: "Create Product",
    subtitle: "Create a new Product",
    url: "/product",
    role: 1,
  },
];

export default accountFeaturesItems;
