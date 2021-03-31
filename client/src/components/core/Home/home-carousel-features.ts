import pc1 from "../../../assets/images/pc1.png";
import pc2 from "../../../assets/images/pc2.png";

export interface HomeCarouselFeature {
  headline: string;
  buttonText: string;
  link: string;
  image: string;
}

const homeCarouselFeatures: HomeCarouselFeature[] = [
  {
    headline: "Your hunting experience never made easier.",
    buttonText: "shop now",
    link: "/shop",
    image: pc1,
  },
  {
    headline: "Build your PC in no time with our PC builder.",
    buttonText: "build now",
    link: "#",
    image: pc2,
  },
];

export default homeCarouselFeatures;
