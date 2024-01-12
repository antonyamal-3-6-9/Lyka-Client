import React from "react";
import Modal from "react-modal";

const ProfileModal = (props) => {
  const handleChange = (e) => {
    if (props.isEmail) {
      props.setEmailOtp(e.target.value);
    } else {
      props.setPhoneOtp(e.target.value);
    }
  };

  const handleClose = () => {
    props.setShowConfirmation(false);
  };

  return (
    <>
      <Modal
        isOpen={props.showConfirmation}
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
                value={props.isEmail ? props.emailOtp : props.phoneOtp}
                onChange={handleChange}
                maxLength="6"
              />
            </div>
            <div className="col-lg-6 d-flex align-items-center justify-content-center mt-3">
              <button
                className="btn btn-success"
                onClick={props.handleOtpConfirm}
              >
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

export default ProfileModal;
