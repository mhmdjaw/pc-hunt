import React from "react";
import { BASE_URL } from "../../../config";

const AuthSuccess: React.FC = () => {
  const url = `${BASE_URL}/home`;
  window.opener.open(url, "_self");
  window.opener.focus();
  window.close();

  return <div>SUCCESSFULLY AUTHENTICATED!</div>;
};

export default AuthSuccess;
