const carouselAnimationVariants = {
  topHeadlineVariants: {
    hidden: {
      opacity: 0,
      x: "-10%",
    },
    visible: {
      opacity: 1,
      x: "0%",
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  },
  bottomHeadlineVariants: {
    hidden: {
      opacity: 0,
      x: "10%",
    },
    visible: {
      opacity: [0, 0, 0.7, 1],
      x: ["10%", "10%", "3%", "0%"],
      transition: {
        duration: 1.5,
        ease: "linear",
      },
    },
  },
};

export default carouselAnimationVariants;
