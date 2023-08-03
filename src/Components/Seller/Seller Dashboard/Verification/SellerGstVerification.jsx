import React, { useState } from "react";
import axios from "axios";
import { Alert, AlertTitle } from "@mui/material";

const SellerGstVerification = (props) => {
  const [gstData, setGstData] = useState({
    gst_number: "",
  });

  const [alertEnable, setAlertEnable] = useState(false);
  const [alertData, setAlertData] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  const handleChange = (e) => {
    setGstData({ [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormEmpty = Object.values(gstData).some((value) => value.trim() === '');
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
      gst_number: gstData.gst_number,
    };

    const token = localStorage.getItem("token");
    axios
      .put(props.url + "gst-verify/", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if ((response.status = 200)) {
          props.setGstVerified(true);
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
          setAlertData("GST verication Failed");
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
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        <div className="row d-flex-justify-content-center align-items-center h-100">
          <div className="col-lg-12 mb-0">
            <label htmlFor="gst-number">GSTIN NUMBER</label>
            <input
              type="text"
              className="form-control"
              id="gst-number"
              placeholder="GSTIN NUMBER"
              name="gst_number"
              value={gstData.gst_number}
              onChange={handleChange}
              required
            />
              <div className="invalid-feedback">
                Please enter a GSTIN number.
              </div>
          </div>
          <div className="col-lg-12">
            <div className="id-verify-button">
              <button
                className="btn btn-lg btn-danger w-100 mt-5"
                type="submit"
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      </form>

    </>
  );
};

export default SellerGstVerification;
