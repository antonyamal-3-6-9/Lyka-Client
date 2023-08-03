import React from "react";
import SellerBasicRegistration from "./SellerBasicRegistration";
import "./registration.scss";

const Registration = () => {

  const BASE_URL = "http://127.0.0.1:8000/seller/";

  return (
    <>
      <div className="container-fluid d-flex justify-content-center align-items-center h-100 m-0">
        <div className="row w-75 p-5">
          <div className="col-lg-12 ps-1 pe-0">
            <div className="card h-100 w-100 m-0 border-0 rounded-0 pt-3 pb-3">
              <div className="container-fluid w-75 h-100">
              <h2 className="text-center">Register Here</h2>
                  <SellerBasicRegistration 
                  url = {BASE_URL}
                  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
