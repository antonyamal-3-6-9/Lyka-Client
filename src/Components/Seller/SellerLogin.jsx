import React, { useState, useEffect } from "react";
import "../Seller/seller.scss";
import { Link, useNavigate } from "react-router-dom";
import { Alert, AlertTitle } from "@mui/material";
import axios from "axios";

const SellerLogin = () => {
  const [loginWithOTP, setLoginWithOTP] = useState(false);
  const [useEmail, setUseEmail] = useState(false);

  const [otpCreated, setOtpCreated] = useState(false);
  const [otpbuttonDisbled, setOtpButtonDisabled] = useState(false);

  const [alertEnable, setAlertEnable] = useState(false);
  const [alertData, setAlertData] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  const navigate = useNavigate();

  const BASE_URL = "http://127.0.0.1:8000/seller/";

  const handleOtpCheckboxChange = () => {
    setLoginWithOTP(!loginWithOTP);
  };

  const handleEmailCheckboxChange = () => {
    setUseEmail(!useEmail);
  };

  const [sellerLoginData, setSellerLoginData] = useState({
    email: "",
    phone: "",
    password: "",
    otp: "",
  });

  const handleChange = (e) => {
    setSellerLoginData({ ...sellerLoginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (useEmail && !loginWithOTP) {
        const payload = {
          email: sellerLoginData.email,
          password: sellerLoginData.password,
        };

        const response = await axios.post(BASE_URL + "login-email/", payload);

        if (response.status === 200) {
          const token = response.data.token;
          localStorage.setItem("token", token);
          navigate("/seller/home");
        }
      } else if (!useEmail && !loginWithOTP) {
        const payload = {
          phone: sellerLoginData.phone,
          password: sellerLoginData.password,
        };

        const response = await axios.post(BASE_URL + "login-phone/", payload);

        if (response.status === 200) {
          const token = response.data.token;
          localStorage.setItem("token", token);
          navigate("/seller/home");
        }
      } else if (!useEmail && loginWithOTP) {
        const payload = {
          phone: sellerLoginData.phone,
          user_otp: sellerLoginData.otp,
        };
        const response = await axios.post(
          BASE_URL + "phone-otp-login-verify/",
          payload
        );

        if (response.status === 200) {
          const token = response.data.token;
          localStorage.setItem("token", token);
          navigate("/seller/home");
        }
      }
    } catch (error) {
      setAlertEnable(true);
      setAlertData(error.response.data.message);
      setAlertSeverity("error");
    }
  };

  const handleSendOtp = async () => {
    if (sellerLoginData.phone.length <= 0){
      setAlertData("Enter your phone Number")
      setAlertEnable(true)
      setAlertSeverity("warning")
      return
    }
    try {
      const otpResponse = await axios.get(
        BASE_URL + "phone-otp-login-create/",
        {
          params: {
            phone: sellerLoginData.phone
          },
        }
      );

      if (otpResponse.status === 200) {
        setOtpCreated(true);
        setOtpButtonDisabled(true);
      }
    } catch (error) {
      setAlertEnable(true);
      console.log(error.response.data.message)
      setAlertSeverity("error");
      setAlertData(error.response.data.message)
    }
  };

  useEffect(() => {
    let timer;

    if (otpCreated) {
      timer = setTimeout(() => {
        setOtpButtonDisabled(false);
      }, 60000);
    }

    return () => clearTimeout(timer);
  }, [otpCreated]);

  const handleAlertClose = () => {
    setAlertEnable(false)
  }

  return (
    <>
      <div>
        {alertEnable && (
          <Alert severity={alertSeverity} onClose={handleAlertClose}>
            <AlertTitle>Error</AlertTitle>
            {alertData}
          </Alert>
        )}
      </div>
      <div className="login-container">
        <div className="login-form">
          <h2>Seller Login</h2>
          <form onSubmit={handleSubmit}>
          <div className="input-group">
          {!useEmail && <span className="input-group-text">+91</span>}
            <input
              type={useEmail ? "email" : "number"}
              className="form-control"
              placeholder={useEmail ? "email" : "phone"}
              name={useEmail ? "email" : "phone"}
              value={useEmail ? sellerLoginData.email : sellerLoginData.phone}
              onChange={handleChange}
              required
            />
            </div>
            <br />
            {loginWithOTP ? (
              <>
                <input
                  type="number"
                  className="form-control"
                  placeholder="OTP"
                  name="otp"
                  value={sellerLoginData.otp}
                  onChange={handleChange}
                  required
                />
                <br />
                <button
                  className="mb-1 btn btn-success"
                  type="button"
                  disabled={otpbuttonDisbled}
                  onClick={handleSendOtp}
                >
                  {otpCreated ? "Resend OTP" : "Send OTP"}
                </button>
              </>
            ) : (
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                value={sellerLoginData.password}
                onChange={handleChange}
                required
              />
            )}
            <br />
            <button type="submit">Login</button>
          </form>
          {useEmail === false && (
            <div className="otp-option">
              <label>
                <input
                  type="checkbox"
                  checked={loginWithOTP}
                  onChange={handleOtpCheckboxChange}
                />
                Login via OTP
              </label>
            </div>
          )}

          {loginWithOTP === false && (
            <div className="otp-option">
              <label>
                <input
                  type="checkbox"
                  checked={useEmail}
                  onChange={handleEmailCheckboxChange}
                />
                Use email instead of phone
              </label>
            </div>
          )}
          <div>
            <Link to="/seller-register">Register Now</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerLogin;
