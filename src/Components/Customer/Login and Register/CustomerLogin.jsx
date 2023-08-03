import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, AlertTitle } from "@mui/material";
import {  useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import authCustomerReducer from "../../../redux/customerAuth/reducers/authCustomerReducer";
import { customerLogin } from "../../../redux/customerAuth/actions/authCustomerActions";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    phone: "",
    password: "",
    otp: "",
  });

  const isLoggedIn = useSelector((state) => state.customerAuth.isCustomerLoggedIn)
  const dispatch = useDispatch()

  const [alertData, setAlertData] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertEnable, setAlertEnable] = useState(false);

  const navigate = useNavigate();

  const [isEmailLogin, setIsEmailLogin] = useState(false);
  const [otpHasSend, setOtpHasSend] = useState(false);
  const [isOtpLogin, setIsOtpLogin] = useState(true);
  const [isPhoneLogin, setIsPhoneLogin] = useState(false);
  const [disableResend, setDisableResend] = useState(true);
  const [isSubmit, setisSubmit] = useState(false);
  const [isResend, setIsResend] = useState(false);

  const BASE_URL = "http://127.0.0.1:8000/customer/";

  const InputCleaner = () => {
    setLoginData({ ...loginData, otp: "" });
  };

  const handleOtpSend = async () => {
    if (loginData.phone.length != 10) {
      setAlertEnable(true);
      setAlertData("Invalid Number");
      setAlertSeverity("warning");
      return;
    }

    if (!isOtpLogin) {
    return;}

    if (otpHasSend) {
    return;}

    try {
      const otpCreateResponse = await axios.get(
        `${BASE_URL}otp-login-create/${loginData.phone}/`
      );
      if (otpCreateResponse.status === 200) {
        setOtpHasSend(true);
        setIsResend(false);
        setisSubmit(true);
        setAlertData(otpCreateResponse.data.message);
        setAlertEnable(true);
        setAlertSeverity("success");
        InputCleaner();
      }
    } catch (error) {
      setAlertData(error.response.data.message);
      setAlertEnable(true);
      setAlertSeverity("error");
    }
  };

  const handleOtpResend = async () => {
    try {
      const otpCreateResponse = await axios.get(
        `${BASE_URL}otp-login-create/${loginData.phone}/`
      );
      if (otpCreateResponse.status === 200) {
        setOtpHasSend(true);
        setisSubmit(true);
        setAlertData(otpCreateResponse.data.message);
        setAlertEnable(true);
        setAlertSeverity("success");
        InputCleaner();
      }
    } catch (error) {
      setAlertData(error.response.data.message);
      setAlertEnable(true);
      setAlertSeverity("error");
    }
  }

  const handleReset = async () => {
    setIsEmailLogin(false);
    setIsOtpLogin(true);
    setIsPhoneLogin(false);
    setOtpHasSend(false);
    setDisableResend(true);

    setLoginData({
      phone: "",
      otp: "",
      email: "",
      password: "",
    });
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (loginData.phone.length != 10) return;

    if (otpHasSend && isOtpLogin) {
      try {
        const otpVerifyResponse = await axios.post(
          `${BASE_URL}otp-login-verify/`,
          {
            phone: loginData.phone,
            user_typed_code: loginData.otp,
          }
        );

        if (otpVerifyResponse.status === 200) {
          localStorage.setItem("token", otpVerifyResponse.data.token);
          dispatch(customerLogin())
          navigate("/");
        }
      } catch (error) {
        setAlertData(error.response.data.message);
        setAlertEnable(true);
        setAlertSeverity("error");
      }
    }

    if (isPhoneLogin && !isEmailLogin && !isOtpLogin) {
      try {
        const phonePasswordResponse = await axios.post(
          `${BASE_URL}login-using-phone/`,
          {
            phone: loginData.phone,
            password: loginData.password,
          }
        );

        if (phonePasswordResponse.status === 200) {
          localStorage.setItem("token", phonePasswordResponse.data.token);
          dispatch(customerLogin())
          navigate("/");
        }
      } catch (error) {
        setAlertData(error.response.data.message);
        setAlertEnable(true);
        setAlertSeverity("error");
      }
    }

    if (isEmailLogin && !isPhoneLogin && !isOtpLogin) {
      try {
        const emailPasswordResponse = await axios.post(
          `${BASE_URL}login-using-email/`,
          {
            email: loginData.email,
            password: loginData.password,
          }
        );

        if (emailPasswordResponse.status === 200) {
          localStorage.setItem("token", emailPasswordResponse.data.token);
          dispatch(customerLogin())
          navigate("/");
        }
      } catch (error) {
        setAlertData(error.response.data.message);
        setAlertEnable(true);
        setAlertSeverity("error");
      }
    }
  };

  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
  };

  const handleAlertClose = () => {
    setAlertEnable(false);
  };

  useEffect(() => {
    if (disableResend) {
      setTimeout(() => {
        setDisableResend(false);
      }, 10000);
    }

    if (alertEnable) {
      setTimeout(() => {
        setAlertEnable(false);
      }, 5000);
    }
  }, []);

  return (
    <>
      <div className="container-fluid d-flex justify-content-center align-items-start pt-5 mt-5 vh-100">
        <div className="w-50">
          {alertEnable && (
            <Alert
              severity={alertSeverity}
              onClose={handleAlertClose}
              className="custom-alert"
            >
              <AlertTitle>{alertSeverity}</AlertTitle>
              {alertData}
            </Alert>
          )}
          <h2 className="text-center mb-5">Customer Login</h2>
          <form onSubmit={handleOtpSubmit}>
            <div className="form-outline">
              <input
                type={
                  otpHasSend
                    ? "number"
                    : isPhoneLogin || isOtpLogin
                    ? "number"
                    : "email"
                }
                id="phone-or-email"
                value={
                  otpHasSend
                    ? loginData.otp
                    : isPhoneLogin || isOtpLogin
                    ? loginData.phone
                    : loginData.email
                }
                name={
                  otpHasSend
                    ? "otp"
                    : isPhoneLogin || isOtpLogin
                    ? "phone"
                    : "email"
                }
                onChange={handleInputChange}
                className="form-control"
              />
              <label className="form-label" htmlFor="phone-or-email">
                {otpHasSend
                  ? "otp"
                  : isPhoneLogin || isOtpLogin
                  ? "Phone"
                  : "Email"}
              </label>
            </div>

            {(isPhoneLogin || isEmailLogin) &&  (
              <div className="form-outline">
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={loginData.password}
                  name="password"
                  onChange={handleInputChange}
                />
                <label className="form-label" htmlFor="otp-or-password">
                  Password
                </label>
              </div>
            )}

            {otpHasSend && !isPhoneLogin && !isEmailLogin && (
              <button
                type="button"
                className="btn btn-dark w-100"
                disabled={disableResend}
                onClick={() => {
                  setDisableResend(true);
                  handleOtpResend()
                }}
              >
                Resend Otp
              </button>
            )}

            <button
              type={
                otpHasSend || isPhoneLogin || isEmailLogin ? "submit" : "button"
              }
              className="btn btn-primary w-100"
              onClick={handleOtpSend}
            >
              {otpHasSend
                ? "SUBMIT"
                : isPhoneLogin || isEmailLogin
                ? "SIGN IN"
                : "CONTINUE"}
            </button>

            {otpHasSend && (
            <button
              className="btn btn-danger w-100"
              type="button"
              onClick={handleReset}
            >
              Cancel
            </button>
          )}

            <div className="row mb-4 mt-3">
              {(!isPhoneLogin) && (
                <div className="col d-flex justify-content-center">
                  <div className="form-check">
                    <input
                      className="btn-check"
                      type="checkbox"
                      id="phone-checkbox"
                      onChange={() => {
                        {
                          setIsOtpLogin(false);
                          setIsEmailLogin(false);
                          setIsPhoneLogin(true);
                        }
                      }}
                    />
                    <label className="btn btn-outline-primary" htmlFor="phone-checkbox">
                      {`${!isOtpLogin || isEmailLogin ? "Phone" : "Password"}`}
                    </label>
                  </div>
                </div>
              )}
              {(!isEmailLogin) && (
                <div className="col d-flex justify-content-center">
                  <div className="form-check">
                    <input
                      className="btn-check"
                      type="checkbox"
                      id="email-checkbox"
                      onChange={() => {
                        setIsOtpLogin(false);
                        setIsPhoneLogin(false);
                        setIsEmailLogin(true);
                        console.log("done")
                      }}
                    />
                    <label
                      className="btn btn-outline-primary"
                      htmlFor="email-checkbox"
                    >
                      Email
                    </label>
                  </div>
                </div>
              )}

              {(!isOtpLogin) && (
                <div className="col d-flex justify-content-center">
                  <div className="form-check ">
                    <input
                      className="btn-check"
                      type="checkbox"
                      id="otp-checkbox"
                      onChange={() => {
                        setIsEmailLogin(false);
                        setIsPhoneLogin(false);
                        setIsOtpLogin(true);
                      }}
                    />
                    <label
                      className="btn btn-outline-primary"
                      htmlFor="otp-checkbox"
                    >
                      OTP
                    </label>
                  </div>
                </div>
              )}

              <div className="col">
                <a href="#!" className="btn btn-outline-dark">Forgot password?</a>
              </div>
            </div>



            <div className="text-center">
              <p>
                Not a member? <Link to="/customer-register">Register</Link>
              </p>
            </div>
          </form>

        </div>
      </div>
      )
    </>
  );
};

export default LoginForm;
