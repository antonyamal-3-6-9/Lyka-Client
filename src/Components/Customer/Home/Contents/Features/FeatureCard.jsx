import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const FeatureOne = (props) => {
  return (
    <>
      <div className="feature-sub-container text-center">
      <p className="feature-icon"><FontAwesomeIcon icon={props.ficon} /></p>
      <h2 className="feature-text">{props.text}</h2>
      </div>
    </>
  );
};

export default FeatureOne;
