interface FooterLink {
  text: string;
  to: string;
}

const footerLinks: FooterLink[] = [
  {
    text: "privacy policy",
    to: "#",
  },
  {
    text: "terms and conditions",
    to: "#",
  },
  {
    text: "blog",
    to: "/blog",
  },
  {
    text: "contact us",
    to: "/contact-us",
  },
  {
    text: "about us",
    to: "/about-us",
  },
];

export default footerLinks;
