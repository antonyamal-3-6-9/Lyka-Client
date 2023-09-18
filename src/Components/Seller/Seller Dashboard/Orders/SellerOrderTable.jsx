import React, { useEffect, useState } from "react";
import axios from "axios";
import FloatingAlert from "../../../FloatingAlert/FloatingAlert";
import Modal from "react-modal";
import { Link } from "react-router-dom";

const SellerOrderTable = ({ setExists }) => {
  
  const token = localStorage.getItem("token");
  const BASE_URL = "http://127.0.0.1:8000/order/";
  const [orders, setOrders] = useState([]);

  const [isOrderAction, setIsOrderAction] = useState(false);
  const [orderIdForAction, setOrderIdForAction] = useState();
  const [orderStatus, setOrderStatus] = useState(false);
  const [isAccept, setIsAccept] = useState(null);

  const [alertData, setAlertData] = useState("");
  const [alertEnable, setAlertEnable] = useState(true);
  const [alertSeverity, setAlertSeverity] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderResponse = await axios.get(`${BASE_URL}get-seller-orders/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (orderResponse.data.length === 0) {
          setExists(false);
        }
        console.log(orderResponse);
        setExists(true);
        setOrders(orderResponse.data);
      } catch (error) {
        setExists(false);
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

  const updateOrderStatus = (order_id, status) => {
    const newOrders = [...orders];
    const orderIndex = newOrders.findIndex(
      (order) => order.order_id === order_id
    );
    if (orderIndex !== -1) {
      if (status) {
        newOrders[orderIndex].order_status = "Accepted";
      } else {
        newOrders[orderIndex].order_status = "Rejected";
      }
    }
    setOrders(newOrders);
  };

  const handleAcceptorReject = async (order_id, status) => {
    try {
      const orderUpdateResponse = await axios.patch(
        `${BASE_URL}order-accept-or-reject/`,
        {
          order_id: order_id,
          status: status,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (orderUpdateResponse.status === 200) {
        updateOrderStatus(order_id, status);
        setIsOrderAction(false);
      }
    } catch (error) {
      setIsOrderAction(false);
      setAlertData(error.response.data.message);
      setAlertEnable(true);
      setAlertSeverity("error");
    }
  };

  const handleActionCancel = () => {
    setIsOrderAction(false);
  };

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

  return (
    <>
      <FloatingAlert
        message={alertData}
        enable={alertEnable}
        setEnable={setAlertEnable}
        severity={alertSeverity}
      />
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
          {isAccept
            ? "Are you sure to confirm the order"
            : "Are you sure to cancel the order"}
        </p>
        <button
          style={{ marginRight: "10px" }}
          onClick={() => handleAcceptorReject(orderIdForAction, orderStatus)}
        >
          Confirm
        </button>
        <button onClick={handleActionCancel}>Cancel</button>
      </Modal>
      <div className="table-responsive">
        <table className="table table-striped table-light table-hover table-borderless border-dark m-0 p-0">
          <thead className="table-success">
            <tr>
              <th scope="col" className="h5 text-center">
                Product Name
              </th>
              <th scope="col" className="h5 text-center">
                Customer Name
              </th>
              <th scope="col" className="h5 text-center">
                Shipping Location
              </th>
              <th scope="col" className="h5 text-center">
                Placed On
              </th>
              <th scope="col" className="h5 text-center">
                Payment Status
              </th>
              <th scope="col" className="h5 text-center">
                Profit
              </th>
              <th scope="col" className="h5 text-center">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.order_id}>
                <td className="h6">
                  <Link
                    to={`/seller/order/${order.order_id}`}
                  >{`${order.item.product.brand} ${order.item.product.name} ${order.item.product_variant.variation} ${order.item.product_color.color}`}</Link>
                </td>
                <td className="h6">{order.shipping_address.name}</td>
                <td className="h6">
                  {order.shipping_address.city}, {order.shipping_address.state},{" "}
                  {order.shipping_address.country}
                </td>
                <td className="h6">{formatDate(order.time)}</td>
                <td className="text-center">
                  <button
                    className={`btn ${
                      order.payment_status ? "btn-success" : "btn-danger"
                    }`}
                    disabled
                  >
                    {order.payment_status ? "Paid" : "Unpaid"}
                  </button>
                </td>
                <td className="h6">
                  {formatAmountWithRupeeSymbol(order.item.product_price - order.item.original_price)}
                </td>
                <td className="text-center">
                  {order.order_status === "Placed" ? (
                    <div className="row m-0 p-0">
                      <div className="col-lg-6">
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => {
                            setOrderIdForAction(order.order_id);
                            setOrderStatus(true);
                            setIsOrderAction(true);
                            setIsAccept(true);
                          }}
                        >
                          Accept
                        </button>
                      </div>
                      <div className="col-lg-6">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => {
                            setOrderIdForAction(order.order_id);
                            setOrderStatus(false);
                            setIsOrderAction(true);
                            setIsAccept(false);
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      className={`btn ${
                        order.order_status === "Accepted"
                          ? "btn-temporary"
                          : order.order_status === "Processing"
                          ? "btn-warning"
                          : order.order_status === "In Transist" 
                          ? "btn-info"
                          : order.order_status === "Shipped"
                          ? "btn-primary"
                          : order.order_status === "Delivered"
                          ? "btn-success"
                          : order.order_status === "Rejected"
                          ? "btn-danger"
                          : null
                      }`}
                      disabled={order.order_status !== "Placed"}
                    >
                      {order.order_status}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SellerOrderTable;
