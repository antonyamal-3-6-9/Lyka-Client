import React from "react";
import Modal from "react-modal";

const OTPModal = ({
  isEmail,
  setEmailOtp,
  setPhoneOtp,
  setShowConfirmation,
  showConfirmation,
  handleOtpConfirm,
  emailOtp,
  phoneOtp,
}) => {
  const handleChange = (e) => {
    if (isEmail) {
      setEmailOtp(e.target.value);
    } else {
      setPhoneOtp(e.target.value);
    }
  };

  const handleClose = () => {
    setShowConfirmation(false);
    setEmailOtp("")
    setPhoneOtp("")
  };

  return (
    <>
      <Modal
        isOpen={showConfirmation}
        onRequestClose={handleClose}
        style={{
          content: {
            width: "400px",
            height: "300px",
            margin: "auto",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            padding: "20px",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <h2 className="text-center" style={{ marginBottom: "10px" }}>
          OTP
        </h2>
        <p
          className="text-center"
          style={{ marginBottom: "20px", fontSize: "1.5rem" }}
        >
          Enter the Otp
        </p>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div className="row">
            <div className="col-lg-12">
              <input
                type="number"
                className="form-control"
                name="otp"
                required
                value={isEmail ? emailOtp : phoneOtp}
                onChange={handleChange}
                maxLength="6"
              />
            </div>
            <div className="col-lg-6 d-flex align-items-center justify-content-center mt-3">
              <button className="btn btn-success" onClick={handleOtpConfirm}>
                Confirm
              </button>
            </div>
            <div className="col-lg-6 d-flex align-items-center justify-content-center mt-3">
              <button className="btn btn-danger" onClick={handleClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default OTPModal
