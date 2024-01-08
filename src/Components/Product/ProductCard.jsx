import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FloatingAlert from "../FloatingAlert/FloatingAlert";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";

const Container = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const ProductCard = (props) => {
  const BASE_URL = "http://127.0.0.1:8000/cart/";

  const sm = window.matchMedia("(max-width: 767px)");
  const md = window.matchMedia("(max-width: 992px)");
  const lg = window.matchMedia("(max-width: 1400px");

  const [isLoading, setIsLoading] = useState(false)

  const isLoggedIn = useSelector(
    (state) => state.customerAuth.isCustomerLoggedIn
  );

  const navigate = useNavigate();

  const [smallMedia, setSmallMedia] = useState(null);
  const [mediumMedia, setMediumMedia] = useState(null);
  const [largeMedia, setLargeMedia] = useState(null);

  const [alertData, setAlertData] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertEnable, setAlertEnable] = useState(false);

  const checkMedia = () => {
    if (sm.matches) {
      setSmallMedia(true);
    } else {
      setSmallMedia(false);
    }

    if (md.matches) {
      setMediumMedia(true);
    } else {
      setMediumMedia(false);
    }

    if (lg.matches) {
      setLargeMedia(true);
    } else {
      setLargeMedia(false);
    }
  };

  const ResponsiveImage = () => {
    const laptopImages = document.getElementsByClassName("Laptops");
    const PhoneImages = document.getElementsByClassName("Mobiles");
    const CameraImages = document.getElementsByClassName("Cameras");

    for (let element of laptopImages) {
      if (sm.matches) {
        element.style.width = "160px";
      } else if (md.matches) {
        element.style.width = "200px";
      } else if (lg.matches) {
        element.style.width = "240px";
      } else {
        element.style.width = "300px";
      }
    }

    for (let element of PhoneImages) {
      if (sm.matches) {
        element.style.width = "160px";
      } else if (md.matches) {
        element.style.width = "200px";
      } else if (lg.matches) {
        element.style.width = "240px";
      } else {
        element.style.width = "300px";
      }
    }

    for (let element of CameraImages) {
      if (sm.matches) {
        element.style.width = "160px";
      } else if (md.matches) {
        element.style.width = "200px";
      } else if (lg.matches) {
        element.style.width = "240px";
      } else {
        element.style.width = "300px";
      }
    }
  };

  useEffect(() => {
    checkMedia();
    ResponsiveImage();
  });

  window.addEventListener("resize", () => {
    checkMedia();
    ResponsiveImage();
  });

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
      setIsLoading(true)
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
            setIsLoading(false)
          }
        } catch (error) {
          setAlertData(error.response.data.message);
          setAlertEnable(true);
          setAlertSeverity("error");
          setIsLoading(false)
        }
      }
    } catch (error) {
      setAlertData(error.response.data.message);
      setAlertEnable(true);
      setAlertSeverity("info");
      setIsLoading(false)
    }
  };

  const formatAmountWithRupeeSymbol = (amount) => {
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

  const handleBuyNow = async () => {
    if (!isLoggedIn) {
      setAlertData("Login FIrst");
      setAlertEnable(true);
      setAlertSeverity("error");
      return;
    }

    if (props.stock <= 0) {
      setAlertData("Item out of stock");
      setAlertEnable(true);
      setAlertSeverity("error");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      setIsLoading(true)
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
      if (orderCreateResponse.status === 201) {
        console.log(orderCreateResponse);
        sessionStorage.setItem("order_id", orderCreateResponse.data.order_id);
        setIsLoading(false)
        navigate("/checkout");
      }
    } catch (error) {
      setAlertData(error.response.data.message);
      setAlertEnable(true);
      setAlertSeverity("error");
      setIsLoading(false)
    }
  };

  if (smallMedia === null && largeMedia === null && mediumMedia === null) {
    return null;
  }

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
      <Container>
        <div className="media align-items-lg-center flex-column flex-lg-row">
          <div className="container-fluid">
            <div className="row mb-3">
              <div
                className={`col-lg-6 col-md-6 col-sm-6 col-xs-12 ${
                  smallMedia &&
                  "mb-3 d-flex justify-content-center align-items-center"
                }`}
              >
                <img
                  src={`${props.thumbnail}`}
                  alt={`${props.thumbnail}`}
                  // style={
                  //   props.mainCategory === "Laptops" && smallMedia
                  //     ? { width: "160x", height: "122px" }
                  //     : props.mainCategory === "Laptops" && mediumMedia
                  //     ? { width: "192", height: "144" }
                  //     : props.mainCategory === "Laptops" && largeMedia
                  //     ? { width: "224", height: "168" }
                  //     : { width: "224", height: "168" }
                  // }
                  className={props.mainCategory}
                />
              </div>
              <div
                className={`col-lg-6 col-md-6 col-sm-6 col-xs-6 ${
                  smallMedia && "d-none"
                }`}
              >
                <div className="row">
                  <div className="col-lg-12">
                    <p className="text-dark" >{props.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="media-body order-2 order-lg-2 ml-lg-5 ml-md-5">
            <Link to={`/product/${props.slug}/`} onClick={handleLinkClick}>
              {" "}
              <h5 className="text-dark h5 mb-3">
                {`${props.name} ${props.variant} ${props.color}`}
              </h5>
            </Link>
            <h5>
              <span className="text-decoration-line-through h5 text-dark">
                {formatAmountWithRupeeSymbol(props.sellingPrice)}
              </span>{" "}
              <span className="product_price price-new h4 text-dark">
                {formatAmountWithRupeeSymbol(props.offerPrice)}{" "}
              </span>
            </h5>

            <hr className="seperator" />
            <div
              className={`justify-content-start d-flex ${
                smallMedia ? "d-flex justify-content-around" : ""
              }`}
            >
              <Button
                variant="contained"
                onClick={handleAddToCart}
                endIcon={<ShoppingCartIcon />}
                style={
                  smallMedia
                    ? { marginBottom: "20px", backgroundColor: "#16213E" }
                    : { backgroundColor: "#16213E", marginRight: "50px" }
                }
              >
                Add To Cart
              </Button>
              <Button
                variant="contained"
                style={
                  smallMedia
                    ? { marginBottom: "20px", backgroundColor: "#16213E" }
                    : { backgroundColor: "#16213E" }
                }
                endIcon={<ShoppingBagIcon />}
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ProductCard;
