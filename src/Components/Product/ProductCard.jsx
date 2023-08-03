import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FloatingAlert from "../FloatingAlert/FloatingAlert";
import { useSelector } from "react-redux/es/hooks/useSelector";

const ProductCard = (props) => {


  const BASE_URL = "http://127.0.0.1:8000/cart/";
  const [alertData, setAlertData] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertEnable, setAlertEnable] = useState(false);
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state) => state.customerAuth.isCustomerLoggedIn)

  const handleLinkClick = () => {
    localStorage.setItem("item_id", props.unit_id);
  };

  const handleAddToCart = async () => {

    if (!isLoggedIn) {
      setAlertData("Login FIrst");
      setAlertEnable(true);
      setAlertSeverity("error");
      return;
    }

    const token = localStorage.getItem("token");
        try {
          const inCartResponse = await axios.get(
            `${BASE_URL}item-in-cart/${props.unit_id}/`,
            {
              headers: {
                "content-Type": "Application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (inCartResponse.status === 200) {
            try {
              const addToCartResponse = await axios.post(
                `${BASE_URL}add-to-cart/`,
                {
                  product_id: props.key,
                  quantity: 1,
                  unit_id: props.unit_id,
                },
                {
                  headers: {
                    "content-Type": "Application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              if (addToCartResponse.status === 201) {
                setAlertData("Item Added to the cart");
                setAlertEnable(true);
                setAlertSeverity("success");
              }
            } catch (error) {
              setAlertData(error.response.data.message);
              setAlertEnable(true);
              setAlertSeverity("error");
            }
          }
        } catch (error) {
          setAlertData(error.response.data.message);
          setAlertEnable(true);
          setAlertSeverity("info");
        }
  };

  const formatAmountWithRupeeSymbol = (amount) => {
    if (typeof amount !== 'number' || isNaN(amount)) {
      return 'Invalid Amount';
    }
    const formattedAmount = amount.toLocaleString('en-IN', {
      maximumFractionDigits: 2,
      style: 'currency',
      currency: 'INR',
    });
  
    return formattedAmount;
  };

    const handleBuyNow = async () => {
      if (!isLoggedIn) {
        setAlertData("Login FIrst");
        setAlertEnable(true);
        setAlertSeverity("error");
        return;
      }
  
      if (props.stock <= 0){
        setAlertData("Item out of stock");
        setAlertEnable(true);
        setAlertSeverity("error");
        return;
      }
      const token = localStorage.getItem('token')
      try {
        const orderCreateResponse = await axios.post(
          `http://127.0.0.1:8000/order/create-single-order/`,
          {
            unit_id: props.unit_id,
            quantity: 1,
          },
          {
            headers: {
              "content-Type": "Application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (orderCreateResponse.status === 201){
          console.log(orderCreateResponse)
          sessionStorage.setItem("order_id", orderCreateResponse.data.order_id)
          navigate("/checkout")
        }
      } catch (error) {
        setAlertData(error.response.data.message);
        setAlertEnable(true);
        setAlertSeverity("error");
      }
    };

  return (
    <div className="container py-5">
      <FloatingAlert
        message={alertData}
        severity={alertSeverity}
        enable={alertEnable}
        setEnable={setAlertEnable}
      />
      <div className="row bg-primary p-1">
        <div className="col-lg-12 m-0 p-0">
          <ul className="list-group shadow">
            <li className="list-group-item">
              <div className="media align-items-lg-center flex-column flex-lg-row">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-6">
                      <img
                        src={`${props.thumbnail}`}
                        alt="Generic placeholder image"
                        style={
                          props.mainCategory === "Laptops"
                            ? { width: "400px", height: "300px" }
                            : { width: "200px", height: "300px" }
                        }
                        className="order-1 order-lg-1"
                      />
                    </div>
                    <div className="col-lg-6 d-flex align">
                      <div className="row">
                        <div className="col-lg-12">
                          <p>{props.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="media-body order-2 order-lg-2 ml-lg-5">
                  <Link
                    to={`/product/${props.slug}/`}
                    onClick={handleLinkClick}
                  >
                    {" "}
                    <h5 className="mt-0 mb-1">
                      {`${props.name} ${props.variant} ${props.color}`}
                    </h5>
                  </Link>

                  <h5>
                    <span className="text-decoration-line-through">
                      {formatAmountWithRupeeSymbol(props.sellingPrice)}
                    </span>{" "}
                    <span className="product_price price-new">
                      {formatAmountWithRupeeSymbol(props.offerPrice)}{" "}
                    </span>
                  </h5>

                  <hr className="mb-2 mt-1 seperator" />
                  <div className="d-flex align-items-center justify-content-between mt-1">
                    <ul className="list-inline small w-50">
                      <div className="row">
                        <div className="col-lg-6">
                          <button
                            className="btn btn-outline-warning"
                            onClick={handleAddToCart}
                          >
                            Add To Cart
                          </button>
                        </div>
                        <div className="col-lg-6">
                          <button className="btn btn-outline-info" onClick={handleBuyNow}>
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
