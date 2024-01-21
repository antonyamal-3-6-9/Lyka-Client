import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { Button } from "@mui/material";

const AddPickupNav = () => {
  Modal.setAppElement("#root");

  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCancel = () => {
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    navigate("/seller/store");
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <Modal
        isOpen={showConfirmation}
        onRequestClose={handleCancelDelete}
        style={{
          content: {
            width: "400px",
            height: "400px",
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
          Are you sure want to cancel now? 
        </p>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button style={{ marginRight: "10px" }} onClick={handleConfirm}>
            Yes
          </Button>
          <Button onClick={handleCancelDelete}>No</Button>
        </div>
      </Modal>

      <div className="d-flex">
        <Button
          variant="text"
          onClick={handleCancel}
        >
          Cancel
        </Button>

      </div>
    </>
  );
};

export default AddPickupNav;
