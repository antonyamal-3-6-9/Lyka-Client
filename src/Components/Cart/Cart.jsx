import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faTrash,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import FloatingAlert from "../FloatingAlert/FloatingAlert";
import { useSelector } from "react-redux";

const ShoppingCart = () => {
  const BASE_URL = "http://127.0.0.1:8000/cart/";

  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubTotal] = useState(0);
  const [isCartEmpty, setIsCartEmpty] = useState(null);
  const [totalItems, setIsTotalItems] = useState(0);
  const navigate = useNavigate();

  const isLoggedIn = useSelector(
    (state) => state.customerAuth.isCustomerLoggedIn
  );

  const [alertData, setAlertData] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertEnable, setAlertEnable] = useState(false);

  const token = localStorage.getItem("token");

  const calculateSubTotal = (data) => {
    let total = 0;
    data.map((item) => {
      total = parseInt(total) + parseInt(item.item_price);
    });
    setSubTotal(total);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartItemsResponse = await axios.get(`${BASE_URL}get-cart-item/`, {
          headers: {
            "content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (cartItemsResponse.status === 200) {
          if (cartItemsResponse.data.length === 0) {
            setIsCartEmpty(true);
          } else {
            setIsCartEmpty(false);
            calculateSubTotal(cartItemsResponse.data);
            setCartItems(cartItemsResponse.data);
            setIsTotalItems(cartItemsResponse.data.length);
          }
        }
      } catch (error) {
          setIsCartEmpty(true)
      }
    };
    fetchData();
  }, []);

  if(isCartEmpty === null){
    return null
  }

  const incrementCart = (cart_item_id) => {
    const newItems = [...cartItems];
    const itemIndex = cartItems.findIndex((item) => item.id === cart_item_id);
    if (itemIndex !== -1) {
      const oldQuantity = newItems[itemIndex].quantity;
      const oldPrice = newItems[itemIndex].item_price;

      const newQuantity = parseInt(oldQuantity) + 1;
      const newPrice =
        (parseInt(oldPrice) / parseInt(oldQuantity)) * parseInt(newQuantity);

      newItems[itemIndex].quantity = newQuantity;
      newItems[itemIndex].item_price = newPrice;
    }
    calculateSubTotal(newItems);
    setCartItems(newItems);
  };

  const handleIncrementCart = async (cart_item_id) => {
    try {
      const incrementResponse = await axios.patch(
        `${BASE_URL}increment-cart/${cart_item_id}/`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (incrementResponse.status === 200) {
        incrementCart(cart_item_id);
      }
    } catch (error) {
      setAlertData(error.response.data.message);
      setAlertEnable(true);
      setAlertSeverity("error");
    }
  };

  const decrementCart = (cart_item_id) => {
    const newItems = [...cartItems];
    const itemIndex = cartItems.findIndex((item) => item.id === cart_item_id);
    if (itemIndex !== -1) {
      const oldQuantity = newItems[itemIndex].quantity;
      const oldPrice = newItems[itemIndex].item_price;

      const newQuantity = parseInt(oldQuantity) - 1;
      const newPrice =
        (parseInt(oldPrice) / parseInt(oldQuantity)) * parseInt(newQuantity);

      newItems[itemIndex].quantity = newQuantity;
      newItems[itemIndex].item_price = newPrice;
    }
    calculateSubTotal(newItems);
    setCartItems(newItems);
  };

  const handleDecrementCart = async (cart_item_id) => {
    try {
      const decrementResponse = await axios.patch(
        `${BASE_URL}decrement-cart/${cart_item_id}/`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (decrementResponse.status === 200) {
        decrementCart(cart_item_id);
      }
    } catch (error) {
      setAlertData(error.response.data.message);
      setAlertEnable(true);
      setAlertSeverity("error");
    }
  };

  const deleteCartItem = (cart_item_id) => {
    const newItems = cartItems.filter((item) => item.id !== cart_item_id);
    if (newItems.length === 0) {
      setIsCartEmpty(true);
    }
    calculateSubTotal(newItems);
    setCartItems(newItems);
  };

  const handleDeleteItem = async (cart_item_id) => {
    try {
      const decrementResponse = await axios.delete(
        `${BASE_URL}delete-cart-item/${cart_item_id}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (decrementResponse.status === 200) {
        deleteCartItem(cart_item_id);
      }
    } catch (error) {
      setAlertData(error.response.data.message);
      setAlertEnable(true);
      setAlertSeverity("error");
    }
  };

  const formatAmountWithRupeeSymbol = (amountStr) => {
    const amount = parseInt(amountStr);
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

  const OnCheckOut = async () => {
    try{
      const orderCreateResponse = await axios.post(`http://127.0.0.1:8000/order/create-multiple-order/`, {}, {
        headers : {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      })
      if (orderCreateResponse.status === 201){
        console.log(orderCreateResponse)
        sessionStorage.setItem('order_id', orderCreateResponse.data)
        navigate("/checkout")
      }
    } catch (error) {
      setAlertData(error.response.data.message);
      setAlertEnable(true);
      setAlertSeverity("error");
    }
  };

  return (
    <div className="container-fluid w-75 mt-5 p-5">
      <FloatingAlert
        message={alertData}
        severity={alertSeverity}
        enable={alertEnable}
        setEnable={setAlertEnable}
      />
      {isCartEmpty || !isLoggedIn ? (
        <>
          <div className="container d-flex justify-content-center align-items-center mt-5 pt-5">
            <div className="row">
            <div className="card p-5">
              <h2 className="text-center">
                {isLoggedIn ? "Cart is empty" : "Login to view your cart"}
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
        </>
      ) : (
        
        <div className="card p-5">
          <h3 className="display-4  text-center ">My Cart</h3>
          <p className="text-center">
            <i className="text-info font-weight-bold">{totalItems}</i>{" "}
            {`${totalItems === 1 ? "item" : "items"} in your cart`}
          </p>
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th style={{ width: "10%" }}>Thumbnail</th>
                    <th style={{ width: "30%" }}>Product</th>
                    <th style={{ width: "12%" }}>Price</th>
                    <th style={{ width: "10%" }}>Quantity</th>
                    <th style={{ width: "18%" }}>Remove</th>
                  </tr>
                </thead>

                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img
                          src={`http://127.0.0.1:8000/${item.unit.product.thumbnail}/`}
                          alt={item.unit.product.name}
                          style={{ width: "100px", height: "auto" }}
                        />
                      </td>
                      <td>
                        <h5>{`${item.unit.product.brand} ${item.unit.product.name} ${item.unit.variant.variation} ${item.unit.color_code.color}`}</h5>
                      </td>
                      <td>
                        <h5>{formatAmountWithRupeeSymbol(item.item_price)}</h5>
                      </td>
                      <td className="quantity-cell">
                        <div className="d-flex justify-content-center align-items-center">
                          <button
                            className="btn btn-outline-dark btn-sm mr-2"
                            onClick={() => handleDecrementCart(item.id)}
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </button>
                          <span className="display-6">{item.quantity}</span>
                          <button
                            className="btn btn-outline-dark btn-sm ml-2"
                            onClick={() => handleIncrementCart(item.id)}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className="text-right">
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => handleDeleteItem(item.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="float-right text-right">
                <h4>Subtotal:</h4>
                <h1>{formatAmountWithRupeeSymbol(subtotal)}</h1>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-sm-6 order-md-2 text-right">
              <button className="btn btn-outline-success" onClick={OnCheckOut}>Checkout</button>
            </div>
            <div className="col-sm-6 mb-3 mb-m-1 order-md-1 text-md-left">
              <Link to="/" className="btn btn-outline-primary">
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Continue
                Shopping
              </Link>
            </div>
          </div>
        </div>
     
      )}
    </div>
  );
};

export default ShoppingCart;
