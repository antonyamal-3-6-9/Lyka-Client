import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faEllipsisVertical,
  faPencil,
  faPrint,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import OrderProgress from "../Seller/Seller Dashboard/Orders/OrderProgress";
import Modal from 'react-modal'

const OrderDetails = () => {
  const { orderId } = useParams();
  const BASE_URL = "http://127.0.0.1:8000/order/";
  const token = localStorage.getItem("token");

  const [order, setOrder] = useState();
  const [isOrderAction, setIsOrderAction] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderResponse = await axios.get(
          `${BASE_URL}retrive/${orderId}/`,
          {
            headers: {
              "Content-Type": "Application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrder(orderResponse.data);
        console.log(orderResponse);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [token]);

  if (!order) {
    return null;
  }

  function calculateProfit(product_price, original_price) {
    return parseInt(product_price) - parseInt(original_price);
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

  const handleCancel = async () => {
    try{
        const cancelResponse = await axios.patch(`${BASE_URL}delete/${orderId}/`, {}, {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        if (cancelResponse.status === 200){
          return true
        }
    } catch(error) {
      console.log(error)
      return false
    }
  };

  const handleReturn = async () => {
    try{
      const returnResponse = await axios.patch(`${BASE_URL}initiate-return/${orderId}/`, {}, {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      if (returnResponse.status === 200){
        console.log("Return has been successfully requested")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleAccept = async () => {
    if (order.order_status === "Delivered"){
      if(await handleReturn()){
        setOrder({...order, order_status : "Return Requested"})
        console.log("returned")
      }
    } else {
      if(await handleCancel()){
        setOrder({...order, order_status : "Cancelled"})
        console.log("cancelled")
      }
    }
    setIsOrderAction(false)
  }

  const handleActionCancel = () => {
    setIsOrderAction(false)
  }

  return (
    <>
         <Modal
        isOpen={isOrderAction}
        onRequestClose={handleActionCancel}
        style={{
          content: {
            width: "400px",
            margin: "auto",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            padding: "20px",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>Confirmation</h2>
        <p style={{ marginBottom: "20px" }}>
            Are you sure ? 
        </p>
        <button
          style={{ marginRight: "10px" }}
          onClick={() => handleAccept()}
        >
          Confirm
        </button>
        <button onClick={handleActionCancel}>Cancel</button>
      </Modal>
      <div className="container-fluid mt-5">
          {/* Title */}
          <div className="d-flex justify-content-between align-items-center py-3">
            <h2 className="h5 mb-0">
              <a href="#" className="text-muted"></a>Order Id: {order.order_id}
            </h2>
          </div>

          {/* Main content */}
          <div className="row">
            <div className="col-lg-8">
              {/* Details */}
              <div className="card mb-4 p-3">
                <div className="mb-3 d-flex justify-content-between">
                  <div>
                    <span className="me-3">placed on: {order.time}</span>
                    <span className="badge rounded-pill bg-info">
                      {order.order_status}
                    </span>
                  </div>
                  <div className="d-flex">
                    <button className="btn btn-link p-0 me-3 d-none d-lg-block btn-icon-text">
                      <FontAwesomeIcon icon={faDownload} />{" "}
                      <span className="text">Invoice</span>
                    </button>
                    <div className="dropdown">
                      <button
                        className="btn btn-link p-0 text-muted"
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                          <a className="dropdown-item" href="#">
                            <FontAwesomeIcon icon={faPrint} /> Print
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <table className="table table-borderless">
                  <thead>
                    <th>Product</th>
                    <th>Color</th>
                    <th>Quantity</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="d-flex mb-2">
                          <div className="flex-shrink-0">
                            <img
                              src={`http://127.0.0.1:8000/${order.item.product.thumbnail}`}
                              alt="Image"
                              width="35"
                              className="img-fluid"
                            />
                          </div>
                          <div className="flex-lg-grow-1 ms-3">
                            <h6 className="h6">
                              {`${order.item.product.brand} ${order.item.product.name} ${order.item.product_variant.variation}`}
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="h6">
                          {order.item.product_color.color}
                        </span>
                      </td>
                      <td className="text-start h6">{order.item.quantity}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="2" className="h6">
                        Original Price
                      </td>
                      <td className="text-end h5">
                        {formatAmountWithRupeeSymbol(order.item.original_price)}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="h6">
                        Selling Price
                      </td>
                      <td className="text-end h5">
                        {formatAmountWithRupeeSymbol(order.item.selling_price)}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="h6">
                        Discount{" "}
                      </td>
                      <td className="text-end h5">
                        {formatAmountWithRupeeSymbol(order.item.discount)}
                      </td>
                    </tr>
                    {order.applied_coupon !== null && (
                      <tr>
                        <td colSpan="2" className="h6">
                          Coupon Discount (Code: {order.applied_coupon.code})
                        </td>
                        <td className="text-end h5">
                          {formatAmountWithRupeeSymbol(
                            order.item.coupon_discount
                          )}
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td colSpan="2" className="h6">
                        Shipping Charge{" "}
                      </td>
                      <td className="text-end h5">
                        {formatAmountWithRupeeSymbol(order.shipping_charge)}
                      </td>
                    </tr>
                    <tr className="fw-bold">
                      <td colSpan="2" className="h6">
                        TOTAL
                      </td>
                      <td className="text-end h5">
                        {formatAmountWithRupeeSymbol(order.item.product_price)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="card mb-4">
                <OrderProgress
                  status={order.order_status}
                  tracking_id={order.credentials.tracking_id}
                  delivery_date={order.delivery_date}
                />
              </div>

              <div className="card mb-4 p-3">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="row m-2">
                      <div className="col-lg-6">
                        <h4 className="h6">Payment Method: </h4>
                      </div>
                      <div className="col-lg-6">
                        <h3>{order.payment_method}</h3>
                      </div>
                    </div>
                    <div className="row m-2">
                      <div className="col-lg-6">
                        <h4 className="h6">Payment Status: </h4>
                      </div>
                      <div className="col-lg-6">
                        <button
                          className={`btn "w-100" ${
                            order.payment_status ? "btn-success" : "btn-danger"
                          }`}
                          disabled
                        >
                          {order.payment_status ? "Paid" : "Unpaid"}
                        </button>
                      </div>
                    </div>
                    <div className="row m-2">
                      <div className="col-lg-6">
                        <h4 className="h6">Payment Id: </h4>
                      </div>
                      <div className="col-lg-6">
                        <p>{order.credentials.payment_id}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card mb-4 p-3">
                <h3 className="h6">Shipping Information</h3>
                {order.credentials.tracking_id !== null && (
                  <span>Tracking code: {order.credentials.tracking_id}</span>
                )}
                <hr />
                <h3 className="h6">Shipping Address</h3>
                <address>
                  <strong>{order.shipping_address.name}</strong>
                  <br />
                  {order.shipping_address.street_one},{" "}
                  {order.shipping_address.street_two}
                  <br />
                  {order.shipping_address.landmark},{" "}
                  {order.shipping_address.city}
                  <br />
                  {order.shipping_address.state},{" "}
                  {order.shipping_address.country},{" "}
                  {order.shipping_address.zip_code}
                  <br />
                  <span>Phone: </span>
                  {order.shipping_address.phone}, <br />{" "}
                  <span>Alternate Phone: </span>
                  +91 {order.shipping_address.alternate_phone}
                </address>
              </div>
              <div className="card p-3">
                <button
                  className={`btn ${
                    order.order_status === "Delivered"
                    ? "btn-danger"
                    : order.order_status === "Cancelled"
                    ? "btn-warning"
                    : order.order_status === "Returned" 
                    ? "btn-danger" 
                    : order.order_status === "Return Requested"
                    ? "btn-primary"
                    : order.order_status === "Picked Up for Return"
                    ? "btn-success"
                    : "btn-warning"
                  }`}
                  disabled={order.order_status === "Cancelled" || order.order_status === "Returned" || order.order_status === "Return Requested" || order.order_status === "Picked Up for Return"}
                  onClick={() => setIsOrderAction(true)}
                >
                  {order.order_status === "Delivered"
                    ? "Return"
                    : order.order_status === "Return Requested" || order.order_status === "Picked Up for Return" || order.order_status === "Cancelled"
                    ? order.order_status
                    : "Cancel"
                    }
                </button>
              </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default OrderDetails;
