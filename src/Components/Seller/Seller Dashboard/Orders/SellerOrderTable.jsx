import React, { useEffect, useState } from "react";
import axios from "axios";
import FloatingAlert from "../../../FloatingAlert/FloatingAlert";
import { Link } from "react-router-dom";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import OrderModal from "./OrderModal";

const SellerOrderTable = ({ setExists }) => {
  const token = localStorage.getItem("token");
  const BASE_URL = "http://127.0.0.1:8000/order/";
  const [orders, setOrders] = useState([]);

  const [isOrderAction, setIsOrderAction] = useState(false);
  const [orderIdForAction, setOrderIdForAction] = useState();
  const [isAccept, setIsAccept] = useState(null);

  const [alertData, setAlertData] = useState("");
  const [alertEnable, setAlertEnable] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("");

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const orderResponse = await axios.get(`${BASE_URL}get-seller-orders/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setLoading(false)
        if (orderResponse.data.length === 0) {
          setExists(false);
        }
        console.log(orderResponse);
        setExists(true);
        setOrders(orderResponse.data);
      } catch (error) {
        setLoading(false)
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
      newOrders[orderIndex].status = status;
      setOrders(newOrders);
    }
  };

  const handleAccept = async (order_id) => {
    try {
      const orderUpdateResponse = await axios.patch(
        `${BASE_URL}order-accept-or-reject/`,
        {
          order_id: order_id,
          status: "Accepted",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (orderUpdateResponse.status === 200) {
        updateOrderStatus(order_id, "CONFIRMED");
        setIsOrderAction(false);
      }
    } catch (error) {
      setIsOrderAction(false);
      setAlertData(error.response.data.message);
      setAlertEnable(true);
      setAlertSeverity("error");
    }
  };

  const handleReject = async (order_id) => {
    try {
      const orderUpdateResponse = await axios.patch(
        `${BASE_URL}order-accept-or-reject/`,
        {
          order_id: order_id,
          status: "Reject",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (orderUpdateResponse.status === 200) {
        updateOrderStatus(order_id, "REJECTED");
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
      <Backdrop>
        <CircularProgress/>
      </Backdrop>
      <div className="table-responsive">
        <table className="table table-striped table-light table-hover table-borderless border-dark m-0 p-0">
          <thead className="table-success">
            <tr>
              <th scope="col" className="h5 text-center">
                Product Name
              </th>
              <th scope="col" className="h5 text-center">
                Customer
              </th>
              <th scope="col" className="h5 text-center">
                Destination
              </th>
              <th scope="col" className="h5 text-center">
                Placed On
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
                <td className="h6">
                  {formatAmountWithRupeeSymbol(
                    order.item.product_price - order.item.original_price
                  )}
                </td>
                <td className="text-center">
                  {order.status === "PLACED" ? (
                    <div className="row m-0 p-0">
                      <div className="col-lg-6">
                        <Button
                          variant="text"
                          onClick={() => {
                            handleAccept(order.order_id);
                          }}
                        >
                          Accept
                        </Button>
                      </div>
                      <div className="col-lg-6">
                        <Button
                          variant="text"
                          onClick={() => {
                            handleReject(order.order_id);
                          }}
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h6 className="h6 text-dark">{order.status}</h6>
                    </div>
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
