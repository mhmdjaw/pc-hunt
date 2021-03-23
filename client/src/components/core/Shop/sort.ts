interface Sort {
  value: string;
  name: string;
}

const sort: Sort[] = [
  {
    value: "sold",
    name: "Best Selling",
  },
  {
    value: "createdAt",
    name: "Newest",
  },
  {
    value: "priceLowHigh",
    name: "Price Low-High",
  },
  {
    value: "priceHighLow",
    name: "Price High-Low",
  },
];

export default sort;
