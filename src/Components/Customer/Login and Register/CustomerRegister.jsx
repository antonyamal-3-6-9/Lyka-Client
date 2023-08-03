import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle } from "@mui/material";
import { useDispatch } from "react-redux";
import { customerLogin} from "../../../redux/customerAuth/actions/authCustomerActions";


const RegisterForm = () => {
  const navigate = useNavigate()
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const dispatch = useDispatch()

  const [alertData, setAlertData] = useState("")
  const [alertSeverity, setAlertSeverity] = useState("")
  const [alertEnable, setAlertEnable] = useState(false)

  const [isRegistered, setIsRegistered] = useState(false);
  const BASE_URL = "http://127.0.0.1:8000/customer/";

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const existResponse = await axios.get(
        `${BASE_URL}customer-exists-or-not/${phoneNumber}/`
      );

      if (existResponse.status === 200) {
        try {
          const registerResponse = await axios.post(`${BASE_URL}register/`, {
            user: {
              phone: phoneNumber,
            },
          });

          if (registerResponse.status === 201) {
            setAlertData("You has been registered successfully")
            setAlertEnable(true)
            setAlertSeverity("success")
            setIsRegistered(true);
            try {
              const otpResponse = await axios.get(
                `${BASE_URL}otp-login-create/${phoneNumber}/`
              );
              if (otpResponse.status === 200) {
                setAlertEnable(true)
                setAlertData("Otp has been successfully send")
                setAlertSeverity("success")
              }
            } catch (error) {
              setAlertData("Otp failed")
              setAlertEnable(true)
              setAlertSeverity("error")
            }
          }
        } catch (error) {
          setAlertData("Registration Failed")
          setAlertEnable(true)
          setAlertSeverity("error")
        }
      }
    } catch (error) {
      setAlertData("Customer Already Exists")
      setAlertEnable(true)
      setAlertSeverity("error")
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    console.log(otp)
    try {
      const otpVerifyResponse = await axios.post(`${BASE_URL}otp-login-verify/`, {
        user_typed_code: otp,
        phone: phoneNumber,
      });
      if (otpVerifyResponse.status === 200) {
        localStorage.setItem('token', otpVerifyResponse.data.token)
        dispatch(customerLogin())
        navigate("/")
      }
    } catch (error) {
      setAlertData(error.data.message)
      setAlertEnable(true)
      setAlertSeverity("error")
    }
  };

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleAlertClose = () => {
    setAlertEnable(false)
  }

  useEffect(() => {
    if(alertEnable){
      setTimeout(() => {
        setAlertEnable(false)
      }, 5000);
    }
  }, [])

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
            {alertEnable && (
          <Alert severity={alertSeverity} onClose={handleAlertClose} className="custom-alert">
            <AlertTitle>Error</AlertTitle>
            {alertData}
          </Alert>
        )}
      <div className="w-50">
        <h2 className="text-center mb-5">Customer Registration</h2>
        <div id="pills-register" role="tabpanel" aria-labelledby="tab-register">
          <form
            onSubmit={(e) => {
              isRegistered ? handleOtpSubmit(e) : handleRegisterSubmit(e);
            }}
          >
            <div className="form-outline mb-4">
              <input
                type="number"
                id="register-number"
                className="form-control"
                value={isRegistered ? otp : phoneNumber}
                onChange={(e) => {
                  isRegistered ? handleOtpChange(e) : handlePhoneChange(e);
                }}
              />
              <label className="form-label" htmlFor="register-number">
                {isRegistered ? "Enter OTP" : "Enter Your Number"}
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block mb-3 w-100"
              onSubmit={(e) => {
                isRegistered ? handleOtpSubmit(e) : handleRegisterSubmit(e);
              }}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
