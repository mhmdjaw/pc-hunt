import { BuildIcon } from "../../../assets/BuildIcon";
import {
  Stars as StarIcon,
  MonetizationOn as DollarIcon,
} from "@material-ui/icons";
import { SvgIconTypeMap } from "@material-ui/core";
import { OverrideProps } from "@material-ui/core/OverridableComponent";

export interface Feature {
  icon: React.FC<
    OverrideProps<SvgIconTypeMap<Record<string, unknown>, "svg">, "svg">
  >;
  title: string;
  subtitle: string;
}

const homeFeatures: Feature[] = [
  {
    icon: BuildIcon,
    title: "Build your own",
    subtitle: "Skip all the trouble with our hassle free PC builder.",
  },
  {
    icon: StarIcon,
    title: "Latest tech",
    subtitle: "First to bring you the newest exciting products.",
  },
  {
    icon: DollarIcon,
    title: "Low prices",
    subtitle: "Always the best prices. Won't be beat.",
  },
];

export default homeFeatures;
