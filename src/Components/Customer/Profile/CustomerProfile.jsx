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
import PasswordModal from "./PasswordModal";
import ProfileSideBar from "./ProfileSideBar";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import Orderlist from "../../Order/Orderlist";
import NewPasswordModal from "./newPasswordModal";

const CustomerProfile = () => {
  const BASE_URL = "http://127.0.0.1:8000/customer/";
  const token = localStorage.getItem("token");
  const { option } = useParams()

  const [customerData, setCustomerData] = useState({});
  const [isBasicEdit, setIsBasicEdit] = useState(false);
  const [isEmailEdit, setIsEmailEdit] = useState(false);
  const [isPhoneEdit, setIsPhoneEdit] = useState(false);

  const [options, setOptions] = useState(option);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileResponse = await axios.get(`${BASE_URL}retrive/`, {
          headers: {
            "content-type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setCustomerData(profileResponse.data);
        console.log(profileResponse);
      } catch (error) {
        console.log(error);
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmailOtpCreate = async () => {
    setIsEmail(true);
    setShowConfirmation(true);
    try {
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
        return true;
      }
    } catch (error) {
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
    await handleEmailOtpCreate()
  };

  const handleNumberSubmit = async (e) => {
    e.preventDefault();
    setShowConfirmation(true);
    setIsEmail(false);
    if (customerData.user.phone === "") {
      setIsPhoneChanged(false);
      setIsPhoneEdit(false);
      return;
    }
    try {
      const otpCreateResponse = await axios.get(
        `${BASE_URL}otp-create/${customerUpdatePhoneData.user.phone}/`
      );
      console.log(otpCreateResponse);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOtpVerification = async () => {
    if (!isEmail) {
      try {
        const verifyResponse = await axios.post(`${BASE_URL}otp-verify/`, {
          phone: customerUpdatePhoneData.user.phone,
          user_typed_code: phoneOtp,
        });
        if (verifyResponse.status === 200) {
          try {
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
              setIsPhoneChanged(false);
              setIsPhoneEdit(false);
              setShowConfirmation(false);
              setEmailOtp("");
              setPhoneOtp("");
            }
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const emailOtpResponse = await axios.post(
          `${BASE_URL}verify-email-otp/`,
          {
            user_typed_code: emailOtp,
            email: customerUpdateEmailData.user.email
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
            }
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (!canBeRendered) {
    return null;
  }

  return (
    <>
      <div className="container-fluid w-100" style={{height: "100vh", position: "fixed", top: "9%"}}>
        <div className="row w-100">
          <div className="col-lg-3 ps-3 pe-0 mt-4">
            <div className="card mb-3 mt-3 p-2 rounded-0">
              <div className="row mb-0">
                <div className="col-lg-3 d-flex justify-content-center align-items-center">
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{
                      "--fa-primary-color": "#1f4251",
                      "--fa-secondary-color": "#1f4251",
                      width: "30px",
                      height: "30px",
                    }}
                    className="text-center"
                  />
                </div>
                <div className="col-lg-9">
                      <span>Hy</span>
                      <h5 className="text-start h4">{customerData.user.first_name} {customerData.user.last_name}</h5>
                </div>
              </div>
            </div>
            <ProfileSideBar options={options} setOptions={setOptions} />
          </div>
          <div className="col-lg-9">
            <div className={`card rounded-0 p-3 m-3 pt-3 mt-0 ${options === "profile" ? "pt-3" : null}`} style={{overflow: "scroll", height: "100vh"}}>
                {options === "profile" ? (
                  <>
                    <OTPModal
                      setEmailOtp={setEmailOtp}
                      emailOtp={emailOtp}
                      phoneOtp={phoneOtp}
                      setPhoneOtp={setPhoneOtp}
                      isEmail={isEmail}
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
                  <><Orderlist/></>
                ) : null}
             </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerProfile;