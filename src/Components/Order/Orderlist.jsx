import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import FloatingAlert from "../FloatingAlert/FloatingAlert";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Orderlist = () => {
  const [exists, setExists] = useState(null);
  const token = localStorage.getItem("token");
  const BASE_URL = "http://127.0.0.1:8000/order/";
  const [orders, setOrders] = useState([]);


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
                    src={`http://127.0.0.1:8000${order.item.product.thumbnail}`}
                    style={{ width: "75px" }}
                  />
                </div>
                <div className="col-lg-4 d-flex justify-content-center align-items-center">
                  <Link to={`/order/${order.order_id}`}>
                    <h6 className=" h6 listing text-dark">{`${order.item.product.brand} ${order.item.product.name} ${order.item.product_variant.variation} ${order.item.product_color.color}`}</h6>
                  </Link>
                </div>
                <div className="col-lg-2 d-flex justify-content-center align-items-center">
                  <p
                    className="listing text-dark"
                    style={{ fontSize: "0.95rem" }}
                  >
                    {formatAmountWithRupeeSymbol(order.item.product_price)}
                  </p>
                </div>
                <div className="col-lg-4 d-flex justify-content-center align-items-center">
                  <p className="listing text-dark">{order.status}</p>
                </div>
              </div>
            </div>
            <hr></hr>
          </>
        ))}
      </Item>
    </>
  );
};

export default Orderlist;
