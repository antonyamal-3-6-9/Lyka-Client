import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

const Orderlist = () => {
  const [exists, setExists] = useState(null);
  const isLoggedIn = useSelector(
    (state) => state.customerAuth.isCustomerLoggedIn
  );
  const token = localStorage.getItem("token");
  const BASE_URL = "http://127.0.0.1:8000/order/";
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    console.log(isLoggedIn);
    if (!isLoggedIn) {
      setExists(false);
      return;
    }
    const fetchData = async () => {
      try {
        const orderResponse = await axios.get(
          `${BASE_URL}get-customer-orders/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(orderResponse);
        if (orderResponse.data.length === 0) {
          setExists(false);
        }
        setExists(true);
        setOrders(orderResponse.data);
      } catch (error) {
        setExists(false);
        console.log(error);
      }
    };
    fetchData();
  }, [token]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return date.toLocaleString("en-US", options);
  }

  const formatAmountWithRupeeSymbol = (amount) => {
    amount = parseInt(amount);
    if (typeof amount !== "number" || isNaN(amount)) {
      return "Invalid Amount";
    }
    const formattedAmount = amount.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      style: "currency",
      currency: "INR",
    });

    return formattedAmount;
  };

  if (exists === null) {
    return null;
  }

  return (
    <>
      {isLoggedIn && exists ? (
     <div className="container-fluid pt-5 mt-5">
      {orders.map((order) => (
        <div className="card p-3 mb-2 rounded-0">
          <div className="row">
            <div className="col-lg-2 d-flex justify-content-center align-items-center">
              <img
                src={`http://127.0.0.1:8000/${order.item.product.thumbnail}`}
                style={{width : "50px", height : "100px"}}
              />
            </div>
            <div className="col-lg-4 d-flex justify-content-center align-items-center">
              <h4 className="h5">{`${order.item.product.brand} ${order.item.product.name} ${order.item.product_variant.variation} ${order.item.product_color.color}`}</h4>
            </div>
            <div className="col-lg-2 d-flex justify-content-center align-items-center">
              <h4 className="h5">{order.item.product_price}</h4>
            </div>
            <div className="col-lg-4 d-flex justify-content-center align-items-center">
              <h4>{order.order_status}</h4>
            </div>
          </div>
        </div>
      ))}
      </div>) : !isLoggedIn ||
        !exists ? (
          <div className="container d-flex justify-content-center align-items-center mt-5 pt-5">
            <div className="row mt-5">
              <div className="card p-5">
                <h2 className="text-center">
                  {isLoggedIn ? "No orders" : "Login to view your Orders"}
                </h2>
                <Link
                  to={isLoggedIn ? "/" : "/customer-login"}
                  className="btn btn-outline-primary"
                >
                  {" "}
                  {isLoggedIn ? "Continue Shopping" : "Login now"}
                </Link>
              </div>
            </div>
          </div>
        ) : null}
    </>
  );

  // return (
  //   <>
  //     {isLoggedIn && exists ? (
  //       <div className="container-fluid pt-5 mt-5">
  //         {orders.map((order, index) => (
  //           <div className="card p-3 m-3">
  //             <Link to={`/order/${order.order_id}`}>
  //               <h3>Order Id: {order.order_id}</h3>
  //             </Link>
  //             <div className="row">
  //               <div className="col-lg-4">
  //                 <div className="card">
  //                   <img
  //                     src={`http://127.0.0.1:8000/${order.item.product.thumbnail}`}
  //                   />
  //                 </div>
  //               </div>
  //               <div className="col-lg-4 p-3 mb-0">
  //                 <div className="row mb-5">
  //                   <div className="col-lg-5">
  //                     <h5>Seller:</h5>
  //                   </div>
  //                   <div className="col-lg-7">
  //                     <h4>{order.seller.bussiness_name}</h4>
  //                   </div>
  //                 </div>
  //                 <div className="row mb-5">
  //                   <div className="col-lg-5">
  //                     <h5>Price: </h5>
  //                   </div>
  //                   <div className="col-lg-7">
  //                     <h4>
  //                       {formatAmountWithRupeeSymbol(order.item.product_price)}
  //                     </h4>
  //                   </div>
  //                 </div>
  //                 <div className="row">
  //                   <div className="col-lg-5">
  //                     <h5>Shipping To:</h5>
  //                   </div>
  //                   <div className="col-lg-7">
  //                     <h4>
  //                       {" "}
  //                       {order.shipping_address.city},{" "}
  //                       {order.shipping_address.state},{" "}
  //                       {order.shipping_address.country}
  //                     </h4>
  //                   </div>
  //                 </div>
  //               </div>
  //               <div className="col-lg-4">
  //                 <div className="row mb-5">
  //                   <div className="col-lg-6">
  //                     <h5>Payment Status</h5>
  //                   </div>
  //                   <div className="col-lg-6">
  //                     <button
  //                       className={`btn ${
  //                         order.payment_status ? "btn-success" : "btn-danger"
  //                       }`}
  //                       disabled
  //                     >
  //                       {order.payment_status ? "Paid" : "Unpaid"}
  //                     </button>
  //                   </div>
  //                 </div>
  //                 <div className="row mb-5">
  //                   <div className="col-lg-6">
  //                     <h5>Order Status</h5>
  //                   </div>{" "}
  //                   <div className="col-lg-6">
  //                     <button
  //                       className={`btn ${
  //                         order.order_status === "Placed"
  //                           ? "btn-warning"
  //                           : order.order_status === "Accepted"
  //                           ? "btn-temporary"
  //                           : order.order_status === "Processing"
  //                           ? "btn-warning"
  //                           : order.order_status === "In Transist"
  //                           ? "btn-info"
  //                           : order.order_status === "Shipped"
  //                           ? "btn-primary"
  //                           : order.order_status === "Delivered"
  //                           ? "btn-success"
  //                           : order.order_status === "Rejected"
  //                           ? "btn-danger"
  //                           : order.order_status === "Cancelled"
  //                           ? "btn-warning"
  //                           : order.order_status === "Returned"
  //                           ? "btn-danger"
  //                           : "btn-primary"
  //                       }`}
  //                       disabled
  //                     >
  //                       {order.order_status}
  //                     </button>
  //                   </div>
  //                 </div>
  //                 <div className="row">
  //                   <div className="col-lg-5">
  //                     <h5>Last Updated: </h5>
  //                   </div>
  //                   <div className="col-lg-7">
  //                     <h4>{formatDate(order.time)}</h4>
  //                   </div>
  //                 </div>
  //               </div>
  //               <div className="col-lg-12 m-0 d-flex justify-content-center">
  //                 <h4 className="h3">{`${order.item.product.brand} ${order.item.product.name} ${order.item.product_variant.variation} ${order.item.product_color.color}`}</h4>
  //               </div>
  //             </div>{" "}
  //           </div>
  //         ))}
  //       </div>
      

  //   </>
  // );
};

export default Orderlist;
