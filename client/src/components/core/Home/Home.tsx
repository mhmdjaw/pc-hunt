import React from "react";
import axios from "axios";
import { API } from "../../../config";
import { Box, createStyles, makeStyles } from "@material-ui/core";
import ContainedButton from "../../common/ContainedButton";
import Slider from "react-slick";
import "../../../slick-carousel/slick.css";
import "../../../slick-carousel/slick-theme.css";

const useHomeStyles = makeStyles((theme) =>
  createStyles({
    slider: {},
  })
);

const Home: React.FC = () => {
  const classes = useHomeStyles();

  const handleClick = () => {
    axios
      .get(`${API}/user`, {
        withCredentials: true,
      })
      .then((response) => console.log(response.data))
      .catch(() => console.log("didn't make it"));
  };

  return (
    <Box mt="50vh" textAlign="center">
      <ContainedButton onClick={handleClick}>test interceptor</ContainedButton>
    </Box>
    // <Slider >

    // </Slider>
  );
};

export default Home;
