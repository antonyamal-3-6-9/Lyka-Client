import React, { useEffect, useState } from "react";
import AddPickupNav from "./AddPickUpNav";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, AlertTitle, Button, Paper, styled, Backdrop, CircularProgress } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  color: theme.palette.text.secondary,
}));

const EditStore = () => {
  const BASE_URL = "http://127.0.0.1:8000/address/";

  const [addressData, setAddressData] = useState({});
  const [newAddress, setNewAddress] = useState({});

  const [isChanged, setIsChanged] = useState(false);

  const [loading, setLoading] = useState(true)

  const [alertEnable, setAlertEnable] = useState(false);
  const [alertData, setAlertData] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  const { address_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        setLoading(true)
        const addressResponse = await axios.get(
          `${BASE_URL}get-address/${address_id}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (addressResponse.status === 200) {
          setAddressData(addressResponse.data);
          setLoading(false)
        }
      } catch (error) {
        setAlertData("Error getting address data");
        setAlertEnable(true);
        setAlertSeverity("error");
        setLoading(false)
      }
    };
    fetchData();
  }, []);

  const handleAlertClose = () => {
    setAlertEnable(false);
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setNewAddress({ ...newAddress, image: file });
    } else {
      setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const addressUpdateResponse = await axios.patch(
        `${BASE_URL}put-address/${address_id}/`,
        newAddress,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (addressUpdateResponse.status === 200) {
        navigate("/seller/store");
      }
    } catch (error) {
      setAlertData("Error updating Address, Try again");
      setAlertEnable(true);
      setAlertSeverity("error");
    }
  };

  const handleUpdateZipcode = async (zipCode) => {
    if (zipCode.length !== 6) {
      setAlertData("Invalid zip");
      setAlertEnable(true);
      setAlertSeverity("warning");
      return;
    }

    try {
      setLoading(true)
      const zipcodeResponse = await axios.get(
        `https://api.postalpincode.in/pincode/${zipCode}`
      );
      setLoading(false)
      setAddressData({
        ...newAddress,
        ["state"]: zipcodeResponse[0]["PostOffice"][0]["Circle"],
        ["district"]: zipcodeResponse[0]["PostOffice"][0]["District"],
        ["city"]: zipcodeResponse[0]["PostOffice"][0]["Name"],
      });
    } catch (error) {
      setAlertData("Error fetching address");
      setAlertEnable(true);
      setAlertSeverity("warning");
      setLoading(false)
    }
  };

  return (
    <>
      
      <div className="container-fluid w-75" style={{marginTop: "20px"}}>
      <Item>
      <Backdrop>
        <CircularProgress/>
      </Backdrop>
      <AddPickupNav />
        {alertEnable && (
          <Alert severity={alertSeverity} onClose={handleAlertClose}>
            <AlertTitle>Error</AlertTitle>
            {alertData}
          </Alert>
        )}
        <div className="row">
          <div className="col-lg-12">
            <h4 className="text-center text-dark h4">Update Inventory</h4>
            <form
              className="needs-validation"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="row g-3">
                <div className="col-sm-12">
                  <label className="form-label text-dark">Store Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    name="store_name"
                    value={
                      isChanged ? newAddress.store_name : addressData.store_name
                    }
                    onChange={(e) => {
                      handleChange(e);
                      setIsChanged(true);
                    }}
                    required
                  />
                  <div className="invalid-feedback">
                    Valid Store Name is required.
                  </div>
                </div>

                <div className="col-sm-12">
                  <label className="form-label text-dark">Street One</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    name="street_one"
                    value={
                      isChanged ? newAddress.street_one : addressData.street_one
                    }
                    onChange={(e) => {
                      handleChange(e);
                      setIsChanged(true);
                    }}
                    required
                  />
                  <div className="invalid-feedback">
                    Valid Street One is required.
                  </div>
                </div>

                <div className="col-12">
                  <label className="form-label text-dark">Street Two</label>
                  <div className="input-group has-validation">
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      name="street_two"
                      value={
                        isChanged
                          ? newAddress.street_two
                          : addressData.street_two
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
                <div className="col-12">
                  <div className="row">
                    <div className="col-6">
                      <label className="form-label text-dark">ThumbNail</label>
                      <div className="input-group has-validation">
                        <input
                          type="file"
                          className="form-control"
                          name="image"
                          onChange={handleChange}
                          required
                        />
                        <div className="invalid-feedback">
                          Image is required
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      {newAddress.image ? (
                        <img
                          src={URL.createObjectURL(newAddress.image)}
                          alt="New Thumbnail"
                          width="150"
                          height="150"
                          className="mb-2"
                        />
                      ) : addressData.image ? (
                        <img
                          src={"http://localhost:8000" + addressData.image}
                          alt="Existing Thumbnail"
                          width="150"
                          height="150"
                          className="mb-2"
                        />
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="col-6">
                  <label className="form-label text-dark">Phone</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder=""
                    name="phone"
                    value={isChanged ? newAddress.phone : addressData.phone}
                    onChange={(e) => {
                      handleChange(e);
                      setIsChanged(true);
                    }}
                  />
                  <div className="invalid-feedback">
                    Please enter a valid phone.
                  </div>
                </div>

                <div className="col-6">
                  <label className="form-label text-dark">Alternate Phone</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder=""
                    name="alternate_phone"
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

                <div className="col-6">
                  <label className="form-label text-dark">Landmark</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    name="landmark"
                    value={
                      isChanged ? newAddress.landmark : addressData.landmark
                    }
                    onChange={(e) => {
                      handleChange(e);
                      setIsChanged(true);
                    }}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label text-dark">State</label>
                  <input
                    className="form-select"
                    id="state"
                    name="state"
                    required
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

                <div className="col-md-3">
                  <label className="form-label text-dark">Zip</label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    placeholder=""
                    name="zip_code"
                    value={
                      isChanged ? newAddress.zip_code : addressData.zip_code
                    }
                    onChange={(e) => {
                      handleChange(e);
                      setIsChanged(true);
                    }}
                    required
                  />
                  <div className="invalid-feedback">Zip code required.</div>
                </div>

                <div className="col-lg-3">
                  {isChanged && 
                  <Button
                    variant="text"
                    onClick={() => {
                      handleUpdateZipcode(newAddress.zip_code);
                    }}
                  >
                    Update
                  </Button>}
                </div>

                <div className="col-6">
                  <label className="form-label text-dark">District</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    name="district"
                    value={
                      isChanged ? newAddress.district : addressData.district
                    }
                    onChange={(e) => {
                      handleChange(e);
                      setIsChanged(true);
                    }}
                  />
                </div>

                <div className="col-6">
                  <label className="form-label text-dark">City</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    name="city"
                    value={isChanged ? newAddress.city : addressData.city}
                    onChange={(e) => {
                      handleChange(e);
                      setIsChanged(true);
                    }}
                  />
                </div>

                <div className="col-md-5">
                  <label className="form-label text-dark">Country</label>
                  <select
                    className="form-select"
                    id="country"
                    name="country"
                    required
                    readOnly
                    onChange={(e) => {
                      handleChange(e);
                      setIsChanged(true);
                    }}
                  >
                    <option value={addressData.country}>
                      {addressData.country}
                    </option>
                    <option value="United States">United States</option>
                  </select>
                  <div className="invalid-feedback">
                    Please select a valid country.
                  </div>
                </div>
              </div>
              <div className="col-lg-12 mt-3 mb-3 d-flex align-items-center justify-content-center">
                <Button type="submit" variant="contained" style={{ backgroundColor: "#3E3232" }}>
                  Update
                </Button>
              </div>
            </form>
          </div>
        </div>
        </Item>
      </div>
    </>
  );
};

export default EditStore;
