import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useState } from "react";

const PasswordForm = ({ hasPassword, setIsUpdatePassword, BASE_URL }) => {
  const token = localStorage.getItem("token");
  const [passwordData, setPasswordData] = useState({
    old_password: "",
    new_password: "",
    new_password2: "",
  });

  const handleChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const checkPassword = () => {
    if (passwordData.new_password === passwordData.new_password2) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkPassword) {
      console.log("Passwords are not matching");
      return;
    }
    try {
      const passwordChangeResponse = await axios.patch(
        `${BASE_URL}set-password/`,
        {
          password: passwordData.old_password,
          new_password: passwordData.new_password,
        },
        {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (passwordChangeResponse.status === 200) {
        setIsUpdatePassword(false);
        console.log("Password has been successfully update");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid">
      <form onSubmit={handleSubmit}>
        <div className="row">
          {hasPassword && (
            <div className="col-lg-12">
              <label className="form-label">Existing password</label>
              <input
                type="password"
                className="form-control"
                name="old_password"
                required
                onChange={handleChange}
                value={passwordData.old_password}
              />
            </div>
          )}
          <div className="col-lg-12">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              placeholder=""
              name="new_password"
              required
              onChange={handleChange}
              value={passwordData.new_password}
            />
          </div>
          <div className="col-lg-12">
            <label className="form-label">Confirm New Password</label>
            <input
              type="password"
              className="form-control"
              placeholder=""
              name="new_password2"
              required
              onChange={handleChange}
              value={passwordData.new_password2}
            />
          </div>
          <div className="col-lg-6">
            <button className="btn btn-success" type="submit">
              Save Changes
            </button>
          </div>
          <div className="col-lg-6">
            <button
              className="btn btn-success"
              type="button"
              onClick={() => {
                setIsUpdatePassword(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PasswordForm;
