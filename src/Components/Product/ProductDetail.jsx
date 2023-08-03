import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShoppingCart,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";
import "../Product/product.scss";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import ImageGallery from "./ProductImage";
import { Link, useNavigate } from "react-router-dom";
import FloatingAlert from "../FloatingAlert/FloatingAlert";
import { useSelector } from "react-redux";

const ProductDetail = () => {
  const [unit, setUnit] = useState({});
  const [color, setColor] = useState();
  const [variation, setVariation] = useState();
  const navigate = useNavigate();

  const BASE_URL = "http://127.0.0.1:8000/product/";

  const [alertData, setAlertData] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertEnable, setAlertEnable] = useState(false);

  const isLoggedIn = useSelector(
    (state) => state.customerAuth.isCustomerLoggedIn
  );

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
    const token = localStorage.getItem('token')
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

  if (!unit.product) {
    return null;
  }

  return (
    <>
      <div className="container-fluid pt-5 mt-5">
        <FloatingAlert
          message={alertData}
          severity={alertSeverity}
          enable={alertEnable}
          setEnable={setAlertEnable}
        />
        <div className="row w-100">
          <div className="col-md-5">
            <div className="main-img">
              <ImageGallery images={unit.product.images} />
            </div>
          </div>
          <div className="col-md-7">
            <div id="details-section">
              <div className="main-description px-2">
                <div className="category text-bold">{`${unit.product.root_category.name}/${unit.product.main_category.name}/${unit.product.sub_category.name}`}</div>
                <div className="product-title text-bold my-3">
                  {`${unit.product.brand} ${unit.product.name} ${unit.variant.variation} ${unit.color_code.color}`}
                </div>
                <div className="price-area my-4">
                  <p className={`${unit.stock <= 0 ? "text-danger" : null}`}>
                    {unit.stock <= 0
                      ? "Out of stock"
                      : `Only ${unit.stock} left`}
                  </p>
                  <p className="old-price mb-1">
                    <del>{formatAmountWithRupeeSymbol(unit.selling_price)}</del>
                  </p>
                  <p className="new-price text-bold mb-1">
                    {formatAmountWithRupeeSymbol(unit.offer_price)}
                  </p>
                  <p className="text-secondary mb-1">
                    (Additional tax may apply on checkout)
                  </p>
                </div>
                <div className="buttons d-flex my-5">
                  <div className="block">
                    <Link
                      className="btn btn-outline-info"
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </Link>
                  </div>
                  <div className="block">
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => handleAddToCart(unit.unit_id)}
                    >
                      <FontAwesomeIcon icon={faShoppingCart} /> Add to cart
                    </button>
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
                            <p>{unit.product.details.key_features[key]}</p>
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
                            <p>{unit.product.details.all_details[key]}</p>
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
      </div>
      <div className="container similar-products my-4">
        <hr />
        <p className="display-5">Similar Products</p>

        <div className="row">
          <div className="col-md-3">
            <div className="similar-product">
              <img
                className="w-100"
                src="https://source.unsplash.com/gsKdPcIyeGg"
                alt="Preview"
              />
              <p className="title">Lovely black dress</p>
              <p className="price">$100</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="similar-product">
              <img
                className="w-100"
                src="https://source.unsplash.com/sg_gRhbYXhc"
                alt="Preview"
              />
              <p className="title">Lovely Dress with patterns</p>
              <p className="price">$85</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="similar-product">
              <img
                className="w-100"
                src="https://source.unsplash.com/gJZQcirK8aw"
                alt="Preview"
              />
              <p className="title">Lovely fashion dress</p>
              <p className="price">$200</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="similar-product">
              <img
                className="w-100"
                src="https://source.unsplash.com/qbB_Z2pXLEU"
                alt="Preview"
              />
              <p className="title">Lovely red dress</p>
              <p className="price">$120</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
