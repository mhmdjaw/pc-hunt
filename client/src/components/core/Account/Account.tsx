import React from "react";
import { Box } from "@material-ui/core";
import AccountFeatures from "./AccountFeatures";
import AccountDetails from "./AccountDetails";
import { useAuth } from "../../../context";

const Account: React.FC = () => {
  const { user } = useAuth();

  return (
    <Box p="60px 5vw">
      <AccountDetails
        name={user?.name || "Name"}
        email={user?.email || "Email"}
      />

      <AccountFeatures />
    </Box>
  );
};

export default Account;
