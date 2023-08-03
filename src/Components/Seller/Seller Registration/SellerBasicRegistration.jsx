import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Alert, AlertTitle } from "@mui/material";

const SellerBasicRegistration = (props) => {
  const [otpCreated, setOtpCreated] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [disableSendButton, setDisableSendButton] = useState(false);

  const [alertEnable, setAlertEnable] = useState(false);
  const [alertData, setAlertData] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  const [sellerData, setSellerData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    businessName: "",
    otp: "",
  });

  const handleChange = (e) => {
    setSellerData({ ...sellerData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const registerResponse = await axios.post(props.url + "register/", {
        user: {
          email: sellerData.email,
          first_name: sellerData.firstName,
          last_name: sellerData.lastName,
          phone: sellerData.phoneNumber,
          password: sellerData.password,
        },
        bussiness_name: sellerData.businessName,
      });

      if (registerResponse.status === 201) {
        const loginResponse = await axios.post(props.url + "login-phone/", {
          phone: sellerData.phoneNumber,
          password: sellerData.password,
        });

        if (loginResponse.status === 200) {
          const token = loginResponse.data.token;
          localStorage.setItem("token", token);
          navigate("/seller/products");
        }
      }
    } catch (error) {
      setAlertEnable(true);
      setAlertData(error.response.data.message);
      console.log(error)
      setAlertSeverity("error");
    }
  };

  const handleOtpCreationClick = async () => {
    const phone = `+91${sellerData.phoneNumber}`
    try {
      const existsResponse = await axios.get(
        props.url + "seller-exists-or-not/",
        {
          params: {
            email: sellerData.email,
            phone: sellerData.phoneNumber,
          },
        }
      );

      if (existsResponse.status === 226) {
        setAlertEnable(true);
        setAlertData(existsResponse.data.message);
        setAlertSeverity("error");
      } else if (existsResponse.status === 200) {
        const otpResponse = await axios.get(props.url + "phone-otp-create/", {
          params: {
            to_number: phone,
          },
        });

        if (otpResponse.status === 200) {
          setOtpCreated(true);
          setDisableSendButton(true);
          setAlertEnable(true);
          setAlertData(otpResponse.data.message);
          setAlertSeverity("success");
        }
      }
    } catch (error) {
      setAlertEnable(true);
      setAlertData(error.response.data.message);
      console.log(error)
      setAlertSeverity("error");
    }
  };

  const handleOtpVerifyClick = async () => {
    const phone = `+91${sellerData.phoneNumber}`
    try {
      const response = await axios.post(props.url + "phone-otp-verify/", {
        user_typed: sellerData.otp,
        phone_number: phone,
      });

      if (response.status === 200) {
        setOtpVerified(true);
        setAlertEnable(true);
        setAlertData(response.data.message);
        setAlertSeverity("success");
      }
    } catch (error) {
      setAlertEnable(true);
      setAlertData(error.response.data.message);
      setAlertSeverity("error");
    }
  };

  const handleAlertClose = () => {
    setAlertEnable(false);
  };

  useEffect(() => {
    let timer;

    if (otpCreated && !otpVerified) {
      timer = setTimeout(() => {
        setDisableSendButton(false);
      }, 60000);
    }

    return () => clearTimeout(timer);
  }, [otpCreated, otpVerified]);

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

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-12 align-items-center mt-4 mb-4 w-100">
            <div className="row">
              <div className="col-lg-6">
                <div className="basic-first-name">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="First Name"
                    name="firstName"
                    value={sellerData.firstName}
                    onChange={handleChange}
                    readOnly={otpCreated}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="basic-last-name">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Last name"
                    name="lastName"
                    value={sellerData.lastName}
                    onChange={handleChange}
                    readOnly={otpCreated}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12 mb-4">
            <div className="basic-email-id">
              <input
                type="email"
                class="form-control"
                placeholder="Email-id"
                name="email"
                value={sellerData.email}
                onChange={handleChange}
                readOnly={otpCreated}
              />
            </div>
          </div>
          <div className="col-lg-12 mb-4">
            <div className="input-group">
            <span className="input-group-text">+91</span>
              <input
                type="number"
                class="form-control"
                placeholder="Phone Number"
                name="phoneNumber"
                value={sellerData.phoneNumber}
                onChange={handleChange}
                readOnly={otpCreated}
              />
            </div>
          </div>
          <div className="col-lg-12 mb-4">
            <div className="basic-first-name">
              <input
                type="text"
                class="form-control"
                placeholder="Bussiness Name"
                name="businessName"
                value={sellerData.businessName}
                onChange={handleChange}
                readOnly={otpCreated}
              />
            </div>
          </div>
          <div className="col-lg-12 mb-4">
            <div className="basic-first-name">
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                name="password"
                value={sellerData.password}
                onChange={handleChange}
                readOnly={otpCreated}
              />
            </div>
          </div>
          <div className="col-lg-8 mb-4">
            <div className="d-flex w-100 align-items-center">
              <div className="row flex-grow-1">
                <div className="col-lg-4">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="otp"
                    name="otp"
                    value={sellerData.otp}
                    onChange={handleChange}
                    readOnly={otpVerified}
                  />
                </div>
                <div className="col-lg-4">
                  <div className="basic-otp-create-button me-3 w-100">
                    <button
                      type="button"
                      className="btn btn-outline-dark w-100"
                      onClick={handleOtpCreationClick}
                      disabled={disableSendButton}
                    >
                      Send OTP
                    </button>
                  </div>
                </div>
                {otpCreated && (
                  <div className="col-lg-4">
                    <div className="basic-otp-verify-button me-3 w-100">
                      <button
                        type="button"
                        className="btn btn-outline-dark w-100"
                        onClick={handleOtpVerifyClick}
                        disabled={otpVerified}
                      >
                        {otpVerified ? "Verified" : "Verify"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="row d-flex align-items-center justify-content-center">
              <div className="col-lg-4 flex-grow-1">
                <div className="basic-first-name w-100">
                  <button
                    type="submit"
                    disabled={!otpVerified}
                    className="btn btn-success w-100"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="pt-5 text-center">
        <Link className="btn btn-dark" to="/seller-login">
          Already a seller, Login Now
        </Link>
      </div>
    </>
  );
};
export default SellerBasicRegistration;
