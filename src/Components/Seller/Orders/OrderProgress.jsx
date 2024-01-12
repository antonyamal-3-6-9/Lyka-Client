import React from "react";
import "./progressivebar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faCog,
  faMedal,
  faCar,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

const ProgressiveBar = ({ status, tracking_id, delivery_date }) => {
  return (
    <>
      <div className="p-4 text-center text-white text-lg bg-dark rounded-top">
        <span className="text-uppercase">Tracking Order No - </span>
        <span className="text-medium">{tracking_id}</span>
      </div>
      <div className="d-flex flex-wrap flex-sm-nowrap justify-content-between py-3 px-2 bg-secondary">
        <div className="w-100 text-center py-1 px-2">
          <span className="text-medium">Status: </span>
          {status}
        </div>
        <div className="w-100 text-center py-1 px-2">
          <span className="text-medium">Expected Date:</span> {delivery_date}
        </div>
      </div>
      <div className="card-body">
        <div className="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
          <div
            className={
              status === "Accepted" ||
              status === "Processing" ||
              status === "In Transist" ||
              status === "Shipped" ||
              status === "Delivered"
                ? "step completed"
                : "step"
            }
          >
            <div className="step-icon-wrap d-flex align-items-center justify-content-center">
              <div className="step-icon d-flex align-items-center justify-content-center">
                <FontAwesomeIcon icon={faShoppingCart} />
              </div>
            </div>
            <h4 className="step-title">Accepted</h4>
          </div>
          <div
            className={
              status === "Processing" ||
              status === "In Transist" ||
              status === "Shipped" ||
              status === "Delivered"
                ? "step completed"
                : "step"
            }
          >
            <div className="step-icon-wrap d-flex align-items-center justify-content-center">
              <div className="step-icon d-flex align-items-center justify-content-center">
                <FontAwesomeIcon icon={faCog} />
              </div>
            </div>
            <h4 className="step-title">Processing</h4>
          </div>
          <div
            className={
              status === "In Transist" ||
              status === "Shipped" ||
              status === "Delivered"
                ? "step completed"
                : "step"
            }
          >
            <div className="step-icon-wrap d-flex align-items-center justify-content-center">
              <div className="step-icon d-flex align-items-center justify-content-center">
                <FontAwesomeIcon icon={faMedal} />
              </div>
            </div>
            <h4 className="step-title">In transist</h4>
          </div>
          <div
            className={
              status === "Shipped" || status === "Delivered"
                ? "step completed"
                : "step"
            }
          >
            <div className="step-icon-wrap d-flex align-items-center justify-content-center">
              <div className="step-icon d-flex align-items-center justify-content-center">
                <FontAwesomeIcon icon={faCar} />
              </div>
            </div>
            <h4 className="step-title">Shipped</h4>
          </div>
          <div className={status === "Delivered" ? "step completed" : "step"}>
            <div className="step-icon-wrap d-flex align-items-center justify-content-center">
              <div className="step-icon d-flex align-items-center justify-content-center">
                <FontAwesomeIcon icon={faHome} />
              </div>
            </div>
            <h4 className="step-title">Delivered</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgressiveBar;
