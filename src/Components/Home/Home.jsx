import React from "react";
import Contents from "./Contents/Contents.jsx";
import ProductByCategory from "../Product/ProductByCategory.jsx";
import ResponsiveAppBar from "../Navbar/MuiNavBar.jsx";
import Intro from "./Contents/Intro.jsx";
import "./home.css";
import { styled, Paper } from "@mui/material";
import Review from "../Reviews/Review.jsx";

const HomeContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0),
  color: theme.palette.text.secondary,
}));

function Home() {
  return (
    <>
      <ResponsiveAppBar />
      <HomeContainer style={{ marginTop: "65px" }}>
        <Intro />
        <Contents />
        <Review />
      </HomeContainer>
    </>
  );
}

export default Home;
