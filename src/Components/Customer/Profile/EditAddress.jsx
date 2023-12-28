import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle, Button } from "@mui/material";

const EditAddress = ({ address_id, setEdit, savedAddress, setSavedAddress, addressIndex }) => {
  const BASE_URL = "http://127.0.0.1:8000/address/";

  const [addressData, setAddressData] = useState({});
  const [newAddress, setNewAddress] = useState({});

  const [isChanged, setIsChanged] = useState(false);

  const [alertEnable, setAlertEnable] = useState(false);
  const [alertData, setAlertData] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const addressResponse = await axios.get(
          `${BASE_URL}get-customer-address/${address_id}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (addressResponse.status === 200) {
          setAddressData(addressResponse.data);
        }
      } catch (error) {
        setAlertData("Error getting address data");
        setAlertEnable(true);
        setAlertSeverity("error");
      }
    };
    fetchData();
  }, []);

  const handleAlertClose = () => {
    setAlertEnable(false);
  };

  const fetchAddress = async (zipcode) => {
    try {
      const zipcodeResponse = await axios.get(
        `https://api.postalpincode.in/pincode/${zipcode}`
      );
      console.log(zipcodeResponse)
      if (zipcodeResponse.data[0]["Status"] === "Success"){
      setNewAddress({
        ...newAddress,
        ["state"]: zipcodeResponse.data[0]["PostOffice"][0]["Circle"],
        ["district"]: zipcodeResponse.data[0]["PostOffice"][0]["District"],
        ["city"]: zipcodeResponse.data[0]["PostOffice"][0]["Name"],
      });
    } else {
      setAlertData("Invalid Zip")
      setAlertEnable(true)
      setAlertSeverity("warning")
    }
    } catch (error) {
      setAlertData("Error fetching address");
      setAlertEnable(true);
      setAlertSeverity("Warning");
    }
  };

  const handleChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const addressUpdateResponse = await axios.patch(
        `${BASE_URL}put-customer-address/${address_id}/`,
        newAddress,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (addressUpdateResponse.status === 200) {
        const updatedAddresses = [...savedAddress];
        updatedAddresses[addressIndex] = addressUpdateResponse.data;
        setSavedAddress(updatedAddresses)
        setEdit(false);
      }
    } catch (error) {
      setAlertData("Error updating Address, Try again");
      setAlertEnable(true);
      setAlertSeverity("error");
    }
  };

  return (
    <>
      {alertEnable && (
        <Alert severity={alertSeverity} onClose={handleAlertClose}>
          <AlertTitle>Error</AlertTitle>
          {alertData}
        </Alert>
      )}
      <form className="needs-validation" onSubmit={handleSubmit} noValidate>
        <div className="row g-3">
          <div className="col-sm-6">
            <label className="form-label">Street One</label>
            <input
              type="text"
              className="form-control"
              placeholder=""
              name="street_one"
              value={isChanged ? newAddress.street_one : addressData.street_one}
              onChange={(e) => {
                handleChange(e);
              }}
              required
            />
            <div className="invalid-feedback">
              Valid Street One is required.
            </div>
          </div>

          <div className="col-sm-6">
            <label className="form-label">Street Two</label>
            <div className="input-group has-validation">
              <input
                type="text"
                className="form-control"
                placeholder=""
                name="street_two"
                value={
                  isChanged ? newAddress.street_two : addressData.street_two
                }
                onChange={(e) => {
                  handleChange(e);
                  setIsChanged(true);
                }}
                required
              />
              <div className="invalid-feedback">
                Your Street Two is required.
              </div>
            </div>
          </div>

          <div className="col-sm-6">
            <label className="form-label">Landmark</label>
            <input
              type="text"
              className="form-control"
              placeholder=""
              name="landmark"
              value={isChanged ? newAddress.landmark : addressData.landmark}
              onChange={(e) => {
                handleChange(e);
                setIsChanged(true);
              }}
            />
          </div>
          <div className="col-sm-6">
            <label className="form-label">Phone</label>
            <input
              type="number"
              className="form-control"
              placeholder=""
              maxLength="10"
              minLength="10"
              name="phone"
              value={isChanged ? newAddress.phone : addressData.phone}
              onChange={(e) => {
                handleChange(e);
                setIsChanged(true);
              }}
            />
            <div className="invalid-feedback">Please enter a valid phone.</div>
          </div>

          <div className="col-sm-6">
            <label className="form-label">Alternate Phone</label>
            <input
              type="number"
              className="form-control"
              placeholder=""
              name="alternate_phone"
              maxLength="10"
              minLength="10"
              value={
                isChanged
                  ? newAddress.alternate_phone
                  : addressData.alternate_phone
              }
              onChange={(e) => {
                handleChange(e);
                setIsChanged(true);
              }}
              required
            />
            <div className="invalid-feedback">
              Please enter a valid alternate phone.
            </div>
          </div>

          <div className="col-md-3">
            <label className="form-label">Zip</label>
            <input
              type="text"
              className="form-control"
              id="zip"
              placeholder=""
              name="zip_code"
              maxLength="6"
              minLength="6"
              value={isChanged ? newAddress.zip_code : addressData.zip_code}
              onChange={(e) => {
                handleChange(e);
                setIsChanged(true);
              }}
              required
            />
            <div className="invalid-feedback">Zip code required.</div>
          </div>
          <div className="col-md-3">
            <Button
              variant="text"
              onClick={() => {
                fetchAddress(newAddress.zip_code);
              }}
              disabled={!isChanged}
            >
              Update
            </Button>
          </div>

          <div className="col-sm-6">
            <label className="form-label">District</label>
            <input
              type="text"
              className="form-control"
              placeholder=""
              name="district"
              value={isChanged ? newAddress.district : addressData.district}
              readOnly
              onChange={(e) => {
                handleChange(e);
                setIsChanged(true);
              }}
            />
          </div>

          <div className="col-sm-6">
            <label className="form-label">Locality</label>
            <input
              type="text"
              className="form-control"
              placeholder=""
              name="city"
              value={isChanged ? newAddress.city : addressData.city}
              readOnly
              onChange={(e) => {
                handleChange(e);
                setIsChanged(true);
              }}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">State</label>
            <input
              className="form-select"
              id="state"
              name="state"
              required
              readOnly
              value={isChanged ? newAddress.state : addressData.state}
              onChange={(e) => {
                handleChange(e);
                setIsChanged(true);
              }}
            />
            <div className="invalid-feedback">
              Please provide a valid state.
            </div>
          </div>
        </div>
        <div className="col-sm-5">
          <label className="form-label">Country</label>
          <input
            className="form-select"
            id="country"
            name="country"
            required
            value={addressData.country}
            readOnly
            onChange={(e) => {
              handleChange(e);
              setIsChanged(true);
            }}
          />
          <div className="invalid-feedback">Please select a valid country.</div>
        </div>
        <div className="col-lg-12 m-3 d-flex align-items-center justify-content-center">
          <Button
            type="submit"
            style={{ backgroundColor: "#16213E", margin: "20px" }}
            variant="contained"
          >
            Update
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setEdit(false);
            }}
            style={{ backgroundColor: "#16213E", margin: "20px" }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};

export default EditAddress;
