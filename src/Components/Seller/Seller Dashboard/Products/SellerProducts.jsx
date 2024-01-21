import "./product.css";
import { useState, React, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";
import { Alert, AlertTitle } from "@mui/material";
import Modal from "react-modal";
import { Button, Paper, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  color: theme.palette.text.secondary,
}));

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
      updatedProductData.splice(unitIndex, 1);
      setProductData(updatedProductData);
    }
  };

  const updateStock = (unit_id, stock) => {
    const unitIndex = productData.findIndex((item) => item.unit_id === unit_id);
    if (unitIndex !== -1) {
      const updatedProductData = [...productData];
      const currentStock = parseInt(updatedProductData[unitIndex].stock);
      const newStock = currentStock + parseInt(stock);
      updatedProductData[unitIndex].stock = String(newStock);
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
        try {
          const storeExistsResponse = await axios.get(
            `http://127.0.0.1:8000/seller/store-exists-or-not/`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );
          if (storeExistsResponse.status === 200) {
            navigate("/seller/check-product");
          }
        } catch {
          setAlertData(
            "You haven't added a warehouse yet, Add one now to continue"
          );
          setAlertEnable(true);
          setAlertSeverity("warning");
        }
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

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return date.toLocaleString("en-US", options);
  }

  return (
    <>
      <div className="container-fluid" style={{ marginTop: "83px" }}>
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
          <Button startIcon={<AddIcon />} style={{ color: "#3E3232" }}>
            <Link
              variant="contained"
              to="/seller/check-product"
              style={{ color: "#3E3232" }}
            >
              Add New Product
            </Link>
          </Button>
        ) : (
          <div className="container-fluid w-75 h-100">
            <Item>
              <div className="row h-100 d-flex align-items-center justify-content-center">
                <h4 className="text-center">
                  You haven't added any products yet, add new product now
                </h4>
                <Button onClick={isVerified} variant="contained" style={{ backgroundColor: "#3E3232" }}>
                  Add Now
                </Button>
              </div>
            </Item>
          </div>
        )}
        {productData.map((item) => (
          <div className="row mb-4" key={item.unit_id}>
            <div className="col-lg-12">
            <Item style={{border: item.is_active && item.stock > 0 ? "2px dotted green" : "2px dashed red"}}>
                <div className="row">
                  <div className="col-md-4 col-sm-12 col-xs-12 d-flex align-items-center justify-content-center">
                    <div className="">
                      <img
                        key={item.product.productId}
                        src={"http://localhost:8000" + item.product.thumbnail}
                      />
                    </div>
                  </div>
                  <div className="col-md-8 col-sm-12 col-xs-12">
                    <div className="row">
                      <div className="col-lg-12 pb-5">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="product-detail">
                              <div className="row">
                                <div className="col-lg-12">
                                  <h5 className="h4 text-dark">
                                    {item.product.brand} {item.product.name}{" "}
                                  </h5>
                                  <h5 className="h6 text-dark">
                                    {item.variant.variation}{" "}
                                  </h5>
                                  <h5
                                    className="h6"
                                    style={{ color: item.color_code.color }}
                                  >
                                    {item.color_code.color}
                                  </h5>
                                  <p className="text-dark">
                                    {item.product.root_category.name}/
                                    {item.product.main_category.name}/
                                    {item.product.sub_category.name}
                                  </p>
                                  <span className="text-dark h6">
                                    Inventory:{" "}
                                  </span>
                                  <span className="h5 text-dark">
                                    {item.warehouse.store_name}
                                  </span>
                                </div>
                                <div className="col-lg-4 mt-2">
                                  <p className="m-0 p-0 mt-3 text-dark">
                                    Original Price:
                                  </p>
                                  <p className="price-container m-0 p-0 text-dark">
                                    <span>{item.original_price}</span>
                                  </p>
                                </div>
                                <div className="col-lg-4 mt-2">
                                  <p className="m-0 p-0 mt-3 text-dark">Selling Price:</p>
                                  <p className="price-container m-0 p-0 text-dark">
                                    <span>{item.selling_price}</span>
                                  </p>
                                </div>
                                <div className="col-lg-4 mt-2">
                                  <p className="m-0 p-0 mt-3 text-dark">Offer Price:</p>
                                  <p className="price-container m-0 p-0 text-dark">
                                    <span>{item.offer_price}</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="description">
                              <p className="text-dark">{item.product.description} </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="row">
                          <div className="col-3 mb-3">
                            <Button
                              type="button"
                              variant="contained"
                              style={{ backgroundColor: "red" }}
                              onClick={() => handleDelete(item.unit_id)}
                            >
                              Delete
                            </Button>
                          </div>
                          <div className="col-3 mb-3">
                            <div className="form-check">
                              <Button
                                style={{
                                  backgroundColor: item.is_active && item.stock > 0
                                    ? "green"
                                    : "red",
                                    color: "white"
                                }}
                                disabled={item.stock <= 0}
                                checked={item.is_active || item.stock <= 0}
                                onClick={() => makeLive(item.unit_id)}
                              >
                                {item.is_active && item.stock > 0
                                  ? "Live"
                                  : "Dead"}
                              </Button>
                              <label for="stock-live"></label>
                            </div>
                          </div>
                          <div className="col-3 mb-3">
                            <Button
                              variant="contained"
                              type="button"
                              style={{ backgroundColor: "green" }}
                              onClick={() => handleStockClick(item.unit_id)}
                            >
                              Add More Stock
                            </Button>
                          </div>
                          <div className="col-3 mb-3">
                            <Button
                              variant="contained"
                              style={{ backgroundColor: "black" }}
                              type="button"
                              onClick={() => {
                                handleAddVariants(
                                  item.product.productId,
                                  `${item.product.brand} ${item.product.name}`
                                );
                              }}
                            >
                              Add More Variants
                            </Button>
                          </div>
                          <div className="col-3 mb-3">
                            <p>
                              <span className="text-dark">Added On: {formatDate(item.added_on)}</span>
                            </p>
                          </div>
                          <div className="col-3 mb-3">
                            <p>
                              <span className="text-dark">
                                Launched on: {item.product.launch_date}
                              </span>
                            </p>
                          </div>
                          <div className="col-3 mb-3">
                            <p>
                              <span className="text-dark">Units Sold: {item.units_sold}</span>
                            </p>
                          </div>
                          <div className="col-3 mb-3">
                            <p>
                              <span className="text-dark">stock: {item.stock}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                
              </div>
              </Item>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default SellerProducts;
