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
      opacity: 1,
      x: "0%",
      transition: {
        delay: 0.3,
        duration: 1,
        ease: "easeInOut",
      },
    },
  },
};

export default carouselAnimationVariants;
