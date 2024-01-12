import React from "react";
import Category from "./categories/Category.jsx";
import Header from "./Header.jsx";
import Contents from "./Contents/Contents.jsx";
import ProductByCategory from "../Product/ProductByCategory.jsx";
import ResponsiveAppBar from "../Navbar/MuiNavBar.jsx";


function Home() {

  return (
    <>
      <ResponsiveAppBar />
      <Category />
      <Header />
      <ProductByCategory />
    </>
  );
}

export default Home;
