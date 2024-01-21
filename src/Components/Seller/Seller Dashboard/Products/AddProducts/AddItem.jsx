import React, { useState } from "react";
import AdditemForm from "./AddItemForm";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ItemNav from "./ItemNav";
import axios from "axios";
import LykaItemList from "./LykaItemList";
import FloatingAlert from "../../../../FloatingAlert/FloatingAlert";
import { Button, Paper, styled } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  color: theme.palette.text.secondary,
}));

const AddItem = () => {
  const BASE_URL = "http://127.0.0.1:8000/product/";
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    productId: "",
    productName: "",
  });

  const [alertData, setAlertData] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertEnable, setAlertEnable] = useState(false);

  const [variantData, setVariantData] = useState([]);
  const [colorData, setColorData] = useState([]);
  const [pickupStore, setPickupStore] = useState([])

  const [lykaItemData, setLykaItemData] = useState({
    units: [],
  });

  const p_id = localStorage.getItem("product_id");
  const name = localStorage.getItem("product_name");
  const token = localStorage.getItem("token");

  const [newVariant, setNewVariant] = useState({
    color_code: null,
    variant: null,
    stock: "",
    selling_price: "",
    original_price: "",
    offer_price: "",
    product : p_id,
    warehouse : ""
  });


  useEffect(() => {
    setProductData({
      ...productData,
      productId: p_id,
      name: name,
    });

    const fetchData = async () => {
      try {
        const variantResponse = await axios.get(
          `${BASE_URL}get-product-variations/${p_id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "Application/json",
            },
          }
        );

        if (variantResponse.status === 200) {
          setVariantData(variantResponse.data.variations);
          setColorData(variantResponse.data.colors);
        }
      } catch (error) {
        setAlertEnable(true);
        setAlertData("Error getting the variants");
        setAlertSeverity("error");
      }
    };
    const fetchStore = async () => {
      try {
        const pickupResponse = await axios.get(`http://127.0.0.1:8000/seller/get-store/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (pickupResponse.status === 200) {
          setPickupStore(pickupResponse.data);
          }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    fetchStore()
  }, []);

  const handleVariantSubmit = (e) => {
    e.preventDefault();
    const variant = [...lykaItemData.units];
    variant.push(newVariant);
    setLykaItemData({ ...lykaItemData, units: variant });
  };

  const handleRemoveVariant = (index) => {
    const newVariant = [...lykaItemData.units];
    newVariant.splice(index, 1);
    setLykaItemData({ ...lykaItemData, units: newVariant });
  };

  const finalSubmission = async () => {
    try {
      const itemCreateResponse = await axios.post(
        `${BASE_URL}create-item/`,
        {
          units: lykaItemData.units,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "Application/json",
          },
        }
      );
      if (itemCreateResponse.status === 200) {
        navigate("/seller/products");
      }
    } catch (error) {
      setAlertEnable(true);
      setAlertData(error.response.data.message);
      setAlertSeverity("error");
      console.log(error)
    }
  };

  return (
    <>
      <div className="container-fluid" style={{marginTop: "20px"}}>
      <Item>
      <ItemNav />
      <h4 className="h4 text-dark text-center mb-5">Select and add Variants and Colors you have</h4>
        <FloatingAlert
          message={alertData}
          severity={alertSeverity}
          enable={alertEnable}
          setEnable={setAlertEnable}
        />
        <div className="row">
          <div className="col-lg-4">
            <div>
              <h6 className="h6 text-dark">Product Id: {productData.productId}</h6>
            </div>
          </div>
          <div className="col-lg-4">
            <div><h6 className="h6 text-dark">Product Name: {productData.name}</h6></div>
          </div>
          <div className="col-lg-4">
            <div className="card">
            <Button variant="contained" style={{backgroundColor: "#3E3232"}} fullWidth>
              <Link to="/seller/check-product" style={{color: "white"}}>
                Change Product
              </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="row">
          <form onSubmit={handleVariantSubmit}>
            <AdditemForm
              variants={variantData}
              colors={colorData}
              lykaData={lykaItemData}
              newVariant={newVariant}
              setLykaData={setLykaItemData}
              setNewVariant={setNewVariant}
              pickupStore={pickupStore}
            />
          </form>
        </div>
        <LykaItemList
          lykaItemData={lykaItemData}
          handleRemoveVariant={handleRemoveVariant}
          variants={variantData}
          colors={colorData}
          finalSubmission={finalSubmission}
          store={pickupStore}
        />
        </Item>
      </div>
    </>
  );
};

export default AddItem;
