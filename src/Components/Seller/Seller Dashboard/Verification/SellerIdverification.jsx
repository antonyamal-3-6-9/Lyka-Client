import React, { useState } from "react";
import axios from "axios";
import { Alert, AlertTitle, Button, TextField } from "@mui/material";

const SellerIdVerification = (props) => {
  const [addressData, setaddressData] = useState({
    id_num: "",
    id_name: "",
    id_dob: "",
    id_type: "",
  });

  const [alertEnable, setAlertEnable] = useState(false);
  const [alertData, setAlertData] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  const handleChange = (event) => {
    setaddressData({ ...addressData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isFormEmpty = Object.values(addressData).some(
      (value) => value.trim() === ""
    );
    if (isFormEmpty) {
      const inputFields = document.querySelectorAll("input.form-control");
      inputFields.forEach((input) => {
        if (input.value.trim() === "") {
          input.classList.add("is-invalid");
        } else {
          input.classList.remove("is-invalid")
        }
      });
      return;
    }

    const payload = {
      address_proof_number: addressData.id_num,
      address_proof_name: addressData.id_name,
      address_proff_dob: addressData.id_dob,
      address_proof_type: addressData.id_type,
    };

    const token = localStorage.getItem("token");
    axios
      .put(props.url + "address-verify/", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if ((response.status = 200)) {
          props.setAddressVerified(true);
          setAlertData(response.data.message);
          setAlertEnable(true);
          setAlertSeverity("success");
        }
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 406) {
          setAlertData(error.response.data.message);
          setAlertEnable(true);
          setAlertSeverity("error");
        } else {
          setAlertData("Address Verification failed");
          setAlertEnable(true);
          setAlertSeverity("error");
        }
      });
  };

  const handleAlertClose = () => {
    setAlertEnable(false);
  };

  return (
    <>
      {" "}
      {alertEnable && (
        <Alert severity={alertSeverity} onClose={handleAlertClose}>
          <AlertTitle>Error</AlertTitle>
          {alertData}
        </Alert>
      )}
      <form onSubmit={handleSubmit} noValidate className="needs-validation">
        <div className="row d-flex-justify-content-center align-items-center h-100">
          <div className="col-lg-12 mb-4">
            <TextField
              type="text"
              id="id-num"
              name="id_num"
              label="Id-Proof Number"
              autoComplete="id_num"
              autoFocus="id_num"
              value={addressData.id_num}
              onChange={handleChange}
              required
              fullWidth
            />
            <div className="invalid-feedback">
              Please enter the Id-Proof number.
            </div>
          </div>
          <div className="col-lg-12 align-items-center mt-0 mb-4 w-100">
            <div className="row">
              <div className="col-lg-6">
                <TextField
                  type="text"
                  id="id-name"
                  name="id_name"
                  label="Name on ID"
                  autoComplete="id_name"
                  autoFocus="id_name"
                  value={addressData.id_name}
                  onChange={handleChange}
                  required
                  fullWidth
                />
                <div className="invalid-feedback">
                  Please enter the Name on ID.
                </div>
              </div>
              <div className="col-lg-6">
                <TextField
                  type="date"
                  className="form-control"
                  id="id-dob"
                  name="id_dob"
                  label="DOB"
                  autoComplete="id_dob"
                  autoFocus="id_dob"
                  value={addressData.id_dob}
                  onChange={handleChange}
                  required
                  fullWidth
                />
                <div className="invalid-feedback">
                  Please enter a valid DOB.
                </div>
              </div>
              <div className="col-lg-6 mt-4">
                <select
                  className="form-select form-select-sm"
                  id="id-type"
                  name="id_type"
                  value={addressData.id_type}
                  onChange={handleChange}
                  required
                >
                  <option defaultValue>Select Id Type</option>
                  <option value="driving licence">Driving License</option>
                  <option value="voter id">Voter Id</option>
                  <option value="aadhaar">Aadhaar</option>
                </select>
                <div className="invalid-feedback">
                  Please select an Id Type.
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="id-verify-button">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ backgroundColor: "#3E3232" }}
              >
                Verify
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default SellerIdVerification;
