import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";


const OrderPlaced = () => {

  const order_id =  sessionStorage.getItem("order_id")

   const [orderId, setOrderId] = useState(order_id)

   const navigate = useNavigate()

   const isLoggedIn = useSelector(
    (state) => state.customerAuth.isCustomerLoggedIn
  );

  if (!isLoggedIn){
    navigate("/")
  }

  return (
    <>
          <div className="container d-flex justify-content-center align-items-center mt-5 pt-5">
            <div className="row pt-5 mt-5">
            <div className="card p-5">
              <h2 className="text-center">
            Your Order Has been successfully placed
              </h2>
              <h3 className="text-center">Order no:{orderId} </h3>
              <Link to="/" className="btn btn-outline-success">
                Continue Shopping
              </Link>
              </div>
            </div>
          </div>

    </>
  );
};

export default OrderPlaced;
