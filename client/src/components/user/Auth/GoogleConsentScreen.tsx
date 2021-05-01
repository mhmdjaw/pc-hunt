import axios from "axios";
import React, { useEffect } from "react";
import { AUTH } from "../../../config";

const GoogleConsentScreen: React.FC = () => {
  useEffect(() => {
    axios.get(`${AUTH}/google`);
  }, []);

  return <></>;
};

export default GoogleConsentScreen;
