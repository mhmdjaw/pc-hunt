import React from "react";
import { Box } from "@material-ui/core";
import { useParams } from "react-router";

const Product: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  return <Box m="60px 5vw 90px"></Box>;
};

export default Product;
