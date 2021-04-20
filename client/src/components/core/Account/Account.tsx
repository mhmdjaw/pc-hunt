import React from "react";
import { Box } from "@material-ui/core";
import AccountFeatures from "./AccountFeatures";
import AccountDetails from "./AccountDetails";
import { useAuth } from "../../../context";

const Account: React.FC = () => {
  const { user } = useAuth();

  return (
    <Box m="60px 5vw 90px">
      <AccountDetails name={user?.name || "User"} />
      <AccountFeatures />
    </Box>
  );
};

export default Account;
