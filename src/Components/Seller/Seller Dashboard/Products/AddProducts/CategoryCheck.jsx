import { React, useState, useEffect } from "react";
import axios from "axios";

const CheckCategory = (props) => {
  const API_BASE_URL = "http://localhost:8000/category/";


  const handleChange = (e) => {
    props.setCheckData({ ...props.checkData, [e.target.name]: e.target.value });
  };

  const [data, setData] = useState([]);
  const [mainData, setMain] = useState([]);
  const [subData, setSub] = useState([]);


  useEffect(() => {
    axios
      .get(API_BASE_URL + "root/")
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));

    axios
      .get(API_BASE_URL + "main/")
      .then((response) => setMain(response.data))
      .catch((error) => console.error(error));

    axios
      .get(API_BASE_URL + "sub/")
      .then((response) => setSub(response.data))
      .catch((error) => console.error(error));
  }, []);


  return (
    <>
          <div className="col-lg-2">
            <label htmlFor="root-category" className="d-inline">
              Root Category
            </label>
            <select
              className="form-select form-select-sm"
              id="root-category"
              aria-label=".form-select-sm example"
              name="root_category"
              onChange={handleChange}
              required
            >
              <option value="">Open this select menu</option>
              {data.map((item) => {
                return (
                  <option key={item.root_id} value={item.root_id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            <div className="invalid-feedback">
              Please select a root category.
            </div>
          </div>

          <div className="col-lg-2">
            <label htmlFor="main-category" className="d-inline">
              Main Category
            </label>
            <select
              className="form-select form-select-sm"
              id="main-category"
              aria-label=".form-select-sm example"
              name="main_category"
              onChange={(e) => {handleChange(e);}}
              required
            >
              <option value="">Open this select menu</option>
              {mainData.map((item) => {
                return (
                  <option key={item.main_id} value={item.main_id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            <div className="invalid-feedback">
              Please select a main category.
            </div>
          </div>

          <div className="col-lg-2">
            <label htmlFor="sub-category" className="d-inline">
              Sub Category
            </label>
            <select
              className="form-select form-select-sm"
              id="sub-category"
              aria-label=".form-select-sm example"
              name="sub_category"
              onChange={handleChange}
              required
            >
              <option value="">Open this select menu</option>
              {subData.map((item) => {
                return (
                  <option key={item.sub_id} value={item.sub_id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            <div className="invalid-feedback">
              Please select a sub category.
            </div>
          </div>
    </>
  );
};

export default CheckCategory