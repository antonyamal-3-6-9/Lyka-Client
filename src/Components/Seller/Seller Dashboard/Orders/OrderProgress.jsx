import React from "react";
import "./progressivebar.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCog, faMedal, faCar, faHome } from '@fortawesome/free-solid-svg-icons';

const ProgressiveBar = (props) => {
  return (
    <>
            <div className="card mb-3">
        <div className="p-4 text-center text-white text-lg bg-dark rounded-top">
          <span className="text-uppercase">Tracking Order No - </span>
          <span className="text-medium">34VB5540K83</span>
        </div>
        <div className="d-flex flex-wrap flex-sm-nowrap justify-content-between py-3 px-2 bg-secondary">
          <div className="w-100 text-center py-1 px-2">
            <span className="text-medium">Shipped Via:</span> UPS Ground
          </div>
          <div className="w-100 text-center py-1 px-2">
            <span className="text-medium">Status:</span> Checking Quality
          </div>
          <div className="w-100 text-center py-1 px-2">
            <span className="text-medium">Expected Date:</span> SEP 09, 2017
          </div>
        </div>
        <div className="card-body">
          <div className="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
            <div className="step completed">
              <div className="step-icon-wrap d-flex align-items-center justify-content-center">
                <div className="step-icon d-flex align-items-center justify-content-center">
                  <FontAwesomeIcon icon={faShoppingCart} />
                </div>
              </div>
              <h4 className="step-title">Confirmed Order</h4>
            </div>
            <div className="step completed">
              <div className="step-icon-wrap d-flex align-items-center justify-content-center">
                <div className="step-icon d-flex align-items-center justify-content-center">
                  <FontAwesomeIcon icon={faCog} />
                </div>
              </div>
              <h4 className="step-title">Processing Order</h4>
            </div>
            <div className="step completed">
              <div className="step-icon-wrap d-flex align-items-center justify-content-center">
                <div className="step-icon d-flex align-items-center justify-content-center">
                  <FontAwesomeIcon icon={faMedal} />
                </div>
              </div>
              <h4 className="step-title">Quality Check</h4>
            </div>
            <div className="step">
              <div className="step-icon-wrap d-flex align-items-center justify-content-center">
                <div className="step-icon d-flex align-items-center justify-content-center">
                  <FontAwesomeIcon icon={faCar} />
                </div>
              </div>
              <h4 className="step-title">Product Dispatched</h4>
            </div>
            <div className="step">
              <div className="step-icon-wrap d-flex align-items-center justify-content-center">
                <div className="step-icon d-flex align-items-center justify-content-center">
                  <FontAwesomeIcon icon={faHome} />
                </div>
              </div>
              <h4 className="step-title">Product Delivered</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default ProgressiveBar;
