import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CheckCategory from "./CategoryCheck";
import CheckNav from "./CheckNav";
import FloatingAlert from "../../../../FloatingAlert/FloatingAlert";

const CheckProduct = (props) => {
  const navigate = useNavigate();
  const [isItemNotFound, setIsItemNotFound] = useState(false);
  const [isItemFound, setIsItemFound] = useState(false);
  const [isItemSelected, setisItemSelected] = useState(-1);

  const [alertData, setAlertData] = useState("")
  const [alertEnable, setAlertEnable] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState("")

  const [checkData, setCheckData] = useState({
    brand: "",
    name: "",
    root_category: "",
    main_category: "",
    sub_category: "",
  });

  const [checkResponseData, setCheckResponseData] = useState([]);

  const BASE_URL = "http://127.0.0.1:8000/product/";

  const handleChange = (e) => {
    setCheckData({ ...checkData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const checkResponse = await axios.get(`${BASE_URL}check-product/`, {
        params: {
          root: checkData.root_category,
          main: checkData.main_category,
          sub: checkData.sub_category,
          name: checkData.name,
          brand: checkData.brand,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (checkResponse.status === 200) {
        console.log(checkResponse)
        setCheckResponseData(checkResponse.data);
        setIsItemFound(true);
        setisItemSelected(-1);
        
      }
    } catch (error) {
      setAlertEnable(true)
      setAlertData("Product not found, add one now")
      setAlertSeverity("warning")
      setIsItemNotFound(true);
    }
  };

  const handleProductClick = (id, name, index) => {
    localStorage.setItem("product_id", id);
    localStorage.setItem("product_name", name);
    setisItemSelected(index);
  };

  const handleProductSubmit = () => {
    if (isItemSelected !== -1) {
      navigate("/seller/add-item");
    } else {
      console.log("product not selected");
    }
  };

  const handleCancel = () => {
    navigate("/seller/products");
  };

  return (
    <>
    <CheckNav />
      <div className="container-fluid mt-5 p-5">
      <FloatingAlert
        message={alertData}
        enable={alertEnable}
        severity={alertSeverity}
        setEnable={setAlertEnable}
      />
      <form onSubmit={handleSubmit}>
          <div className="row">
          <CheckCategory checkData={checkData} setCheckData={setCheckData} />
            <div className="col-lg-3">
            <label>Brand</label>
              <input
                type="text"
                name="brand"
                className="form-control"
                value={checkData.brand}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-lg-3">
            <label>Model Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={checkData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-lg-12 mt-3 d-flex justify-content-center">
              <button type="submit" className="btn btn-outline-info">
                Search
              </button>
            </div>
          </div>
        </form>
        {isItemFound && (
          <>
            <div className="row mt-5">
              {checkResponseData.map((item, index) => {
                return (
                  <div className="col-lg-3">
                    <div
                      className={`'card' p-3 border rounded-1 border-3 ${
                        isItemSelected === index
                          ? "border-success"
                          : "border-primary"
                      }`}
                      onClick={() =>
                        handleProductClick(
                          item.productId,
                          `${item.brand} ${item.name}`,
                          index
                        )
                      }
                    >
                      <img
                        src={`http://127.0.0.1:8000/${item.thumbnail}`}
                        height="100px"
                        width="50px"
                        alt="thumbnail"
                      />
                      <h5>
                        {item.brand} {item.name}
                      </h5>
                      <h6>
                        {item.root_category.name}/{item.main_category.name}/
                        {item.sub_category.name}
                      </h6>
                      <h6>Lauched On: {item.launch_date}</h6>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col-lg-12 d-flex justify-content-center">
              <button
                className="btn btn-outline-success"
                onClick={handleProductSubmit}
              >
                Continue
              </button>
            </div>
          </>
        )}
        {isItemNotFound && (
          <Link className="btn btn-outline-dark" to="/seller/add-product">
            Product not add found, Add now
          </Link>
        )}
      </div>
    </>
  );
};

export default CheckProduct;
