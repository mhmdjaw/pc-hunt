import React from "react";
import { Box, Typography } from "@material-ui/core";

const OrSplitter: React.FC = () => {
  return (
    <Box mb="24px" display="flex" justifyContent="center" alignItems="center">
      <Box borderColor="grey.500" height={0} flexGrow={3} border={1} />
      <Box color="grey.500" flexGrow={1} textAlign="center">
        <Typography variant="h6">or</Typography>
      </Box>
      <Box borderColor="grey.500" height={0} flexGrow={3} border={1} />
    </Box>
  );
};

export default OrSplitter;
