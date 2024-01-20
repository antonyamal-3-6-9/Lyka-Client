import React, { useEffect, useState } from "react";
import ProfileNav from "./ProfileNac";
import UpdatePassword from "./UpdatePassword";
import { Link } from "react-router-dom";
import axios from "axios";
import { Alert, AlertTitle } from "@mui/material";
import ProfileModal from "./ProfileModal";

const SellerProfile = () => {
  const [isBasicEdit, setIsBasicEdit] = useState(false);
  const [isEmailEdit, setIsEmailEdit] = useState(false);
  const [isPhoneEdit, setIsPhoneEdit] = useState(false);

  const [isBasicChanged, setIsBasicChanged] = useState(false);
  const [isEmailChanged, setIsEmailChanged] = useState(false);
  const [isPhoneChanged, setIsPhoneChanged] = useState(false);

  const [isUpdatePassword, setIsUpdatePassword] = useState(false);
  const [sellerProfileData, setSellerProfileData] = useState({});

  const [alertEnable, setAlertEnable] = useState(false);
  const [alertData, setAlertData] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [emailOtp, setEmailOtp] = useState("");

  const [sellerUpdatedBasicData, setSellerUpdatedBasicData] = useState({});
  const [sellerUpdatedEmailData, setSellerUpdatedEmailData] = useState({
    user: {
      email: "",
    },
  });
  const [sellerUpdatedPhoneData, setSellerUpdatedPhoneData] = useState({
    user: {
      phone: "",
    },
  });

  const [phoneOtp, setPhoneOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const BASE_URL = "http://127.0.0.1:8000/seller/";

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      const profileResponse = await axios.get(
        `${BASE_URL}get-seller-profile/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (profileResponse.status === 200) {
        setSellerProfileData(profileResponse.data);
        setIsVerified(profileResponse.data.verified);
        console.log(profileResponse)
      }
    };
    fetchData();
  }, []);

  const handleBasicChange = (e) => {
    if (e.target.name !== "bussiness_name") {
      setSellerUpdatedBasicData({
        ...sellerUpdatedBasicData,
        user: {
          ...sellerUpdatedBasicData.user,
          [e.target.name]: e.target.value,
        },
      });
    } else {
      setSellerUpdatedBasicData({
        ...sellerUpdatedBasicData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleEmailChange = (e) => {
    setSellerUpdatedEmailData({
      ...setSellerUpdatedEmailData,
      user: {
        ...sellerUpdatedEmailData.user,
        email: e.target.value,
      },
    });
  };

  const handleNumberChange = (e) => {
    setSellerUpdatedPhoneData({
      ...setSellerUpdatedPhoneData,
      user: {
        ...sellerUpdatedPhoneData.user,
        phone: e.target.value,
      },
    });
  };

  const handleBasicSubmit = async (e) => {
    console.log(sellerUpdatedBasicData);
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const updateResponse = await axios.patch(
        `${BASE_URL}update-profile/${sellerProfileData.unique_id}/`,
        sellerUpdatedBasicData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (updateResponse.status === 200) {
        setIsBasicEdit(false);
        setAlertData("Details Updated Successfully");
        setAlertEnable(true);
        setAlertSeverity("success");
        setIsEmail(true);
      }
    } catch (error) {
      setAlertData("Error updating details");
      setAlertEnable(true);
      setAlertSeverity("error");
      console.log(error)
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const emailupdateResponse = await axios.patch(
        `${BASE_URL}update-profile/${sellerProfileData.unique_id}/`,
        sellerUpdatedEmailData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (emailupdateResponse.status === 200) {
        UpdateVerifyState()
        setIsEmailEdit(false);
        setAlertData("Email Updated Successfully");
        setAlertEnable(true);
        setAlertSeverity("success");
      }
    } catch (error) {
      setAlertData("Error updating Email");
      setAlertEnable(true);
      setAlertSeverity("error");
    }
  };

  const handleNumberSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (sellerUpdatedPhoneData.user.phone.length !== 10) {
      setAlertData("Invalid Number");
      setAlertEnable(true);
      setAlertSeverity("warning");
      return;
    }

    try {
      const updatePhoneResponse = await axios.patch(
        `${BASE_URL}update-profile/${sellerProfileData.unique_id}/`,
        sellerUpdatedPhoneData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (updatePhoneResponse.status === 200) {
        setIsPhoneEdit(false);
        setAlertData("Phone Number Updated Successfully");
        setAlertEnable(true);
        setAlertSeverity("success");
      }
    } catch (error) {
      setAlertData("Error Updating Phone Number");
      setAlertEnable(true);
      setAlertSeverity("error");
      console.log(error);
    }


  };

  if (
    !sellerProfileData ||
    !sellerProfileData.user ||
    !sellerProfileData.user.first_name ||
    !sellerProfileData.user.last_name
  ) {
    return null;
  }

  const handleAlertClose = () => {
    setAlertEnable(false);
  };

  const UpdateVerifyState = () => {
    setSellerProfileData({...sellerProfileData, email_verified : true})
  }

  const handleOtpConfirm = async () => {
    const token = localStorage.getItem("token");
    setShowConfirmation(false);
      try{
      const emailOtpVerifyResponse = await axios.post(
        `${BASE_URL}email-otp-verify/`,
        {
          user_typed_code: emailOtp,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if(emailOtpVerifyResponse.status === 200){
        setShowConfirmation(false)
        handleEmailSubmit()
      }
      } catch (error) {
        setAlertData("Invalid Otp")
        setAlertEnable(true)
        setAlertSeverity("error")
      }

  };

  const handleEmailVerification = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token");
    setIsEmail(true);
    try {
      const emailVerifyResponse = await axios.get(
        `${BASE_URL}email-otp-create/${sellerUpdatedEmailData.user.email}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (emailVerifyResponse.status === 200) {
        setShowConfirmation(true);
      }
    } catch (error) {
      setAlertData("OTP Creation Failed");
      setAlertEnable(true);
      setAlertSeverity("error");
      console.log(error)
    }
  };

  return (
    <>
      <div className="container-fluid p-5 pb-5 mt-3">
        <ProfileNav
          setIsUpdatePassword={setIsUpdatePassword}
          isVerified={isVerified}
        />
        {alertEnable && (
          <Alert severity={alertSeverity} onClose={handleAlertClose}>
            <AlertTitle>Error</AlertTitle>
            {alertData}
          </Alert>
        )}
        <ProfileModal
          showConfirmation={showConfirmation}
          setShowConfirmation={setShowConfirmation}
          phoneOtp={phoneOtp}
          setPhoneOtp={setPhoneOtp}
          handleOtpConfirm={handleOtpConfirm}
          setEmailOtp={setEmailOtp}
          emailOtp={emailOtp}
          isEmail={isEmail}
        />
        {isUpdatePassword ? (
          <UpdatePassword setIsUpdatePassword={setIsUpdatePassword}
            setAlertData={setAlertData}
            setAlertEnable={setAlertEnable}
            setAlertSeverity={setAlertSeverity}
            handleAlertClose={handleAlertClose}
            url={BASE_URL}
           />
        ) : (
          <div className="row">
            <div className="col-lg-6">
              <h4 className="text-center m-3">Profile</h4>

              <form onSubmit={handleBasicSubmit}>
                <div className="row g-3 p-3 mb-3">
                  <div className="col-lg-6 mt-3">
                    {!isBasicEdit && (
                      <button
                        className="btn btn-outline-info w-100"
                        type="button"
                        onClick={() => setIsBasicEdit(true)}
                      >
                        Edit Personal Details
                      </button>
                    )}
                    {isBasicEdit && (
                      <button
                        className="btn btn-outline-success w-100"
                        type="submit"
                      >
                        Update
                      </button>
                    )}
                  </div>
                  <div className="col-lg-6 mt-3">
                    {isBasicEdit && (
                      <>
                        <button
                          className="btn btn-outline-danger w-100"
                          type="button"
                          onClick={() => {
                            setIsBasicEdit(false);
                            setIsBasicChanged(false);
                          }}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={
                        isBasicChanged
                          ? sellerUpdatedBasicData.user.first_name
                          : sellerProfileData.user.first_name
                      }
                      name="first_name"
                      required
                      readOnly={!isBasicEdit}
                      onChange={(e) => {
                        handleBasicChange(e);
                        setIsBasicChanged(true);
                      }}
                    />
                  </div>

                  <div className="col-sm-6">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      name="last_name"
                      required
                      readOnly={!isBasicEdit}
                      value={
                        isBasicChanged
                          ? sellerUpdatedBasicData.user.last_name
                          : sellerProfileData.user.last_name
                      }
                      onChange={(e) => {
                        handleBasicChange(e);
                        setIsBasicChanged(true);
                      }}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Business Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      name="bussiness_name"
                      required
                      readOnly={!isBasicEdit}
                      value={
                        isBasicChanged
                          ? sellerUpdatedBasicData.bussiness_name
                          : sellerProfileData.bussiness_name
                      }
                      onChange={(e) => {
                        handleBasicChange(e);
                        setIsBasicChanged(true);
                      }}
                    />
                  </div>
                </div>
              </form>

              <form onSubmit={handleEmailVerification}>
                <div className="row p-3 mt-3">
                  <div className="col-lg-6 mb-3">
                    {!isEmailEdit && (
                      <button
                        className="btn btn-outline-info w-100"
                        type="button"
                        onClick={() => setIsEmailEdit(true)}
                      >
                        {sellerProfileData.email === ""
                          ? "Add Email"
                          : "Edit Email"}
                      </button>
                    )}
                    {isEmailEdit && (
                      <button
                        className="btn btn-outline-success w-100"
                        type="submit"
                      >
                        {sellerProfileData.email === "" ? "Submit" : "Update"}
                      </button>
                    )}
                  </div>
                  <div className="col-lg-6 mb-3">
                    {isEmailEdit && (
                      <>
                        <button
                          className="btn btn-outline-danger w-100"
                          type="button"
                          onClick={() => {
                            setIsEmailEdit(false);
                            setIsEmailChanged(false);
                          }}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-lg-12">
                        <label className="form-label">Email</label>
                      </div>
                      <div className="col-lg-8">
                        <div className="input-group has-validation">
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            name="email"
                            required
                            readOnly={!isEmailEdit}
                            value={
                              isEmailChanged
                                ? sellerUpdatedEmailData.user.email
                                : sellerProfileData.user.email
                            }
                            onChange={(e) => {
                              handleEmailChange(e);
                              setIsEmailChanged(true);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>

              <form onSubmit={handleNumberSubmit}>
                <div className="row p-3 mb-3">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        {!isPhoneEdit && (
                          <button
                            className="btn btn-outline-info w-100"
                            type="button"
                            onClick={() => setIsPhoneEdit(true)}
                          >
                            Edit Number
                          </button>
                        )}
                        {isPhoneEdit && (
                          <button
                            className="btn btn-outline-success w-100"
                            type="submit"
                          >
                            Update
                          </button>
                        )}
                      </div>
                      <div className="col-lg-6 mb-3">
                        {isPhoneEdit && (
                          <>
                            <button
                              className="btn btn-outline-danger w-100"
                              type="button"
                              onClick={() => {
                                setIsPhoneEdit(false);
                                setIsPhoneChanged(false);
                              }}
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-lg-12">
                        <label className="form-label">Phone</label>
                      </div>
                      <div className="col-lg-8">
                        <div className="input-group has-validation">
                          <span className="input-group-text">+91</span>
                          <input
                            type="tel"
                            className="form-control"
                            placeholder=""
                            name="phone"
                            required
                            readOnly={!isPhoneEdit}
                            value={
                              isPhoneChanged
                                ? sellerUpdatedPhoneData.user.phone
                                : sellerProfileData.user.phone
                            }
                            onChange={(e) => {
                              setIsPhoneChanged(true);
                              handleNumberChange(e);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-12 p-3">
                  <div className="row">
                    <div className="col-lg-9">
                      <label className="form-label display-6">
                        Address Verification
                      </label>
                    </div>
                    <div
                      className="col-lg-3 form-check form-switch d-flex align-items-center"
                      style={{ fontSize: "1.5rem" }}
                    >
                      <input
                        type="checkbox"
                        className="form-check-input"
                        placeholder=""
                        name="landmark"
                        disabled
                        checked={sellerProfileData.address_verified}
                      />
                    </div>
                  </div>
                  {!sellerProfileData.address_verified && (
                    <Link
                      to="/seller/verify"
                      className="btn btn-info"
                      type="button"
                    >
                      Verify Now
                    </Link>
                  )}
                </div>
                <div className="col-lg-12 p-3">
                  <div className="row">
                    <div className="col-lg-9">
                      <label className="form-label display-6">
                        Pan Verification
                      </label>
                    </div>
                    <div
                      className="col-lg-3 form-check form-switch d-flex align-items-center"
                      style={{ fontSize: "1.5rem" }}
                    >
                      <input
                        type="checkbox"
                        className="form-check-input"
                        placeholder=""
                        name="landmark"
                        disabled
                        checked={sellerProfileData.pan_verified}
                      />
                    </div>
                  </div>
                  {!sellerProfileData.pan_verified && (
                    <Link
                      to="/seller/verify"
                      className="btn btn-info"
                      type="button"
                    >
                      Verify Now
                    </Link>
                  )}
                </div>
                <div className="col-lg-12 p-3">
                  <div className="row">
                    <div className="col-lg-9">
                      <label className="form-label display-6">
                        GSTIN Verification
                      </label>
                    </div>
                    <div
                      className="col-lg-3 form-check form-switch d-flex align-items-center"
                      style={{ fontSize: "1.5rem" }}
                    >
                      <input
                        type="checkbox"
                        className="form-check-input"
                        placeholder=""
                        name="landmark"
                        disabled
                        checked={sellerProfileData.gstin_verified}
                      />
                    </div>
                  </div>
                  {!sellerProfileData.gstin_verified && (
                    <Link
                      to="/seller/verify"
                      className="btn btn-info"
                      type="button"
                    >
                      Verify Now
                    </Link>
                  )}
                </div>
                <div className="col-lg-12 p-3">
                  <div className="row">
                    <div className="col-lg-9">
                      <label className="form-label display-6">
                        Bank Verification
                      </label>
                    </div>
                    <div
                      className="col-lg-3 form-check form-switch d-flex align-items-center"
                      style={{ fontSize: "1.5rem" }}
                    >
                      <input
                        type="checkbox"
                        className="form-check-input"
                        placeholder=""
                        name="landmark"
                        disabled
                        checked={sellerProfileData.bank_account_verified}
                      />
                    </div>
                  </div>
                  {!sellerProfileData.bank_account_verified && (
                    <Link
                      to="/seller/verify"
                      className="btn btn-info"
                      type="button"
                    >
                      Verify Now
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SellerProfile;
