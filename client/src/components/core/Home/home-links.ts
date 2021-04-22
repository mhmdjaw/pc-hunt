export interface HomeLink {
  text: string;
  to: string;
}

const homeLinks: HomeLink[] = [
  {
    text: "Blog",
    to: "/blog",
  },
  {
    text: "Reviews",
    to: "/reviews",
  },
  {
    text: "About Us",
    to: "/about-us",
  },
];

export default homeLinks;
