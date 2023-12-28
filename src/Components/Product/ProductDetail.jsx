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
import { Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

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

  const BASE_URL = "http://127.0.0.1:8000/product/";

  const [alertData, setAlertData] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertEnable, setAlertEnable] = useState(false);

  const isLoggedIn = useSelector(
    (state) => state.customerAuth.isCustomerLoggedIn
  );

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
        const productResponse = await axios.get(
          `${BASE_URL}get-item-details/${item_id}/`
        );
        if (productResponse.status === 200) {
          setUnit(productResponse.data);
          setColor(productResponse.data.color_code.id);
          setVariation(productResponse.data.variant.id);
          similarProducts(productResponse.data.product.main_category.main_id);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleColorClick = async (color_id) => {
    try {
      const is_variant_color = "color";
      const colorResponse = await axios.get(
        `${BASE_URL}color-or-variation-exists/${unit.seller}/${unit.product.productId}/${color_id}/${variation}/${is_variant_color}/`
      );
      if (colorResponse.status === 200) {
        setUnit(colorResponse.data);
        setColor(colorResponse.data.color_code.id);
        navigate(`/product/${colorResponse.data.slug}/`);
      }
    } catch (error) {
      setAlertData("Given color not available");
      setAlertEnable(true);
      setAlertSeverity("error");
    }
  };

  const handleVariantClick = async (variant_id) => {
    try {
      const is_variant_color = "variant";
      const variantResponse = await axios.get(
        `${BASE_URL}color-or-variation-exists/${unit.seller}/${unit.product.productId}/${color}/${variant_id}/${is_variant_color}/`
      );
      if (variantResponse.status === 200) {
        setUnit(variantResponse.data);
        setVariation(variantResponse.data.variant.id);
        navigate(`/product/${variantResponse.data.slug}/`);
      }
    } catch (error) {
      setAlertData("Given variant not available");
      setAlertEnable(true);
      setAlertSeverity("error");
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
        navigate("/checkout");
      }
    } catch (error) {
      setAlertData(error.response.data.message);
      setAlertEnable(true);
      setAlertSeverity("error");
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
        <Container>
          <div className="row w-100">
            <div className="col-md-5">
              <div className="main-img">
                <ImageGallery images={unit.product.images} />
              </div>
            </div>
            <div className="col-md-7">
              <div id="details-section">
                <div className="main-description px-2">
                  <p className="category text-dark">{`${unit.product.root_category.name}/${unit.product.main_category.name}/${unit.product.sub_category.name}`}</p>
                  <h6 className="text-dark h6">
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
                        <div className="row ms-2 mb-3">
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
                                  className={`card rounded-0 p-1 ${
                                    unit.color_code.id === color.id
                                      ? "border-3 border-primary"
                                      : "border-0"
                                  }`}
                                >
                                  <div
                                    style={{
                                      backgroundColor: color.color,
                                      width: "84px",
                                      height: "20px",
                                    }}
                                  ></div>
                                </div>
                              </a>
                            </div>
                          ))}
                        </div>
                        <div className="row ms-2">
                          {unit.product.variations.map((variation) => (
                            <div className="col-lg-2">
                              <a
                                href="#"
                                onClick={() => handleVariantClick(variation.id)}
                                className={`disabled-link ${
                                  unit.variant.id === variation.id
                                    ? "disabled"
                                    : ""
                                }`}
                              >
                                <div
                                  className={`card rounded-0 d-flex justify-content-center align-items-center ${
                                    variation.id === unit.variant.id
                                      ? "border-3 border-primary"
                                      : "border-0"
                                  }`}
                                >
                                  <p>{variation.variation}</p>
                                </div>
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <h2 className="text-center m-5">Key Features</h2>
                      {Object.keys(unit.product.details.key_features).map(
                        (key) => (
                          <div className="row">
                            <div className="col-lg-5">
                              <p>{key}</p>
                            </div>
                            <div className="col-lg-7">
                              <p className="text-dark">
                                {unit.product.details.key_features[key]}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                    <div className="col-lg-12">
                      <h2 className="text-center m-5">All Details</h2>
                      {Object.keys(unit.product.details.all_details).map(
                        (key) => (
                          <div className="row">
                            <div className="col-lg-5">
                              <p>{key}</p>
                            </div>
                            <div className="col-lg-7">
                              <p className="text-dark">
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
          <div className="row">
          <h4 className="h5 text-dark text-center mt-3">Similar Products</h4>
          {similar.map((item, index) => (
            <div className="col-sm-6 col-lg-3 mt-4 d-flex justify-content-center align-items-center" key={index}>
              <div className="card" style={{ width: "18rem" }}>
                <img className="card-img-top" src={`http://127.0.0.1:8000/${item.product.thumbnail}`} />
                <div className="card-body">
                  <h5 className="card-title">{item.product.brand} {item.product.name}</h5>
                  <p className="card-text">
                    {item.variant.variation} {item.color_code.color}
                  </p>
                  <Button variant="contained" style={{backgroundColor: "#16213E"}} onClick={() => {
                    localStorage.setItem("item_id", item.unit_id)
                    navigate(`/product/${item.slug}/`)
                    window.location.reload()
                  }}>
                    View
                  </Button>
                </div>
              </div>
            </div>
          ))}
          </div>
        </Container>
      </div>
    </>
  );
};

export default ProductDetail;
