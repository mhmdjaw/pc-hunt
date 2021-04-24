import {
  AcerIcon,
  AsusIcon,
  LogitechIcon,
  MsiIcon,
  NvidiaIcon,
} from "../../../assets";

export interface HomeBrand {
  svg: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  slug: string;
}

const homeBrands: HomeBrand[] = [
  {
    svg: AcerIcon,
    slug: "acer",
  },
  {
    svg: LogitechIcon,
    slug: "logitech",
  },
  {
    svg: MsiIcon,
    slug: "msi",
  },
  {
    svg: AsusIcon,
    slug: "asus",
  },
  {
    svg: NvidiaIcon,
    slug: "nvidia",
  },
];

export default homeBrands;
