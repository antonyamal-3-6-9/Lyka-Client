import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal'

const AddPickupNav = () => {

  Modal.setAppElement('#root');

    const navigate = useNavigate()
    const [showConfirmation, setShowConfirmation] = useState(false)

    const handleCancel = () => {
        setShowConfirmation(true)
    }

    const handleConfirm = () => {
        navigate("/seller/store")
    }

    const handleCancelDelete = () => {
        setShowConfirmation(false)
    }


  return (
    <>
      <Modal
        isOpen={showConfirmation}
        onRequestClose={handleCancelDelete}
        style={{
          content: {
            width: "400px",
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
        <h2 style={{ marginBottom: "10px" }}>Confirm Cancel</h2>
        <p style={{ marginBottom: "20px" }}>
          Are you sure want to cancel now? Product will not be saved unless you
          make the final confirmation
        </p>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button style={{ marginRight: "10px" }} onClick={handleConfirm}>
            Yes
          </button>
          <button onClick={handleCancelDelete}>No</button>
        </div>
      </Modal>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <button
                    to="/seller-home"
                    className="btn btn-outline-danger me-2"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </li>
              </ul>
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <h5 className="nav-link">Add New Store</h5>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="navbar-brand">LYKA</li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default AddPickupNav
