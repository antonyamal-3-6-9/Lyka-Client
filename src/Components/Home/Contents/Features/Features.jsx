import React from "react";
import FeatureCard from "./FeatureCard";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const Features = () => {
  return (
    <>
      <div>
        <div className="container-fluid" style={{ backgroundColor: "#E2F1F6", height: "100%" }}>
          <div className="row" id="feature-container">
            <div className="col-lg-3 p-1 pt-0 pb-0 ps-0">
              
              <FeatureCard
                ficon={faWandMagicSparkles}
                text={"Wonderous Offers"}
              />
            </div>
            <div className="col-lg-3 p-1 pt-0 pb-0">
              <FeatureCard ficon={faTruckFast} text={"Fast Shipping"} />
            </div>
            <div className="col-lg-3 p-1 pt-0 pb-0">
              <FeatureCard ficon={faLeftLong} text={"Easy Returns"} />
            </div>
            <div className="col-lg-3 p-1 pt-0 pb-0 pe-0">
              <FeatureCard ficon={faPhone} text={"Reliable Customer Support"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
