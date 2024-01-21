import axios from "axios";
import React, { useState } from "react";
import { Alert, AlertTitle, Button, TextField } from "@mui/material";

const SellerPanVerification = (props) => {
  const [panData, setPanData] = useState({
    pan_number: "",
  });

  const [alertEnable, setAlertEnable] = useState(false);
  const [alertData, setAlertData] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  const handleChange = (e) => {
    setPanData({ [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormEmpty = Object.values(panData).some(
      (value) => value.trim() === ""
    );
    if (isFormEmpty) {
      const inputFields = document.querySelectorAll("input.form-control");
      inputFields.forEach((input) => {
        if (input.value.trim() === "") {
          input.classList.add("is-invalid");
        } else {
          input.classList.remove("is-invalid");
        }
      });
      return;
    }
    const payload = {
      pan_number: panData.pan_number,
    };

    const token = localStorage.getItem("token");
    axios
      .put(props.url + "pan-verify/", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if ((response.status = 200)) {
          props.setPanVerified(true);
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
          setAlertData("Pan Verification Failed");
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
      {alertEnable && (
        <Alert severity={alertSeverity} onClose={handleAlertClose}>
          <AlertTitle>Error</AlertTitle>
          {alertData}
        </Alert>
      )}
      <form onSubmit={handleSubmit} noValidate className="needs-validation">
        <div className="row d-flex-justify-content-center align-items-center h-100">
          <div className="col-lg-12 mb-3">
            <div className="pan-number">
              <TextField
                type="text"
                autoComplete="pan_number"
                autoFocus="pan_number"
                fullWidth
                name="pan_number"
                value={panData.pan_number}
                onChange={handleChange}
                label="Pan Number"
                required
              />
              <div className="invalid-feedback">
                Please enter a valid PAN number.
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="id-verify-button">
              <Button variant="contained" fullWidth style={{ backgroundColor: "#3E3232" }}>
                Verify
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default SellerPanVerification;
