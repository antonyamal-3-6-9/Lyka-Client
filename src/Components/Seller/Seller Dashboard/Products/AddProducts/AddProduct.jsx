import React from "react";
import axios from "axios";
import AddCategory from "./AddCategory";
import AddBasicDetails from "./AddBasicDetails";
import AddFeatures from "./AddFeatures";
import AddImages from "./AddImages";
import AddProductNav from "./AddProductNav";
import { Alert, AlertTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddProduct = () => {
  const API_ENDPOINT = "http://127.0.0.1:8000/product/";

  const navigate = useNavigate();

  const [productBasicDetails, setProductBasicDetails] = React.useState({
    brand: "",
    name: "",
    description: "",
    root_category: "",
    main_category: "",
    sub_category: "",
    thumbnail: null,
    launch_date: "",
    weight: "",
    details: {
      key_features: {},
      all_details: {},
    },
    variations: [],
    colors: [],
    images: [],
  });

  const [alertEnable, setAlertEnable] = React.useState(false);
  const [alertData, setAlertData] = React.useState("");
  const [alertSeverity, setAlertSeverity] = React.useState("");



  const handleSubmitBasic = async (e) => {
    e.preventDefault();
    const colorField = document.getElementById("color");
    const varinatField = document.getElementById("variant");
    const inputFields = document.querySelectorAll(
      "#basic-information input.form-control"
    );
    let isEmpty = false;

    inputFields.forEach((input) => {
      if (
        input.id !== "color" &&
        input.id !== "variant" &&
        input.value.trim() === ""
      ) {
        input.classList.add("is-invalid");
        isEmpty = true;
      } else {
        input.classList.remove("is-invalid");
      }
    });

    if (isEmpty) {
      return;
    }

    console.log("going");
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        API_ENDPOINT + "create-product/",
        {
          product: {
            brand: productBasicDetails.brand,
            name: productBasicDetails.name,
            description: productBasicDetails.description,
            root_category: productBasicDetails.root_category,
            main_category: productBasicDetails.main_category,
            sub_category: productBasicDetails.sub_category,
            thumbnail: productBasicDetails.thumbnail,
            weight: productBasicDetails.weight,
            launch_date: productBasicDetails.launch_date,
          },
          details: {
            key_features: productBasicDetails.details.key_features,
            all_details: productBasicDetails.details.all_details,
          },
          colors: productBasicDetails.colors,
          variations: productBasicDetails.variations,
          images: productBasicDetails.images,
        },
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.status === 201) {
        setAlertEnable(true);
        setAlertData("Product has created successfully");
        setAlertSeverity("success");
        localStorage.setItem('product_id', response.data.product.productId)
        const name = `${response.data.product.brand} ${response.data.product.name}`
        localStorage.setItem('product_name', name)
        navigate("/seller/add-item")
      }
    } catch (error) {
      setAlertData(error.data.message);
      setAlertEnable(true);
      setAlertSeverity("error");
    }
  };

  const handleAlertClose = () => {
    setAlertEnable(false);
  };

  return (
    <>
      <AddProductNav
      />
      <div className="container-fluid w-75 p-5 mt-5">
          {alertEnable && (
            <Alert severity={alertSeverity} onClose={handleAlertClose}>
              <AlertTitle>Error</AlertTitle>
              {alertData}
            </Alert>
          )}
        <div
          className="row border border-5 rounded-3 p-2"
          style={{ backgroundColor: "#F5F5F5" }}
        >
          <form
            onSubmit={handleSubmitBasic}
            encType="multipart/form-data"
            className="needs-validation"
            noValidate
          >
            <>
              <div id="basic-information">
                <div className="row">
                  <div className="col-lg-12">
                    <AddCategory
                      details={productBasicDetails}
                      setDetails={setProductBasicDetails}
                    />
                    <AddBasicDetails
                      details={productBasicDetails}
                      setDetails={setProductBasicDetails}
                    />
                  </div>
                </div>
              </div>
            </>
            <div id="features">
              <div className="row mt-5">
                <div className="col-lg-12">
                  <AddFeatures
                    main_id={productBasicDetails.main_category}
                    url={API_ENDPOINT}
                    setData={setProductBasicDetails}
                    data={productBasicDetails}
                  />
                </div>
              </div>
            </div>
            <>
              <div id="product-images">
                <div className="row">
                  <AddImages
                    setImage={setProductBasicDetails}
                    images={productBasicDetails}
                  />
                </div>
              </div>
              <div className="col-lg-12 mt-3 mb-3 d-flex align-items-center justify-content-center">
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </div>
            </>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
