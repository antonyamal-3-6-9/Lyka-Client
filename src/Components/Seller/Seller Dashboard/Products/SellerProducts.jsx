import "./product.css";
import { useState, React, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SellerProductNav from "./SellerProductNav";
import ConfirmationModal from "./ConfirmationModal";
import { Alert, AlertTitle } from "@mui/material";
import Modal from "react-modal";

const SellerProducts = () => {
  const [productData, setProductData] = useState([]);
  const [productExists, setProductExists] = useState(null);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [unitIdToDelete, setUnitIdToDelete] = useState(null);

  const [newStock, setNewStock] = useState(0);
  const [stockModal, setStockModal] = useState(false);
  const [productIdToStock, setProductIdToStock] = useState(null);
  const [unitIdToStock, setUnitIdToStock] = useState(null);

  const [unitToMakeLive, setUnitToMakeLive] = useState(null);
  const [productIdToMakeLive, setProductIdToMakeLive] = useState(null);

  const [alertEnable, setAlertEnable] = useState(false);
  const [alertData, setAlertData] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  const navigate = useNavigate();

  const BASE_URL = "http://127.0.0.1:8000/product/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(BASE_URL + "get-seller-item/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });

        if (response.status === 200) {
          console.log(response.data);
          setProductData(response.data);
          setProductExists(true);
        }
      } catch (error) {
        setAlertData("No products Found, Add Now");
        setAlertEnable(true);
        setAlertSeverity("info");
        console.log(error);
        setProductExists(false);
      }
    };

    fetchData();

    if (!productData) {
      setProductExists(false);
    }
  }, []);

  const updateState = (unit_id, status) => {
    const unitIndex = productData.findIndex((item) => item.unit_id === unit_id);
    if (unitIndex !== -1) {
      const updatedProductData = [...productData];
      updatedProductData[unitIndex].is_active = status;
      setProductData(updatedProductData);
    }
  };

  const deleteState = (unit_id) => {
    const unitIndex = productData.findIndex((item) => item.unit_id === unit_id);
    if (unitIndex !== -1) {
      const updatedProductData = [...productData];
      updatedProductData.splice(unitIndex, 1)
      setProductData(updatedProductData);
    }
  };

  const updateStock = (unit_id, stock) => {
    const unitIndex = productData.findIndex(
      (item) =>item.unit_id === unit_id
    );
      if (unitIndex !== -1) {
        const updatedProductData = [...productData];
        const currentStock = parseInt(
          updatedProductData[unitIndex].stock
        );
        const newStock = currentStock + parseInt(stock);
        updatedProductData[unitIndex].stock =
          String(newStock);
        setProductData(updatedProductData);
      }
  };

  const makeLive = async (unit_id) => {
    let status = false;
    try {
      const token = localStorage.getItem("token");

      const response = await axios.patch(
        BASE_URL + "make-live/",
        {
          unit_id: unit_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.data.message === "Live") {
        status = true;
        updateState(unit_id, status);
      } else if (response.data.message === "Dead") {
        status = false;
        updateState(unit_id, status);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setAlertData("Product Out of Stock");
        setAlertEnable(true);
        setAlertSeverity("success");
      }
    }
  };

  const handleDelete = (unit_id) => {
    setShowConfirmation(true);
    setUnitIdToDelete(unit_id);
  };

  const handleConfirmDelete = async (unit_id, item_id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        BASE_URL + `delete-item/${unit_id}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.status === 200) {
        setAlertData("Product has been deleted successfully");
        setAlertEnable(true);
        setAlertSeverity("success");
        deleteState(unit_id);
      }
    } catch (error) {
      setAlertData("Error deleting the product");
      setAlertEnable(true);
      setAlertSeverity("error");
      console.log(error);
    }

    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleStockClick = (unit_id) => {
    setUnitIdToStock(unit_id);
    setStockModal(true);
  };

  const handleStockChange = (e) => {
    setNewStock(e.target.value);
  };

  const handleStockConfirm = async (unit_id) => {
    if (newStock <= 0 || newStock > 100) {
      setStockModal(false);
      setAlertData(
        "Invalid Stock, The stock has to be greater than ZERO and less than HUNDRED"
      );
      setAlertEnable(true);
      setAlertSeverity("error");
    } else {
      setStockModal(false);
      const payload = {
        unit_id: unit_id,
        stock: newStock,
      };
      const token = localStorage.getItem("token");
      try {
        const stockResponse = await axios.patch(
          `${BASE_URL}add-more-stock/`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (stockResponse.status === 200) {
          setAlertData("Stock has been updated successfully");
          setAlertEnable(true);
          setAlertSeverity("success");
          updateStock(unit_id, newStock);
        }
      } catch (error) {
        setAlertData("Error updating the stock");
        setAlertEnable(true);
        setAlertSeverity("error");
      }
    }
  };

  const handleAlertClose = () => {
    setAlertEnable(false);
  };

  const handleStockCancel = () => {
    setStockModal(false);
  };

  const isVerified = async () => {
    try {
      const token = localStorage.getItem("token");
      const verifiedResponse = await axios.get(
        "http://127.0.0.1:8000/seller/verified-or-not/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (verifiedResponse.data.verified) {
        navigate("/seller/check-product");
      } else {
        setAlertData(
          "You are not verified, Verify First to Add and sale products"
        );
        setAlertEnable(true);
        setAlertSeverity("warning");
      }
    } catch (error) {
      setAlertData("Unable to check the verification status, Try again later");
      setAlertData(true);
      setAlertSeverity("error");
    }
  };

  if (productExists === null) {
    return null;
  }

  const handleAddVariants = (id, name) => {
    localStorage.setItem("product_id", id);
    localStorage.setItem("product_name", name);
    navigate("/seller/add-item");
  };

  return (
    <>
      <div className="container-fluid mt-5 pt-5">
        {alertEnable && (
          <Alert
            severity={alertSeverity}
            onClose={handleAlertClose}
            className="custom-alert"
          >
            <AlertTitle>Error</AlertTitle>
            {alertData}
          </Alert>
        )}
        <ConfirmationModal
          isOpen={showConfirmation}
          onClose={handleCancelDelete}
          onConfirm={() =>
            handleConfirmDelete(unitIdToDelete, productIdToDelete)
          }
        />
        <Modal
          isOpen={stockModal}
          onRequestClose={handleStockCancel}
          style={{
            content: {
              width: "400px",
              margin: "auto",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              padding: "20px",
            },
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          <h2 style={{ marginBottom: "10px" }}>Add Stock</h2>
          <p style={{ marginBottom: "20px" }}>
            Enter the number of stock do you wanna add (No More Than Hundred)
          </p>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <input
              type="number"
              name="new-stock"
              value={newStock}
              onChange={handleStockChange}
            />
            <button
              style={{ marginRight: "10px" }}
              onClick={() =>
                handleStockConfirm(unitIdToStock, productIdToStock)
              }
            >
              Add
            </button>
            <button onClick={handleStockCancel}>Cancel</button>
          </div>
        </Modal>
        {productExists && productData.length !== 0 ? (
          <SellerProductNav />
        ) : (
          <div className="container-fluid w-75 h-100">
            <div className="row h-100 d-flex align-items-center justify-content-center">
              <h4 className="text-center">
                You haven't added any products yet, add new product now
              </h4>
              <Link
                onClick={isVerified}
                className="btn btn-outline-dark w-25 text-center"
              >
                Add Now
              </Link>
            </div>
          </div>
        )}
        {productData.map((item) => (
          <div className="row" key={item.unit_id}>
            <div className="col-lg-12">
              <div
                className={`product-content product-wrap clearfix border border-1 ${
                  item.is_active ? "border-success" : "border-danger"
                }`}
              >
                <div className="row">
                  <div className="col-md-4 col-sm-12 col-xs-12">
                    <div className="product-image d-flex align-items-center justify-content-center">
                      <img
                        key={item.product.productId}
                        src={"http://localhost:8000" + item.product.thumbnail}
                        alt="hyy"
                        style={
                          item.product.main_category.name === "Laptops"
                            ? { width: "400px", height: "300px" }
                            : { width: "200px", height: "300px" }
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-8 col-sm-12 col-xs-12">
                    <div className="row">
                      <div className="col-lg-12 pb-5">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="product-deatil">
                              <div className="row">
                                <div className="col-lg-12">
                                  <h5 className="name">
                                    <a href="#">
                                      {item.product.brand} {item.product.name}{" "}
                                      {item.variant.variation}{" "}
                                      {item.color_code.color}
                                      <span>
                                        {item.product.root_category.name}/
                                        {item.product.main_category.name}/
                                        {item.product.sub_category.name}
                                      </span>
                                    </a>
                                  </h5>
                                </div>
                                <div className="col-lg-4 mt-2">
                                  <p className="m-0 p-0 mt-3">
                                    Original Price:
                                  </p>
                                  <p className="price-container m-0 p-0">
                                    <span>{item.original_price}</span>
                                  </p>
                                </div>
                                <div className="col-lg-4 mt-2">
                                  <p className="m-0 p-0 mt-3">Selling Price:</p>
                                  <p className="price-container m-0 p-0">
                                    <span>{item.selling_price}</span>
                                  </p>
                                </div>
                                <div className="col-lg-4 mt-2">
                                  <p className="m-0 p-0 mt-3">Offer Price:</p>
                                  <p className="price-container m-0 p-0">
                                    <span>{item.offer_price}</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="description">
                              <p>{item.product.description} </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="row">
                          <div className="col-3 mb-3">
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              onClick={() => handleDelete(item.unit_id)}
                            >
                              Delete
                            </button>
                          </div>
                          <div className="col-3 mb-3">
                            <div className="form-check">
                              <button
                                className={`btn ${
                                  item.is_active
                                    ? "btn-outline-success"
                                    : "btn-outline-danger"
                                }`}
                                disabled={item.stock <= 0}
                                checked={item.is_active || item.stock <= 0}
                                onClick={() => makeLive(item.unit_id)}
                              >
                                {item.is_active
                                  ? "Live"
                                  : "Dead" || (item.stock <= 0 && "Dead")}
                              </button>
                              <label for="stock-live"></label>
                            </div>
                          </div>
                          <div className="col-3 mb-3">
                            <button
                              className="btn btn-outline-dark"
                              type="button"
                              onClick={() => handleStockClick(item.unit_id)}
                            >
                              Add More Stock
                            </button>
                          </div>
                          <div className="col-3 mb-3">
                            <button
                              className="btn btn-outline-dark"
                              type="button"
                              onClick={() =>
                                handleAddVariants(
                                  item.product.productId,
                                  `${item.product.brand} ${item.product.name}`
                                )
                              }
                            >
                              Add More Variants
                            </button>
                          </div>
                          <div className="col-3 mb-3">
                            <p>
                              <span>Added On: {item.added_on}</span>
                            </p>
                          </div>
                          <div className="col-3 mb-3">
                            <p>
                              <span>Launch: {item.product.launch_date}</span>
                            </p>
                          </div>
                          <div className="col-3 mb-3">
                            <p>
                              <span>Units Sold: {item.units_sold}</span>
                            </p>
                          </div>
                          <div className="col-3 mb-3">
                            <p>
                              <span>stock: {item.stock}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default SellerProducts;
