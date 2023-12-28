import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandshake } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import { faShopSlash } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faTruckPickup } from "@fortawesome/free-solid-svg-icons";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

const Orderlist = () => {
  const [exists, setExists] = useState(null);
  const token = localStorage.getItem("token");
  const BASE_URL = "http://127.0.0.1:8000/order/";
  const [orders, setOrders] = useState([]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  useEffect(() => {
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
      <Item>
        {orders.map((order) => (
          <>
          <hr></hr>
          <div className="p-3" id={order.order_id}>
            <div className="row">
              <div className="col-lg-2 d-flex justify-content-center align-items-center">
                <img
                  src={`http://127.0.0.1:8000/${order.item.product.thumbnail}`}
                  style={{ width: "75px" }}
                />
              </div>
              <div className="col-lg-4 d-flex justify-content-center align-items-center">
                <Link to={`/order/${order.order_id}`}>
                  <h6 className=" h6 listing text-dark">{`${order.item.product.brand} ${order.item.product.name} ${order.item.product_variant.variation} ${order.item.product_color.color}`}</h6>
                </Link>
              </div>
              <div className="col-lg-2 d-flex justify-content-center align-items-center">
                <p className="listing text-dark" style={{fontSize: "0.95rem"}}>
                  {formatAmountWithRupeeSymbol(order.item.product_price)}
                </p>
              </div>
              <div className="col-lg-4 d-flex justify-content-center align-items-center">
                <p className="listing text-dark">{order.order_status}</p>
              </div>
            </div>
          </div>
          <hr></hr>
          </>
        ))}
      </Item>
      {/* {exists ? (
        orders.map((order) => (
          <div
            className="m-4 rounded-0 lyka-shadow"
            id={order.order_id}
            onMouseOver={() => changeFont(order.order_id)}
            onMouseOut={() => revertFont(order.order_id)}
          >
            <div className="row pt-2 pb-2" style={{ height: "17vh" }}>
              <div className="col-lg-2 d-flex justify-content-center align-items-center">
                <FontAwesomeIcon
                  icon={
                    order.order_status === "Delivered"
                      ? faHandshake
                      : order.order_status === "Cancelled"
                      ? faShopSlash
                      : order.order_status === "Returned"
                      ? faThumbsDown
                      : order.order_status === "Rejected"
                      ? faTimesCircle
                      : order.order_status === "Placed"
                      ? faThumbsUp
                      : order.order_status === "Return Requested"
                      ? faArrowLeft
                      : order.order_status === "picked Up for Return"
                      ? faTruckPickup
                      : order.order_status === "In Transist"
                      ? faTruckFast
                      : null
                  }
                  style={{
                    width: "100px",
                    height: "50px",
                  }}
                />
              </div>
              <div
                className="col-lg-4 d-flex justify-content-center align-items-center"
                style={{ height: "100%" }}
              >
                <Link to={`/order/${order.order_id}`}>
                  <h4 className="h5 m-0 listing">{`${order.item.product.brand} ${order.item.product.name} ${order.item.product_variant.variation} ${order.item.product_color.color}`}</h4>
                </Link>
              </div>
              <div className="col-lg-2 d-flex justify-content-center align-items-center">
                <h4 className="h5 m-0 listing">
                  {formatAmountWithRupeeSymbol(order.item.product_price)}
                </h4>
              </div>
              <div className="col-lg-4 d-flex justify-content-center align-items-center">
                <h5 className="h5 m-0 listing">{order.order_status}</h5>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div
          className="card border-0 p-5 d-flex justify-content-center"
          style={{ height: "90vh" }}
        >
          <h2
            className="text-center mb-2"
            style={{ fontSize: "4rem", fontWeight: "bold" }}
          >
            No Orders
          </h2>
          <div className="d-flex justify-content-center align-items-center">
            <Link to="/" className="btn btn-primary w-25 mt-4">
              Continue Shopping
            </Link>
          </div>
        </div>
      )} */}
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
