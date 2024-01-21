import axios from "axios";
import React, { useState } from "react";
import { Alert, AlertTitle, Button, TextField } from "@mui/material";

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
      <TextField
        type="number"
        id="account-number"
        label="Account Number"
        name="account_number"
        autoComplete="account_number"
        autoFocus="account_number"
        value={bankData.account_number}
        onChange={handleChange}
        fullWidth
        required
      />
      <div className="invalid-feedback">
        Please enter a valid account number.
      </div>
    </div>
    <div className="col-lg-12 mb-4">
      <TextField
        type="number"
        id="confirm-account-number"
        label="Confirm Account Number"
        autoComplete="confirm_account_number"
        autoFocus="confirm_account_number"
        fullWidth
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
          <TextField
            type="text"
            className="form-control"
            id="account-holder-name"
            label="Account Holder Name"
            name="account_holder_name"
            autoComplete="account_holder_name"
            autoFocus="account_holder_name"
            value={bankData.account_holder_name}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">
            Please enter the account holder's name.
          </div>
        </div>
        <div className="col-lg-6">
          <TextField
            type="text"
            className="form-control"
            id="bank-name"
            label="Bank Name"
            autoComplete="bank_name"
            autoFocus="bank_name"
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
          <TextField
            type="text"
            className="form-control"
            id="branch"
            label="Branch"
            autoComplete="bank_branch"
            autoFocus="bank_branch"
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
          <TextField
            type="text"
            className="form-control"
            id="ifsc-code"
            label="IFSC Code"
            name="ifsc_code"
            autoComplete="ifsc_code"
            autoFocus="ifsc_code"
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
        <Button variant="contained" fullWidth type="submit" style={{ backgroundColor: "#3E3232" }}>
          Verify
        </Button>
      </div>
    </div>
  </div>
</form>

    </>
  );
};

export default SellerBankVerification;
