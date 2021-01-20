import React from "react";
import axios from "axios";
import { API } from "../../../config";
import { Box } from "@material-ui/core";
import ContainedButton from "../../common/ContainedButton";

const Home: React.FC = () => {
  const handleClick = () => {
    axios
      .get(`${API}/user`, {
        withCredentials: true,
      })
      .then((response) => console.log(response))
      .catch(() => console.log("didn't make it"));
  };

  return (
    <Box mt="50vh" textAlign="center">
      <ContainedButton onClick={handleClick}>test interceptor</ContainedButton>
    </Box>
  );
};

export default Home;
