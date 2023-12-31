import React from "react";
import NameForm from "./NameForm";
import EmailForm from "./EmailForm";
import NumberForm from "./NumberForm";
import AddressList from "./AddressList";
import AddNewAddressForm from "../../Checkout/AddNewAddressForm";
import { useEffect } from "react";
import { useState } from "react";
import OTPModal from "./OTPmodals";
import axios from "axios";
import ProfileSideBar from "./ProfileSideBar";
import FloatingAlert from "../../FloatingAlert/FloatingAlert";
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";
import Orderlist from "../../Order/Orderlist";
import NewPasswordModal from "./newPasswordModal";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  color: theme.palette.text.secondary,
}));

const CustomerProfile = () => {
  const BASE_URL = "http://127.0.0.1:8000/customer/";
  const token = localStorage.getItem("token");

  const [customerData, setCustomerData] = useState({});
  const [isBasicEdit, setIsBasicEdit] = useState(false);
  const [isEmailEdit, setIsEmailEdit] = useState(false);
  const [isPhoneEdit, setIsPhoneEdit] = useState(false);

  const [options, setOptions] = useState("profile");

  const [savedAddress, setSavedAddress] = useState([]);
  const [isSavedAddress, setIsSavedAddress] = useState(null);
  const [isAddNewAddress, setIsAddNewAddress] = useState(null);

  const [isBasicChanged, setIsBasicChanged] = useState(false);
  const [isEmailChanged, setIsEmailChanged] = useState(false);
  const [isPhoneChanged, setIsPhoneChanged] = useState(false);

  const [isUpdatePassword, setIsUpdatePassword] = useState(false);
  const [hasPassword, setHasPassword] = useState(null);

  const [alertEnable, setAlertEnable] = useState(false);
  const [alertData, setAlertData] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [emailOtp, setEmailOtp] = useState("");

  const [customerUpdateBasicData, setCustomerUpdateBasicData] = useState({
    user: {
      first_name: "",
      last_name: "",
    },
  });
  const [customerUpdateEmailData, setCustomerUpdateEmailData] = useState({
    user: {
      email: "",
    },
  });
  const [customerUpdatePhoneData, setCustomerUpdatePhoneData] = useState({
    user: {
      phone: "",
    },
  });

  const [phoneOtp, setPhoneOtp] = useState("");
  const [canBeRendered, setCanBeRendered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const profileResponse = await axios.get(`${BASE_URL}retrive/`, {
          headers: {
            "content-type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setCustomerData(profileResponse.data);
        setIsLoading(false);
      } catch (error) {
        setAlertData("error fetching data");
        setAlertEnable(true);
        setAlertSeverity("error");
        setIsLoading(false);
      }
      setCanBeRendered(true);
    };
    const ifHasPassword = async () => {
      try {
        const hasPasswordResponse = await axios.get(
          `${BASE_URL}has-password/`,
          {
            headers: {
              "content-type": "Application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setHasPassword(true);
      } catch (error) {
        setHasPassword(false);
        console.log(error);
      }
    };
    fetchData();
    ifHasPassword();
  }, [token]);

  const handleBasicSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      user: {
        first_name:
          customerUpdateBasicData.user.first_name === ""
            ? customerData.user.first_name
            : customerUpdateBasicData.user.first_name,
        last_name:
          customerUpdateBasicData.user.last_name === ""
            ? customerData.user.last_name
            : customerUpdateBasicData.user.last_name,
      },
    };
    try {
      setIsLoading(true);
      const basicResponse = await axios.patch(
        `${BASE_URL}update/${customerData.id}/`,
        payload,
        {
          headers: {
            "content-type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (basicResponse.status === 200) {
        setCustomerData({
          ...customerData,
          user: {
            ...customerData.user,
            first_name: customerUpdateBasicData.user.first_name,
            last_name: customerUpdateBasicData.user.last_name,
          },
        });
        setIsBasicEdit(false);
        setIsBasicChanged(false);
        setIsLoading(false);
      }
    } catch (error) {
      setAlertData("Unknown Error");
      setAlertEnable(true);
      setAlertSeverity("error");
      setIsLoading(false);
    }
  };

  const handleEmailOtpCreate = async () => {
    setIsEmail(true);
    setShowConfirmation(true);
    try {
      setIsLoading(true);
      const otpCreateResponse = await axios.get(
        `${BASE_URL}create-email-otp/${customerUpdateEmailData.user.email}/`,
        {
          headers: {
            "content-type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (otpCreateResponse.status === 200) {
        setIsLoading(false);
        return true;
      }
    } catch (error) {
      setAlertData("Error sending OTP");
      setAlertEnable(true);
      setAlertSeverity("error");
      setIsLoading(false);
      return false;
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    if (customerData.user.email === "") {
      setIsEmailEdit(false);
      setIsEmailChanged(false);
      return;
    }
    await handleEmailOtpCreate();
  };

  const handleNumberSubmit = async (e) => {
    if (customerUpdatePhoneData.user.phone.length !== 10) {
      setAlertData("Enter a Valid Number");
      setAlertEnable(true);
      setAlertSeverity("error");
      return;
    }
    e.preventDefault();
    try {
      setIsLoading(true);
      const submitResponse = await axios.patch(
        `${BASE_URL}update/${customerData.id}/`,
        {
          user: {
            phone: customerUpdatePhoneData.user.phone,
          },
        },
        {
          headers: {
            "content-type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (submitResponse.status === 200) {
        setCustomerData({
          ...customerData,
          is_email_verified: true,
          user: {
            ...customerData.user,
            phone: customerUpdatePhoneData.user.phone,
          },
        });
        setIsLoading(false);
        setIsPhoneChanged(false);
        setIsPhoneEdit(false);
        setShowConfirmation(false);
        setEmailOtp("");
        setPhoneOtp("");
        setAlertData("Phone number has been successfully updated");
        setAlertEnable(true);
        setAlertSeverity("success");
      }
    } catch (error) {
      setAlertData("Failed to update phone number");
      setAlertEnable(true);
      setAlertSeverity("error");
    }
  };

  const handleOtpVerification = async () => {
    try {
      setIsLoading(true);
      const emailOtpResponse = await axios.post(
        `${BASE_URL}verify-email-otp/`,
        {
          user_typed_code: emailOtp,
          email: customerUpdateEmailData.user.email,
        },
        {
          headers: {
            "content-type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (emailOtpResponse.status === 200) {
        setIsEmailChanged(false);
        setIsEmailEdit(false);
        showConfirmation(false);
        setEmailOtp("");
        setPhoneOtp("");
        try {
          const emailResponse = await axios.patch(
            `${BASE_URL}update/${customerData.id}/`,
            {
              user: {
                email: customerUpdateEmailData.user.email,
              },
            },
            {
              headers: {
                "content-type": "Application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (emailResponse.status === 200) {
            setCustomerData({
              ...customerData,
              is_email_verified: false,
              user: {
                ...customerData.user,
                email: customerUpdateEmailData.user.email,
              },
            });
            setIsEmailEdit(false);
            setIsEmailChanged(false);
            setIsLoading(false);
          }
        } catch (error) {
          setAlertData("Verification Failed");
          setAlertEnable(true);
          setAlertSeverity("error");
          setIsLoading(false);
        }
      }
    } catch (error) {
      setAlertData("Invalid OTP");
      setAlertEnable(true);
      setAlertSeverity("error");
      setIsLoading(false);
    }
  };

  if (!canBeRendered) {
    return null;
  }

  return (
    <>
      <div
        className="container-fluid"
        id="profile-base"
        style={{ backgroundColor: "#FCFFE7", marginTop: "84px" }}
      ><FloatingAlert 
        message={alertData}
        setEnable={setAlertEnable}
        enable={alertEnable}
        severity={alertSeverity}
        />
        <Backdrop
          open={isLoading}
        >
          <CircularProgress />
        </Backdrop>
        <div className="row">
          <div className="col-lg-3">
            <Item>
              <div className="card rounded-0 border border-0 ">
                <div className="row">
                  <div className="col-lg-3 d-flex justify-content-center align-items-start">
                    <AccountCircleIcon />
                  </div>
                  <div className="col-lg-9 d-flex justify-content-center align-items-start">
                    <h5 className="text-start h5 text-dark">
                      {customerData.user.first_name}{" "}
                      {customerData.user.last_name}
                    </h5>
                  </div>
                </div>
              </div>
              <ProfileSideBar options={options} setOptions={setOptions} />
            </Item>
          </div>
          <div className="col-lg-9">
            <div
              className={`card rounded-0b order border-0 `}
              style={{ height: "100vh", backgroundColor: "#FCFFE7" }}
            >
              {options === "profile" ? (
                <>
                  <Item>
                    <div>
                      <OTPModal
                        setEmailOtp={setEmailOtp}
                        emailOtp={emailOtp}
                        handleOtpConfirm={handleOtpVerification}
                        showConfirmation={showConfirmation}
                        setShowConfirmation={setShowConfirmation}
                      />
                      <NameForm
                        isBasicEdit={isBasicEdit}
                        setIsBasicEdit={setIsBasicEdit}
                        userData={customerData}
                        basicData={customerUpdateBasicData}
                        setBasicData={setCustomerUpdateBasicData}
                        isBasicChanged={isBasicChanged}
                        setIsBasicChanged={setIsBasicChanged}
                        handleSubmit={handleBasicSubmit}
                      />
                      <EmailForm
                        isEmailEdit={isEmailEdit}
                        setIsEmailEdit={setIsEmailEdit}
                        userData={customerData}
                        isEmailChanged={isEmailChanged}
                        setIsEmailChanged={setIsEmailChanged}
                        emailData={customerUpdateEmailData}
                        setEmailData={setCustomerUpdateEmailData}
                        handleSubmit={handleEmailSubmit}
                        otpCreate={handleEmailOtpCreate}
                      />
                      <NumberForm
                        isPhoneEdit={isPhoneEdit}
                        setIsPhoneEdit={setIsPhoneEdit}
                        userData={customerData}
                        handleNumberSubmit={handleNumberSubmit}
                        numberData={customerUpdatePhoneData}
                        setNumberData={setCustomerUpdatePhoneData}
                        setIsNumberChanged={setIsPhoneChanged}
                        isNumberChanged={isPhoneChanged}
                      />
                      <div className="d-flex justify-content-end mt-5">
                        {/* <PasswordModal
                        setIsUpdatePassword={setIsUpdatePassword}
                        hasPassword={hasPassword}
                        BASE_URL={BASE_URL}
                        isUpdatePassword={isUpdatePassword}
                      /> */}
                        <NewPasswordModal
                          setIsUpdatePassword={setIsUpdatePassword}
                          hasPassword={hasPassword}
                          BASE_URL={BASE_URL}
                          isUpdatePassword={isUpdatePassword}
                        />
                      </div>
                    </div>
                  </Item>
                </>
              ) : options === "address" ? (
                <>
                  {isAddNewAddress ? (
                    <AddNewAddressForm
                      setSavedAddress={setSavedAddress}
                      setIsAddNewAddress={setIsAddNewAddress}
                      savedAddress={savedAddress}
                    />
                  ) : (
                    <AddressList
                      isSavedAddress={isSavedAddress}
                      setIsSavedAddress={setIsSavedAddress}
                      savedAddress={savedAddress}
                      setSavedAddress={setSavedAddress}
                      setIsAddNewAddress={setIsAddNewAddress}
                    />
                  )}
                </>
              ) : options === "orders" ? (
                <>
                  <Orderlist />
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerProfile;
