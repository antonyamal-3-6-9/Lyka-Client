import axios from "axios";
import React, { useState } from "react";
import { Alert, AlertTitle } from "@mui/material";

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
          <div className="col-lg-12 mb-0">
            <div className="pan-number">
              <input
                type="text"
                className="form-control"
                name="pan_number"
                value={panData.pan_number}
                onChange={handleChange}
                placeholder="Pan Number"
                required
              />
              <div className="invalid-feedback">
                Please enter a valid PAN number.
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="id-verify-button">
              <button className="btn btn-lg btn-danger w-100 mt-5">
                Verify
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default SellerPanVerification;
