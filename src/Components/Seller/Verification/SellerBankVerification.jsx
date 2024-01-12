import axios from "axios";
import React, { useState } from "react";
import { Alert, AlertTitle } from "@mui/material";



const SellerBankVerification = (props) => {
  const [bankData, setBankData] = useState({
    account_number: "",
    confirm_account_number: "",
    account_holder_name: "",
    bank_name: "",
    bank_branch: "",
    ifsc_code: "",
  });

  
  const [alertEnable, setAlertEnable] = useState(false);
  const [alertData, setAlertData] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  const handleChange = (e) => {
    setBankData({ ...bankData, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormEmpty = Object.values(bankData).some((value) => value.trim() === '');
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
    if (bankData.account_number !== bankData.confirm_account_number) {
      setAlertData("Account Numbers are not matching");
      setAlertEnable(true);
      setAlertSeverity("warning");
      return;
    }
    const payload = {
      account_number: bankData.account_number,
      account_holder_name: bankData.account_holder_name,
      bank_name: bankData.bank_name,
      bank_branch: bankData.bank_branch,
      bank_ifsc: bankData.ifsc_code,
    };

    const token = localStorage.getItem("token");

    axios
      .put(props.url + "bank-verify/", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          props.setBankVerified(true);
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
          setAlertData("Bank verification failed");
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
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
  <div className="row">
    <div className="col-lg-12 mb-4">
      <label htmlFor="account-number">Account Number</label>
      <input
        type="number"
        className="form-control"
        id="account-number"
        placeholder="Account Number"
        name="account_number"
        value={bankData.account_number}
        onChange={handleChange}
        required
      />
      <div className="invalid-feedback">
        Please enter a valid account number.
      </div>
    </div>
    <div className="col-lg-12 mb-4">
      <label htmlFor="confirm-account-number">Confirm Account Number</label>
      <input
        type="number"
        className="form-control"
        id="confirm-account-number"
        placeholder="Confirm Account Number"
        name="confirm_account_number"
        value={bankData.confirm_account_number}
        onChange={handleChange}
        required
      />
      <div className="invalid-feedback">
        Please confirm the account number.
      </div>
    </div>
    <div className="col-lg-12 align-items-center mb-4 w-100">
      <div className="row">
        <div className="col-lg-6">
          <label htmlFor="account-holder-name">Account Holder Name</label>
          <input
            type="text"
            className="form-control"
            id="account-holder-name"
            placeholder="Account Holder Name"
            name="account_holder_name"
            value={bankData.account_holder_name}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">
            Please enter the account holder's name.
          </div>
        </div>
        <div className="col-lg-6">
          <label htmlFor="bank-name">Bank Name</label>
          <input
            type="text"
            className="form-control"
            id="bank-name"
            placeholder="Bank Name"
            name="bank_name"
            value={bankData.bank_name}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">
            Please enter the bank name.
          </div>
        </div>
      </div>
    </div>
    <div className="col-lg-12 align-items-center mb-4 w-100">
      <div className="row">
        <div className="col-lg-6">
          <label htmlFor="branch">Branch</label>
          <input
            type="text"
            className="form-control"
            id="branch"
            placeholder="Branch"
            name="bank_branch"
            value={bankData.bank_branch}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback" >
            Please enter the branch name.
          </div>
        </div>
        <div className="col-lg-6">
          <label htmlFor="ifsc-code">IFSC Code</label>
          <input
            type="text"
            className="form-control"
            id="ifsc-code"
            placeholder="IFSC Code"
            name="ifsc_code"
            value={bankData.ifsc_code}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">
            Please enter a valid IFSC code.
          </div>
        </div>
      </div>
    </div>
    <div className="col-lg-12">
      <div className="id-verify-button">
        <button className="btn btn-lg btn-danger w-100" type="submit">
          Verify
        </button>
      </div>
    </div>
  </div>
</form>

    </>
  );
};

export default SellerBankVerification;
