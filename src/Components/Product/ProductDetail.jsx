import React from "react";
import "../Product/product.scss";
import { useEffect } from "react";
import { useState } from "react";
import axios, { AxiosHeaders } from "axios";
import ImageGallery from "./ProductImage";
import { Link, useNavigate } from "react-router-dom";
import FloatingAlert from "../FloatingAlert/FloatingAlert";
import { useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Button, Divider } from "@mui/material";
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

const ProductDetail = () => {
  const [unit, setUnit] = useState({});
  const [color, setColor] = useState();
  const [variation, setVariation] = useState();
  const [similar, setSimilar] = useState();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const BASE_URL = "http://127.0.0.1:8000/product/";

  const [alertData, setAlertData] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertEnable, setAlertEnable] = useState(false);

  const isLoggedIn = useSelector((state) => state.userAuth.isLoggedIn);

  const similarProducts = async (mainId) => {
    try {
      const similarResponse = await axios.get(
        `${BASE_URL}get-items/main/${mainId}/`
      );
      if (similarResponse.status === 200) {
        setSimilar(similarResponse.data);
      }
    } catch (error) {
      alert("Error fetching products");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const item_id = localStorage.getItem("item_id");
      try {
        setIsLoading(true);
        const productResponse = await axios.get(
          `${BASE_URL}get-item-details/${item_id}/`
        );
        if (productResponse.status === 200) {
          setUnit(productResponse.data);
          setColor(productResponse.data.color_code.id);
          setVariation(productResponse.data.variant.id);
          similarProducts(productResponse.data.product.main_category.main_id);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchData();
    window.addEventListener("popstate", () => {
      navigate(-1);
    });
  }, []);

  const handleColorClick = async (color_id) => {
    try {
      const is_variant_color = "color";
      setIsLoading(true);
      const colorResponse = await axios.get(
        `${BASE_URL}color-or-variation-exists/${unit.seller}/${unit.product.productId}/${color_id}/${variation}/${is_variant_color}/`
      );
      if (colorResponse.status === 200) {
        setUnit(colorResponse.data);
        setColor(colorResponse.data.color_code.id);
        setIsLoading(false);
        navigate(`/product/${colorResponse.data.slug}/`);
      }
    } catch (error) {
      setAlertData("Given color not available");
      setAlertEnable(true);
      setAlertSeverity("error");
      setIsLoading(false);
    }
  };

  const handleVariantClick = async (variant_id) => {
    try {
      setIsLoading(true);
      const is_variant_color = "variant";
      const variantResponse = await axios.get(
        `${BASE_URL}color-or-variation-exists/${unit.seller}/${unit.product.productId}/${color}/${variant_id}/${is_variant_color}/`
      );
      if (variantResponse.status === 200) {
        setUnit(variantResponse.data);
        setVariation(variantResponse.data.variant.id);
        navigate(`/product/${variantResponse.data.slug}/`);
        setIsLoading(false);
      }
    } catch (error) {
      setAlertData("Given variant not available");
      setAlertEnable(true);
      setAlertSeverity("error");
      setIsLoading(false);
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

  const handleAddToCart = async (unit_id) => {
    if (!isLoggedIn) {
      setAlertData("Login FIrst");
      setAlertEnable(true);
      setAlertSeverity("error");
      return;
    }

    if (unit.stock <= 0) {
      setAlertData("Item out of stock");
      setAlertEnable(true);
      setAlertSeverity("error");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      setIsLoading(true);
      const inCartResponse = await axios.get(
        `http://127.0.0.1:8000/cart/item-in-cart/${unit_id}/`,
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
            `http://127.0.0.1:8000/cart/add-to-cart/`,
            {
              quantity: 1,
              unit_id: unit_id,
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
            setIsLoading(false);
          }
        } catch (error) {
          setAlertData(error.response.data.message);
          setAlertEnable(true);
          setAlertSeverity("error");
          setIsLoading(false);
        }
      }
    } catch (error) {
      setAlertData(error.response.data.message);
      setAlertEnable(true);
      setAlertSeverity("info");
      setIsLoading(false);
    }
  };

  const handleBuyNow = async () => {
    const token = localStorage.getItem("token");
    if (!isLoggedIn) {
      setAlertData("Login FIrst");
      setAlertEnable(true);
      setAlertSeverity("error");
      return;
    }

    if (unit.stock <= 0) {
      setAlertData("Item out of stock");
      setAlertEnable(true);
      setAlertSeverity("error");
      return;
    }

    try {
      setIsLoading(true);
      const orderCreateResponse = await axios.post(
        `http://127.0.0.1:8000/order/create-single-order/`,
        {
          unit_id: unit.unit_id,
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
        sessionStorage.setItem("order_id", orderCreateResponse.data.order_id);
        setIsLoading(false);
        navigate("/checkout");
      }
    } catch (error) {
      setAlertData(error.response.data.message);
      setAlertEnable(true);
      setAlertSeverity("error");
      setIsLoading(false);
    }
  };

  if (!unit.product || !similar) {
    return null;
  }

  return (
    <>
      <div className="container-fluid" style={{ marginTop: "84px" }}>
        <FloatingAlert
          message={alertData}
          severity={alertSeverity}
          enable={alertEnable}
          setEnable={setAlertEnable}
        />
        <Backdrop open={isLoading}>
          <CircularProgress />
        </Backdrop>
        <Container>
          <div className="row w-100">
            <div className="col-lg-6">
              <div style={{ position: "sticky", top: "83px" }}>
                <div className="main-img">
                  <ImageGallery images={unit.product.images} />
                </div>
              </div>
            </div>
            <div className="col-lg-1">
            <Divider orientation="vertical"></Divider>
            </div>
            <div className="col-lg-5">
              <div id="details-section">
                <div className="main-description px-2">
                  <p className="category text-dark">{`${unit.product.root_category.name}/${unit.product.main_category.name}/${unit.product.sub_category.name}`}</p>
                  <h6 className="text-dark h5">
                    {`${unit.product.brand} ${unit.product.name} ${unit.variant.variation} ${unit.color_code.color}`}
                  </h6>
                  <div className="price-area my-4">
                    <p
                      className={`text-dark ${
                        unit.stock <= 0 ? "text-danger" : null
                      }`}
                    >
                      {unit.stock <= 0
                        ? "Out of stock"
                        : `Only ${unit.stock} left`}
                    </p>
                    <h6 className="h6 text-dark mb-1">
                      <del>
                        {formatAmountWithRupeeSymbol(unit.selling_price)}
                      </del>
                    </h6>
                    <h5 className="h5 text-dark mb-1">
                      {formatAmountWithRupeeSymbol(unit.offer_price)}
                    </h5>
                    <p className="text-dark mb-1 mt-2">
                      (Additional tax may apply on checkout)
                    </p>
                  </div>
                  <div className="buttons d-flex mb-3">
                    <div className="block">
                      <Button
                        variant="contained"
                        startIcon={<ShoppingBagIcon />}
                        onClick={handleBuyNow}
                        style={{
                          marginRight: "10px",
                          backgroundColor: "#16213E",
                        }}
                      >
                        Buy Now
                      </Button>
                    </div>
                    <div className="block">
                      <Button
                        variant="contained"
                        startIcon={<ShoppingCartIcon />}
                        onClick={() => handleAddToCart(unit.unit_id)}
                        style={{
                          marginRight: "10px",
                          backgroundColor: "#16213E",
                        }}
                      >
                        Add to cart
                      </Button>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="row">
                    <div className="container-fluid">
                      <div className="col-lg-12">
                        <div className="row mt-4">
                          {unit.product.colors.map((color) => (
                            <div className="col-lg-2">
                              <a
                                href="#"
                                onClick={() => handleColorClick(color.id)}
                                className={`disabled-link ${
                                  unit.color_code.id === color.id
                                    ? "disabled"
                                    : ""
                                }`}
                              >
                                <div
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50px",
                                    backgroundColor:
                                      unit.color_code.id === color.id
                                        ? "#16213E"
                                        : "white",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <div
                                    style={{
                                      backgroundColor: color.color,
                                      width: "25px",
                                      height: "25px",
                                      borderRadius: "150px",
                                    }}
                                  ></div>
                                </div>
                              </a>
                            </div>
                          ))}
                        </div>
                        <div className="row mt-4">
                          {unit.product.variations.map((variation) => (
                            <div
                              className="col-lg-12"
                              style={{
                                borderColor:
                                  unit.variant.id === variation.id
                                    ? "#16213E"
                                    : "white",
                              }}
                            >
                              <a
                                href="#"
                                onClick={() => handleVariantClick(variation.id)}
                                style={{ color: "black" }}
                                className={`disabled-link ${
                                  unit.variant.id === variation.id
                                    ? "disabled"
                                    : ""
                                }`}
                              >
                                <p className="h6 text-dark">
                                  {variation.variation}
                                </p>
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <h5 className="text-center mb-4 mt-4 h5 text-dark">
                        Key Features
                      </h5>
                      {Object.keys(unit.product.details.key_features).map(
                        (key) => (
                          <div className="row">
                            <div className="col-lg-4">
                              <span className="text-dark">{key}</span>
                            </div>
                            <div className="col-lg-1 d-flex justify-content-center">
                              <span className="text-dark h6">:</span>
                            </div>
                            <div className="col-lg-7">
                              <p className="text-dark h6">
                                {unit.product.details.key_features[key]}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                    <div className="col-lg-12">
                      <h5 className="text-center mb-4 h5 text-dark">
                        All Details
                      </h5>
                      {Object.keys(unit.product.details.all_details).map(
                        (key) => (
                          <div className="row">
                            <div className="col-lg-4">
                              <span className="text-dark">{key}</span>
                            </div>
                            <div className="col-lg-1">
                            <span className="h6 text-dark">:</span>
                            </div>
                            <div className="col-lg-7">
                              <p className="text-dark h6">
                                {unit.product.details.all_details[key]}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default ProductDetail;
