import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import FloatingAlert from "../../FloatingAlert/FloatingAlert";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import { Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import ClearIcon from "@mui/icons-material/Clear";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useLocation } from "react-router-dom";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";
import "./cart.css"

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  color: theme.palette.text.secondary,
}));

const ShoppingCart = () => {
  const BASE_URL = "http://127.0.0.1:8000/cart/";

  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubTotal] = useState(0);
  const [isCartEmpty, setIsCartEmpty] = useState(null);
  const [totalItems, setIsTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

  const isLoggedIn = useSelector(
    (state) => state.userAuth.isLoggedIn
  );

  const userRole = useSelector(
    (state) => state.userAuth.role
  )

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
        setIsLoading(true)
        const cartItemsResponse = await axios.get(`${BASE_URL}get-cart-item/`, {
          headers: {
            "content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (cartItemsResponse.status === 200) {
          if (cartItemsResponse.data.length === 0) {
            setIsLoading(false)
            setIsCartEmpty(true);
          } else {
            setIsCartEmpty(false);
            calculateSubTotal(cartItemsResponse.data);
            setCartItems(cartItemsResponse.data);
            setIsTotalItems(cartItemsResponse.data.length);
            setIsLoading(false)
          }
        }
      } catch (error) {
        setIsCartEmpty(true);
        setIsLoading(false)
      }
    };
    fetchData();
  }, []);

  if (isCartEmpty === null) {
    return null;
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
      setIsLoading(true)
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
        setIsLoading(false)
      }
    } catch (error) {
      setAlertData(error.response.data.message);
      setAlertEnable(true);
      setAlertSeverity("error");
      setIsLoading(false)
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
      setIsLoading(true)
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
        setIsLoading(false)
      }
    } catch (error) {
      setAlertData(error.response.data.message);
      setAlertEnable(true);
      setAlertSeverity("error");
      setIsLoading(false)
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
      setIsLoading(true)
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
        setIsLoading(false)
        deleteCartItem(cart_item_id);
      }
    } catch (error) {
      setAlertData(error.response.data.message);
      setAlertEnable(true);
      setAlertSeverity("error");
      setIsLoading(false)
    }
  };

  const formatAmountWithRupeeSymbol = (amountStr) => {
    const amount = parseInt(amountStr);
    if (typeof amount !== "number" || isNaN(amount)) {
      return 0;
    }
    const formattedAmount = amount.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      style: "currency",
      currency: "INR",
    });

    return formattedAmount;
  };

  const OnCheckOut = async () => {
    try {
      setIsLoading(true)
      const orderCreateResponse = await axios.post(
        `http://127.0.0.1:8000/order/create-multiple-order/`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (orderCreateResponse.status === 201) {
        setIsLoading(false)
        console.log(orderCreateResponse);
        sessionStorage.setItem("order_id", orderCreateResponse.data);
        navigate("/checkout");
      }
    } catch (error) {
      setAlertData(error.response.data.message);
      setAlertEnable(true);
      setAlertSeverity("error");
      setIsLoading(false)
    }
  };

  const slicedString = (sentence) => {
    String(sentence).slice(0, 25).replace();
  };

  return (
    <>
      <FloatingAlert
        message={alertData}
        severity={alertSeverity}
        enable={alertEnable}
        setEnable={setAlertEnable}
      />
      <Backdrop
        open={isLoading}
      >
        <CircularProgress></CircularProgress>
      </Backdrop>
      {isCartEmpty || !isLoggedIn || userRole !== "Customer" ? (
        <>
          <div className="container d-flex justify-content-center align-items-center mt-5 pt-5">
            <Item style={{ padding: "50px" }}>
              {isLoggedIn ? (
                <CancelPresentationIcon
                  style={{
                    height: "40px",
                    width: "40px",
                    color: "#092635",
                    marginLeft: "65px",
                    marginBottom: "10px",
                  }}
                />
              ) : null}
              <h2 className="text-center h2 mb-5">
                {isLoggedIn ? "Empty Cart" : "Sign in to view cart"}
              </h2>
              <Button
                to={isLoggedIn ? "/" : "/customer-login"}
                onClick={() => {
                  navigate(isLoggedIn ? "/" : "/customer-login");
                }}
                variant="contained"
                style={{alignItems: "center"}}
              >
                {" "}
                {isLoggedIn ? "Continue Shopping" : "Sign In"}
              </Button>
            </Item>
          </div>
        </>
      ) : (
        <div
          className="container-fluid"
          id="cart-container"
        >
          <div className="row">
            <div className="col-lg-9 mb-3 col-md-12">
              <Item>
                <div className="container-fluid">
                  <p>/cart</p>
                  {cartItems.map((item) => (
                    <><hr></hr>
                    <div className="row m-3">
                      <div className="col-sm-3">
                        <img
                          src={`http://127.0.0.1:8000${item.unit.product.thumbnail}/`}
                          alt={item.unit.product.name}
                          width="100px"
                        />
                      </div>
                      <div className="col-sm-5">
                        <p className="text-dark">{`${item.unit.product.brand} ${item.unit.product.name} ${item.unit.variant.variation} ${item.unit.color_code.color}`}</p>
                        <h6 className="h6 text-dark">
                          {formatAmountWithRupeeSymbol(item.item_price)}
                        </h6>
                      </div>
                      <div className="col-sm-2">
                        <div className="d-flex justify-content-center align-items-center" id="add-container">
                          <IconButton
                            onClick={() => handleDecrementCart(item.id)}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <h6
                            className="h6 text-dark"
                          >
                            {item.quantity}
                          </h6>

                          <IconButton
                            onClick={() => handleIncrementCart(item.id)}
                          >
                            <AddIcon />
                          </IconButton>
                        </div>
                      </div>
                      <div className="col-sm-2">
                      <IconButton onClick={() => handleDeleteItem(item.id)}>
                            <ClearIcon />
                          </IconButton>
                      </div>
                    </div>
                    <hr></hr>
                    </>
                  ))}
                </div>
                
              </Item>
            </div>
            <div className="col-lg-3 col-md-12">
              <Item>
                <div className="pb-3">
                  {" "}
                  <h6>Subtotal</h6>
                  <h5 className="h5 text-dark">
                    {formatAmountWithRupeeSymbol(subtotal)}
                  </h5>
                </div>
                <div>
                  <Button
                    variant="contained"
                    startIcon={<CurrencyRupeeIcon />}
                    onClick={OnCheckOut}
                    style={{ marginBottom: "20px", backgroundColor: "#16213E", marginRight: "10px" }}
                  >
                    Place Order
                  </Button>
                  <Button
                    variant="outlined"
                    endIcon={<StoreIcon />}
                    onClick={() => navigate("/")}
                    style={{
                      marginBottom: "20px",
                      borderColor: "#16213E",
                      color: "#16213E",
                    }}
                  >
                    <Link style={{ color: "#16213E" }}>Return</Link>
                  </Button>
                </div>
              </Item>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShoppingCart;
