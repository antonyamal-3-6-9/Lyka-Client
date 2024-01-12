import React from "react";
import Carousel from "./Carousal";
import ProductTagCard from "./ProductTagCard";
import FeatureCarousel from "./FeatureCarousal";

const Header = () => {
  return (
    <>
    <div className="header-container">
    <div className="row mb-4">
      <FeatureCarousel />
    </div>
    </div>
    <div className="header-container mb-4">
    <div className="row">
      <div className="col-lg-2">
        <ProductTagCard 
          tag = {"Trending"}
        />
      </div>
      <div className="col-lg-10">
      <Carousel />
      </div>
    </div>
    </div>
    <div className="header-container mt-4 mb-4">
    <div className="row">
      <div className="col-lg-2">
        <ProductTagCard 
          tag = {"Latest"}
        />
      </div>
      <div className="col-lg-10">
      <Carousel />
      </div>
    </div>
    </div>
     
    </>
  );
};

export default Header;
