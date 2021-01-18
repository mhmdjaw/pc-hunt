import React from "react";
import { useHistory } from "react-router-dom";
import { BASE_URL } from "../../../config";

const AuthSuccess: React.FC = () => {
  const history = useHistory();

  const url = `${BASE_URL}`;
  if (window.opener) {
    window.opener.open(url, "_self");
    window.opener.focus();
    window.close();
  } else {
    history.replace("/");
  }

  return <div>SUCCESSFULLY AUTHENTICATED!</div>;
};

export default AuthSuccess;
