import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import OrderProgress from "../Seller/Seller Dashboard/Orders/OrderProgress";
import Modal from "react-modal";
import CheckIcon from "@mui/icons-material/Check";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FloatingAlert from "../FloatingAlert/FloatingAlert";
import { useSelector } from "react-redux";

const OrderDetails = () => {
  const { orderId } = useParams();
  const BASE_URL = "http://127.0.0.1:8000/order/";
  const token = localStorage.getItem("token");

  const [order, setOrder] = useState();
  const [isOrderAction, setIsOrderAction] = useState(false);

  const [alertEnable, setAlertEnable] = useState(false);
  const [alertData, setAlertData] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  const socket = useSelector(
    (state) => state.socket.socketRoot
  )

  const updateStatus = (orderid, status) => {
    if (orderId == orderid){
      setOrder({
        ...order,
        status: status
      })
    }
  }


  window.onload = () => {
    socket.onmessage = (e) => {
      const message = JSON.parse(e.data)
      updateStatus(message.order_id, message.status)
    }
  }



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
      } catch (error) {
        setAlertEnable(true);
        setAlertData("Error fetching orders");
        setAlertSeverity("error");
      }
    };
    fetchData();
  }, [token]);

  if (!order) {
    return null;
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
    try {
      const cancelResponse = await axios.patch(
        `${BASE_URL}delete/${orderId}/`,
        {},
        {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (cancelResponse.status === 200) {
        setAlertData("Cancellation request has been successfully send");
        setAlertEnable(true);
        setAlertSeverity("success");
        return true;
      }
    } catch (error) {
      setAlertData("Failed to initiate cancellation request");
      setAlertEnable(true);
      setAlertSeverity("error");
      return false;
    }
  };

  const handleReturn = async () => {
    try {
      const returnResponse = await axios.patch(
        `${BASE_URL}initiate-return/${orderId}/`,
        {},
        {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (returnResponse.status === 200) {
        setAlertData("Return has been successfully requested");
        setAlertEnable(true);
        setAlertSeverity("error");
        return true;
      }
    } catch (error) {
      setAlertData("Failed to initiate a return request");
      setAlertEnable(true);
      setAlertSeverity("error");
      return false;
    }
  };

  const handleAccept = async () => {
    if (order.order_status === "DELIVERED") {
      if (await handleReturn()) {
        setOrder({ ...order, status: "RETURN REQUESTED" });
      }
    } else {
      if (await handleCancel()) {
        setOrder({ ...order, status: "CANCELLATION REQUESTED" });
      }
    }
    setIsOrderAction(false);
  };

  const handleActionCancel = () => {
    setIsOrderAction(false);
  };

  return (
    <>
      <FloatingAlert
        message={alertData}
        setEnable={setAlertEnable}
        severity={alertSeverity}
        enable={alertEnable}
      ></FloatingAlert>
      <Modal
        isOpen={isOrderAction}
        onRequestClose={handleActionCancel}
        style={{
          content: {
            width: "400px",
            margin: "auto",
            height: "400px",
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
        <p style={{ marginBottom: "20px" }}>Are you sure ?</p>
        <Button
          variant="contained"
          color="success"
          style={{ marginRight: "10px" }}
          onClick={() => handleAccept()}
        >
          Confirm
        </Button>
        <Button varinat="contained" color="danger" onClick={handleActionCancel}>
          Cancel
        </Button>
      </Modal>
      <div
        className="container-fluid"
        id="order-details-container"
        style={{ marginTop: "84px" }}
      >
        {/* Title */}
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="h6 mb-0">
            <a href="#" className="text-muted"></a>Order Id: {order.order_id}
          </h6>
        </div>

        {/* Main content */}
        <div className="row">
          <div className="col-lg-8">
            {/* Details */}

            <div className="card m-3 p-3">
              <div className="mb-3 d-flex justify-content-between">
                <div>
                  <span className="me-3">
                    placed on: {formatDate(order.time)}
                  </span>
                  <span className="badge bg-info">{order.order_status}</span>
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
                          <h5 className="h6">
                            {`${order.item.product.brand} ${order.item.product.name} ${order.item.product_variant.variation}`}
                          </h5>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="text-dark h6">
                        {order.item.product_color.color}
                      </span>
                    </td>
                    <td className="text-start h6 text-dark">
                      {order.item.quantity}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="2" className="text-dark">
                      Original Price
                    </td>
                    <td className="text-end h6 text-dark">
                      {formatAmountWithRupeeSymbol(order.item.original_price)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" className="text-dark">
                      Selling Price
                    </td>
                    <td className="text-end h6 text-dark">
                      {formatAmountWithRupeeSymbol(order.item.selling_price)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" className="text-dark">
                      Discount{" "}
                    </td>
                    <td className="text-end h6 text-dark">
                      {formatAmountWithRupeeSymbol(order.item.discount)}
                    </td>
                  </tr>
                  {order.applied_coupon !== null && (
                    <tr>
                      <td colSpan="2" className="text-dark">
                        Coupon Discount (Code: {order.applied_coupon.code})
                      </td>
                      <td className="text-end h6 text-dark">
                        {formatAmountWithRupeeSymbol(
                          order.item.coupon_discount
                        )}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td colSpan="2" className="text-dark">
                      Shipping Charge{" "}
                    </td>
                    <td className="text-end h6 text-dark">
                      {formatAmountWithRupeeSymbol(order.shipping_charge)}
                    </td>
                  </tr>
                  <tr className="fw-bold">
                    <td colSpan="2" className="text-dark">
                      TOTAL
                    </td>
                    <td className="text-end h6 text-dark">
                      {formatAmountWithRupeeSymbol(order.item.product_price)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="card m-3">
              <OrderProgress
                status={order.order_status}
                tracking_id={order.credentials.tracking_id}
                delivery_date={order.delivery_date}
              />
            </div>

            <div className="card m-3 p-3">
              <div className="row">
                <div className="col-lg-8">
                  <div className="row m-2">
                    <div className="col-lg-6">
                      <span className="text-dark">Payment Method: </span>
                    </div>
                    <div className="col-lg-6">
                      <h3>{order.payment_method}</h3>
                    </div>
                  </div>
                  <div className="row m-2">
                    <div className="col-lg-6">
                      <span className="text-dark">Payment Status: </span>
                    </div>
                    <div className="col-lg-6">
                      <Button
                        color={`${order.payment_status ? "success" : "error"}`}
                        variant="text"
                        startIcon={
                          order.payment_status ? <CheckIcon /> : <CloseIcon />
                        }
                      >
                        {order.payment_status ? "Paid" : "Unpaid"}
                      </Button>
                    </div>
                  </div>
                  <div className="row m-2">
                    <div className="col-lg-6">
                      <span className="text-dark">Payment Id: </span>
                    </div>
                    <div className="col-lg-6">
                      <p className="h6">{order.credentials.payment_id}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card m-3 p-3">
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
                {order.shipping_address.landmark}, {order.shipping_address.city}
                <br />
                {order.shipping_address.state}, {order.shipping_address.country}
                , {order.shipping_address.zip_code}
                <br />
                <span>Phone: </span>
                {order.shipping_address.phone}, <br />{" "}
                <span>Alternate Phone: </span>
                +91 {order.shipping_address.alternate_phone}
              </address>
            </div>
            <div className="card p-3 m-3">
              <label className="text-center">status: </label>
              <h6 className="h6 text-dark">{order.status}</h6>
              {order.status === "DELIVERED" ? (
                <Button
                  onClick={() => setIsOrderAction(true)}
                  variant="outlined"
                  fullWidth
                >
                  Return
                </Button>
              ) : order.status === "PICKED UP" ||
                order.status === "IN TRANSIST" ||
                order.status === "SHIPPED" ||
                order.status === "OUT OF DELIVERY" ||
                order.status === "CONFIRMED" ? (
                <Button
                  onClick={() => setIsOrderAction(true)}
                  variant="outlined"
                  fullWidth
                >
                  Cancel
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
