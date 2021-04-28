import { Box, Typography } from "@material-ui/core";
import React from "react";

const PageNotFound: React.FC = () => {
  return (
    <Box m="60px 5vw 90px">
      <Typography variant="h4">
        <b>404 ERROR!</b>
      </Typography>
      <Box pt="30px" fontWeight={500} fontSize="h4.fontSize">
        Oops! Looks like the page you&apos;re trying to access doesn&apos;t
        exist. Please make sure you typed the URL correctly.
      </Box>
    </Box>
  );
};

export default PageNotFound;
