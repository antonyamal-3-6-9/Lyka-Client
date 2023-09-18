import React, { useState } from "react";
import { Alert, AlertTitle } from "@mui/material";
import axios from "axios";

const UpdatePassword = (props) => {

  const [newPasswords, setNewPasswords] = useState({
    existing_password: "",
    new_password: "",
    confirm_new_password: "",
  });

  const handleChange = (e) => {
    setNewPasswords({ ...newPasswords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPasswords.new_password !== newPasswords.confirm_new_password) {
      props.setAlertEnable(true);
      props.setAlertData("Passwords are not matching");
      props.setAlertSeverity("warning");
      return;
    }

    if (newPasswords.existing_password === 0) {
      props.setAlertEnable(true);
      props.setAlertData("Old Password Must not be blank");
      props.setAlertSeverity("warning");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const passwordUpdateResponse = await axios.post(
        `${props.url}change-password/`,
        {
          existing_password: newPasswords.existing_password,
          new_password: newPasswords.new_password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (passwordUpdateResponse.status === 200) {
        props.setAlertData("Password Updated Successfully");
        props.setAlertEnable(true);
        props.setAlertSeverity("success");
        props.setIsUpdatePassword(false);
      }
    } catch (error) {
      if (error.response.status === 406) {
        props.setAlertData("Failed, Incorrect Password Entered");
        props.setAlertEnable(true);
        props.setAlertSeverity("error");
      } else {
        props.setAlertData("Error updating password, Try again Later");
        props.setAlertEnable(true);
        props.setAlertSeverity("error");
      }
    }
  };

  return (
    <>
      <div className="container-fluid w-75 p-5 pb-0 mt-5">
        {props.alertEnable && (
          <Alert
            severity={props.alertSeverity}
            onClose={props.handleAlertClose}
          >
            <AlertTitle>Error</AlertTitle>
            {props.alertData}
          </Alert>
        )}
        <h2 className="text-center">Update Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="row w-50">
            <div className="col-lg-12">
              <label className="form-label">Existing password</label>
              <input
                type="password"
                className="form-control"
                name="existing_password"
                required
                value={newPasswords.existing_password}
                onChange={handleChange}
              />
            </div>
            <div className="col-lg-12">
              <label className="form-label">New Password</label>
              <input
                type="text"
                className="form-control"
                placeholder=""
                name="new_password"
                required
                value={newPasswords.new_password}
                onChange={handleChange}
              />
            </div>
            <div className="col-lg-12">
              <label className="form-label">Confirm New Password</label>
              <input
                type="text"
                className="form-control"
                placeholder=""
                name="confirm_new_password"
                required
                value={newPasswords.confirm_new_password}
                onChange={handleChange}
              />
            </div>
            <div className="col-lg-6">
              <button className="btn btn-success" type="submit">
                Update Password
              </button>
            </div>
            <div className="col-lg-6">
              <button
                className="btn btn-success"
                type="button"
                onClick={() => props.setIsUpdatePassword(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdatePassword;
