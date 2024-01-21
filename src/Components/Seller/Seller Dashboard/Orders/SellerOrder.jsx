import React, { useState, useEffect } from "react";
import SellerOrderTable from "./SellerOrderTable";

const SellerOrder = () => {
  const token = localStorage.getItem("token");
  const BASE_URL = "http://127.0.0.1:8000/order/";

  const [orderExists, setOrderExists] = useState(true);

  return (
    <>
      {orderExists ? (
        <div className="container-fluid" style={{marginTop: "83px"}}>
          <div className="card m-0 p-0">
            <SellerOrderTable setExists={setOrderExists} />
          </div>
        </div>
      ) : (
        <>
          <div className="container d-flex justify-content-center align-items-center mt-5 pt-5">
            <div className="row">
              <div className="card p-5">
                <h2 className="text-center">You don't have any orders yet</h2>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SellerOrder;
