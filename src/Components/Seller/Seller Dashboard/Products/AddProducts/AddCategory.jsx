import { React, useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";

const AddCategory = (props) => {
  const API_BASE_URL = "http://localhost:8000/category/";

  const [isSelected, setIsSelected] = useState(false);

  const fetchDetails = (main_id) => {
    const payload = {
      params: {
        main: main_id,
      },
    };
    axios
      .get("http://localhost:8000/product/" + "get-details/", payload)
      .then((response) => {
        props.setDetails({
          ...props.details,
          details: {
            ...props.details.details,
            key_features: {
              ...props.details.details.key_features,
              ...response.data.key_features,
            },
            all_details: {
              ...props.details.details.all_details,
              ...response.data.all_details,
            },
          },
        });
        console.log(props.details);
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    if (e.target.name === "main_category") {
      setSelectedMain(e.target.value);
    }
    if (e.target.name === "root_category") {
      setSelectedRoot(e.target.value);
    }
    props.setDetails({ ...props.details, [e.target.name]: e.target.value });
    console.log(props.details);
  };

  const handleConfirm = () => {
    if (props.details.root_category.length <= 5) {
      alert("a root is must");
      return;
    }

    if (props.details.main_category.length <= 5) {
      alert("a main is must");
      return;
    }

    if (props.details.sub_category.length <= 5) {
      alert("a sub is must");
      return;
    }
    setIsSelected(true);
    props.setCatAdded(true)
    fetchDetails(selectedMain);
  };

  const [data, setData] = useState([]);
  const [mainData, setMain] = useState([]);
  const [subData, setSub] = useState([]);

  const [selectedRoot, setSelectedRoot] = useState(null);
  const [selectedMain, setSelectedMain] = useState(null);

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
      <div className="row mt-3 mb-4">
        <div className="col-lg-3">
          <label htmlFor="root-category" className="d-inline">
            Root Category
          </label>
          <select
            className="form-select form-select-sm"
            id="root-category"
            name="root_category"
            onChange={handleChange}
            value={props.details.root_category}
            required
            disabled={isSelected}
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
          <div className="invalid-feedback">Please select a root category.</div>
        </div>

        <div className="col-lg-3">
          <label htmlFor="main-category" className="d-inline">
            Main Category
          </label>
          <select
            className="form-select form-select-sm"
            id="main-category"
            name="main_category"
            onChange={handleChange}
            value={props.details.main_category}
            required
            disabled={isSelected}
          >
            <option value="">Open this select menu</option>
            {mainData.map((item) => {
              if (item.root === selectedRoot) {
                return (
                  <option key={item.main_id} value={item.main_id}>
                    {item.name}
                  </option>
                );
              }
            })}
          </select>
          <div className="invalid-feedback">Please select a main category.</div>
        </div>

        <div className="col-lg-3">
          <label htmlFor="sub-category" className="d-inline">
            Sub Category
          </label>
          <select
            className="form-select form-select-sm"
            id="sub-category"
            name="sub_category"
            onChange={handleChange}
            value={props.details.sub_category}
            required
            disabled={isSelected}
          >
            <option value="">Open this select menu</option>
            {subData.map((item) => {
              if (item.main === selectedMain) {
                return (
                  <option key={item.sub_id} value={item.sub_id}>
                    {item.name}
                  </option>
                );
              }
            })}
          </select>
          <div className="invalid-feedback">Please select a sub category.</div>
        </div>
        <div className="col-lg-3">
          <Button
            variant="outlined"
            style={{ marginTop: "17px" }}
            onClick={handleConfirm}
            disabled={isSelected}
          >
            Confirm Category
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
