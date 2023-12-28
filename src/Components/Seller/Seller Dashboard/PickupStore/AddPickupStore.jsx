import React, { useEffect, useState } from "react";
import AddPickupNav from "./AddPickUpNav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle, Button } from "@mui/material";

const AddPickupStore = () => {
  const BASE_URL = "http://127.0.0.1:8000/seller/";

  const navigate = useNavigate();

  const [addressData, setAddressData] = useState({
    storeName: "",
    streetOne: "",
    streetTwo: "",
    phone: "",
    alternatePhone: "",
    district: "",
    city: "",
    landmark: "",
    country: "India",
    state: "",
    zip: "",
    image: null,
  });

  const [alertEnable, setAlertEnable] = React.useState(false);
  const [alertData, setAlertData] = React.useState("");
  const [alertSeverity, setAlertSeverity] = React.useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      const file = e.target.files[0];
      setAddressData({ ...addressData, image: file });
    } else {
      setAddressData({ ...addressData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("store_name", addressData.storeName);
    formData.append("street_one", addressData.streetOne);
    formData.append("street_two", addressData.streetTwo);
    formData.append("phone", addressData.phone);
    formData.append("alternate_phone", addressData.alternatePhone);
    formData.append("district", addressData.district)
    formData.append("city", addressData.city);
    formData.append("landmark", addressData.landmark);
    formData.append("country", addressData.country);
    formData.append("state", addressData.state);
    formData.append("zip_code", addressData.zip);
    formData.append("image", addressData.image);

    try {
      const addressResponse = await axios.post(
        `${BASE_URL}add-store/`,
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (addressResponse.status === 200) {
        navigate("/seller/store");
      }
    } catch (error) {
      setAlertData("Error adding Store");
      setAlertEnable(true);
      setAlertSeverity("error");
    }
  };

  const handleAlertClose = () => {
    setAlertEnable(false);
  };

  useEffect(() => {
    if (alertEnable) {
      setTimeout(() => {
        setAlertEnable(false);
      }, 400);
    }
  }, []);

  const handleUpdateZipcode = async (zipCode) => {
    if (zipCode.length !== 6) {
      alert("Invalid Zip");
    }
    try {
      const zipcodeResponse = await axios.get(
        `https://api.postalpincode.in/pincode/${zipCode}`
      );
      setAddressData({
        ...addressData,
        ["state"]: zipcodeResponse[0]["PostOffice"][0]["Circle"],
        ["district"]: zipcodeResponse[0]["PostOffice"][0]["District"],
        ["city"]: zipcodeResponse[0]["PostOffice"][0]["Name"],
      });
    } catch (error) {
      setAlertData("Error fetching address");
      setAlertEnable(true);
      setAlertSeverity("Warning");
    }
  };

  return (
    <>
      {" "}
      <AddPickupNav />
      <div className="container-fluid w-75 p-5 mt-2">
        {alertEnable && (
          <Alert severity={alertSeverity} onClose={handleAlertClose}>
            <AlertTitle>Error</AlertTitle>
            {alertData}
          </Alert>
        )}
        <div className="card p-3 mt-5">
          <div className="row">
            <div className="col-lg-12">
              <h4 className="text-center">Add New Pickup Store</h4>
              <form
                className="needs-validation"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label className="form-label">Store Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      name="storeName"
                      value={addressData.storeName}
                      onChange={handleChange}
                      required
                    />
                    <div className="invalid-feedback">
                      Valid Store Name is required.
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <label className="form-label">Street One</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      name="streetOne"
                      value={addressData.streetOne}
                      onChange={handleChange}
                      required
                    />
                    <div className="invalid-feedback">
                      Valid Street One is required.
                    </div>
                  </div>

                  <div className="col-6">
                    <label className="form-label">Street Two</label>
                    <div className="input-group has-validation">
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        name="streetTwo"
                        value={addressData.streetTwo}
                        onChange={handleChange}
                        required
                      />
                      <div className="invalid-feedback">
                        Your Street Two is required.
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <label className="form-label">ThumbNail</label>
                    <div className="input-group has-validation">
                      <input
                        type="file"
                        className="form-control"
                        name="image"
                        onChange={handleChange}
                        required
                      />
                      <div className="invalid-feedback">Image is required</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <label className="form-label">Phone</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder=""
                      name="phone"
                      value={addressData.phone}
                      onChange={handleChange}
                      maxLength="10"
                      minLength="10"
                    />
                    <div className="invalid-feedback">
                      Please enter a valid phone.
                    </div>
                  </div>

                  <div className="col-6">
                    <label className="form-label">Alternate Phone</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder=""
                      name="alternatePhone"
                      value={addressData.alternatePhone}
                      onChange={handleChange}
                      required
                      maxLength="10"
                      minLength="10"
                    />
                    <div className="invalid-feedback">
                      Please enter a valid alternate phone.
                    </div>
                  </div>

                  <div className="col-6">
                    <label className="form-label">Landmark</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      name="landmark"
                      value={addressData.landmark}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">Zip</label>
                    <input
                      type="text"
                      className="form-control"
                      id="zip"
                      placeholder=""
                      name="zip"
                      maxLength="6"
                      minLength="6"
                      value={addressData.zip}
                      onChange={handleChange}
                      required
                    />
                    <div className="invalid-feedback">Zip code required.</div>
                  </div>

                  <div className="col-lg-3">
                    <Button variant="text" onClick={() => handleUpdateZipcode(addressData.zip)}>update</Button>
                  </div>

                  <div className="col-6">
                    <label className="form-label">Locality</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      name="city"
                      value={addressData.city}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-6">
                    <label className="form-label">District</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      name="district"
                      readOnly
                      value={addressData.district}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-5">
                    <label className="form-label">Country</label>
                    <input
                      className="form-select"
                      id="country"
                      name="country"
                      required
                      readOnly
                      value={addressData.country}
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">
                      Please select a valid country.
                    </div>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">State</label>
                    <input
                      className="form-select"
                      id="state"
                      name="state"
                      required
                      onChange={handleChange}
                      value={addressData.state}
                      readOnly
                    />
                    <div className="invalid-feedback">
                      Please provide a valid state.
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 mt-3 mb-3 d-flex align-items-center justify-content-center">
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPickupStore;
