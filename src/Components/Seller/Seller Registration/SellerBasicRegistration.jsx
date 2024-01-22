import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Alert, AlertTitle, TextField, Button } from "@mui/material";

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
    console.log(e.target.value);
    setSellerData({ ...sellerData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(sellerData);

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
        setAlertData('Registration is successful' )
        setAlertEnable(true)
          navigate('/seller-login')        
      }
    } catch (error) {
      setAlertEnable(true);
      setAlertData(error.response.data.message);
      console.log(error)
      setAlertSeverity("error");
    }
  };

  const handleOtpCreationClick = async () => {
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
        const otpResponse = await axios.get(props.url + "email-otp-create/" + sellerData.email + "/", {
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
    try {
      const response = await axios.post(props.url + "email-otp-verify/", {
        otp: sellerData.otp,
        email: sellerData.email,
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
                  <TextField
                    fullWidth
                    type="text"
                    label="First Name"
                    autoComplete="firstName"
                    autoFocus="firstName"
                    name="firstName"
                    value={sellerData.firstName}
                    onChange={handleChange}
                    readOnly={otpCreated}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="basic-last-name">
                  <TextField
                    type="text"
                    autoComplete="lastName"
                    autoFocus="lastName"
                    fullWidth
                    label="Last name"
                    name="lastName"
                    value={sellerData.lastName}
                    onChange={handleChange}
                    readOnly={otpCreated}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mb-4">
            <div className="basic-email-id">
              <TextField
                type="email"
                label="Email"
                autoComplete="email"
                autoFocus="email"
                fullWidth
                name="email"
                value={sellerData.email}
                onChange={handleChange}
                readOnly={otpCreated}
              />
            </div>
          </div>
          <div className="col-lg-6 mb-4">
            <div className="input-group">
              <TextField
                type="number"
                label="Phone Number"
                autoComplete="phoneNumber"
                autoFocus="phoneNumber"
                fullWidth
                name="phoneNumber"
                value={sellerData.phoneNumber}
                onChange={handleChange}
                readOnly={otpCreated}
              />
            </div>
          </div>
          <div className="col-lg-6 mb-4">
            <div className="basic-first-name">
              <TextField
                type="text"
                label="Bussiness Name"
                autoComplete="businessName"
                autoFocus="businessName"
                fullWidth
                name="businessName"
                value={sellerData.businessName}
                onChange={handleChange}
                readOnly={otpCreated}
              />
            </div>
          </div>
          <div className="col-lg-6 mb-4">
            <div className="basic-first-name">
              <TextField
                type="password"
                fullWidth
                autoComplete="password"
                autoFocus="password"
                label="Password"
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
                  <TextField
                    type="password"
                    fullWidth
                    autoComplete="otp"
                    autoFocus="otp"
                    label="OTP"
                    name="otp"
                    value={sellerData.otp}
                    onChange={handleChange}
                    readOnly={otpVerified}
                  />
                </div>
                <div className="col-lg-4">
                  <div className="basic-otp-create-button me-3 w-100">
                    <Button
                      variant="text"
                      onClick={handleOtpCreationClick}
                      disabled={disableSendButton}
                      style={{ color: "#3E3232" }}
                    >
                      Send OTP
                    </Button>
                  </div>
                </div>
                {otpCreated && (
                  <div className="col-lg-4">
                    <div className="basic-otp-verify-button me-3 w-100">
                      <Button
                        type="button"
                        variant="text"
                        onClick={handleOtpVerifyClick}
                        disabled={otpVerified}
                      >
                        {otpVerified ? "Verified" : "Verify"}
                      </Button>
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
                  <Button
                    type="submit"
                    disabled={!otpVerified}
                    variant="contained"
                    fullWidth
                    style={{ backgroundColor: "#3E3232" }}
                  >
                    Register
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="pt-3 text-center">
        <Link variant="contained" to="/seller-login">
          Already a seller, Login Now
        </Link>
      </div>
    </>
  );
};
export default SellerBasicRegistration;
