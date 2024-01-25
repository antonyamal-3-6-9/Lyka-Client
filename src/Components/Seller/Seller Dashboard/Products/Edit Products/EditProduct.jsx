import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditBasicDetails from "./EditBasicDetails";
import EditDetails from "./EditDetails";
import EditImages from "./EditImages";
import EditProductNav from "./EditProductNav";
import { Alert, AlertTitle } from "@mui/material";

const EditProduct = () => {
  const Base_Url = "http://127.0.0.1:8000/product/";

  const { product_id } = useParams();

  const [newData, setNewData] = useState({});
  const [newFeatures, setNewFeatures] = useState({});
  const [newAllDetails, setnewAllDetails] = useState({});
  const [existingImages, setExistingImages] = useState([{}]);
  const [newImages, setNewImages] = useState([]);

  const [alertEnable, setAlertEnable] = React.useState(false);
  const [alertData, setAlertData] = React.useState("");
  const [alertSeverity, setAlertSeverity] = React.useState("");

  const [productData, setProductData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(product_id);
        const response = await axios.get(
          Base_Url + "get-seller-product-details/",
          {
            params: {
              product_id: product_id,
            },
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.status === 200) {
          setProductData(response.data.product_details);
          setNewFeatures(response.data.product_details.details.key_features);
          setnewAllDetails(response.data.product_details.details.all_details);
          setExistingImages(response.data.images);
        }
      } catch (error) {
        setAlertData("Error getting product details");
        setAlertEnable(true);
        setAlertSeverity("error");
      }
    };

    fetchData();
  }, [product_id]);

  const handleBasicSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
  
    const payload = {
      product_id: product_id,
      newData,
    };
  
    console.log(payload);
  
    try {
      const response = await axios.patch(Base_Url + "basic-update/", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      });
  
      if (response.status === 200) {
        setAlertData("Product Has Been successfully Updated");
        setAlertEnable(true);
        setAlertSeverity("success");
      }
    } catch (error) {
      setAlertData("Product Updation Failed");
      setAlertEnable(true);
      setAlertSeverity("error");
    }
  };
  
  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
  
    const key_features = newFeatures;
    const all_details = newAllDetails;
  
    const payload = {
      product_id: product_id,
      details: {
        key_features,
        all_details,
      },
    };
  
    console.log(payload);
  
    try {
      const response = await axios.patch(Base_Url + "put-details/", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      });
  
      if (response.status === 200) {
        setAlertData("Product Has Been successfully Updated");
        setAlertEnable(true);
        setAlertSeverity("success");
      }
    } catch (error) {
      setAlertData("Product Updation Failed");
      setAlertEnable(true);
      setAlertSeverity("error");
    }
  };
  
  const handleImagesSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      newImages.forEach((image) => {
        formData.append("images", image);
      });

      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${Base_Url}${product_id}/images/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.status === 201) {
        console.log(response);
        setAlertData("Product Has Been successfully Updated");
        setAlertEnable(true);
        setAlertSeverity("success");
      }
    } catch (error) {
      setAlertData("Product Updation Failed");
      setAlertEnable(true);
      setAlertSeverity("error");
    }
  };

  const handleAlertClose = () => {
    setAlertEnable(false)
  }

  return (
    <>
      <EditProductNav 
       
      />
      <div className="container-fluid w-75 mt-5 pt-5">
      <div           className="row border border-5 rounded-3 p-2"
          style={{ backgroundColor: "#F5F5F5" }}>

      
      {alertEnable && (
        <Alert severity={alertSeverity} onClose={handleAlertClose}>
          <AlertTitle>Error</AlertTitle>
          {alertData}
        </Alert>
      )}
        <form onSubmit={handleBasicSubmit} encType="multipart/form-data">
          <h2 className="text-center">Basic details</h2>
          <div>
            <div className="row mt-5 mb-5">
              <div className="col-lg-12">
                <EditBasicDetails
                  details={productData}
                  newDetails={newData}
                  setNewDetails={setNewData}
                />
              </div>
              <div className="col-lg-12 d-flex align-items-center justify-content-center">
                <button type="submit" className="btn btn-success m-5">
                  Update
                </button>
              </div>
            </div>
          </div>
        </form>
        <form onSubmit={handleDetailsSubmit} encType="multipart/form-data">
          <h2 className="text-center">Features</h2>
          <div>
            <div className="row mt-5 mb-5">
              <div className="col-lg-12">
                <EditDetails
                  newFeatures={newFeatures}
                  setNewFeatures={setNewFeatures}
                  newAllDetails={newAllDetails}
                  setNewAllDetails={setnewAllDetails}
                />
              </div>
              <div className="col-lg-12 d-flex align-items-center justify-content-center">
                <button type="submit" className="btn btn-success m-5">
                  Update
                </button>
              </div>
            </div>
          </div>
        </form>
        <form onSubmit={handleImagesSubmit} encType="multipart/form-data">
          <h2 className="text-center">Images</h2>
          <div>
            <div className="row mt-5 mb-5">
              <div className="col-lg-12">
                <EditImages
                  Base_Url={Base_Url}
                  existingImages={existingImages}
                  setExistingImages={setExistingImages}
                  newImages={newImages}
                  setNewImages={setNewImages}
                />
              </div>
              <div className="col-lg-12 d-flex align-items-center justify-content-center">
                <button type="submit" className="btn btn-success m-5">
                  Update
                </button>
              </div>
            </div>
          </div>
        </form>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
