import { SvgIconTypeMap } from "@material-ui/core";
import { OverrideProps } from "@material-ui/core/OverridableComponent";
import { Facebook, Twitter, Instagram, GitHub } from "@material-ui/icons";

interface FooterSocial {
  href?: string;
  icon: React.FC<
    OverrideProps<SvgIconTypeMap<Record<string, unknown>, "svg">, "svg">
  >;
}

const footerSocials: FooterSocial[] = [
  {
    icon: Facebook,
  },
  {
    icon: Twitter,
  },
  {
    icon: Instagram,
  },
  {
    href: "https://github.com/mhmdjaw/PChunt",
    icon: GitHub,
  },
];

export default footerSocials;
