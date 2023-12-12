import React from "react";
import { Icon } from '@mui/material';
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import FloatingAlert from "../FloatingAlert/FloatingAlert";
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
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';


const ShoppingCart = () => {
  const BASE_URL = "http://127.0.0.1:8000/cart/";

  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubTotal] = useState(0);
  const [isCartEmpty, setIsCartEmpty] = useState(null);
  const [totalItems, setIsTotalItems] = useState(0);
  const navigate = useNavigate();
  const location = useLocation()
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(3),
    color: theme.palette.text.secondary,
  }));

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
        setIsCartEmpty(true);
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
    try {
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
        console.log(orderCreateResponse);
        sessionStorage.setItem("order_id", orderCreateResponse.data);
        navigate("/checkout");
      }
    } catch (error) {
      setAlertData(error.response.data.message);
      setAlertEnable(true);
      setAlertSeverity("error");
    }
  };

  return (
    <>
      <FloatingAlert
        message={alertData}
        severity={alertSeverity}
        enable={alertEnable}
        setEnable={setAlertEnable}
      />
      {isCartEmpty || !isLoggedIn ? (
        <>
          <div className="container d-flex justify-content-center align-items-center mt-5 pt-5">
              <Item style={{padding: "50px"}}>
                  {isLoggedIn ? <CancelPresentationIcon style={{height: "40px", width: "40px", color: "#092635", marginLeft: "65px", marginBottom: "10px"}} /> : null }
                <h2 className="text-center h2 mb-5">
                  {isLoggedIn ? "Empty Cart" : "Login Now"}
                </h2>
                <Button
                  to={isLoggedIn ? "/" : "/customer-login"}
                  onClick={() => {navigate(isLoggedIn ? "/" : "customer-login")}}
                  variant="contained"
                >
                  {" "}
                  {isLoggedIn ? "Continue Shopping" : "Login now"}
                </Button>
                </Item>
            </div>
        </>
      ) : (
        <div
          className="container-fluid"
          style={{ width: "83%", marginTop: "84px" }}
        >
          <div className="row">
            <div className="col-lg-9">
              <Item style={{height: "80vh", overflow:"scroll", padding: "30px"}}>
                <h3 className="h3 text-center">Items</h3>
                <table className="table table-hover">
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
                          <h5  className="h6">{`${item.unit.product.brand} ${item.unit.product.name} ${item.unit.variant.variation} ${item.unit.color_code.color}`}</h5>
                        </td>
                        <td>
                          <h5 className="h6">
                            {formatAmountWithRupeeSymbol(item.item_price)}
                          </h5>
                        </td>
                        <td className="quantity-cell">
                          <div className="d-flex justify-content-center align-items-center">
                            <IconButton
                              onClick={() => handleDecrementCart(item.id)}
                            >
                              <RemoveIcon />
                            </IconButton>
                            <Typography
                              variant="h5"
                              component="h5"
                              style={{ fontWeight: "bolder" }}
                            >
                              {item.quantity}
                            </Typography>

                            <IconButton
                              onClick={() => handleIncrementCart(item.id)}
                            >
                              <AddIcon />
                            </IconButton>
                          </div>
                        </td>
                        <td>
                          <div className="text-right">
                            <IconButton
                              onClick={() => handleDeleteItem(item.id)}
                            >
                              <ClearIcon />
                            </IconButton>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Item>
            </div>
            <div className="col-lg-3">
              <Item>
                <div className="pb-3">
                  {" "}
                  <h4>Subtotal</h4>
                  <h1 className="h1">
                    {formatAmountWithRupeeSymbol(subtotal)}
                  </h1>
                </div>
                <div>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<CurrencyRupeeIcon />}
                    onClick={OnCheckOut}
                    style={{marginBottom: "20px"}}
            
                  >
                    CheckOut
                  </Button>
                  <Button
                    variant="text"
                    endIcon={<StoreIcon />}
                    onClick={() => navigate("/")}
                  >
                    <Link>Continue Shopping</Link>
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
